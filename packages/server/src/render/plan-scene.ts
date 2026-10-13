import {
  add, areaM2, defaultSwing, furnitureObb, getAsset, getLevel, joinedWall, levelAbove, obbCorners, openingSpan,
  floorSlabOf, pointInPolygon, pointOnWall, roofGeometry, roofsOf, roofsOfLevel, rotate, scale as vscale, stairLayout, sub, unverifiedRules,
  wallBand, wallDir, wallLength, wallNormal, type Furniture, type Level, type Opening,
  type Point, type Project, type Room, type RoomUse, type Wall,
} from "@arquitecto/core";
import { cmText, dimTick, drawSheetFrame, planTitle } from "./frame.js";
import { principalAxes } from "./axes.js";
import { slidingWindowPlan } from "./sliding.js";
import { AXIS_COLOR, CUT_COLOR, LAYERS, W, type LayerName, type Prim, type Scene2D, type SceneItem } from "./scene.js";
import { planTransform, type Bounds, type PlanTransform } from "./transform.js";

export type PlanBuild = {
  items: Scene2D;
  tf: PlanTransform;
  meta: { levelName: string; scaleLabel: string; projectName: string };
};

export type PlanOptions = {
  date?: string;
  designer?: string;
  scale?: number;
  layers?: string[];
  /** Số hiệu tờ trong bộ hồ sơ (P4) — mặc định KT-01. */
  sheetNo?: string;
  /**
   * Underlay đồ lại (server nạp sẵn qua loadUnderlay) — vẽ MỜ dưới cùng và
   * nới bounds cho thấy trọn bản cũ. Chỉ truyền ở plan live/render_plan;
   * bộ tờ hồ sơ (sheets) KHÔNG truyền — giàn giáo không vào bản vẽ bàn giao.
   */
  underlay?: PlanUnderlay;
};

export type PlanUnderlay = {
  polylines: Point[][];
  image?: { href: string; wpx: number; hpx: number; origin: Point; scale: number; rot: number };
  opacity: number;
  level?: string;
};

export function buildPlanScene(p: Project, levelId: string, opts: PlanOptions = {}): PlanBuild {
  const level = getLevel(p, levelId);
  if (!level) {
    const known = p.levels.map((l) => l.id).join(", ");
    throw new Error(`No existe el piso "${levelId}"; pisos disponibles: ${known}.`);
  }

  const items: Scene2D = [];
  const keep = opts.layers?.length
    ? new Set([...opts.layers.map((l) => l.toUpperCase()), "VINETA"]) // khung tên luôn giữ
    : null;
  const push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => {
    if (keep && !keep.has(layer)) return;
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  const walls = p.walls.filter((w) => w.level === levelId);
  const underlay = opts.underlay && (!opts.underlay.level || opts.underlay.level === levelId)
    ? opts.underlay
    : undefined;
  // la obra (sin calco ni terreno) manda en ejes, cotas y marca de corte; terreno y calco solo amplían el encuadre
  const bounds = computeBounds(p, walls, undefined, levelId, walls.length === 0);
  const tf = planTransform(computeBounds(p, walls, underlay, levelId, true), opts.scale);
  const S = tf.scale;
  const mm = (paperMm: number): number => paperMm * S; // mm giấy → mm model

  // vector model sao cho trên giấy dịch (dx,dy) mm — phục vụ xếp chữ nhiều dòng
  const paperVec = (dx: number, dy: number): Point =>
    tf.rotated ? [dy * S, dx * S] : [dx * S, -dy * S];

  if (underlay) drawUnderlay(underlay, items);
  drawSite(p, push);
  drawAxes(p, bounds, mm, push);
  drawWallsAndOpenings(p, walls, mm, push);
  drawSlabHoles(p, levelId, push);
  drawRoofs(p, levelId, push);
  drawStairs(p, levelId, mm, push);
  drawFurniture(p, levelId, push);
  drawDims(p, walls, bounds, mm, push);
  drawSectionMark(p, levelId, bounds, mm, push);
  // primero las etiquetas; las cotas interiores se ubican después, esquivándolas
  const labelBoxes = drawRoomLabels(p, level, paperVec, mm, push);
  drawRoomDims(p, levelId, mm, labelBoxes, push);
  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title: planTitle(level.name),
    sheetNo: opts.sheetNo ?? "ARQ-01",
    scaleLabel: `1:${S}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
    northPaperDir: norm(tf.dirToPaper(rotate([0, 1], p.site.north))),
  });

  return {
    items,
    tf,
    meta: { levelName: level.name, scaleLabel: `1:${S}`, projectName: p.meta.name },
  };
}

function computeBounds(p: Project, walls: Wall[], underlay: PlanUnderlay | undefined, levelId: string, withSite: boolean): Bounds {
  const pts: Point[] = withSite ? [...p.site.boundary] : [];
  for (const w of walls) pts.push(...wallBand(w));
  if (levelId) for (const rf of roofsOfLevel(p, levelId)) pts.push(...rf.outline);
  if (underlay) pts.push(...underlayCorners(underlay));
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  return { minX, minY, maxX, maxY };
}

/* ---------------- underlay đồ lại ---------------- */

function underlayCorners(u: PlanUnderlay): Point[] {
  const pts: Point[] = u.polylines.flat();
  if (u.image) {
    const { origin, scale, rot, wpx, hpx } = u.image;
    for (const [cx, cy] of [[0, 0], [wpx, 0], [wpx, hpx], [0, hpx]] as Point[]) {
      pts.push(add(origin, rotate([cx * scale, cy * scale], rot)));
    }
  }
  return pts;
}

function drawUnderlay(u: PlanUnderlay, items: Scene2D): void {
  // đẩy thẳng vào items (không qua push/keep) — lọc layers không được giấu giàn giáo đồ lại
  if (u.image) {
    items.push({ layer: "CALCO", prim: { kind: "image", ...u.image }, opacity: u.opacity });
  }
  for (const pts of u.polylines) {
    if (pts.length < 2) continue;
    items.push({
      layer: "CALCO",
      prim: { kind: "polyline", pts, weight: W.thin, color: "#3a6ea5" },
      opacity: u.opacity,
    });
  }
}

/* ---------------- ranh đất ---------------- */

function drawSite(p: Project, push: Push): void {
  push("MUROS-VISTA", { kind: "polyline", pts: p.site.boundary, close: true, weight: W.hair, dash: "3 1.2 0.6 1.2" }, "site");
}

/* ---------------- mái dốc (P7) ---------------- */

/** Mặt bằng mái: mép mái nét đứt (nằm TRÊN đầu ta) + nét gãy nóc/hông. */
function drawRoofs(p: Project, levelId: string, push: Push): void {
  for (const rf of roofsOfLevel(p, levelId)) {
    const level = getLevel(p, levelId);
    if (!level) continue;
    const g = roofGeometry(rf, level);
    push("TECHUMBRE", { kind: "polyline", pts: rf.outline, close: true, weight: W.mid, dash: "4 2" }, rf.id);
    for (const [a, b] of g.creases) {
      push("TECHUMBRE", { kind: "line", a, b, weight: W.thin, dash: "4 2" }, rf.id);
    }
  }
}

/* ---------------- trục ---------------- */

type Push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper") => void;

function drawAxes(p: Project, b: Bounds, mm: (v: number) => number, push: Push): void {
  const ext = mm(26); // bubble nằm ngoài 3 chuỗi dim
  const rBub = mm(4); // ⌀8mm giấy
  // estándar: solo ejes principales (centro de muros perimetrales o que cruzan el piso), rojos,
  // segmentados y finos: segundo plano que da trazabilidad sin competir con los muros
  const axes = principalAxes(p);
  const dash = "4 2";
  for (const a of axes.x) {
    const y0 = b.minY - ext, y1 = b.maxY + ext;
    push("EJES", { kind: "line", a: [a.offset, y0 + rBub], b: [a.offset, y1 - rBub], weight: W.hair, dash, color: AXIS_COLOR }, a.id);
    for (const y of [y0, y1]) {
      push("EJES", { kind: "circle", c: [a.offset, y], r: rBub, weight: W.thin, color: AXIS_COLOR }, a.id);
      push("EJES", { kind: "text", at: [a.offset, y], text: a.label ?? a.id, size: 3.2, anchor: "middle", color: AXIS_COLOR }, a.id);
    }
  }
  for (const a of axes.y) {
    const x0 = b.minX - ext, x1 = b.maxX + ext;
    push("EJES", { kind: "line", a: [x0 + rBub, a.offset], b: [x1 - rBub, a.offset], weight: W.hair, dash, color: AXIS_COLOR }, a.id);
    for (const x of [x0, x1]) {
      push("EJES", { kind: "circle", c: [x, a.offset], r: rBub, weight: W.thin, color: AXIS_COLOR }, a.id);
      push("EJES", { kind: "text", at: [x, a.offset], text: a.label ?? a.id, size: 3.2, anchor: "middle", color: AXIS_COLOR }, a.id);
    }
  }
}

/* ---------------- tường + cửa ---------------- */

const WALL_FILL: Record<string, string | undefined> = {
  gach: "#1f1f1f",
  btct: "#000000",
  "vach-nhe": "#8a8a8a",
  kinh: undefined,
};

/** Plano de corte de la planta (mm sobre el piso): un muro más bajo (jardinera, pretil) se dibuja en vista. */
const PLAN_CUT_HEIGHT = 1200;

function drawWallsAndOpenings(p: Project, walls: Wall[], mm: (v: number) => number, push: Push): void {
  for (const w0 of walls) {
    // encuentro de muros: el extremo que toca otro muro llega hasta su cara lejana (estándar de láminas)
    const { wall: w, shift } = joinedWall(walls, w0);
    const len = wallLength(w);
    const n = wallNormal(w);
    const half = vscale(n, w.thickness / 2);
    const spans = p.openings
      .filter((o) => o.wall === w.id)
      .map((o): [number, number] => [openingSpan(o)[0] + shift, openingSpan(o)[1] + shift])
      .sort((a, b) => a[0] - b[0]);

    // các mảng tường đặc giữa những ô chờ
    let cursor = 0;
    const segs: Array<[number, number]> = [];
    for (const [s0, s1] of spans) {
      if (s0 > cursor) segs.push([cursor, s0]);
      cursor = Math.max(cursor, s1);
    }
    if (cursor < len) segs.push([cursor, len]);

    for (const [s0, s1] of segs) {
      const a = pointOnWall(w, s0);
      const b = pointOnWall(w, s1);
      if (w.height !== undefined && w.height < PLAN_CUT_HEIGHT) {
        push("MUROS-VISTA", { kind: "polyline", pts: [add(a, half), add(b, half), sub(b, half), sub(a, half)], close: true, weight: W.mid }, w.id);
      } else if (w.kind === "kinh") {
        const off = vscale(n, w.thickness / 4);
        push("MUROS-CORTE", { kind: "line", a: add(a, off), b: add(b, off), weight: W.mid }, w.id);
        push("MUROS-CORTE", { kind: "line", a: sub(a, off), b: sub(b, off), weight: W.mid }, w.id);
      } else {
        push("MUROS-CORTE", {
          kind: "polygon",
          pts: [add(a, half), add(b, half), sub(b, half), sub(a, half)],
          fill: WALL_FILL[w.kind],
          weight: W.cut,
        }, w.id);
      }
    }
  }

  for (const o of p.openings) {
    const w = walls.find((x) => x.id === o.wall);
    if (!w) continue;
    drawOpening(p, w, o, mm, push);
  }
}

function drawOpening(p: Project, w: Wall, o: Opening, mm: (v: number) => number, push: Push): void {
  const n = wallNormal(w);
  const half = vscale(n, w.thickness / 2);
  const jambL = pointOnWall(w, o.offset);
  const jambR = pointOnWall(w, o.offset + o.width);

  // nét má ô chờ (thấy)
  for (const j of [jambL, jambR]) {
    push("MUROS-VISTA", { kind: "line", a: add(j, half), b: sub(j, half), weight: W.mid }, o.id);
  }

  if (o.kind === "window") {
    if (p.styles.openings[o.style]?.leaf === "truot") {
      slidingWindowPlan(jambL, jambR, n, w.thickness, o.id, push); // corredera: detalle del estándar
    } else for (const k of [-0.5, 0, 0.5]) {
      const off = vscale(n, w.thickness * k);
      push("VANOS", { kind: "line", a: add(jambL, off), b: add(jambR, off), weight: W.mid }, o.id);
    }
    const labelAt = add(midOf(jambL, jambR), vscale(n, w.thickness / 2 + mm(2.2)));
    push("VANOS", { kind: "text", at: labelAt, text: o.id, size: 2.2, anchor: "middle" }, o.id);
    return;
  }

  // cửa đi
  const style = p.styles.openings[o.style];
  const swing = o.swing ?? defaultSwing(p, o); // estándar: hacia el interior del recinto que sirve
  if (swing === "slide" || style?.leaf === "truot" || style?.leaf === "xep") {
    const d = wallDir(w);
    const mid = midOf(jambL, jambR);
    const a = add(mid, vscale(d, -o.width * 0.45));
    const b = add(mid, vscale(d, o.width * 0.45));
    push("VANOS", { kind: "line", a, b, weight: W.strong }, o.id);
    push("VANOS", { kind: "line", a: add(a, vscale(n, mm(0.9))), b: add(b, vscale(n, mm(0.9))), weight: W.thin }, o.id);
  } else if (swing !== "none") {
    const side = swing.startsWith("in") ? 1 : -1;
    const leaves: Array<[Point, Point, number]> =
      style?.leaf === "2-canh"
        ? [[jambL, jambR, o.width / 2], [jambR, jambL, o.width / 2]]
        : [swing.endsWith("-L") ? [jambL, jambR, o.width] : [jambR, jambL, o.width]];
    for (const [hinge, other, r] of leaves) {
      const open = vscale(n, side * r);
      push("VANOS", { kind: "line", a: hinge, b: add(hinge, open), weight: W.strong }, o.id);
      const closedDir = sub(other, hinge);
      const a0 = deg(Math.atan2(closedDir[1], closedDir[0]));
      const a1 = deg(Math.atan2(side * n[1], side * n[0]));
      push("VANOS", { kind: "arc", c: hinge, r, a0, a1, weight: W.thin }, o.id);
      push("VANOS", { kind: "door", hinge, r, a0, a1 }, o.id); // DXF: bloque PUERTA-<r>
    }
  }
  const labelSide = swing.startsWith("out") ? -1 : 1;
  const labelAt = add(midOf(jambL, jambR), vscale(n, labelSide * (w.thickness / 2 + mm(2.2))));
  push("VANOS", { kind: "text", at: labelAt, text: o.id, size: 2.2, anchor: "middle" }, o.id);
}

const midOf = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const deg = (rad: number): number => (rad * 180) / Math.PI;

/* ---------------- lỗ sàn (giếng trời, thông tầng) ---------------- */

function drawSlabHoles(p: Project, levelId: string, push: Push): void {
  const slab = floorSlabOf(p, levelId);
  for (const hole of slab?.holes ?? []) {
    push("MUROS-VISTA", { kind: "polyline", pts: hole, close: true, weight: W.thin, dash: "2.5 1.2" }, slab!.id);
  }
}

/* ---------------- thang ---------------- */

function drawStairs(p: Project, levelId: string, mm: (v: number) => number, push: Push): void {
  for (const st of p.stairs) {
    const base = getLevel(p, st.level);
    if (!base) continue;
    const isHere = st.level === levelId;
    const isAbove = levelAbove(p, st.level)?.id === levelId;
    if (!isHere && !isAbove) continue;

    const lay = stairLayout(st, base);
    for (const f of lay.flights) {
      push("ESCALERAS", { kind: "polyline", pts: f.rect, close: true, weight: W.mid }, st.id);
      const across = vscale(rotate(f.dir, 90), st.width / 2);
      for (let i = 1; i <= f.treads; i++) {
        const c = add(f.start, vscale(f.dir, i * st.tread));
        push("ESCALERAS", { kind: "line", a: add(c, across), b: sub(c, across), weight: W.mid }, st.id);
      }
    }
    if (lay.landing) push("ESCALERAS", { kind: "polyline", pts: lay.landing, close: true, weight: W.mid }, st.id);

    // mũi tên đi lên: chân vế 1 → giữa chiếu nghỉ → lối ra
    const f1 = lay.flights[0]!;
    const f2 = lay.flights[lay.flights.length - 1]!;
    const pts: Point[] = [f1.start];
    if (lay.landing) {
      const lc = centroidOf(lay.landing);
      pts.push(add(f1.start, vscale(f1.dir, f1.treads * st.tread + (st.landing ?? st.width) / 2)), lc);
    }
    pts.push(lay.topExit.at);
    push("ESCALERAS", { kind: "polyline", pts, weight: W.thin }, st.id);
    const tip = lay.topExit.at;
    const d = lay.topExit.dir;
    const back = vscale(d, -mm(2.2));
    const side = vscale(rotate(d, 90), mm(0.8));
    push("ESCALERAS", { kind: "polygon", pts: [tip, add(add(tip, back), side), sub(add(tip, back), side)], fill: "#000" }, st.id);
    // nhãn chạy dọc vế 1, lệch khỏi đường mũi tên nửa vế
    const labelAt = add(
      add(f1.start, vscale(f1.dir, f1.treads * st.tread * 0.45)),
      vscale(rotate(f1.dir, 90), st.width * 0.24),
    );
    push("ESCALERAS", {
      kind: "text", at: labelAt, text: `SUBE ${st.steps} PELD.`, size: 2.2, anchor: "middle",
      along: { from: f1.start, to: add(f1.start, f1.dir) },
    }, st.id);

    // đường cắt zigzag trên vế 1 — chỉ ở mặt bằng tầng chân thang
    if (isHere) {
      const cutAt = add(f1.start, vscale(f1.dir, f1.treads * st.tread * 0.55));
      const a = add(cutAt, vscale(rotate(f1.dir, 90), st.width * 0.75));
      const b = sub(cutAt, vscale(rotate(f1.dir, 90), st.width * 0.75));
      const zig = zigzag(a, b, mm(1.2));
      push("ESCALERAS", { kind: "polyline", pts: zig, weight: W.mid }, st.id);
    }
  }
}

function centroidOf(poly: Point[]): Point {
  let x = 0, y = 0;
  for (const p of poly) { x += p[0]; y += p[1]; }
  return [x / poly.length, y / poly.length];
}

function zigzag(a: Point, b: Point, amp: number): Point[] {
  const d = sub(b, a);
  const n = vscale(rotate([d[0], d[1]], 90), amp / Math.hypot(d[0], d[1]));
  const at = (t: number): Point => [a[0] + d[0] * t, a[1] + d[1] * t];
  return [a, at(0.35), add(at(0.45), n), sub(at(0.55), n), at(0.65), b];
}

/* ---------------- nội thất ---------------- */

/** Artefactos sanitarios y de cocina (capa ARTEFACTOS). */
const FIXTURES = new Set(["bon-cau", "lavabo", "voi-sen", "bon-tam", "tu-bep-duoi", "tu-bep-tren", "tu-lanh", "bep", "binh-nong-lanh", "may-giat"]);
/** Tono del mobiliario en planta: gris claro, por debajo de muros, cotas y textos. */
export const FURNITURE_COLOR = "#b5b5b5";

function drawFurniture(p: Project, levelId: string, push: Push): void {
  for (const f of p.furniture) {
    if (f.level !== levelId) continue;
    const asset = getAsset(f.asset);
    if (!asset) continue;
    const corners = obbCorners(furnitureObb(f, asset));
    // estándar: artefactos y muebles en tono tenue (no compiten con muros ni rótulos); artefactos en su capa
    const layer: LayerName = FIXTURES.has(asset.category) ? "ARTEFACTOS" : "MOBILIARIO";
    // đồ treo (tủ bếp trên, máy lạnh…) — nét đứt theo quy ước "trên cao"
    const hung = asset.mountHeight != null || (f.elevation ?? 0) > 0;
    push(layer, { kind: "polyline", pts: corners, close: true, weight: W.hair, color: FURNITURE_COLOR, ...(hung ? { dash: "2 1" } : {}) }, f.id);
    for (const prim of furnitureGlyphPrims(asset.category, asset.footprint)) {
      const t = transformPrim(prim, f.at, f.rotation);
      const tenue = t.kind === "line" || t.kind === "polyline" || t.kind === "circle" || t.kind === "ellipse" ? { ...t, weight: W.hair, color: FURNITURE_COLOR } : t;
      push(layer, tenue, f.id);
    }
  }
}

/** Dời prim local (tâm footprint, rotation 0) ra thế giới — nuôi cả plan lẫn thumbnail. */
export function transformPrim(prim: Prim, at: Point, rotation: number): Prim {
  const T = (pt: Point): Point => add(at, rotate(pt, rotation));
  switch (prim.kind) {
    case "line":
      return { ...prim, a: T(prim.a), b: T(prim.b) };
    case "polyline":
    case "polygon":
      return { ...prim, pts: prim.pts.map(T) };
    case "circle":
      return { ...prim, c: T(prim.c) };
    case "ellipse":
      return { ...prim, c: T(prim.c), rot: prim.rot + rotation };
    case "arc":
      return { ...prim, c: T(prim.c), a0: prim.a0 + rotation, a1: prim.a1 + rotation };
    case "text":
      return { ...prim, at: T(prim.at) };
    default:
      return prim;
  }
}

/**
 * Ký hiệu 2D của asset trong hệ LOCAL (tâm footprint, rotation 0, mm) —
 * một nguồn cho mặt bằng + thumbnail catalog + contact sheet assets_search.
 */
export function furnitureGlyphPrims(category: string, fp: { w: number; d: number }, weightOverride?: number): Prim[] {
  const prims: Prim[] = [];
  const hair = weightOverride ?? W.hair;
  const line = (x0: number, y0: number, x1: number, y1: number, weight: number = hair) =>
    prims.push({ kind: "line", a: [x0, y0], b: [x1, y1], weight });
  const circle = (x: number, y: number, r: number) =>
    prims.push({ kind: "circle", c: [x, y], r, weight: hair });
  const rect = (x0: number, y0: number, x1: number, y1: number) =>
    prims.push({ kind: "polyline", pts: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], close: true, weight: hair });
  const ellipse = (x: number, y: number, rx: number, ry: number) =>
    prims.push({ kind: "ellipse", c: [x, y], rx, ry, rot: 0, weight: hair });
  const hw = fp.w / 2, hd = fp.d / 2;

  switch (category) {
    case "giuong":
    case "giuong-tang":
      rect(-hw + 70, -hd + 70, hw - 70, -hd + fp.d * 0.2); // gối
      line(-hw, -hd + fp.d * 0.32, hw, -hd + fp.d * 0.32); // mép chăn
      if (category === "giuong-tang") line(-hw, -hd, hw, hd, hair); // chéo = 2 tầng
      break;
    case "sofa":
      line(-hw, -hd + 140, hw, -hd + 140);
      line(-hw + 140, -hd + 140, -hw + 140, hd);
      line(hw - 140, -hd + 140, hw - 140, hd);
      break;
    case "ban-tra":
      rect(-hw + 50, -hd + 50, hw - 50, hd - 50);
      break;
    case "ke-tv":
      rect(-fp.w * 0.3, -45, fp.w * 0.3, 45);
      break;
    case "ban-an":
    case "ban-lam-viec":
    case "ban-trang-diem":
      rect(-hw + 60, -hd + 60, hw - 60, hd - 60);
      if (category === "ban-trang-diem") circle(0, -hd + 90, Math.min(180, fp.w * 0.18));
      break;
    case "ghe-an":
      line(-hw, -hd + 80, hw, -hd + 80); // tựa lưng
      break;
    case "ghe-xoay":
      circle(0, 0, Math.min(hw, hd) * 0.7);
      line(-hw + 60, -hd + 90, hw - 60, -hd + 90);
      break;
    case "tu-ao":
      line(0, -hd, 0, hd);
      line(-hw, -hd, 0, hd);
      break;
    case "tu-dau-giuong":
      break; // outline là đủ
    case "ke-sach": {
      const n = Math.max(2, Math.round(fp.w / 400));
      for (let i = 1; i < n; i++) line(-hw + (fp.w * i) / n, -hd, -hw + (fp.w * i) / n, hd);
      break;
    }
    case "tu-giay":
      line(-hw, -hd, hw, hd);
      break;
    case "tu-bep-duoi": {
      if (fp.w >= 1500) {
        rect(-hw + fp.w * 0.12, -170, -hw + fp.w * 0.12 + 460, 170); // chậu rửa
        circle(-hw + fp.w * 0.12 + 230, 0, 55);
      }
      if (fp.w >= 2200) {
        circle(hw - fp.w * 0.3, -105, 105); // 2 họng bếp
        circle(hw - fp.w * 0.3, 115, 105);
      }
      break;
    }
    case "tu-bep-tren":
      break; // nét đứt outline là đủ
    case "tu-lanh":
      line(-hw, -hd + fp.d * 0.33, hw, -hd + fp.d * 0.33);
      break;
    case "bep": // cocina: 4 platos
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) circle((sx * fp.w) / 4.4, (sy * fp.d) / 4.4, Math.min(fp.w, fp.d) / 7.5);
      break;
    case "bon-cau":
      rect(-hw, -hd, hw, -hd + 170); // két nước
      ellipse(0, fp.d * 0.12, fp.w * 0.42, fp.d * 0.3);
      break;
    case "lavabo":
      ellipse(0, 20, hw - 60, hd - 70);
      circle(0, -hd + 60, 26);
      break;
    case "voi-sen":
      line(-hw, -hd, hw, hd);
      circle(0, 0, 52);
      break;
    case "bon-tam":
      rect(-hw + 60, -hd + 60, hw - 60, hd - 60);
      circle(-hw + 200, 0, 40); // thoát nước
      break;
    case "guong":
      line(-hw, 0, hw, 0, W.thin);
      break;
    case "binh-nong-lanh":
      circle(0, 0, Math.min(hw, hd) * 0.7);
      break;
    case "may-giat":
      circle(0, 0, Math.min(hw, hd) * 0.62);
      break;
    case "may-lanh":
      line(-hw + 40, hd - 70, hw - 40, hd - 70);
      break;
    case "quat-cay":
    case "den-cay":
      circle(0, 0, Math.min(hw, hd) * 0.55);
      line(-Math.min(hw, hd) * 0.55, 0, Math.min(hw, hd) * 0.55, 0);
      break;
    case "cay-canh":
      circle(0, 0, Math.min(hw, hd) * 0.85);
      circle(-fp.w * 0.15, -fp.d * 0.1, fp.w * 0.22);
      circle(fp.w * 0.12, fp.d * 0.15, fp.w * 0.18);
      break;
    case "xe-may":
      circle(0, -hd + 240, 95);
      circle(0, hd - 240, 95);
      line(0, -hd + 240, 0, hd - 240);
      line(-hw + 60, -hd + 430, hw - 60, -hd + 430, W.thin); // ghi đông
      break;
    case "xe-dap":
      circle(0, -hd + 320, 320);
      circle(0, hd - 320, 320);
      line(0, -hd + 320, 0, hd - 320);
      break;
    case "o-to":
      rect(-hw + 80, -hd + 80, hw - 80, hd - 80);
      line(-hw + 80, -hd + fp.d * 0.28, hw - 80, -hd + fp.d * 0.28); // kính lái
      line(-hw + 80, hd - fp.d * 0.22, hw - 80, hd - fp.d * 0.22);
      break;
    case "ban-tho":
      line(-hw, 0, hw, 0);
      circle(-fp.w / 4, -hd / 2, 55);
      circle(0, -hd / 2, 55);
      circle(fp.w / 4, -hd / 2, 55);
      break;
    default:
      break;
  }
  return prims;
}

/* ---------------- dim 3 chuỗi ---------------- */

type DimSide = {
  axis: "x" | "y";
  edge: number;
  out: 1 | -1; // hướng ra ngoài theo trục còn lại
};

function drawDims(p: Project, walls: Wall[], b: Bounds, mm: (v: number) => number, push: Push): void {
  const sides: DimSide[] = [
    { axis: "x", edge: b.minY, out: -1 },
    { axis: "x", edge: b.maxY, out: 1 },
    { axis: "y", edge: b.minX, out: -1 },
    { axis: "y", edge: b.maxX, out: 1 },
  ];
  const eps = 1;

  for (const side of sides) {
    const detail = new Set<number>();
    for (const w of walls) {
      const d = wallDir(w);
      const alongSide = side.axis === "x" ? Math.abs(d[1]) < 1e-6 : Math.abs(d[0]) < 1e-6;
      // muro unido: sus extremos llegan a la cara del muro que encuentran (espesores completos)
      const jw = joinedWall(walls, w).wall;
      const band = wallBand(jw);
      const perpVals = band.map((pt) => (side.axis === "x" ? pt[1] : pt[0]));
      const touches = perpVals.some((v) => Math.abs(v - side.edge) <= eps);
      if (!touches) continue;
      const proj = (pt: Point): number => (side.axis === "x" ? pt[0] : pt[1]);
      if (alongSide) {
        // extremos en las CARAS (muro unido), no en el eje: el espesor se acota completo (10, no 5)
        detail.add(proj(jw.from));
        detail.add(proj(jw.to));
        for (const o of p.openings.filter((x) => x.wall === w.id)) {
          detail.add(proj(pointOnWall(w, o.offset)));
          detail.add(proj(pointOnWall(w, o.offset + o.width)));
        }
      } else {
        for (const v of band.map(proj)) detail.add(v);
      }
    }
    const pa = principalAxes(p);
    const axes = (side.axis === "x" ? pa.x : pa.y).map((a) => a.offset);
    const lo = side.axis === "x" ? b.minX : b.minY;
    const hi = side.axis === "x" ? b.maxX : b.maxY;
    detail.add(lo);
    detail.add(hi);

    const chains: Array<{ gap: number; events: number[] }> = [
      { gap: 8, events: [...detail].sort((a, z) => a - z) },
      { gap: 14, events: axes.length >= 2 ? [...axes].sort((a, z) => a - z) : [] },
      { gap: 20, events: [lo, hi] },
    ];

    // nét gióng: từ mép nhà tới chuỗi xa nhất chứa event
    const far = new Map<number, number>();
    for (const ch of chains) for (const v of ch.events) far.set(v, Math.max(far.get(v) ?? 0, ch.gap));
    for (const [v, gap] of far) {
      const a = pt(side, v, side.edge + side.out * mm(1.5));
      const bpt = pt(side, v, side.edge + side.out * mm(gap + 1.2));
      push("COTAS", { kind: "line", a, b: bpt, weight: W.hair });
    }

    for (const ch of chains) {
      if (ch.events.length < 2) continue;
      const linePos = side.edge + side.out * mm(ch.gap);
      const a = pt(side, ch.events[0]!, linePos);
      const z = pt(side, ch.events[ch.events.length - 1]!, linePos);
      push("COTAS", { kind: "line", a, b: z, weight: W.hair });
      for (const v of ch.events) {
        const c = pt(side, v, linePos);
        const t = mm(1.1);
        push("COTAS", { kind: "line", a: [c[0] - t, c[1] - t], b: [c[0] + t, c[1] + t], weight: W.mid });
      }
      let alt = 0;
      for (let i = 0; i + 1 < ch.events.length; i++) {
        const v0 = ch.events[i]!;
        const v1 = ch.events[i + 1]!;
        const len = Math.round(v1 - v0);
        if (len <= 0) continue;
        const text = cmText(len);
        const narrow = len / mm(1) < text.length * 1.9;
        const off = narrow ? side.out * mm(2.1 + (alt++ % 2) * 2.2) : -side.out * mm(1.0);
        const at = pt(side, (v0 + v1) / 2, linePos + off);
        push("COTAS", {
          kind: "text", at, text, size: 2.5, anchor: "middle",
          along: { from: pt(side, v0, linePos), to: pt(side, v1, linePos) },
        });
        push("COTAS", {
          kind: "dim", a: pt(side, v0, side.edge), b: pt(side, v1, side.edge), line: pt(side, v1, linePos),
          rot: side.axis === "x" ? 0 : 90, text, textAt: at,
        });
      }
    }
  }
}

function pt(side: DimSide, along: number, perp: number): Point {
  return side.axis === "x" ? [along, perp] : [perp, along];
}

/* ---------------- nhãn phòng + cao độ ---------------- */

/** Recintos con cotas interiores (estándar: solo los importantes; nunca baños, circulaciones, patios…). */
const DIM_USES = new Set<RoomUse>(["ngu", "khach", "bep-an", "lam-viec", "gara", "tho"]);

type Box = { minX: number; minY: number; maxX: number; maxY: number };
const boxOf = (pts: Point[]): Box => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
  return { minX, minY, maxX, maxY };
};
const overlaps = (a: Box, b: Box): boolean => a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;

/** Centroide de ÁREA (no el promedio de vértices: con recintos en L o con ranuras caía afuera). */
function areaCentroid(poly: Point[]): Point {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i]!;
    const [x1, y1] = poly[(i + 1) % poly.length]!;
    const k = x0 * y1 - x1 * y0;
    a += k; cx += (x0 + x1) * k; cy += (y0 + y1) * k;
  }
  if (Math.abs(a) < 1e-9) return centroidOf(poly);
  return [cx / (3 * a), cy / (3 * a)];
}

/** Banda (mm de papel) que ocupa una cota interior: del lado de su texto y del lado opuesto. */
const DIM_BAND = { text: 3.2, other: 0.8 };
/** Posiciones candidatas de las cotas interiores (fracción del ancho/fondo), en orden de preferencia. */
const DIM_FRACTIONS = [0.3, 0.2, 0.4, 0.7, 0.8, 0.6, 0.15, 0.85, 0.5];

/**
 * Cotas interiores de un recinto (null si no lleva): ancho y fondo, en la primera posición cuya
 * banda no pise ninguna etiqueta (`avoid`). Si ninguna está libre, esa cota se omite (lámina limpia).
 */
function roomDimLines(r: Room, mm: (v: number) => number, avoid: Box[]): { h: [Point, Point] | null; v: [Point, Point] | null } | null {
  if (!DIM_USES.has(r.use) || areaM2(r.polygon) < 2) return null;
  const b = boxOf(r.polygon);
  const w = b.maxX - b.minX, h = b.maxY - b.minY;
  const [tp, op] = [mm(DIM_BAND.text), mm(DIM_BAND.other)];
  const free = (band: Box): boolean => !avoid.some((o) => overlaps(band, o));
  // el texto de la cota horizontal va en +y y el de la vertical en −x (ver drawRoomDims)
  const y = DIM_FRACTIONS.map((f) => b.minY + h * f).find((y) => free({ minX: b.minX, maxX: b.maxX, minY: y - op, maxY: y + tp }));
  const x = DIM_FRACTIONS.map((f) => b.minX + w * f).find((x) => free({ minX: x - tp, maxX: x + op, minY: b.minY, maxY: b.maxY }));
  return {
    h: y !== undefined && w >= mm(6) && h >= mm(5) ? [[b.minX, y], [b.maxX, y]] : null,
    v: x !== undefined && h >= mm(6) && w >= mm(5) ? [[x, b.minY], [x, b.maxY]] : null,
  };
}

/**
 * Obstáculos de un piso para las etiquetas. `walls` = solo muros (último recurso). `hard` (muros, escaleras, barridos de puertas,
 * línea de corte) nunca se pisan; `soft` (muebles) solo se evitan si hay lugar. Las cotas interiores no
 * son obstáculo: se ubican después, esquivando las etiquetas.
 */
function labelObstacles(p: Project, level: Level, mm: (v: number) => number): { walls: Box[]; hard: Box[]; soft: Box[] } {
  const out: Box[] = [];
  const soft: Box[] = [];
  for (const f of p.furniture) {
    if (f.level !== level.id) continue;
    const asset = getAsset(f.asset);
    if (asset) soft.push(boxOf(obbCorners(furnitureObb(f, asset))));
  }
  for (const st of p.stairs) {
    const base = getLevel(p, st.level);
    if (!base || (st.level !== level.id && levelAbove(p, st.level)?.id !== level.id)) continue;
    out.push(boxOf(stairLayout(st, base).footprint));
  }
  for (const o of p.openings) {
    const w = p.walls.find((x) => x.id === o.wall);
    if (!w || w.level !== level.id || o.kind !== "door") continue;
    const swing = o.swing ?? defaultSwing(p, o);
    if (swing === "slide" || swing === "none") continue;
    // cuarto de círculo real del barrido (lado y mano del giro), no un cuadrado a ambos lados del muro
    const right = swing.endsWith("-R");
    const hinge = pointOnWall(w, right ? o.offset + o.width : o.offset);
    const along = vscale(wallDir(w), right ? -o.width : o.width);
    const side = vscale(wallNormal(w), (swing.startsWith("in") ? 1 : -1) * (o.width + w.thickness / 2));
    out.push(boxOf([hinge, add(hinge, along), add(hinge, side), add(add(hinge, along), side)]));
  }
  // muros: el rótulo queda dentro de las caras interiores (los oblicuos se muestrean en cajas)
  const walls: Box[] = [];
  for (const w of p.walls) {
    if (w.level !== level.id) continue;
    const d = wallDir(w);
    if (Math.abs(d[0]) < 1e-3 || Math.abs(d[1]) < 1e-3) { walls.push(boxOf(wallBand(w))); continue; }
    const h = w.thickness / 2;
    for (let s = 0; s <= wallLength(w); s += w.thickness) {
      const [x, y] = pointOnWall(w, s);
      walls.push({ minX: x - h, minY: y - h, maxX: x + h, maxY: y + h });
    }
  }
  out.push(...walls);
  // líneas de corte A-A' y B-B' (misma condición de visibilidad que drawSectionMark)
  for (const c of sectionMarkVisible(p, level.id) ? sectionCuts(p) : []) {
    out.push(c.axis === "x"
      ? { minX: c.at - mm(1), maxX: c.at + mm(1), minY: -Infinity, maxY: Infinity }
      : { minX: -Infinity, maxX: Infinity, minY: c.at - mm(1), maxY: c.at + mm(1) });
  }
  return { walls, hard: out, soft: [...out, ...soft] };
}

/** Punto de una grilla dentro de `poly` más cercano a `target` cuyo bloque (`corners`) cabe libre. */
function findSpot(poly: Point[], corners: (c: Point) => Point[], obstacles: Box[], target: Point, ok: (box: Box) => boolean = () => true): { c: Point; box: Box } | null {
  const rb = boxOf(poly);
  const gs = Math.max(50, Math.min(rb.maxX - rb.minX, rb.maxY - rb.minY) / 16);
  let best: { c: Point; box: Box; d: number } | null = null;
  for (let x = rb.minX + gs / 2; x < rb.maxX; x += gs) {
    for (let y = rb.minY + gs / 2; y < rb.maxY; y += gs) {
      const c: Point = [x, y];
      const cs = corners(c);
      if (!cs.every((q) => pointInPolygon(q, poly))) continue;
      const box = boxOf(cs);
      if (obstacles.some((o) => overlaps(box, o)) || !ok(box)) continue;
      const d = Math.hypot(x - target[0], y - target[1]);
      if (!best || d < best.d) best = { c, box, d };
    }
  }
  return best && { c: best.c, box: best.box };
}

/** Tamaños del rótulo (mm de papel): [nombre, superficie]. Todos usan el primero; el segundo solo si no cabe. */
const LABEL_SIZES: Array<[number, number]> = [[3.0, 2.5], [2.5, 2.0], [2.0, 1.8]];

/** Formas de partir el nombre: una línea, dos líneas equilibradas, una palabra por línea. */
function nameLayouts(name: string): string[][] {
  const words = name.split(/\s+/).filter(Boolean);
  const out: string[][] = [[words.join(" ")]];
  const longest = (l: string[]): number => Math.max(...l.map((s) => s.length));
  if (words.length >= 2) {
    let best: string[] | null = null;
    for (let i = 1; i < words.length; i++) {
      const l = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
      if (!best || longest(l) < longest(best)) best = l;
    }
    out.push(best!);
  }
  if (words.length >= 3) out.push(words);
  return out;
}

/**
 * Etiqueta de recinto (estándar): SIEMPRE horizontal. Nombre centrado (partido en líneas si no
 * cabe) y la superficie debajo, centrada y un poco más chica; mismo tamaño en todos los recintos.
 * Va en el punto libre más cercano al centroide de área, con el bloque completo dentro de las
 * caras interiores de los muros, dejando lugar a las 2 cotas. Nunca pisa muros, puertas,
 * escaleras, la línea de corte ni otra etiqueta; a muebles solo si no hay lugar. Devuelve las
 * cajas ocupadas (las cotas interiores las esquivan).
 */
function drawRoomLabels(p: Project, level: Level, paperVec: (dx: number, dy: number) => Point, mm: (v: number) => number, push: Push): Box[] {
  const rooms = p.rooms.filter((r) => r.level === level.id && r.use !== "cau-thang"); // la escalera se rotula sola
  const tiers = labelObstacles(p, level, mm);
  const taken: Box[] = [];
  const placedAt = new Map<string, Point>();

  type Block = { lines: string[]; size1: number; size2: number; lh: number; ya: number; halfW: number; top: number; bottom: number };
  const block = (lines: string[], areaText: string, size1: number, size2: number): Block => {
    const lh = size1 * 1.3;
    const ya = (lines.length - 1) * lh + size1 * 0.55 + size2 * 0.75 + 0.4;
    const halfW = Math.max(...lines.map((s) => s.length * size1 * 0.6), areaText.length * size2 * 0.6) / 2 + 1;
    return { lines, size1, size2, lh, ya, halfW, top: size1 * 0.6 + 0.8, bottom: ya + size2 * 0.6 + 0.8 };
  };
  const draw = (r: Room, c: Point, b: Block, areaText: string): void => {
    b.lines.forEach((line, i) => push("TEXTOS", { kind: "text", at: add(c, paperVec(0, i * b.lh)), text: line, size: b.size1, anchor: "middle" }, r.id));
    push("TEXTOS", { kind: "text", at: add(c, paperVec(0, b.ya)), text: areaText, size: b.size2, anchor: "middle" }, r.id);
  };

  for (const r of rooms) {
    const areaText = `${areaM2(r.polygon).toFixed(1)}m²`;
    const center = areaCentroid(r.polygon);
    const layouts = nameLayouts(r.name.toUpperCase());
    // en recintos con cotas, primero se exige que el ancho y el fondo sigan cabiendo junto a la etiqueta
    const full = roomDimLines(r, mm, []);
    const dimsFit = (box: Box): boolean => {
      const d = roomDimLines(r, mm, [box]);
      return !full || ((!full.h || !!d?.h) && (!full.v || !!d?.v));
    };
    let placed = false;
    const oks = full ? [dimsFit, () => true] : [() => true];
    search: for (const ok of oks) {
      // todos los tamaños sin pisar puertas/escaleras/corte; solo al final, pisándolos (nunca muros)
      for (const [[size1, size2], obstacles] of [...LABEL_SIZES.flatMap((sz) => [[sz, tiers.soft], [sz, tiers.hard]] as const), ...LABEL_SIZES.map((sz) => [sz, tiers.walls] as const)]) {
        if (obstacles === tiers.walls && ok !== oks[oks.length - 1]) continue; // pisar puertas: lo último de todo
        for (const lines of layouts) {
          const b = block(lines, areaText, size1, size2);
          const corners = (c: Point): Point[] =>
            [paperVec(-b.halfW, -b.top), paperVec(b.halfW, -b.top), paperVec(b.halfW, b.bottom), paperVec(-b.halfW, b.bottom)].map((v) => add(c, v));
          const spot = findSpot(r.polygon, corners, [...obstacles, ...taken], center, ok);
          if (!spot) continue;
          draw(r, spot.c, b, areaText);
          taken.push(spot.box);
          placedAt.set(r.id, add(spot.c, paperVec(0, b.bottom)));
          placed = true;
          break search;
        }
      }
    }
    if (placed) continue;
    // sin lugar libre: al centroide, horizontal, en el tamaño menor y una palabra por línea
    const [size1, size2] = LABEL_SIZES[LABEL_SIZES.length - 1]!;
    draw(r, center, block(layouts[layouts.length - 1]!, areaText, size1, size2), areaText);
  }

  // cota de nivel en el recinto más grande: bajo su etiqueta si cabe, si no en el lugar libre más cercano
  const biggest = [...rooms].sort((a, b) => areaM2(b.polygon) - areaM2(a.polygon))[0];
  if (biggest) {
    const corners = (at: Point): Point[] => [paperVec(-5, -3.6), paperVec(5, -3.6), paperVec(5, 2.4), paperVec(-5, 2.4)].map((v) => add(at, v));
    const target = placedAt.get(biggest.id) ?? areaCentroid(biggest.polygon);
    const spot = findSpot(biggest.polygon, corners, [...tiers.hard, ...taken], add(target, paperVec(0, 4.6)));
    if (spot) {
      const at = spot.c;
      const e = level.elevation;
      const label = e === 0 ? "±0.000" : `${e > 0 ? "+" : "−"}${(Math.abs(e) / 1000).toFixed(3)}`;
      const s1 = paperVec(-1.4, 0), s2 = paperVec(1.4, 0), tip = paperVec(0, 1.6);
      push("TEXTOS", { kind: "polyline", pts: [add(at, s1), add(at, s2), add(at, tip)], close: true, weight: W.thin });
      push("TEXTOS", { kind: "text", at: add(at, paperVec(0, -1.2)), text: label, size: 2.5, anchor: "middle" });
      taken.push(spot.box);
    }
  }
  return taken;
}

/* ---------------- dim thông thủy trong nhà (P4, doc 08) ---------------- */

/** Cotas interiores (estándar: máx. ancho y fondo, solo recintos importantes), esquivando etiquetas. */
function drawRoomDims(p: Project, levelId: string, mm: (v: number) => number, labels: Box[], push: Push): void {
  const t = mm(1.1);
  for (const r of p.rooms) {
    if (r.level !== levelId) continue;
    const d = roomDimLines(r, mm, labels);
    if (!d) continue;
    if (d.h) {
      const [a, b] = d.h;
      const y = a[1];
      push("COTAS", { kind: "line", a, b, weight: W.hair });
      dimTick(push, "COTAS", a, t);
      dimTick(push, "COTAS", b, t);
      const at: Point = [(a[0] + b[0]) / 2, y + mm(1.0)];
      const text = cmText(b[0] - a[0]);
      push("COTAS", { kind: "text", at, text, size: 2.5, anchor: "middle", along: { from: a, to: b } });
      push("COTAS", { kind: "dim", a, b, line: b, rot: 0, text, textAt: at }, r.id);
    }
    if (d.v) {
      const [a, b] = d.v;
      const x = a[0];
      push("COTAS", { kind: "line", a, b, weight: W.hair });
      dimTick(push, "COTAS", a, t);
      dimTick(push, "COTAS", b, t);
      const at: Point = [x - mm(1.0), a[1] + (b[1] - a[1]) * 0.3];
      const text = cmText(b[1] - a[1]);
      push("COTAS", { kind: "text", at, text, size: 2.5, anchor: "middle", along: { from: a, to: b } });
      push("COTAS", { kind: "dim", a, b, line: b, rot: 90, text, textAt: at }, r.id);
    }
  }
}

/* ---------------- cortes A-A' y B-B' (estándar: siempre los dos) ---------------- */

/**
 * Un corte: plano axis = at (axis "x": x = at). v = sentido de la mirada (en planta).
 * A-A' es transversal (corta la cumbrera); B-B' es longitudinal (paralelo a ella).
 */
export type SectionCut = { name: "A" | "B"; axis: "x" | "y"; at: number; v: Point };

/** Eje largo del edificio: el de la cumbrera; sin techumbre, el lado mayor de los muros. */
function longAxis(p: Project): "x" | "y" {
  const rf = roofsOf(p).find((r) => r.kind === "gable") ?? roofsOf(p)[0];
  const b = boxOf(rf ? rf.outline : p.walls.flatMap((w) => [w.from, w.to]));
  return rf?.ridgeAxis ?? (b.maxX - b.minX >= b.maxY - b.minY ? "x" : "y");
}

/** Los dos cortes del estándar; [] sin muros. */
export function sectionCuts(p: Project): SectionCut[] {
  if (p.walls.length === 0) return [];
  const L = longAxis(p);
  const T: "x" | "y" = L === "x" ? "y" : "x";
  // A-A' corta la cumbrera: su plano es perpendicular a ella (x = c si la cumbrera corre en x)
  const view = (axis: "x" | "y"): Point => (axis === "x" ? [-1, 0] : [0, 1]);
  return [
    { name: "A", axis: L, at: cutPosition(p, L), v: view(L) },
    { name: "B", axis: T, at: cutPosition(p, T), v: view(T) },
  ];
}

/**
 * Posición del plano axis = c. Con una escalera cuyo tramo corre a lo largo del corte, por el
 * centro de ese tramo. Si no, por donde más detalle muestre: el c que corta más recintos (4 c/u),
 * ventanas (2 + ancho en m c/u, por una hoja lejos de los rótulos) y puertas (1 c/u); candidatos:
 * los vanos y el centro de cada recinto. Empate → el más cercano al centro de la obra. Nunca sobre
 * el eje de un muro paralelo al corte.
 */
function cutPosition(p: Project, axis: "x" | "y"): number {
  const k = axis === "x" ? 0 : 1;
  const st = p.stairs[0];
  const base = st && getLevel(p, st.level);
  if (st && base) {
    const f = stairLayout(st, base).flights[0]!;
    if (Math.abs(f.dir[1 - k]!) > 0.7) return f.rect.reduce((acc, pt) => acc + pt[k]!, 0) / f.rect.length;
  }
  const crosses = (w: Wall): boolean => Math.abs(w.to[k]! - w.from[k]!) > 1;
  const cs = p.walls.flatMap((w) => [w.from[k]!, w.to[k]!]);
  const mid = (Math.min(...cs) + Math.max(...cs)) / 2;
  const lo = (bb: Box): number => (k === 0 ? bb.minX : bb.minY);
  const hi = (bb: Box): number => (k === 0 ? bb.maxX : bb.maxY);
  const roomsAt = (c: number): Room[] => p.rooms.filter((r) => { const bb = boxOf(r.polygon); return c > lo(bb) && c < hi(bb); });
  const clearance = (c: number): number => Math.min(Infinity, ...roomsAt(c).map((r) => Math.abs(areaCentroid(r.polygon)[k]! - c)));
  let best: { c: number; score: number } | null = null;
  const onParallelWall = (x: number): boolean => p.walls.some((v) => !crosses(v) && Math.abs(v.from[k]! - x) < v.thickness / 2 + 50);
  const candidates: number[] = p.rooms.map((r) => areaCentroid(r.polygon)[k]!).filter((x) => !onParallelWall(x));
  for (const o of p.openings) {
    const w = p.walls.find((x) => x.id === o.wall);
    if (!w || !crosses(w)) continue;
    const c = (o.kind === "window" ? [0.15, 0.25, 0.35, 0.65, 0.75, 0.85] : [0.5])
      .map((t) => pointOnWall(w, o.offset + o.width * t)[k]!)
      .filter((x) => !onParallelWall(x))
      .sort((a, b) => clearance(b) - clearance(a))[0];
    if (c !== undefined) candidates.push(c);
  }
  for (const c of candidates) {
    let score = 0;
    for (const q of p.openings) {
      const v = p.walls.find((y) => y.id === q.wall);
      if (!v || !crosses(v)) continue;
      const [a, b] = [pointOnWall(v, q.offset)[k]!, pointOnWall(v, q.offset + q.width)[k]!];
      if (c > Math.min(a, b) && c < Math.max(a, b)) score += q.kind === "window" ? 2 + q.width / 1000 : 1;
    }
    score += 4 * roomsAt(c).length;
    if (!best || score > best.score || (score === best.score && Math.abs(c - mid) < Math.abs(best.c - mid))) best = { c, score };
  }
  return best?.c ?? mid;
}

/** ¿Las marcas de corte se dibujan en este piso? Con escalera, en sus pisos; sin escalera, en todos. */
function sectionMarkVisible(p: Project, levelId: string): boolean {
  const st = p.stairs[0];
  return st ? st.level === levelId || levelAbove(p, st.level)?.id === levelId : true;
}

function drawSectionMark(p: Project, levelId: string, b: Bounds, mm: (v: number) => number, push: Push): void {
  if (!sectionMarkVisible(p, levelId)) return;
  for (const cut of sectionCuts(p)) {
    // la línea recorre la obra a lo largo del corte; en planta: (along, at) según el eje
    const P = (along: number): Point => (cut.axis === "x" ? [cut.at, along] : [along, cut.at]);
    const [s0, s1] = cut.axis === "x" ? [b.minY - mm(4), b.maxY + mm(4)] : [b.minX - mm(4), b.maxX + mm(4)];
    // estándar: línea de corte magenta, segmentada y gruesa; rótulos X (inicio) y X' (fin)
    push("TEXTOS", { kind: "line", a: P(s0), b: P(s1), weight: W.strong, dash: "8 3", color: CUT_COLOR });
    for (const [sEnd, dir, label] of [[s0, 1, cut.name], [s1, -1, `${cut.name}'`]] as Array<[number, number, string]>) {
      // tramo grueso en el extremo + flecha que indica el SENTIDO DE LA MIRADA (cut.v)
      push("TEXTOS", { kind: "line", a: P(sEnd), b: P(sEnd + dir * mm(2.5)), weight: W.frame, color: CUT_COLOR });
      const e = P(sEnd);
      const v = cut.v;
      const side: Point = [-v[1], v[0]];
      const tip: Point = [e[0] + v[0] * mm(3.6), e[1] + v[1] * mm(3.6)];
      const base: Point = [e[0] + v[0] * mm(0.6), e[1] + v[1] * mm(0.6)];
      push("TEXTOS", {
        kind: "polygon",
        pts: [tip, [base[0] + side[0] * mm(1.1), base[1] + side[1] * mm(1.1)], [base[0] - side[0] * mm(1.1), base[1] - side[1] * mm(1.1)]],
        fill: CUT_COLOR,
      });
      const at: Point = [e[0] - v[0] * mm(2.6), e[1] - v[1] * mm(2.6)];
      push("TEXTOS", { kind: "text", at, text: label, size: 3.5, anchor: "middle", bold: true, color: CUT_COLOR });
    }
  }
}

function norm(v: Point): Point {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

export { LAYERS };
