import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Project } from "@arquitecto/core";
import { ProjectStore, slugify, VISIBLE_TEMPLATES } from "./store.js";

const freshStore = (): ProjectStore => new ProjectStore(mkdtempSync(path.join(tmpdir(), "arquitecto-")));

describe("ProjectStore", () => {
  it("tạo từ template, revision 0, file ghi ra đĩa", () => {
    const store = freshStore();
    const p = store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    expect(p.meta.id).toBe("nha-anh-ba");
    expect(p.meta.revision).toBe(0);
    const onDisk = JSON.parse(readFileSync(store.filePath, "utf8")) as Project;
    expect(onDisk.meta.name).toBe("Nhà anh Ba");
    expect(onDisk.walls.length).toBeGreaterThan(0);
  });

  it("không nghiền dự án đang có (project_new lần 2 bị chặn)", () => {
    const store = freshStore();
    store.newProject("Nhà 1");
    expect(() => store.newProject("Nhà 2")).toThrowError(/Ya existe un proyecto/);
  });

  it("apply thành công → persist + journal; apply phạm block → file không đổi", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    const ok = store.apply(0, [
      { op: "add", entity: "wall", data: { id: "W99", level: "L1", from: [220, 3000], to: [3780, 3000], thickness: 110, kind: "gach" } },
    ], "tường thử");
    expect(ok.ok).toBe(true);
    expect((JSON.parse(readFileSync(store.filePath, "utf8")) as Project).meta.revision).toBe(1);

    // cửa vượt ra ngoài tường → GEO-01 block, transaction hủy
    const bad = store.apply(1, [
      { op: "add", entity: "opening", data: { id: "D99", wall: "W99", kind: "door", style: "DP", offset: 3400, width: 800, height: 2100, sill: 0 } },
    ]);
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors[0]!.rule).toBe("GEO-01");
    expect((JSON.parse(readFileSync(store.filePath, "utf8")) as Project).meta.revision).toBe(1);

    const { entries, currentRevision } = store.changesSince(0);
    expect(currentRevision).toBe(1);
    expect(entries).toHaveLength(1);
    expect(entries[0]!.summary).toContain("agrega muro W99");
    expect(entries[0]!.note).toBe("tường thử");
  });

  it("đóng mở lại giữ nguyên model (openProject roundtrip)", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    store.apply(0, [{ op: "update", entity: "level", id: "L2", data: { height: 3500 } }]);
    const reopened = new ProjectStore(store.baseDir).openProject();
    expect(reopened.meta.revision).toBe(1);
    expect(reopened.levels.find((l) => l.id === "L2")!.height).toBe(3500);
  });

  it("slugify tiếng Việt", () => {
    expect(slugify("Nhà Ống 4×16 — Anh Ba & Bà Nội")).toBe("nha-ong-4-16-anh-ba-ba-noi");
    expect(slugify("Đường Đá Đỏ")).toBe("duong-da-do");
  });
});

// ── A2: IDs validados al cargar de disco (docs/security-tests/A2.md) ──

describe("A2 — openProject/openVariant rechazan IDs inválidos", () => {
  const craft = (mutate: (p: Project) => void): { store: ProjectStore; file: string } => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    const p = structuredClone(store.current);
    mutate(p);
    const file = path.join(store.baseDir, "crafted.json");
    writeFileSync(file, JSON.stringify(p), "utf8");
    return { store, file };
  };

  it("openProject con level.id o meta.id con ../ → error", () => {
    const a = craft((p) => (p.levels[0]!.id = "../../evil"));
    expect(() => a.store.openProject("crafted.json")).toThrowError(/ID inválido/);
    const b = craft((p) => (p.meta.id = "../evil"));
    expect(() => b.store.openProject("crafted.json")).toThrowError(/ID inválido/);
  });

  it("openVariant con un modelo manipulado → error y el proyecto actual no cambia", () => {
    const { store } = craft(() => {});
    const bad = structuredClone(store.current);
    bad.levels[0]!.id = "../../evil";
    mkdirSync(store.variantsDir, { recursive: true });
    writeFileSync(path.join(store.variantsDir, "mala.json"), JSON.stringify({ name: "Mala", model: bad }), "utf8");
    const before = store.current.meta.revision;
    expect(() => store.openVariant("mala")).toThrowError(/ID inválido/);
    expect(store.current.meta.revision).toBe(before);
  });

  it("project_new con nombre largo: meta.id ≤32, sin guion final, y el proyecto se puede reabrir", () => {
    const store = freshStore();
    const p = store.newProject("Casa Pérez Cañete 3 dormitorios 2 pisos", "nha-ong-4x16-2t");
    expect(p.meta.id.length).toBeLessThanOrEqual(32);
    expect(p.meta.id).toMatch(/^[a-z0-9-]+$/);
    expect(p.meta.id.endsWith("-")).toBe(false);
    expect(() => store.openProject()).not.toThrow();
    // slugify no se recorta: nombra variantes y recortarlo podría pisar dos con el mismo prefijo
    expect(slugify("Casa Pérez Cañete 3 dormitorios 2 pisos").length).toBe(39);
  });
});

// ── M2: slug de variante (docs/security-tests/M2.md) ────────────────

describe("M2 — readVariant solo acepta slugs ^[a-z0-9-]+$", () => {
  it("rechaza traversal y slugs mal formados; no lee .json fuera de phuong-an/", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    writeFileSync(path.join(store.baseDir, "secreto.json"), JSON.stringify({ name: "SECRETO", model: store.current }), "utf8");
    for (const slug of ["../../secreto", "..\..\secreto", "A", "a b", ""]) {
      expect(() => store.readVariant(slug), JSON.stringify(slug)).toThrowError(/Slug inválido/);
    }
    store.saveVariant("Phương án A");
    expect(store.readVariant("phuong-an-a").name).toBe("Phương án A");
  });
});

// ── M3: project_open confinado (docs/security-tests/M3.md) ──────────

describe("M3 — openProject solo dentro de la carpeta del proyecto y sin filtrar contenido", () => {
  it("ruta fuera de la carpeta (absoluta o relativa) → error; el proyecto actual no cambia", () => {
    const outside = freshStore();
    outside.newProject("Otra casa", "nha-ong-4x16-2t");
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    expect(() => store.openProject(outside.filePath)).toThrowError(/fuera del directorio/);
    expect(() => store.openProject(path.relative(store.baseDir, outside.filePath))).toThrowError(/fuera del directorio/);
    expect(store.current.meta.name).toBe("Nhà anh Ba");
  });

  it("JSON inválido: el error no reenvía el contenido del archivo", () => {
    const store = freshStore();
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    writeFileSync(path.join(store.baseDir, "roto.json"), "SECRETO-123 esto no es json", "utf8");
    let msg = "";
    try {
      store.openProject("roto.json");
    } catch (e) {
      msg = (e as Error).message;
    }
    expect(msg).toMatch(/JSON válido/);
    expect(msg).not.toContain("SECRETO");
  });
});

// ── E3: plantillas visibles y región por defecto ────────────────────

describe("E3 — plantillas ofrecidas y región", () => {
  it("solo se ofrecen las plantillas chilenas; usan región generic; el legado oculto sigue cargando sin región", () => {
    expect(VISIBLE_TEMPLATES).toEqual(["casa-1-piso", "casa-2-pisos", "depto-2d"]);
    expect(freshStore().newProject("Casa Pérez", "casa-1-piso").config?.region).toBe("generic");
    expect(freshStore().newProject("En blanco").config?.region).toBe("generic");
    expect(freshStore().newProject("Legado", "nha-ong-4x16-2t").config?.region).toBeUndefined();
    expect(() => freshStore().newProject("X", "no-existe")).toThrowError(/casa-1-piso, casa-2-pisos, depto-2d/);
  });

  it("las plantillas visibles no traen texto vietnamita (nombres traducidos, brief vacío)", () => {
    const VN = /[àèìòùãõâêôýạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹđăơưĩũ]/i;
    for (const t of VISIBLE_TEMPLATES) {
      const p = freshStore().newProject("Casa Pérez", t);
      const hit = JSON.stringify(p).match(new RegExp(`.{0,30}${VN.source}.{0,30}`, "i"));
      expect(hit?.[0] ?? null, t).toBeNull();
      expect(p.brief).toEqual({});
    }
  });
});
