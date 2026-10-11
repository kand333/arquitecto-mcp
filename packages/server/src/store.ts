import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  applyOps, findInvalidId, loadBietThuDoc, loadCanHo, loadDetachedUk, loadNhaCap4, loadNhaOng4x16, loadNhaVuon, setDonGia, validateProject,
  type ApplyResult, type Issue, type Op, type OpOrigin, type Point, type Project,
} from "@arquitecto/core";
import { SoftLocks } from "./locks.js";
import { safeJoin } from "./safe-path.js";

export const PROJECT_FILE = "arquitecto.project.json";

export type JournalEntry = {
  revision: number;
  at: string;
  origin: OpOrigin;
  note?: string;
  summary: string;
  ops: Op[];
};

/** Sự kiện store — nuôi broadcast WS của live server (doc 06). */
export type StoreEvent =
  | { kind: "applied"; revision: number; ops: Op[]; origin: OpOrigin; note?: string; summary: string; issues: Issue[] }
  | { kind: "project"; reason: "created" | "opened" }; // model thay mới toàn bộ → client cần snapshot

/**
 * Plantillas (P8). `hidden`: legado vietnamita/UK que solo usan los tests — no se
 * ofrece al usuario y se elimina en E4, cuando exista la región "cl".
 */
export const TEMPLATES: Record<string, { label: string; load: () => Project; hidden?: true }> = {
  "casa-1-piso": { label: "Casa de 1 piso — 2 dormitorios, techo de planchas", load: loadNhaCap4 },
  "casa-2-pisos": { label: "Casa de 2 pisos — techo inclinado, sitio en esquina con pendiente", load: loadBietThuDoc },
  "depto-2d": { label: "Departamento 2 dormitorios — remodelación dentro de una estructura existente", load: loadCanHo },
  "nha-ong-4x16-2t": { label: "Nhà ống 4×16m, 2 tầng, 3PN", load: loadNhaOng4x16, hidden: true },
  "nha-vuon": { label: "Nhà vườn — 1 tầng mái ngói", load: loadNhaVuon, hidden: true },
  "detached-uk": { label: "UK detached — 3 bed gable roof", load: loadDetachedUk, hidden: true },
};

/** Plantillas que se ofrecen al usuario (sin el legado oculto). */
export const VISIBLE_TEMPLATES = Object.keys(TEMPLATES).filter((k) => !TEMPLATES[k]!.hidden);

/** E3: las plantillas visibles cargan fixtures VN (intactas para los tests); al ofrecerlas se traducen sus nombres. */
const TEMPLATE_ES: Record<string, string> = {
  "Khách": "Living", "Khách + bếp": "Living + cocina", "Bếp + ăn": "Cocina + comedor",
  "Ngủ 1": "Dormitorio 1", "Ngủ 2": "Dormitorio 2", "Hành lang": "Pasillo", "Cầu thang": "Escalera",
  "WC": "Baño", "WC 1": "Baño 1", "Kho": "Bodega",
  "Tầng 1": "Piso 1", "Tầng 2": "Piso 2", "Căn hộ": "Departamento",
  "Cửa chính": "Puerta principal", "Cửa vào căn hộ": "Puerta de acceso", "Cửa phòng": "Puerta interior",
  "Cửa WC": "Puerta de baño", "Cửa sổ trượt": "Ventana corredera",
  "nhôm kính": "aluminio y vidrio", "gỗ công nghiệp": "madera aglomerada",
  "nhựa lõi thép": "PVC con refuerzo de acero", "thép chống cháy": "acero cortafuego",
};

function localizeTemplate(p: Project): void {
  const es = (s: string): string => TEMPLATE_ES[s] ?? s;
  for (const l of p.levels) l.name = es(l.name);
  for (const r of p.rooms) r.name = es(r.name);
  for (const s of Object.values(p.styles.openings)) {
    s.label = es(s.label);
    if (s.material) s.material = es(s.material);
  }
  p.brief = {}; // el brief de la plantilla es vietnamita (presupuesto en VND, vecinos…); el real sale de la fase A
}

/**
 * Model store: một dự án tại một thư mục (doc 03).
 * - arquitecto.project.json — NGUỒN SỰ THẬT, ghi atomic (tmp + rename)
 * - .arquitecto/history.jsonl — journal ops (append-only)
 */
export class ProjectStore {
  private project: Project | null = null;
  private listeners = new Set<(e: StoreEvent) => void>();
  /** Soft-lock entity đang được người dùng kéo (doc 06) — live server cập nhật qua presence. */
  readonly locks = new SoftLocks();

  constructor(readonly baseDir: string) {}

  /** Đăng ký nghe sự kiện mutation. Trả hàm hủy đăng ký. */
  subscribe(fn: (e: StoreEvent) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(e: StoreEvent): void {
    for (const fn of [...this.listeners]) {
      try {
        fn(e);
      } catch {
        // listener hỏng không được phép làm hỏng transaction
      }
    }
  }

  get filePath(): string {
    return path.join(this.baseDir, PROJECT_FILE);
  }

  /** Bảng đơn giá địa phương: <dự án>/rules/don-gia.json đè bảng đóng gói (ADR-09 — data người dùng sửa được). */
  refreshDonGia(): void {
    const fp = path.join(this.baseDir, "rules", "don-gia.json");
    try {
      setDonGia(existsSync(fp) ? (JSON.parse(readFileSync(fp, "utf8")) as never) : null);
    } catch {
      setDonGia(null); // file hỏng → dùng bảng gốc, đừng làm gãy estimate
    }
  }

  get exportDir(): string {
    return path.join(this.baseDir, ".arquitecto", "exports");
  }

  private get journalPath(): string {
    return path.join(this.baseDir, ".arquitecto", "history.jsonl");
  }

  get isOpen(): boolean {
    return this.project != null;
  }

  get current(): Project {
    if (!this.project) {
      throw new Error("No hay ningún proyecto abierto: llama antes a project_new (crear) o project_open.");
    }
    return this.project;
  }

  newProject(name: string, template?: string, siteBoundary?: Point[], brief?: Project["brief"]): Project {
    if (existsSync(this.filePath)) {
      throw new Error(`Ya existe un proyecto en ${this.filePath}: usa project_open, o borra el archivo si quieres empezar de cero.`);
    }
    let p: Project;
    if (template) {
      const t = TEMPLATES[template];
      if (!t) {
        throw new Error(`No existe la plantilla "${template}". Disponibles: ${VISIBLE_TEMPLATES.join(", ")}.`);
      }
      p = t.load();
      if (!t.hidden) localizeTemplate(p);
    } else {
      p = blankProject(brief);
    }
    // E4: fuera del legado oculto se valida con la región Chile (pack cl-oguc); el legado VN conserva su comportamiento
    if (!template || !TEMPLATES[template]!.hidden) p.config = { ...p.config, region: p.config?.region ?? "cl" };
    // A2: meta.id es un ID (≤32); se recorta aquí y no en slugify, que también nombra variantes
    p.meta = { ...p.meta, id: slugify(name).slice(0, 32).replace(/-+$/, "") || "du-an", name, revision: 0 };
    if (brief) p.brief = structuredClone(brief); // brief từ pha A phỏng vấn — nguồn đối chiếu mọi pha sau
    if (siteBoundary) {
      p.site.boundary = siteBoundary;
      p.brief.dat = { ...(p.brief.dat ?? {}), ranh_gioi: siteBoundary };
    }
    this.project = p;
    this.persist();
    this.appendJournal({
      revision: 0,
      at: new Date().toISOString(),
      origin: "system",
      summary: template ? `creado desde la plantilla ${template}` : "proyecto en blanco creado",
      ops: [],
    });
    this.emit({ kind: "project", reason: "created" });
    return p;
  }

  openProject(file?: string): Project {
    const fp = file ? safeJoin(this.baseDir, file) : this.filePath; // M3: solo dentro de la carpeta del proyecto
    if (!existsSync(fp)) {
      throw new Error(`No se encuentra ${fp}: revisa la ruta o crea uno nuevo con project_new.`);
    }
    let raw: Project;
    try {
      raw = JSON.parse(readFileSync(fp, "utf8")) as Project;
    } catch {
      // M3: el mensaje de JSON.parse incluye un fragmento del archivo — no se reenvía al agente
      throw new Error(`${fp} no es JSON válido.`);
    }
    if (typeof raw?.meta?.revision !== "number" || raw.meta.unit !== "mm") {
      throw new Error(`${fp} no es un proyecto de Arquitecto válido (falta meta.revision / unit mm).`);
    }
    assertValidIds(raw, fp);
    this.project = raw;
    this.emit({ kind: "project", reason: "opened" });
    return raw;
  }

  /** Cổng mutation duy nhất — soft-lock, validate đầy đủ, block → hủy, thành công → ghi đĩa + journal. */
  apply(baseRevision: number, ops: Op[], note?: string, origin: OpOrigin = "claude"): ApplyResult {
    if (origin !== "user") {
      const hit = this.locks.lockedAmong(touchedIds(this.current, ops));
      if (hit.length > 0) {
        return {
          ok: false,
          currentRevision: this.current.meta.revision,
          errors: [{
            rule: "LOCK-01", severity: "block", entities: hit,
            message: `${hit.join(", ")} lo está editando el usuario en este momento: el bloqueo se libera ~5 s después de que suelta. Espera y usa get_changes_since para ver qué cambió antes de reintentar.`,
          }],
        };
      }
    }
    const result = applyOps(this.current, baseRevision, ops, {
      validate: validateProject,
      ...(note ? { note } : {}),
    });
    if (result.ok) {
      this.project = result.project;
      this.persist();
      this.appendJournal({
        revision: result.revision,
        at: new Date().toISOString(),
        origin,
        ...(note ? { note } : {}),
        summary: result.summary,
        ops,
      });
      this.emit({
        kind: "applied",
        revision: result.revision,
        ops,
        origin,
        ...(note ? { note } : {}),
        summary: result.summary,
        issues: result.warnings, // validate đã chạy trong transaction — không cần chạy lại
      });
    }
    return result;
  }

  // ── Phương án A/B (backlog v2 → 13/07/2026): snapshot có tên ────
  // Journal không tái tạo được state cũ (rev 0 không lưu ops) — snapshot là
  // đường thẳng nhất, và cũng chính là ngữ nghĩa người dùng cần: "lưu bố trí này lại".

  get variantsDir(): string {
    return path.join(this.baseDir, ".arquitecto", "phuong-an");
  }

  /** Lưu model hiện tại thành phương án (cùng tên → cập nhật đè). Trả slug. */
  saveVariant(name: string): { slug: string; revision: number } {
    const p = this.current;
    const slug = slugify(name);
    mkdirSync(this.variantsDir, { recursive: true });
    const payload = {
      name,
      savedAt: new Date().toISOString(),
      revision: p.meta.revision,
      model: p,
    };
    writeFileSync(path.join(this.variantsDir, `${slug}.json`), JSON.stringify(payload, null, 2) + "\n", "utf8");
    return { slug, revision: p.meta.revision };
  }

  listVariants(): Array<{ slug: string; name: string; savedAt: string; revision: number }> {
    if (!existsSync(this.variantsDir)) return [];
    const out: Array<{ slug: string; name: string; savedAt: string; revision: number }> = [];
    for (const f of readdirSync(this.variantsDir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const v = JSON.parse(readFileSync(path.join(this.variantsDir, f), "utf8")) as {
          name?: string; savedAt?: string; revision?: number;
        };
        out.push({
          slug: f.replace(/\.json$/, ""),
          name: v.name ?? f,
          savedAt: v.savedAt ?? "",
          revision: v.revision ?? 0,
        });
      } catch {
        // file hỏng — bỏ qua, không làm gãy list
      }
    }
    return out.sort((a, b) => a.savedAt.localeCompare(b.savedAt));
  }

  /** Đọc model của một phương án (không đổi model đang làm). */
  readVariant(slug: string): { name: string; savedAt: string; model: Project } {
    // M2: el slug llega de MCP y de HTTP (/plan?variant, /so-sanh) — nunca una ruta
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Slug inválido ${JSON.stringify(slug)}: solo a-z, 0-9 y "-".`);
    const fp = path.join(this.variantsDir, `${slug}.json`);
    if (!existsSync(fp)) {
      const known = this.listVariants().map((v) => v.slug).join(", ") || "(aún no hay alternativas)";
      throw new Error(`No existe la alternativa "${slug}". Guardadas: ${known}.`);
    }
    const v = JSON.parse(readFileSync(fp, "utf8")) as { name?: string; savedAt?: string; model: Project };
    return { name: v.name ?? slug, savedAt: v.savedAt ?? "", model: v.model };
  }

  /**
   * Chuyển sang làm việc trên một phương án (checkout). Model hiện tại KHÔNG
   * tự lưu — caller (tool description dặn Claude) phải saveVariant trước nếu muốn giữ.
   * Revision tiếp tục đơn điệu tăng để optimistic concurrency không gãy.
   */
  openVariant(slug: string): Project {
    const { name, model } = this.readVariant(slug);
    assertValidIds(model, `alternativa "${slug}"`);
    const next = structuredClone(model);
    next.meta.revision = this.current.meta.revision + 1;
    this.project = next;
    this.persist();
    this.appendJournal({
      revision: next.meta.revision,
      at: new Date().toISOString(),
      origin: "system",
      summary: `paso a la alternativa "${name}" (${slug})`,
      ops: [],
    });
    this.emit({ kind: "project", reason: "opened" }); // mọi tab nhận snapshot + session token mới
    return next;
  }

  changesSince(revision: number): { entries: JournalEntry[]; currentRevision: number } {
    const entries: JournalEntry[] = [];
    if (existsSync(this.journalPath)) {
      for (const line of readFileSync(this.journalPath, "utf8").split("\n")) {
        if (!line.trim()) continue;
        const e = JSON.parse(line) as JournalEntry;
        if (e.revision > revision) entries.push(e);
      }
    }
    return { entries, currentRevision: this.current.meta.revision };
  }

  private persist(): void {
    mkdirSync(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.tmp`;
    writeFileSync(tmp, JSON.stringify(this.current, null, 2) + "\n", "utf8");
    // Windows: rename có thể EPERM THOÁNG QUA khi antivirus/indexer đang giữ
    // file đích — retry ngắn; một lỗi ghi nhất thời không được giết server
    // (bug thật 14/07/2026: user kéo tường trong editor → EPERM → sập process).
    for (let attempt = 1; ; attempt++) {
      try {
        renameSync(tmp, this.filePath);
        return;
      } catch (e) {
        const code = (e as NodeJS.ErrnoException).code;
        if ((code !== "EPERM" && code !== "EBUSY" && code !== "EACCES") || attempt >= 5) throw e;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25 * attempt); // sleep sync 25-100ms
      }
    }
  }

  private appendJournal(entry: JournalEntry): void {
    mkdirSync(path.dirname(this.journalPath), { recursive: true });
    appendFileSync(this.journalPath, JSON.stringify(entry) + "\n", "utf8");
  }
}

/** Id các entity một batch ops chạm tới — kể cả openings bị cascade khi xóa tường. */
function touchedIds(p: Project, ops: Op[]): Set<string> {
  const ids = new Set<string>();
  for (const op of ops) {
    if (op.op === "add") {
      if (typeof op.data.id === "string") ids.add(op.data.id);
      continue;
    }
    ids.add(op.id);
    if (op.op === "delete" && op.entity === "wall") {
      for (const o of p.openings) if (o.wall === op.id) ids.add(o.id);
    }
  }
  return ids;
}

/**
 * Dự án trống (P8 — doc 12): hình lô lấy từ BRIEF pha A (dat.ranh_gioi),
 * không còn mặc định lô nhà ống 4×16. Chưa phỏng vấn → lô vuông 10×10
 * trung tính, chỉ là chỗ đứng tạm cho tới khi khai ranh giới thật.
 */
export function blankProject(brief?: Project["brief"]): Project {
  const boundary: Point[] = brief?.dat?.ranh_gioi ?? [[0, 0], [10000, 0], [10000, 10000], [0, 10000]];
  return {
    meta: { id: "proyecto-nuevo", name: "Proyecto nuevo", revision: 0, unit: "mm", app: "arquitecto/0.1" },
    brief: brief ? structuredClone(brief) : {},
    site: { boundary: structuredClone(boundary), north: 0, front: 0 },
    axes: { x: [], y: [] },
    levels: [{ id: "L1", name: "Piso 1", elevation: 0, height: 3600 }],
    walls: [],
    openings: [],
    slabs: [],
    roofs: [],
    stairs: [],
    rooms: [],
    furniture: [],
    styles: { openings: {} },
    finishes: {},
  };
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "du-an";
}

/** A2: un modelo cargado de disco no pasó por ops — sus IDs se validan antes de usarlo. */
function assertValidIds(p: Project, where: string): void {
  const bad = findInvalidId(p);
  if (bad != null) {
    throw new Error(`${where}: ID inválido ${JSON.stringify(bad)} — solo letras, números, "_" o "-" (1–32 caracteres).`);
  }
}
