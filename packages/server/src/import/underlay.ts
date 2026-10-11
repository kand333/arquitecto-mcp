import { readFileSync, realpathSync, statSync } from "node:fs";
import path from "node:path";
import type { Point, Polygon, Project, Underlay } from "@arquitecto/core";
import { safeJoin } from "../safe-path.js";
import { parseDxf, placePoint, type DxfDrawing } from "./dxf.js";
import { imageSize } from "./image-size.js";

/**
 * Nạp underlay từ model → dữ liệu render sẵn cho plan-scene.
 * Model chỉ giữ THAM CHIẾU (source trong .arquitecto/underlay/) — file đọc và
 * parse ở đây, cache theo mtime để mỗi lần render không đọc lại đĩa.
 */

export type UnderlayRender = {
  /** DXF: polyline đã đặt về mm model. */
  polylines: Polygon[];
  /** Ảnh: data URI + kích thước px + phép đặt (gốc = góc DƯỚI-TRÁI ảnh). */
  image?: { href: string; wpx: number; hpx: number; origin: Point; scale: number; rot: number };
  opacity: number;
  level?: string;
};

export function underlayDir(projectDir: string): string {
  return path.join(projectDir, ".arquitecto", "underlay");
}

type CacheEntry = { key: string; dxf?: DxfDrawing; href?: string; wpx?: number; hpx?: number };
const cache = new Map<string, CacheEntry>();

function readSource(fp: string, kind: Underlay["kind"]): CacheEntry {
  const key = `${kind}|${statSync(fp).mtimeMs}`;
  const hit = cache.get(fp);
  if (hit && hit.key === key) return hit;
  const entry: CacheEntry = { key };
  if (kind === "dxf") {
    entry.dxf = parseDxf(readFileSync(fp, "utf8"));
  } else {
    const buf = readFileSync(fp);
    const info = imageSize(buf);
    entry.href = `data:${info.mime};base64,${buf.toString("base64")}`;
    entry.wpx = info.width;
    entry.hpx = info.height;
  }
  cache.set(fp, entry);
  return entry;
}

/** Đường dẫn tuyệt đối của file nguồn underlay. */
export function underlaySourcePath(u: Underlay, projectDir: string): string {
  // M1: dentro de .arquitecto/underlay también tras resolver symlinks (el modelo pudo venir de disco sin pasar por ops)
  const dir = realpathSync(underlayDir(projectDir));
  const fp = realpathSync(safeJoin(dir, u.source));
  if (!fp.startsWith(dir + path.sep)) throw new Error(`Underlay fuera de ${dir}: ${JSON.stringify(u.source)}.`);
  return fp;
}

/** Bản vẽ DXF của underlay ĐÃ ĐẶT về mm model — nuôi cả render lẫn dò tường. */
export function placedPolylines(u: Underlay, projectDir: string): Polygon[] {
  const entry = readSource(underlaySourcePath(u, projectDir), u.kind);
  if (!entry.dxf) return [];
  const rot = u.rotation ?? 0;
  return entry.dxf.polylines.map((pl) => pl.map((pt) => placePoint(pt, u.origin, u.scale, rot)));
}

/**
 * Underlay của model → dữ liệu render. Trả null nếu model không có underlay
 * hoặc file nguồn đọc không được (mất file không được phép làm gãy render).
 */
export function loadUnderlay(p: Project, projectDir: string): UnderlayRender | null {
  const u = p.underlay;
  if (!u) return null;
  try {
    const base = { opacity: u.opacity ?? 0.35, ...(u.level ? { level: u.level } : {}) };
    if (u.kind === "dxf") {
      return { polylines: placedPolylines(u, projectDir), ...base };
    }
    const entry = readSource(underlaySourcePath(u, projectDir), u.kind);
    if (!entry.href || !entry.wpx || !entry.hpx) return null;
    return {
      polylines: [],
      image: { href: entry.href, wpx: entry.wpx, hpx: entry.hpx, origin: u.origin, scale: u.scale, rot: u.rotation ?? 0 },
      ...base,
    };
  } catch {
    return null;
  }
}
