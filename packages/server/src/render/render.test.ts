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
