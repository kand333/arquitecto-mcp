import { afterEach, describe, expect, it } from "vitest";
import { loadCasaPrueba2p } from "./fixture.js";
import {
  computeQuantities, estimateCost, formatMonto, parsePresupuesto, setDonGia, suggestFinishLevel,
} from "./estimate.js";

/** Coeficientes de PRUEBA (los del upstream): la tabla chilena no los trae, pero el motor los soporta. */
const COEF_TEST = {
  he_so_quy_doi: {
    mong: { label: "Fundaciones", he_so: 0.4 },
    san: { label: "Losas", he_so: 1 },
    mai_btct: { label: "Losa de techo", he_so: 0.5 },
    o_trong_lon: { label: "Vacíos", he_so: 0.5, nguong_m2: 8 },
  },
};

describe("presupuesto — cantidades desde la casa de prueba 4×16 m", () => {
  afterEach(() => setDonGia(null));
  const p = loadCasaPrueba2p();

  it("tabla chilena: solo losas como base, sin coeficientes ajenos; los vacíos se descuentan", () => {
    const q = computeQuantities(p);
    expect(q.dien_tich.map((l) => l.label)).toEqual(["Losa Piso 1", "Losa Piso 2"]);
    expect(q.tong_quy_doi_m2).toBeCloseTo(q.san_thuc_m2, 0);
    expect(q.san_thuc_m2).toBeLessThan(128);
    expect(q.san_thuc_m2).toBeGreaterThan(118);
  });

  it("con coeficientes declarados: fundaciones 40 % + 2 losas + techo estimado 50 %", () => {
    setDonGia(COEF_TEST);
    const q = computeQuantities(p);
    const labels = q.dien_tich.map((l) => l.label);
    expect(labels[0]).toBe("Fundaciones");
    expect(labels).toContain("Losa Piso 1");
    expect(labels).toContain("Losa Piso 2");
    // sitio 4×16 = 64 m²/losa; fundaciones 64×0,4 = 25,6; techo estimado 64×0,5 = 32
    expect(q.dien_tich[0]!.dien_tich_m2).toBeCloseTo(64, 0);
    expect(q.dien_tich[0]!.quy_doi_m2).toBeCloseTo(25.6, 1);
    const techo = q.dien_tich.find((l) => l.label === "Losa de techo")!;
    expect(techo.quy_doi_m2).toBeCloseTo(32, 0);
    expect(techo.uoc_le).toBe(true); // la fixture no tiene techo dibujado
    expect(q.ghi_chu.some((g) => g.includes("aún no tiene techo"))).toBe(true);
    // vacíos de L2 (escalera ~4,5 m², patio ~2,4 m²) bajo el umbral de 8 m² → la losa se cobra completa
    expect(q.dien_tich.find((l) => l.label === "Losa Piso 2")!.quy_doi_m2).toBeCloseTo(64, 0);
    expect(q.tong_quy_doi_m2).toBeCloseTo(25.6 + 64 + 64 + 32, 0);
  });

  it("cantidades de referencia: muros, vanos y peldaños positivos y razonables", () => {
    const q = computeQuantities(p);
    expect(q.tuong_xay_m2).toBeGreaterThan(150); // ~17 muros de 3,4–3,6 m
    expect(q.tuong_xay_m2).toBeLessThan(400);
    expect(q.cua_bo).toBe(p.openings.length);
    expect(q.cua_m2).toBeGreaterThan(10);
    expect(q.bac_thang).toBe(21);
  });
});

describe("presupuesto — costos y presupuesto del brief (UF)", () => {
  afterEach(() => setDonGia(null));
  const p = loadCasaPrueba2p();
  /** Precios de PRUEBA en UF/m² (la tabla empaquetada viene «por completar»). */
  const PRECIOS = {
    don_gia_m2: {
      xay_tho: { label: "Obra gruesa", monto: 10 },
      hoan_thien: {
        "co-ban": { label: "Terminaciones básicas", monto: 4 },
        "trung-binh-kha": { label: "Terminaciones medias", monto: 5 },
        "cao-cap": { label: "Terminaciones altas", monto: 8 },
      },
    },
  };

  it("nivel de terminaciones desde el brief ('medio')", () => {
    expect(suggestFinishLevel(p)).toBe("trung-binh-kha");
  });

  it("total = obra gruesa × superficie equivalente + terminaciones × superficie útil; se compara con el brief", () => {
    setDonGia(PRECIOS);
    const e = estimateCost(p);
    expect(e.items).toHaveLength(2);
    expect(e.items[0]!.monto).toBeCloseTo(e.quantities.tong_quy_doi_m2 * 10, 1);
    expect(e.total).toBeCloseTo(e.items[0]!.monto! + e.items[1]!.monto!, 2);
    // brief de la fixture: "~3.500 UF"; ~120 m² a 15 UF/m² ≈ 1.900 UF → sobra presupuesto
    expect(e.ngan_sach?.monto).toBe(3500);
    expect(e.ngan_sach?.diferencia).toBeGreaterThan(0);
    expect(e.ghi_chu.some((g) => g.includes("don-gia.json"))).toBe(true);
  });

  it("forzar el nivel cambia el precio de terminaciones", () => {
    setDonGia(PRECIOS);
    expect(estimateCost(p, "cao-cap").total!).toBeGreaterThan(estimateCost(p, "trung-binh-kha").total!);
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
