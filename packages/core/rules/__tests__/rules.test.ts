import { describe, expect, it } from "vitest";
import { loadCasa1Piso, loadCasa2Pisos, loadCasaPrueba2p, loadDepto2d, loadDetachedUk } from "../../src/fixture.js";
import { applyOps } from "../../src/ops/apply.js";
import { estimateCost } from "../../src/estimate.js";
import type { Issue, Severity } from "../../src/issues.js";
import type { Project } from "../../src/types.js";
import { validateProject } from "../../src/validate/engine.js";
import { activeRules, getPack, getRegion, packsFor, registerPack, unverifiedRules, type RulePack } from "../../src/validate/rules.js";

/** Mutación → validate; la regla debe saltar donde se infringe y callar en la fixture limpia. */
function violate(mutate: (p: Project) => void): Issue[] {
  const p = loadCasaPrueba2p();
  mutate(p);
  return validateProject(p);
}

function expectRule(issues: Issue[], rule: string, severity?: Severity): Issue {
  const found = issues.find((i) => i.rule === rule && (severity === undefined || i.severity === severity));
  expect(found, `se esperaba ${rule}${severity ? `/${severity}` : ""} en: ${issues.map((i) => `${i.rule}/${i.severity}`).join(", ") || "(vacío)"}`).toBeDefined();
  return found!;
}

/** Golden: sin hallazgos de severidad block/error/warn (los CL-INDET informativos son esperables). */
const serious = (issues: Issue[]): Issue[] => issues.filter((i) => i.severity !== "info");

/**
 * Pack de TEST (región "lib"): reutiliza los parámetros de referencia del upstream solo para seguir
 * probando la biblioteca de evaluadores STD-* y PLN-06 (que ningún pack chileno usa todavía).
 * NO es una norma: no tiene `source` y no se registra fuera de este archivo.
 */
const LIB: RulePack = {
  id: "test-lib",
  title: "Pack de test de evaluadores",
  kind: "standard",
  region: "lib",
  rules: [
    { id: "STD-01", title: "Superficie mínima", severity: "warn", params: { ngu_don: 9, ngu_doi: 12, khach: 13, bep_an: 12, wc: 3, kho: 3 }, message: "Recinto {ten} ({room}) {area}m², mínimo {min}m² ({loai})." },
    { id: "STD-02", title: "Ancho mínimo", severity: "warn", params: { min: 2100 }, message: "Recinto {ten} ({room}) ancho {width}mm < {min}mm." },
    { id: "STD-03", title: "Altura libre", severity: "error", params: { phong_o: 2600, bep_an: 2600, wc: 2300, kho: 2200 }, message: "{ten} ({room}): altura libre en {level} = {clear}mm < {min}mm." },
    { id: "STD-04", title: "Pasillo", severity: "error", params: { min: 1000 }, message: "Pasillo {ten} ({room}) ancho {width}mm < {min}mm." },
    { id: "STD-05", title: "Puertas", severity: "error", params: { chinh: 800, chinh_khuyen: 900, phong: 700, wc: 600 }, message: "Puerta {opening} ({loai}) ancho {width}mm < {min}mm." },
    { id: "STD-06", title: "Escalera", severity: "error", params: { riser_min: 50, riser_max: 220, riser_khuyen: 190, tread_min: 250, ve_min: 700, ve_khuyen: 900, buoc_min: 550, buoc_max: 700 }, message: "Escalera {stair}: {detail}." },
    { id: "STD-08", title: "Antepecho", severity: "warn", params: { sill_min: 900 }, message: "Ventana {opening} antepecho {sill}mm < {min}mm en {level}." },
    { id: "STD-09", title: "Luz natural", severity: "warn", message: "Recinto {ten} ({room}) sin ventana ni patio de luz." },
    { id: "STD-10", title: "Baño a cocina", severity: "warn", message: "La puerta {opening} del baño abre a la cocina ({room})." },
    { id: "STD-11", title: "Holguras de mobiliario", severity: "info", params: { giuong: 600, bep_truoc: 900, bon_cau_truoc: 500 }, message: "{item}: {detail}." },
    { id: "PLN-06", title: "Voladizo", severity: "error", message: "{slab} sobresale {vuon}mm del deslinde — máximo {max}mm." },
  ],
};
registerPack(LIB);

const asLib = (p: Project): Project => { p.config = { ...p.config, region: "lib" }; return p; };
function violateLib(mutate: (p: Project) => void, load: () => Project = loadCasaPrueba2p): Issue[] {
  const p = asLib(load());
  mutate(p);
  return validateProject(p);
}

describe("conjunto de reglas — panorama", () => {
  it("un proyecto sin config usa la región Chile: solo GEO + CL", () => {
    const ids = activeRules(loadCasaPrueba2p()).map((r) => r.id);
    expect(ids.length).toBeGreaterThanOrEqual(15);
    expect(ids.every((id) => id.startsWith("GEO-") || id.startsWith("CL-"))).toBe(true);
  });

  it("fixture de prueba sin hallazgos block/error/warn — golden", () => {
    expect(serious(validateProject(loadCasaPrueba2p()))).toEqual([]);
  });

  it("sin proyecto solo queda el núcleo empaquetado (geo), todo verificado", () => {
    expect(activeRules().every((r) => r.id.startsWith("GEO-"))).toBe(true);
    expect(unverifiedRules()).toEqual([]);
  });
});

describe("GEO — geometría/topología (caso que infringe; el que cumple = fixture golden)", () => {
  it("GEO-01: puerta desplazada fuera del muro", () => {
    const issues = violate((p) => { p.openings.find((o) => o.id === "D1")!.offset = 3000; });
    const i = expectRule(issues, "GEO-01", "block");
    expect(i.message).toContain("D1");
  });

  it("GEO-02: dos vanos superpuestos en un muro", () => {
    const issues = violate((p) => {
      p.openings.push({ id: "D99", wall: "W1", kind: "door", style: "DP", offset: 1000, width: 1200, height: 2100, sill: 0 });
    });
    expectRule(issues, "GEO-02", "block");
  });

  it("GEO-03: dos muros paralelos montados", () => {
    const issues = violate((p) => {
      p.walls.push({ id: "W99", level: "L1", from: [0, 150], to: [4000, 150], thickness: 220, kind: "gach" });
    });
    expectRule(issues, "GEO-03", "error");
  });

  it("GEO-04: muebles montados", () => {
    const issues = violate((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "sofa-3s-01", at: [700, 3350], rotation: 90 });
    });
    expectRule(issues, "GEO-04", "error");
  });

  it("GEO-05: polígono autointersectado", () => {
    const issues = violate((p) => {
      p.rooms.find((r) => r.id === "R1")!.polygon = [[0, 0], [1000, 1000], [1000, 0], [0, 1000]];
    });
    expectRule(issues, "GEO-05", "block");
  });

  it("GEO-06: el barrido de la puerta choca con un mueble", () => {
    const issues = violate((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "tu-ao-1m", at: [720, 13200], rotation: 0 });
    });
    const i = expectRule(issues, "GEO-06", "warn");
    expect(i.entities).toContain("D3");
  });

  it("GEO-07: sin vano de escalera en la losa de L2", () => {
    const issues = violate((p) => { p.slabs.find((s) => s.id === "SL2")!.holes = []; });
    expectRule(issues, "GEO-07", "warn");
  });

  it("GEO-08: muro fuera del deslinde (error)", () => {
    const out = violate((p) => {
      p.walls.push({ id: "W99", level: "L1", from: [3890, 15000], to: [4400, 15000], thickness: 110, kind: "gach" });
    });
    expectRule(out, "GEO-08", "error");
  });

  it("GEO-09: puerta de baño que abre hacia el pasillo (debe abrir hacia el baño)", () => {
    const issues = violate((p) => { p.openings.find((o) => o.id === "D2")!.swing = "out-R"; });
    const i = expectRule(issues, "GEO-09", "warn");
    expect(i.message).toContain("Baño 1");
    expect(i.message).toContain("Pasillo");
  });

  it("GEO-09: la puerta principal (fachada del frente) abre hacia adentro", () => {
    const issues = violate((p) => { p.openings.find((o) => o.id === "D1")!.swing = "out-L"; });
    expectRule(issues, "GEO-09", "warn");
  });

  it("GEO-09: puerta trasera o hacia patio/terraza abre hacia afuera", () => {
    // D1 deja de ser principal: el frente pasa al fondo del terreno
    const rear = violate((p) => { p.site.front = 2; });
    expectRule(rear, "GEO-09", "warn");
    // D1 da a un patio declarado como recinto (uso san)
    const patio = violate((p) => {
      p.rooms.push({ id: "R99", level: "L1", name: "Patio", use: "san", polygon: [[1500, -1500], [4000, -1500], [4000, 0], [1500, 0]] });
    });
    expect(expectRule(patio, "GEO-09", "warn").message).toContain("Patio");
    expect(violate((p) => {
      p.site.front = 2;
      p.openings.find((o) => o.id === "D1")!.swing = "out-L";
    }).some((i) => i.rule === "GEO-09")).toBe(false);
  });
});

describe("CL-CIP — valores del CIP declarados (reutilizan PLN-01…05)", () => {
  it("CL-CIP-ANT: antejardín; generalizado a terrenos irregulares", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_truoc = 500; });
    const i = expectRule(issues, "CL-CIP-ANT", "error");
    expect(i.message).toContain("antejardín de 500mm");
    // 0 = no declarado → indeterminado, nunca error
    expect(violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_truoc = 0; }).filter((x) => x.rule === "CL-CIP-ANT")).toEqual([]);
  });

  it("CL-CIP-FON: el deslinde de fondo es el más lejano al frente; un muro lateral que llega al fondo también infringe", () => {
    const issues = violate((p) => { p.brief.dat!.quy_hoach!.khoang_lui_sau = 400; });
    const i = expectRule(issues, "CL-CIP-FON", "error");
    expect(i.message).toContain("distanciamiento de 400mm");
    expect(issues.some((x) => x.rule === "CL-CIP-FON" && x.entities.includes("W2"))).toBe(true);
    // casa realmente retirada (único muro a 8 m del fondo) → sin error
    const ok = violate((p) => {
      p.brief.dat!.quy_hoach!.khoang_lui_sau = 400;
      p.openings = [];
      p.furniture = [];
      p.stairs = [];
      p.walls = [{ id: "W1", level: "L1", from: [220, 110], to: [3780, 110], thickness: 220, kind: "gach" }];
    });
    expect(ok.filter((x) => x.rule === "CL-CIP-FON")).toEqual([]);
  });

  it("CL-CIP-COS: la fixture cubre ~100 % del sitio; máximo 80 % infringe, 100 % no", () => {
    expectRule(violate((p) => { p.brief.dat!.quy_hoach!.mat_do_max = 80; }), "CL-CIP-COS", "error");
    expect(violate((p) => { p.brief.dat!.quy_hoach!.mat_do_max = 100; }).filter((x) => x.rule === "CL-CIP-COS")).toEqual([]);
  });

  it("CL-CIP-PIS: fixture de 2 pisos; máximo 1 infringe, el 4 declarado en la fixture no", () => {
    const i = expectRule(violate((p) => { p.brief.dat!.quy_hoach!.tang_max = 1; }), "CL-CIP-PIS", "error");
    expect(i.message).toContain("2");
    expect(validateProject(loadCasaPrueba2p()).filter((x) => x.rule === "CL-CIP-PIS")).toEqual([]);
  });

  it("CL-CIP-ALT: cota superior +7000", () => {
    const i = expectRule(violate((p) => { p.brief.dat!.quy_hoach!.chieu_cao_max = 6500; }), "CL-CIP-ALT", "error");
    expect(i.message).toContain("7000");
    expect(violate((p) => { p.brief.dat!.quy_hoach!.chieu_cao_max = 7000; }).filter((x) => x.rule === "CL-CIP-ALT")).toEqual([]);
  });
});

describe("Biblioteca de evaluadores STD-* y PLN-06 (pack de test, no normativo)", () => {
  it("STD-01: dormitorio simple < 9m² | STD-02: ancho < 2100", () => {
    const issues = violateLib((p) => {
      p.rooms.find((r) => r.id === "R5")!.polygon = [[220, 12475], [2200, 12475], [2200, 15005], [220, 15005]];
      p.furniture = p.furniture.filter((f) => !["F8", "F9"].includes(f.id)); // sin muebles que ensucien GEO
    });
    const i = expectRule(issues, "STD-01", "warn");
    expect(i.message).toContain("9m²");
    expectRule(issues, "STD-02", "warn");
  });

  it("STD-01: dormitorio con cama doble exige 12m²", () => {
    const issues = violateLib((p) => {
      p.furniture = p.furniture.filter((f) => !["F8", "F9"].includes(f.id));
      p.furniture.push({ id: "F98", level: "L1", asset: "giuong-1m8", at: [2680, 14005], rotation: 90 });
    });
    const i = expectRule(issues, "STD-01", "warn");
    expect(i.message).toContain("12m²");
    expect(i.entities).toContain("R5");
  });

  it("STD-03: bajar la altura del piso → altura libre insuficiente", () => {
    const i = expectRule(violateLib((p) => { p.levels.find((l) => l.id === "L1")!.height = 2600; }), "STD-03", "error");
    expect(i.message).toContain("2480");
  });

  it("STD-04: pasillo < 1000", () => {
    expectRule(violateLib((p) => {
      p.rooms.find((r) => r.id === "R3")!.polygon = [[220, 7520], [920, 7520], [920, 12365], [220, 12365]];
    }), "STD-04", "error");
  });

  it("STD-05: puerta interior < 700 (error) + puerta principal 800–900 (info recomendado)", () => {
    expectRule(violateLib((p) => { p.openings.find((o) => o.id === "D3")!.width = 650; }), "STD-05", "error");
    expectRule(violateLib((p) => { p.openings.find((o) => o.id === "D1")!.width = 850; }), "STD-05", "info");
  });

  it("STD-06: huella < 250 (error) + tramo 700–900 (warn) + contrahuella > 190 (warn recomendado)", () => {
    expectRule(violateLib((p) => { p.stairs[0]!.tread = 240; }), "STD-06", "error");
    expectRule(violateLib((p) => { p.stairs[0]!.width = 850; p.stairs[0]!.landing = 860; }), "STD-06", "warn");
    const i = expectRule(violateLib((p) => { p.stairs[0]!.steps = 18; }), "STD-06", "warn"); // 3600/18 = 200 ∈ (190, 220]
    expect(i.message).toContain("se recomienda");
  });

  it("STD-08: antepecho bajo en el piso 2 (warn); en el piso 1 no", () => {
    expectRule(violateLib((p) => { p.openings.find((o) => o.id === "S4")!.sill = 500; }), "STD-08", "warn");
    expect(violateLib((p) => { p.openings.find((o) => o.id === "S1")!.sill = 500; }).filter((i) => i.rule === "STD-08")).toEqual([]);
  });

  it("STD-09: dormitorio sin ventana → sin luz natural; en la cocina es info", () => {
    const i = expectRule(violateLib((p) => { p.openings = p.openings.filter((o) => o.id !== "S4"); }), "STD-09", "warn");
    expect(i.entities).toContain("R11");
    expectRule(violateLib((p) => { p.openings = p.openings.filter((o) => o.id !== "S3"); }, loadCasa1Piso), "STD-09", "info");
  });

  it("STD-10: puerta de baño que abre a la cocina", () => {
    expectRule(violateLib((p) => { p.rooms.find((r) => r.id === "R3")!.use = "bep-an"; }), "STD-10", "warn");
  });

  it("STD-11: mesa frente a la cocina (warn) + cama sin paso a ningún costado (info)", () => {
    expectRule(violateLib((p) => {
      p.furniture.push({ id: "F99", level: "L1", asset: "ban-an-4", at: [2600, 5555], rotation: 90 });
    }), "STD-11", "warn");
    expectRule(violateLib((p) => {
      p.furniture.push({ id: "F98", level: "L1", asset: "ban-hoc", at: [2780, 13445], rotation: 0 });
    }), "STD-11", "info");
  });

  it("STD-05: la puerta principal de una casa retirada dentro del sitio se reconoce como principal", () => {
    const i = expectRule(violateLib((p) => { p.openings.find((o) => o.id === "D1")!.width = 750; }, loadCasa2Pisos), "STD-05", "error");
    expect(i.message).toContain("puerta principal");
  });

  it("PLN-06: voladizo que sobresale más de lo permitido; dentro del margen no", () => {
    const canopy = (p: Project, vuon: number): void => {
      p.slabs.push({ id: "SL99", level: "L2", kind: "canopy", outline: [[220, -vuon], [3780, -vuon], [3780, 300], [220, 300]], thickness: 100 });
    };
    const i = expectRule(violateLib((p) => { p.brief.dat!.quy_hoach!.o_vang_max = 600; canopy(p, 1000); }), "PLN-06", "error");
    expect(i.message).toContain("SL99");
    expect(violateLib((p) => { p.brief.dat!.quy_hoach!.o_vang_max = 600; canopy(p, 500); }).filter((x) => x.rule === "PLN-06")).toEqual([]);
  });

  it("PLN-06: el alero del techo hacia una calle también cuenta", () => {
    const i = expectRule(violateLib((p) => {
      p.roofs![0]!.outline = [[2490, -2000], [10510, -2000], [10510, 12910], [2490, 12910]]; // o_vang_max 1200 en la fixture
    }, loadCasa2Pisos), "PLN-06", "error");
    expect(i.message).toContain("RF1");
  });
});

describe("P6 — arquitectura de packs", () => {
  it("proyecto sin config → núcleo + packs de Chile", () => {
    expect(packsFor(loadCasaPrueba2p()).map((p) => p.id)).toEqual(["geo", "cl-oguc", "cl-cip"]);
  });

  it("región generic: solo núcleo + pack de muestra", () => {
    const p = loadCasaPrueba2p();
    p.config = { region: "generic" };
    const ids = activeRules(p).map((r) => r.id);
    expect(ids.some((id) => id.startsWith("GEO-"))).toBe(true);
    expect(ids.some((id) => id.startsWith("CL-"))).toBe(false);
    expect(ids).toContain("GEN-CEIL-01");
  });

  it("el pack de muestra reutiliza el evaluador STD-03 solo cuando se elige su región", () => {
    const p = loadCasaPrueba2p();
    p.config = { region: "generic" };
    p.levels.find((l) => l.id === "L1")!.height = 2200;
    const issues = validateProject(p);
    expectRule(issues, "GEN-CEIL-01", "warn");
    expect(issues.some((i) => i.rule === "CL-ALT-01")).toBe(false);
  });

  it("config.packs = [] → solo el núcleo geo", () => {
    const p = loadCasaPrueba2p();
    p.config = { packs: [] };
    const ids = activeRules(p).map((r) => r.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => id.startsWith("GEO-"))).toBe(true);
  });

  it("filtro por tipología: la regla con typologies solo corre si el proyecto la declara", () => {
    const testPack: RulePack = {
      id: "test-typ", title: "Test typology filter", kind: "standard", region: "test",
      rules: [{ id: "TST-VILLA-01", title: "Solo casas", severity: "warn", evaluator: "STD-03", typologies: ["biet-thu"], params: { phong_o: 2400 }, source: { verified: false }, message: "test {room}" }],
    };
    registerPack(testPack);
    expect(getPack("test-typ")).toBeDefined();
    const base = loadCasaPrueba2p();
    base.config = { region: "test" };
    expect(activeRules(base).some((r) => r.id === "TST-VILLA-01")).toBe(false);
    base.config = { region: "test", typology: "biet-thu" };
    expect(activeRules(base).some((r) => r.id === "TST-VILLA-01")).toBe(true);
  });
});

describe("P7 — techos inclinados, varios frentes, terreno", () => {
  it("casa-2-pisos sin hallazgos block/error/warn — golden P7", () => {
    expect(serious(validateProject(loadCasa2Pisos()))).toEqual([]);
  });

  it("CL-CIP-DIS: muro que invade el distanciamiento del deslinde #1 (frente secundario)", () => {
    const p = loadCasa2Pisos();
    for (const w of p.walls.filter((x) => x.from[0] === 9800 && x.to[0] === 9800)) {
      w.from = [11500, w.from[1]];
      w.to = [11500, w.to[1]];
    }
    expect(expectRule(validateProject(p), "CL-CIP-DIS", "error").message).toContain("#1");
  });

  it("CL-CIP-ALT: la cumbrera del techo cuenta en la altura, medida desde el nivel del frente", () => {
    const p = loadCasa2Pisos();
    p.roofs![0]!.pitch = 50;
    expectRule(validateProject(p), "CL-CIP-ALT", "error");
  });

  it("GEO-05: contorno de techo autointersectado", () => {
    const p = loadCasa2Pisos();
    p.roofs![0]!.outline = [[2490, 2490], [10510, 12910], [10510, 2490], [2490, 12910]];
    expectRule(validateProject(p), "GEO-05");
  });

  it("CL-VEN-01: una ventana hacia el patio dentro del sitio cuenta como exterior; sin ella, error", () => {
    const p = loadCasa2Pisos();
    p.openings = p.openings.filter((o) => o.id !== "S5");
    expect(expectRule(validateProject(p), "CL-VEN-01", "error").message).toContain("Dormitorio 2");
  });

  it("ops: add/update/delete de techo pasan por apply_ops como cualquier entidad", () => {
    const p = loadCasa2Pisos();
    const r1 = applyOps(p, 1, [{ op: "update", entity: "roof", id: "RF1", data: { pitch: 25 } }], { validate: validateProject });
    expect(r1.ok).toBe(true);
    if (r1.ok) {
      expect(r1.project.roofs![0]!.pitch).toBe(25);
      const r2 = applyOps(r1.project, 2, [{ op: "delete", entity: "roof", id: "RF1" }], { validate: validateProject });
      expect(r2.ok).toBe(true);
      if (r2.ok) expect(r2.project.roofs).toHaveLength(0);
    }
  });

  it("archivo antiguo SIN arreglo roofs: add roof igual funciona (se inicializa)", () => {
    const p = loadCasaPrueba2p();
    expect(p.roofs).toBeUndefined();
    const r = applyOps(p, 1, [{
      op: "add", entity: "roof",
      data: { id: "RF9", level: "L2", kind: "gable", outline: [[0, 0], [4000, 0], [4000, 8000], [0, 8000]], pitch: 20 },
    }], { validate: validateProject });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.project.roofs).toHaveLength(1);
  });
});

describe("P8 — plantillas: cada fixture es un golden", () => {
  it("casa-1-piso sin hallazgos block/error/warn", () => {
    expect(serious(validateProject(loadCasa1Piso()))).toEqual([]);
  });

  it("depto-2d sin hallazgos block/error/warn (sin terreno, sin techo ni escalera)", () => {
    const p = loadDepto2d();
    expect(p.roofs).toBeUndefined();
    expect(p.stairs).toEqual([]);
    expect(serious(validateProject(p))).toEqual([]);
  });

  it("contraste casa-1-piso: pasillo angosto → STD-04 (pack de test)", () => {
    expectRule(violateLib((p) => {
      p.rooms.find((r) => r.id === "R3")!.polygon = [[1110, 7000], [8890, 7000], [8890, 7900], [1110, 7900]];
    }, loadCasa1Piso), "STD-04", "error");
  });
});

describe("P9 — capa de regiones: Chile por defecto, UK como segunda región de prueba", () => {
  it("registro de regiones: sin vn; uk y cl con sus packs", () => {
    expect(getRegion("vn")).toBeUndefined();
    expect(getRegion("uk")!.packs).toEqual(["uk-approved-docs"]);
    expect(getRegion("cl")!.packs).toEqual(["cl-oguc", "cl-cip"]);
  });

  it("fixture UK limpia (0 issues) — golden P9", () => {
    expect(validateProject(loadDetachedUk())).toEqual([]);
  });

  it("DoD: un proyecto uk no ve reglas chilenas — solo GEO + UK", () => {
    const ids = activeRules(loadDetachedUk()).map((r) => r.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => id.startsWith("GEO-") || id.startsWith("UK-"))).toBe(true);
  });

  it("DoD: presupuesto uk sin tabla → solo cantidades", () => {
    const est = estimateCost(loadDetachedUk());
    expect(est.items).toEqual([]);
    expect(est.total).toBeNull();
    expect(est.quantities.san_thuc_m2).toBeGreaterThan(100);
    expect(est.ghi_chu.join(" ")).toContain("No hay tabla de precios");
  });

  it("uk sin validar → unverifiedRules(p) > 0 (planos con ⚠); cl, validada por el usuario, no", () => {
    expect(unverifiedRules(loadDetachedUk()).length).toBeGreaterThan(0);
    expect(unverifiedRules(loadCasaPrueba2p())).toEqual([]);
  });

  it("UK-STAIR-01 (Part K): contrahuella sobre 220 infringe", () => {
    const p = loadDetachedUk();
    p.stairs[0]!.steps = 12; // 2700/12 = 225 > 220
    const issues = validateProject(p);
    expect(expectRule(issues, "UK-STAIR-01", "error").message).toContain("225");
    expect(issues.some((x) => x.rule.startsWith("CL-"))).toBe(false);
  });

  it("UK-DOOR-01 (Part M): puerta interior 700 < 750 infringe", () => {
    const p = loadDetachedUk();
    p.openings.find((o) => o.id === "D2")!.width = 700;
    expectRule(validateProject(p), "UK-DOOR-01", "error");
  });
});
