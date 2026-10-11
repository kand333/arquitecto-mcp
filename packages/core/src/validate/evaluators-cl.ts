import { pointInPolygon } from "../geometry/polygon.js";
import { openingSidePoints } from "../geometry/wall.js";
import { clearHeight, floorSlabOf, getLevel, getWall, levelAbove, roomsAtPoint } from "../model.js";
import type { Project, Room, RoomUse } from "../types.js";
import { isOutdoorPoint } from "./evaluators-std.js";
import type { Finding } from "./finding.js";
import type { RuleDef } from "./rules.js";

/**
 * Evaluadores del pack Chile (OGUC). Fuente y citas: docs/oguc-sources.md.
 * Si falta un dato para evaluar, emiten CL-INDET (info) en vez de callar:
 * nunca se declara cumplimiento por defecto.
 */

/**
 * OGUC art. 4.1.1: locales habitables = permanencia de personas (dormitorios, comedores,
 * salas de estar, oficinas…); no habitables = tránsito o estadía esporádica (baños, cocinas,
 * vestidores, lavaderos, vestíbulos, galerías, pasillos). Bodegas exceptuadas de la altura.
 */
const HABITABLE = new Set<RoomUse>(["ngu", "khach", "lam-viec"]);
const NO_HABITABLE = new Set<RoomUse>(["wc", "hanh-lang", "kho", "cau-thang", "gara", "san", "gieng-troi", "ban-cong"]);
// "bep-an" (cocina + comedor: habitable y no habitable a la vez) y "tho" (sin equivalente) → indeterminado

function indet(rule: string, r: Room, motivo: string): Finding {
  return { rule: "CL-INDET", severity: "info", entities: [r.id], values: { regla: rule, ten: r.name, room: r.id, motivo } };
}

/** true = habitable; false = no habitable (no aplica); undefined = no se puede clasificar. */
function isHabitable(r: Room): boolean | undefined {
  if (HABITABLE.has(r.use)) return true;
  if (NO_HABITABLE.has(r.use)) return false;
  return undefined;
}

/** CL-ALT-01 — OGUC 4.1.1: altura mínima de piso a cielo en locales habitables. */
export function clAlt01(p: Project, def: RuleDef): Finding[] {
  const min = def.params!.min!;
  const out: Finding[] = [];
  for (const r of p.rooms) {
    const hab = isHabitable(r);
    if (hab === false) continue;
    if (hab === undefined) {
      out.push(indet(def.id, r, `uso "${r.use}" sin clasificar como habitable o no habitable`));
      continue;
    }
    const level = getLevel(p, r.level);
    const above = levelAbove(p, r.level);
    if (!level || (above && !floorSlabOf(p, above.id))) {
      out.push(indet(def.id, r, "falta el piso o la losa superior para calcular la altura libre"));
      continue;
    }
    const clear = Math.round(clearHeight(p, r.level));
    if (clear <= 0) {
      out.push(indet(def.id, r, "altura libre no calculable"));
      continue;
    }
    if (clear < min) {
      out.push({ entities: [r.id, r.level], values: { ten: r.name, room: r.id, level: level.name, clear, min } });
    }
  }
  return out;
}

/** ¿Alguna ventana del recinto da al exterior o a un patio de luz? (no cuenta el vano de la escalera). */
function hasExteriorWindow(p: Project, room: Room): boolean {
  for (const o of p.openings) {
    if (o.kind !== "window") continue;
    const w = getWall(p, o.wall);
    if (!w || w.level !== room.level) continue;
    const [pa, pb] = openingSidePoints(w, o);
    const aIn = pointInPolygon(pa, room.polygon);
    const bIn = pointInPolygon(pb, room.polygon);
    if (aIn === bIn) continue; // la ventana no separa este recinto de otro espacio
    const other = aIn ? pb : pa;
    if (isOutdoorPoint(p, room.level, other)) return true;
    if (roomsAtPoint(p, room.level, other).some((x) => x.use === "gieng-troi")) return true;
  }
  return false;
}

/** CL-VEN-01 — OGUC 4.1.2: al menos una ventana con aire y luz del exterior en locales habitables. */
export function clVen01(p: Project, def: RuleDef): Finding[] {
  const out: Finding[] = [];
  for (const r of p.rooms) {
    const hab = isHabitable(r);
    if (hab === false) continue;
    if (hab === undefined) {
      out.push(indet(def.id, r, `uso "${r.use}" sin clasificar como habitable o no habitable`));
      continue;
    }
    if (!hasExteriorWindow(p, r)) out.push({ entities: [r.id], values: { ten: r.name, room: r.id } });
  }
  return out;
}
