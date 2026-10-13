import { distPointToSegment } from "./geometry/segment.js";
import { openingMid, openingSidePoints, wallLength } from "./geometry/wall.js";
import { getWall, roomsAtPoint } from "./model.js";
import type { Opening, Point, Project, RoomUse, SwingKind } from "./types.js";

/**
 * Regla de apertura de puertas en vivienda (estándar del proyecto):
 * - Interiores: abren hacia ADENTRO del recinto que sirven (el más privado), con la bisagra hacia
 *   el lado de la pared, para que la hoja abierta descanse contra ella.
 * - Hacia patio, terraza, balcón o patio de luz: abren hacia AFUERA.
 * - Hacia el exterior: la puerta principal (fachada del frente del terreno) abre hacia adentro;
 *   las traseras o laterales abren hacia afuera.
 */
const PRIVATE = new Set<RoomUse>(["ngu", "wc", "kho", "lam-viec", "bep-an", "tho"]);
const OPEN_ROOM = new Set<RoomUse>(["san", "ban-cong", "gieng-troi"]);

type Side = { kind: "private" | "common" | "open" | "exterior"; name: string };

export function doorSide(p: Project, level: string, pt: Point): Side {
  const rooms = roomsAtPoint(p, level, pt);
  if (rooms.length === 0) return { kind: "exterior", name: "el exterior" };
  const priv = rooms.find((r) => PRIVATE.has(r.use));
  if (priv) return { kind: "private", name: priv.name };
  const common = rooms.find((r) => !OPEN_ROOM.has(r.use));
  if (common) return { kind: "common", name: common.name };
  return { kind: "open", name: rooms[0]!.name };
}

/** ¿El vano está en la fachada del frente? (el borde frontal del terreno es el más cercano). */
function onFrontFacade(p: Project, o: Opening): boolean {
  const w = getWall(p, o.wall);
  const b = p.site.boundary;
  if (!w || b.length < 3) return false;
  const m = openingMid(w, o);
  const d = (i: number): number => distPointToSegment(m, b[i]!, b[(i + 1) % b.length]!);
  const front = p.site.front ?? 0;
  for (let i = 0; i < b.length; i++) if (i !== front && d(i) < d(front)) return false;
  return true;
}

/**
 * Lado hacia el que DEBE abrir la puerta según la regla: "plus" = lado de la normal del muro
 * ("in" en `swing`), "minus" = lado opuesto ("out"); null si la regla no decide (p. ej. dos
 * recintos del mismo tipo).
 */
export function preferredOpenSide(p: Project, o: Opening): { side: "plus" | "minus"; toward: string; from: string } | null {
  const w = getWall(p, o.wall);
  if (!w || o.kind !== "door") return null;
  const [plusPt, minusPt] = openingSidePoints(w, o);
  const plus = doorSide(p, w.level, plusPt);
  const minus = doorSide(p, w.level, minusPt);
  const pick = (side: "plus" | "minus") =>
    side === "plus" ? { side, toward: plus.name, from: minus.name } : { side, toward: minus.name, from: plus.name };
  const interior = (s: Side): boolean => s.kind === "private" || s.kind === "common";
  // hacia patio / terraza / balcón: afuera
  if (plus.kind === "open" && interior(minus)) return pick("plus");
  if (minus.kind === "open" && interior(plus)) return pick("minus");
  // hacia el exterior: principal (frente) adentro; trasera/lateral afuera
  if (plus.kind === "exterior" && interior(minus)) return pick(onFrontFacade(p, o) ? "minus" : "plus");
  if (minus.kind === "exterior" && interior(plus)) return pick(onFrontFacade(p, o) ? "plus" : "minus");
  // interiores: hacia el recinto privado
  if (plus.kind === "private" && minus.kind === "common") return pick("plus");
  if (minus.kind === "private" && plus.kind === "common") return pick("minus");
  return null;
}

/** Giro por defecto cuando la puerta no lo declara: lado según la regla, bisagra hacia la pared más cercana. */
export function defaultSwing(p: Project, o: Opening): SwingKind {
  const w = getWall(p, o.wall);
  if (!w || o.kind !== "door") return "in-L";
  const dir = preferredOpenSide(p, o)?.side === "minus" ? "out" : "in";
  const hand = o.offset <= wallLength(w) - (o.offset + o.width) ? "L" : "R";
  return `${dir}-${hand}`;
}
