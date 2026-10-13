import { describe, expect, it } from "vitest";
import { estimateCost, loadCasa2Pisos, loadCasaPrueba2p, setDonGia } from "@arquitecto/core";
import { buildPlanScene } from "./plan-scene.js";
import { buildElevationsScene } from "./elevations.js";
import { buildSectionsScene } from "./section-scene.js";
import { modelToGlb } from "./gltf-writer.js";
import { modelToIfc } from "./ifc-writer.js";
import { sceneToDxf } from "./dxf-writer.js";

/**
 * P7 (doc 12) — DoD: biệt thự mái hip, lô góc 2 mặt tiền, đất dốc render đúng
 * trên mọi mặt: plan (nét mái), mặt đứng (mái + đất dốc), mặt cắt (poché mái +
 * nền dốc), GLB/IFC, estimate m² mặt nghiêng. Nhà ống KHÔNG mái/terrain phải
 * đi nhánh no-op y hệt cũ (5 snapshot golden ở render.test/render-p4.test lo).
 */
describe("P7 — biệt thự mái dốc trên lô góc đất dốc", () => {
  const villa = loadCasa2Pisos();

  it("mặt bằng L2: mép mái + 4 hông + nóc trên layer MAI (hip = 6 nét)", () => {
    const plan = buildPlanScene(villa, "L2");
    const mai = plan.items.filter((i) => i.layer === "TECHUMBRE");
    expect(mai).toHaveLength(6); // 1 outline + 4 hông + 1 nóc
    expect(mai.every((i) => i.dataId === "RF1")).toBe(true);
  });

  it("elevaciones: la techumbre hip se ve en las 4 caras; terreno con pendiente", () => {
    const elev = buildElevationsScene(villa);
    const mai = elev.items.filter((i) => i.layer === "TECHUMBRE");
    expect(mai.length).toBeGreaterThan(4 * 4); // cantos y faldones en cada cara
    // terreno con pendiente = polyline que no es horizontal
    const ground = elev.items.find((i) => i.layer === "MUROS-CORTE" && i.prim.kind === "polyline" && !("close" in i.prim && i.prim.close));
    expect(ground).toBeDefined();
    const zs = (ground!.prim as { pts: Array<[number, number]> }).pts.map(([, z]) => z);
    expect(Math.max(...zs) - Math.min(...zs)).toBeGreaterThan(50);
  });

  it("mặt cắt: poché mái theo profile + mốc đỉnh vượt tường; nền đất dốc", () => {
    const sect = buildSectionsScene(villa);
    const roofCut = sect.items.filter((i) => i.dataId === "RF1");
    expect(roofCut.length).toBeGreaterThanOrEqual(1);
    expect(roofCut.some((i) => i.prim.kind === "polygon" && (i.prim as { fill?: string }).fill === "#000000")).toBe(true);
  });

  it("GLB có node RF1; IFC có IFCROOF kiểu HIP; DXF nhận layer MAI", () => {
    expect(modelToGlb(villa).includes("RF1")).toBe(true);
    const ifc = modelToIfc(villa);
    expect(ifc).toContain("IFCROOF");
    expect(ifc).toContain(".HIP_ROOF.");
    const plan = buildPlanScene(villa, "L2");
    const dxf = sceneToDxf(plan.items, { scale: 100 });
    expect(dxf).toContain("TECHUMBRE");
  });

  it("estimate: mái dốc tính m² MẶT NGHIÊNG (chiếu / cos pitch), hệ số mái ngói; không còn dòng ước lệ", () => {
    // la tabla chilena no define coeficiente de techo: se declara uno de prueba para ejercitar el cálculo
    setDonGia({ he_so_quy_doi: { san: { label: "Losas", he_so: 1 }, mai_ngoi: { label: "Techo de tejas", he_so: 0.7 } } });
    let est;
    try {
      est = estimateCost(villa);
    } finally {
      setDonGia(null);
    }
    const mai = est.quantities.dien_tich.find((l) => l.label.includes("RF1"));
    expect(mai).toBeDefined();
    // bbox mái 8.02×10.42m = 83.57m² chiếu → /cos(30°) ≈ 96.5m² mặt nghiêng
    expect(mai!.dien_tich_m2).toBeCloseTo(96.5, 0);
    expect(mai!.he_so).toBe(0.7);
    expect(est.quantities.dien_tich.some((l) => l.uoc_le)).toBe(false);
  });

  it("nhà ống không mái/terrain: KHÔNG item MAI, đất vẫn line ngang z=0 (no-op)", () => {
    const p = loadCasaPrueba2p();
    const elev = buildElevationsScene(p);
    expect(elev.items.filter((i) => i.layer === "TECHUMBRE")).toHaveLength(0);
    const sect = buildSectionsScene(p);
    expect(sect.items.filter((i) => i.layer === "TECHUMBRE")).toHaveLength(0);
  });
});
