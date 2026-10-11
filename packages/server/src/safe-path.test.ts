import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderPlanFiles } from "./render/render.js";
import { ProjectStore } from "./store.js";

// ── A2: las escrituras no salen del directorio de exportes (docs/security-tests/A2.md) ──

describe("A2 — safeJoin y sinks de exporte", () => {
  it("safeJoin acepta nombres simples y rechaza traversal y rutas absolutas", async () => {
    const { safeJoin } = await import("./safe-path.js");
    const dir = path.resolve("exports");
    expect(safeJoin(dir, "mat-bang-l1.svg")).toBe(path.join(dir, "mat-bang-l1.svg"));
    for (const bad of ["../x.svg", "a/../../x.svg", "..\\x.svg", path.resolve("/tmp/x.svg"), "", "."]) {
      expect(() => safeJoin(dir, bad), JSON.stringify(bad)).toThrowError(/fuera del directorio/);
    }
  });

  it("renderPlanFiles con level.id manipulado no escribe fuera del directorio", async () => {
    const root = mkdtempSync(path.join(tmpdir(), "arquitecto-a2-"));
    const store = new ProjectStore(root);
    store.newProject("Nhà anh Ba", "nha-ong-4x16-2t");
    const p = structuredClone(store.current);
    const evil = "../../../escape";
    p.levels.push({ ...p.levels[0]!, id: evil });
    const dir = path.join(root, "a", "exports");
    await expect(renderPlanFiles(p, evil, dir)).rejects.toThrow();
    expect(existsSync(path.join(root, "a", "escape.svg"))).toBe(false);
  });
});
