import type { Opening, Point, Polygon, Wall } from "../types.js";
import { add, dist, normalize, perp, scale, sub } from "./vec.js";

export const wallLength = (w: Wall): number => dist(w.from, w.to);

/** Vector đơn vị dọc tường (from → to). */
export const wallDir = (w: Wall): Point => normalize(sub(w.to, w.from));

/** Pháp tuyến trái của tường (bên trái khi đi from→to). */
export const wallNormal = (w: Wall): Point => perp(wallDir(w));

/** Điểm trên tim tường tại khoảng cách s từ `from` (mm). */
export function pointOnWall(w: Wall, s: number): Point {
  return add(w.from, scale(wallDir(w), s));
}

/** Dải tường: polygon 4 đỉnh từ tim ± thickness/2, đầu mút vuông. */
export function wallBand(w: Wall): Polygon {
  const n = scale(wallNormal(w), w.thickness / 2);
  return [add(w.from, n), add(w.to, n), sub(w.to, n), sub(w.from, n)];
}

/** Đoạn [start,end] của opening dọc tường (từ from). */
export function openingSpan(o: Opening): [number, number] {
  return [o.offset, o.offset + o.width];
}

/** Polygon ô chờ của opening trong dải tường (thế giới). */
export function openingRect(w: Wall, o: Opening): Polygon {
  const n = scale(wallNormal(w), w.thickness / 2);
  const a = pointOnWall(w, o.offset);
  const b = pointOnWall(w, o.offset + o.width);
  return [add(a, n), add(b, n), sub(b, n), sub(a, n)];
}

/** Trung điểm ô chờ trên tim tường. */
export function openingMid(w: Wall, o: Opening): Point {
  return pointOnWall(w, o.offset + o.width / 2);
}

/**
 * Hai điểm mẫu hai bên opening, cách mặt tường `gap` mm —
 * dùng hỏi "cửa này thông phòng nào với phòng nào".
 * Trả [bên trái tường (pháp tuyến +), bên phải].
 */
export function openingSidePoints(w: Wall, o: Opening, gap = 150): [Point, Point] {
  const mid = openingMid(w, o);
  const n = scale(wallNormal(w), w.thickness / 2 + gap);
  return [add(mid, n), sub(mid, n)];
}

/**
 * Encuentro de muros (estándar de láminas): cada extremo del eje que cae dentro de la banda de
 * otro muro no paralelo del mismo conjunto se extiende, a lo largo del muro, hasta la cara LEJANA
 * de ese muro (L y T quedan cerradas, sin muesca en la esquina). Devuelve el muro extendido y el
 * corrimiento de los vanos (`shift` = lo que creció el inicio). Solo para dibujo/3D; los
 * validadores siguen usando la banda cruda (`wallBand`).
 */
export function joinedWall(walls: Wall[], w: Wall): { wall: Wall; shift: number } {
  const d = wallDir(w);
  const reach = (end: Point, u: Point): number => {
    let best = 0;
    for (const v of walls) {
      if (v === w || v.id === w.id || wallsParallel(v, w)) continue;
      const band = wallBand(v);
      if (!insideOrOn(end, band)) continue;
      for (let i = 0; i < band.length; i++) {
        const t = rayHit(end, u, band[i]!, band[(i + 1) % band.length]!);
        if (t !== null && t > best) best = t;
      }
    }
    return best;
  };
  const extStart = reach(w.from, scale(d, -1));
  const extEnd = reach(w.to, d);
  if (extStart === 0 && extEnd === 0) return { wall: w, shift: 0 };
  return {
    wall: { ...w, from: add(w.from, scale(d, -extStart)), to: add(w.to, scale(d, extEnd)) },
    shift: extStart,
  };
}

/** Punto dentro o sobre el borde de un polígono convexo (tolerancia 0,5 mm). */
function insideOrOn(p: Point, poly: Polygon): boolean {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % poly.length]!;
    const len = dist(a, b) || 1;
    const c = ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / len; // distancia con signo
    if (Math.abs(c) <= 0.5) continue;
    const s = Math.sign(c);
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

/** Parámetro t ≥ 0 donde el rayo p + t·u corta el segmento [a,b]; null si no lo corta. */
function rayHit(p: Point, u: Point, a: Point, b: Point): number | null {
  const e = sub(b, a);
  const den = u[0] * e[1] - u[1] * e[0];
  if (Math.abs(den) < 1e-9) return null;
  const ap = sub(a, p);
  const t = (ap[0] * e[1] - ap[1] * e[0]) / den;
  const s = (ap[0] * u[1] - ap[1] * u[0]) / den;
  if (t < -1e-6 || s < -1e-6 || s > 1 + 1e-6) return null;
  return Math.max(0, t);
}

/** Hai tường có song song không (sai số góc nhỏ). */
export function wallsParallel(a: Wall, b: Wall, epsDeg = 0.5): boolean {
  const da = wallDir(a);
  const db = wallDir(b);
  const crossAbs = Math.abs(da[0] * db[1] - da[1] * db[0]);
  return crossAbs < Math.sin((epsDeg * Math.PI) / 180);
}
