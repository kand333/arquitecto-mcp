import { pointInPolygon } from "../geometry/polygon.js";
import { openingSidePoints } from "../geometry/wall.js";
import { clearHeight, floorSlabOf, getLevel, getWall, levelAbove, roomsAtPoint } from "../model.js";
import type { Project, Room, RoomUse } from "../types.js";
import { pln01, pln02, pln03, pln04, pln05, pln07 } from "./evaluators-pln.js";
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

/* ── cl-cip: normas urbanísticas del CIP (OGUC 1.4.4 n°5), valores declarados por el usuario ── */

/** El CIP no se declaró → indeterminado a nivel de proyecto (nunca un pase silencioso). */
function cipIndet(p: Project, def: RuleDef, motivo: string): Finding[] {
  return [{ rule: "CL-INDET", severity: "info", entities: [], values: { regla: def.id, ten: "el proyecto", room: p.meta.id, motivo } }];
}

const declared = (v: number | undefined): boolean => v != null && v > 0;

/** CL-CIP-ANT — antejardín (letra f): reutiliza PLN-01. */
export function clCipAnt(p: Project, def: RuleDef): Finding[] {
  return declared(p.brief.dat?.quy_hoach?.khoang_lui_truoc ?? p.site.setbacks?.front) ? pln01(p) : cipIndet(p, def, "no se declaró el antejardín del CIP");
}

/** CL-CIP-FON — distanciamiento al deslinde de fondo (letra f): reutiliza PLN-02. */
export function clCipFon(p: Project, def: RuleDef): Finding[] {
  return declared(p.brief.dat?.quy_hoach?.khoang_lui_sau ?? p.site.setbacks?.back) ? pln02(p) : cipIndet(p, def, "no se declaró el distanciamiento al fondo del CIP");
}

/** CL-CIP-COS — coeficiente de ocupación del suelo (letra d), declarado en %: reutiliza PLN-03. */
export function clCipCos(p: Project, def: RuleDef): Finding[] {
  if (!declared(p.brief.dat?.quy_hoach?.mat_do_max)) return cipIndet(p, def, "no se declaró el coeficiente de ocupación del suelo del CIP");
  const ground = [...p.levels].sort((a, b) => a.elevation - b.elevation)[0];
  if (!ground || !floorSlabOf(p, ground.id)) return cipIndet(p, def, "falta la losa del primer piso para medir la ocupación");
  return pln03(p);
}

/** CL-CIP-PIS — altura en número de pisos (letra e): reutiliza PLN-04. */
export function clCipPis(p: Project, def: RuleDef): Finding[] {
  return declared(p.brief.dat?.quy_hoach?.tang_max) ? pln04(p) : cipIndet(p, def, "no se declaró la altura máxima en pisos del CIP");
}

/** CL-CIP-ALT — altura en metros (letra e), declarada en mm: reutiliza PLN-05. */
export function clCipAlt(p: Project, def: RuleDef): Finding[] {
  return declared(p.brief.dat?.quy_hoach?.chieu_cao_max) ? pln05(p) : cipIndet(p, def, "no se declaró la altura máxima de edificación del CIP");
}

/** CL-CIP-DIS — distanciamientos por deslinde (letra f), en site.edges[].setback: reutiliza PLN-07. */
export function clCipDis(p: Project, def: RuleDef): Finding[] {
  return p.site.edges?.some((e) => declared(e?.setback)) ? pln07(p) : cipIndet(p, def, "no se declararon distanciamientos por deslinde del CIP");
}
