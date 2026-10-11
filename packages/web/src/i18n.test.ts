import { describe, expect, it } from "vitest";
import { detectLang, DICT_EN_KEYS, DICT_KEYS, translate } from "./i18n.js";
import { CATALOG } from "@arquitecto/core";

describe("i18n del editor — español por defecto, inglés opcional", () => {
  it("los dos diccionarios tienen EXACTAMENTE las mismas claves (sin huérfanas)", () => {
    expect([...DICT_EN_KEYS].sort()).toEqual([...DICT_KEYS].sort());
  });

  it("por defecto español, sin autodetección por país", () => {
    expect(detectLang({})).toBe("es");
    expect(detectLang({ query: null, saved: null })).toBe("es");
  });

  it("la elección manual gana: ?lang > guardado > español; valores raros se ignoran", () => {
    expect(detectLang({ query: "en", saved: "es" })).toBe("en");
    expect(detectLang({ saved: "en" })).toBe("en");
    expect(detectLang({ query: "vi" })).toBe("es"); // el vietnamita ya no existe: se ignora
    expect(detectLang({ query: "xx", saved: "yy" })).toBe("es");
  });

  it("translate() por idioma indicado + parámetros + clave desconocida", () => {
    expect(translate("es", "conn.on")).toBe("en vivo");
    expect(translate("en", "conn.on")).toBe("live");
    expect(translate("es", "note.place", { label: "Sofa" })).toBe("ubicar Sofa");
    expect(translate("en", "note.place", { label: "Sofa" })).toBe("place Sofa");
    expect(translate("es", "no.existe")).toBe("no.existe");
  });

  it("catálogo: labelEn completo para las 106 piezas, realmente en inglés (lo usa ES por ahora)", () => {
    for (const a of CATALOG) {
      expect(a.labelEn, a.id).toBeTruthy();
      expect(a.labelEn.length, a.id).toBeGreaterThan(2);
      expect(/[ăâđêôơưọảếồị]/i.test(a.labelEn), `${a.id}: ${a.labelEn}`).toBe(false);
    }
  });
});
