/**
 * Catalog nội thất chuẩn hóa (P5) — asset THAM SỐ HÓA: kích thước mm thật,
 * tên tiếng Việt + tiếng Anh (labelEn, i18n editor), khe hở khuyến nghị.
 * Hình 3D dựng tham số theo category (web/three3d), ký hiệu 2D trong renderer
 * (plan-scene) — CC0 by construction, nguồn ghi ở assets/license-manifest.json.
 * glTF photoreal: pipeline P5+ (doc 10) — footprint là hợp đồng kích thước,
 * thay model không đổi id.
 *
 * Kích thước mm: w = ngang (local +x khi rotation 0), d = sâu (+y), h = cao.
 * "Lưng" asset ở cạnh -d/2 (kê sát tường), "mặt trước" +d/2 (xem obb.ts).
 */

export type AssetCategory =
  | "giuong"
  | "giuong-tang"
  | "tu-dau-giuong"
  | "tu-ao"
  | "ban-trang-diem"
  | "sofa"
  | "ban-tra"
  | "ke-tv"
  | "ban-an"
  | "ghe-an"
  | "ban-lam-viec"
  | "ghe-xoay"
  | "ke-sach"
  | "tu-giay"
  | "tu-bep-duoi"
  | "tu-bep-tren"
  | "tu-lanh"
  | "bep"
  | "bon-cau"
  | "lavabo"
  | "voi-sen"
  | "bon-tam"
  | "guong"
  | "binh-nong-lanh"
  | "may-giat"
  | "may-lanh"
  | "quat-cay"
  | "den-cay"
  | "cay-canh"
  | "xe-may"
  | "xe-dap"
  | "o-to"
  | "ban-tho";

export type Asset = {
  id: string;
  label: string; // tiếng Việt — mặc định trên UI/bản vẽ
  labelEn: string; // tiếng Anh — editor ở chế độ ?lang=en
  category: AssetCategory;
  footprint: { w: number; d: number; h: number };
  /** Khe hở khuyến nghị quanh asset (nuôi STD-11), theo cạnh local. */
  clearance?: { front?: number; sides?: number };
  /** Đồ treo tường — cao mặc định của mép DƯỚI so với sàn (gợi ý elevation). */
  mountHeight?: number;
};

const A = (
  id: string,
  label: string,
  labelEn: string,
  category: AssetCategory,
  w: number,
  d: number,
  h: number,
  extra: Partial<Pick<Asset, "clearance" | "mountHeight">> = {},
): Asset => ({ id, label, labelEn, category, footprint: { w, d, h }, ...extra });

export const CATALOG: Asset[] = [
  // ── Giường & phòng ngủ ─────────────────────────────────────
  A("giuong-1m", "Cama 1 plaza 1,0 m", "Single bed 1.0m", "giuong", 1000, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m2", "Cama 1½ plaza 1,2 m", "Single bed 1.2m", "giuong", 1200, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m4", "Cama 2 plazas 1,4 m", "Double bed 1.4m", "giuong", 1400, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m6", "Cama queen 1,6 m", "Double bed 1.6m", "giuong", 1600, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-1m8", "Cama king 1,8 m", "Double bed 1.8m", "giuong", 1800, 2000, 400, { clearance: { sides: 600 } }),
  A("giuong-2m", "Cama super king 2,0 m", "King bed 2.0m", "giuong", 2000, 2200, 400, { clearance: { sides: 600 } }),
  A("giuong-tang-1m", "Camarote infantil 1,0 m", "Kids bunk bed 1.0m", "giuong-tang", 1000, 2000, 1600, { clearance: { sides: 600 } }),
  A("giuong-tang-1m2", "Camarote 1,2 m", "Bunk bed 1.2m", "giuong-tang", 1200, 2000, 1700, { clearance: { sides: 600 } }),
  A("noi-em-be", "Cuna", "Baby crib", "giuong", 650, 1200, 900, { clearance: { sides: 500 } }),
  A("tu-dau-giuong-40", "Velador 40 cm", "Nightstand 40cm", "tu-dau-giuong", 400, 400, 450),
  A("tu-dau-giuong-50", "Velador 50 cm", "Nightstand 50cm", "tu-dau-giuong", 500, 400, 500),
  A("tu-ao-1m", "Ropero 1,0 m", "Wardrobe 1.0m", "tu-ao", 1000, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m2", "Ropero 1,2 m", "Wardrobe 1.2m", "tu-ao", 1200, 550, 2200, { clearance: { front: 600 } }),
  A("tu-ao-1m6", "Ropero 1,6 m", "Wardrobe 1.6m", "tu-ao", 1600, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m", "Ropero 2,0 m", "Wardrobe 2.0m", "tu-ao", 2000, 600, 2400, { clearance: { front: 600 } }),
  A("tu-ao-2m4", "Ropero 2,4 m puertas correderas", "Sliding-door wardrobe 2.4m", "tu-ao", 2400, 650, 2400, { clearance: { front: 550 } }),
  A("ban-trang-diem", "Tocador", "Dressing table", "ban-trang-diem", 1000, 450, 750, { clearance: { front: 600 } }),

  // ── Phòng khách ────────────────────────────────────────────
  A("sofa-don", "Sillón individual", "Armchair", "sofa", 900, 850, 800),
  A("sofa-2s", "Sofá 2 cuerpos", "2-seat sofa", "sofa", 1500, 850, 800),
  A("sofa-3s-01", "Sofá 3 cuerpos", "3-seat sofa", "sofa", 1800, 850, 800),
  A("sofa-3s-22", "Sofá 3 cuerpos grande", "Large 3-seat sofa", "sofa", 2200, 900, 800),
  A("sofa-goc-l", "Sofá esquinero en L", "L-shaped corner sofa", "sofa", 2600, 1600, 800),
  A("ban-tra-vuong", "Mesa de centro cuadrada 60", "Square coffee table 60", "ban-tra", 600, 600, 420),
  A("ban-tra-chu-nhat", "Mesa de centro 1,1 m", "Coffee table 1.1m", "ban-tra", 1100, 550, 420),
  A("ban-tra-tron", "Mesa de centro redonda 70", "Round coffee table 70", "ban-tra", 700, 700, 450),
  A("ke-tv-1200", "Mueble TV 1,2 m", "TV stand 1.2m", "ke-tv", 1200, 400, 500),
  A("ke-tv-1600", "Mueble TV 1,6 m", "TV stand 1.6m", "ke-tv", 1600, 450, 500),
  A("ke-tv-2000", "Mueble TV 2,0 m", "TV stand 2.0m", "ke-tv", 2000, 450, 500),
  A("tu-giay-800", "Zapatero 80 cm", "Shoe cabinet 80cm", "tu-giay", 800, 350, 1000),
  A("tu-giay-1200", "Zapatero 1,2 m", "Shoe cabinet 1.2m", "tu-giay", 1200, 350, 1100),

  // ── Bếp & ăn ───────────────────────────────────────────────
  A("ban-an-2", "Mesa de comedor 2 personas", "Dining table for 2", "ban-an", 800, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-4", "Mesa de comedor 4 personas", "Dining table for 4", "ban-an", 1400, 800, 750, { clearance: { front: 800 } }),
  A("ban-an-6", "Mesa de comedor 6 personas", "Dining table for 6", "ban-an", 1800, 900, 750, { clearance: { front: 800 } }),
  A("ban-an-8", "Mesa de comedor 8 personas", "Dining table for 8", "ban-an", 2200, 1000, 750, { clearance: { front: 800 } }),
  A("ban-an-tron-1m", "Mesa de comedor redonda 1,0 m", "Round dining table 1.0m", "ban-an", 1000, 1000, 750, { clearance: { front: 800 } }),
  A("ghe-an", "Silla de comedor", "Dining chair", "ghe-an", 450, 500, 900),
  A("ghe-bang-an", "Banca de comedor 1,4 m", "Dining bench 1.4m", "ghe-an", 1400, 350, 450),
  A("tu-bep-duoi-06", "Mueble base de cocina 60 (módulo)", "Base kitchen cabinet 60 (module)", "tu-bep-duoi", 600, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-12", "Mueble base de cocina 1,2 m", "Base kitchen run 1.2m", "tu-bep-duoi", 1200, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-18", "Mueble base de cocina 1,8 m (con lavaplatos)", "Base kitchen run 1.8m (with sink)", "tu-bep-duoi", 1800, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-24", "Mueble base de cocina 2,4 m (lavaplatos + encimera)", "Base kitchen run 2.4m (sink + cooktop)", "tu-bep-duoi", 2400, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-duoi-30", "Mueble base de cocina 3,0 m (lavaplatos + encimera)", "Base kitchen run 3.0m (sink + cooktop)", "tu-bep-duoi", 3000, 600, 850, { clearance: { front: 900 } }),
  A("tu-bep-goc", "Mueble base de cocina en L 1,8×1,8 m", "L-shaped base kitchen 1.8×1.8m", "tu-bep-duoi", 1800, 1800, 850, { clearance: { front: 900 } }),
  A("tu-bep-tren-06", "Mueble aéreo de cocina 0,6 m", "Wall kitchen cabinet 0.6m", "tu-bep-tren", 600, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-12", "Mueble aéreo de cocina 1,2 m", "Wall kitchen cabinet 1.2m", "tu-bep-tren", 1200, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-18", "Mueble aéreo de cocina 1,8 m", "Wall kitchen cabinet 1.8m", "tu-bep-tren", 1800, 350, 700, { mountHeight: 1450 }),
  A("tu-bep-tren-24", "Mueble aéreo de cocina 2,4 m", "Wall kitchen cabinet 2.4m", "tu-bep-tren", 2400, 350, 700, { mountHeight: 1450 }),
  A("bep-4", "Cocina 4 platos con horno", "Range 4 burners + oven", "bep", 600, 600, 900, { clearance: { front: 900 } }),
  A("tu-lanh-mini", "Frigobar", "Mini fridge", "tu-lanh", 500, 550, 850),
  A("tu-lanh", "Refrigerador 2 puertas", "Two-door fridge", "tu-lanh", 700, 700, 1700, { clearance: { front: 700 } }),
  A("tu-lanh-sbs", "Refrigerador side by side", "Side-by-side fridge", "tu-lanh", 900, 750, 1800, { clearance: { front: 700 } }),

  // ── Làm việc & học ─────────────────────────────────────────
  A("ban-hoc", "Escritorio 1,0 m", "Desk 1.0m", "ban-lam-viec", 1000, 500, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m2", "Escritorio 1,2 m", "Desk 1.2m", "ban-lam-viec", 1200, 600, 750, { clearance: { front: 750 } }),
  A("ban-lam-viec-1m4", "Escritorio 1,4 m", "Desk 1.4m", "ban-lam-viec", 1400, 700, 750, { clearance: { front: 750 } }),
  A("ghe-xoay", "Silla de oficina giratoria", "Office swivel chair", "ghe-xoay", 600, 600, 1000),
  A("ke-sach-600", "Librero 60 cm", "Bookshelf 60cm", "ke-sach", 600, 300, 1800),
  A("ke-sach-800", "Librero 80 cm", "Bookshelf 80cm", "ke-sach", 800, 300, 2000),
  A("ke-sach-1200", "Librero 1,2 m", "Bookshelf 1.2m", "ke-sach", 1200, 350, 2000),

  // ── Vệ sinh ────────────────────────────────────────────────
  A("bon-cau", "WC dos piezas", "Two-piece toilet", "bon-cau", 400, 700, 780, { clearance: { front: 500, sides: 200 } }),
  A("bon-cau-1-khoi", "WC una pieza", "One-piece toilet", "bon-cau", 420, 740, 700, { clearance: { front: 500, sides: 200 } }),
  A("lavabo", "Lavamanos", "Washbasin", "lavabo", 550, 420, 850, { clearance: { front: 550 } }),
  A("lavabo-tu", "Vanitorio 80 cm", "Vanity basin 80cm", "lavabo", 800, 480, 850, { clearance: { front: 550 } }),
  A("lavabo-doi", "Vanitorio doble 1,2 m", "Double vanity 1.2m", "lavabo", 1200, 500, 850, { clearance: { front: 550 } }),
  A("voi-sen", "Receptáculo de ducha 90", "Walk-in shower 90", "voi-sen", 900, 900, 2000),
  A("voi-sen-80", "Receptáculo de ducha 80", "Walk-in shower 80", "voi-sen", 800, 800, 2000),
  A("bon-tam-15", "Tina 1,5 m", "Bathtub 1.5m", "bon-tam", 1500, 750, 600, { clearance: { front: 600 } }),
  A("bon-tam-17", "Tina 1,7 m", "Bathtub 1.7m", "bon-tam", 1700, 800, 600, { clearance: { front: 600 } }),
  A("guong-wc", "Espejo de baño 60", "Bathroom mirror 60", "guong", 600, 50, 800, { mountHeight: 1000 }),
  A("binh-nong-lanh", "Termo eléctrico 20 L", "Water heater 20L", "binh-nong-lanh", 500, 300, 350, { mountHeight: 1900 }),
  A("may-giat", "Lavadora carga frontal", "Front-load washer", "may-giat", 600, 600, 850, { clearance: { front: 600 } }),
  A("may-giat-cua-tren", "Lavadora carga superior", "Top-load washer", "may-giat", 550, 600, 950, { clearance: { front: 400 } }),
  A("may-say", "Secadora (sobre la lavadora)", "Dryer (stacks on washer)", "may-giat", 600, 600, 850),

  // ── Thiết bị & trang trí ───────────────────────────────────
  A("may-lanh-treo", "Aire acondicionado split de muro", "Wall-mounted AC unit", "may-lanh", 800, 250, 300, { mountHeight: 2500 }),
  A("may-lanh-dung", "Aire acondicionado de piso", "Floor-standing AC", "may-lanh", 500, 350, 1800),
  A("quat-cay", "Ventilador de pie", "Pedestal fan", "quat-cay", 400, 400, 1300),
  A("den-cay", "Lámpara de pie", "Floor lamp", "den-cay", 350, 350, 1600),
  A("cay-canh-nho", "Planta en macetero pequeña", "Potted plant (small)", "cay-canh", 350, 350, 900),
  A("cay-canh-lon", "Planta en macetero grande", "Potted plant (large)", "cay-canh", 550, 550, 1700),
  A("guong-toan-than", "Espejo de cuerpo entero", "Full-length mirror", "guong", 500, 50, 1600, { mountHeight: 200 }),

  // ── Xe (tính chỗ để xe!) ───────────────────────────────────
  A("xe-may", "Scooter", "Scooter", "xe-may", 700, 1900, 1100, { clearance: { sides: 300 } }),
  A("xe-may-so", "Motocicleta", "Motorbike", "xe-may", 650, 1850, 1050, { clearance: { sides: 300 } }),
  A("xe-dap", "Bicicleta", "Bicycle", "xe-dap", 450, 1700, 1000),
  A("o-to-hatchback", "Auto hatchback (estacionamiento)", "Hatchback car (parking spot)", "o-to", 1800, 4000, 1500, { clearance: { front: 600, sides: 500 } }),
  A("o-to-sedan", "Auto sedán (estacionamiento)", "Sedan (parking spot)", "o-to", 1850, 4600, 1500, { clearance: { front: 600, sides: 500 } }),

  // ── Thờ (kích thước rơi cung đẹp thước 38.8 — LBB-04) ──────
  A("ban-tho", "Altar de pie 1,07 m", "Ancestral altar 1.07m", "ban-tho", 1070, 610, 1270, { clearance: { front: 900 } }),
  A("ban-tho-1m53", "Altar de pie 1,53 m", "Ancestral altar 1.53m", "ban-tho", 1530, 810, 1270, { clearance: { front: 900 } }),
  A("ban-tho-treo", "Altar de muro 81 cm", "Wall-mounted altar 81cm", "ban-tho", 810, 480, 610, { mountHeight: 1550 }),
];

// biến thể màu/kiểu phổ biến — cùng kích thước, khác hoàn thiện (đủ ≥100 asset
// mà không bịa kích thước lạ; 3D dùng chung builder, đổi tông màu theo suffix)
const VARIANTS: Array<[string, string, string, string]> = [
  ["giuong-1m6", "-go-soi", " — roble", " — oak"],
  ["giuong-1m6", "-go-oc-cho", " — nogal", " — walnut"],
  ["giuong-1m8", "-go-soi", " — roble", " — oak"],
  ["tu-ao-2m", "-trang", " — blanco", " — milk white"],
  ["tu-ao-2m", "-go-oc-cho", " — nogal", " — walnut"],
  ["tu-ao-1m6", "-trang", " — blanco", " — milk white"],
  ["sofa-3s-01", "-xam", " — tela gris", " — grey fabric"],
  ["sofa-3s-01", "-da-nau", " — cuero café", " — brown leather"],
  ["sofa-goc-l", "-xam", " — tela gris", " — grey fabric"],
  ["ban-an-4", "-go-soi", " — roble", " — oak"],
  ["ban-an-6", "-go-soi", " — roble", " — oak"],
  ["ghe-an", "-den", " — patas metálicas negras", " — black steel legs"],
  ["ke-tv-1600", "-trang", " — blanco", " — milk white"],
  ["ke-tv-2000", "-go-oc-cho", " — nogal", " — walnut"],
  ["ban-lam-viec-1m2", "-trang", " — blanco", " — milk white"],
  ["ke-sach-800", "-trang", " — blanco", " — milk white"],
  ["tu-bep-duoi-24", "-trang", " — blanco brillante", " — gloss white"],
  ["tu-bep-duoi-30", "-xanh-reu", " — verde musgo", " — moss green"],
  ["tu-bep-tren-18", "-trang", " — blanco brillante", " — gloss white"],
  ["ban-tra-chu-nhat", "-da", " — cubierta de piedra", " — stone top"],
];
for (const [baseId, suffix, esSuffix, enSuffix] of VARIANTS) {
  const base = CATALOG.find((a) => a.id === baseId);
  if (base) {
    CATALOG.push({
      ...base,
      id: `${baseId}${suffix}`,
      label: `${base.label}${esSuffix}`,
      labelEn: `${base.labelEn}${enSuffix}`,
    });
  }
}

const byId = new Map(CATALOG.map((a) => [a.id, a]));

export function getAsset(id: string): Asset | undefined {
  return byId.get(id);
}

/** Đăng ký asset ngoài catalog gốc (test, asset tùy biến). */
export function registerAsset(a: Asset): void {
  if (byId.has(a.id)) throw new Error(`la pieza ${a.id} ya existe en el catálogo`);
  CATALOG.push(a);
  byId.set(a.id, a);
}

export function searchAssets(query: string, category?: AssetCategory, maxFootprint?: { w?: number; d?: number }): Asset[] {
  const q = query.trim().toLowerCase();
  return CATALOG.filter((a) => {
    if (category && a.category !== category) return false;
    if (maxFootprint?.w && a.footprint.w > maxFootprint.w) return false;
    if (maxFootprint?.d && a.footprint.d > maxFootprint.d) return false;
    if (!q) return true;
    return `${a.id} ${a.label} ${a.labelEn} ${a.category}`.toLowerCase().includes(q);
  });
}

export const ASSET_CATEGORIES: AssetCategory[] = [...new Set(CATALOG.map((a) => a.category))];
