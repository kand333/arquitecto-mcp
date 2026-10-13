import {
  add, groundAt, joinedWall, normalize, pointInPolygon, pointOnWall, polygonBounds, roofGeometry, roofsOf, outdoorAt, rotate, scale,
  signedArea, sub, unverifiedRules, wallBand, wallDir, wallLength, wallNormal,
  type Level, type Opening, type Point, type Project, type Roof,
} from "@arquitecto/core";
import { cmText, dimTick, drawSheetFrame } from "./frame.js";
import { W, type LayerName, type Prim, type Scene2D } from "./scene.js";
import { slidingWindowFace } from "./sliding.js";
import type { PlanTransform } from "./transform.js";

/**
 * Elevaciones (estándar de láminas, según el formato del usuario): las 4 caras del edificio en
 * una lámina, nombradas por punto cardinal, con su techumbre. Detalle de cada cara:
 * - revestimiento: tinglado (líneas horizontales cada 16 cm) si la terminación exterior lo es;
 * - cubierta de zinc: nervios en el sentido de la pendiente, cumbrera, frontón con espesor,
 *   canal en el alero y bajadas de aguas lluvias en las esquinas;
 * - sobrecimiento sobre el N.T., fundación bajo tierra, línea de terreno, niveles y cotas.
 * Ocultamiento de líneas REAL (cada tramo se prueba contra las caras más cercanas): el DXF no
 * tiene rellenos, así que una línea tapada no se dibuja en vez de quedar bajo un relleno blanco.
 */

/** Medidas del estándar (mm reales), tomadas del DXF de referencia del usuario. */
const SIDING = 160; // tinglado: separación entre tablas
const RIB = 160; // zinc: separación entre nervios
const CAP = 125; // cumbrera vista
export const PLINTH = 200; // sobrecimiento visible: el N.T. queda 20 cm bajo el N.P.T.
export const FOOTING = 600; // fondo de la fundación bajo el N.P.T.
export const FOOT_WING = 75; // la fundación sobresale del muro a cada lado
/** Estructura de madera (corte B-B' de referencia del usuario). */
export const WOOD = {
  trussMax: 750, // cerchas @75 cm máx.
  purlin: 400, // costaneras @40 cm (medido en la pendiente)
  chord: 100, // cercha 2 piezas 1"x4": canto 4"
  ply: 50, // 2 piezas de 1"
  purlinSide: 50, // costanera 2"x2"
};
const LOW_WALL = 1200; // jardinera, pretil: sin revestimiento
const DEPTH_EPS = 3;

export type V3 = [number, number, number];
type Face = {
  pts: V3[];
  /** Normal hacia afuera (unitaria). */
  nrm: V3;
  layer: LayerName;
  weight: number;
  /** Muro de altura completa o techumbre: fijan las cotas del alzado. */
  tag?: "wall" | "roof";
};
type Line3 = { a: V3; b: V3; layer: LayerName; weight: number };
/** Pieza de madera: paralelepípedo o + a·e1 + b·e2 + c·e3 (a, b, c ∈ [0, 1]). */
export type Box3 = { o: V3; e: [V3, V3, V3]; kind: "cercha" | "costanera" };
export type Model3 = {
  faces: Face[];
  lines: Line3[];
  openings: Array<{ face: Face; o: Opening; pts: V3[] }>;
  boxes: Box3[];
  /** Estructura de madera de la techumbre: eje de la cumbrera y posiciones de las cerchas. */
  wood: { ax: "x" | "y"; trussT: number[] } | null;
};

const v3 = (p: Point, z: number): V3 => [p[0], p[1], z];
const cross3 = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub3 = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot3 = (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Normal de un polígono 3D plano (Newell), orientada hacia `toward` si se da. */
function polyNormal(pts: V3[], toward?: V3): V3 {
  let n: V3 = [0, 0, 0];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i]!, b = pts[(i + 1) % pts.length]!;
    n = [n[0] + (a[1] - b[1]) * (a[2] + b[2]), n[1] + (a[2] - b[2]) * (a[0] + b[0]), n[2] + (a[0] - b[0]) * (a[1] + b[1])];
  }
  const l = Math.hypot(...n) || 1;
  n = [n[0] / l, n[1] / l, n[2] / l];
  return toward && dot3(n, toward) < 0 ? [-n[0], -n[1], -n[2]] : n;
}

/** Terminación exterior declarada (p.finishes con scope "exterior"). */
export function exteriorFinish(p: Project): { label: string; siding: boolean } | null {
  const f = Object.values(p.finishes).find((x) => x.scope === "exterior");
  if (!f) return null;
  return { label: f.label, siding: /tingl/i.test(`${f.material ?? ""} ${f.label}`) };
}

export const isZinc = (rf: Roof): boolean => /zinc|ton/i.test(rf.material ?? "");

/** Estructura declarada de madera (terminación con scope "structure"): cerchas, costaneras y muro sándwich. */
export function woodStructure(p: Project): { label: string } | null {
  const f = Object.values(p.finishes).find((x) => x.scope === "structure" && /madera|pino/i.test(`${x.material ?? ""} ${x.label}`));
  return f ? { label: f.label } : null;
}

// ── modelo 3D de lo que se ve desde afuera ─────────────────────────────────────

type WallFace = { a: Point; b: Point; nOut: Point; z0: number; z1: number; low: boolean; walls: Array<{ id: string; shift: number; side: number }>; level: Level };

/**
 * La cara da al exterior: frente a ella no hay un recinto cerrado (patio y terraza cuentan como
 * exterior). Se muestrea en 5 puntos: uno solo puede caer en el encuentro con un tabique.
 */
function isExterior(p: Project, f: WallFace): boolean {
  const open = (t: number): boolean => outdoorAt(p, f.level.id, add(add(f.a, scale(sub(f.b, f.a), t)), scale(f.nOut, 150)));
  return [0.1, 0.3, 0.5, 0.7, 0.9].filter(open).length >= 3;
}

/** Caras de muro por lado, fundiendo las colineales contiguas (una fachada de varios muros es una sola cara). */
function wallFaces(p: Project): WallFace[] {
  const raw: WallFace[] = [];
  for (const level of p.levels) {
    const walls = p.walls.filter((w) => w.level === level.id);
    for (const w of walls) {
      const { wall: jw, shift } = joinedWall(walls, w);
      const h = w.height ?? level.height;
      for (const side of [1, -1]) {
        const nOut = scale(wallNormal(jw), side);
        const off = scale(nOut, jw.thickness / 2);
        raw.push({
          a: add(jw.from, off), b: add(jw.to, off), nOut, z0: level.elevation, z1: level.elevation + h,
          low: h < LOW_WALL, walls: [{ id: w.id, shift, side }], level,
        });
      }
    }
  }
  // fundir: mismo plano (normal y distancia), mismas alturas, tramos que se tocan
  const out: WallFace[] = [];
  const key = (f: WallFace): string =>
    [Math.round(Math.atan2(f.nOut[1], f.nOut[0]) * 1000), Math.round(f.a[0] * f.nOut[0] + f.a[1] * f.nOut[1]), f.z0, f.z1, f.low].join("|");
  const groups = new Map<string, WallFace[]>();
  for (const f of raw) groups.set(key(f), [...(groups.get(key(f)) ?? []), f]);
  for (const g of groups.values()) {
    const d: Point = [-g[0]!.nOut[1], g[0]!.nOut[0]];
    const s = (q: Point): number => q[0] * d[0] + q[1] * d[1];
    const spans = g.map((f) => ({ f, s0: Math.min(s(f.a), s(f.b)), s1: Math.max(s(f.a), s(f.b)) })).sort((x, y) => x.s0 - y.s0);
    const merged: Array<{ f: WallFace; s0: number; s1: number }> = [];
    for (const sp of spans) {
      const last = merged[merged.length - 1];
      if (last && sp.s0 <= last.s1 + 2) {
        last.f = { ...last.f, walls: [...last.f.walls, ...sp.f.walls] };
        last.s1 = Math.max(last.s1, sp.s1);
      } else merged.push({ ...sp });
    }
    for (const { f, s0, s1 } of merged) {
      const at = (sv: number): Point => add(f.a, scale(d, sv - s(f.a)));
      out.push({ ...f, a: at(s0), b: at(s1) });
    }
  }
  return out;
}

/** Tramos (parámetro t de a→b) de un segmento en planta que caen dentro de un polígono. */
export function insideSpans(a: Point, b: Point, poly: Point[]): Array<[number, number]> {
  const ts = [0, 1];
  for (let i = 0; i < poly.length; i++) {
    const t = segParam(a, b, poly[i]!, poly[(i + 1) % poly.length]!);
    if (t !== null) ts.push(t);
  }
  ts.sort((x, y) => x - y);
  const out: Array<[number, number]> = [];
  for (let i = 0; i + 1 < ts.length; i++) {
    const [t0, t1] = [ts[i]!, ts[i + 1]!];
    if (t1 - t0 < 1e-6) continue;
    const m = add(a, scale(sub(b, a), (t0 + t1) / 2));
    if (!pointInPolygon(m, poly)) continue;
    const last = out[out.length - 1];
    if (last && Math.abs(last[1] - t0) < 1e-9) last[1] = t1;
    else out.push([t0, t1]);
  }
  return out;
}

/** Parámetro t ∈ (0,1) donde el segmento a→b cruza c→d, o null. */
export function segParam(a: Point, b: Point, c: Point, d: Point): number | null {
  const r = sub(b, a), s = sub(d, c);
  const den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-12) return null;
  const q = sub(c, a);
  const t = (q[0] * s[1] - q[1] * s[0]) / den;
  const u = (q[0] * r[1] - q[1] * r[0]) / den;
  return t > 1e-9 && t < 1 - 1e-9 && u >= -1e-9 && u <= 1 + 1e-9 ? t : null;
}

export function buildModel(p: Project): { m: Model3; siding: boolean } {
  const m: Model3 = { faces: [], lines: [], openings: [], boxes: [], wood: null };
  const fin = exteriorFinish(p);
  const siding = fin?.siding ?? false;
  const faces = wallFaces(p);
  const lowest = Math.min(...p.levels.map((l) => l.elevation));
  const roofs = roofsOf(p).flatMap((rf) => {
    const lv = p.levels.find((l) => l.id === rf.level);
    return lv ? [{ rf, lv, g: roofGeometry(rf, lv), T: rf.thickness ?? 150 }] : [];
  });

  const wallFace = (f: WallFace, z0: number, z1: number, layer: LayerName, weight: number, wing = 0): Face => {
    const d = normalize(sub(f.b, f.a));
    const a = add(f.a, scale(d, -wing)), b = add(f.b, scale(d, wing));
    return { pts: [v3(a, z0), v3(b, z0), v3(b, z1), v3(a, z1)], nrm: [f.nOut[0], f.nOut[1], 0], layer, weight };
  };

  // muros de fachada (alguna de sus caras da afuera): solo ellos suben hasta la techumbre (frontón);
  // los tabiques interiores terminan en el cielo
  const exteriorWalls = new Set(faces.filter((f) => isExterior(p, f)).flatMap((f) => f.walls.map((w) => w.id)));
  for (const f of faces) {
    const face: Face = { ...wallFace(f, f.z0, f.z1, "MUROS-VISTA", W.mid), ...(f.low ? {} : { tag: "wall" as const }) };
    m.faces.push(face);
    const outside = isExterior(p, f);
    if (siding && !f.low && outside) sidingLines(face, m);
    // vanos de los muros de esta cara
    for (const { id, shift, side } of f.walls) {
      const w = p.walls.find((x) => x.id === id)!;
      const { wall: jw } = joinedWall(p.walls.filter((x) => x.level === w.level), w);
      const off = scale(wallNormal(jw), (side * jw.thickness) / 2);
      for (const o of p.openings.filter((x) => x.wall === id)) {
        const pa = add(pointOnWall(jw, o.offset + shift), off), pb = add(pointOnWall(jw, o.offset + o.width + shift), off);
        const z0 = f.level.elevation + o.sill, z1 = z0 + o.height;
        m.openings.push({ face, o, pts: [v3(pa, z0), v3(pb, z0), v3(pb, z1), v3(pa, z1)] });
      }
    }
    // sobrecimiento y fundación (piso más bajo)
    if (f.level.elevation === lowest) {
      m.faces.push(wallFace(f, f.z0 - PLINTH, f.z0, "MUROS-VISTA", W.mid));
      m.faces.push(wallFace(f, f.z0 - FOOTING, f.z0 - PLINTH, "MUROS-VISTA", W.hair, FOOT_WING));
    }
    // frontón: del muro a la cara inferior de la techumbre
    if (f.low || !f.walls.some((w) => exteriorWalls.has(w.id))) continue;
    for (const { rf, lv, g } of roofs) {
      if (Math.abs(lv.elevation + lv.height - f.z1) > 1) continue;
      for (const [t0, t1] of insideSpans(f.a, f.b, rf.outline)) {
        const ab = sub(f.b, f.a);
        const ts = [t0, t1];
        for (const [c0, c1] of g.creases) {
          const t = segParam(f.a, f.b, c0, c1) ?? lineParam(f.a, f.b, c0, c1);
          if (t !== null && t > t0 && t < t1) ts.push(t);
        }
        ts.sort((x, y) => x - y);
        const top = ts.map((t) => { const q = add(f.a, scale(ab, t)); return v3(q, g.zAt(q)); });
        if (Math.max(...top.map((q) => q[2])) - f.z1 < 30) continue;
        const pa = add(f.a, scale(ab, t0)), pb = add(f.a, scale(ab, t1));
        const gable: Face = { pts: [v3(pa, f.z1), v3(pb, f.z1), ...top.reverse()], nrm: [f.nOut[0], f.nOut[1], 0], layer: "MUROS-VISTA", weight: W.mid };
        m.faces.push(gable);
        if (siding && outside) sidingLines(gable, m);
      }
    }
  }

  // testeros de los muros que terminan sueltos (jardinera, muro que no llega a otro)
  for (const level of p.levels) {
    const walls = p.walls.filter((w) => w.level === level.id);
    for (const w of walls) {
      const { wall: jw, shift } = joinedWall(walls, w);
      const d = wallDir(jw), half = scale(wallNormal(jw), jw.thickness / 2);
      const z1 = level.elevation + (w.height ?? level.height);
      const extEnd = wallLength(jw) - wallLength(w) - shift;
      const ends: Array<[Point, Point, number, Point]> = [[jw.from, scale(d, -1), shift, w.from], [jw.to, d, extEnd, w.to]];
      for (const [end, out, ext, orig] of ends) {
        // suelto = no se alargó hasta otro muro y nada lo continúa
        if (ext > 1 || walls.some((v) => v.id !== w.id && pointInPolygon(add(orig, out), wallBand(v)))) continue;
        const a = add(end, half), b = sub(end, half);
        m.faces.push({ pts: [v3(a, level.elevation), v3(b, level.elevation), v3(b, z1), v3(a, z1)], nrm: [out[0], out[1], 0], layer: "MUROS-VISTA", weight: W.mid });
      }
    }
  }

  const wood = !!woodStructure(p);
  for (const { rf, g, T } of roofs) roofSolid(rf, g, T, faces, m, wood);
  if (wood) for (const { rf, g, T } of roofs) if (rf.kind === "gable") woodRoof(p, rf, g, T, m);
  for (const b of m.boxes) m.faces.push(...boxFaces(b));
  return { m, siding };
}

/** Parámetro t sobre a→b donde corta la RECTA c–d (sin límite en c–d), o null. */
function lineParam(a: Point, b: Point, c: Point, d: Point): number | null {
  const r = sub(b, a), s = sub(d, c);
  const den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-12) return null;
  const q = sub(c, a);
  return (q[0] * s[1] - q[1] * s[0]) / den;
}

/** Caras de una pieza (normales hacia afuera). */
function boxFaces(b: Box3): Face[] {
  const [e1, e2, e3] = b.e;
  const P = (x: number, y: number, z: number): V3 => [
    b.o[0] + e1[0] * x + e2[0] * y + e3[0] * z, b.o[1] + e1[1] * x + e2[1] * y + e3[1] * z, b.o[2] + e1[2] * x + e2[2] * y + e3[2] * z,
  ];
  const c: V3 = P(0.5, 0.5, 0.5);
  const quads: V3[][] = [
    [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)], [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)], [P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)],
    [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)], [P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)],
  ];
  return quads.map((pts) => {
    const mid = pts.reduce((acc, q) => [acc[0] + q[0] / 4, acc[1] + q[1] / 4, acc[2] + q[2] / 4] as V3, [0, 0, 0] as V3);
    return { pts, nrm: polyNormal(pts, sub3(mid, c)), layer: "TECHUMBRE" as const, weight: W.thin };
  });
}

/**
 * Techumbre de madera a dos aguas: cerchas de 2 piezas 1"x4" @75 cm máx. (cordones, pendolón y
 * 2 diagonales) entre los muros extremos, y costaneras 2"x2" @40 cm sobre los cordones superiores.
 * Bajo el zinc (espesor T): costanera en [T−50, T] y cordón superior en [0, 100] sobre la cara
 * inferior de la techumbre.
 */
function woodRoof(p: Project, rf: Roof, g: ReturnType<typeof roofGeometry>, T: number, m: Model3): void {
  const lv = p.levels.find((l) => l.id === rf.level)!;
  const ob = polygonBounds(rf.outline);
  const ax: "x" | "y" = rf.ridgeAxis ?? (ob.maxX - ob.minX >= ob.maxY - ob.minY ? "x" : "y");
  const P3 = (t: number, c: number, z: number): V3 => (ax === "x" ? [t, c, z] : [c, t, z]);
  const tOf = (q: Point): number => (ax === "x" ? q[0] : q[1]);
  const cOf = (q: Point): number => (ax === "x" ? q[1] : q[0]);
  const walls = p.walls.filter((w) => w.level === lv.id && (w.height ?? lv.height) >= LOW_WALL);
  if (!walls.length) return;
  const wb = walls.flatMap((w) => wallBand(joinedWall(walls, w).wall));
  const [t0, t1] = [Math.min(...wb.map(tOf)), Math.max(...wb.map(tOf))];
  const [cw0, cw1] = [Math.min(...wb.map(cOf)), Math.max(...wb.map(cOf))];
  const z = (c: number, t: number): number => g.zAt(ax === "x" ? [t, c] : [c, t]);
  const H = WOOD.chord, Hp = WOOD.ply / 2;

  /** Pieza de la cercha en t: de (ca, za) a (cb, zb) por su eje, canto H en el plano de la cercha. */
  const member = (t: number, ca: number, za: number, cb: number, zb: number): void => {
    const L = Math.hypot(cb - ca, zb - za);
    if (L < 50) return;
    const [dc, dz] = [(cb - ca) / L, (zb - za) / L];
    const [nc, nz] = [-dz * (H / 2), dc * (H / 2)];
    const o = P3(t - Hp, ca - nc, za - nz);
    m.boxes.push({
      o,
      e: [sub3(P3(t - Hp, cb - nc, zb - nz), o), sub3(P3(t - Hp, ca + nc, za + nz), o), sub3(P3(t + Hp, ca - nc, za - nz), o)],
      kind: "cercha",
    });
  };

  const ridgeC = g.creases.length ? cOf(g.creases[0]![0]) : null;
  const n = Math.max(1, Math.ceil((t1 - t0 - 200) / WOOD.trussMax));
  const trussT: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + 100 + ((t1 - t0 - 200) * i) / n;
    const line: [Point, Point] = ax === "x" ? [[t, ob.minY - 1], [t, ob.maxY + 1]] : [[ob.minX - 1, t], [ob.maxX + 1, t]];
    for (const [s0, s1] of insideSpans(line[0], line[1], rf.outline)) {
      const at = (sv: number): number => cOf(add(line[0], scale(sub(line[1], line[0]), sv)));
      const [ca, cb] = [at(s0), at(s1)].sort((x, y) => x - y) as [number, number];
      const ridge = ridgeC ?? (ca + cb) / 2;
      if (ridge <= ca || ridge >= cb) continue;
      trussT.push(t);
      const zr = z(ridge, t);
      // cordones superiores (bajo la cara inferior de la techumbre) y cordón inferior sobre los muros
      member(t, ca, z(ca, t) + H / 2, ridge, zr + H / 2);
      member(t, ridge, zr + H / 2, cb, z(cb, t) + H / 2);
      const [ba, bb] = [Math.max(ca, cw0), Math.min(cb, cw1)];
      member(t, ba, g.baseZ + H / 2, bb, g.baseZ + H / 2);
      member(t, ridge, g.baseZ + H, ridge, zr); // pendolón
      for (const c of [(ba + ridge) / 2, (bb + ridge) / 2]) member(t, ridge, g.baseZ + H, c, z(c, t)); // diagonales
    }
  }
  m.wood = { ax, trussT };

  // costaneras: a lo largo de la cumbrera, cada 40 cm en la pendiente, desde el alero hasta la cumbrera
  const cos = Math.cos((rf.pitch * Math.PI) / 180);
  const ridge = ridgeC ?? (ax === "x" ? (ob.minY + ob.maxY) / 2 : (ob.minX + ob.maxX) / 2);
  const [ce0, ce1] = ax === "x" ? [ob.minY, ob.maxY] : [ob.minX, ob.maxX];
  const tl: [number, number] = ax === "x" ? [ob.minX - 1, ob.maxX + 1] : [ob.minY - 1, ob.maxY + 1];
  const S = WOOD.purlinSide;
  for (const [from, to] of [[ce0, ridge], [ce1, ridge]] as Array<[number, number]>) {
    const dir = Math.sign(to - from), run = Math.abs(to - from);
    for (let k = 0; ; k++) {
      const off = Math.min(S / 2 + k * WOOD.purlin * cos, run - S / 2);
      const c = from + dir * off;
      const a: Point = ax === "x" ? [tl[0], c] : [c, tl[0]];
      const b: Point = ax === "x" ? [tl[1], c] : [c, tl[1]];
      for (const [s0, s1] of insideSpans(a, b, rf.outline)) {
        const ta = tOf(add(a, scale(sub(b, a), s0))), tb = tOf(add(a, scale(sub(b, a), s1)));
        const zc = z(c - (dir * S) / 2, (ta + tb) / 2) + T - S - 2; // bajo el zinc también en su borde bajo
        const o = P3(ta, c - S / 2, zc);
        m.boxes.push({ o, e: [sub3(P3(tb, c - S / 2, zc), o), sub3(P3(ta, c + S / 2, zc), o), [0, 0, S]], kind: "costanera" });
      }
      if (off >= run - S / 2) break;
    }
  }
}

/** Tinglado: horizontales cada SIDING sobre una cara vertical. */
function sidingLines(face: Face, m: Model3): void {
  const zs = face.pts.map((q) => q[2]);
  const [z0, z1] = [Math.min(...zs), Math.max(...zs)];
  for (let z = Math.floor(z0 / SIDING + 1) * SIDING; z < z1 - 1; z += SIDING) {
    const hits: V3[] = [];
    for (let i = 0; i < face.pts.length; i++) {
      const a = face.pts[i]!, b = face.pts[(i + 1) % face.pts.length]!;
      if ((a[2] - z) * (b[2] - z) < 0) {
        const t = (z - a[2]) / (b[2] - a[2]);
        hits.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z]);
      }
    }
    const d: V3 = [-face.nrm[1], face.nrm[0], 0];
    hits.sort((x, y) => dot3(x, d) - dot3(y, d));
    for (let i = 0; i + 1 < hits.length; i += 2) m.lines.push({ a: hits[i]!, b: hits[i + 1]!, layer: "ACHURADOS", weight: W.hair });
  }
}

/** Techumbre: caras superiores (con nervios de zinc y cumbrera), cantos con espesor, canal y bajadas. */
function roofSolid(rf: Roof, g: ReturnType<typeof roofGeometry>, T: number, walls: WallFace[], m: Model3, wood: boolean): void {
  const tan = Math.tan((rf.pitch * Math.PI) / 180);
  for (const f of g.faces) {
    const top: V3[] = f.map((q) => [q[0], q[1], q[2] + T]);
    const face: Face = { pts: top, nrm: polyNormal(top, [0, 0, 1]), layer: "TECHUMBRE", weight: W.mid, tag: "roof" };
    m.faces.push(face);
    // cara inferior (solo se ve desde adentro, en los cortes): con madera, la plancha bajo la que van las costaneras
    const under: V3[] = f.map((q) => [q[0], q[1], q[2] + (wood ? T - 1 : 0)]);
    m.faces.push({ pts: under, nrm: [-face.nrm[0], -face.nrm[1], -face.nrm[2]], layer: "TECHUMBRE", weight: W.thin });
    if (!isZinc(rf) || tan < 1e-6) continue;
    // nervios: rectas en el sentido de la pendiente, hasta la cumbrera vista
    const down = normalize([face.nrm[0], face.nrm[1]]);
    const across: Point = [-down[1], down[0]];
    const plan: Point[] = f.map((q) => [q[0], q[1]]);
    const zTop = g.ridgeZ + T - CAP;
    const along = plan.map((q) => q[0] * across[0] + q[1] * across[1]);
    const depth = plan.map((q) => q[0] * down[0] + q[1] * down[1]);
    const [c0, c1] = [Math.min(...along), Math.max(...along)];
    const [d0, d1] = [Math.min(...depth) - 10, Math.max(...depth) + 10];
    const zAt = (q: Point): number => g.zAt(q) + T;
    const clipTop = (a: Point, b: Point): [Point, Point] | null => {
      const [za, zb] = [zAt(a), zAt(b)];
      if (za <= zTop && zb <= zTop) return [a, b];
      if (za > zTop && zb > zTop) return null;
      const t = (zTop - za) / (zb - za);
      const c = add(a, scale(sub(b, a), t));
      return za > zTop ? [c, b] : [a, c];
    };
    for (let c = Math.ceil(c0 / RIB) * RIB; c < c1; c += RIB) {
      const a = add(scale(across, c), scale(down, d0)), b = add(scale(across, c), scale(down, d1));
      for (const [t0, t1] of insideSpans(a, b, plan)) {
        const seg = clipTop(add(a, scale(sub(b, a), t0)), add(a, scale(sub(b, a), t1)));
        if (seg) m.lines.push({ a: v3(seg[0], zAt(seg[0])), b: v3(seg[1], zAt(seg[1])), layer: "TECHUMBRE", weight: W.hair });
      }
    }
    // borde de la cumbrera (curva de nivel zTop)
    if (Math.max(...top.map((q) => q[2])) > zTop + 1) {
      const dz = (zTop - (g.baseZ + T)) / tan; // distancia horizontal desde el alero
      const lo = plan.reduce((best, q, i) => (zAt(q) < zAt(plan[best]!) ? i : best), 0);
      const base = plan[lo]!;
      const at = base[0] * down[0] + base[1] * down[1] - dz; // sube contra la pendiente
      const a = add(scale(across, c0 - 10), scale(down, at)), b = add(scale(across, c1 + 10), scale(down, at));
      for (const [t0, t1] of insideSpans(a, b, plan)) {
        const pa = add(a, scale(sub(b, a), t0)), pb = add(a, scale(sub(b, a), t1));
        m.lines.push({ a: v3(pa, zTop), b: v3(pb, zTop), layer: "TECHUMBRE", weight: W.thin });
      }
    }
  }

  // cantos: el borde de la techumbre con su espesor (alero = tapacán; frontón = cabezal inclinado)
  const ol = rf.outline;
  const ccw = signedArea(ol) > 0;
  for (let i = 0; i < ol.length; i++) {
    const a = ol[i]!, b = ol[(i + 1) % ol.length]!;
    const e = sub(b, a);
    const nOut: Point = normalize(ccw ? [e[1], -e[0]] : [-e[1], e[0]]);
    const ts = [0, 1];
    for (const [c0, c1] of g.creases) {
      const t = lineParam(a, b, c0, c1);
      if (t !== null && t > 1e-6 && t < 1 - 1e-6) ts.push(t);
    }
    ts.sort((x, y) => x - y);
    const under = ts.map((t) => { const q = add(a, scale(e, t)); return v3(q, g.zAt(q)); });
    const over = [...under].reverse().map((q): V3 => [q[0], q[1], q[2] + T]);
    m.faces.push({ pts: [...under, ...over], nrm: [nOut[0], nOut[1], 0], layer: "TECHUMBRE", weight: W.mid, tag: "roof" });

    const eave = Math.abs(g.zAt(a) - g.baseZ) < 1 && Math.abs(g.zAt(b) - g.baseZ) < 1 && Math.hypot(e[0], e[1]) > 1000;
    if (eave) gutterAndDownpipes(a, b, nOut, g.baseZ, walls, m);
  }
}

/** Canal (perfil semicircular, Ø12) a lo largo del alero y bajadas de 10 cm en los extremos del muro. */
function gutterAndDownpipes(a: Point, b: Point, nOut: Point, zEave: number, walls: WallFace[], m: Model3): void {
  // ponytail: la bajada se ubica por muro bajo el alero; con aleros quebrados puede faltar alguna
  const d = normalize(sub(b, a));
  const R = 60;
  // canal: perfil semicircular colgado del tapacán, visible en los extremos del alero (como la referencia)
  const prof = (q: Point): V3[] => {
    const pts: V3[] = [];
    for (let k = 0; k <= 8; k++) {
      const ang = Math.PI + (Math.PI * k) / 8; // media luna hacia abajo
      pts.push(v3(add(q, scale(nOut, R + R * Math.cos(ang))), zEave + R * Math.sin(ang)));
    }
    return pts;
  };
  for (const q of [a, b]) {
    const pr = prof(q);
    for (let k = 0; k + 1 < pr.length; k++) m.lines.push({ a: pr[k]!, b: pr[k + 1]!, layer: "TECHUMBRE", weight: W.thin });
  }

  // bajadas: en el muro bajo el alero (paralelo, a menos de 2 m), a 25 cm de cada extremo
  const sOf = (q: Point): number => q[0] * d[0] + q[1] * d[1];
  const host = walls
    .filter((f) => !f.low && Math.abs(f.z1 - zEave) < 1 && f.nOut[0] * nOut[0] + f.nOut[1] * nOut[1] > 0.99)
    .map((f) => ({ f, gap: (a[0] - f.a[0]) * nOut[0] + (a[1] - f.a[1]) * nOut[1], s0: Math.max(Math.min(sOf(f.a), sOf(f.b)), Math.min(sOf(a), sOf(b))), s1: Math.min(Math.max(sOf(f.a), sOf(f.b)), Math.max(sOf(a), sOf(b))) }))
    .filter((x) => x.gap > 0 && x.gap < 2000 && x.s1 - x.s0 > 1500)
    .sort((x, y) => x.gap - y.gap)[0];
  if (!host) return;
  const base = host.f.a;
  const onFace = (s: number, out: number): Point => add(add(base, scale(d, s - sOf(base))), scale(nOut, out));
  const PW = 100, PD = 80;
  // vanos del mismo plano: la bajada se corre hacia el centro hasta quedar libre
  const blocked = m.openings
    .filter(({ face, pts }) => face.nrm[0] * nOut[0] + face.nrm[1] * nOut[1] > 0.99 && Math.abs((pts[0]![0] - base[0]) * nOut[0] + (pts[0]![1] - base[1]) * nOut[1]) < 1)
    .map(({ pts }) => [Math.min(sOf([pts[0]![0], pts[0]![1]]), sOf([pts[1]![0], pts[1]![1]])) - PW, Math.max(sOf([pts[0]![0], pts[0]![1]]), sOf([pts[1]![0], pts[1]![1]])) + PW] as const);
  const free = (s0: number, step: number): number | null => {
    for (let s = s0; Math.abs(s - s0) <= 2000; s += step) if (!blocked.some(([b0, b1]) => s > b0 && s < b1)) return s;
    return null;
  };
  const spots = [free(host.s0 + 250, 50), free(host.s1 - 250, -50)].filter((x): x is number => x !== null);
  for (const s of spots) {
    const zTop = zEave - 100 - host.gap * 0.45;
    const zBot = host.f.z0 - PLINTH / 2;
    const c = [onFace(s - PW / 2, 0), onFace(s + PW / 2, 0), onFace(s + PW / 2, PD), onFace(s - PW / 2, PD)];
    for (let k = 0; k < 4; k++) {
      const p0 = c[k]!, p1 = c[(k + 1) % 4]!;
      const e = sub(p1, p0);
      const n0 = normalize([e[1], -e[0]]);
      const mid = scale(add(p0, p1), 0.5);
      const center = scale(add(c[0]!, c[2]!), 0.5);
      const nrm: Point = (mid[0] - center[0]) * n0[0] + (mid[1] - center[1]) * n0[1] > 0 ? n0 : scale(n0, -1);
      m.faces.push({ pts: [v3(p0, zBot), v3(p1, zBot), v3(p1, zTop), v3(p0, zTop)], nrm: [nrm[0], nrm[1], 0], layer: "TECHUMBRE", weight: W.thin });
    }
    // cuello: del canal a la bajada
    const g0 = add(add(a, scale(d, s - sOf(a))), scale(nOut, R));
    const g1 = onFace(s, PD / 2);
    for (const dz of [0, 60]) m.lines.push({ a: v3(g0, zEave - R - dz), b: v3(g1, zTop - dz), layer: "TECHUMBRE", weight: W.thin });
  }
}

// ── proyección y ocultamiento ──────────────────────────────────────────────────

export type View = { n: Point; name: string };
type Seg = { a: Point; b: Point; da: number; db: number; layer: LayerName; weight: number; dataId?: string };
type Occ = { poly: Point[]; box: [number, number, number, number]; depth: (q: Point) => number };

export function projector(n: Point) {
  const v: Point = [-n[0], -n[1]]; // dirección de la mirada
  const r: Point = [v[1], -v[0]]; // derecha del observador
  return {
    uz: (q: V3): Point => [q[0] * r[0] + q[1] * r[1], q[2]],
    /** Punto en planta para (u, profundidad). */
    at: (u: number, depth: number): Point => [r[0] * u + v[0] * depth, r[1] * u + v[1] * depth],
    depth: (q: V3): number => q[0] * v[0] + q[1] * v[1],
    /** Profundidad del plano de la cara en (u, z); null si la cara se ve de canto. */
    plane: (f: Face): ((q: Point) => number) | null => {
      const nv = f.nrm[0] * v[0] + f.nrm[1] * v[1];
      if (Math.abs(nv) < 1e-3) return null;
      const nr = f.nrm[0] * r[0] + f.nrm[1] * r[1];
      const dd = dot3(f.nrm, f.pts[0]!);
      return (q) => (dd - q[0] * nr - q[1] * f.nrm[2]) / nv;
    },
    /** La cara mira al observador (las de espaldas no se dibujan). */
    faces: (f: Face): boolean => f.nrm[0] * n[0] + f.nrm[1] * n[1] > 1e-3,
  };
}

const boxOf = (pts: Point[]): [number, number, number, number] => [
  Math.min(...pts.map((q) => q[0])), Math.min(...pts.map((q) => q[1])), Math.max(...pts.map((q) => q[0])), Math.max(...pts.map((q) => q[1])),
];

/** Tramos visibles de un segmento: se corta en cada cruce con un borde que lo tapa y se prueba el punto medio. */
function visible(s: Seg, occ: Occ[]): Array<[Point, Point]> {
  const sb = boxOf([s.a, s.b]);
  const near = occ.filter((o) => o.box[0] <= sb[2] && o.box[2] >= sb[0] && o.box[1] <= sb[3] && o.box[3] >= sb[1]);
  const ts = [0, 1];
  for (const o of near) {
    for (let i = 0; i < o.poly.length; i++) {
      const t = segParam(s.a, s.b, o.poly[i]!, o.poly[(i + 1) % o.poly.length]!);
      if (t !== null) ts.push(t);
    }
  }
  ts.sort((x, y) => x - y);
  const out: Array<[Point, Point]> = [];
  const at = (t: number): Point => [s.a[0] + (s.b[0] - s.a[0]) * t, s.a[1] + (s.b[1] - s.a[1]) * t];
  let open: number | null = null;
  for (let i = 0; i + 1 < ts.length; i++) {
    const [t0, t1] = [ts[i]!, ts[i + 1]!];
    if (t1 - t0 < 1e-7) continue;
    const tm = (t0 + t1) / 2, q = at(tm), dq = s.da + (s.db - s.da) * tm;
    const hidden = near.some((o) => o.depth(q) < dq - DEPTH_EPS && pointInPolygon(q, o.poly));
    if (!hidden && open === null) open = t0;
    if (hidden && open !== null) { out.push([at(open), at(t0)]); open = null; }
  }
  if (open !== null) out.push([at(open), s.b]);
  return out;
}

export type ViewGeom = {
  items: Array<{ layer: LayerName; prim: Prim; dataId?: string }>;
  u0: number; u1: number; z0: number; z1: number;
  /** Extremos de los muros y de la techumbre vistos (cotas). */
  wallU: [number, number] | null;
  roofU: [number, number] | null;
  /** Cota del terreno según u (solo con site.terrain); sin terreno, N.T. plano a −PLINTH. */
  ground: ((u: number) => number) | null;
};

/** Una cara del edificio en coordenadas de vista (u a la derecha del observador, z): tests y herramientas. */
export function projectElevation(p: Project, view: View): ViewGeom {
  return projectView(p, buildModel(p).m, view);
}

/**
 * Plano de corte de una sección: se descarta lo que está delante (profundidad < depth) y lo
 * cortado (polígonos (u, z) dados) tapa lo que queda detrás.
 */
export type Clip = { depth: number; occluders: Point[][] };

/** Recorta un polígono 3D al semiespacio profundidad ≥ d0 (Sutherland–Hodgman). */
function clipPoly(pts: V3[], depth: (q: V3) => number, d0: number): V3[] {
  const out: V3[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i]!, b = pts[(i + 1) % pts.length]!;
    const [da, db] = [depth(a) - d0, depth(b) - d0];
    if (da >= 0) out.push(a);
    if ((da >= 0) !== (db >= 0)) {
      const t = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
    }
  }
  return out;
}

export function projectView(p: Project, m: Model3, view: View, clip?: Clip): ViewGeom {
  const P = projector(view.n);
  const occ: Occ[] = [];
  const segs: Seg[] = [];
  const items: ViewGeom["items"] = [];
  const faceDepth = new Map<Face, (q: Point) => number>();
  for (const poly of clip?.occluders ?? []) occ.push({ poly, box: boxOf(poly), depth: () => clip!.depth });

  for (const f0 of m.faces) {
    const depth = P.plane(f0);
    if (!depth || !P.faces(f0)) continue;
    const f = clip ? { ...f0, pts: clipPoly(f0.pts, P.depth, clip.depth) } : f0;
    if (f.pts.length < 3) continue;
    faceDepth.set(f0, depth);
    const poly = f.pts.map(P.uz);
    occ.push({ poly, box: boxOf(poly), depth });
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i]!, b = poly[(i + 1) % poly.length]!;
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 1) continue;
      segs.push({ a, b, da: depth(a), db: depth(b), layer: f.layer, weight: f.weight });
    }
  }
  for (const l0 of m.lines) {
    let l = l0;
    if (clip) {
      const [da, db] = [P.depth(l0.a) - clip.depth, P.depth(l0.b) - clip.depth];
      if (da < 0 && db < 0) continue;
      if (da < 0 || db < 0) {
        const t = da / (da - db);
        const c: V3 = [l0.a[0] + (l0.b[0] - l0.a[0]) * t, l0.a[1] + (l0.b[1] - l0.a[1]) * t, l0.a[2] + (l0.b[2] - l0.a[2]) * t];
        l = da < 0 ? { ...l0, a: c } : { ...l0, b: c };
      }
    }
    const a = P.uz(l.a), b = P.uz(l.b);
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 1) continue;
    segs.push({ a, b, da: P.depth(l.a), db: P.depth(l.b), layer: l.layer, weight: l.weight });
  }
  // vanos: tapan el revestimiento de su cara (un poco delante) y se dibujan aún más adelante
  const OPEN_IN = 2 * DEPTH_EPS, OPEN_DRAW = 3 * DEPTH_EPS;
  for (const { face, o, pts } of m.openings) {
    const depth = faceDepth.get(face);
    if (!depth || (clip && Math.min(...pts.map(P.depth)) < clip.depth)) continue;
    const poly = pts.map(P.uz);
    occ.push({ poly, box: boxOf(poly), depth: (q) => depth(q) - OPEN_IN });
    const [x0, x1] = [Math.min(poly[0]![0], poly[1]![0]), Math.max(poly[0]![0], poly[1]![0])];
    for (const it of openingPrims(p, o, x0, x1, poly[0]![1], poly[2]![1])) {
      if (it.prim.kind === "text") {
        const q = it.prim.at;
        if (!occ.some((oc) => oc.depth(q) < depth(q) - OPEN_DRAW - DEPTH_EPS && pointInPolygon(q, oc.poly))) items.push({ ...it, dataId: o.id });
        continue;
      }
      for (const [a, b] of primSegments(it.prim)) segs.push({ a, b, da: depth(a) - OPEN_DRAW, db: depth(b) - OPEN_DRAW, layer: it.layer, weight: weightOf(it.prim), dataId: o.id });
    }
  }

  const seen = new Set<string>();
  let [u0, u1, z0, z1] = [Infinity, -Infinity, Infinity, -Infinity];
  for (const s of segs) {
    for (const [a, b] of visible(s, occ)) {
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 2) continue;
      const k = [a, b].map((q) => `${Math.round(q[0])},${Math.round(q[1])}`).sort().join("|") + s.layer;
      if (seen.has(k)) continue;
      seen.add(k);
      items.push({ layer: s.layer, prim: { kind: "line", a, b, weight: s.weight }, ...(s.dataId ? { dataId: s.dataId } : {}) });
      u0 = Math.min(u0, a[0], b[0]); u1 = Math.max(u1, a[0], b[0]);
      z0 = Math.min(z0, a[1], b[1]); z1 = Math.max(z1, a[1], b[1]);
    }
  }
  // muros vistos (para las cotas): extremos de las caras de muro de altura completa
  const span = (tag: Face["tag"]): [number, number] | null => {
    const us = m.faces.filter((f) => f.tag === tag && faceDepth.has(f)).flatMap((f) => f.pts.map((q) => P.uz(q)[0]));
    return us.length ? [Math.min(...us), Math.max(...us)] : null;
  };
  // terreno con pendiente declarada: cota del suelo frente a la fachada más cercana
  let ground: ViewGeom["ground"] = null;
  if (p.site.terrain?.elevations?.length) {
    const front = Math.min(...m.faces.filter((f) => f.tag === "wall" && faceDepth.has(f)).flatMap((f) => f.pts.map((q) => P.depth(q))));
    ground = (u) => groundAt(p, P.at(u, front - 500));
  }
  return { items, u0, u1, z0, z1, wallU: span("wall"), roofU: span("roof"), ground };
}

function weightOf(prim: Prim): number {
  return "weight" in prim && typeof prim.weight === "number" ? prim.weight : W.hair;
}

function primSegments(prim: Prim): Array<[Point, Point]> {
  if (prim.kind === "line") return [[prim.a, prim.b]];
  if (prim.kind === "polyline" || prim.kind === "polygon") {
    const pts = prim.pts;
    const out: Array<[Point, Point]> = [];
    for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i]!, pts[i + 1]!]);
    if ((prim.kind === "polygon" || prim.close) && pts.length > 2) out.push([pts[pts.length - 1]!, pts[0]!]);
    return out;
  }
  return [];
}

/** Dibujo de un vano en alzado (estándar): corredera con su detalle; abatible con el símbolo en V. */
export function openingPrims(p: Project, o: Opening, x0: number, x1: number, z0: number, z1: number): Array<{ layer: LayerName; prim: Prim }> {
  const out: Array<{ layer: LayerName; prim: Prim }> = [];
  const push = (layer: LayerName, prim: Prim): void => { out.push({ layer, prim }); };
  const style = p.styles.openings[o.style];
  if (style?.leaf === "truot") {
    slidingWindowFace(x0, x1, z0, z1, o.id, push);
    return out;
  }
  const rect = (a0: number, a1: number, b0: number, b1: number, weight: number): void =>
    push("VANOS", { kind: "polyline", pts: [[a0, b0], [a1, b0], [a1, b1], [a0, b1]], close: true, weight });
  rect(x0, x1, z0, z1, W.thin);
  const leaves: Array<[number, number]> = style?.leaf === "2-canh" ? [[x0, (x0 + x1) / 2], [(x0 + x1) / 2, x1]] : [[x0, x1]];
  if (leaves.length === 2) push("VANOS", { kind: "line", a: [(x0 + x1) / 2, z0], b: [(x0 + x1) / 2, z1], weight: W.thin });
  for (const [a0, a1] of leaves) {
    if (o.kind === "window") {
      rect(a0 + 30, a1 - 30, z0 + 30, z1 - 30, W.hair);
      rect(a0 + 40, a1 - 40, z0 + 40, z1 - 40, W.hair);
      // símbolo de hoja proyectante: V desde las esquinas superiores al centro del antepecho
      push("VANOS", { kind: "polyline", pts: [[a0 + 40, z1 - 40], [(a0 + a1) / 2, z0 + 40], [a1 - 40, z1 - 40]], weight: W.hair });
    } else {
      rect(a0 + 50, a1 - 50, z0, z1 - 50, W.hair);
      const hx = leaves.length === 2 ? (a1 === x1 ? a0 + 120 : a1 - 120) : a1 - 120;
      push("VANOS", { kind: "line", a: [hx - 40, z0 + 1000], b: [hx + 40, z0 + 1000], weight: W.thin });
    }
  }
  return out;
}

// ── lámina: 4 alzados ──────────────────────────────────────────────────────────

const CARDINAL = ["NORTE", "PONIENTE", "SUR", "ORIENTE"]; // cada 90° antihorario desde el norte

/** Transformación fija de la lámina: escala S, dibujo centrado en AREA (no usa el PAD de las plantas). */
export function sheetTransform(S: number, w: number, h: number): PlanTransform {
  const ox = AREA.x0 + (AREA.x1 - AREA.x0 - w) / 2, oy = AREA.y0 + (AREA.y1 - AREA.y0 - h) / 2;
  const bounds = { minX: 0, maxX: w * S, minY: -h * S, maxY: 0 };
  return {
    scale: S, rotated: false, paperW: w, paperH: h, ox, oy, bounds,
    toPaper: (q) => [ox + q[0] / S, oy - q[1] / S],
    dirToPaper: (v) => [v[0], -v[1]],
  };
}

/** Las 4 direcciones de vista: el frente (normal exterior del deslinde site.front) alineado a los muros, y sus giros. */
export function elevationViews(p: Project): View[] {
  const b = p.site.boundary;
  const A = b[p.site.front % b.length]!, B = b[(p.site.front + 1) % b.length]!;
  const e = normalize(sub(B, A));
  let nf: Point = signedArea(b) > 0 ? [e[1], -e[0]] : [-e[1], e[0]];
  // alinear a la orientación dominante de los muros (ponderada por largo)
  let sx = 0, sy = 0;
  for (const w of p.walls) {
    const d = wallDir(w), L = wallLength(w), th = 4 * Math.atan2(d[1], d[0]);
    sx += L * Math.cos(th); sy += L * Math.sin(th);
  }
  if (sx || sy) {
    const base = Math.atan2(sy, sx) / 4;
    const cands = [0, 1, 2, 3].map((k): Point => [Math.cos(base + (k * Math.PI) / 2), Math.sin(base + (k * Math.PI) / 2)]);
    nf = cands.sort((x, y) => (y[0] * nf[0] + y[1] * nf[1]) - (x[0] * nf[0] + x[1] * nf[1]))[0]!;
  }
  const north = rotate([0, 1], p.site.north);
  const ang = (n: Point): number => Math.atan2(north[0] * n[1] - north[1] * n[0], north[0] * n[0] + north[1] * n[1]);
  const k0 = ((Math.round(ang(nf) / (Math.PI / 2)) % 4) + 4) % 4;
  return [0, 1, 2, 3].map((k) => ({ n: rotate(nf, 90 * k), name: `ELEVACIÓN ${CARDINAL[(k0 + k) % 4]}` }));
}

export type ElevationsBuild = { items: Scene2D; tf: PlanTransform; meta: { title: string; scaleLabel: string } };
export type ElevationsOptions = { date?: string; designer?: string; sheetNo?: string; /** 50/100/200: se respeta si cabe. */ scale?: number };

/** Márgenes de cada alzado (mm de papel): cotas a la izquierda, niveles a la derecha, cotas y título abajo. */
const M = { left: 22, right: 24, top: 6, bottom: 26, gap: 6 };
/** Zona de dibujo de la lámina A3 (mm de papel): bajo la leyenda y sobre la viñeta. */
export const AREA = { x0: 10, y0: 24, x1: 410, y1: 246 };

export function buildElevationsScene(p: Project, opts: ElevationsOptions = {}): ElevationsBuild {
  if (p.walls.length === 0) throw new Error("Sin muros en el modelo: no hay elevaciones que dibujar.");
  const { m, siding } = buildModel(p);
  const views = elevationViews(p).map((v) => ({ v, g: projectView(p, m, v) }));
  for (const { v, g } of views) if (!Number.isFinite(g.u0)) throw new Error(`La ${v.name.toLowerCase()} quedó vacía.`);

  // 2×2 (fila 0: vistas 0 y 1; fila 1: 2 y 3); en cada fila el N.P.T. queda a la misma altura
  const colW = [0, 1].map((c) => Math.max(...[c, c + 2].map((k) => views[k]!.g.u1 - views[k]!.g.u0)));
  const rowTop = [0, 1].map((r) => Math.max(views[2 * r]!.g.z1, views[2 * r + 1]!.g.z1));
  const rowBot = [0, 1].map((r) => Math.min(views[2 * r]!.g.z0, views[2 * r + 1]!.g.z0, -FOOTING));
  const paperW = (S: number): number => colW[0]! / S + colW[1]! / S + 2 * (M.left + M.right) + M.gap;
  const paperH = (S: number): number => [0, 1].reduce((t, r) => t + (rowTop[r]! - rowBot[r]!) / S + M.top + M.bottom, 0) + M.gap;
  const fits = (s: number): boolean => paperW(s) <= AREA.x1 - AREA.x0 && paperH(s) <= AREA.y1 - AREA.y0;
  const S = opts.scale && [50, 100, 200].includes(opts.scale) && fits(opts.scale) ? opts.scale : [50, 100, 200].find(fits) ?? 200;
  const mm = (v: number): number => v * S;

  const items: Scene2D = [];
  const push = (layer: LayerName, prim: Prim, dataId?: string, space?: "model" | "paper"): void => {
    items.push({ layer, prim, ...(dataId ? { dataId } : {}), ...(space ? { space } : {}) });
  };

  const levelTops = [...new Set(p.levels.map((l) => l.elevation + l.height))];
  const roofTops = roofsOf(p).flatMap((rf) => {
    const lv = p.levels.find((l) => l.id === rf.level);
    return lv ? [roofGeometry(rf, lv).ridgeZ + (rf.thickness ?? 150)] : [];
  });

  views.forEach(({ v, g }, k) => {
    const col = k % 2, row = Math.floor(k / 2);
    // lámina en mm del modelo, y hacia arriba; origen = esquina superior izquierda de la zona de dibujo
    const cx = col === 0 ? 0 : colW[0]! + mm(M.left + M.right + M.gap);
    const top = row === 0 ? 0 : -(rowTop[0]! - rowBot[0]! + mm(M.top + M.bottom + M.gap));
    const ox = cx + mm(M.left) + (colW[col]! - (g.u1 - g.u0)) / 2 - g.u0;
    const oz = top - mm(M.top) - rowTop[row]!;
    const T = (q: Point): Point => [q[0] + ox, q[1] + oz];
    const put = (layer: LayerName, prim: Prim, dataId?: string): void => push(layer, movePrim(prim, T), dataId);
    for (const it of g.items) put(it.layer, it.prim, it.dataId);

    // terreno
    const gz = -PLINTH;
    const gx0 = g.u0 - mm(6), gx1 = g.u1 + mm(6);
    if (g.ground) {
      const pts: Point[] = [];
      for (let x = gx0; x < gx1; x += mm(3)) pts.push([x, g.ground(x)]);
      pts.push([gx1, g.ground(gx1)]);
      put("MUROS-CORTE", { kind: "polyline", pts, weight: W.cut });
    } else put("MUROS-CORTE", { kind: "line", a: [gx0, gz], b: [gx1, gz], weight: W.cut });
    // achurado de terreno solo fuera de la fundación (bajo el edificio se ve la fundación)
    const [f0, f1] = g.wallU ? [g.wallU[0] - FOOT_WING, g.wallU[1] + FOOT_WING] : [Infinity, -Infinity];
    for (let x = g.u0 - mm(6); x <= g.u1 + mm(6); x += mm(3)) {
      if (x - mm(1.4) < f1 && x > f0) continue;
      const zg = g.ground ? g.ground(x) : gz;
      put("MUROS-VISTA", { kind: "line", a: [x, zg], b: [x - mm(1.4), zg - mm(1.4)], weight: W.hair });
    }

    // niveles (derecha) y cotas verticales (izquierda)
    const nt = Math.round(g.ground ? g.ground((g.u0 + g.u1) / 2) : gz);
    // con terreno en pendiente el fondo de la fundación no tiene un nivel único: no se rotula
    const zs = [...new Set([...(g.ground ? [] : [-FOOTING]), nt, ...p.levels.map((l) => l.elevation), ...levelTops, ...roofTops].map(Math.round))].sort((a, b) => a - b);
    levelColumn(g.u1 + mm(5), zs, nt, mm, put);
    verticalDims(g.u0, zs.filter((z) => z >= nt), mm, put);

    // cotas horizontales: aleros + muros
    const us = [...new Set([...(g.roofU ?? []), ...(g.wallU ?? [])].map(Math.round))].sort((a, b) => a - b);
    horizontalDims(rowBot[row]! - mm(7), us, mm, put);

    // pendiente sobre cada faldón visto de frente al frontón
    for (const rf of roofsOf(p)) slopeLabels(p, rf, v, mm, put);

    put("TEXTOS", { kind: "text", at: [(g.u0 + g.u1) / 2, rowBot[row]! - mm(18)], text: `${v.name} Esc 1/${S}`, size: 3.5, bold: true, anchor: "middle" });
  });

  // leyenda de materiales (arriba a la izquierda, espacio papel)
  const fin = exteriorFinish(p);
  const roofs = roofsOf(p);
  const legend = [
    `Revestimiento exterior: ${fin ? fin.label : "por definir"}`,
    roofs.length ? `Cubierta: ${roofs.map((rf) => `${materialLabel(rf)}, pendiente ${Math.round(Math.tan((rf.pitch * Math.PI) / 180) * 100)} %`).filter((x, i, a) => a.indexOf(x) === i).join(" · ")}` : "Cubierta: sin techumbre en el modelo",
    `Sobrecimiento y fundación de hormigón; N.T. a ${(PLINTH / 1000).toFixed(2)} m bajo el N.P.T.`,
  ];
  legend.forEach((t, i) => push("TEXTOS", { kind: "text", at: [12, 13 + i * 3.6], text: t, size: 2.2 }, undefined, "paper"));
  if (!siding && fin) push("TEXTOS", { kind: "text", at: [12, 13 + legend.length * 3.6], text: "(revestimiento liso: sin despiece dibujado)", size: 2.0 }, undefined, "paper");

  const tf = sheetTransform(S, paperW(S), paperH(S));

  drawSheetFrame(push, {
    unverified: unverifiedRules(p).length > 0,
    projectName: p.meta.name,
    app: p.meta.app,
    title: "ELEVACIONES",
    sheetNo: opts.sheetNo ?? "ARQ-02",
    scaleLabel: `1:${tf.scale}`,
    ...(opts.date ? { date: opts.date } : {}),
    ...(opts.designer ? { designer: opts.designer } : {}),
  });
  return { items, tf, meta: { title: "ELEVACIONES", scaleLabel: `1:${tf.scale}` } };
}

function materialLabel(rf: Roof): string {
  if (isZinc(rf)) return `planchas de zinc ${rf.kind === "gable" ? "a dos aguas" : rf.kind === "hip" ? "a cuatro aguas" : "a un agua"}`;
  // ids de material heredados del upstream (contrato de datos): se rotulan en español
  const known: Record<string, string> = { ngoi: "tejas", "ngoi-phang": "tejas planas", "be-tong": "losa de hormigón" };
  return rf.material ? known[rf.material] ?? rf.material : "material por definir";
}

/** «PENDIENTE x %» sobre los dos faldones cuando la vista mira el frontón (cumbrera en la dirección de la mirada). */
function slopeLabels(p: Project, rf: Roof, v: View, mm: (x: number) => number, put: (l: LayerName, prim: Prim) => void): void {
  const lv = p.levels.find((l) => l.id === rf.level);
  if (!lv || rf.kind !== "gable") return;
  const g = roofGeometry(rf, lv);
  const c = g.creases[0];
  if (!c) return;
  const rd = normalize(sub(c[1], c[0]));
  if (Math.abs(rd[0] * v.n[0] + rd[1] * v.n[1]) < 0.99) return;
  const P = projector(v.n);
  const T = rf.thickness ?? 150;
  const us = rf.outline.map((q) => P.uz(v3(q, 0))[0]);
  const ur = P.uz(v3(c[0], 0))[0];
  const pct = `PENDIENTE ${Math.round(Math.tan((rf.pitch * Math.PI) / 180) * 100)}%`;
  for (const ue of [Math.min(...us), Math.max(...us)]) {
    const at: Point = [(ue + ur) / 2, (g.baseZ + g.ridgeZ) / 2 + T + mm(3)];
    put("TEXTOS", { kind: "text", at, text: pct, size: 2.0, anchor: "middle" });
  }
}

/** Nivel: triángulo, línea y cota en m; textY = altura del rótulo (null: no cabe, solo la línea). */
export function levelMark(x: number, z: number, tag: string, textY: number | null, mm: (v: number) => number, put: (l: LayerName, prim: Prim) => void): void {
  put("TEXTOS", { kind: "polyline", pts: [[x - mm(1.4), z + mm(1.6)], [x + mm(1.4), z + mm(1.6)], [x, z]], close: true, weight: W.thin });
  put("TEXTOS", { kind: "line", a: [x - mm(4), z], b: [x + mm(13), z], weight: W.hair });
  const label = z === 0 ? "±0.00" : `${z > 0 ? "+" : "−"}${(Math.abs(z) / 1000).toFixed(2)}`;
  if (textY !== null) put("TEXTOS", { kind: "text", at: [x + mm(2), textY], text: tag ? `${label} ${tag}` : label, size: 2.2 });
}

/** Cadena de cotas vertical a la izquierda del alzado (alturas), con cotas DIMENSION para el DXF. */
/** Columna de niveles: rótulos de arriba hacia abajo, sobre la línea; si chocan, bajo ella; si no caben, solo la línea. */
export function levelColumn(x: number, zs: number[], nt: number, mm: (v: number) => number, put: (l: LayerName, prim: Prim) => void): void {
  const taken: Array<[number, number]> = [];
  for (const z of [...zs].sort((a, b) => b - a)) {
    const slots: Array<[number, number, number]> = [[z + mm(0.4), z + mm(2.8), z + mm(0.9)], [z - mm(3.6), z - mm(1.2), z - mm(3.2)]];
    const slot = slots.find(([y0, y1]) => !taken.some(([t0, t1]) => y0 < t1 && y1 > t0));
    if (slot) taken.push([slot[0], slot[1]]);
    levelMark(x, z, z === nt ? "N.T." : z === 0 ? "N.P.T." : "", slot ? slot[2] : null, mm, put);
  }
}

export function verticalDims(xEdge: number, zs: number[], mm: (v: number) => number, put: (l: LayerName, prim: Prim) => void, gap = 9): void {
  if (zs.length < 2) return;
  const x = xEdge - mm(gap);
  put("COTAS", { kind: "line", a: [x, zs[0]!], b: [x, zs[zs.length - 1]!], weight: W.hair });
  for (const z of zs) {
    put("COTAS", { kind: "line", a: [xEdge - mm(2), z], b: [x - mm(1.2), z], weight: W.hair });
    tick(put, [x, z], mm(1.1));
  }
  for (let i = 0; i + 1 < zs.length; i++) {
    const [z0, z1] = [zs[i]!, zs[i + 1]!];
    const text = cmText(z1 - z0);
    // tramo corto: el valor va al costado, horizontal, para no pisar los remates
    const short = z1 - z0 < mm(4);
    const at: Point = short ? [x - mm(1.8), (z0 + z1) / 2 - mm(0.8)] : [x - mm(1.2), (z0 + z1) / 2];
    put("COTAS", short
      ? { kind: "text", at, text, size: 2.2, anchor: "end" }
      : { kind: "text", at, text, size: 2.2, anchor: "middle", along: { from: [x, z0], to: [x, z1] } });
    put("COTAS", { kind: "dim", a: [xEdge, z0], b: [xEdge, z1], line: [x, z1], rot: 90, text, textAt: at });
  }
}

/** Cadena de cotas horizontal bajo el alzado (aleros y muros). */
export function horizontalDims(z: number, us: number[], mm: (v: number) => number, put: (l: LayerName, prim: Prim) => void): void {
  if (us.length < 2) return;
  put("COTAS", { kind: "line", a: [us[0]!, z], b: [us[us.length - 1]!, z], weight: W.hair });
  for (const u of us) {
    put("COTAS", { kind: "line", a: [u, z + mm(1.5)], b: [u, z - mm(1.2)], weight: W.hair });
    tick(put, [u, z], mm(1.1));
  }
  for (let i = 0; i + 1 < us.length; i++) {
    const [u0, u1] = [us[i]!, us[i + 1]!];
    const at: Point = [(u0 + u1) / 2, z + mm(1.2)];
    const text = cmText(u1 - u0);
    put("COTAS", { kind: "text", at, text, size: 2.2, anchor: "middle" });
    put("COTAS", { kind: "dim", a: [u0, z + mm(1.5)], b: [u1, z + mm(1.5)], line: [u1, z], rot: 0, text, textAt: at });
  }
}

function tick(put: (l: LayerName, prim: Prim) => void, c: Point, t: number): void {
  dimTick((layer, prim) => put(layer, prim), "COTAS", c, t);
}

/** Traslada un primitivo (incluidas cotas semánticas y texto orientado). */
export function movePrim(prim: Prim, T: (q: Point) => Point): Prim {
  switch (prim.kind) {
    case "line": return { ...prim, a: T(prim.a), b: T(prim.b) };
    case "polyline":
    case "polygon": return { ...prim, pts: prim.pts.map(T) };
    case "circle":
    case "ellipse": return { ...prim, c: T(prim.c) };
    case "arc": return { ...prim, c: T(prim.c) };
    case "text": return { ...prim, at: T(prim.at), ...(prim.along ? { along: { from: T(prim.along.from), to: T(prim.along.to) } } : {}) };
    case "dim": return { ...prim, a: T(prim.a), b: T(prim.b), line: T(prim.line), textAt: T(prim.textAt) };
    case "door": return { ...prim, hinge: T(prim.hinge) };
    default: return prim;
  }
}
