import { describe, expect, it } from "vitest";
import { applyOps, loadCasa1Piso, type Op, type Project } from "@arquitecto/core";
import { buildSectionsScene } from "./section-scene.js";
import { buildPlanScene, sectionCuts } from "./plan-scene.js";
import { buildModel } from "./elevations.js";
import { sceneToDxf } from "./dxf-writer.js";

/** casa-1-piso (cumbrera en y) con estructura de madera, tinglado y zinc. */
function madera(): Project {
  const p = loadCasa1Piso();
  const ops: Op[] = [
    { op: "add", entity: "finish", data: { id: "FE", label: "Tinglado de madera exterior", scope: "exterior", material: "tinglado" } },
    { op: "add", entity: "finish", data: { id: "FS", label: "Estructura de madera", scope: "structure", material: "madera" } },
    { op: "update", entity: "roof", id: "RF1", data: { material: "zinc", thickness: 150 } },
  ];
  const r = applyOps(p, p.meta.revision, ops);
  if (!r.ok) throw new Error(JSON.stringify(r.errors));
  return r.project;
}

const texts = (items: Array<{ prim: { kind: string } }>): string[] =>
  items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);

describe("Cortes A-A' y B-B' — estándar en una lámina", () => {
  it("A-A' corta la cumbrera (transversal) y B-B' corre paralelo a ella", () => {
    const [a, b] = sectionCuts(madera());
    expect(a).toMatchObject({ name: "A", axis: "y" }); // cumbrera en y → plano y = cte
    expect(b).toMatchObject({ name: "B", axis: "x" });
  });

  it("una lámina con los 2 cortes, su título y la escala mayor que cabe", () => {
    const b = buildSectionsScene(madera());
    const t = texts(b.items);
    expect(b.meta.title).toBe("CORTES A-A' Y B-B'");
    expect(t).toContain(`CORTE A-A' Esc 1/${b.tf.scale}`);
    expect(t).toContain(`CORTE B-B' Esc 1/${b.tf.scale}`);
    expect([50, 100]).toContain(b.tf.scale);
  });

  it("madera: cerchas @75 cm máx. y costaneras; rótulos y detalle del muro UNA vez por lámina", () => {
    const p = madera();
    const { m } = buildModel(p);
    const ts = m.wood!.trussT;
    expect(ts.length).toBeGreaterThan(10);
    for (let i = 1; i < ts.length; i++) expect(ts[i]! - ts[i - 1]!).toBeLessThanOrEqual(750);
    expect(m.boxes.filter((x) => x.kind === "costanera").length).toBeGreaterThan(10);

    const t = texts(buildSectionsScene(p).items);
    expect(t.filter((x) => x === "DETALLE MURO e=10 cm Esc 1/5")).toHaveLength(1);
    for (const note of ['CERCHA 2 PIEZAS PINO IPV 1"x4" @75 cm máx.', 'COSTANERA PINO IPV 2"x2" @40 cm', "LANA DE VIDRIO 100 mm (11 kg/m³) SOBRE CIELO"]) {
      expect(t.filter((x) => x === note)).toHaveLength(1);
    }
  });

  it("muro de madera cortado: soleras y cadenetas @50 cm como cajas con X (sin relleno)", () => {
    const p = madera();
    const b = buildSectionsScene(p);
    // W8 (tabique de 11 cm, de madera) cortado por A-A': piezas con X de 5 cm de alto
    const w8 = b.items.filter((i) => i.dataId === "W8" && i.prim.kind === "polyline");
    const boxes = w8.filter((i) => {
      const zs = (i.prim as { pts: Array<[number, number]> }).pts.map((q) => q[1]);
      return Math.abs(Math.max(...zs) - Math.min(...zs) - 50) < 0.5;
    });
    expect(boxes.length).toBeGreaterThanOrEqual(7); // solera inferior + 5 cadenetas + solera doble (muro de 3,60)
    expect(b.items.some((i) => i.dataId === "W8" && i.prim.kind === "polygon")).toBe(false);
  });

  it("sin madera el corte no lleva rótulos ni detalle; la planta muestra A-A' y B-B'", () => {
    const p = loadCasa1Piso();
    const t = texts(buildSectionsScene(p).items);
    expect(t.some((x) => x.startsWith("DETALLE MURO"))).toBe(false);
    expect(t.some((x) => x.startsWith("CERCHA"))).toBe(false);
    const plan = texts(buildPlanScene(p, "L1").items);
    for (const l of ["A", "A'", "B", "B'"]) expect(plan).toContain(l);
  });

  it("DXF: solo contornos, cotas DIMENSION y la madera en capas propias", () => {
    const b = buildSectionsScene(madera());
    const dxf = sceneToDxf(b.items, { scale: b.tf.scale });
    expect(dxf).toContain("DIMENSION");
    expect(dxf).toContain("\nTECHUMBRE\n");
    expect(dxf).toContain("\nACHURADOS\n");
  });
});
