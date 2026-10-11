import { areaM2, unverifiedRules, type Project, type RoomUse } from "@arquitecto/core";
import { drawSheetFrame } from "./frame.js";
import { W, type LayerName, type Prim, type Scene2D } from "./scene.js";
import { PAPER, planTransform, type PlanTransform } from "./transform.js";

/**
 * Tờ thống kê (P4, pha E doc 02): bảng phòng-diện tích + bảng cửa.
 * Toàn bộ paper-space — không có hình học model nào trên tờ này.
 */

export type ScheduleBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { title: string; scaleLabel: string };
};

export type ScheduleOptions = { date?: string; designer?: string; sheetNo?: string };

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

const USE_LABEL: Record<RoomUse, string> = {
  khach: "Living",
  "bep-an": "Cocina + comedor",
  ngu: "Dormitorio",
  wc: "Baño",
  tho: "Oratorio",
  "lam-viec": "Escritorio",
  gara: "Estacionamiento",
  "hanh-lang": "Pasillo",
  "cau-thang": "Escalera",
  san: "Patio",
  "gieng-troi": "Patio de luz",
  kho: "Bodega",
  "ban-cong": "Balcón",
};

export type Col = { w: number; label: string; anchor?: "start" | "middle" | "end" };

/** Vẽ một bảng paper-space, trả y đáy. Row = mảng ô theo cột; null = ô trống. Dùng chung KT-05/KT-06. */
export function drawTable(
  push: Push,
  x: number,
  y: number,
  title: string,
  cols: Col[],
  rows: Array<{ cells: Array<string | null>; bold?: boolean }>,
): number {
  const width = cols.reduce((s, c) => s + c.w, 0);
  const rowH = 7;
  const headH = 8;

  push("VINETA", { kind: "text", at: [x, y + 4], text: title, size: 3.5, bold: true }, undefined, "paper");
  let top = y + 8;

  // header
  push("VINETA", { kind: "polygon", pts: [[x, top], [x + width, top], [x + width, top + headH], [x, top + headH]], fill: "#eceae4", weight: W.strong }, undefined, "paper");
  let cx = x;
  for (const c of cols) {
    const tx = c.anchor === "middle" ? cx + c.w / 2 : c.anchor === "end" ? cx + c.w - 2 : cx + 2;
    push("VINETA", { kind: "text", at: [tx, top + headH / 2 + 0.9], text: c.label, size: 2.5, bold: true, anchor: c.anchor ?? "start" }, undefined, "paper");
    cx += c.w;
  }

  // rows
  let ry = top + headH;
  for (const row of rows) {
    let cxx = x;
    for (let i = 0; i < cols.length; i++) {
      const cell = row.cells[i];
      const c = cols[i]!;
      if (cell != null) {
        const tx = c.anchor === "middle" ? cxx + c.w / 2 : c.anchor === "end" ? cxx + c.w - 2 : cxx + 2;
        push("VINETA", {
          kind: "text", at: [tx, ry + rowH / 2 + 0.9], text: cell, size: 2.5,
          ...(row.bold ? { bold: true } : {}), anchor: c.anchor ?? "start",
        }, undefined, "paper");
      }
      cxx += c.w;
    }
    ry += rowH;
    push("VINETA", { kind: "line", a: [x, ry], b: [x + width, ry], weight: row.bold ? W.strong : W.hair }, undefined, "paper");
  }

  // khung dọc
  push("VINETA", { kind: "polyline", pts: [[x, top], [x + width, top], [x + width, ry], [x, ry]], close: true, weight: W.strong }, undefined, "paper");
  cx = x;
  for (const c of cols.slice(0, -1)) {
    cx += c.w;
    push("VINETA", { kind: "line", a: [cx, top], b: [cx, ry], weight: W.hair }, undefined, "paper");
  }
  return ry;
}

export function buildScheduleScene(p: Project, opts: ScheduleOptions = {}): ScheduleBuild {
  const items: Scene2D = [];
  const push: Push = (layer, prim, dataId, space) => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };
  // tf hình thức — tờ này không có hình model nào
  const tf = planTransform({ minX: 0, minY: 0, maxX: 1000, maxY: 1000 }, 100, { noRotate: true });

  const levels = [...p.levels].sort((a, b) => a.elevation - b.elevation);

  // ── bảng phòng ────────────────────────────────────────────
  const roomCols: Col[] = [
    { w: 12, label: "N°", anchor: "middle" },
    { w: 18, label: "Piso", anchor: "middle" },
    { w: 34, label: "Código" },
    { w: 52, label: "Recinto" },
    { w: 30, label: "Sup. (m²)", anchor: "end" },
  ];
  const roomRows: Array<{ cells: Array<string | null>; bold?: boolean }> = [];
  let tt = 0;
  let total = 0;
  for (const lv of levels) {
    let sub = 0;
    for (const r of p.rooms.filter((x) => x.level === lv.id)) {
      const a = areaM2(r.polygon);
      sub += a;
      tt += 1;
      roomRows.push({ cells: [String(tt), lv.id, r.id, r.name || USE_LABEL[r.use], a.toFixed(1)] });
    }
    total += sub;
    roomRows.push({ cells: [null, null, null, `Subtotal ${lv.name.toLowerCase()}`, sub.toFixed(1)], bold: true });
  }
  roomRows.push({ cells: [null, null, null, "SUPERFICIE TOTAL DE RECINTOS", total.toFixed(1)], bold: true });

  const yRooms = drawTable(push, 16, 16, "CUADRO DE RECINTOS", roomCols, roomRows);

  // ── bảng cửa: gộp theo loại + style + kích thước ──────────
  type Group = { ids: string[]; kind: string; style: string; width: number; height: number; levels: Set<string> };
  const groups = new Map<string, Group>();
  for (const o of p.openings) {
    const wall = p.walls.find((w) => w.id === o.wall);
    const key = `${o.kind}|${o.style}|${o.width}x${o.height}`;
    if (!groups.has(key)) groups.set(key, { ids: [], kind: o.kind, style: o.style, width: o.width, height: o.height, levels: new Set() });
    const g = groups.get(key)!;
    g.ids.push(o.id);
    if (wall) g.levels.add(wall.level);
  }

  const doorCols: Col[] = [
    { w: 30, label: "Código" },
    { w: 22, label: "Tipo", anchor: "middle" },
    { w: 42, label: "Modelo" },
    { w: 30, label: "A×H (mm)", anchor: "middle" },
    { w: 12, label: "Cant.", anchor: "middle" },
    { w: 20, label: "Piso", anchor: "middle" },
  ];
  const doorRows = [...groups.values()]
    .sort((a, b) => a.ids[0]!.localeCompare(b.ids[0]!))
    .map((g) => ({
      cells: [
        g.ids.sort().join(", "),
        g.kind === "door" ? "Puerta" : "Ventana",
        p.styles.openings[g.style]?.label ?? g.style,
        `${g.width}×${g.height}`,
        String(g.ids.length),
        [...g.levels].sort().join(", "),
      ],
    }));
  doorRows.push({
    cells: [null, null, null, "TOTAL", String(p.openings.length), null],
    bold: true,
  } as never);

  drawTable(push, 16 + 146 + 14, 16, "CUADRO DE VANOS", doorCols, doorRows);

  // ghi chú
  push("VINETA", {
    kind: "text", at: [16, PAPER.h - 60], size: 2.4,
    text: "Superficies medidas a cara interior de muros (superficie útil); las medidas de puertas y ventanas son las del vano.",
  }, undefined, "paper");

  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title: "CUADRO DE RECINTOS Y VANOS",
    sheetNo: opts.sheetNo ?? "ARQ-05",
    scaleLabel: "—",
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });

  return { items, tf, meta: { title: "CUADRO DE RECINTOS Y VANOS", scaleLabel: "—" } };
}
