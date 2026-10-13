import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadCasaPrueba2p, setDonGia } from "@arquitecto/core";
import { buildElevationsScene } from "./elevations.js";
import { buildSectionsScene, cutIntervals } from "./section-scene.js";
import { buildScheduleScene } from "./schedule-scene.js";
import { buildPlanScene, sectionCuts } from "./plan-scene.js";
import { sceneToDxf, shortArc } from "./dxf-writer.js";
import { CUT_COLOR } from "./scene.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./sheets.js";
import { renderElevationSvg, renderScheduleSvg, renderSectionSvg } from "./render.js";

const p = loadCasaPrueba2p();

describe("P4 — elevaciones", () => {
  it("4 caras: vanos de fachada de los 2 pisos, niveles por piso, sin girar", () => {
    const b = buildElevationsScene(p);
    const ids = new Set(b.items.map((i) => i.dataId).filter(Boolean));
    expect(ids.has("D1")).toBe(true);
    expect(ids.has("S1")).toBe(true);
    expect(ids.has("S3")).toBe(true); // ventana del piso 2 en la fachada
    expect(ids.has("D2")).toBe(false); // puerta interior: no se ve desde afuera
    const texts = b.items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts).toContain("±0.00 N.P.T.");
    expect(texts).toContain("+3.60");
    expect(texts).toContain("+7.00");
    expect(texts.filter((t) => t.startsWith("ELEVACIÓN "))).toHaveLength(4);
    expect(b.tf.rotated).toBe(false); // el eje vertical es la gravedad: nunca se gira
  });

  it("sin el muro de fachada la elevación muestra lo que queda detrás (no falla)", () => {
    const empty = structuredClone(p);
    empty.walls = empty.walls.filter((w) => w.id !== "W1" && w.id !== "W9");
    expect(() => buildElevationsScene(empty)).not.toThrow();
  });

  it("golden SVG de las elevaciones", async () => {
    const svg = renderElevationSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/mat-dung.svg");
  });
});

describe("P4 — mặt cắt A-A", () => {
  it("cutIntervals: chữ nhật và trừ lỗ", () => {
    const rect: Array<[number, number]> = [[0, 0], [4000, 0], [4000, 16000], [0, 16000]];
    expect(cutIntervals(rect, 2000)).toEqual([[0, 16000]]);
    expect(cutIntervals(rect, 5000)).toEqual([]);
  });

  it("vết cắt xuyên tâm vế 1 thang; sàn L2 hở đúng lỗ thang; có profile bậc", () => {
    // casa de 4×16 m sin techumbre: A-A' transversal (y = cte); B-B' longitudinal pasa por la escalera
    const [a, bb] = sectionCuts(p);
    expect(a!.axis).toBe("y");
    expect(bb!.axis).toBe("x");
    const cutX = bb!.at;
    expect(cutX).toBeGreaterThan(2830); // vế 1 của ST1 nằm x∈[2830,3780]
    expect(cutX).toBeLessThan(3780);

    const b = buildSectionsScene(p);
    const stairItems = b.items.filter((i) => i.layer === "ESCALERAS");
    expect(stairItems.length).toBeGreaterThan(2); // 2 vế + bản thang

    // sàn L2 bị lỗ thang: phải có >= 2 dải sàn tại z quanh 3600
    const bands = b.items.filter(
      (i) => i.prim.kind === "polygon" && i.dataId === "SL2",
    );
    expect(bands.length).toBeGreaterThanOrEqual(2);
    // tường mặt tiền W1 cắt qua cửa D1 → 1 mảnh lanh tô (không kín từ 0)
    const w1 = b.items.filter((i) => i.dataId === "W1" && i.prim.kind === "polygon");
    expect(w1.length).toBe(1);
    const zs = (w1[0]!.prim as { pts: Array<[number, number]> }).pts.map((pt) => pt[1]);
    expect(Math.max(...zs) - Math.min(...zs)).toBeLessThan(1300); // solo el dintel sobre la puerta de 2,36 m (piso de 3,60)
  });

  it("sin escalera igual hay corte: por la ventana que más detalle muestra, lejos de los rótulos", () => {
    const noStair = structuredClone(p);
    noStair.stairs = [];
    const x = sectionCuts(noStair).find((c) => c.axis === "x")!.at;
    expect(x).not.toBeNull();
    // cruza al menos un vano y no cae sobre el eje de un muro paralelo al corte
    const crossed = noStair.openings.filter((o) => {
      const w = noStair.walls.find((v) => v.id === o.wall)!;
      const [a, b] = [w.from[0] + ((w.to[0] - w.from[0]) * o.offset) / Math.hypot(w.to[0] - w.from[0], w.to[1] - w.from[1]),
        w.from[0] + ((w.to[0] - w.from[0]) * (o.offset + o.width)) / Math.hypot(w.to[0] - w.from[0], w.to[1] - w.from[1])];
      return x > Math.min(a, b) && x < Math.max(a, b);
    });
    expect(crossed.length).toBeGreaterThan(0);
    expect(buildSectionsScene(noStair).meta.title).toBe("CORTES A-A' Y B-B'");
    const titles = buildSectionsScene(noStair).items.filter((i) => i.prim.kind === "text" && /^CORTE [AB]-[AB]'/.test(i.prim.text));
    expect(titles).toHaveLength(2);
    // las marcas A-A' y B-B' salen en todas las plantas
    for (const l of noStair.levels) {
      const texts = buildPlanScene(noStair, l.id).items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
      expect(texts).toContain("A'");
      expect(texts).toContain("B'");
    }
  });

  it("golden SVG mặt cắt", async () => {
    const svg = renderSectionSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/mat-cat-a-a.svg");
  });
});

describe("P4 — bảng thống kê", () => {
  it("đủ số phòng + tổng diện tích + gộp nhóm cửa", () => {
    const b = buildScheduleScene(p);
    const texts = b.items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts.filter((t) => /^R\d+$/.test(t)).length).toBe(p.rooms.length);
    expect(texts).toContain("SUPERFICIE TOTAL DE RECINTOS");
    expect(texts).toContain("D2, D5"); // hai cửa WC cùng kích thước gộp một nhóm
    expect(texts).toContain(String(p.openings.length)); // tổng SL cửa
    // mọi item đều paper-space
    expect(b.items.every((i) => i.space === "paper")).toBe(true);
  });

  it("golden SVG thống kê", async () => {
    const svg = renderScheduleSvg(p, { embedFont: false, date: "13/07/2026" }).svg;
    await expect(svg).toMatchFileSnapshot("__snapshots__/thong-ke.svg");
  });
});

describe("P4 — DXF writer (ADR-08: TS thuần)", () => {
  const build = buildPlanScene(p, "L1");
  const dxf = sceneToDxf(build.items, { scale: build.tf.scale });

  it("DXF R12 válido para AutoCAD: AC1009, secciones y tablas obligatorias, EOF", () => {
    expect(dxf.startsWith("0\nSECTION\n2\nHEADER")).toBe(true);
    expect(dxf).toContain("$ACADVER\n1\nAC1009\n");
    expect(dxf).toContain("$EXTMIN");
    for (const t of ["LTYPE", "LAYER", "STYLE"]) expect(dxf, t).toContain(`0\nTABLE\n2\n${t}\n`);
    expect(dxf).toContain("0\nLAYER\n2\nMUROS-CORTE\n");
    expect(dxf).not.toContain("\nCALCO\n"); // solo capas con contenido: sin rastro del calco
    expect(dxf).toContain("0\nSECTION\n2\nENTITIES\n");
    expect(dxf.trimEnd().endsWith("0\nEOF")).toBe(true);
    // nada que R12 no conozca (AutoCAD rechazaba el AC1021 incompleto)
    for (const t of ["LWPOLYLINE", "HATCH", "ELLIPSE", "AcDb"]) expect(dxf, t).not.toContain(`\n${t}\n`);
  });

  it("map 1-1 số lượng primitive model-space (doc 08: không bao giờ lệch SVG)", () => {
    const modelItems = build.items.filter((i) => i.space !== "paper");
    // las primitivas sueltas de la capa COTAS se reemplazan por DIMENSION reales
    // y la hoja + arco de cada puerta abatible, por un INSERT del bloque PUERTA-<r>
    const doorIds = new Set(modelItems.filter((i) => i.prim.kind === "door").map((i) => i.dataId));
    const doors = modelItems.filter((i) => i.prim.kind === "door").length; // una puerta doble = 2 hojas
    const drawn = modelItems.filter((i) => i.layer !== "COTAS" && !(i.layer === "VANOS" && doorIds.has(i.dataId) && (i.prim.kind === "line" || i.prim.kind === "arc")));
    // la marca de corte (magenta) sale como POLYLINE con ancho, no como LINE
    const cut = drawn.filter((i) => i.prim.kind === "line" && i.prim.color === CUT_COLOR).length;
    const count = (kind: string): number => drawn.filter((i) => i.prim.kind === kind).length;
    const dims = modelItems.filter((i) => i.prim.kind === "dim").length;
    const doorBlocks = new Set(modelItems.flatMap((i) => (i.prim.kind === "door" ? [i.prim.r] : []))).size;
    const entities = dxf.slice(dxf.indexOf("\n2\nENTITIES\n"));
    // cuenta inicios de entidad (0\nTIPO) en ENTITIES; "TEXT" aparece también dentro de nombres de capa
    const occurs = (needle: string, s = entities): number => s.split(`\n0\n${needle}\n`).length - 1;
    expect(dims).toBeGreaterThan(10);
    expect(occurs("DIMENSION")).toBe(dims);
    expect(doors).toBeGreaterThan(0);
    expect(occurs("INSERT")).toBe(doors);
    expect(occurs("LINE")).toBe(count("line") - cut);
    expect(occurs("POLYLINE")).toBe(count("polyline") + count("polygon") + count("ellipse") + cut);
    expect(occurs("SEQEND")).toBe(occurs("POLYLINE"));
    expect(occurs("TEXT")).toBe(count("text"));
    expect(occurs("ARC")).toBe(count("arc"));
    expect(occurs("CIRCLE")).toBe(count("circle"));
    // un bloque anónimo *Dn por cota, con dos flechas (SOLID) y un texto cada uno, más un PUERTA-<r> por ancho
    expect(occurs("BLOCK", dxf)).toBe(dims + doorBlocks);
    expect(occurs("SOLID", dxf)).toBe(2 * dims);
  });

  it("arco de puerta: siempre el arco corto (P2 de casa3 salía de −90° a 180° = 270°, «un círculo» en CAD)", () => {
    expect(shortArc(-90, 180)).toEqual([180, 270]);
    expect(shortArc(0, 90)).toEqual([0, 90]);
    expect(shortArc(90, 0)).toEqual([0, 90]);
    expect(shortArc(350, 80)).toEqual([350, 80]);
  });

  it("puertas abatibles: bloque de biblioteca PUERTA-<r> (hoja + arco de 90°) insertado en la capa PUERTAS", () => {
    const blk = dxf.slice(dxf.indexOf("\n0\nBLOCK\n8\n0\n2\nPUERTA-"));
    expect(blk).toMatch(/^\n0\nBLOCK\n8\n0\n2\nPUERTA-\d+\n/);
    const body = blk.slice(0, blk.indexOf("\n0\nENDBLK\n"));
    expect(body).toContain("\n0\nLINE\n");
    expect(body).toMatch(/\n50\n0\n51\n90$/); // arco de 90°, nunca 270°
    expect(dxf).toMatch(/\n0\nINSERT\n8\nPUERTAS\n2\nPUERTA-\d+\n/);
    expect(dxf).toContain("\n2\nPUERTAS\n70\n0\n");
  });

  it("ejes en capa EJES roja y segmentada (LTYPE DASHED + $LTSCALE); corte A-A' magenta", () => {
    expect(dxf).toContain("\n0\nLTYPE\n2\nDASHED\n");
    expect(dxf).toMatch(/\n0\nLAYER\n2\nEJES\n70\n0\n62\n1\n6\nDASHED\n/);
    expect(dxf).toContain("$LTSCALE");
  });

  it("cotas reales: DIMENSION con estilo ESTANDAR-PLANO, valor en cm (DIMLFAC 0.1, sin decimales)", () => {
    expect(dxf).toContain("0\nTABLE\n2\nDIMSTYLE\n");
    expect(dxf).toContain("0\nDIMSTYLE\n2\nESTANDAR-PLANO\n");
    expect(dxf).toContain("$DIMSTYLE\n2\nESTANDAR-PLANO\n");
    expect(dxf).toContain("$LUPREC\n70\n0\n");
    expect(dxf).toContain("\n144\n0.1\n"); // DIMLFAC: mm → cm
    // primera DIMENSION: referencia su bloque y el estilo; texto "" = valor medido
    const d = dxf.slice(dxf.indexOf("\n0\nDIMENSION\n"));
    expect(d).toMatch(/^\n0\nDIMENSION\n8\nCOTAS\n2\n\*D1\n3\nESTANDAR-PLANO\n/);
    // el bloque *D1 muestra el valor en cm: 16000 mm del total → "1600" existe en algún bloque
    expect(dxf).toContain("\n1\n1600\n");
    expect(dxf).not.toContain("\n1\n16000\n");
  });

  it("archivo 100 % ASCII: los acentos van como \\U+XXXX", () => {
    expect(/^[\x09\x0a\x0d\x20-\x7e]*$/.test(dxf)).toBe(true);
    expect(dxf).toContain("BA\\U+00D1O");
  });

  it("texto en español, cỡ chữ nhân tỷ lệ", () => {
    expect(dxf).toContain("LIVING");
    // tên phòng 3.5mm giấy × scale 50 = 175mm model
    expect(dxf).toContain(`\n40\n${3.5 * build.tf.scale}\n`);
    // paper-space (khung tên) không được lọt vào DXF
    expect(dxf).not.toContain("TỶ LỆ");
  });
});

/** Precios de prueba (UF/m²): la tabla chilena empaquetada viene «por completar» y sin precios se omite la lámina de presupuesto. */
const PRECIOS_TEST = {
  valor_clp: 40_000,
  don_gia_m2: { xay_tho: { label: "Obra gruesa", monto: 10 }, hoan_thien: { "trung-binh-kha": { label: "Terminaciones medias", monto: 5 } } },
};

describe("P4 — bộ tờ hồ sơ", () => {
  beforeEach(() => setDonGia(PRECIOS_TEST));
  afterEach(() => setDonGia(null));

  it("sin precios (tabla por completar) la lámina de presupuesto se omite y se informa", () => {
    setDonGia(null);
    const set = buildSheetSet(p);
    expect(set.sheets.some((s) => s.id === "estimate")).toBe(false);
    expect(set.skipped.find((s) => s.id === "estimate")?.reason).toMatch(/por completar/);
  });

  it("trọn bộ: ARQ-01..ARQ-06 đúng thứ tự pha E (kèm dự toán)", () => {
    const set = buildSheetSet(p, { date: "13/07/2026" });
    expect(set.sheets.map((s) => `${s.no} ${s.id}`)).toEqual([
      "ARQ-01 plan-L1", "ARQ-02 plan-L2", "ARQ-03 elevation", "ARQ-04 section", "ARQ-05 schedule", "ARQ-06 estimate",
    ]);
    expect(set.skipped).toEqual([]);
    for (const s of set.sheets) expect(sheetSvg(s, false)).toContain(s.no);
    // tờ dự toán nói được tổng tiền + đối chiếu ngân sách brief
    const duToan = sheetSvg(set.sheets.find((s) => s.id === "estimate")!, false);
    expect(duToan).toContain("TOTAL ESTIMADO");
    expect(duToan).toContain("SOBRAN");
  });

  it("lọc tờ vẫn giữ đúng số trong bộ; sin escalera el corte también entra al juego", () => {
    const one = buildSheetSet(p, { sheets: ["section"] });
    expect(one.sheets).toHaveLength(1);
    expect(one.sheets[0]!.no).toBe("ARQ-04");

    const noStair = structuredClone(p);
    noStair.stairs = [];
    const set = buildSheetSet(noStair);
    expect(set.skipped.map((s) => s.id)).not.toContain("section");
    expect(set.sheets.find((s) => s.id === "section")!.no).toBe("ARQ-04");
    expect(set.sheets.find((s) => s.id === "schedule")!.no).toBe("ARQ-05");
  });

  it("sheetDxf chỉ dành cho tờ có hình học model", () => {
    const set = buildSheetSet(p);
    const schedule = set.sheets.find((s) => s.id === "schedule")!;
    expect(schedule.hasModel).toBe(false);
    const plan = set.sheets.find((s) => s.id === "plan-L1")!;
    expect(sheetDxf(plan)).toContain("\n0\nPOLYLINE\n");
  });
});

describe("P4 — PDF hồ sơ (Chromium print)", () => {
  beforeEach(() => setDonGia(PRECIOS_TEST));
  afterEach(() => setDonGia(null));

  it("gộp bộ tờ thành MỘT file PDF nhiều trang A3", async () => {
    const { svgsToPdf, closePdfRenderer } = await import("./pdf.js");
    const set = buildSheetSet(p, { date: "13/07/2026" });
    const out = path.join(mkdtempSync(path.join(tmpdir(), "arquitecto-pdf-")), "ho-so.pdf");
    try {
      await svgsToPdf(set.sheets.map((s) => sheetSvg(s)), out);
    } finally {
      await closePdfRenderer();
    }
    const buf = readFileSync(out);
    expect(buf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(buf.length).toBeGreaterThan(50_000); // 6 trang có font nhúng
    // đếm trang qua marker /Type /Page (không /Pages)
    const pages = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
    expect(pages).toBe(6);
  }, 60_000);
});
