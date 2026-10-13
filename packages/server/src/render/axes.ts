import { add, pointOnWall, roomsAtPoint, scale, segmentsIntersect, wallBand, wallDir, wallLength, wallNormal, type Axis, type Project, type RoomUse, type Wall } from "@arquitecto/core";

/** Separación mínima entre ejes dibujados (mm): ejes más cercanos se omiten (burbujas superpuestas). */
const MIN_GAP = 600;
/** Un muro "cruza" el piso si su largo cubre al menos esta fracción del ancho/fondo del piso. */
const CROSS_RATIO = 0.6;
/** Recintos abiertos: un muro que da a ellos es de fachada. */
const OPEN = new Set<RoomUse>(["san", "ban-cong", "gieng-troi"]);

/** ¿Un punto se ve desde afuera? Algún rayo en x/y sale del piso sin cruzar un muro. */
function escapes(q: [number, number], bands: Array<Array<[number, number]>>): boolean {
  const FAR = 1e7;
  return ([[1, 0], [-1, 0], [0, 1], [0, -1]] as const).some(([dx, dy]) => {
    const z: [number, number] = [q[0] + dx * FAR, q[1] + dy * FAR];
    return !bands.some((b) => b.some((a, i) => segmentsIntersect(q, z, a, b[(i + 1) % b.length]!)));
  });
}

/**
 * ¿El muro es de fachada en algún tramo? Muestrea 5 puntos a cada lado: da a fachada si el
 * punto se ve desde afuera o cae en un patio/terraza (un hueco interior sin recinto no cuenta).
 */
function facesOutside(p: Project, w: Wall, bands: Array<Array<[number, number]>>): boolean {
  const n = scale(wallNormal(w), w.thickness / 2 + 150);
  const len = wallLength(w);
  for (const t of [0.1, 0.3, 0.5, 0.7, 0.9]) {
    const c = pointOnWall(w, len * t);
    for (const q of [add(c, n), add(c, scale(n, -1))]) {
      const rooms = roomsAtPoint(p, w.level, q);
      if (rooms.length > 0 ? rooms.every((r) => OPEN.has(r.use)) : escapes(q, bands)) return true;
    }
  }
  return false;
}

/**
 * Ejes principales (estándar de láminas): solo los que pasan por el CENTRO de un muro principal
 * —perimetral, de fachada (da al exterior o a patio/terraza) o que cruza el piso— en algún piso; se omiten los de tabiques cortos y los que
 * quedan a menos de 60 cm de otro ya dibujado. Sin muros en el modelo, se dibujan todos.
 */
export function principalAxes(p: Project): { x: Axis[]; y: Axis[] } {
  if (p.walls.length === 0) return { x: [...p.axes.x], y: [...p.axes.y] };
  const byLevel = new Map<string, Wall[]>();
  for (const w of p.walls) byLevel.set(w.level, [...(byLevel.get(w.level) ?? []), w]);

  const principal = (offset: number, vertical: boolean): boolean => {
    for (const walls of byLevel.values()) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const w of walls) for (const [x, y] of wallBand(w)) {
        minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
      }
      for (const w of walls) {
        const d = wallDir(w);
        const isVertical = Math.abs(d[0]) < 1e-3;
        const isHorizontal = Math.abs(d[1]) < 1e-3;
        if (vertical ? !isVertical : !isHorizontal) continue;
        const c = vertical ? w.from[0] : w.from[1];
        if (Math.abs(c - offset) > 1) continue;
        const [lo, hi, span] = vertical ? [minX, maxX, maxY - minY] : [minY, maxY, maxX - minX];
        const perimeter = Math.abs(c - lo) <= w.thickness || Math.abs(c - hi) <= w.thickness;
        if (perimeter || wallLength(w) >= CROSS_RATIO * span) return true;
        if (facesOutside(p, w, walls.map(wallBand))) return true;
      }
    }
    return false;
  };
  const pick = (axes: Axis[], vertical: boolean): Axis[] => {
    const kept: Axis[] = [];
    for (const a of [...axes].sort((m, n) => m.offset - n.offset)) {
      if (!principal(a.offset, vertical)) continue;
      if (kept.some((k) => Math.abs(k.offset - a.offset) < MIN_GAP)) continue;
      kept.push(a);
    }
    return kept;
  };
  return { x: pick(p.axes.x, true), y: pick(p.axes.y, false) };
}
