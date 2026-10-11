import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { loadBietThuDoc, loadNhaCap4, loadNhaOng4x16 } from "../../src/fixture.js";
import { pointInPolygon } from "../../src/geometry/polygon.js";
import { openingSidePoints } from "../../src/geometry/wall.js";
import { getWall } from "../../src/model.js";
import { std09 } from "../../src/validate/evaluators-std.js";
import type { Issue } from "../../src/issues.js";
import type { Project } from "../../src/types.js";
import { validateProject } from "../../src/validate/engine.js";
import { activeRules, getRegion, unverifiedRules, type RuleDef } from "../../src/validate/rules.js";

// ── E4: pack Chile (OGUC) — fuentes en docs/oguc-sources.md ─────────

const here = path.dirname(fileURLToPath(import.meta.url));
const readPack = (f: string): RuleDef[] => (JSON.parse(readFileSync(path.join(here, "..", f), "utf8")) as { rules: RuleDef[] }).rules;
/** Ambos packs chilenos (cl-oguc + cl-cip) responden a la misma tabla de docs/oguc-sources.md. */
const pack = { rules: [...readPack("cl.json"), ...readPack("cl-cip.json")] };
const CIP_IDS = ["CL-CIP-ALT", "CL-CIP-ANT", "CL-CIP-COS", "CL-CIP-DIS", "CL-CIP-FON", "CL-CIP-PIS"];
const docs = readFileSync(path.join(here, "..", "..", "..", "..", "docs", "oguc-sources.md"), "utf8");
/** Filas de la tabla «Reglas» del doc: `| \`CL-…\` | …`. */
const docRows = new Map([...docs.matchAll(/^\| `(CL-[A-Z0-9-]+)` \|(.*)$/gm)].map((m) => [m[1]!, m[2]!]));

const chile = (p: Project = loadNhaCap4()): Project => {
  p.config = { ...p.config, region: "cl" };
  return p;
};
const hits = (issues: Issue[], rule: string, room?: string): Issue[] =>
  issues.filter((i) => i.rule === rule && (!room || i.entities.includes(room)));
const indet = (issues: Issue[], forRule: string, room: string): Issue[] =>
  hits(issues, "CL-INDET", room).filter((i) => i.message.includes(forRule));

describe("E4 — trazabilidad: cl.json ↔ docs/oguc-sources.md", () => {
  it("los IDs del pack y de la tabla del doc coinciden exactamente", () => {
    expect([...docRows.keys()].sort()).toEqual(pack.rules.map((r) => r.id).sort());
  });

  it("el estado de validación del JSON coincide con el doc (pendiente ↔ verified:false)", () => {
    for (const r of pack.rules) {
      if (!r.source) continue;
      const row = docRows.get(r.id)!;
      if (r.source.verified) expect(row, r.id).toMatch(/validada por el usuario/);
      else expect(row, r.id).toMatch(/pendiente de validación del usuario/);
    }
  });

  it("cada regla normativa cita un artículo de la OGUC", () => {
    for (const r of pack.rules.filter((x) => x.source)) {
      expect(r.source!.vanBan, r.id).toMatch(/OGUC/);
      expect(r.source!.dieu, r.id).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });
});

describe("E4 — región cl: solo GEO + OGUC; lo pendiente no se presenta como verificado", () => {
  it("la región cl existe con ambos packs, sin moneda (presupuesto solo cantidades hasta E4b-2)", () => {
    expect(getRegion("cl")).toMatchObject({ id: "cl", packs: ["cl-oguc", "cl-cip"] });
    expect(getRegion("cl")!.currency).toBeUndefined();
  });

  it("un proyecto cl no ve reglas VN/UK/genéricas; CL-VEN-02 (planned) no corre", () => {
    const ids = activeRules(chile()).map((r) => r.id);
    expect(ids.every((id) => id.startsWith("GEO-") || id.startsWith("CL-"))).toBe(true);
    expect(ids).toEqual(expect.arrayContaining(["CL-ALT-01", "CL-VEN-01", "CL-INDET"]));
    expect(ids).not.toContain("CL-VEN-02");
    expect(validateProject(chile()).some((i) => i.rule === "CL-VEN-02")).toBe(false);
  });

  it("las reglas activas sin validar se reportan como tales (unverifiedRules) y su mensaje lo dice", () => {
    expect(unverifiedRules(chile()).map((r) => r.id).sort()).toEqual(["CL-ALT-01", ...CIP_IDS, "CL-VEN-01"].sort());
    for (const r of pack.rules.filter((x) => x.source?.verified === false)) expect(r.message, r.id).toMatch(/sin validar/);
  });
});

describe("E4 — CL-ALT-01 (OGUC 4.1.1, altura piso a cielo ≥ 2,30 m en locales habitables)", () => {
  it("positivo: dormitorio con 3,6 m de altura libre no genera hallazgo ni indeterminado", () => {
    const out = validateProject(chile());
    expect(hits(out, "CL-ALT-01", "R2")).toEqual([]);
    expect(indet(out, "CL-ALT-01", "R2")).toEqual([]);
  });

  it("negativo: altura de piso 2,20 m → error en los habitables, no en baño/bodega/pasillo", () => {
    const p = chile();
    p.levels[0]!.height = 2200;
    const out = validateProject(p);
    for (const room of ["R1", "R2", "R5"]) {
      const h = hits(out, "CL-ALT-01", room);
      expect(h, room).toHaveLength(1);
      expect(h[0]!.severity).toBe("error");
      expect(h[0]!.message).toContain("2300");
    }
    for (const room of ["R3", "R6", "R7"]) expect(hits(out, "CL-ALT-01", room), room).toEqual([]);
  });

  it("indeterminado: uso ambiguo (cocina + comedor) → CL-INDET info, nunca un pase silencioso", () => {
    const out = validateProject(chile());
    expect(hits(out, "CL-ALT-01", "R4")).toEqual([]);
    const i = indet(out, "CL-ALT-01", "R4");
    expect(i).toHaveLength(1);
    expect(i[0]!.severity).toBe("info");
    expect(i[0]!.message).toContain("No se declara cumplimiento");
  });

  it("indeterminado: falta la losa del piso superior → no se asume espesor", () => {
    const p = chile(loadBietThuDoc());
    p.slabs = p.slabs.filter((s) => !(s.level === "L2" && s.kind === "floor"));
    const out = validateProject(p);
    expect(hits(out, "CL-ALT-01", "R1")).toEqual([]);
    expect(indet(out, "CL-ALT-01", "R1")[0]?.message).toMatch(/losa superior/);
  });
});

describe("E4 — CL-VEN-01 (OGUC 4.1.2, al menos una ventana al exterior en locales habitables)", () => {
  it("positivo: los habitables de la plantilla tienen ventana al exterior", () => {
    const out = validateProject(chile());
    for (const room of ["R1", "R2", "R5"]) expect(hits(out, "CL-VEN-01", room), room).toEqual([]);
  });

  it("negativo: sin ventanas → error en cada habitable; el ambiguo sigue indeterminado", () => {
    const p = chile();
    p.openings = p.openings.filter((o) => o.kind !== "window");
    const out = validateProject(p);
    for (const room of ["R1", "R2", "R5"]) {
      const h = hits(out, "CL-VEN-01", room);
      expect(h, room).toHaveLength(1);
      expect(h[0]!.severity).toBe("error");
    }
    expect(hits(out, "CL-VEN-01", "R4")).toEqual([]);
    expect(indet(out, "CL-VEN-01", "R4")).toHaveLength(1);
  });

  it("indeterminado: uso ambiguo → CL-INDET info", () => {
    const i = indet(validateProject(chile()), "CL-VEN-01", "R4");
    expect(i).toHaveLength(1);
    expect(i[0]!.severity).toBe("info");
  });

  it("negativo: la luz que llega solo por el vano de la escalera NO cuenta como ventana (a diferencia de STD-09)", () => {
    // nha-ong-4x16: R2 es el único recinto adyacente a la escalera R6, que tiene vano en la losa superior.
    // Se usa como living (habitable) para tener el caso que STD-09 da por iluminado vía la escalera.
    const p = chile(loadNhaOng4x16());
    const living = p.rooms.find((r) => r.id === "R2")!;
    living.use = "khach";
    // quitar toda ventana que dé a R1
    p.openings = p.openings.filter((o) => {
      if (o.kind !== "window") return true;
      const w = getWall(p, o.wall);
      if (!w || w.level !== living.level) return true;
      const [pa, pb] = openingSidePoints(w, o);
      return !pointInPolygon(pa, living.polygon) && !pointInPolygon(pb, living.polygon);
    });
    // precondición: STD-09 sigue dando a R1 por iluminado vía el vano de la escalera
    expect(std09(p).some((f) => f.entities.includes("R2"))).toBe(false);
    // CL-VEN-01 (OGUC 4.1.2 exige una ventana al exterior) sí lo marca
    const h = hits(validateProject(p), "CL-VEN-01", "R2");
    expect(h).toHaveLength(1);
    expect(h[0]!.severity).toBe("error");
  });
});

// ── E4b-1: pack cl-cip (OGUC 1.4.4 n°5 — valores declarados del CIP) ──

describe("E4b — cl-cip: normas urbanísticas del CIP declaradas por el usuario", () => {
  const errs = (p: Project, rule: string): Issue[] => hits(validateProject(p), rule).filter((i) => i.severity === "error");
  const cipIndet = (p: Project, rule: string): Issue[] =>
    validateProject(p).filter((i) => i.rule === "CL-INDET" && i.message.includes(rule));

  it("positivo: valores del CIP declarados y respetados → sin error ni indeterminado", () => {
    const villa = chile(loadBietThuDoc()); // pisos 3, altura 12000, ocupación 60 %, distanciamientos por deslinde
    for (const rule of ["CL-CIP-PIS", "CL-CIP-ALT", "CL-CIP-COS", "CL-CIP-DIS"]) {
      expect(errs(villa, rule), rule).toEqual([]);
      expect(cipIndet(villa, rule), rule).toEqual([]);
    }
    const casa = chile(); // antejardín 1500 declarado
    expect(errs(casa, "CL-CIP-ANT")).toEqual([]);
    expect(cipIndet(casa, "CL-CIP-ANT")).toEqual([]);
  });

  it("negativo: cada valor declarado y excedido → error de su regla", () => {
    const qh = (p: Project) => (p.brief.dat!.quy_hoach ??= {});
    const villa = (mut: (p: Project) => void): Project => { const p = chile(loadBietThuDoc()); mut(p); return p; };
    expect(errs(villa((p) => (qh(p).tang_max = 1)), "CL-CIP-PIS")).toHaveLength(1);
    expect(errs(villa((p) => (qh(p).chieu_cao_max = 1000)), "CL-CIP-ALT")).toHaveLength(1);
    expect(errs(villa((p) => (qh(p).mat_do_max = 1)), "CL-CIP-COS")).toHaveLength(1);
    expect(errs(villa((p) => (p.site.edges = p.site.edges!.map((e) => ({ ...e, setback: 100_000 })))), "CL-CIP-DIS").length).toBeGreaterThan(0);
    const casa = (mut: (p: Project) => void): Project => { const p = chile(); mut(p); return p; };
    expect(errs(casa((p) => (qh(p).khoang_lui_truoc = 100_000)), "CL-CIP-ANT").length).toBeGreaterThan(0);
    expect(errs(casa((p) => (qh(p).khoang_lui_sau = 100_000)), "CL-CIP-FON").length).toBeGreaterThan(0);
  });

  it("indeterminado: sin datos del CIP → un CL-INDET por regla, nunca «cumple»", () => {
    const p = chile();
    p.brief = {};
    delete p.site.setbacks;
    delete p.site.edges;
    const out = validateProject(p);
    for (const rule of CIP_IDS) {
      expect(hits(out, rule), rule).toEqual([]);
      const i = out.filter((x) => x.rule === "CL-INDET" && x.message.includes(rule));
      expect(i, rule).toHaveLength(1);
      expect(i[0]!.severity).toBe("info");
      expect(i[0]!.message).toMatch(/CIP|losa/);
    }
  });

  it("indeterminado: ocupación declarada pero sin losa del primer piso → no se calcula", () => {
    const p = chile();
    p.slabs = p.slabs.filter((s) => !(s.level === "L1" && s.kind === "floor"));
    expect(hits(validateProject(p), "CL-CIP-COS")).toEqual([]);
    expect(cipIndet(p, "CL-CIP-COS")[0]?.message).toMatch(/losa del primer piso/);
  });
});
