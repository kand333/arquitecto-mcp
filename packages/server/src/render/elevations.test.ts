import { describe, expect, it } from "vitest";
import { applyOps, loadCasa1Piso, type Op, type Point, type Project } from "@arquitecto/core";
import { buildElevationsScene, elevationViews, projectElevation } from "./elevations.js";
import { sceneToDxf } from "./dxf-writer.js";

/** casa-1-piso: rectángulo 8×12 m, cumbrera en y (el frente sur ve el frontón), zinc a 20°. */
function casa(extra: Op[] = []): Project {
  const p = loadCasa1Piso();
  if (!extra.length) return p;
  const r = applyOps(p, p.meta.revision, extra);
  if (!r.ok) throw new Error(JSON.stringify(r.errors));
  return r.project;
}
const TINGLADO: Op = { op: "add", entity: "finish", data: { id: "FE", label: "Tinglado de madera exterior", scope: "exterior", material: "tinglado" } };

type Line = { layer: string; a: Point; b: Point; dataId?: string };
const lines = (items: Array<{ layer: string; prim: { kind: string }; dataId?: string }>): Line[] =>
  items.filter((i) => i.prim.kind === "line").map((i) => ({ layer: i.layer, ...(i.prim as unknown as { a: Point; b: Point }), ...(i.dataId ? { dataId: i.dataId } : {}) }));

describe("Elevaciones — estándar de 4 caras", () => {
  it("nombra las 4 caras por punto cardinal desde site.north (el frente primero)", () => {
    expect(elevationViews(casa()).map((v) => v.name)).toEqual(["ELEVACIÓN SUR", "ELEVACIÓN ORIENTE", "ELEVACIÓN NORTE", "ELEVACIÓN PONIENTE"]);
    const girada = casa();
    girada.site.north = 90; // el norte apunta a −x: el frente (−y) mira al poniente
    expect(elevationViews(girada)[0]!.name).toBe("ELEVACIÓN PONIENTE");
  });

  it("cada cara muestra solo sus vanos; los tabiques interiores quedan ocultos", () => {
    const p = casa();
    const sur = projectElevation(p, elevationViews(p)[0]!);
    const ids = new Set(sur.items.map((i) => i.dataId).filter(Boolean));
    for (const id of ["D1", "S1", "S2"]) expect(ids.has(id)).toBe(true);
    for (const id of ["D2", "S4", "S5"]) expect(ids.has(id)).toBe(false); // interior, oriente, norte
    // W5 (x = 5945, tabique que llega a la fachada sur) no deja líneas verticales en la fachada
    const vert = lines(sur.items).filter((l) => Math.abs(l.a[0] - l.b[0]) < 1 && Math.abs(l.a[1] - l.b[1]) > 1000);
    expect(vert.some((l) => Math.abs(l.a[0] - 5890) < 2 || Math.abs(l.a[0] - 6000) < 2)).toBe(false);
  });

  it("tinglado: líneas cada 16 cm si la terminación exterior lo es, sin pasar por los vanos; liso si no", () => {
    expect(lines(projectElevation(casa(), elevationViews(casa())[0]!).items).filter((l) => l.layer === "ACHURADOS")).toHaveLength(0);
    const p = casa([TINGLADO]);
    const sur = lines(projectElevation(p, elevationViews(p)[0]!).items).filter((l) => l.layer === "ACHURADOS");
    const zs = [...new Set(sur.map((l) => Math.round(l.a[1])))].sort((a, b) => a - b);
    expect(zs.length).toBeGreaterThan(20); // muro de 3,60 m + frontón
    expect(zs.every((z) => z % 160 === 0)).toBe(true);
    // S1: x 3600–5000, z 900–2300 → ningún tramo de tinglado lo cruza
    expect(sur.some((l) => l.a[1] > 900 && l.a[1] < 2300 && Math.min(l.a[0], l.b[0]) < 4900 && Math.max(l.a[0], l.b[0]) > 3700)).toBe(false);
  });

  it("zinc: nervios en las caras laterales; en los frontones, el rótulo de pendiente 36 %", () => {
    const p = casa();
    const [sur, oriente] = elevationViews(p).map((v) => projectElevation(p, v));
    // nervios: verticales sobre el muro (las bajadas de aguas lluvias también son verticales, pero bajo el alero)
    const ribs = (g: typeof sur) => lines(g!.items).filter((l) => l.layer === "TECHUMBRE" && Math.abs(l.a[0] - l.b[0]) < 1 && Math.min(l.a[1], l.b[1]) >= 3600 && Math.abs(l.a[1] - l.b[1]) > 300);
    expect(ribs(oriente).length).toBeGreaterThan(50); // faldón de 13 m cada 16 cm
    expect(ribs(sur)).toHaveLength(0);
    const texts = buildElevationsScene(p).items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    expect(texts.filter((t) => t === "PENDIENTE 36%")).toHaveLength(4); // 2 frontones × 2 faldones
  });

  it("lámina: 4 títulos, niveles N.P.T./N.T., cotas DIMENSION y capas en el DXF", () => {
    const b = buildElevationsScene(casa([TINGLADO]), { date: "13/10/2026" });
    const texts = b.items.filter((i) => i.prim.kind === "text").map((i) => (i.prim as { text: string }).text);
    for (const c of ["SUR", "ORIENTE", "NORTE", "PONIENTE"]) expect(texts).toContain(`ELEVACIÓN ${c} Esc 1/${b.tf.scale}`);
    expect(texts).toContain("±0.00 N.P.T.");
    expect(texts).toContain("−0.20 N.T.");
    expect(texts.some((t) => t.startsWith("Revestimiento exterior: Tinglado"))).toBe(true);
    expect(b.tf.rotated).toBe(false);
    const dxf = sceneToDxf(b.items, { scale: b.tf.scale });
    expect(dxf).toContain("DIMENSION");
    expect(dxf).toContain("ACHURADOS");
    expect(dxf).toContain("TECHUMBRE");
  });

  it("sin muros no hay elevaciones", () => {
    const p = casa();
    p.walls = [];
    expect(() => buildElevationsScene(p)).toThrow(/muros/);
  });
});
