import type { Point } from "@arquitecto/core";
import { LAYERS, type Prim, type Scene2D } from "./scene.js";

/**
 * Scene2D → DXF R12 (AC1009), TS puro (ADR-08).
 * - Misma scene graph que el SVG: los dos formatos nunca se desfasan (doc 08).
 * - Solo model space (mm reales, y hacia arriba): la viñeta pertenece a la lámina impresa.
 * - R12 es el DXF más compatible (AutoCAD, BricsCAD, LibreCAD, QCAD): sin handles,
 *   sin subclases, solo LINE / POLYLINE / CIRCLE / ARC / TEXT. Un DXF AC1021 "mínimo"
 *   lo rechaza AutoCAD (exige BLOCK_RECORD, OBJECTS…), por eso no se usa.
 * - Cotas REALES: cada primitiva `dim` sale como DIMENSION + bloque anónimo *Dn con su
 *   dibujo (estilo ESTANDAR-PLANO: cm sin decimales, flecha cerrada, texto amarillo);
 *   las líneas/textos sueltos de la capa COTAS no se exportan para no duplicar.
 * - Sin rellenos (HATCH no existe en R12): los polígonos rellenos quedan como contorno.
 * - Texto no ASCII escapado como \U+XXXX: archivo 100 % ASCII, independiente del code page.
 */

const LAYER_COLOR: Record<string, number> = {
  EJES: 8, // gris
  "MUROS-CORTE": 7,
  "MUROS-VISTA": 7,
  VANOS: 7,
  ESCALERAS: 7,
  TECHUMBRE: 7,
  MOBILIARIO: 8,
  COTAS: 8,
  TEXTOS: 7,
  ACHURADOS: 8,
  VINETA: 7,
};

/** Segmentos con que se aproxima una elipse (R12 no tiene ELLIPSE). */
const ELLIPSE_SEGMENTS = 48;

/** Estilo de cota del estándar del usuario (ver sandbox/0Standar-acotar/entregables/ESTANDAR-PLANO.md). */
const DIM_STYLE = "ESTANDAR-PLANO";
/** Tamaños en mm de PAPEL (× DIMSCALE = escala de la lámina); lfac 0.1: modelo en mm → cota en cm. */
const EP = { txt: 2.0, asz: 1.5, exe: 1.25, exo: 1.0, gap: 0.8, dli: 7.0, lfac: 0.1, clrt: 2 } as const;

export type DxfOptions = {
  /** Escala de la lámina (50 = 1:50): convierte tamaños de texto mm papel → mm modelo. */
  scale: number;
};

type G = (code: number, value: string | number) => void;

export function sceneToDxf(items: Scene2D, opts: DxfOptions): string {
  const S = opts.scale;
  const body: string[] = [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const g: G = (code, value) => {
    body.push(String(code), typeof value === "number" ? fmt(value) : value);
  };
  const pt = (x: number, y: number, cx = 10): void => {
    g(cx, x);
    g(cx + 10, y);
    g(cx + 20, 0);
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  };
  const used = new Set<string>();
  const blocks: string[] = [];
  const bg: G = (code, value) => {
    blocks.push(String(code), typeof value === "number" ? fmt(value) : value);
  };
  let nDim = 0;
  for (const item of items) {
    if (item.space === "paper") continue; // la viñeta es de la lámina impresa, no del modelo CAD
    if (item.prim.kind === "dim") {
      // cota real: bloque anónimo *Dn con su dibujo + entidad DIMENSION que lo referencia
      const name = `*D${++nDim}`;
      writeDimBlock(item.prim, name, S, bg);
      writeDimension(item.prim, item.layer, name, g, pt);
      used.add(item.layer);
      continue;
    }
    if (item.layer === "COTAS") continue; // líneas/remates/textos de cota: los reemplazan las DIMENSION
    used.add(item.layer);
    writePrim(item.prim, item.layer, S, g, pt);
  }
  // solo capas con contenido (+ "0", obligatoria): sin capas vacías como CALCO en el CAD
  const layers = ["0", ...LAYERS.filter((l) => used.has(l))];
  if (!Number.isFinite(minX)) minX = minY = maxX = maxY = 0;

  const out: string[] = [];
  const h: G = (code, value) => {
    out.push(String(code), typeof value === "number" ? fmt(value) : value);
  };
  // ── HEADER ────────────────────────────────────────────────
  h(0, "SECTION"); h(2, "HEADER");
  h(9, "$ACADVER"); h(1, "AC1009");
  h(9, "$DWGCODEPAGE"); h(3, "ANSI_1252");
  h(9, "$INSBASE"); h(10, 0); h(20, 0); h(30, 0);
  h(9, "$EXTMIN"); h(10, minX); h(20, minY); h(30, 0);
  h(9, "$EXTMAX"); h(10, maxX); h(20, maxY); h(30, 0);
  // unidades decimales sin decimales: con DIMLFAC 0.1 las cotas se leen en cm enteros
  h(9, "$LUNITS"); h(70, 2);
  h(9, "$LUPREC"); h(70, 0);
  // variables de cota actuales = estilo ESTANDAR-PLANO (cotas nuevas que dibujes en AutoCAD)
  h(9, "$DIMSTYLE"); h(2, DIM_STYLE);
  h(9, "$DIMSCALE"); h(40, S);
  h(9, "$DIMLFAC"); h(40, EP.lfac);
  h(9, "$DIMTXT"); h(40, EP.txt);
  h(9, "$DIMASZ"); h(40, EP.asz);
  h(9, "$DIMEXE"); h(40, EP.exe);
  h(9, "$DIMEXO"); h(40, EP.exo);
  h(9, "$DIMGAP"); h(40, EP.gap);
  h(9, "$DIMDLI"); h(40, EP.dli);
  h(9, "$DIMTAD"); h(70, 1);
  h(9, "$DIMTIH"); h(70, 0);
  h(9, "$DIMTOH"); h(70, 0);
  h(9, "$DIMCLRT"); h(70, EP.clrt);
  h(0, "ENDSEC");
  // ── TABLES: LTYPE + LAYER + STYLE ─────────────────────────
  h(0, "SECTION"); h(2, "TABLES");
  h(0, "TABLE"); h(2, "LTYPE"); h(70, 1);
  h(0, "LTYPE"); h(2, "CONTINUOUS"); h(70, 0); h(3, "Solid line"); h(72, 65); h(73, 0); h(40, 0);
  h(0, "ENDTAB");
  h(0, "TABLE"); h(2, "LAYER"); h(70, layers.length);
  for (const name of layers) {
    h(0, "LAYER"); h(2, name); h(70, 0); h(62, LAYER_COLOR[name] ?? 7); h(6, "CONTINUOUS");
  }
  h(0, "ENDTAB");
  h(0, "TABLE"); h(2, "STYLE"); h(70, 1);
  h(0, "STYLE"); h(2, "STANDARD"); h(70, 0); h(40, 0); h(41, 1); h(50, 0); h(71, 0); h(42, 2.5); h(3, "txt"); h(4, "");
  h(0, "ENDTAB");
  h(0, "TABLE"); h(2, "DIMSTYLE"); h(70, 2);
  writeDimStyle("STANDARD", S, h);
  writeDimStyle(DIM_STYLE, S, h);
  h(0, "ENDTAB");
  h(0, "ENDSEC");
  // ── BLOCKS: dibujo de cada cota (*Dn) ─────────────────────
  h(0, "SECTION"); h(2, "BLOCKS");
  out.push(...blocks);
  h(0, "ENDSEC");
  // ── ENTITIES ──────────────────────────────────────────────
  h(0, "SECTION"); h(2, "ENTITIES");
  out.push(...body);
  h(0, "ENDSEC");
  h(0, "EOF");
  return out.join("\n") + "\n";
}

function writePrim(prim: Prim, layer: string, S: number, g: G, pt: (x: number, y: number, cx?: number) => void): void {
  const entity = (type: string): void => {
    g(0, type);
    g(8, layer);
  };
  const polyline = (pts: Point[], closed: boolean): void => {
    entity("POLYLINE");
    g(66, 1);
    g(10, 0); g(20, 0); g(30, 0);
    g(70, closed ? 1 : 0);
    for (const [x, y] of pts) {
      entity("VERTEX");
      pt(x, y);
    }
    entity("SEQEND");
  };
  switch (prim.kind) {
    case "line":
      entity("LINE");
      pt(prim.a[0], prim.a[1]);
      pt(prim.b[0], prim.b[1], 11);
      return;
    case "polyline":
    case "polygon":
      // relleno (poché) omitido a propósito: en CAD solo contorno
      polyline(prim.pts, prim.kind === "polygon" || prim.close === true);
      return;
    case "circle":
      entity("CIRCLE");
      pt(prim.c[0], prim.c[1]);
      g(40, prim.rPaper ? prim.r * S : prim.r);
      return;
    case "arc":
      entity("ARC");
      pt(prim.c[0], prim.c[1]);
      g(40, prim.r);
      g(50, Math.min(prim.a0, prim.a1));
      g(51, Math.max(prim.a0, prim.a1));
      return;
    case "ellipse": {
      const rad = (prim.rot * Math.PI) / 180;
      const pts: Point[] = [];
      for (let i = 0; i < ELLIPSE_SEGMENTS; i++) {
        const t = (2 * Math.PI * i) / ELLIPSE_SEGMENTS;
        const ex = prim.rx * Math.cos(t), ey = prim.ry * Math.sin(t);
        pts.push([prim.c[0] + ex * Math.cos(rad) - ey * Math.sin(rad), prim.c[1] + ex * Math.sin(rad) + ey * Math.cos(rad)]);
      }
      polyline(pts, true);
      return;
    }
    case "text": {
      let rot = 0;
      if (prim.along) {
        rot = (Math.atan2(prim.along.to[1] - prim.along.from[1], prim.along.to[0] - prim.along.from[0]) * 180) / Math.PI;
        if (rot > 90 || rot <= -90) rot += 180; // texto nunca de cabeza, igual que svg-writer
      }
      const hAlign = prim.anchor === "middle" ? 1 : prim.anchor === "end" ? 2 : 0;
      entity("TEXT");
      pt(prim.at[0], prim.at[1]);
      g(40, prim.size * S); // mm papel → mm modelo
      g(1, asciiText(prim.text));
      if (rot !== 0) g(50, rot);
      g(72, hAlign);
      g(73, 2); // middle, igual que dominant-baseline del SVG
      pt(prim.at[0], prim.at[1], 11);
      return;
    }
    default:
      return;
  }
}

type DimPrim = Extract<Prim, { kind: "dim" }>;

/** Entrada DIMSTYLE R12 con los valores de ESTANDAR-PLANO (STANDARD lleva los mismos). */
function writeDimStyle(name: string, S: number, h: G): void {
  h(0, "DIMSTYLE"); h(2, name); h(70, 0);
  h(3, ""); h(4, ""); h(5, ""); h(6, ""); h(7, "");
  h(40, S); h(41, EP.asz); h(42, EP.exo); h(43, EP.dli); h(44, EP.exe);
  h(45, 0); h(46, 0); h(47, 0); h(48, 0);
  h(140, EP.txt); h(141, 0); h(142, 0); h(143, 25.4); h(144, EP.lfac); h(145, 0); h(146, 1); h(147, EP.gap);
  h(71, 0); h(72, 0); h(73, 0); h(74, 0); h(75, 0); h(76, 0); h(77, 1); h(78, 8);
  h(170, 0); h(171, 2); h(172, 1); h(173, 0); h(174, 0); h(175, 0);
  h(176, 256); h(177, 256); h(178, EP.clrt);
}

/** Proyecta un punto medido sobre la línea de cota (misma coordenada perpendicular que `line`). */
function onDimLine(p: Point, d: DimPrim): Point {
  return d.rot === 0 ? [p[0], d.line[1]] : [d.line[0], p[1]];
}

/**
 * Bloque anónimo *Dn con el dibujo de la cota según ESTANDAR-PLANO: líneas de extensión
 * (separadas EXO del objeto, sobresalen EXE), línea de cota, flechas cerradas rellenas (SOLID)
 * y texto en cm. Entidades en capa 0 con color PorBloque: heredan la capa de la DIMENSION.
 */
function writeDimBlock(d: DimPrim, name: string, S: number, g: G): void {
  const k = d.rot === 0 ? 1 : 0; // eje perpendicular a la medida
  const P = (p: Point): void => { g(10, p[0]); g(20, p[1]); g(30, 0); };
  const line = (a: Point, b: Point): void => {
    g(0, "LINE"); g(8, "0"); g(62, 0); P(a); g(11, b[0]); g(21, b[1]); g(31, 0);
  };
  g(0, "BLOCK"); g(8, "0"); g(2, name); g(70, 1); g(10, 0); g(20, 0); g(30, 0); g(3, name);
  const pA = onDimLine(d.a, d), pB = onDimLine(d.b, d);
  // líneas de extensión
  for (const [p, q] of [[d.a, pA], [d.b, pB]] as Array<[Point, Point]>) {
    const delta = q[k] - p[k];
    if (Math.abs(delta) < 1e-6) continue;
    const s = Math.sign(delta);
    const from: Point = [...p] as Point;
    const to: Point = [...q] as Point;
    from[k] += s * EP.exo * S;
    to[k] += s * EP.exe * S;
    line(from, to);
  }
  // línea de cota y flechas: adentro si caben, si no afuera con una cola corta
  const u: Point = d.rot === 0 ? [1, 0] : [0, 1];
  const L = d.rot === 0 ? pB[0] - pA[0] : pB[1] - pA[1];
  const dir = Math.sign(L) || 1;
  const asz = EP.asz * S;
  const inside = Math.abs(L) >= 2.5 * asz;
  line(pA, pB);
  const arrow = (tip: Point, toward: number): void => {
    // toward = sentido (±1 sobre u) en que queda el cuerpo de la flecha
    const base: Point = [tip[0] + u[0] * toward * asz, tip[1] + u[1] * toward * asz];
    const w = asz / 6;
    const n: Point = [-u[1] * w, u[0] * w];
    g(0, "SOLID"); g(8, "0"); g(62, 0);
    g(10, tip[0]); g(20, tip[1]); g(30, 0);
    g(11, base[0] + n[0]); g(21, base[1] + n[1]); g(31, 0);
    g(12, base[0] - n[0]); g(22, base[1] - n[1]); g(32, 0);
    g(13, base[0] - n[0]); g(23, base[1] - n[1]); g(33, 0);
    if (!inside) line(base, [tip[0] + u[0] * toward * asz * 2, tip[1] + u[1] * toward * asz * 2]);
  };
  arrow(pA, inside ? dir : -dir);
  arrow(pB, inside ? -dir : dir);
  // texto (cm), en la misma posición que en el PDF
  g(0, "TEXT"); g(8, "0"); g(62, EP.clrt);
  P(d.textAt);
  g(40, EP.txt * S);
  g(1, asciiText(d.text));
  if (d.rot !== 0) g(50, d.rot);
  g(72, 1); g(73, 2);
  g(11, d.textAt[0]); g(21, d.textAt[1]); g(31, 0);
  g(0, "ENDBLK"); g(8, "0");
}

/** Entidad DIMENSION lineal (girada 0°/90°) que referencia su bloque *Dn; valor medido por AutoCAD. */
function writeDimension(d: DimPrim, layer: string, name: string, g: G, pt: (x: number, y: number, cx?: number) => void): void {
  g(0, "DIMENSION"); g(8, layer);
  g(2, name);
  g(3, DIM_STYLE);
  const pB = onDimLine(d.b, d);
  pt(pB[0], pB[1]); // 10: punto de la línea de cota
  pt(d.textAt[0], d.textAt[1], 11); // 11: centro del texto
  g(70, 128); // lineal girada + texto en posición definida por el usuario (como en el PDF)
  g(1, ""); // "" = valor medido (× DIMLFAC → cm)
  pt(d.a[0], d.a[1], 13); // 13: primer punto medido
  pt(d.b[0], d.b[1], 14); // 14: segundo punto medido
  g(50, d.rot);
}

/** Escapa todo carácter fuera de ASCII imprimible como \U+XXXX (lo entienden AutoCAD y LibreCAD). */
function asciiText(s: string): string {
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    out += cp >= 32 && cp < 127 ? ch : `\\U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
  }
  return out;
}

function fmt(v: number): string {
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 1000) / 1000);
}
