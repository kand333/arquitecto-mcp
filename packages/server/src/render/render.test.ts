import { describe, expect, it } from "vitest";
import { loadCasaPrueba2p } from "@arquitecto/core";
import { buildPlanScene } from "./plan-scene.js";
import { sceneToSvg } from "./svg-writer.js";

/** Golden SVG (doc 10): đổi renderer phải diff có chủ đích. Font không nhúng cho snapshot gọn. */
function render(levelId: string): string {
  const { items, tf } = buildPlanScene(loadCasaPrueba2p(), levelId, { date: "13/07/2026", designer: "anh Ba" });
  return sceneToSvg(items, tf);
}

describe("renderer 2D — mặt bằng", () => {
  it("golden SVG tầng 1", async () => {
    await expect(render("L1")).toMatchFileSnapshot("__snapshots__/mat-bang-L1.svg");
  });

  it("golden SVG tầng 2", async () => {
    await expect(render("L2")).toMatchFileSnapshot("__snapshots__/mat-bang-L2.svg");
  });

  it("cấu trúc bản vẽ tầng 1: layer, ký hiệu, dim, khung tên", () => {
    const svg = render("L1");
    // đủ layer chính
    for (const layer of ["EJES", "MUROS-CORTE", "MUROS-VISTA", "VANOS", "ESCALERAS", "MOBILIARIO", "COTAS", "TEXTOS", "VINETA"]) {
      expect(svg, `thiếu layer ${layer}`).toContain(`id="layer-${layer}"`);
    }
    // entity click được qua data-id
    for (const id of ["W1", "D1", "S1", "ST1", "R1", "F1"]) {
      expect(svg, `thiếu data-id ${id}`).toContain(`data-id="${id}"`);
    }
    // ký hiệu cửa đi = cung mở (path A) trong layer CUA
    expect(svg).toMatch(/data-id="D1"[^>]*d="M[^"]+A/);
    // nhãn phòng HOA có dấu + diện tích dẫn xuất
    expect(svg).toContain("LIVING");
    expect(svg).toContain("13.3m²");
    // cotas en cm sin decimales (ESTANDAR-PLANO): eje 3780 mm → 378, total 16000 mm → 1600
    expect(svg).toContain(">378<");
    expect(svg).toContain(">1600<");
    // thang: mũi tên LÊN + số bậc
    expect(svg).toContain("SUBE 21 PELD.");
    // cajetín + escala; reglas OGUC validadas por el usuario → sin la nota ⚠ de reglas sin validar
    expect(svg).toContain("ESCALA 1:50");
    expect(svg).toContain("PLANTA PISO 1");
    expect(svg).not.toContain("⚠");
    expect(svg).toContain("OGUC art. 1.2.2");
  });

  it("tầng 2 vẽ thang từ dưới lên (không zigzag) + giếng trời là lỗ sàn", () => {
    const svg = render("L2");
    expect(svg).toContain("PLANTA PISO 2");
    expect(svg).toContain(`data-id="ST1"`); // thang hiện ở mặt bằng tầng trên
    expect(svg).toContain(`data-id="SL2"`); // nét đứt lỗ sàn
    expect(svg).toContain("DORMITORIO PRINCIPAL");
    expect(svg).toContain("+3.600");
  });

  it("nhà dọc được xoay ngang trang, 1:50", () => {
    const { tf } = buildPlanScene(loadCasaPrueba2p(), "L1");
    expect(tf.rotated).toBe(true);
    expect(tf.scale).toBe(50);
  });

  it("level không tồn tại → lỗi tiếng Việt chỉ đường", () => {
    expect(() => buildPlanScene(loadCasaPrueba2p(), "L9")).toThrowError(/pisos disponibles: L1, L2/);
  });
});

describe("título de lámina de planta", () => {
  it("no duplica PLANTA cuando el piso ya se llama «Planta …»", async () => {
    const { planTitle } = await import("./frame.js");
    expect(planTitle("Planta baja")).toBe("PLANTA BAJA");
    expect(planTitle("Piso 1")).toBe("PLANTA PISO 1");
    expect(planTitle("Azotea")).toBe("PLANTA AZOTEA");
  });
});

describe("estándar gráfico de láminas (todo proyecto)", () => {
  it("ejes: solo los que pasan por el centro de un muro principal, y nunca dos a menos de 60 cm", async () => {
    const { principalAxes } = await import("./axes.js");
    const p = loadCasaPrueba2p();
    p.axes.x = [{ id: "A", offset: 110 }, { id: "A2", offset: 400 }, { id: "Z", offset: 2000 }];
    const { x } = principalAxes(p);
    expect(x.map((a) => a.id)).toContain("A"); // muro perimetral izquierdo (eje x = 110)
    expect(x.map((a) => a.id)).not.toContain("A2"); // a 29 cm de A y sin muro
    expect(x.map((a) => a.id)).not.toContain("Z"); // no coincide con ningún muro
  });

  it("ejes rojos y segmentados; marca de corte magenta, segmentada y gruesa", async () => {
    const { AXIS_COLOR, CUT_COLOR, W } = await import("./scene.js");
    const { items } = buildPlanScene(loadCasaPrueba2p(), "L1");
    const axisLines = items.filter((i) => i.layer === "EJES" && i.prim.kind === "line");
    expect(axisLines.length).toBeGreaterThan(0);
    for (const i of axisLines) expect(i.prim).toMatchObject({ color: AXIS_COLOR, dash: expect.any(String) });
    const cut = items.filter((i) => i.prim.kind === "line" && i.prim.color === CUT_COLOR);
    expect(cut.some((i) => i.prim.kind === "line" && i.prim.weight >= W.strong && i.prim.dash)).toBe(true);
  });

  it("cotas interiores: máx. 2 por recinto y solo en recintos importantes (nunca baño ni circulación)", () => {
    const p = loadCasaPrueba2p();
    for (const level of ["L1", "L2"]) {
      const { items } = buildPlanScene(p, level);
      const perRoom = new Map<string, number>();
      for (const i of items) if (i.prim.kind === "dim" && i.dataId) perRoom.set(i.dataId, (perRoom.get(i.dataId) ?? 0) + 1);
      for (const [id, n] of perRoom) {
        const r = p.rooms.find((x) => x.id === id)!;
        expect(["ngu", "khach", "bep-an", "lam-viec", "gara", "tho"]).toContain(r.use);
        expect(n).toBeLessThanOrEqual(2);
      }
      for (const r of p.rooms.filter((x) => x.level === level && ["wc", "hanh-lang", "cau-thang"].includes(x.use))) {
        expect(perRoom.has(r.id)).toBe(false);
      }
    }
  });

  it("ejes de fachada: un muro retranqueado que da al exterior es principal; uno interior corto no", async () => {
    const { principalAxes } = await import("./axes.js");
    const p = loadCasaPrueba2p();
    const W = (id: string, from: [number, number], to: [number, number]) => ({ id, level: "L1", from, to, thickness: 100, kind: "gach" as const });
    // planta en L: el tramo x=2000 (y 0..3000) es fachada aunque no toque el rectángulo envolvente
    p.walls = [W("a", [0, 3000], [6000, 3000]), W("b", [6000, 3000], [6000, 6000]), W("c", [6000, 6000], [0, 6000]),
      W("d", [0, 6000], [0, 3000]), W("e", [2000, 3000], [2000, 0]), W("f", [2000, 0], [6000, 0]), W("g", [6000, 0], [6000, 3000]),
      W("i", [4000, 6000], [4000, 5000])];
    p.rooms = [];
    p.axes.x = [{ id: "X0", offset: 0 }, { id: "X2", offset: 2000 }, { id: "X4", offset: 4000 }, { id: "X6", offset: 6000 }];
    expect(principalAxes(p).x.map((a) => a.id)).toEqual(["X0", "X2", "X6"]);
  });

  it("artefactos y muebles tenues en planta: gris claro, trazo fino; artefactos en su capa", () => {
    const p = loadCasaPrueba2p();
    const items = buildPlanScene(p, "L1").items.filter((i) => i.layer === "MOBILIARIO" || i.layer === "ARTEFACTOS");
    expect(items.length).toBeGreaterThan(0);
    for (const it of items) {
      const prim = it.prim as { weight?: number; color?: string };
      if (prim.weight !== undefined) expect(prim.weight).toBeLessThanOrEqual(0.13);
      if ("color" in prim) expect(prim.color).toBe("#b5b5b5");
    }
    const wc = p.furniture.find((f) => f.asset.startsWith("bon-cau"));
    if (wc) expect(items.some((i) => i.dataId === wc.id && i.layer === "ARTEFACTOS")).toBe(true);
  });

  it("muro bajo el plano de corte (jardinera): se dibuja en vista, sin relleno", () => {
    const p = loadCasaPrueba2p();
    p.walls.push({ id: "WJ", level: "L1", from: [500, -1000], to: [3500, -1000], thickness: 300, kind: "gach", height: 600 });
    const { items } = buildPlanScene(p, "L1");
    const mine = items.filter((i) => i.dataId === "WJ");
    expect(mine.length).toBeGreaterThan(0);
    expect(mine.every((i) => i.layer === "MUROS-VISTA" && i.prim.kind === "polyline")).toBe(true);
  });

  it("cotas interiores esquivan las etiquetas de recinto", () => {
    const p = loadCasaPrueba2p();
    for (const level of ["L1", "L2"]) {
      const { items, tf } = buildPlanScene(p, level);
      const band = 3.2 * tf.scale;
      const labels = items.filter((i) => i.layer === "TEXTOS" && i.prim.kind === "text" && i.dataId);
      for (const d of items) {
        if (d.prim.kind !== "dim" || !d.dataId) continue;
        const { a, b } = d.prim;
        for (const l of labels.filter((x) => x.dataId === d.dataId)) {
          if (l.prim.kind !== "text") continue;
          const [x, y] = l.prim.at;
          const onLine = d.prim.rot === 0
            ? Math.abs(y - a[1]) < band && x > a[0] && x < b[0]
            : Math.abs(x - a[0]) < band && y > a[1] && y < b[1];
          expect(onLine, `${level} ${d.dataId}: «${l.prim.text}» sobre la cota`).toBe(false);
        }
      }
    }
  });

  it("rótulos de recinto siempre horizontales, mismo tamaño de nombre en todos los que caben", () => {
    const p = loadCasaPrueba2p();
    for (const level of ["L1", "L2"]) {
      const { items } = buildPlanScene(p, level);
      const roomIds = new Set(p.rooms.map((r) => r.id));
      const labels = items.filter((i) => i.layer === "TEXTOS" && i.prim.kind === "text" && i.dataId && roomIds.has(i.dataId));
      expect(labels.length).toBeGreaterThan(0);
      for (const l of labels) if (l.prim.kind === "text") expect(l.prim.along, l.prim.text).toBeUndefined();
    }
  });

  it("cotas exteriores: el espesor del muro se acota completo (de cara a cara, nunca medio muro)", () => {
    const p = loadCasaPrueba2p();
    const W = (id: string, from: [number, number], to: [number, number]) => ({ id, level: "L1", from, to, thickness: 100, kind: "gach" as const });
    p.walls = [W("a", [0, 0], [6000, 0]), W("b", [6000, 0], [6000, 4000]), W("c", [6000, 4000], [0, 4000]), W("d", [0, 4000], [0, 0]), W("e", [3000, 0], [3000, 4000])];
    p.openings = []; p.stairs = []; p.furniture = [];
    p.rooms = [{ id: "R1", level: "L1", name: "Sala", use: "khach", polygon: [[0, 0], [3000, 0], [3000, 4000], [0, 4000]] }];
    p.levels = p.levels.filter((l) => l.id === "L1");
    p.slabs = [];
    const texts = buildPlanScene(p, "L1").items.filter((i) => i.layer === "COTAS" && i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts).toContain("10");
    expect(texts).not.toContain("5");
  });

  it("ventana corredera (hoja «truot»): marco + 2 hojas en planta, hojas/flecha/manilla en alzado, perfiles en corte", async () => {
    const { slidingWindowPlan, slidingWindowFace, slidingWindowSection } = await import("./sliding.js");
    const items: Array<{ prim: { kind: string } }> = [];
    const push = (_l: string, prim: { kind: string }) => { items.push({ prim }); };
    slidingWindowPlan([0, 0], [1000, 0], [0, 1], 100, "V1", push as never);
    // marco + 2 hojas + 2 montantes por hoja = 7 rectángulos; 2 líneas de vidrio por hoja
    expect(items.filter((i) => i.prim.kind === "polyline").length).toBe(7);
    expect(items.filter((i) => i.prim.kind === "line").length).toBe(4);
    items.length = 0;
    slidingWindowFace(0, 1000, 900, 2100, "V1", push as never);
    expect(items.filter((i) => i.prim.kind === "polyline").length).toBe(7); // marco x2, 2 hojas x2, manilla
    expect(items.filter((i) => i.prim.kind === "line").length).toBe(4); // encuentro + flecha (3)
    items.length = 0;
    slidingWindowSection(0, 100, 900, 2100, "V1", push as never);
    expect(items.filter((i) => i.prim.kind === "polyline").length).toBe(5); // marco, dintel, antepecho, 2 hojas
    // integrada en la planta: una ventana con estilo corredera usa el detalle
    const p = loadCasaPrueba2p();
    const win = p.openings.find((o) => o.kind === "window")!;
    p.styles.openings[win.style] = { ...p.styles.openings[win.style]!, leaf: "truot" };
    const mine = buildPlanScene(p, p.walls.find((w) => w.id === win.wall)!.level).items.filter((i) => i.dataId === win.id && i.layer === "VANOS");
    expect(mine.filter((i) => i.prim.kind === "polyline").length).toBe(7);
  });

  it("etiquetas: nombre y m² de cada recinto quedan dentro del recinto", async () => {
    const { pointInPolygon } = await import("@arquitecto/core");
    const p = loadCasaPrueba2p();
    const { items } = buildPlanScene(p, "L1");
    const labels = items.filter((i) => i.layer === "TEXTOS" && i.prim.kind === "text" && i.dataId);
    expect(labels.length).toBeGreaterThan(0);
    for (const i of labels) {
      const r = p.rooms.find((x) => x.id === i.dataId)!;
      if (i.prim.kind === "text") expect(pointInPolygon(i.prim.at, r.polygon), `${r.name}: ${i.prim.text}`).toBe(true);
    }
  });
});
