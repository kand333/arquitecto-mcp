import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadCasaPrueba2p, setDonGia, type DonGia } from "@arquitecto/core";
import { LAYERS } from "./scene.js";
import { buildSheetSet, sheetDxf, sheetSvg } from "./sheets.js";

/** Letras que existen en vietnamita y no en español (se excluyen á é í ó ú ñ ü). */
const VN = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹàèìòùãõ]/i;

const PACKAGES = fileURLToPath(new URL("../../../", import.meta.url));

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    if (["node_modules", "dist", "__tests__", "__snapshots__"].includes(n)) continue;
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) sourceFiles(p, out);
    else if (/\.(ts|mts)$/.test(n) && !n.endsWith(".test.ts")) out.push(p);
  }
  return out;
}

/** Literales de texto ("…", '…', `…`) fuera de comentarios. */
function stringLiterals(src: string): Array<{ line: number; text: string }> {
  const re = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
  const out: Array<{ line: number; text: string }> = [];
  for (let m = re.exec(src); m; m = re.exec(src)) {
    if (m[0].startsWith("//") || m[0].startsWith("/*")) continue;
    out.push({ line: src.slice(0, m.index).split("\n").length, text: m[0] });
  }
  return out;
}

describe("sin vietnamita en los textos controlados por el proyecto", () => {
  it("ningún literal de texto del código de producción (core, server, web, cli) está en vietnamita", () => {
    const hits: string[] = [];
    for (const pkg of ["core/src", "server/src", "web/src", "cli/src"]) {
      for (const f of sourceFiles(path.join(PACKAGES, pkg))) {
        for (const l of stringLiterals(readFileSync(f, "utf8"))) {
          if (VN.test(l.text)) hits.push(`${path.relative(PACKAGES, f)}:${l.line} ${l.text.slice(0, 60)}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });

  it("los packs de reglas y la tabla de precios (rules/*.json) no tienen vietnamita", () => {
    const dir = path.join(PACKAGES, "core/rules");
    const hits = readdirSync(dir)
      .filter((n) => n.endsWith(".json"))
      .filter((n) => VN.test(readFileSync(path.join(dir, n), "utf8")));
    expect(hits).toEqual([]);
  });

  describe("juego de láminas generado (SVG + DXF)", () => {
    const PRECIOS: Partial<DonGia> = {
      don_gia_m2: { xay_tho: { label: "Obra gruesa", monto: 10 }, hoan_thien: { "trung-binh-kha": { label: "Terminaciones medias", monto: 5 } } },
    } as Partial<DonGia>;
    beforeEach(() => setDonGia(PRECIOS));
    afterEach(() => setDonGia(null));

    it("textos, códigos de lámina y capas en español", () => {
      const set = buildSheetSet(loadCasaPrueba2p(), { date: "11/10/2026" });
      expect(set.sheets.map((s) => s.id)).toContain("estimate");
      for (const s of set.sheets) {
        expect(s.no).toMatch(/^ARQ-\d{2}$/);
        expect(s.fileBase).toMatch(/^arq-\d{2}-[a-z0-9-]+$/);
        const texts = [...sheetSvg(s, false).matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]!);
        expect(texts.filter((t) => VN.test(t)), s.no).toEqual([]);
        if (s.hasModel) expect(VN.test(sheetDxf(s)), `${s.no} DXF`).toBe(false);
      }
      expect([...LAYERS]).toEqual(["CALCO", "EJES", "MUROS-CORTE", "MUROS-VISTA", "VANOS", "ESCALERAS", "TECHUMBRE", "MOBILIARIO", "COTAS", "TEXTOS", "ACHURADOS", "VINETA"]);
    });

    it("la viñeta lleva escala, fecha, firmas de arquitecto y propietario (OGUC 1.2.2) y norte «N»", () => {
      const plan = buildSheetSet(loadCasaPrueba2p(), { date: "11/10/2026", sheets: ["plan-L1"] }).sheets[0]!;
      const svg = sheetSvg(plan, false);
      for (const t of ["ARQ-01", "PLANTA PISO 1", "ESCALA 1:50", "Fecha: 11/10/2026", "Arquitecto (nombre y firma)", "Propietario (nombre y firma)", "OGUC art. 1.2.2", ">N<"]) {
        expect(svg, t).toContain(t);
      }
    });
  });
});
