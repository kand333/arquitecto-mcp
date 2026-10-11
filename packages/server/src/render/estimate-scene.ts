import { estimateCost, formatMonto, unverifiedRules, type Project } from "@arquitecto/core";
import { drawSheetFrame } from "./frame.js";
import { drawTable, type Col } from "./schedule-scene.js";
import { type LayerName, type Prim, type Scene2D } from "./scene.js";
import { PAPER, planTransform, type PlanTransform } from "./transform.js";

/**
 * Tờ DỰ TOÁN SƠ BỘ (backlog doc 10 → làm 13/07/2026): bảng diện tích quy đổi,
 * bảng chi phí theo mức hoàn thiện trong brief, khối lượng tham khảo.
 * Paper-space thuần như tờ thống kê. Chỉ là ước tính concept — khung tên và
 * ghi chú nói rõ, không thay báo giá thầu.
 */

export type EstimateBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { title: string; scaleLabel: string };
};

export type EstimateOptions = { date?: string; designer?: string; sheetNo?: string };

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

export function buildEstimateScene(p: Project, opts: EstimateOptions = {}): EstimateBuild {
  // Sin tabla o con precios por completar → la lámina de presupuesto se omite del juego
  // (tryBuild captura el throw y la informa como omitida, igual que el corte sin escalera).
  const e = estimateCost(p);
  const tabla = e.tabla;
  if (!tabla) throw new Error(`La región "${p.config?.region}" no tiene tabla de precios: se omite la lámina de presupuesto.`);
  if (e.total == null) throw new Error(`Precios por completar en la tabla ${tabla.version}: se omite la lámina de presupuesto.`);
  const total = e.total;
  const num = (n: number): string => n.toLocaleString(tabla.currency.locale);
  const items: Scene2D = [];
  const push: Push = (layer, prim, dataId, space) => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };
  const tf = planTransform({ minX: 0, minY: 0, maxX: 1000, maxY: 1000 }, 100, { noRotate: true });

  const q = e.quantities;

  // ── bảng 1: diện tích quy đổi ─────────────────────────────
  const areaCols: Col[] = [
    { w: 64, label: "Ítem" },
    { w: 28, label: "Sup. (m²)", anchor: "end" },
    { w: 22, label: "Coef.", anchor: "middle" },
    { w: 32, label: "Equivalente (m²)", anchor: "end" },
  ];
  const areaRows = q.dien_tich.map((l) => ({
    cells: [l.uoc_le ? `${l.label} (estimada)` : l.label, l.dien_tich_m2.toFixed(1), `× ${l.he_so}`, l.quy_doi_m2.toFixed(1)],
  }));
  areaRows.push({ cells: ["SUPERFICIE EQUIVALENTE TOTAL", null as never, null as never, q.tong_quy_doi_m2.toFixed(1)], bold: true } as never);
  const yArea = drawTable(push, 16, 16, "SUPERFICIE PARA PRESUPUESTO", areaCols, areaRows);

  // ── bảng 2: khối lượng tham khảo ──────────────────────────
  const qtyCols: Col[] = [
    { w: 74, label: "Cantidad de referencia" },
    { w: 36, label: "Valor", anchor: "end" },
    { w: 36, label: "Unidad" },
  ];
  drawTable(push, 16, yArea + 10, "CANTIDADES DE REFERENCIA (contrastar con cotizaciones)", qtyCols, [
    { cells: ["Muros (descontados los vanos)", q.tuong_xay_m2.toFixed(1), "m²"] },
    { cells: ["Puertas + ventanas", `${q.cua_bo} u · ${q.cua_m2.toFixed(1)}`, "m²"] },
    { cells: ["Peldaños", String(q.bac_thang), "peldaños"] },
    { cells: ["Losas útiles (descontados los vacíos)", q.san_thuc_m2.toFixed(1), "m²"] },
  ]);

  // ── bảng 3: chi phí ───────────────────────────────────────
  const costCols: Col[] = [
    { w: 96, label: "Partida" },
    { w: 40, label: `Precio unitario (${tabla.currency.symbol}/m²)`, anchor: "end" },
    { w: 44, label: `Monto (${tabla.currency.symbol})`, anchor: "end" },
  ];
  // total != null ⇒ todos los ítems tienen precio y monto
  const costRows = e.items.map((i) => ({
    cells: [i.label, num(i.precio_m2!), num(i.monto!)],
  }));
  costRows.push({ cells: [`TOTAL ESTIMADO (${formatMonto(total, tabla)})`, null as never, num(total)], bold: true } as never);
  if (e.ngan_sach) {
    const ns = e.ngan_sach;
    const so =
      ns.monto == null || ns.diferencia == null
        ? `Presupuesto del brief: "${ns.text}" — no se pudo convertir a un monto`
        : ns.diferencia >= 0
          ? `Presupuesto del brief ${formatMonto(ns.monto, tabla)} — SOBRAN ~${formatMonto(ns.diferencia, tabla)}`
          : `Presupuesto del brief ${formatMonto(ns.monto, tabla)} — SE EXCEDE ~${formatMonto(-ns.diferencia, tabla)}`;
    costRows.push({ cells: [so, null as never, null as never], bold: true } as never);
  }
  const yCost = drawTable(push, 16 + 146 + 14, 16, `COSTO PRELIMINAR — ${tabla.don_gia_m2.hoan_thien[e.muc]?.label ?? e.muc}`, costCols, costRows);

  // ── ghi chú ───────────────────────────────────────────────
  let gy = yCost + 8;
  push("VINETA", { kind: "text", at: [16 + 146 + 14, gy], text: "Notas:", size: 2.6, bold: true }, undefined, "paper");
  gy += 4.5;
  const notes = [
    ...e.ghi_chu,
    "Presupuesto preliminar de anteproyecto: el costo se cierra con cotizaciones de contratistas con cubicación detallada.",
    `Tabla de precios ${tabla.version}: la tabla local va en rules/don-gia.json dentro de la carpeta del proyecto.`,
  ];
  for (const n of notes) {
    push("VINETA", { kind: "text", at: [16 + 146 + 14, gy], text: `• ${n}`, size: 2.3 }, undefined, "paper");
    gy += 4;
  }

  push("VINETA", {
    kind: "text", at: [16, PAPER.h - 60], size: 2.4,
    text: "Superficie equivalente según los coeficientes de la tabla de precios; los vacíos menores que el umbral se cuentan como superficie completa.",
  }, undefined, "paper");

  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title: "PRESUPUESTO PRELIMINAR",
    sheetNo: opts.sheetNo ?? "ARQ-06",
    scaleLabel: "—",
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });

  return { items, tf, meta: { title: "PRESUPUESTO PRELIMINAR", scaleLabel: "—" } };
}
