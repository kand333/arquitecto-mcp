import {
  add, joinedWall, pointOnWall, roofGeometry, roofProfile, roofsOf, scale, stairLayout, sub, unverifiedRules,
  wallBand, wallDir, wallLength,
  type Point, type Polygon, type Project,
} from "@arquitecto/core";
import { principalAxes } from "./axes.js";
import {
  AREA, FOOT_WING, FOOTING, PLINTH, WOOD, buildModel, horizontalDims, insideSpans, isZinc, levelColumn, movePrim,
  projectView, projector, sheetTransform, verticalDims, woodStructure,
  type Box3, type Model3, type V3,
} from "./elevations.js";
import { cmText, drawSheetFrame } from "./frame.js";
import { sectionCuts, type SectionCut } from "./plan-scene.js";
import { AXIS_COLOR, W, type LayerName, type Prim, type Scene2D } from "./scene.js";
import { slidingWindowSection } from "./sliding.js";
import type { PlanTransform } from "./transform.js";

/**
 * Cortes A-A' (transversal) y B-B' (longitudinal), siempre los dos y en UNA lámina (estándar del
 * usuario, plantilla «corte BB ejemplo standar»). Cada corte usa el modelo 3D de las elevaciones
 * con un plano de corte: lo de delante se descarta, lo cortado se dibuja con su detalle y lo de
 * atrás se ve con ocultamiento real. Con estructura de madera (terminación scope "structure"):
 * muro sándwich con soleras y cadenetas, cerchas y costaneras, lana de vidrio sobre el cielo,
 * rótulos con línea de llamada y el detalle del muro UNA vez por lámina.
 */

export type SectionBuild = { items: Scene2D; tf: PlanTransform; meta: { title: string; scaleLabel: string } };
export type SectionOptions = { date?: string; designer?: string; scale?: number; sheetNo?: string };

type Put = (layer: LayerName, prim: Prim, dataId?: string) => void;
type Item = { layer: LayerName; prim: Prim; dataId?: string };

const CUT_FILL: Record<string, string | undefined> = {
  gach: "#1f1f1f",
  btct: "#000000",
  "vach-nhe": "#8a8a8a",
  kinh: undefined,
};

/** Muro de madera (sándwich): terciado ranurado de 12 mm por cara; soleras y cadenetas de 5 cm. */
const PLY = 12;
const PIECE = 50;
const NOGGING = 500; // cadenetas cada 50 cm
const BIG = 1e6;

/** Các khoảng [y0,y1] mà đường thẳng đứng x=cut đi QUA TRONG polygon. */
export function cutIntervals(poly: Polygon, cut: number): Array<[number, number]> {
  const ys: number[] = [];
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = poly[i]!;
    const [x1, y1] = poly[(i + 1) % n]!;
    if ((x0 - cut) * (x1 - cut) >= 0) continue; // không cắt qua (chạm đỉnh bỏ qua — đủ cho concept)
    const t = (cut - x0) / (x1 - x0);
    ys.push(y0 + t * (y1 - y0));
  }
  ys.sort((a, b) => a - b);
  const out: Array<[number, number]> = [];
  for (let i = 0; i + 1 < ys.length; i += 2) out.push([ys[i]!, ys[i + 1]!]);
  return out;
}

/** [a] trừ [b] trên trục số. */
function subtractIntervals(a: Array<[number, number]>, b: Array<[number, number]>): Array<[number, number]> {
  let cur = a;
  for (const [b0, b1] of b) {
    const next: Array<[number, number]> = [];
    for (const [a0, a1] of cur) {
      if (b1 <= a0 || b0 >= a1) {
        next.push([a0, a1]);
        continue;
      }
      if (b0 > a0) next.push([a0, b0]);
      if (b1 < a1) next.push([b1, a1]);
    }
    cur = next;
  }
  return cur;
}

const rect = (u0: number, u1: number, z0: number, z1: number): Point[] => [[u0, z0], [u1, z0], [u1, z1], [u0, z1]];

/** Envolvente convexa (puntos del corte de una pieza). */
function hull(pts: Point[]): Point[] {
  const c: Point = [pts.reduce((s, q) => s + q[0], 0) / pts.length, pts.reduce((s, q) => s + q[1], 0) / pts.length];
  const uniq = pts.filter((q, i) => pts.findIndex((r) => Math.hypot(r[0] - q[0], r[1] - q[1]) < 0.5) === i);
  return uniq.sort((a, b) => Math.atan2(a[1] - c[1], a[0] - c[0]) - Math.atan2(b[1] - c[1], b[0] - c[0]));
}

/** Corte de una pieza de madera por el plano de profundidad dc: polígono (u, z) o null. */
function boxCap(b: Box3, P: ReturnType<typeof projector>, dc: number): Point[] | null {
  const [e1, e2, e3] = b.e;
  const corner = (i: number, j: number, k: number): V3 => [
    b.o[0] + e1[0] * i + e2[0] * j + e3[0] * k, b.o[1] + e1[1] * i + e2[1] * j + e3[1] * k, b.o[2] + e1[2] * i + e2[2] * j + e3[2] * k,
  ];
  const pts: Point[] = [];
  for (const [a, c] of [
    [[0, 0, 0], [1, 0, 0]], [[0, 1, 0], [1, 1, 0]], [[0, 0, 1], [1, 0, 1]], [[0, 1, 1], [1, 1, 1]],
    [[0, 0, 0], [0, 1, 0]], [[1, 0, 0], [1, 1, 0]], [[0, 0, 1], [0, 1, 1]], [[1, 0, 1], [1, 1, 1]],
    [[0, 0, 0], [0, 0, 1]], [[1, 0, 0], [1, 0, 1]], [[0, 1, 0], [0, 1, 1]], [[1, 1, 0], [1, 1, 1]],
  ] as Array<[[number, number, number], [number, number, number]]>) {
    const qa = corner(...a), qc = corner(...c);
    const [da, dd] = [P.depth(qa) - dc, P.depth(qc) - dc];
    if (da * dd > 0 || da === dd) continue;
    const t = da / (da - dd);
    pts.push(P.uz([qa[0] + (qc[0] - qa[0]) * t, qa[1] + (qc[1] - qa[1]) * t, qa[2] + (qc[2] - qa[2]) * t]));
  }
  return pts.length >= 3 ? hull(pts) : null;
}

/** Espiral de la aislación (lana) entre u0 y u1, con base z0 y alto h. */
function coil(u0: number, u1: number, z0: number, h: number): Point[] {
  const R = h / 2, k = 8; // avance por radián
  const pts: Point[] = [];
  for (let th = 0; u0 + k * th <= u1; th += Math.PI / 6) pts.push([u0 + k * th + R * 0.6 * Math.sin(th), z0 + R - R * Math.cos(th)]);
  return pts;
}

// ── geometría de un corte (sin anotaciones; independiente de la escala) ─────────

type CutWall = { id: string; u0: number; u1: number; z0: number; z1: number; holes: Array<[number, number]>; low: boolean; wood: boolean; lowest: boolean };
type Note = { text: string; at: Point };
type CutGeom = {
  cut: SectionCut;
  items: Item[];
  u0: number; u1: number; z0: number; z1: number;
  walls: CutWall[];
  rooms: Array<{ name: string; u: number; w: number; z: number; floor: number; h: number }>;
  axes: Array<{ id: string; label: string; u: number }>;
  openZ: number[];
  tops: number[];
  notes: Note[];
};

function cutGeometry(p: Project, m: Model3, cut: SectionCut): CutGeom {
  const n: Point = [-cut.v[0], -cut.v[1]];
  const P = projector(n);
  const dc = cut.axis === "x" ? cut.at * cut.v[0] : cut.at * cut.v[1];
  const A = P.at(-BIG, dc), B = P.at(BIG, dc);
  const uOf = (t: number): number => -BIG + 2 * BIG * t;
  const r: Point = [cut.v[1], -cut.v[0]];
  const wood = !!woodStructure(p);
  const items: Item[] = [];
  const put: Put = (layer, prim, dataId) => items.push({ layer, prim, ...(dataId ? { dataId } : {}) });
  const occluders: Point[][] = [];
  const lowest = Math.min(...p.levels.map((l) => l.elevation));

  // ── muros cortados ──
  const walls: CutWall[] = [];
  const openZ: number[] = [];
  const cutOpenings: string[] = [];
  for (const level of p.levels) {
    const lw = p.walls.filter((w) => w.level === level.id);
    for (const w of lw) {
      const { wall: jw, shift } = joinedWall(lw, w);
      for (const [t0, t1] of insideSpans(A, B, wallBand(jw))) {
        const [u0, u1] = [uOf(t0), uOf(t1)];
        const q = add(A, scale(sub(B, A), (t0 + t1) / 2));
        const s = (q[0] - jw.from[0]) * wallDir(jw)[0] + (q[1] - jw.from[1]) * wallDir(jw)[1] - shift;
        const h = w.height ?? level.height;
        const holes: Array<[number, number]> = [];
        for (const o of p.openings.filter((x) => x.wall === w.id)) {
          if (s < o.offset || s > o.offset + o.width) continue;
          const z0 = level.elevation + o.sill;
          holes.push([z0, z0 + o.height]);
          cutOpenings.push(o.id);
          if (o.kind === "window" && p.styles.openings[o.style]?.leaf === "truot") {
            slidingWindowSection((u0 + u1) / 2, u1 - u0, z0, z0 + o.height, o.id, (layer, prim, id) => put(layer, prim, id));
          }
        }
        walls.push({
          id: w.id, u0, u1, z0: level.elevation, z1: level.elevation + h, holes: holes.sort((a, b) => a[0] - b[0]),
          low: h < 1200, wood: wood && w.thickness <= 150 && h >= 1200, lowest: level.elevation === lowest,
        });
      }
    }
  }
  for (const cw of walls) {
    const zs = [cw.z0, ...cw.holes.flat(), cw.z1];
    for (let i = 0; i + 1 < zs.length; i += 2) {
      const [a, b] = [zs[i]!, zs[i + 1]!];
      if (b - a < 1) continue;
      occluders.push(rect(cw.u0, cw.u1, a, b));
      if (cw.wood) woodWall(cw, a, b, put);
      else put("MUROS-CORTE", { kind: "polygon", pts: rect(cw.u0, cw.u1, a, b), fill: CUT_FILL[p.walls.find((w) => w.id === cw.id)!.kind], weight: W.cut }, cw.id);
    }
  }

  // ── losas cortadas ──
  for (const sl of p.slabs) {
    const level = p.levels.find((l) => l.id === sl.level);
    if (!level) continue;
    const top = sl.kind === "floor" ? level.elevation : level.elevation + level.height;
    let spans = insideSpans(A, B, sl.outline).map(([t0, t1]): [number, number] => [uOf(t0), uOf(t1)]);
    for (const hole of sl.holes ?? []) spans = subtractIntervals(spans, insideSpans(A, B, hole).map(([t0, t1]): [number, number] => [uOf(t0), uOf(t1)]));
    for (const [u0, u1] of spans) {
      const pts = rect(u0, u1, top - sl.thickness, top);
      occluders.push(pts);
      put("MUROS-CORTE", { kind: "polygon", pts, fill: "#000000", weight: W.cut }, sl.id);
    }
  }

  // ── techumbre cortada ──
  const tops: number[] = [];
  const notes: Note[] = [];
  for (const rf of roofsOf(p)) {
    const lv = p.levels.find((l) => l.id === rf.level);
    if (!lv) continue;
    const g = roofGeometry(rf, lv);
    const T = rf.thickness ?? 150;
    tops.push(g.ridgeZ + T);
    for (const line of roofProfile(g, rf, A, B)) {
      const pts: Point[] = line.map(([sv, z]) => [-BIG + sv, z]);
      if (pts.length < 2) continue;
      const strip: Point[] = [...pts.map(([u, z]): Point => [u, z + T]), ...[...pts].reverse()];
      occluders.push(strip);
      if (!wood) {
        put("MUROS-CORTE", { kind: "polygon", pts: strip, fill: "#000000", weight: W.cut }, rf.id);
        continue;
      }
      // madera: plancha de zinc sobre las costaneras; tapacán en los extremos; canal en el alero
      put("TECHUMBRE", { kind: "polyline", pts: pts.map(([u, z]): Point => [u, z + T]), weight: W.mid }, rf.id);
      for (const [end, out] of [[pts[0]!, -1], [pts[pts.length - 1]!, 1]] as Array<[Point, number]>) {
        put("TECHUMBRE", { kind: "line", a: end, b: [end[0], end[1] + T], weight: W.mid }, rf.id);
        if (isZinc(rf) && Math.abs(end[1] - g.baseZ) < 1) {
          const R = 60, arc: Point[] = [];
          for (let k = 0; k <= 8; k++) { const th = Math.PI + (Math.PI * k) / 8; arc.push([end[0] + out * (R + R * Math.cos(th)), end[1] + R * Math.sin(th)]); }
          put("TECHUMBRE", { kind: "polyline", pts: arc, weight: W.thin }, rf.id);
        }
      }
      const mid = pts[Math.floor(pts.length / 2) - (pts.length > 2 ? 1 : 0)]!, nxt = pts[Math.min(pts.length - 1, Math.floor(pts.length / 2))]!;
      const qa: Point = mid === nxt ? mid : [(mid[0] * 3 + nxt[0]) / 4, (mid[1] * 3 + nxt[1]) / 4 + T];
      notes.push({ text: `CUBIERTA PLANCHA DE ZINC, PENDIENTE ${Math.round(Math.tan((rf.pitch * Math.PI) / 180) * 100)}%`, at: qa });
    }
  }

  // ── piezas de madera cortadas (cerchas, costaneras): contorno con X ──
  const capsU: Array<{ kind: Box3["kind"]; u0: number; u1: number; z0: number; z1: number }> = [];
  for (const b of m.boxes) {
    const cap = boxCap(b, P, dc);
    if (!cap) continue;
    occluders.push(cap);
    put("TECHUMBRE", { kind: "polygon", pts: cap, weight: W.thin });
    if (cap.length === 4) {
      put("TECHUMBRE", { kind: "line", a: cap[0]!, b: cap[2]!, weight: W.hair });
      put("TECHUMBRE", { kind: "line", a: cap[1]!, b: cap[3]!, weight: W.hair });
    }
    const us = cap.map((q) => q[0]), zs = cap.map((q) => q[1]);
    capsU.push({ kind: b.kind, u0: Math.min(...us), u1: Math.max(...us), z0: Math.min(...zs), z1: Math.max(...zs) });
  }

  // ── cielo + lana de vidrio (madera): entre los muros cortados del último piso, sin pasar por las cerchas ──
  if (wood && m.wood) {
    const rf = roofsOf(p).find((x) => x.kind === "gable");
    const lv = rf && p.levels.find((l) => l.id === rf.level);
    if (lv) {
      const zc = lv.elevation + lv.height;
      const top = walls.filter((w) => !w.low && Math.abs(w.z1 - zc) < 1);
      if (top.length >= 2) {
        const span: Array<[number, number]> = [[Math.min(...top.map((w) => w.u0)), Math.max(...top.map((w) => w.u1))]];
        const free = subtractIntervals(span, [
          ...top.map((w): [number, number] => [w.u0, w.u1]),
          ...capsU.filter((c) => c.kind === "cercha" && c.z0 < zc + WOOD.chord + 1).map((c): [number, number] => [c.u0, c.u1]),
        ].sort((a, b) => a[0] - b[0]));
        for (const [u0, u1] of free) {
          if (u1 - u0 < 30) continue;
          put("MUROS-CORTE", { kind: "line", a: [u0, zc], b: [u1, zc], weight: W.mid });
          put("ACHURADOS", { kind: "polyline", pts: coil(u0 + 10, u1 - 10, zc + 2, 96), weight: W.hair });
          occluders.push(rect(u0, u1, zc, zc + 100));
        }
        const f0 = free.find(([a, b]) => b - a > 300);
        if (f0) notes.push({ text: "LANA DE VIDRIO 100 mm (11 kg/m³) SOBRE CIELO", at: [(f0[0] + f0[1]) / 2, zc + 60] });
      }
    }
    // rótulos de cercha y costanera: la pieza más cercana detrás del plano
    const behind = (kind: Box3["kind"]): Point | null => {
      const cand = m.boxes.filter((b) => b.kind === kind).map((b) => {
        const c: V3 = [b.o[0] + (b.e[0][0] + b.e[1][0] + b.e[2][0]) / 2, b.o[1] + (b.e[0][1] + b.e[1][1] + b.e[2][1]) / 2, b.o[2] + (b.e[0][2] + b.e[1][2] + b.e[2][2]) / 2];
        return { c, d: P.depth(c) - dc };
      }).filter((x) => x.d > 0).sort((x, y) => x.d - y.d || y.c[2] - x.c[2]);
      return cand[0] ? P.uz(cand[0].c) : null;
    };
    const cAt = behind("cercha");
    if (cAt) notes.push({ text: `CERCHA 2 PIEZAS PINO IPV 1"x4" @${WOOD.trussMax / 10} cm máx.`, at: cAt });
    const pAt = capsU.find((c) => c.kind === "costanera");
    const pt = pAt ? ([(pAt.u0 + pAt.u1) / 2, (pAt.z0 + pAt.z1) / 2] as Point) : behind("costanera");
    if (pt) notes.push({ text: `COSTANERA PINO IPV 2"x2" @${WOOD.purlin / 10} cm`, at: pt });
    const ext = walls.filter((w) => w.wood).sort((a, b) => a.u0 - b.u0)[0];
    if (ext) notes.push({ text: "MURO e=10 cm (VER DETALLE)", at: [(ext.u0 + ext.u1) / 2, (ext.z0 + ext.z1) / 2] });
  }

  // ── fundación bajo los muros cortados del primer piso; piso terminado ──
  const base = walls.filter((w) => w.lowest);
  for (const w of base) {
    put("MUROS-CORTE", { kind: "polyline", pts: rect(w.u0, w.u1, -PLINTH, w.z0), close: true, weight: W.thin }, w.id);
    put("MUROS-CORTE", { kind: "polyline", pts: rect(w.u0 - FOOT_WING, w.u1 + FOOT_WING, -FOOTING, -PLINTH), close: true, weight: W.thin }, w.id);
  }
  if (base.length) {
    const [ua, ub] = [Math.min(...base.map((w) => w.u0)), Math.max(...base.map((w) => w.u1))];
    for (const [u0, u1] of subtractIntervals([[ua, ub]], base.map((w): [number, number] => [w.u0, w.u1]).sort((a, b) => a[0] - b[0]))) {
      put("MUROS-CORTE", { kind: "line", a: [u0, lowest], b: [u1, lowest], weight: W.mid });
    }
    occluders.push(rect(-BIG, BIG, -FOOTING - 5000, lowest)); // bajo el piso no se ve nada
  }

  // ── escalera ──
  stairProfile(p, cut, r, dc, P, put);

  // ── lo que se ve detrás del plano ──
  const seen = projectView(p, m, { n, name: "" }, { depth: dc, occluders });
  items.unshift(...seen.items);
  // cotas de vanos (como la plantilla): la ventana más ancha y la puerta más alta, vistas o cortadas
  const shown = new Set([...seen.items.map((it) => it.dataId), ...cutOpenings]);
  const vis = p.openings.filter((o) => shown.has(o.id));
  const lvOf = (o: (typeof vis)[number]): number => p.levels.find((l) => l.id === p.walls.find((w) => w.id === o.wall)?.level)?.elevation ?? 0;
  const win = vis.filter((o) => o.kind === "window").sort((a, b) => b.width - a.width)[0];
  const door = vis.filter((o) => o.kind === "door").sort((a, b) => b.height - a.height)[0];
  if (win) openZ.push(lvOf(win) + win.sill, lvOf(win) + win.sill + win.height);
  if (door) openZ.push(lvOf(door) + door.height);

  // ── recintos cortados y ejes ──
  const rooms: CutGeom["rooms"] = [];
  for (const rm of p.rooms) {
    const lv = p.levels.find((l) => l.id === rm.level);
    if (!lv || rm.use === "cau-thang") continue;
    for (const [t0, t1] of insideSpans(A, B, rm.polygon)) {
      if ((t1 - t0) * 2 * BIG < 700) continue;
      rooms.push({ name: rm.name.toLowerCase(), u: (uOf(t0) + uOf(t1)) / 2, w: uOf(t1) - uOf(t0), z: lv.elevation + Math.min(1300, lv.height / 2), floor: lv.elevation, h: lv.height });
    }
  }
  const axList = principalAxes(p);
  const axes = (cut.axis === "x" ? axList.y : axList.x).map((ax) => ({
    id: ax.id, label: ax.label ?? ax.id, u: cut.axis === "x" ? ax.offset * r[1] : ax.offset * r[0],
  }));

  // extensión
  const us: number[] = [], zs: number[] = [-FOOTING];
  for (const it of items) for (const q of primPoints(it.prim)) { us.push(q[0]); zs.push(q[1]); }
  const levelTop = Math.max(...p.levels.map((l) => l.elevation + l.height));
  tops.push(levelTop);
  return {
    cut, items,
    u0: Math.min(...us), u1: Math.max(...us), z0: Math.min(...zs), z1: Math.max(...zs, ...tops),
    walls, rooms, axes: axes.filter((a) => a.u >= Math.min(...us) - 1 && a.u <= Math.max(...us) + 1),
    openZ, tops, notes,
  };
}

function primPoints(prim: Prim): Point[] {
  switch (prim.kind) {
    case "line": return [prim.a, prim.b];
    case "polyline":
    case "polygon": return prim.pts;
    default: return [];
  }
}

/** Muro de madera cortado: caras, terciado de 12 mm y piezas horizontales cortadas (caja con X). */
function woodWall(w: CutWall, a: number, b: number, put: Put): void {
  const [u0, u1] = [w.u0, w.u1];
  for (const u of [u0, u1]) put("MUROS-CORTE", { kind: "line", a: [u, a], b: [u, b], weight: W.mid }, w.id);
  for (const z of [a, b]) put("MUROS-CORTE", { kind: "line", a: [u0, z], b: [u1, z], weight: W.mid }, w.id);
  const [c0, c1] = [u0 + PLY, u1 - PLY];
  for (const u of [c0, c1]) put("MUROS-CORTE", { kind: "line", a: [u, a], b: [u, b], weight: W.hair }, w.id);
  const xbox = (z: number): void => {
    put("MUROS-CORTE", { kind: "polyline", pts: rect(c0, c1, z, z + PIECE), close: true, weight: W.hair }, w.id);
    put("MUROS-CORTE", { kind: "line", a: [c0, z], b: [c1, z + PIECE], weight: W.hair }, w.id);
    put("MUROS-CORTE", { kind: "line", a: [c0, z + PIECE], b: [c1, z], weight: W.hair }, w.id);
  };
  // solera inferior (o dintel sobre un vano), solera superior doble (o pieza bajo el vano)
  const zs = [a, b === w.z1 ? b - 2 * PIECE : b - PIECE];
  if (b === w.z1) zs.push(b - PIECE);
  const limit = Math.min(...zs.slice(1)) - 100;
  for (let z = w.z0 + 450; z + PIECE < limit; z += NOGGING) if (z > a + PIECE + 100) zs.push(z); // cadenetas
  for (const z of zs) if (z >= a && z + PIECE <= b + 0.5) xbox(z);
}

/** Perfil de la escalera: el tramo que contiene el plano en trazo de corte, los demás en vista. */
function stairProfile(p: Project, cut: SectionCut, r: Point, dc: number, P: ReturnType<typeof projector>, put: Put): void {
  const k = cut.axis === "x" ? 0 : 1;
  for (const st of p.stairs) {
    const level = p.levels.find((l) => l.id === st.level);
    if (!level) continue;
    const lay = stairLayout(st, level);
    for (const f of lay.flights) {
      const along = f.dir[0] * r[0] + f.dir[1] * r[1];
      if (Math.abs(along) < 0.7) continue; // tramo que cruza el corte: no tiene perfil en este corte
      if (f.rect.every((pt) => P.depth([pt[0], pt[1], 0]) < dc)) continue; // delante del plano
      const ks = f.rect.map((pt) => pt[k]!);
      const isCut = cut.at >= Math.min(...ks) && cut.at <= Math.max(...ks);
      const weight = isCut ? W.cut : W.thin;
      const du = along * st.tread;
      let u = f.start[0] * r[0] + f.start[1] * r[1];
      const u0 = u;
      let z = level.elevation + (f.firstStep - 1) * lay.riser;
      const pts: Point[] = [[u, z]];
      for (let i = 0; i < f.treads; i++) {
        z += lay.riser;
        pts.push([u, z]);
        u += du;
        pts.push([u, z]);
      }
      put("ESCALERAS", { kind: "polyline", pts, weight }, st.id);
      const drop = lay.riser * 1.6; // losa de la escalera
      put("ESCALERAS", { kind: "line", a: [u0, level.elevation + (f.firstStep - 1) * lay.riser + lay.riser - drop], b: [u, z - drop], weight }, st.id);
    }
    if (lay.landing) {
      const ks = lay.landing.map((pt) => pt[k]!);
      if (cut.at >= Math.min(...ks) && cut.at <= Math.max(...ks)) {
        const f1 = lay.flights[0]!;
        const zTop = level.elevation + (f1.firstStep - 1 + f1.treads) * lay.riser;
        const us = lay.landing.map((pt) => pt[0] * r[0] + pt[1] * r[1]);
        put("MUROS-CORTE", { kind: "polygon", pts: rect(Math.min(...us), Math.max(...us), zTop - 140, zTop), fill: "#000000", weight: W.cut }, st.id);
      }
    }
  }
}

// ── lámina ──────────────────────────────────────────────────────────────────────

/** Márgenes de cada corte (mm de papel). top depende de los rótulos. */
const M = { left: 28, right: 26, bottom: 18, gap: 8, axes: 16 };
const NOTE_ROW = 4.2;
/** Detalle del muro: 45 cm de muro a 1:5 (mm de papel). */
const DETAIL = { w: 112, h: 44 };

/** Rótulos ordenados en filas sobre el corte: texto a la altura de su fila, línea de llamada al objeto. */
function placeNotes(notes: Note[], S: number, uMax: number): Array<Note & { row: number; x: number; w: number }> {
  const rows: Array<Array<[number, number]>> = [];
  return [...notes].sort((a, b) => a.at[0] - b.at[0]).map((nt) => {
    const w = nt.text.length * 2.2 * 0.62 * S;
    const x = Math.min(nt.at[0], uMax - w); // el texto no sale del corte por la derecha
    let row = 0;
    while (rows[row]?.some(([a, b]) => x < b + 3 * S && x + w > a - 3 * S)) row++;
    (rows[row] ??= []).push([x, x + w]);
    return { ...nt, row, x, w };
  });
}

export function buildSectionsScene(p: Project, opts: SectionOptions = {}): SectionBuild {
  const cuts = sectionCuts(p);
  if (cuts.length === 0) throw new Error("El modelo no tiene muros: no hay dónde cortar.");
  const { m } = buildModel(p);
  const wood = !!woodStructure(p);
  const geoms = cuts.map((c) => cutGeometry(p, m, c));
  for (const g of geoms) if (!Number.isFinite(g.u0)) throw new Error(`El corte ${g.cut.name}-${g.cut.name}' no intersecta la obra.`);
  // los rótulos van una sola vez en la lámina: en el corte longitudinal (como la plantilla), el resto en el otro
  const noteOwner = geoms.find((g) => g.cut.name === "B") ?? geoms[0]!;
  const allNotes = geoms.flatMap((g) => g.notes.map((nt) => ({ nt, g })));
  const pickedNotes = new Map<CutGeom, Note[]>(geoms.map((g) => [g, [] as Note[]]));
  for (const text of [...new Set(allNotes.map((x) => x.nt.text))]) {
    const pref = allNotes.find((x) => x.nt.text === text && x.g === noteOwner) ?? allNotes.find((x) => x.nt.text === text)!;
    pickedNotes.get(pref.g)!.push(pref.nt);
  }

  // tamaño en papel de cada corte a la escala S
  const cellSize = (g: CutGeom, S: number): { w: number; h: number; top: number } => {
    const rows = 1 + Math.max(-1, ...placeNotes(pickedNotes.get(g)!, S, g.u1).map((x) => x.row));
    const top = (rows > 0 ? rows * NOTE_ROW + 4 : 0) + (g.axes.length ? M.axes : 4);
    return { w: (g.u1 - g.u0) / S + M.left + M.right, h: (g.z1 - g.z0) / S + top + M.bottom, top };
  };
  type Layout = { S: number; pos: Array<[number, number]>; w: number; h: number; detail: [number, number] | null };
  const layouts = (S: number): Layout[] => {
    const [a, b] = geoms.map((g) => cellSize(g, S)) as [ReturnType<typeof cellSize>, ReturnType<typeof cellSize>];
    const out: Layout[] = [];
    const side = { pos: [[0, 0], [a.w + M.gap, 0]] as Array<[number, number]>, w: a.w + M.gap + b.w, h: Math.max(a.h, b.h) };
    const stack = { pos: [[0, 0], [0, a.h + M.gap]] as Array<[number, number]>, w: Math.max(a.w, b.w), h: a.h + M.gap + b.h };
    for (const base of [side, stack]) {
      if (!wood) { out.push({ S, ...base, detail: null }); continue; }
      out.push({ S, ...base, w: Math.max(base.w, DETAIL.w), h: base.h + M.gap + DETAIL.h, detail: [0, base.h + M.gap] });
      out.push({ S, ...base, w: base.w + M.gap + DETAIL.w, h: Math.max(base.h, DETAIL.h), detail: [base.w + M.gap, 0] });
    }
    return out;
  };
  const fits = (l: Layout): boolean => l.w <= AREA.x1 - AREA.x0 && l.h <= AREA.y1 - AREA.y0;
  const scales = opts.scale && [50, 100, 200].includes(opts.scale) ? [opts.scale, 50, 100, 200] : [50, 100, 200];
  const layout = scales.flatMap(layouts).find(fits) ?? layouts(200).sort((x, y) => x.w * x.h - y.w * y.h)[0]!;
  const S = layout.S;
  const mm = (v: number): number => v * S;

  const items: Scene2D = [];
  const push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper"): void => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  geoms.forEach((g, i) => {
    const cell = cellSize(g, S);
    const [px, py] = layout.pos[i]!;
    const ox = mm(px + M.left) - g.u0;
    const oz = -mm(py + cell.top) - g.z1;
    const T = (q: Point): Point => [q[0] + ox, q[1] + oz];
    const put: Put = (layer, prim, dataId) => push(layer, movePrim(prim, T), dataId);
    for (const it of g.items) put(it.layer, it.prim, it.dataId);
    annotate(p, g, pickedNotes.get(g)!, S, put);
  });
  if (layout.detail) wallDetail(layout.detail, S, (layer, prim) => push(layer, prim));

  const tf = sheetTransform(S, layout.w, layout.h);
  const title = "CORTES A-A' Y B-B'";
  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title,
    sheetNo: opts.sheetNo ?? "ARQ-03",
    scaleLabel: `1:${S}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });
  return { items, tf, meta: { title, scaleLabel: `1:${S}` } };
}

/** Anotaciones de un corte (en sus coordenadas u, z; la escala da los tamaños en papel). */
function annotate(p: Project, g: CutGeom, notes: Note[], S: number, put: Put): void {
  const mm = (v: number): number => v * S;
  const lowest = Math.min(...p.levels.map((l) => l.elevation));
  // terreno natural fuera de la obra
  const base = g.walls.filter((w) => w.lowest);
  const [ua, ub] = base.length ? [Math.min(...base.map((w) => w.u0)) - FOOT_WING, Math.max(...base.map((w) => w.u1)) + FOOT_WING] : [g.u0, g.u1];
  for (const [a, b] of [[g.u0 - mm(6), ua], [ub, g.u1 + mm(6)]] as Array<[number, number]>) {
    if (b - a < 1) continue;
    put("MUROS-CORTE", { kind: "line", a: [a, -PLINTH], b: [b, -PLINTH], weight: W.cut });
    for (let x = a + mm(1.4); x <= b; x += mm(3)) put("MUROS-VISTA", { kind: "line", a: [x, -PLINTH], b: [x - mm(1.4), -PLINTH - mm(1.4)], weight: W.hair });
  }

  // niveles a la derecha; cotas verticales a la izquierda (vanos y alturas)
  const levels = [...new Set([-FOOTING, -PLINTH, lowest, ...p.levels.map((l) => l.elevation), ...p.levels.map((l) => l.elevation + l.height), ...g.tops].map(Math.round))];
  levelColumn(g.u1 + mm(5), levels, -PLINTH, mm, put);
  const hTop = Math.max(...p.levels.map((l) => l.elevation + l.height));
  const chain = [...new Set([lowest, ...g.openZ, ...p.levels.map((l) => l.elevation), hTop].map(Math.round))].sort((a, b) => a - b);
  verticalDims(g.u0, chain, mm, put, 9);
  verticalDims(g.u0, [...new Set([lowest, hTop, ...g.tops.map(Math.round)])].sort((a, b) => a - b), mm, put, 17);

  // recintos cortados (minúscula, centrado)
  // recintos cortados (minúscula, centrado); si el nombre pisa un vano visto, baja cerca del piso
  const openBoxes = [
    ...g.items.filter((it) => it.layer === "VANOS").map((it) => primPoints(it.prim)).filter((q) => q.length),
    ...g.walls.map((w) => rect(w.u0, w.u1, w.z0, w.z1)), // nunca sobre un muro cortado
  ];
  for (const rm of g.rooms) {
    // el nombre cabe entre las caras de los muros: en una línea, en dos o una palabra por línea; si no, más chico
    const words = rm.name.split(/\s+/);
    const half = Math.ceil(words.length / 2);
    const layouts = [[rm.name], [words.slice(0, half).join(" "), words.slice(half).join(" ")], words].filter((l) => l.every(Boolean));
    const width = (l: string[], size: number): number => Math.max(...l.map((t) => t.length)) * size * 0.62 * S;
    let size = 2.8;
    let lines = layouts.find((l) => width(l, size) <= rm.w * 0.9);
    if (!lines) { size = 2.2; lines = layouts.find((l) => width(l, size) <= rm.w * 0.9) ?? words; }
    const hw = width(lines, size) / 2, hh = (lines.length * 1.3 * size * S) / 2;
    const hits = (z: number, u: number): boolean => openBoxes.some((q) => {
      const us = q.map((x) => x[0]), zs = q.map((x) => x[1]);
      return Math.min(...us) < u + hw && Math.max(...us) > u - hw && Math.min(...zs) < z + hh && Math.max(...zs) > z - hh;
    });
    const floor = rm.floor, ceil = rm.floor + rm.h - 300 - hh;
    const cands: Point[] = [[rm.u, rm.z], [rm.u, floor + 350 + hh], [rm.u - hw * 1.4, rm.z], [rm.u + hw * 1.4, rm.z], [rm.u, rm.z + 600], [rm.u, ceil]];
    const at = cands.find(([u, z]) => !hits(z, u)) ?? cands[0]!;
    lines.forEach((t, i) => put("TEXTOS", { kind: "text", at: [at[0], at[1] + hh - (i + 0.5) * 1.3 * size * S], text: t, size, anchor: "middle" }));
  }

  // rótulos con línea de llamada, en filas sobre el corte
  const placed = placeNotes(notes, S, g.u1);
  const rows = 1 + Math.max(-1, ...placed.map((x) => x.row));
  for (const nt of placed) {
    const z = g.z1 + mm(4 + (rows - 1 - nt.row) * NOTE_ROW);
    put("TEXTOS", { kind: "text", at: [nt.x + mm(0.6), z + mm(1.2)], text: nt.text, size: 2.2 });
    put("TEXTOS", { kind: "line", a: [nt.x, z], b: [nt.x + nt.w, z], weight: W.hair });
    put("TEXTOS", { kind: "line", a: nt.at, b: [nt.x, z], weight: W.hair });
    put("TEXTOS", { kind: "circle", c: nt.at, r: 0.5, rPaper: true, weight: W.hair });
  }

  // ejes: burbuja arriba y cota entre ejes
  const zAx = g.z1 + mm((rows > 0 ? rows * NOTE_ROW + 4 : 0) + 4);
  const zBub = zAx + mm(8);
  const axs = [...g.axes].sort((a, b) => a.u - b.u);
  for (const ax of axs) {
    put("EJES", { kind: "line", a: [ax.u, -PLINTH], b: [ax.u, zBub - mm(4)], weight: W.hair, dash: "4 2", color: AXIS_COLOR }, ax.id);
    put("EJES", { kind: "circle", c: [ax.u, zBub], r: mm(4), weight: W.thin, color: AXIS_COLOR }, ax.id);
    put("EJES", { kind: "text", at: [ax.u, zBub], text: ax.label, size: 3.2, anchor: "middle", color: AXIS_COLOR }, ax.id);
  }
  if (axs.length >= 2) horizontalDims(zAx, axs.map((a) => a.u), mm, put);

  // título
  put("TEXTOS", {
    kind: "text", at: [(g.u0 + g.u1) / 2, g.z0 - mm(11)], text: `CORTE ${g.cut.name}-${g.cut.name}' Esc 1/${S}`, size: 3.5, bold: true, anchor: "middle",
  });
}

/**
 * Detalle del muro de madera (una vez por lámina), corte horizontal a 1:5: terciado ranurado
 * 12 mm | pie derecho pino 2"x3" con lana mineral entre pies derechos | terciado ranurado 12 mm.
 */
function wallDetail(at: [number, number], S: number, put: (layer: LayerName, prim: Prim) => void): void {
  const k = S / 5; // mm reales → mm del modelo de la lámina
  const ox = at[0] * S + 4 * S, oy = -(at[1] * S) - 10 * S; // esquina superior izquierda del muro
  const Q = (x: number, y: number): Point => [ox + x * k, oy - y * k];
  const L = 450, E = 100;
  const line = (x0: number, y0: number, x1: number, y1: number, weight: number = W.hair): void => put("MUROS-CORTE", { kind: "line", a: Q(x0, y0), b: Q(x1, y1), weight });
  line(0, 0, L, 0, W.mid); line(0, E, L, E, W.mid);
  line(0, PLY, L, PLY); line(0, E - PLY, L, E - PLY);
  for (const x of [0, L]) put("MUROS-CORTE", { kind: "polyline", pts: [Q(x, 0), Q(x + 8, E * 0.4), Q(x - 8, E * 0.6), Q(x, E)], weight: W.hair }); // corte del muro
  // pie derecho 2"x3" (45 × 76) con X
  const [s0, s1] = [L / 2 - 22.5, L / 2 + 22.5];
  put("MUROS-CORTE", { kind: "polyline", pts: [Q(s0, PLY), Q(s1, PLY), Q(s1, E - PLY), Q(s0, E - PLY)], close: true, weight: W.thin });
  line(s0, PLY, s1, E - PLY); line(s0, E - PLY, s1, PLY);
  // lana mineral 50 mm entre pies derechos
  for (const [a, b] of [[12, s0 - 4], [s1 + 4, L - 12]] as Array<[number, number]>) {
    const pts = coil(a, b, PLY + 13, 50).map(([x, y]) => Q(x, y));
    put("ACHURADOS", { kind: "polyline", pts, weight: W.hair });
  }
  // cotas 1,2 | 7,6 | 1,2 = 10 cm
  const xd = L + 40;
  const zs = [0, PLY, E - PLY, E];
  for (const y of zs) line(L + 10, y, xd + 8, y);
  line(xd, 0, xd, E);
  for (let i = 0; i + 1 < zs.length; i++) {
    const [a, b] = [zs[i]!, zs[i + 1]!];
    put("COTAS", { kind: "text", at: Q(xd + 14, (a + b) / 2 - 3), text: ((b - a) / 10).toFixed(1), size: 2.0 });
    put("COTAS", { kind: "dim", a: Q(xd, a), b: Q(xd, b), line: Q(xd, b), rot: 90, text: ((b - a) / 10).toFixed(1), textAt: Q(xd + 14, (a + b) / 2 - 3) });
  }
  put("COTAS", { kind: "text", at: Q(xd + 40, E / 2 - 3), text: `= ${cmText(E)} cm`, size: 2.0 });
  // título y especificación
  const tx = ox, ty = oy - (E * k) - 7 * S;
  const lines = [
    "Terciado ranurado 12 mm, ambas caras",
    'Pie derecho pino IPV 2"x3" @40 cm (3" = 7,6 cm)',
    "Lana mineral 50 mm, 40 kg/m³, entre pies derechos",
  ];
  put("TEXTOS", { kind: "text", at: [tx, oy + 4 * S], text: "DETALLE MURO e=10 cm Esc 1/5", size: 3.0, bold: true });
  lines.forEach((t, i) => put("TEXTOS", { kind: "text", at: [tx, ty - i * 3.6 * S], text: t, size: 2.2 }));
}
