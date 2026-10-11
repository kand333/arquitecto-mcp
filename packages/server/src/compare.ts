import { areaM2, estimateCost, formatMonto, type DonGia, type Project } from "@arquitecto/core";
import { renderPlanSvg } from "./render/render.js";

/**
 * So sánh phương án A/B (backlog v2 → 13/07/2026): diff hai model + trang
 * HTML đặt hai mặt bằng cạnh nhau. Diff nói bằng thứ gia chủ quan tâm:
 * phòng nào rộng ra/hẹp lại bao nhiêu m², và MỖI PHƯƠNG ÁN TỐN BAO NHIÊU TIỀN.
 */

export type VariantSide = { label: string; model: Project };

export type RoomDiff = {
  id: string;
  name: string;
  level: string;
  a_m2: number | null; // null = phương án đó không có phòng này
  b_m2: number | null;
};

/** presupuesto null = sin tabla o precios por completar (no se compara). */
type Side = { label: string; tongPhong_m2: number; walls: number; openings: number; furniture: number; presupuesto: number | null; tabla: DonGia | null };

export type CompareReport = {
  a: Side;
  b: Side;
  rooms: RoomDiff[];
  /** Các dòng đáng nói nhất — nuôi text cho Claude + phần "khác biệt chính" trên trang. */
  highlights: string[];
};

const r1 = (v: number): number => Math.round(v * 10) / 10;

function sideStats(label: string, p: Project): Side {
  const e = estimateCost(p);
  return {
    label,
    tongPhong_m2: r1(p.rooms.reduce((s, r) => s + areaM2(r.polygon), 0)),
    walls: p.walls.length,
    openings: p.openings.length,
    furniture: p.furniture.length,
    presupuesto: e.total,
    tabla: e.tabla,
  };
}

export function compareProjects(a: VariantSide, b: VariantSide): CompareReport {
  const rooms = new Map<string, RoomDiff>();
  for (const r of a.model.rooms) {
    rooms.set(r.id, { id: r.id, name: r.name, level: r.level, a_m2: r1(areaM2(r.polygon)), b_m2: null });
  }
  for (const r of b.model.rooms) {
    const cur = rooms.get(r.id);
    if (cur) {
      cur.b_m2 = r1(areaM2(r.polygon));
      if (!cur.name) cur.name = r.name;
    } else {
      rooms.set(r.id, { id: r.id, name: r.name, level: r.level, a_m2: null, b_m2: r1(areaM2(r.polygon)) });
    }
  }
  const numOf = (id: string): number => Number(/\d+/.exec(id)?.[0] ?? 0);
  const roomList = [...rooms.values()].sort(
    (x, y) => x.level.localeCompare(y.level) || numOf(x.id) - numOf(y.id) || x.id.localeCompare(y.id),
  );

  const sa = sideStats(a.label, a.model);
  const sb = sideStats(b.label, b.model);

  const highlights: string[] = [];
  for (const r of roomList) {
    if (r.a_m2 == null) highlights.push(`${r.name} (${r.id}, ${r.level}): solo existe en ${sb.label} — ${r.b_m2}m²`);
    else if (r.b_m2 == null) highlights.push(`${r.name} (${r.id}, ${r.level}): solo existe en ${sa.label} — ${r.a_m2}m²`);
    else if (Math.abs(r.a_m2 - r.b_m2) >= 0.3) {
      const d = r1(r.b_m2 - r.a_m2);
      highlights.push(`${r.name} (${r.id}): ${r.a_m2}m² → ${r.b_m2}m² (${d > 0 ? "+" : ""}${d}m²)`);
    }
  }
  // diferencia de presupuesto: solo si ambos lados tienen total y difieren más de un 1 %
  if (sa.presupuesto != null && sb.presupuesto != null && sa.tabla) {
    const dTien = sb.presupuesto - sa.presupuesto;
    if (Math.abs(dTien) > 0.01 * Math.max(Math.abs(sa.presupuesto), Math.abs(sb.presupuesto))) {
      highlights.push(`Presupuesto: ${formatMonto(sa.presupuesto, sa.tabla)} → ${formatMonto(sb.presupuesto, sa.tabla)} (${dTien > 0 ? "más caro" : "más barato"} ~${formatMonto(Math.abs(dTien), sa.tabla)})`);
    }
  }
  if (sa.furniture !== sb.furniture) highlights.push(`Mobiliario: ${sa.furniture} → ${sb.furniture} piezas`);
  if (highlights.length === 0) highlights.push("Las dos alternativas son prácticamente iguales en recintos y costo.");

  return { a: sa, b: sb, rooms: roomList, highlights };
}

/** Monto legible o «—» si no hay total (sin tabla o precios por completar). */
export const money = (v: number | null, tabla: DonGia | null): string => (v == null || !tabla ? "—" : formatMonto(v, tabla));

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Trang so sánh server-render — hai mặt bằng CẠNH NHAU + bảng diff.
 * Dùng cho browser (route /so-sanh) lẫn chụp PNG trả Claude (variant_compare).
 */
export function compareHtml(a: VariantSide, b: VariantSide, levelId: string, projectName: string): string {
  const report = compareProjects(a, b);
  const svgA = renderPlanSvg(a.model, levelId, { embedFont: false }).svg;
  const svgB = renderPlanSvg(b.model, levelId, { embedFont: false }).svg;

  const roomRows = report.rooms
    .map((r) => {
      const d = r.a_m2 != null && r.b_m2 != null ? r1(r.b_m2 - r.a_m2) : null;
      const delta = d == null ? "—" : d === 0 ? "0" : `${d > 0 ? "+" : ""}${d}`;
      const mark = d != null && Math.abs(d) >= 0.3 ? ' class="doi"' : "";
      return `<tr${mark}><td>${esc(r.id)}</td><td>${esc(r.name)}</td><td>${esc(r.level)}</td>` +
        `<td class="so">${r.a_m2 ?? "—"}</td><td class="so">${r.b_m2 ?? "—"}</td><td class="so">${delta}</td></tr>`;
    })
    .join("");

  const tongRow =
    `<tr class="tong"><td></td><td>SUPERFICIE TOTAL DE RECINTOS</td><td></td>` +
    `<td class="so">${report.a.tongPhong_m2}</td><td class="so">${report.b.tongPhong_m2}</td>` +
    `<td class="so">${r1(report.b.tongPhong_m2 - report.a.tongPhong_m2)}</td></tr>` +
    `<tr class="tong"><td></td><td>PRESUPUESTO PRELIMINAR</td><td></td>` +
    `<td class="so">${money(report.a.presupuesto, report.a.tabla)}</td><td class="so">${money(report.b.presupuesto, report.b.tabla)}</td>` +
    `<td class="so">${report.a.presupuesto != null && report.b.presupuesto != null ? money(report.b.presupuesto - report.a.presupuesto, report.a.tabla) : "—"}</td></tr>`;

  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Comparación de alternativas — ${esc(projectName)}</title>
<style>
  body{margin:0;padding:16px 20px;background:#14171b;color:#e9e6df;font:13px "Be Vietnam Pro","Segoe UI",system-ui,sans-serif}
  h1{font-size:15px;font-weight:700;margin:0 0 2px}
  .sub{color:#98a1ac;font-size:11px;margin-bottom:12px}
  .cols{display:flex;gap:14px}
  .pane{flex:1;min-width:0}
  .pane h2{font-size:12px;font-weight:700;margin:0 0 6px;color:#6ea0d8;text-transform:uppercase;letter-spacing:.08em}
  .pane .khi{color:#98a1ac;font-weight:400;text-transform:none;letter-spacing:0}
  .paper{background:#fff;border-radius:6px;box-shadow:0 8px 28px rgba(0,0,0,.5);overflow:hidden}
  .paper svg{display:block;width:100%;height:auto}
  table{border-collapse:collapse;width:100%;margin-top:14px;font-size:12px}
  th,td{padding:4px 8px;text-align:left;border-bottom:1px solid #343b46}
  th{color:#98a1ac;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.1em}
  td.so,th.so{text-align:right;font-family:Consolas,ui-monospace,monospace}
  tr.doi td{color:#d9a441}
  tr.tong td{font-weight:700;border-top:2px solid #343b46}
  .hl{margin-top:12px;padding:10px 12px;border:1px solid #343b46;border-left:3px solid #6ea0d8;border-radius:6px}
  .hl b{color:#6ea0d8;font-size:11px;text-transform:uppercase;letter-spacing:.08em}
  .hl ul{margin:6px 0 0;padding-left:18px;line-height:1.55}
</style></head><body>
<h1>COMPARACIÓN DE ALTERNATIVAS — ${esc(projectName)}</h1>
<div class="sub">Planta ${esc(levelId)} · A = ${esc(report.a.label)} · B = ${esc(report.b.label)}</div>
<div class="cols">
  <div class="pane"><h2>A · ${esc(report.a.label)} <span class="khi">${report.a.walls} muros · ${report.a.openings} vanos · ${report.a.furniture} muebles</span></h2><div class="paper">${svgA}</div></div>
  <div class="pane"><h2>B · ${esc(report.b.label)} <span class="khi">${report.b.walls} muros · ${report.b.openings} vanos · ${report.b.furniture} muebles</span></h2><div class="paper">${svgB}</div></div>
</div>
<div class="hl"><b>Diferencias principales</b><ul>${report.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
<table>
  <tr><th>ID</th><th>Recinto</th><th>Piso</th><th class="so">A (m²)</th><th class="so">B (m²)</th><th class="so">Δ</th></tr>
  ${roomRows}
  ${tongRow}
</table>
</body></html>`;
}
