/**
 * i18n del editor web.
 * - Español por defecto (arquitecto-mcp es para Chile). El botón alterna ES/EN.
 * - La elección manual gana: ?lang=… o el botón (se guarda en localStorage).
 * - Los planos exportados aún llevan rótulos del upstream (pendiente).
 * Funciona también en Node (tests): localStorage/location están protegidos.
 */

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const EN: Dict = {
  "app.connecting": "connecting…",
  "conn.on": "live",
  "conn.connecting": "connecting…",
  "conn.off": "connection lost — retrying…",
  "view.plan": "Plan",
  "view.3d": "3D",
  "view.split": "Split",
  "share.btn": "share",
  "share.title": "Copy a VIEW-ONLY link for family — they see everything live but cannot edit; revoke with POST /share/rotate",
  "share.copied": "View-only link copied — send it to your family:\n{url}",
  "share.error": "Could not fetch the share link — try reloading the page.",
  "lang.title": "Cambiar la interfaz a español",
  "tool.select": "Select / move — drag walls, doors, furniture; type a number while dragging for exact mm; Alt disables snapping; R rotates the selected furniture",
  "tool.wall": "Draw wall — coming later",
  "tool.door": "Place door — coming later",
  "tool.window": "Place window — coming later",
  "tool.room": "Draw room — coming later",
  "tool.furniture": "Furniture — open the catalog, pick an item, then click the plan to place it; Esc/V to stop",
  "tool.measure": "Measure — coming later",
  "tool.locked": "View-only share link — editing disabled",
  "pane2d.empty": "Waiting for a project — the drawing grows as Claude builds.",
  "pane2d.hint": "drag an object — move · type while dragging — exact mm · Alt — no snap",
  "fit2d": "fit view",
  "fit2d.title": "Fit the drawing to the pane",
  "walk.btn": "walk",
  "walk.title": "Walk through the house — WASD to move, mouse to look, Shift to run, Esc to exit",
  "walk.hint": "WASD — move · mouse — look · Shift — run · Esc — exit",
  "sun.btn": "sun",
  "sun.title": "Sun study by hour + month (latitude from the brief)",
  "sun.hour": "hour",
  "sun.month": "month",
  "doors.btn": "open doors",
  "doors.title": "Open or close every hinged door",
  "roof.btn": "no roof",
  "roof.title": "Hide or show the roof to look inside",
  "levels.btn": "by floor",
  "levels.title": "By floor: show only up to the active floor (pick it in the bottom bar), without the roof",
  "reset3d": "reset view",
  "reset3d.title": "Back to the default camera",
  "hint3d.orbit": "drag — orbit · wheel — zoom · right-drag — pan",
  "panel.props": "Properties",
  "panel.issues": "Checks",
  "props.empty": "Tap an object on the drawing to see its numbers.",
  "props.empty.sub": "Drag to move — type a number while dragging for exact mm.",
  "issues.clean": "Drawing is clean — no issues.",
  "issues.pending": "No check results yet.",
  "footer.levels": "Floor",
  "footer.revision": "Revision",
  "footer.conn": "Link",
  "footer.claude": "Claude",
  "footer.undo": "Undo",
  "footer.snap": "Snap",
  "undo.title": "Undo (Ctrl+Z) — your own actions only",
  "redo.title": "Redo (Ctrl+Y)",
  "snap.title": "Snap grid step (mm) — 0 disables",
  "toast.claude": "Claude",
  "toast.user": "You",
  "toast.reject": "Rejected",
  "toast.rejectFallback": "The server rejected the change.",
  "toast.readonly": "You are on a view-only share link — look, don't touch.",
  "toast.deleteUnsupported": "Deleting {kind} from the editor is not supported yet.",
  "viewer.badge": "VIEW ONLY",
  "hud.typing": "⏎ commit · Esc clear",
  "hud.typable": "type a number for exact mm",
  "hud.gap": "gap",
  "catalog.title": "Furniture",
  "catalog.search": "search: bed, sofa, motorbike…",
  "catalog.empty": "No matching assets.",
  "catalog.mounted": "wall-mounted",
  "kind.wall": "Wall",
  "kind.opening": "Opening",
  "kind.slab": "Slab",
  "kind.roof": "Roof",
  "kind.stair": "Stair",
  "kind.room": "Room",
  "kind.furniture": "Furniture",
  "kind.level": "Floor",
  "note.place": "place {label}",
  "note.rotate": "rotate {id}",
  "note.delete": "delete {id}",
  "note.drag": "drag {id}",
  "note.typed": "{id}: typed {value}",
  "note.prop": "edit {id}.{field}",
  "note.undo": "undo: {label}",
  "note.redo": "redo: {label}",
};

const ES: Dict = {
  "app.connecting": "conectando…",
  "conn.on": "en vivo",
  "conn.connecting": "conectando…",
  "conn.off": "conexión perdida: reintentando…",
  "view.plan": "Planta",
  "view.3d": "3D",
  "view.split": "Dividida",
  "share.btn": "compartir",
  "share.title": "Copia un link de SOLO LECTURA: se ve todo en vivo pero no se puede editar (solo funciona en este equipo)",
  "share.copied": "Link de solo lectura copiado:\n{url}",
  "share.error": "No se pudo obtener el link compartido: prueba recargar la página.",
  "lang.title": "Switch interface language to English",
  "tool.select": "Seleccionar / mover: arrastra muros, puertas y muebles; mientras arrastras escribe un número para fijar la medida exacta; Alt desactiva el ajuste; R gira el mueble seleccionado",
  "tool.wall": "Dibujar muro (próximamente)",
  "tool.door": "Poner puerta (próximamente)",
  "tool.window": "Poner ventana (próximamente)",
  "tool.room": "Dibujar recinto (próximamente)",
  "tool.furniture": "Mobiliario: abre el catálogo, elige una pieza y haz clic en la planta para ubicarla; Esc/V para terminar",
  "tool.measure": "Medir (próximamente)",
  "tool.locked": "Link de solo lectura: no se puede editar",
  "pane2d.empty": "Esperando un proyecto: el plano crece a medida que Claude construye.",
  "pane2d.hint": "arrastrar objeto: mover · escribir mientras arrastras: medida exacta · Alt: sin ajuste",
  "fit2d": "ajustar",
  "fit2d.title": "Ajustar el plano a la vista",
  "walk.btn": "recorrer",
  "walk.title": "Recorrer la casa: WASD para moverse, mouse para mirar, Shift para correr, Esc para salir",
  "walk.hint": "WASD: moverse · mouse: mirar · Shift: correr · Esc: salir",
  "sun.btn": "sol",
  "sun.title": "Asoleamiento por hora y mes (latitud desde el brief)",
  "sun.hour": "hora",
  "sun.month": "mes",
  "doors.btn": "abrir puertas",
  "doors.title": "Abrir o cerrar todas las puertas abatibles",
  "roof.btn": "sin techo",
  "roof.title": "Quitar o poner la techumbre para ver el interior",
  "levels.btn": "por piso",
  "levels.title": "Ver por pisos: muestra solo hasta el piso activo (elígelo en la barra inferior), sin techo",
  "reset3d": "vista inicial",
  "reset3d.title": "Volver a la cámara por defecto",
  "hint3d.orbit": "arrastrar: orbitar · rueda: zoom · botón derecho: desplazar",
  "panel.props": "Propiedades",
  "panel.issues": "Revisión",
  "props.empty": "Toca un objeto del plano para ver sus datos.",
  "props.empty.sub": "Arrastra para mover; mientras arrastras, escribe un número para la medida exacta.",
  "issues.clean": "Plano limpio: sin observaciones.",
  "issues.pending": "Aún no hay resultados de revisión.",
  "footer.levels": "Piso",
  "footer.revision": "Revisión",
  "footer.conn": "Conexión",
  "footer.claude": "Claude",
  "footer.undo": "Deshacer",
  "footer.snap": "Ajuste",
  "undo.title": "Deshacer (Ctrl+Z): solo tus acciones",
  "redo.title": "Rehacer (Ctrl+Y)",
  "snap.title": "Paso de la grilla de ajuste (mm); 0 lo desactiva",
  "toast.claude": "Claude",
  "toast.user": "Tú",
  "toast.reject": "Rechazado",
  "toast.rejectFallback": "El servidor rechazó el cambio.",
  "toast.readonly": "Estás en un link de solo lectura: puedes mirar, no editar.",
  "toast.deleteUnsupported": "Aún no se puede eliminar {kind} desde el editor.",
  "viewer.badge": "SOLO LECTURA",
  "hud.typing": "⏎ fijar · Esc borrar",
  "hud.typable": "escribe un número para la medida exacta",
  "hud.gap": "holgura",
  "catalog.title": "Mobiliario",
  "catalog.search": "buscar: cama, sofá, mesa…",
  "catalog.empty": "Ninguna pieza coincide.",
  "catalog.mounted": "colgado",
  "kind.wall": "Muro",
  "kind.opening": "Vano",
  "kind.slab": "Losa",
  "kind.roof": "Techo",
  "kind.stair": "Escalera",
  "kind.room": "Recinto",
  "kind.furniture": "Mueble",
  "kind.level": "Piso",
  "note.place": "ubicar {label}",
  "note.rotate": "girar {id}",
  "note.delete": "eliminar {id}",
  "note.drag": "mover {id}",
  "note.typed": "{id}: escrito {value}",
  "note.prop": "editar {id}.{field}",
  "note.undo": "deshacer: {label}",
  "note.redo": "rehacer: {label}",
};

const DICTS: Record<Lang, Dict> = { es: ES, en: EN };

export const DICT_KEYS = Object.keys(ES);
export const DICT_EN_KEYS = Object.keys(EN);

export type DetectInput = {
  /** ?lang de la URL. */
  query?: string | null;
  /** Elección manual guardada (localStorage). */
  saved?: string | null;
};

const isLang = (v: string | null | undefined): v is Lang => v === "es" || v === "en";

/** Elige el idioma (función pura, testeable): ?lang > guardado > español. */
export function detectLang(input: DetectInput): Lang {
  if (isLang(input.query)) return input.query;
  if (isLang(input.saved)) return input.saved;
  return "es";
}

function detect(): Lang {
  let query: string | null = null;
  if (typeof location !== "undefined") {
    query = new URLSearchParams(location.search).get("lang");
    if (isLang(query)) {
      try {
        localStorage.setItem("arquitecto-lang", query);
      } catch {
        // storage bloqueado: igual sirve durante la sesión
      }
    }
  }
  let saved: string | null = null;
  try {
    saved = typeof localStorage !== "undefined" ? localStorage.getItem("arquitecto-lang") : null;
  } catch {
    // ignore
  }
  return detectLang({ query, saved });
}

export const LANG: Lang = detect();

/** Busca en el diccionario del idioma INDICADO (para tests independientes del entorno). */
export function translate(lang: Lang, key: string, params?: Record<string, string | number>): string {
  let s = DICTS[lang][key] ?? ES[key] ?? key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

export function t(key: string, params?: Record<string, string | number>): string {
  return translate(LANG, key, params);
}

/** Aplica el diccionario al DOM estático: [data-i18n] → textContent, [data-i18n-title] → title. */
export function applyDom(root: ParentNode = document): void {
  if (root === document) document.documentElement.lang = LANG;
  for (const el of root.querySelectorAll<HTMLElement>("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n!);
  }
  for (const el of root.querySelectorAll<HTMLElement>("[data-i18n-title]")) {
    el.title = t(el.dataset.i18nTitle!);
  }
}

export function toggleLang(): void {
  try {
    localStorage.setItem("arquitecto-lang", LANG === "en" ? "es" : "en");
  } catch {
    // ignore
  }
  // conserva la ruta (incluido /xem/<token> y ?token=) y quita ?lang para que mande localStorage
  const url = new URL(location.href);
  url.searchParams.delete("lang");
  location.href = url.toString();
}
