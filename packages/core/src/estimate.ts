import donGiaVnJson from "../rules/don-gia.json" with { type: "json" };
import donGiaClJson from "../rules/don-gia-cl.json" with { type: "json" };
import { areaM2 } from "./geometry/polygon.js";
import { roofGeometry } from "./geometry/roof.js";
import { wallLength } from "./geometry/wall.js";
import { roofsOf } from "./model.js";
import type { Project } from "./types.js";

/**
 * Presupuesto preliminar: cantidades desde el modelo × tabla de precios de la región
 * (`rules/don-gia*.json`, datos editables — ADR-09). Estimación de anteproyecto,
 * NO reemplaza una cotización. Precio `null` = «por completar»: nunca se inventa un total.
 */

export type Moneda = { code: string; symbol: string; locale: string };
export type Precio = { label: string; monto: number | null };

export type DonGia = {
  version: string;
  ghi_chu: string;
  tham_khao: boolean;
  currency: Moneda;
  /** Pesos chilenos por unidad de la tabla (p. ej. valor de la UF del día) — opcional, solo para mostrar CLP. */
  valor_clp?: number | null;
  don_gia_m2: { xay_tho: Precio; hoan_thien: Record<string, Precio> };
  /** Coeficientes de equivalencia: si una partida no está, NO se suma (sin valores por defecto ajenos). */
  he_so_quy_doi: Record<string, { label: string; he_so: number; nguong_m2?: number }>;
};

/** Tablas empaquetadas por región. "vn" es legado y se elimina en E4b-4. */
const TABLAS: Record<string, DonGia> = {
  vn: donGiaVnJson as DonGia,
  cl: donGiaClJson as DonGia,
};

/** Tabla local del proyecto (<proyecto>/rules/don-gia.json), se aplica sobre la tabla de su región. */
let override: Partial<DonGia> | null = null;

/** null = sin tabla local. Shallow-merge sobre la tabla de la región para que un archivo parcial no rompa. */
export function setDonGia(d: Partial<DonGia> | null): void {
  override = d ? structuredClone(d) : null;
}

/** Tabla efectiva de una región (empaquetada + tabla local), o null si la región no tiene precios. */
export function donGiaFor(region: string | undefined): DonGia | null {
  const base = TABLAS[region ?? "vn"];
  return base ? { ...structuredClone(base), ...(override ? structuredClone(override) : {}) } : null;
}

export type FinishLevel = "co-ban" | "trung-binh-kha" | "cao-cap";

export type AreaLine = {
  label: string;
  dien_tich_m2: number;
  he_so: number;
  quy_doi_m2: number;
  /** Estimada porque falta información en el modelo (p. ej. sin techo). */
  uoc_le?: boolean;
};

export type QuantityReport = {
  dien_tich: AreaLine[];
  tong_quy_doi_m2: number;
  /** Superficie útil (descontados los vacíos) — base de las terminaciones. */
  san_thuc_m2: number;
  tuong_xay_m2: number;
  cua_bo: number;
  cua_m2: number;
  bac_thang: number;
  ghi_chu: string[];
};

const r1 = (v: number): number => Math.round(v * 10) / 10;

export function computeQuantities(p: Project): QuantityReport {
  const hs = donGiaFor(p.config?.region)?.he_so_quy_doi ?? {};
  const ghiChu: string[] = [];
  const lines: AreaLine[] = [];
  const levels = [...p.levels].sort((a, b) => a.elevation - b.elevation);

  // ── losas por piso + vacíos ─────────────────────────────────
  let sanThuc = 0;
  for (const lv of levels) {
    const floors = p.slabs.filter((s) => s.level === lv.id && s.kind === "floor");
    if (floors.length === 0) continue;
    let gross = 0;
    let holeAll = 0;
    let holeLonVuot = 0; // exceso sobre el umbral de los vacíos grandes
    const nguong = hs.o_trong_lon?.nguong_m2 ?? 8;
    for (const s of floors) {
      gross += areaM2(s.outline);
      for (const h of s.holes ?? []) {
        const a = areaM2(h);
        holeAll += a;
        if (a >= nguong) holeLonVuot += a - nguong;
      }
    }
    sanThuc += gross - holeAll;
    // con coeficiente de vacíos (tabla VN): el exceso de los grandes se cobra según he_so; sin él, se descuentan los vacíos
    const tinhPhi = hs.o_trong_lon ? gross - holeLonVuot * (1 - hs.o_trong_lon.he_so) : gross - holeAll;
    const heSoSan = hs.san?.he_so ?? 1;
    lines.push({ label: `Losa ${lv.name}`, dien_tich_m2: r1(tinhPhi), he_so: heSoSan, quy_doi_m2: r1(tinhPhi * heSoSan) });
  }

  // ── fundaciones: según el piso más bajo (solo si la tabla define el coeficiente) ──
  const ground = levels[0];
  const groundFloor = ground ? p.slabs.filter((s) => s.level === ground.id && s.kind === "floor") : [];
  const mongArea = groundFloor.reduce((s, x) => s + areaM2(x.outline), 0);
  if (mongArea > 0 && hs.mong) {
    lines.unshift({ label: hs.mong.label, dien_tich_m2: r1(mongArea), he_so: hs.mong.he_so, quy_doi_m2: r1(mongArea * hs.mong.he_so) });
  }

  // ── techos inclinados: m² inclinados reales, coeficiente según material ──
  let maiDocArea = 0;
  for (const rf of roofsOf(p)) {
    const lv = p.levels.find((l) => l.id === rf.level);
    if (!lv) continue;
    const g = roofGeometry(rf, lv);
    maiDocArea += g.areaM2;
    const c = hs[rf.material === "ton" ? "mai_ton" : "mai_ngoi"];
    if (!c) continue;
    lines.push({ label: `${c.label} (${rf.id})`, dien_tich_m2: r1(g.areaM2), he_so: c.he_so, quy_doi_m2: r1(g.areaM2 * c.he_so) });
  }

  // ── techo plano: lo que haya; SIN ningún techo → se estima con la losa del último piso ──
  if (hs.mai_btct) {
    const roofs = p.slabs.filter((s) => s.kind === "roof-flat");
    let maiArea = roofs.reduce((s, x) => s + areaM2(x.outline), 0);
    let maiUocLe = false;
    if (maiArea === 0 && maiDocArea === 0) {
      const top = levels[levels.length - 1];
      const topFloor = top ? p.slabs.filter((s) => s.level === top.id && s.kind === "floor") : [];
      maiArea = topFloor.reduce((s, x) => s + areaM2(x.outline), 0);
      maiUocLe = maiArea > 0;
      if (maiUocLe) ghiChu.push("El modelo aún no tiene techo: se estima su superficie igual a la losa del último piso.");
    }
    if (maiArea > 0) {
      lines.push({
        label: hs.mai_btct.label, dien_tich_m2: r1(maiArea), he_so: hs.mai_btct.he_so, quy_doi_m2: r1(maiArea * hs.mai_btct.he_so),
        ...(maiUocLe ? { uoc_le: true } : {}),
      });
    }
  }

  // ── cantidades de referencia (para cotejar cotizaciones; NO se multiplican por precio) ──
  let tuongM2 = 0;
  for (const w of p.walls) {
    if (w.kind === "kinh") continue;
    const lv = p.levels.find((l) => l.id === w.level);
    const h = w.height ?? lv?.height ?? 0;
    tuongM2 += (wallLength(w) * h) / 1e6;
  }
  let cuaM2 = 0;
  for (const o of p.openings) {
    cuaM2 += (o.width * o.height) / 1e6;
    tuongM2 -= (o.width * o.height) / 1e6;
  }
  const bacThang = p.stairs.reduce((s, st) => s + st.steps, 0);

  return {
    dien_tich: lines,
    tong_quy_doi_m2: r1(lines.reduce((s, l) => s + l.quy_doi_m2, 0)),
    san_thuc_m2: r1(sanThuc),
    tuong_xay_m2: r1(tuongM2),
    cua_bo: p.openings.length,
    cua_m2: r1(cuaM2),
    bac_thang: bacThang,
    ghi_chu: ghiChu,
  };
}

/** Nivel de terminaciones a partir de brief.ngan_sach.hoan_thien (texto libre de la fase A). */
export function suggestFinishLevel(p: Project): FinishLevel {
  const t = (p.brief.ngan_sach?.hoan_thien ?? "").toLowerCase();
  if (/cao\s*cấp|cao\s*cap|sang|alto|premium|lujo/.test(t)) return "cao-cap";
  if (/cơ\s*bản|co\s*ban|tiết\s*kiệm|tiet\s*kiem|rẻ|re\b|b[aá]sic|econ[oó]mic/.test(t)) return "co-ban";
  return "trung-binh-kha";
}

/** "~1.8 tỷ", "900 triệu" → dong (legado VN, se elimina en E4b-4). */
export function parseBudgetVnd(text: string | undefined): number | null {
  if (!text) return null;
  const m = /(\d+(?:[.,]\d+)?)\s*(triệu|trieu|tr|tỷ|tỉ|ty|ti)(?!\p{L})/iu.exec(text.normalize("NFC"));
  if (!m) return null;
  const value = Number(m[1]!.replace(",", "."));
  if (!Number.isFinite(value)) return null;
  const unit = m[2]!.toLowerCase();
  const laTrieu = unit === "tr" || unit.startsWith("tri");
  return Math.round(value * (laTrieu ? 1e6 : 1e9));
}

/** Legado VN (se elimina en E4b-4). */
export function formatVnd(vnd: number): string {
  if (Math.abs(vnd) >= 1e9) return `${(vnd / 1e9).toFixed(2).replace(".", ",")} tỷ`;
  return `${Math.round(vnd / 1e6).toLocaleString("vi-VN")} triệu`;
}

/** Número chileno: "3.500,5" → 3500.5. */
const numCl = (s: string): number => Number(s.replace(/\./g, "").replace(",", "."));

/**
 * Presupuesto del brief en la moneda de la tabla. UF: "3.500 UF", "UF 3500".
 * Pesos ("$120.000.000", "120 millones") solo si la tabla es en UF y se declaró valor_clp.
 */
export function parsePresupuesto(text: string | undefined, tabla: Pick<DonGia, "currency" | "valor_clp">): number | null {
  if (!text) return null;
  if (tabla.currency.code === "VND") return parseBudgetVnd(text);
  const uf = /(\d[\d.]*(?:,\d+)?)\s*UF\b|\bUF\s*(\d[\d.]*(?:,\d+)?)/i.exec(text);
  if (uf) return numCl(uf[1] ?? uf[2]!);
  const valor = tabla.valor_clp;
  if (tabla.currency.code !== "CLF" || !valor) return null;
  const mill = /(\d+(?:,\d+)?)\s*millones/i.exec(text);
  if (mill) return (numCl(mill[1]!) * 1e6) / valor;
  const clp = /\$\s*(\d[\d.]*)/.exec(text);
  return clp ? numCl(clp[1]!) / valor : null;
}

/** Monto legible en la moneda de la tabla; en UF agrega el equivalente en pesos si hay valor_clp. */
export function formatMonto(n: number, tabla: Pick<DonGia, "currency" | "valor_clp">): string {
  if (tabla.currency.code === "VND") return formatVnd(n);
  const { code, symbol, locale } = tabla.currency;
  if (code === "CLF") {
    const uf = `${n.toLocaleString(locale, { maximumFractionDigits: 1 })} UF`;
    return tabla.valor_clp ? `${uf} (≈ $${Math.round(n * tabla.valor_clp).toLocaleString(locale)})` : uf;
  }
  return `${symbol} ${n.toLocaleString(locale)}`;
}

export type EstimateItem = {
  label: string;
  khoi_luong_m2: number;
  /** null = precio por completar. */
  precio_m2: number | null;
  monto: number | null;
};

export type Estimate = {
  quantities: QuantityReport;
  muc: FinishLevel;
  /** null = la región no tiene tabla de precios (solo cantidades). */
  tabla: DonGia | null;
  items: EstimateItem[];
  /** null = algún precio por completar o sin tabla: no se inventa un total. */
  total: number | null;
  ngan_sach?: { text: string; monto: number | null; diferencia: number | null };
  ghi_chu: string[];
};

export function estimateCost(p: Project, muc?: FinishLevel): Estimate {
  const q = computeQuantities(p);
  const level = muc ?? suggestFinishLevel(p);

  // Región sin tabla: cantidades reales, sin montos de otra región.
  const tabla = donGiaFor(p.config?.region);
  if (!tabla) {
    return {
      quantities: q, muc: level, tabla: null, items: [], total: null,
      ghi_chu: [...q.ghi_chu, `No hay tabla de precios para la región "${p.config?.region}": el presupuesto solo incluye cantidades.`],
    };
  }

  const hoanThien = tabla.don_gia_m2.hoan_thien[level] ?? tabla.don_gia_m2.hoan_thien["trung-binh-kha"]!;
  const round = tabla.currency.code === "VND" ? Math.round : (v: number): number => Math.round(v * 100) / 100;
  const item = (label: string, m2: number, precio: number | null): EstimateItem => ({
    label, khoi_luong_m2: m2, precio_m2: precio, monto: precio == null ? null : round(m2 * precio),
  });
  const items = [
    item(`${tabla.don_gia_m2.xay_tho.label} (${q.tong_quy_doi_m2}m² equivalentes)`, q.tong_quy_doi_m2, tabla.don_gia_m2.xay_tho.monto),
    item(`${hoanThien.label} (${q.san_thuc_m2}m² útiles)`, q.san_thuc_m2, hoanThien.monto),
  ];
  const total = items.some((i) => i.monto == null) ? null : items.reduce((s, i) => s + i.monto!, 0);

  const ghiChu = [...q.ghi_chu];
  if (total == null) {
    ghiChu.push(`Precios por completar en la tabla ${tabla.version}: copia rules/don-gia-cl.json a <proyecto>/rules/don-gia.json y llena los montos (UF/m²). Sin precios no se calcula un total.`);
  } else if (tabla.tham_khao) {
    ghiChu.push(`Precios ${tabla.version} de REFERENCIA (±15–20 %): ajusta rules/don-gia.json a tu localidad.`);
  }

  const budgetText = p.brief.ngan_sach?.muc;
  const budget = parsePresupuesto(budgetText, tabla);
  return {
    quantities: q, muc: level, tabla, items, total,
    ...(budgetText
      ? { ngan_sach: { text: budgetText, monto: budget, diferencia: budget != null && total != null ? budget - total : null } }
      : {}),
    ghi_chu: ghiChu,
  };
}
