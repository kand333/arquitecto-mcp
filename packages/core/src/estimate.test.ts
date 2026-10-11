import { describe, expect, it } from "vitest";
import { loadCasaPrueba2p } from "./fixture.js";
import {
  computeQuantities, donGiaFor, estimateCost, formatMonto, formatVnd, parseBudgetVnd, parsePresupuesto, setDonGia, suggestFinishLevel,
} from "./estimate.js";

describe("dự toán sơ bộ — khối lượng từ fixture 4×16m", () => {
  const p = loadCasaPrueba2p();
  const q = computeQuantities(p);

  it("diện tích quy đổi: móng 40% + 2 sàn + mái ước lệ 50%", () => {
    const labels = q.dien_tich.map((l) => l.label);
    expect(labels[0]).toContain("Fundaciones");
    expect(labels).toContain("Losa Tầng 1");
    expect(labels).toContain("Losa Tầng 2");
    expect(labels.some((l) => /techo/i.test(l))).toBe(true);

    // lô 4×16 = 64m²/sàn; móng 64×0.4 = 25.6; mái ước 64×0.5 = 32
    const mong = q.dien_tich[0]!;
    expect(mong.dien_tich_m2).toBeCloseTo(64, 0);
    expect(mong.quy_doi_m2).toBeCloseTo(25.6, 1);
    const mai = q.dien_tich.find((l) => /techo/i.test(l.label))!;
    expect(mai.quy_doi_m2).toBeCloseTo(32, 0);
    expect(mai.uoc_le).toBe(true); // fixture chưa vẽ mái
    expect(q.ghi_chu.some((g) => g.includes("aún no tiene techo"))).toBe(true);

    // ô trống L2 (thang ~4.5m², giếng trời ~2.4m²) đều < ngưỡng 8m² → sàn tính đủ
    const sanL2 = q.dien_tich.find((l) => l.label === "Losa Tầng 2")!;
    expect(sanL2.quy_doi_m2).toBeCloseTo(64, 0);
    expect(q.tong_quy_doi_m2).toBeCloseTo(25.6 + 64 + 64 + 32, 0);

    // sàn thực trừ hết ô trống
    expect(q.san_thuc_m2).toBeLessThan(128);
    expect(q.san_thuc_m2).toBeGreaterThan(118);
  });

  it("khối lượng tham khảo: tường/cửa/bậc thang dương và hợp lý", () => {
    expect(q.tuong_xay_m2).toBeGreaterThan(150); // ~17 tường cao 3.4–3.6m
    expect(q.tuong_xay_m2).toBeLessThan(400);
    expect(q.cua_bo).toBe(p.openings.length);
    expect(q.cua_m2).toBeGreaterThan(10);
    expect(q.bac_thang).toBe(21);
  });
});

describe("dự toán sơ bộ — chi phí + ngân sách", () => {
  const p = loadCasaPrueba2p();

  it("mức hoàn thiện suy từ brief ('trung bình khá')", () => {
    expect(suggestFinishLevel(p)).toBe("trung-binh-kha");
  });

  it("tổng = thô × quy đổi + hoàn thiện × sàn thực; so được với ngân sách brief", () => {
    const e = estimateCost(p);
    expect(e.items).toHaveLength(2);
    const tho = e.items[0]!;
    expect(tho.monto).toBe(Math.round(e.quantities.tong_quy_doi_m2 * donGiaFor(undefined)!.don_gia_m2.xay_tho.monto!));
    expect(e.total).toBe(e.items[0]!.monto! + e.items[1]!.monto!);
    // brief fixture: "~1.8 tỷ" — nhà 2 tầng 128m² mức TB khá phải nằm trong ngân sách
    expect(e.ngan_sach?.monto).toBe(1_800_000_000);
    expect(e.ngan_sach?.diferencia).toBeGreaterThan(0);
    expect(e.ghi_chu.some((g) => g.includes("don-gia.json"))).toBe(true);
  });

  it("mức override đổi đơn giá hoàn thiện", () => {
    const kha = estimateCost(p, "trung-binh-kha").total!;
    const sang = estimateCost(p, "cao-cap").total!;
    expect(sang).toBeGreaterThan(kha);
  });

  it("parseBudgetVnd: tỷ / triệu / không parse được", () => {
    expect(parseBudgetVnd("~1.8 tỷ")).toBe(1_800_000_000);
    expect(parseBudgetVnd("1,5 ty")).toBe(1_500_000_000);
    expect(parseBudgetVnd("900 triệu")).toBe(900_000_000);
    expect(parseBudgetVnd("khoảng 2 tỉ đổ lại")).toBe(2_000_000_000);
    expect(parseBudgetVnd("tùy tình hình")).toBeNull();
    expect(parseBudgetVnd(undefined)).toBeNull();
  });

  it("formatVnd đọc được", () => {
    expect(formatVnd(1_234_000_000)).toBe("1,23 tỷ");
    expect(formatVnd(850_000_000)).toBe("850 triệu");
  });
});

// ── E4b-2: presupuesto Chile en UF (tabla rules/don-gia-cl.json, precios por completar) ──

describe("E4b — presupuesto Chile en UF", () => {
  const cl = () => {
    const p = loadCasaPrueba2p();
    p.config = { ...p.config, region: "cl" };
    return p;
  };

  it("tabla empaquetada: precios por completar → sin total inventado, solo losas como base", () => {
    setDonGia(null);
    const e = estimateCost(cl());
    expect(e.tabla?.currency.code).toBe("CLF");
    expect(e.items.every((i) => i.precio_m2 == null && i.monto == null)).toBe(true);
    expect(e.total).toBeNull();
    expect(e.ghi_chu.some((g) => g.includes("por completar"))).toBe(true);
    // sin coeficientes VN: no hay líneas de fundaciones ni techo, solo losas
    expect(e.quantities.dien_tich.every((l) => l.label.startsWith("Losa"))).toBe(true);
  });

  it("con precios del usuario (tabla del proyecto): total en UF y equivalente en CLP", () => {
    try {
      setDonGia({
        valor_clp: 40_000,
        don_gia_m2: {
          xay_tho: { label: "Obra gruesa", monto: 10 },
          hoan_thien: { "trung-binh-kha": { label: "Terminaciones medias", monto: 5 } },
        },
      });
      const p = cl();
      p.brief.ngan_sach = { muc: "3.500 UF", hoan_thien: "medio" };
      const e = estimateCost(p, "trung-binh-kha");
      const esperado = e.quantities.tong_quy_doi_m2 * 10 + e.quantities.san_thuc_m2 * 5;
      expect(e.total).toBeCloseTo(esperado, 1);
      expect(formatMonto(1234.5, e.tabla!)).toBe("1.234,5 UF (≈ $49.380.000)");
      expect(e.ngan_sach?.monto).toBe(3500);
      expect(e.ngan_sach?.diferencia).toBeCloseTo(3500 - e.total!, 1);
    } finally {
      setDonGia(null);
    }
  });

  it("parsePresupuesto: UF directo; pesos solo si se declaró el valor de la UF", () => {
    const uf = { currency: { code: "CLF", symbol: "UF", locale: "es-CL" }, valor_clp: 40_000 };
    expect(parsePresupuesto("3.500 UF", uf)).toBe(3500);
    expect(parsePresupuesto("UF 2.800,5", uf)).toBe(2800.5);
    expect(parsePresupuesto("$120.000.000", uf)).toBe(3000);
    expect(parsePresupuesto("120 millones", uf)).toBe(3000);
    expect(parsePresupuesto("$120.000.000", { ...uf, valor_clp: null })).toBeNull();
    expect(parsePresupuesto("lo que alcance", uf)).toBeNull();
  });
});
