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
const pack = JSON.parse(readFileSync(path.join(here, "..", "cl.json"), "utf8")) as { rules: RuleDef[] };
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
  it("la región cl existe, sin moneda (presupuesto solo cantidades hasta E4b)", () => {
    expect(getRegion("cl")).toMatchObject({ id: "cl", packs: ["cl-oguc"] });
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
    expect(unverifiedRules(chile()).map((r) => r.id).sort()).toEqual(["CL-ALT-01", "CL-VEN-01"]);
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
