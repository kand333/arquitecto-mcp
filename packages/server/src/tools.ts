import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  areaM2, ASSET_CATEGORIES, estimateCost, formatMonto, getLevel, searchAssets,
  stairLayout, unverifiedRules, validateProject,
  type AssetCategory, type CaptureCamera, type FinishLevel, type Issue, type Op, type Project,
} from "@arquitecto/core";
import { buildAssetsSheetSvg, SHEET_CAPACITY } from "./render/assets-sheet.js";
import { compareHtml, compareProjects, money } from "./compare.js";
import { DEFAULT_WEB_DIST, LiveServer, openInBrowser } from "./live.js";
import { renderElevationSvg, renderPlanFiles, renderSectionSvg } from "./render/render.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./render/sheets.js";
import { modelToGlb } from "./render/gltf-writer.js";
import { modelToIfc } from "./render/ifc-writer.js";
import { detectWalls } from "./import/detect.js";
import { parseDxf } from "./import/dxf.js";
import { imageSize } from "./import/image-size.js";
import { loadUnderlay, placedPolylines, underlayDir } from "./import/underlay.js";
import { safeJoin } from "./safe-path.js";
import { ProjectStore, VISIBLE_TEMPLATES } from "./store.js";

const ENTITY = z.enum([
  "level", "wall", "opening", "slab", "roof", "stair", "room", "furniture", "axis", "style", "finish", "underlay",
]);

const OP = z.discriminatedUnion("op", [
  z.object({ op: z.literal("add"), entity: ENTITY, data: z.record(z.unknown()) }),
  z.object({ op: z.literal("update"), entity: ENTITY, id: z.string(), data: z.record(z.unknown()) }),
  z.object({ op: z.literal("delete"), entity: ENTITY, id: z.string() }),
]);

type ToolResult = {
  content: Array<
    | { type: "text"; text: string }
    | { type: "image"; data: string; mimeType: string }
  >;
  isError?: boolean;
};

/** M1: tope de tamaño para underlay_import (se copia a .arquitecto/underlay y se incrusta como data URI). */
const UNDERLAY_MAX_BYTES = 20 * 1024 * 1024;

/** LOW: PNG vía Chromium en una carpeta temporal que se borra siempre (también si el render falla). */
async function renderTempPng(prefix: string, render: (fp: string) => Promise<void>): Promise<string> {
  const dir = mkdtempSync(path.join(tmpdir(), prefix));
  try {
    const fp = path.join(dir, "out.png");
    await render(fp);
    return readFileSync(fp).toString("base64");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });
const fail = (e: unknown): ToolResult => ({
  content: [{ type: "text", text: `❌ ${e instanceof Error ? e.message : String(e)}` }],
  isError: true,
});

function issueLines(issues: Issue[]): string {
  if (issues.length === 0) return "0 observaciones — limpio.";
  return issues
    .map((i) => `[${i.rule}/${i.severity}] ${i.message}${i.entities.length ? ` (${i.entities.join(", ")})` : ""}`)
    .join("\n");
}

function projectBrief(p: Project): string {
  const perLevel = p.levels
    .map((l) => {
      const rooms = p.rooms.filter((r) => r.level === l.id).length;
      const walls = p.walls.filter((w) => w.level === l.id).length;
      return `${l.id} "${l.name}": ${walls} muros, ${rooms} recintos`;
    })
    .join("; ");
  return `"${p.meta.name}" (revisión ${p.meta.revision}) — ${p.levels.length} pisos: ${perLevel}. Vanos: ${p.openings.length}, mobiliario: ${p.furniture.length}.`;
}

export function createArquitectoServer(store: ProjectStore, live: LiveServer = new LiveServer(store)): McpServer {
  const server = new McpServer({ name: "arquitecto", version: "0.1.0" });

  server.registerTool(
    "project_new",
    {
      title: "Crear un proyecto nuevo",
      description:
        `Crea el modelo en ${store.filePath}. Con plantilla, parte de una casa tipo (más rápido y mejor que desde cero) y luego se ajusta con apply_ops. Plantillas disponibles: ${VISIBLE_TEMPLATES.join(", ")}. siteBoundary = polígono del deslinde del terreno en mm [[x,y],...] si ya se conoce.`,
      inputSchema: {
        name: z.string().min(1).describe("Nombre del proyecto, p. ej. 'Casa Pérez'"),
        template: z.string().optional().describe("ID de la plantilla inicial (vacío = proyecto en blanco)"),
        siteBoundary: z.array(z.tuple([z.number().int(), z.number().int()])).min(3).optional(),
        brief: z.record(z.unknown()).optional().describe("Brief de la fase A: dat (terreno), gia_dinh (familia), nhu_cau (necesidades), ngan_sach (presupuesto), gu (estilo), uu_tien (prioridades). Valores del Certificado de Informaciones Previas (CIP) en dat.quy_hoach: khoang_lui_truoc = antejardín (mm), khoang_lui_sau = distanciamiento al fondo (mm), mat_do_max = coeficiente de ocupación del suelo en % (0,6 → 60), tang_max = pisos máximos, chieu_cao_max = altura máxima (mm). Distanciamientos por deslinde: site.edges[i].setback. Sin estos datos, las reglas CL-CIP-* quedan indeterminadas"),
      },
    },
    (args) => {
      try {
        const p = store.newProject(args.name, args.template, args.siteBoundary as never, args.brief as never);
        return text(`✅ Creado ${store.filePath}\n${projectBrief(p)}\nSiguiente: brief (fase A) → apply_ops para construir/ajustar el modelo → validate → render_plan.`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "project_open",
    {
      title: "Abrir un proyecto existente",
      description: `Abre un archivo de modelo dentro de la carpeta del proyecto. Sin path abre ${store.filePath}.`,
      inputSchema: { path: z.string().optional() },
    },
    (args) => {
      try {
        const p = store.openProject(args.path);
        return text(`✅ Abierto.\n${projectBrief(p)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "model_query",
    {
      title: "Leer el modelo",
      description:
        "Lee parte del modelo según un filtro. select.entity (walls|openings|slabs|stairs|rooms|furniture|levels|axes|styles|finishes|meta|brief|site), select.ids, select.level. computed=true agrega valores derivados (superficie de recintos, contrahuella de escaleras): NO se guardan en el modelo, no intentes escribirlos.",
      inputSchema: {
        select: z
          .object({
            entity: z.string().optional(),
            ids: z.array(z.string()).optional(),
            level: z.string().optional(),
          })
          .optional(),
        computed: z.boolean().optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const out = queryModel(p, args.select ?? {}, args.computed ?? false);
        return text(JSON.stringify(out, null, 2));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "apply_ops",
    {
      title: "Modificar el modelo (única vía de cambios)",
      description:
        "Aplica un lote de ops como UNA transacción: se aplican todas o ninguna. baseRevision debe ser la revisión actual; si hace rato que no lees el modelo (o el usuario pudo editar a mano), llama SIEMPRE antes a get_changes_since y nunca sobrescribas cambios del usuario. Lo que el usuario está arrastrando en el editor tiene bloqueo suave (LOCK-01): espera unos segundos, mira con get_changes_since qué cambió y adáptate en vez de «corregirlo a tu gusto». No existe una op que reemplace todo el modelo. Un error de nivel block anula la transacción: lee el mensaje, corrige y reenvía. Las advertencias (error/warn/info) no bloquean la escritura pero hay que resolverlas antes de cada checkpoint. El cliente asigna los ID con prefijo: W muro, D puerta, S ventana, R recinto, F mueble, ST escalera, SL losa, L piso; solo letras, números, «_» o «-» (1–32).",
      inputSchema: {
        baseRevision: z.number().int().nonnegative(),
        ops: z.array(OP).min(1),
        note: z.string().optional().describe("Nota breve para el historial, p. ej. 'Dividir dormitorio 2'"),
      },
    },
    (args) => {
      try {
        const r = store.apply(args.baseRevision, args.ops as Op[], args.note);
        if (!r.ok) {
          return text(`⛔ Transacción anulada (revisión actual: ${r.currentRevision}).\n${issueLines(r.errors)}`);
        }
        const warn = r.warnings.length ? `\nAdvertencias:\n${issueLines(r.warnings)}` : "\nValidador: limpio.";
        return text(`✅ revisión ${r.revision} — ${r.summary}${warn}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "get_changes_since",
    {
      title: "Ver cambios desde una revisión",
      description:
        "Devuelve las ops desde esa revisión hasta ahora, con resumen en texto y origen (claude/user/system). Úsala para ponerte al día con los cambios manuales del usuario antes de apply_ops.",
      inputSchema: { revision: z.number().int().nonnegative() },
    },
    (args) => {
      try {
        const { entries, currentRevision } = store.changesSince(args.revision);
        if (entries.length === 0) return text(`No hay cambios después de la revisión ${args.revision}. Revisión actual: ${currentRevision}.`);
        const lines = entries.map((e) => `r${e.revision} [${e.origin}] ${e.summary}${e.note ? ` — "${e.note}"` : ""}`);
        return text(`Revisión actual: ${currentRevision}\n${lines.join("\n")}\n\nDetalle de ops:\n${JSON.stringify(entries.map((e) => ({ revision: e.revision, ops: e.ops })), null, 2)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "validate",
    {
      title: "Ejecutar el validador",
      description:
        "Ejecuta todas las reglas que aplican al proyecto (topología GEO + el pack normativo de su región) sobre el modelo. scope.level o scope.entityIds filtran el resultado. Corre validate + render_plan y revisa tú mismo ANTES de mostrarle algo al usuario (principio 5).",
      inputSchema: {
        scope: z
          .object({ level: z.string().optional(), entityIds: z.array(z.string()).optional() })
          .optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        let issues = validateProject(p);
        const scope = args.scope;
        if (scope?.entityIds?.length) {
          const set = new Set(scope.entityIds);
          issues = issues.filter((i) => i.entities.some((e) => set.has(e)));
        }
        if (scope?.level) {
          const onLevel = entityIdsOfLevel(p, scope.level);
          issues = issues.filter((i) => i.entities.some((e) => onLevel.has(e)));
        }
        // E4: el resultado del proyecto no equivale a obligaciones verificadas — se avisan las reglas sin validar
        const sinValidar = unverifiedRules(p).map((r) => r.id);
        const nota = sinValidar.length
          ? `\n⚠ Reglas sin validación documental (resultado orientativo, no certifica cumplimiento): ${sinValidar.join(", ")}.`
          : "";
        // Chile: descargo fijo, independiente de verified (los evaluadores simplifican el texto legal)
        const descargo =
          (p.config?.region ?? "cl") === "cl"
            ? "\nResultado orientativo sobre un anteproyecto: no certifica cumplimiento legal de la OGUC ni reemplaza la revisión de un arquitecto o de la DOM."
            : "";
        return text(`Validador (revisión ${p.meta.revision}): ${issueLines(issues)}${nota}${descargo}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "render_plan",
    {
      title: "Dibujar la planta (PNG + SVG)",
      description:
        "Genera la planta de un piso con su simbología y cotas a partir del modelo y devuelve un PNG para verlo en el chat (el SVG queda en .arquitecto/exports). layers filtra capas (p. ej. solo TUONG-CAT,DIM para revisar medidas). scale 50/100 (por defecto se elige solo).",
      inputSchema: {
        level: z.string().describe("ID del piso, p. ej. L1"),
        scale: z.number().int().optional(),
        layers: z.array(z.string()).optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        const underlay = loadUnderlay(p, store.baseDir);
        const r = await renderPlanFiles(p, args.level, store.exportDir, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.scale ? { scale: args.scale } : {}),
          ...(args.layers ? { layers: args.layers } : {}),
          ...(underlay ? { underlay } : {}),
        });
        const issues = validateProject(p);
        const note = `Dibujado ${r.levelName} (${r.scaleLabel}) → ${r.svgPath}\nValidador: ${issues.length === 0 ? "limpio" : `${issues.length} observaciones — ejecuta validate para verlas`}.`;
        if (!r.pngPath) {
          return text(`${note}\n(Error en el PNG: ${r.pngError ?? "desconocido"} — revisa el SVG.)`);
        }
        const png = readFileSync(r.pngPath).toString("base64");
        return {
          content: [
            { type: "image" as const, data: png, mimeType: "image/png" },
            { type: "text" as const, text: note },
          ],
        };
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "editor_open",
    {
      title: "Abrir el editor en el navegador",
      description:
        "Inicia el editor web (en el mismo proceso del servidor, solo en 127.0.0.1 y con token) y lo abre en el navegador predeterminado: desde ahí CADA apply_ops aparece al instante en pantalla (2D + 3D). Llámala después de project_new/project_open. openBrowser=false si solo necesitas la URL. Luego usa capture_view para ver exactamente lo que ve el usuario (principio 5).",
      inputSchema: {
        openBrowser: z.boolean().optional().describe("Por defecto true: abre el navegador"),
      },
    },
    async (args) => {
      try {
        void store.current; // falla temprano si no hay proyecto abierto, con su mensaje guía
        await live.start();
        const url = live.editorUrl()!; // A1: lleva el token del propietario
        if (args.openBrowser !== false) openInBrowser(url);
        const distNote = existsSync(DEFAULT_WEB_DIST)
          ? ""
          : "\n⚠ El editor web no está compilado: la página indicará ejecutar pnpm --filter @arquitecto/web build";
        const share = live.shareUrl();
        return text(
          `✅ Editor: ${url}${args.openBrowser !== false ? " (navegador abierto)" : ""} — navegadores conectados: ${live.browserCount}.${distNote}` +
            (share
              ? `\n👁 Link de SOLO LECTURA (ve todo en vivo, no puede editar): ${share}\n   (el servidor solo escucha en 127.0.0.1: el link funciona únicamente en este equipo)`
              : ""),
        );
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "capture_view",
    {
      title: "Capturar la vista del editor",
      description:
        "Pide al navegador abierto una captura de EXACTAMENTE lo que ve el usuario: target '3d' (canvas Three.js) o 'plan' (planta 2D). camera {position, lookAt} en mm fija el ángulo 3D antes de capturar; vacío = el ángulo actual del usuario. Sin navegador: 'plan' usa el render del servidor (piso más bajo) y '3d' exige editor_open antes. Úsala para revisar tú mismo tras cada cambio grande (principio 5).",
      inputSchema: {
        target: z.enum(["3d", "plan"]),
        camera: z
          .object({
            position: z.tuple([z.number(), z.number(), z.number()]).optional(),
            lookAt: z.tuple([z.number(), z.number(), z.number()]).optional(),
          })
          .optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        if (live.browserCount > 0) {
          const png = await live.capture(args.target, args.camera as CaptureCamera | undefined);
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: `Imagen ${args.target} del navegador (revisión ${p.meta.revision}).` },
            ],
          };
        }
        if (args.target === "plan") {
          const ground = [...p.levels].sort((a, b) => a.elevation - b.elevation)[0]!;
          const r = await renderPlanFiles(p, ground.id, store.exportDir, {
            date: new Date().toLocaleDateString("vi-VN"),
          });
          if (!r.pngPath) return fail(new Error(`Falló el render de respaldo: ${r.pngError ?? "desconocido"}`));
          const png = readFileSync(r.pngPath).toString("base64");
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: `No hay navegador abierto: este es el render del servidor de ${r.levelName} (revisión ${p.meta.revision}). Para ver exactamente la vista del usuario, primero editor_open.` },
            ],
          };
        }
        return fail(new Error("No hay ningún navegador con el editor abierto: llama antes a editor_open (el 3d solo se captura desde el navegador)."));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "assets_search",
    {
      title: "Buscar mobiliario en el catálogo",
      description:
        `Busca en el catálogo de ${"≥100"} piezas normalizadas (medidas REALES en mm y holguras recomendadas; los nombres aún están en vietnamita, traducción pendiente). Usa el id devuelto en apply_ops add furniture. Devuelve además UNA lámina de contacto para ver forma y tamaño. maxFootprint {w,d} filtra lo que cabe en un hueco (p. ej. 900 mm). Categorías: ${ASSET_CATEGORIES.join(", ")}. Lo que va colgado indica "treo <mm>" (altura): se fija con el campo elevation del mueble.`,
      inputSchema: {
        query: z.string().optional().describe("Palabra clave en español o inglés, o id/categoría; p. ej. 'sofá', 'cama'"),
        category: z.string().optional(),
        maxFootprint: z.object({ w: z.number().optional(), d: z.number().optional() }).optional(),
      },
    },
    async (args) => {
      try {
        if (args.category && !ASSET_CATEGORIES.includes(args.category as AssetCategory)) {
          return fail(new Error(`La categoría "${args.category}" no existe. Válidas: ${ASSET_CATEGORIES.join(", ")}.`));
        }
        const found = searchAssets(args.query ?? "", args.category as AssetCategory | undefined, args.maxFootprint);
        if (found.length === 0) return text("Ninguna pieza coincide: prueba una palabra más amplia o quita filtros.");
        const lines = found.slice(0, 40).map((a) => {
          const cl = a.clearance
            ? ` — holgura${a.clearance.front ? ` frontal ${a.clearance.front}` : ""}${a.clearance.sides ? ` lateral ${a.clearance.sides}` : ""}`
            : "";
          const treo = a.mountHeight != null ? ` — colgado a ${a.mountHeight}` : "";
          return `${a.id} · ${a.label} · ${a.footprint.w}×${a.footprint.d}, alto ${a.footprint.h}${cl}${treo}`;
        });
        if (found.length > 40) lines.push(`… y ${found.length - 40} piezas más: filtra con category/maxFootprint.`);
        const note = `${found.length} piezas coinciden:\n${lines.join("\n")}`;
        try {
          const svg = buildAssetsSheetSvg(
            found.slice(0, SHEET_CAPACITY),
            args.query || args.category ? `RESULTADO: ${args.query ?? args.category}` : "CATÁLOGO DE MOBILIARIO — ARQUITECTO",
          );
          const { svgToPng } = await import("./render/png.js");
          const png = await renderTempPng("arquitecto-assets-", (fp) => svgToPng(svg, fp));
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: note },
            ],
          };
        } catch {
          return text(note); // sin Chromium sigue sirviendo en texto
        }
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "render_view",
    {
      title: "Dibujar elevación / corte (PNG + SVG)",
      description:
        "Genera la ELEVACIÓN PRINCIPAL (proyección del frente site.front) o el CORTE A-A (longitudinal por la escalera; requiere escalera) a partir del modelo y devuelve un PNG para verlo en el chat. Úsala para revisar antes del checkpoint de la fase E (principio 5); la planta sigue siendo render_plan.",
      inputSchema: {
        kind: z.enum(["elevation", "section"]),
        scale: z.number().int().optional().describe("50/100 — por defecto se elige solo"),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        const opts = {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.scale ? { scale: args.scale } : {}),
        };
        const r = args.kind === "elevation" ? renderElevationSvg(p, opts) : renderSectionSvg(p, opts);
        mkdirSync(store.exportDir, { recursive: true });
        const base = args.kind === "elevation" ? "elevacion" : "corte-a-a";
        const svgPath = path.join(store.exportDir, `${base}.svg`);
        writeFileSync(svgPath, r.svg, "utf8");
        const pngPath = path.join(store.exportDir, `${base}.png`);
        try {
          const { svgToPng } = await import("./render/png.js");
          await svgToPng(r.svg, pngPath);
        } catch (e) {
          return text(`Dibujado ${r.title} (${r.scaleLabel}) → ${svgPath}\n(Error en el PNG: ${e instanceof Error ? e.message : String(e)} — revisa el SVG.)`);
        }
        const png = readFileSync(pngPath).toString("base64");
        return {
          content: [
            { type: "image" as const, data: png, mimeType: "image/png" },
            { type: "text" as const, text: `Dibujado ${r.title} (${r.scaleLabel}) → ${svgPath}` },
          ],
        };
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_save",
    {
      title: "Guardar alternativa (A/B)",
      description:
        "Guarda el modelo actual como una ALTERNATIVA con nombre (.arquitecto/phuong-an/) para comparar A/B, p. ej. antes de probar otra distribución: variant_save('Alternativa A — escalera al centro'). Mismo nombre = se sobrescribe. Para verlas lado a lado: variant_compare o la página /so-sanh del editor.",
      inputSchema: { name: z.string().min(1).describe("Nombre de la alternativa, p. ej. 'Alternativa A — cocina al fondo'") },
    },
    (args) => {
      try {
        const { slug, revision } = store.saveVariant(args.name);
        const all = store.listVariants().map((v) => `${v.slug} ("${v.name}", r${v.revision})`).join("; ");
        return text(`✅ Alternativa "${args.name}" guardada (slug: ${slug}, en la revisión ${revision}).\nGuardadas: ${all}.`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_open",
    {
      title: "Pasar a una alternativa guardada",
      description:
        "Convierte una alternativa en el modelo de trabajo; todas las pestañas del editor reciben el nuevo estado. ⚠ El modelo actual NO se guarda solo: si quieres conservarlo, haz variant_save antes. La revisión sigue creciendo, así que get_changes_since mantiene la continuidad.",
      inputSchema: { slug: z.string().min(1) },
    },
    (args) => {
      try {
        const p = store.openVariant(args.slug);
        return text(`✅ Trabajando sobre la alternativa "${args.slug}".\n${projectBrief(p)}`);
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "variant_compare",
    {
      title: "Comparar 2 alternativas lado a lado",
      description:
        "Pone 2 plantas LADO A LADO + tabla de diferencias (superficie por recinto, cantidad de muros/vanos/muebles, PRESUPUESTO de cada una) y devuelve un PNG para verlo en el chat. a/b son slugs de alternativas o 'hien-tai' (actual); por defecto a = la última guardada y b = el modelo actual. El usuario ve la versión interactiva en <editor>/so-sanh?token=…&a=&b=&level=.",
      inputSchema: {
        a: z.string().optional(),
        b: z.string().optional(),
        level: z.string().optional().describe("ID del piso; por defecto el más bajo"),
      },
    },
    async (args) => {
      try {
        const side = (key: string | undefined, fallbackLatest: boolean): { label: string; model: Project } => {
          if (key && key !== "hien-tai") {
            const v = store.readVariant(key);
            return { label: v.name, model: v.model };
          }
          if (fallbackLatest) {
            const latest = store.listVariants().at(-1);
            if (latest) {
              const v = store.readVariant(latest.slug);
              return { label: v.name, model: v.model };
            }
            throw new Error("Aún no hay alternativas: usa variant_save antes de comparar.");
          }
          return { label: `ACTUAL (r${store.current.meta.revision})`, model: store.current };
        };
        const a = side(args.a, true);
        const b = side(args.b, false);
        const level = args.level ?? [...a.model.levels].sort((x, y) => x.elevation - y.elevation)[0]?.id;
        if (!level) return fail(new Error("El modelo aún no tiene pisos."));

        store.refreshDonGia();
        const report = compareProjects(a, b);
        const lines = [
          `Comparación (${level}): A = ${report.a.label} · B = ${report.b.label}`,
          ...report.highlights.map((h) => `• ${h}`),
          `Superficie total de recintos: A ${report.a.tongPhong_m2}m² · B ${report.b.tongPhong_m2}m²; presupuesto: A ${money(report.a.presupuesto, report.a.tabla)} · B ${money(report.b.presupuesto, report.b.tabla)}.`,
          ...(live.url ? [`Versión interactiva: ${live.url}/so-sanh?token=${live.ownerToken}${args.a ? `&a=${encodeURIComponent(args.a)}` : ""}`] : []),
        ];
        try {
          const html = compareHtml(a, b, level, store.current.meta.name);
          const { htmlToPng } = await import("./render/png.js");
          const png = await renderTempPng("arquitecto-sosanh-", (fp) => htmlToPng(html, fp));
          return {
            content: [
              { type: "image" as const, data: png, mimeType: "image/png" },
              { type: "text" as const, text: lines.join("\n") },
            ],
          };
        } catch {
          return text(lines.join("\n")); // sin Chromium igual queda la comparación en texto
        }
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "estimate_cost",
    {
      title: "Presupuesto preliminar",
      description:
        "Estima el costo de construcción desde el modelo: superficie equivalente (losas 100 %, fundaciones ~40 %, techo ~50 %) × precio de obra gruesa + superficie útil × precio de terminaciones según el nivel del brief (muc lo fuerza: co-ban básico | trung-binh-kha medio | cao-cap alto). Compara con el presupuesto del brief. Margen ±15–20 %; NO reemplaza una cotización. Hoy solo hay tabla de precios para el legado VN: en proyectos chilenos da solo cantidades hasta cargar la tabla CLP/UF (E4). La lámina de presupuesto también va en el export (id 'estimate').",
      inputSchema: {
        muc: z.enum(["co-ban", "trung-binh-kha", "cao-cap"]).optional(),
      },
    },
    (args) => {
      try {
        const p = store.current;
        store.refreshDonGia();
        const e = estimateCost(p, args.muc as FinishLevel | undefined);
        const q = e.quantities;
        const lines: string[] = [];
        lines.push(`PRESUPUESTO PRELIMINAR — "${p.meta.name}" (revisión ${p.meta.revision})`);
        lines.push("");
        lines.push("Superficies que se cobran:");
        for (const l of q.dien_tich) {
          lines.push(`  ${l.label}${l.uoc_le ? " (estimada)" : ""}: ${l.dien_tich_m2}m² × ${l.he_so} = ${l.quy_doi_m2}m²`);
        }
        lines.push(`  TOTAL EQUIVALENTE: ${q.tong_quy_doi_m2}m² · superficie útil ${q.san_thuc_m2}m²`);
        lines.push("");
        const t = e.tabla;
        if (t) {
          const sym = t.currency.symbol;
          lines.push(`Costos (${t.currency.code}):`);
          for (const i of e.items) {
            lines.push(
              i.precio_m2 == null
                ? `  ${i.label}: precio por completar`
                : `  ${i.label}: ${i.precio_m2.toLocaleString(t.currency.locale)} ${sym}/m² → ${formatMonto(i.monto!, t)}`,
            );
          }
          lines.push(e.total == null ? "  ➤ TOTAL: por completar (faltan precios)" : `  ➤ TOTAL: ${formatMonto(e.total, t)}`);
          if (e.ngan_sach) {
            const ns = e.ngan_sach;
            lines.push(
              ns.monto == null || ns.diferencia == null
                ? `Presupuesto del brief "${ns.text}": no se puede comparar (sin total o sin monto reconocible).`
                : ns.diferencia >= 0
                  ? `Presupuesto del brief ${formatMonto(ns.monto, t)} → SOBRAN ~${formatMonto(ns.diferencia, t)}.`
                  : `Presupuesto del brief ${formatMonto(ns.monto, t)} → SE EXCEDE ~${formatMonto(-ns.diferencia, t)}: considera bajar el nivel de terminaciones o la superficie.`,
            );
          }
        }
        lines.push("");
        lines.push(`Cantidades de referencia: muros de albañilería ${q.tuong_xay_m2}m², puertas/ventanas ${q.cua_bo} unidades (${q.cua_m2}m²), escalera ${q.bac_thang} peldaños.`);
        for (const g of e.ghi_chu) lines.push(`⚠ ${g}`);
        if (t) lines.push(`(Tabla de precios ${t.version}; una tabla local va en rules/don-gia.json dentro de la carpeta del proyecto.)`);
        return text(lines.join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "export",
    {
      title: "Exportar la documentación",
      description:
        "Exporta a .arquitecto/exports/expediente/. format: 'pdf' = el JUEGO de láminas ARQ-01… en un solo A3 de varias páginas (para entregar); 'svg' = un archivo por lámina; 'dxf' = un archivo por lámina con geometría, en mm reales (se mide en CAD; las láminas de tablas no tienen DXF); 'gltf' = UN .glb de toda la casa (en metros, un nodo por entidad según su id; se abre en un visor o en Blender, con scripts/render-photoreal.py para render fotorrealista); 'ifc' = IFC4 de anteproyecto (muros + vanos con relaciones voids/fills, losas con perforaciones, escalera, IfcSpace por recinto: para pasar a un arquitecto/BIM, NO es un proyecto de construcción). sheets solo aplica a pdf/svg/dxf: plan-<levelId> | elevation | section | schedule | estimate. SIEMPRE validate y revisión del render antes de entregar (checkpoint 5).",
      inputSchema: {
        format: z.enum(["pdf", "svg", "dxf", "gltf", "ifc"]),
        sheets: z.array(z.string()).optional(),
      },
    },
    async (args) => {
      try {
        const p = store.current;
        if (args.format === "gltf" || args.format === "ifc") {
          const dir0 = path.join(store.exportDir, "expediente");
          mkdirSync(dir0, { recursive: true });
          const issues0 = validateProject(p);
          const vNote = `Validador: ${issues0.length === 0 ? "limpio." : `${issues0.length} observaciones — ejecuta validate antes de entregar.`}`;
          if (args.format === "gltf") {
            const fp = safeJoin(dir0, `${p.meta.id}.glb`);
            const glb = modelToGlb(p);
            writeFileSync(fp, glb);
            return text(`✅ glTF (GLB) ${Math.round(glb.length / 1024)}KB → ${fp}
En metros reales, un nodo por entidad según su id. Render fotorrealista: blender -b -P scripts/render-photoreal.py -- "${fp}" out.png
${vNote}`);
          }
          const fp = safeJoin(dir0, `${p.meta.id}.ifc`);
          const ifc = modelToIfc(p);
          writeFileSync(fp, ifc, "utf8");
          return text(`✅ IFC4 de anteproyecto → ${fp}
Muros + vanos (voids/fills), losas con perforaciones, escalera, IfcSpace por recinto. Se abre en un visor BIM / Bonsai (BlenderBIM); NO reemplaza un proyecto de construcción.
${vNote}`);
        }
        store.refreshDonGia();
        const set = buildSheetSet(p, {
          date: new Date().toLocaleDateString("vi-VN"),
          ...(args.sheets?.length ? { sheets: args.sheets } : {}),
        });
        if (set.sheets.length === 0) {
          const known = ["plan-<levelId>", "elevation", "section", "schedule", "estimate"].join(" | ");
          return fail(new Error(`Ninguna lámina coincide con el filtro. IDs válidos: ${known}.`));
        }
        const dir = path.join(store.exportDir, "expediente");
        mkdirSync(dir, { recursive: true });
        const lines: string[] = [];
        if (args.format === "pdf") {
          const file = safeJoin(dir, `${p.meta.id}-expediente.pdf`);
          const { svgsToPdf } = await import("./render/pdf.js");
          await svgsToPdf(set.sheets.map((s) => sheetSvg(s)), file);
          lines.push(`✅ PDF de ${set.sheets.length} páginas → ${file}`);
        } else if (args.format === "svg") {
          for (const s of set.sheets) {
            const fp = safeJoin(dir, `${s.fileBase}.svg`);
            writeFileSync(fp, sheetSvg(s), "utf8");
            lines.push(`  ${s.no} ${s.title} → ${fp}`);
          }
          lines.unshift(`✅ Láminas SVG (${set.sheets.length}):`);
        } else {
          const withModel = set.sheets.filter((s) => s.hasModel);
          for (const s of withModel) {
            const fp = safeJoin(dir, `${s.fileBase}.dxf`);
            writeFileSync(fp, sheetDxf(s), "utf8");
            lines.push(`  ${s.no} ${s.title} → ${fp}`);
          }
          lines.unshift(`✅ Láminas DXF (${withModel.length}; mm reales, capas en español):`);
        }
        lines.push(`Juego de láminas: ${set.sheets.map((s) => `${s.no} ${s.title}`).join("; ")}.`);
        for (const sk of set.skipped) lines.push(`⚠ Lámina omitida ${sk.id}: ${sk.reason}`);
        const issues = validateProject(p);
        lines.push(`Validador: ${issues.length === 0 ? "limpio." : `${issues.length} observaciones — ejecuta validate antes de entregar.`}`);
        return text(lines.join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "underlay_import",
    {
      title: "Importar un plano antiguo / foto de planta como calco",
      description:
        "Pone un DXF (CAD antiguo) o una imagen PNG/JPEG (foto o escaneo de una planta) como capa TENUE bajo la planta para levantar el modelo encima; ideal para levantar propiedades existentes. El calco es un andamio: NO sale en los planos exportados. Escala: el DXF suele deducirla de $INSUNITS; si no (y siempre con imágenes), pide al usuario UNA medida real conocida y pasa calibrate {a,b,mm}, con a/b en unidades de origen (unidad DXF / píxel; solo importa la DISTANCIA, así que sirve cualquier sistema de ejes). Después: render_plan para revisar la posición y ajustarla con apply_ops update underlay U1 (origin/rotation/scale/opacity/level; el origen de la imagen es su esquina inferior izquierda); con DXF, underlay_trace detecta muros. Borrar: apply_ops delete underlay U1.",
      inputSchema: {
        path: z.string().describe("Ruta del archivo .dxf/.png/.jpg DENTRO de la carpeta del proyecto (absoluta o relativa), máx. 20 MB"),
        scale: z.number().positive().optional().describe("mm del modelo por UNA unidad de origen (unidad DXF / píxel). Vacío = calibrate o $INSUNITS"),
        calibrate: z
          .object({
            a: z.tuple([z.number(), z.number()]),
            b: z.tuple([z.number(), z.number()]),
            mm: z.number().positive(),
          })
          .optional()
          .describe("Dos puntos en unidades de ORIGEN + la distancia real en mm entre ellos: calcula la escala"),
        origin: z.tuple([z.number(), z.number()]).optional().describe("Punto del modelo (mm) donde se ubica el origen (0,0) del calco; por defecto [0,0]"),
        rotation: z.number().optional().describe("Grados antihorario alrededor de origin"),
        opacity: z.number().min(0.05).max(1).optional().describe("Opacidad 0..1, por defecto 0.35"),
        level: z.string().optional().describe("Mostrar solo en este piso (p. ej. L1); vacío = todos"),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const src = safeJoin(store.baseDir, args.path); // M1: solo archivos dentro de la carpeta del proyecto
        if (!existsSync(src)) return fail(new Error(`No se encuentra el archivo: ${src}`));
        if (statSync(src).size > UNDERLAY_MAX_BYTES) return fail(new Error("El archivo supera 20 MB."));
        const ext = path.extname(src).toLowerCase();
        const kind = ext === ".dxf" ? "dxf" : [".png", ".jpg", ".jpeg"].includes(ext) ? "image" : null;
        if (!kind) return fail(new Error(`Solo se aceptan .dxf / .png / .jpg (recibido "${ext}"). Un PDF hay que convertirlo antes a imagen.`));

        const info: string[] = [];
        let autoScale: number | null = null;
        if (kind === "dxf") {
          const d = parseDxf(readFileSync(src, "utf8"));
          if (d.polylines.length === 0) {
            return fail(new Error("El DXF no tiene líneas legibles (LINE/LWPOLYLINE/POLYLINE/CIRCLE/ARC). Si es todo bloques/INSERT, hay que descomponerlo (explode) antes."));
          }
          autoScale = d.mmPerUnit;
          const nSkip = Object.entries(d.skipped).map(([k, v]) => `${k}×${v}`).join(", ");
          info.push(`Líneas leídas: ${Object.entries(d.counts).map(([k, v]) => `${k}×${v}`).join(", ")}${nSkip ? ` (omitidas: ${nSkip})` : ""}`);
          if (d.bounds) info.push(`Extensión del origen: ${Math.round(d.bounds.maxX - d.bounds.minX)}×${Math.round(d.bounds.maxY - d.bounds.minY)} unidades`);
        } else {
          const im = imageSize(readFileSync(src));
          info.push(`Imagen ${im.width}×${im.height}px`);
        }

        let scale = args.scale ?? null;
        let scaleFrom = "indicada";
        if (!scale && args.calibrate) {
          const { a, b, mm } = args.calibrate;
          const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
          if (d < 1e-6) return fail(new Error("calibrate: los puntos a y b coinciden."));
          scale = mm / d;
          scaleFrom = `calibrate (${Math.round(d)} unidades = ${args.calibrate.mm}mm)`;
        }
        if (!scale && autoScale) {
          scale = autoScale;
          scaleFrom = "$INSUNITS del DXF";
        }
        if (!scale) {
          return fail(new Error(
            kind === "dxf"
              ? "El DXF no declara $INSUNITS: pide al usuario una medida real conocida y pasa calibrate {a,b,mm}, o la escala directamente."
              : "Una imagen siempre necesita escala: pide al usuario una medida real conocida en la imagen (medida en píxeles) y pasa calibrate {a,b,mm}, o scale = mm/píxel.",
          ));
        }

        const dir = underlayDir(store.baseDir);
        mkdirSync(dir, { recursive: true });
        const source = path.basename(src);
        const dst = path.join(dir, source);
        if (path.resolve(dst) !== path.resolve(src)) writeFileSync(dst, readFileSync(src));

        const data = {
          id: "U1",
          kind,
          source,
          origin: args.origin ?? [0, 0],
          scale,
          ...(args.rotation ? { rotation: args.rotation } : {}),
          ...(args.opacity ? { opacity: args.opacity } : {}),
          ...(args.level ? { level: args.level } : {}),
        };
        const op: Op = p.underlay
          ? { op: "update", entity: "underlay", id: "U1", data }
          : { op: "add", entity: "underlay", data };
        const r = store.apply(p.meta.revision, [op], `import underlay ${source}`);
        if (!r.ok) return fail(new Error(r.errors.map((e) => e.message).join("; ")));

        return text([
          `✅ Calco ${kind} "${source}" (revisión ${r.revision}) — escala ${scale.toFixed(4)} mm/unidad (${scaleFrom}).`,
          ...info,
          `Se ve TENUE bajo la planta (editor + render_plan; NO sale en los planos exportados). Revisa con render_plan y ajusta la ubicación: apply_ops update underlay U1 (origin/rotation/scale/opacity/level).`,
          ...(kind === "dxf" ? ["Detectar muros desde las líneas del DXF: underlay_trace."] : []),
        ].join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "underlay_trace",
    {
      title: "Detectar muros desde el calco DXF (propuesta, no se aplica sola)",
      description:
        "Heurística sobre las líneas DXF del calco: dos líneas paralelas a los ejes, separadas por un espesor de muro razonable y con traslape suficiente → candidato a muro en su eje. Devuelve una lista de ops PROPUESTAS (no se aplican): revísalas con render_plan (el calco se ve debajo), descarta las falsas (muebles dibujados con doble línea, deslindes…) y aplica tú con apply_ops las que queden. v1 solo detecta líneas rectas en x/y; las imágenes raster no se detectan: se calcan a mano.",
      inputSchema: {
        level: z.string().describe("Piso que recibe los muros propuestos, p. ej. L1"),
        minOverlap: z.number().positive().optional().describe("Traslape mínimo en mm (por defecto 600; súbelo si sale mucha basura)"),
        thickness: z.tuple([z.number(), z.number()]).optional().describe("Rango de espesor aceptado [min,max] en mm; por defecto [80,400]"),
      },
    },
    (args) => {
      try {
        const p = store.current;
        const u = p.underlay;
        if (!u) return fail(new Error("Aún no hay calco: usa underlay_import antes."));
        if (u.kind !== "dxf") return fail(new Error("El calco actual es una imagen: la detección de muros solo funciona con DXF; la imagen se calca a mano."));
        if (!p.levels.some((l) => l.id === args.level)) {
          return fail(new Error(`No existe el piso "${args.level}". Pisos: ${p.levels.map((l) => l.id).join(", ")}.`));
        }
        const cands = detectWalls(placedPolylines(u, store.baseDir), {
          ...(args.minOverlap ? { minOverlap: args.minOverlap } : {}),
          ...(args.thickness ? { thickness: args.thickness } : {}),
        });
        if (cands.length === 0) {
          return text("No se detectó ningún par de líneas paralelas con forma de muro: prueba bajar minOverlap, ampliar thickness o revisar la escala del calco (el espesor de muro ya escalado debe quedar entre 80 y 400 mm).");
        }
        const MAX = 40;
        const kept = cands.slice(0, MAX);
        let n = 100; // W101…: no chocar con IDs del modelo ni entre sí dentro del lote
        const usedIds = new Set([...p.walls.map((w) => w.id)]);
        const ops = kept.map((c) => {
          do n++; while (usedIds.has(`W${n}`));
          usedIds.add(`W${n}`);
          return {
            op: "add" as const,
            entity: "wall" as const,
            data: { id: `W${n}`, level: args.level, from: c.from, to: c.to, thickness: c.thickness, kind: "gach" },
          };
        });
        return text([
          `Se detectaron ${cands.length} candidatos a muro${cands.length > MAX ? ` (se devuelven los ${MAX} más largos; para el resto, vuelve a correr con un minOverlap mayor)` : ""}. PROPUESTA, sin aplicar:`,
          JSON.stringify(ops, null, 2),
          `Revisa antes de aplicar: render_plan (las líneas azules tenues del calco quedan debajo), descarta las ops falsas (muebles de doble línea, deslindes…), ajusta from/to si hace falta alinear con los ejes y luego apply_ops con baseRevision ${p.meta.revision}.`,
        ].join("\n"));
      } catch (e) {
        return fail(e);
      }
    },
  );

  return server;
}

function entityIdsOfLevel(p: Project, levelId: string): Set<string> {
  const ids = new Set<string>([levelId]);
  for (const list of [p.walls, p.rooms, p.slabs, p.roofs ?? [], p.stairs, p.furniture]) {
    for (const e of list) if ((e as { level?: string }).level === levelId) ids.add(e.id);
  }
  for (const o of p.openings) {
    const w = p.walls.find((x) => x.id === o.wall);
    if (w?.level === levelId) ids.add(o.id);
  }
  return ids;
}

function queryModel(
  p: Project,
  select: { entity?: string; ids?: string[]; level?: string },
  computed: boolean,
): unknown {
  const idSet = select.ids ? new Set(select.ids) : null;
  const keepId = (e: { id: string }): boolean => !idSet || idSet.has(e.id);
  const keepLevel = (e: { level?: string }): boolean => !select.level || e.level === select.level;

  const slices: Record<string, unknown> = {
    meta: p.meta,
    brief: p.brief,
    site: p.site,
    axes: p.axes,
    levels: p.levels.filter(keepId),
    walls: p.walls.filter((e) => keepId(e) && keepLevel(e)),
    openings: p.openings.filter((o) => {
      if (!keepId(o)) return false;
      if (!select.level) return true;
      return p.walls.find((w) => w.id === o.wall)?.level === select.level;
    }),
    slabs: p.slabs.filter((e) => keepId(e) && keepLevel(e)),
    roofs: (p.roofs ?? []).filter((e) => keepId(e) && keepLevel(e)),
    stairs: p.stairs.filter((e) => keepId(e) && keepLevel(e)),
    rooms: p.rooms.filter((e) => keepId(e) && keepLevel(e)),
    furniture: p.furniture.filter((e) => keepId(e) && keepLevel(e)),
    styles: p.styles,
    finishes: p.finishes,
    underlay: p.underlay ?? "(sin calco: usa underlay_import)",
  };

  const base: Record<string, unknown> = select.entity
    ? { [select.entity]: slices[select.entity] ?? `(no existe la sección "${select.entity}")` }
    : { meta: p.meta, revision: p.meta.revision, ...slices };

  if (computed) {
    base.computed = {
      rooms: (slices.rooms as Project["rooms"]).map((r) => ({
        id: r.id, name: r.name, use: r.use, level: r.level, dien_tich_m2: areaM2(r.polygon),
      })),
      stairs: (slices.stairs as Project["stairs"]).map((st) => {
        const level = getLevel(p, st.level);
        return { id: st.id, riser_mm: level ? Math.round(stairLayout(st, level).riser * 10) / 10 : null };
      }),
      revision: p.meta.revision,
    };
  }
  return base;
}
