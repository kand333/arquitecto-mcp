import type { Point } from "@arquitecto/core";
import { W, type LayerName, type Prim } from "./scene.js";

/**
 * Ventana corredera de 2 hojas (estándar de láminas, según el detalle del usuario):
 * - planta: marco + 2 hojas en rieles paralelos que se traslapan al centro, cada hoja con
 *   montantes en los extremos y vidrio en doble línea;
 * - alzado: marco doble, 2 hojas con marco y vidrio, flecha de sentido y manilla;
 * - sección: marco con perfiles de dintel y antepecho y las 2 hojas en paralelo.
 * Las medidas de perfil (mm reales) se acotan al vano para que se lea en ventanas chicas.
 */

type Push = (layer: LayerName, prim: Prim, dataId?: string) => void;

/** Profundidad del marco: llena muros delgados, máx. 12 cm. */
export const frameDepth = (wallThickness: number): number => Math.min(wallThickness, 120);

const rect = (pts: Point[], weight: number): Prim => ({ kind: "polyline", pts, close: true, weight });

/** Planta. a, b = jambas sobre el eje del muro; n = normal unitaria del muro. */
export function slidingWindowPlan(a: Point, b: Point, n: Point, wallThickness: number, id: string, push: Push): void {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (L < 1) return;
  const d: Point = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  const P = (s: number, t: number): Point => [a[0] + d[0] * s + n[0] * t, a[1] + d[1] * s + n[1] * t];
  const box = (s0: number, s1: number, t0: number, t1: number): Point[] => [P(s0, t0), P(s1, t0), P(s1, t1), P(s0, t1)];
  const fd = frameDepth(wallThickness);
  const h = fd / 2;
  const m = fd * 0.1;
  const ov = Math.min(60, L * 0.04); // traslapo de las hojas al centro
  const st = Math.min(50, L * 0.05); // montante de la hoja

  push("VANOS", rect(box(0, L, -h, h), W.thin), id);
  const leaves: Array<[number, number, number, number]> = [
    [m, L / 2 + ov, m * 0.5, h - m], // hoja exterior (riel +n)
    [L / 2 - ov, L - m, -h + m, -m * 0.5], // hoja interior (riel −n)
  ];
  for (const [s0, s1, t0, t1] of leaves) {
    push("VANOS", rect(box(s0, s1, t0, t1), W.thin), id);
    push("VANOS", rect(box(s0, s0 + st, t0, t1), W.hair), id);
    push("VANOS", rect(box(s1 - st, s1, t0, t1), W.hair), id);
    const tm = (t0 + t1) / 2, g = (t1 - t0) * 0.18;
    for (const t of [tm - g, tm + g]) push("VANOS", { kind: "line", a: P(s0 + st, t), b: P(s1 - st, t), weight: W.hair }, id);
  }
}

/** Alzado (elevación o vista en corte). x0..x1 = vano en horizontal, z0..z1 = antepecho a dintel. */
export function slidingWindowFace(x0: number, x1: number, z0: number, z1: number, id: string, push: Push): void {
  const box = (u0: number, u1: number, v0: number, v1: number): Point[] => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
  const fi = Math.min(50, (x1 - x0) * 0.04, (z1 - z0) * 0.04); // marco
  const g = fi * 0.6; // holgura hoja-marco
  const ls = Math.min(40, (x1 - x0) * 0.03); // perfil de la hoja
  const [xi0, xi1, zi0, zi1] = [x0 + fi, x1 - fi, z0 + fi, z1 - fi];
  const mid = (xi0 + xi1) / 2;

  push("VANOS", rect(box(x0, x1, z0, z1), W.mid), id);
  push("VANOS", rect(box(xi0, xi1, zi0, zi1), W.hair), id);
  push("VANOS", { kind: "line", a: [mid, zi0], b: [mid, zi1], weight: W.hair }, id); // encuentro de hojas
  const leaves: Array<[number, number]> = [[xi0 + g, mid - g * 0.5], [mid + g * 0.5, xi1 - g]];
  for (const [u0, u1] of leaves) {
    push("VANOS", rect(box(u0, u1, zi0 + g, zi1 - g), W.thin), id);
    push("VANOS", rect(box(u0 + ls, u1 - ls, zi0 + g + ls, zi1 - g - ls), W.hair), id);
  }
  // flecha de sentido en la hoja móvil (derecha → izquierda) y manilla en su borde libre
  const [r0, r1] = leaves[1]!;
  const zm = (z0 + z1) / 2;
  const ax0 = r0 + (r1 - r0) * 0.3, ax1 = r0 + (r1 - r0) * 0.7;
  const head = Math.min(80, (r1 - r0) * 0.08);
  push("VANOS", { kind: "line", a: [ax1, zm], b: [ax0, zm], weight: W.hair }, id);
  push("VANOS", { kind: "line", a: [ax0, zm], b: [ax0 + head, zm + head * 0.7], weight: W.hair }, id);
  push("VANOS", { kind: "line", a: [ax0, zm], b: [ax0 + head, zm - head * 0.7], weight: W.hair }, id);
  const hw = Math.max(10, ls * 0.5), hh = Math.min(120, (z1 - z0) * 0.06);
  push("VANOS", rect(box(r1 - ls * 0.5 - hw, r1 - ls * 0.5, zm - hh, zm + hh), W.hair), id);
  // rótulo del vano en la hoja fija
  const [l0, l1] = leaves[0]!;
  push("VANOS", { kind: "text", at: [(l0 + l1) / 2, zm], text: id, size: 2.2, anchor: "middle" }, id);
}

/** Sección (vano cortado). u = eje del muro en el corte; z0..z1 = antepecho a dintel. */
export function slidingWindowSection(u: number, wallThickness: number, z0: number, z1: number, id: string, push: Push): void {
  const box = (u0: number, u1: number, v0: number, v1: number): Point[] => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
  const h = frameDepth(wallThickness) / 2;
  const m = h * 0.2;
  const hp = Math.min(50, (z1 - z0) * 0.05); // perfiles de dintel y antepecho
  push("VANOS", rect(box(u - h, u + h, z0, z1), W.thin), id);
  push("VANOS", rect(box(u - h, u + h, z1 - hp, z1), W.hair), id);
  push("VANOS", rect(box(u - h, u + h, z0, z0 + hp), W.hair), id);
  for (const [a, b] of [[u - h + m, u - m * 0.5], [u + m * 0.5, u + h - m]] as Array<[number, number]>) {
    push("VANOS", rect(box(a, b, z0 + hp, z1 - hp), W.hair), id); // hoja
    push("VANOS", { kind: "line", a: [(a + b) / 2, z0 + hp], b: [(a + b) / 2, z1 - hp], weight: W.hair }, id); // vidrio
  }
}
