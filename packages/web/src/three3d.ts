import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  defaultSwing, getAsset, groundAt, joinedWall, outdoorAt, pointInPolygon, pointOnWall, roofGeometry, roofsOf, stairLayout, wallLength, wallNormal,
  type CaptureCamera, type Furniture, type Level, type Op, type Project, type Roof, type Room, type Slab, type Stair,
  type Wall,
} from "@arquitecto/core";
import { wallPieces } from "./geo3d.js";
import { buildFurnitureLocal } from "./furniture3d.js";
import { sunPosition } from "./sun.js";

const MM = 1 / 1000; // model mm → three mét
const DEG = Math.PI / 180;
/** Puertas abatibles: cerradas por defecto; el botón «abrir puertas» las gira 90° hacia el lado de la regla. */
const DOOR_OPEN = 90 * DEG;
/** Ventanas de aluminio: perfil de marco y de hoja (mm), color antracita. */
const ALU = { frame: 50, depth: 60, sash: 40, color: 0x3a3e44 };

/** Bảng màu maquette bìa trắng trên bàn mực nho — khớp token CSS. */
const C = {
  bg: 0x14171b,
  ground: 0x20242b,
  boundary: 0x6ea0d8,
  wall: 0xf2ede1,
  edge: 0x847e6f,
  glass: 0x9cc7e8,
  door: 0xb08968,
  slab: 0xe6dfcf,
  roof: 0xc9b8a3,
  stair: 0xd8d0bd,
  flash: 0x2c5b96,
  label: "#4a453a",
};

const ROOM_TINT: Record<string, number> = {
  khach: 0xccb98f, "bep-an": 0xd1a06b, ngu: 0xc2a3b6, wc: 0x9db8c4,
  tho: 0xd6bd92, "lam-viec": 0xa9bcc9, gara: 0xa8b0b8, "hanh-lang": 0xb9c0a8,
  "cau-thang": 0xb8b0a0, san: 0xaab89e, "gieng-troi": 0xa5c8d8, kho: 0xb0a898, "ban-cong": 0xa9c0af,
};

// màu nội thất theo category/biến thể: xem furniture3d.ts (P5)

const lambert = (color: number, opts: Partial<THREE.MeshLambertMaterialParameters> = {}): THREE.MeshLambertMaterial =>
  new THREE.MeshLambertMaterial({ color, ...opts });

/**
 * Scene 3D kiểu maquette: group riêng cho từng entity → mỗi patch chỉ dựng lại
 * mesh của entity đổi (doc 09 — incremental, không dựng lại cả nhà).
 * Hệ trục: children đặt trong KHÔNG GIAN MODEL (x, y mặt bằng, z lên) — root xoay -90°X sang y-up.
 */
export class Scene3D {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly root = new THREE.Group();
  private readonly env = new THREE.Group();
  private grid: THREE.GridHelper | null = null;
  private readonly groups = new Map<string, THREE.Group>();
  /** Piso de cada grupo y qué grupos son techumbre: para «quitar techo» y «ver por pisos». */
  private readonly groupLevel = new Map<string, string>();
  private readonly roofIds = new Set<string>();
  private levelZ = new Map<string, number>();
  private roofVisible = true;
  private doorsOpen = false;
  /** Pivote de cada hoja abatible y su ángulo abierto (signo según la regla de apertura). */
  private readonly doorPivots = new Set<{ pivot: THREE.Group; open: number }>();
  private levelFilter: string | null = null;
  private readonly openingWall = new Map<string, string>();
  private home: { position: THREE.Vector3; target: THREE.Vector3 } | null = null;
  private dirty = true;
  private disposed = false;

  // ── đi bộ (P5) ─────────────────────────────────────────────
  private walk: {
    pos: THREE.Vector3; // KHÔNG GIAN MODEL (mét)
    yaw: number;
    pitch: number;
    keys: Set<string>;
    onEnd?: () => void;
  } | null = null;
  private lastTick = 0;

  // ── sun study (P5) ─────────────────────────────────────────
  private readonly hemi = new THREE.HemisphereLight(0xe8eef5, 0x3a3f47, 1.05);
  private readonly sun = new THREE.DirectionalLight(0xfff4e0, 0.9);
  private sunMode = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene.background = new THREE.Color(C.bg);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.05, 500);
    this.camera.position.set(9, 8, 12);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.addEventListener("change", () => this.invalidate());

    this.scene.add(this.hemi);
    this.sun.position.set(12, 18, 8);
    this.sun.target.position.set(0, 0, 0);
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.root.rotation.x = -Math.PI / 2;
    this.scene.add(this.root);
    this.root.add(this.env);

    const pane = canvas.parentElement!;
    new ResizeObserver(() => this.resize(pane)).observe(pane);
    this.resize(pane);

    canvas.addEventListener("mousemove", (e) => this.onWalkLook(e));
    // chỉ tự thoát khi ĐÃ TỪNG có pointer lock rồi mất (Esc) — môi trường không cấp
    // lock (headless/e2e) vẫn đi bộ được bằng phím, thoát bằng nút
    let hadLock = false;
    document.addEventListener("pointerlockchange", () => {
      const locked = document.pointerLockElement === this.renderer.domElement;
      if (locked) hadLock = true;
      else if (this.walk && hadLock) {
        hadLock = false;
        this.exitWalk();
      }
    });
    window.addEventListener("keydown", (e) => this.onWalkKey(e, true));
    window.addEventListener("keyup", (e) => this.onWalkKey(e, false));

    const tick = (now?: number): void => {
      if (this.disposed) return;
      requestAnimationFrame(tick);
      const dt = Math.min(0.05, ((now ?? 0) - this.lastTick) / 1000 || 0.016);
      this.lastTick = now ?? 0;
      if (this.walk) this.stepWalk(dt);
      if (this.dirty) {
        this.dirty = false;
        this.renderer.render(this.scene, this.camera);
      }
    };
    tick();
  }

  invalidate(): void {
    this.dirty = true;
  }

  private resize(pane: Element): void {
    const w = pane.clientWidth;
    const h = pane.clientHeight;
    if (w === 0 || h === 0) return; // pane đang ẩn (chế độ Mặt bằng)
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.invalidate();
  }

  // ── Dựng toàn bộ ───────────────────────────────────────────

  setModel(p: Project): void {
    for (const id of [...this.groups.keys()]) this.removeGroup(id);
    this.openingWall.clear();
    this.levelZ = new Map(p.levels.map((l) => [l.id, l.elevation]));

    for (const level of p.levels) {
      for (const w of p.walls) if (w.level === level.id) this.setGroup(w.id, this.buildWall(p, w, level), level.id);
      for (const s of p.slabs) if (s.level === level.id) this.setGroup(s.id, this.buildSlab(s, level), level.id);
      for (const rf of roofsOf(p)) if (rf.level === level.id) this.setGroup(rf.id, this.buildRoof(p, rf, level), level.id, true);
      for (const st of p.stairs) if (st.level === level.id) this.setGroup(st.id, this.buildStair(st, level), level.id);
      for (const f of p.furniture) if (f.level === level.id) this.setGroup(f.id, this.buildFurniture(f, level), level.id);
      for (const r of p.rooms) if (r.level === level.id) this.setGroup(r.id, this.buildRoom(p, r, level), level.id);
    }
    this.buildEnv(p);
    this.applyVisibility();
    if (this.sunMode) this.applyShadowFlags(true);
    this.fitHome();
    this.invalidate();
  }

  /** Áp một patch: chỉ dựng lại entity đổi. Trả danh sách id nên flash. */
  applyOps(model: Project, ops: Op[]): string[] {
    const affected = new Set<string>();
    const walls = new Set<string>();
    let full = false;

    for (const op of ops) {
      const id = op.op === "add" ? String(op.data.id ?? "") : op.id;
      switch (op.entity) {
        case "wall":
          walls.add(id);
          break;
        case "opening": {
          affected.add(id);
          if (op.op === "add") {
            const w = String(op.data.wall ?? "");
            if (w) {
              walls.add(w);
              this.openingWall.set(id, w);
            }
          } else {
            const prev = this.openingWall.get(op.id);
            if (prev) walls.add(prev);
            if (op.op === "update" && typeof op.data.wall === "string") {
              walls.add(op.data.wall);
              this.openingWall.set(op.id, op.data.wall);
            }
            if (op.op === "delete") this.openingWall.delete(op.id);
          }
          break;
        }
        case "level":
          full = true; // đổi cao độ/chiều cao tầng chạm mọi thứ — dựng lại cả nhà (hiếm)
          break;
        case "slab":
        case "roof":
        case "stair":
        case "room":
        case "furniture":
          this.rebuildSingle(model, op.entity, id);
          affected.add(id);
          break;
        default:
          break; // axis/style/finish chưa ảnh hưởng 3D ở P2
      }
    }

    if (full) {
      this.setModel(model);
    } else {
      for (const wid of walls) {
        this.rebuildWall(model, wid);
        affected.add(wid);
      }
      // el frontón de la techumbre sigue a los muros
      if (walls.size) for (const rf of roofsOf(model)) this.rebuildSingle(model, "roof", rf.id);
    }
    this.levelZ = new Map(model.levels.map((l) => [l.id, l.elevation]));
    this.applyVisibility();
    if (!this.home) this.fitHome(); // snapshot đầu có thể là dự án trống — fit ở nhịp đầu tiên có hình
    if (this.sunMode) this.applyShadowFlags(true); // mesh mới dựng chưa có cờ bóng
    this.invalidate();
    return [...affected];
  }

  private rebuildWall(model: Project, wid: string): void {
    const wall = model.walls.find((w) => w.id === wid);
    const level = wall ? model.levels.find((l) => l.id === wall.level) : undefined;
    if (!wall || !level) {
      this.removeGroup(wid);
      for (const [oid, w] of this.openingWall) if (w === wid) this.openingWall.delete(oid);
      return;
    }
    this.setGroup(wid, this.buildWall(model, wall, level), level.id);
  }

  private rebuildSingle(model: Project, entity: "slab" | "roof" | "stair" | "room" | "furniture", id: string): void {
    const list = {
      slab: model.slabs, roof: roofsOf(model), stair: model.stairs, room: model.rooms, furniture: model.furniture,
    }[entity] as Array<{ id: string; level: string }>;
    const e = list.find((x) => x.id === id);
    const level = e ? model.levels.find((l) => l.id === e.level) : undefined;
    if (!e || !level) {
      this.removeGroup(id);
      return;
    }
    const g =
      entity === "slab" ? this.buildSlab(e as Slab, level)
      : entity === "roof" ? this.buildRoof(model, e as Roof, level)
      : entity === "stair" ? this.buildStair(e as Stair, level)
      : entity === "room" ? this.buildRoom(model, e as Room, level)
      : this.buildFurniture(e as Furniture, level);
    this.setGroup(id, g, level.id, entity === "roof");
  }

  // ── Builders (không gian model, mm→m) ──────────────────────

  private buildWall(p: Project, w: Wall, level: Level): THREE.Group {
    const g = new THREE.Group();
    // encuentro de muros: esquinas cerradas (mismo criterio que la planta y el GLB)
    const { wall: jw, shift } = joinedWall(p.walls.filter((x) => x.level === w.level), w);
    const len = wallLength(jw);
    const h = w.height ?? level.height;
    const openings = p.openings.filter((o) => o.wall === w.id);
    for (const o of openings) this.openingWall.set(o.id, w.id);

    g.position.set(jw.from[0] * MM, jw.from[1] * MM, level.elevation * MM);
    g.rotation.z = Math.atan2(w.to[1] - w.from[1], w.to[0] - w.from[0]);

    const bodyMat = w.kind === "kinh" ? lambert(C.glass, { transparent: true, opacity: 0.4 }) : lambert(C.wall);
    const edgeMat = new THREE.LineBasicMaterial({ color: C.edge });
    for (const piece of wallPieces(len, h, openings.map((o) => ({ ...o, offset: o.offset + shift })))) {
      const geo = new THREE.BoxGeometry((piece.u1 - piece.u0) * MM, w.thickness * MM, (piece.z1 - piece.z0) * MM);
      const mesh = new THREE.Mesh(geo, bodyMat);
      mesh.position.set(((piece.u0 + piece.u1) / 2) * MM, 0, ((piece.z0 + piece.z1) / 2) * MM);
      g.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
      edges.position.copy(mesh.position);
      g.add(edges);
    }

    for (const o of openings) {
      const mid = (o.offset + shift + o.width / 2) * MM;
      if (o.kind === "door") {
        const leafKind = p.styles.openings[o.style]?.leaf;
        const swing = o.swing ?? defaultSwing(p, o);
        if (swing === "slide" || swing === "none" || leafKind === "truot" || leafKind === "xep") {
          const leaf = new THREE.Mesh(new THREE.BoxGeometry(o.width * 0.94 * MM, 42 * MM, o.height * MM), lambert(C.door));
          leaf.position.set(mid, 0, (o.height / 2) * MM);
          g.add(leaf);
          continue;
        }
        // abatible: misma regla que la planta (lado "in" = +normal del muro; -L = bisagra en el inicio del vano)
        const side = swing.startsWith("in") ? 1 : -1;
        const x0 = o.offset + shift, x1 = x0 + o.width;
        const leaves: Array<[number, number, number]> = leafKind === "2-canh"
          ? [[x0, 1, o.width / 2], [x1, -1, o.width / 2]]
          : [swing.endsWith("-L") ? [x0, 1, o.width] : [x1, -1, o.width]];
        for (const [hx, dirX, r] of leaves) {
          const pivot = new THREE.Group();
          pivot.position.set(hx * MM, 0, 0);
          const entry = { pivot, open: dirX * side * DOOR_OPEN };
          pivot.rotation.z = this.doorsOpen ? entry.open : 0;
          pivot.userData.door = entry;
          this.doorPivots.add(entry);
          const leaf = new THREE.Mesh(new THREE.BoxGeometry((r - 20) * MM, 40 * MM, (o.height - 10) * MM), lambert(C.door));
          leaf.position.set((dirX * (r / 2)) * MM, 0, (o.height / 2) * MM);
          pivot.add(leaf);
          g.add(pivot);
        }
      } else {
        this.buildWindow(g, o.offset + shift, o.width, o.sill, o.height, p.styles.openings[o.style]?.leaf === "truot");
      }
    }
    return g;
  }

  /**
   * Ventana de aluminio (estilo moderno): marco perimetral y hojas con su perfil y vidrio.
   * Corredera: 2 hojas en rieles distintos que se traslapan al centro. x0 = inicio del vano en el muro.
   */
  private buildWindow(g: THREE.Group, x0: number, w: number, sill: number, h: number, sliding: boolean): void {
    const alu = lambert(ALU.color);
    const glassMat = lambert(C.glass, { transparent: true, opacity: 0.35 });
    const bar = (u0: number, u1: number, z0: number, z1: number, y: number, depth: number): void => {
      const m = new THREE.Mesh(new THREE.BoxGeometry((u1 - u0) * MM, depth * MM, (z1 - z0) * MM), alu);
      m.position.set(((u0 + u1) / 2) * MM, y * MM, ((z0 + z1) / 2) * MM);
      g.add(m);
    };
    /** Rectángulo de perfiles de ancho t (marco o hoja) + vidrio interior. */
    const sash = (u0: number, u1: number, z0: number, z1: number, t: number, y: number, depth: number, glass: boolean): void => {
      bar(u0, u1, z0, z0 + t, y, depth);
      bar(u0, u1, z1 - t, z1, y, depth);
      bar(u0, u0 + t, z0 + t, z1 - t, y, depth);
      bar(u1 - t, u1, z0 + t, z1 - t, y, depth);
      if (!glass) return;
      const pane = new THREE.Mesh(new THREE.BoxGeometry((u1 - u0 - 2 * t) * MM, 6 * MM, (z1 - z0 - 2 * t) * MM), glassMat);
      pane.position.set(((u0 + u1) / 2) * MM, y * MM, ((z0 + z1) / 2) * MM);
      g.add(pane);
    };
    const [z0, z1] = [sill, sill + h];
    const F = ALU.frame, S = ALU.sash;
    sash(x0, x0 + w, z0, z1, F, 0, ALU.depth, false); // marco
    const [a, b, c0, c1] = [x0 + F, x0 + w - F, z0 + F, z1 - F];
    if (sliding) {
      const mid = (a + b) / 2, ov = Math.min(40, (b - a) * 0.04);
      sash(a, mid + ov, c0, c1, S, 14, 24, true); // hoja exterior
      sash(mid - ov, b, c0, c1, S, -14, 24, true); // hoja interior
    } else {
      sash(a, b, c0, c1, S, 0, 30, true);
    }
  }

  private buildSlab(s: Slab, level: Level): THREE.Group {
    const g = new THREE.Group();
    const shape = shapeFrom(s.outline, s.holes);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: s.thickness * MM, bevelEnabled: false });
    const mesh = new THREE.Mesh(geo, lambert(C.slab));
    // floor: mặt trên = cao độ tầng; mái/ô văng: mặt trên = đỉnh tầng
    const top = s.kind === "floor" ? level.elevation : level.elevation + level.height;
    mesh.position.z = top * MM - s.thickness * MM;
    g.add(mesh);
    return g;
  }

  /** Mái dốc (P7): mesh từ faces của roofGeometry — cùng nguồn với 2D. Con frontón lleno en los muros exteriores. */
  private buildRoof(p: Project, rf: Roof, level: Level): THREE.Group {
    const g = new THREE.Group();
    const geom = roofGeometry(rf, level);
    if (rf.kind === "gable") this.buildGables(p, rf, level, geom, g);
    const mat = lambert(C.roof, { side: THREE.DoubleSide });
    const edgeMat = new THREE.LineBasicMaterial({ color: C.edge });
    for (const face of geom.faces) {
      if (face.length < 3) continue;
      // mặt mái không bao giờ thẳng đứng (pitch < 90°) → chiếu XY là đơn ánh,
      // tam giác hóa trên hình chiếu rồi trả về đỉnh 3D
      const flat = face.map(([x, y]) => new THREE.Vector2(x * MM, y * MM));
      const tris = THREE.ShapeUtils.triangulateShape(flat, []);
      const pos: number[] = [];
      for (const tri of tris) {
        for (const i of tri) {
          const v = face[i]!;
          pos.push(v[0] * MM, v[1] * MM, v[2] * MM);
        }
      }
      const buf = new THREE.BufferGeometry();
      buf.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      buf.computeVertexNormals();
      g.add(new THREE.Mesh(buf, mat));

      const outline = face.map(([x, y, z]) => new THREE.Vector3(x * MM, y * MM, z * MM));
      outline.push(outline[0]!.clone());
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outline), edgeMat));
    }
    return g;
  }

  /**
   * Frontón: en cada muro exterior del piso del techo, el paño entre lo alto del muro y la cara
   * inferior de la techumbre (con el quiebre en la cumbrera), con el espesor del muro.
   */
  private buildGables(p: Project, rf: Roof, level: Level, geom: ReturnType<typeof roofGeometry>, g: THREE.Group): void {
    const mat = lambert(C.wall);
    const edgeMat = new THREE.LineBasicMaterial({ color: C.edge });
    const walls = p.walls.filter((w) => w.level === level.id && (w.height ?? level.height) === level.height);
    const top = level.elevation + level.height;
    for (const w of walls) {
      const L = wallLength(w);
      const n = wallNormal(w);
      const exterior = [1, -1].some((sg) => [0.25, 0.5, 0.75].filter((t) => {
        const q = pointOnWall(w, L * t);
        return outdoorAt(p, level.id, [q[0] + n[0] * sg * (w.thickness / 2 + 150), q[1] + n[1] * sg * (w.thickness / 2 + 150)]);
      }).length >= 2);
      if (!exterior) continue;
      // perfil del techo a lo largo del muro (s: distancia desde w.from)
      const N = 24;
      const prof: Array<[number, number]> = [];
      for (let i = 0; i <= N; i++) {
        const sv = (L * i) / N;
        const q = pointOnWall(w, sv);
        if (!pointInPolygon(q, rf.outline)) continue;
        prof.push([sv, geom.zAt(q)]);
      }
      if (prof.length < 2 || Math.max(...prof.map(([, z]) => z)) - top < 30) continue;
      // paño en coordenadas locales del muro (u = s, v = z) extruido con el espesor
      const shape = new THREE.Shape();
      shape.moveTo(prof[0]![0] * MM, top * MM);
      for (const [sv, z] of prof) shape.lineTo(sv * MM, Math.max(top, z) * MM);
      shape.lineTo(prof[prof.length - 1]![0] * MM, top * MM);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: w.thickness * MM, bevelEnabled: false });
      geo.translate(0, 0, (-w.thickness / 2) * MM);
      const mesh = new THREE.Mesh(geo, mat);
      const holder = new THREE.Group();
      holder.position.set(w.from[0] * MM, w.from[1] * MM, 0);
      holder.rotation.z = Math.atan2(w.to[1] - w.from[1], w.to[0] - w.from[0]);
      mesh.rotation.x = Math.PI / 2; // (u, v, espesor) → (x, z, -y)
      holder.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
      edges.rotation.x = Math.PI / 2;
      holder.add(edges);
      g.add(holder);
    }
  }

  private buildStair(st: Stair, level: Level): THREE.Group {
    const g = new THREE.Group();
    const layout = stairLayout(st, level);
    const riser = layout.riser * MM;
    const mat = lambert(C.stair);

    for (const flight of layout.flights) {
      const yaw = Math.atan2(flight.dir[1], flight.dir[0]);
      const geo = new THREE.BoxGeometry(st.width * MM, st.tread * MM, riser); // +y local = chiều đi
      for (let i = 0; i < flight.treads; i++) {
        const stepIdx = flight.firstStep + i;
        const cx = flight.start[0] + flight.dir[0] * (i + 0.5) * st.tread;
        const cy = flight.start[1] + flight.dir[1] * (i + 0.5) * st.tread;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(cx * MM, cy * MM, (stepIdx - 0.5) * riser);
        mesh.rotation.z = yaw - Math.PI / 2; // BoxGeometry +y ↔ hướng đi
        g.add(mesh);
      }
    }
    if (layout.landing) {
      const f1 = layout.flights[0]?.treads ?? 0;
      const depth = 140 * MM;
      const mesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shapeFrom(layout.landing), { depth, bevelEnabled: false }),
        mat,
      );
      mesh.position.z = f1 * riser - depth;
      g.add(mesh);
    }
    g.position.z = level.elevation * MM;
    return g;
  }

  private buildFurniture(f: Furniture, level: Level): THREE.Group {
    const g = new THREE.Group();
    const asset = getAsset(f.asset);
    if (!asset) return g;
    g.add(buildFurnitureLocal(asset, f.asset));
    // đồ treo tường: mountHeight của asset là cao độ mặc định khi instance chưa đặt
    const elevation = f.elevation ?? asset.mountHeight ?? 0;
    g.position.set(f.at[0] * MM, f.at[1] * MM, (level.elevation + elevation) * MM);
    g.rotation.z = f.rotation * DEG;
    return g;
  }

  private buildRoom(p: Project, r: Room, level: Level): THREE.Group {
    const g = new THREE.Group();
    // sàn theo vật liệu hoàn thiện (P5) — chưa gán thì tint theo công năng như cũ
    const finish = r.finish?.floor ? p.finishes[r.finish.floor] : undefined;
    const tint = new THREE.Mesh(
      new THREE.ShapeGeometry(shapeFrom(r.polygon)),
      finish?.color
        ? lambert(new THREE.Color(finish.color).getHex(), { side: THREE.DoubleSide })
        : lambert(ROOM_TINT[r.use] ?? 0xb8b0a0, { transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
    );
    g.add(tint);

    const label = makeLabel(r.name);
    if (label) {
      const [cx, cy] = centroid(r.polygon);
      label.position.set(cx * MM, cy * MM, 0.05);
      g.add(label);
    }
    g.position.z = (level.elevation + 6) * MM;
    return g;
  }

  private buildEnv(p: Project): void {
    disposeChildren(this.env);
    if (this.grid) {
      this.scene.remove(this.grid);
      this.grid.geometry.dispose();
      (this.grid.material as THREE.Material).dispose();
      this.grid = null;
    }
    const b = p.site.boundary;
    if (b.length < 3) return;

    const loop = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(b.map(([x, y]) => new THREE.Vector3(x * MM, y * MM, 0.004))),
      new THREE.LineBasicMaterial({ color: C.boundary }),
    );
    this.env.add(loop);

    const xs = b.map((q) => q[0]);
    const ys = b.map((q) => q[1]);
    const minX = Math.min(...xs) - 3000;
    const maxX = Math.max(...xs) + 3000;
    const minY = Math.min(...ys) - 3000;
    const maxY = Math.max(...ys) + 3000;
    if (p.site.terrain?.elevations?.length) {
      // đất dốc (P7): lưới 32×32 nhấp nhô theo groundAt (IDW từ cao độ đỉnh ranh)
      const SEG = 32;
      const geo = new THREE.PlaneGeometry((maxX - minX) * MM, (maxY - minY) * MM, SEG, SEG);
      const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const mx = (minX + maxX) / 2 + posAttr.getX(i) / MM;
        const my = (minY + maxY) / 2 + posAttr.getY(i) / MM;
        posAttr.setZ(i, groundAt(p, [mx, my]) * MM - 0.03);
      }
      geo.computeVertexNormals();
      const ground = new THREE.Mesh(geo, lambert(C.ground));
      ground.position.set(((minX + maxX) / 2) * MM, ((minY + maxY) / 2) * MM, 0);
      ground.receiveShadow = true;
      this.env.add(ground);
      // ranh đất bám theo mặt đất
      loop.geometry.setFromPoints(b.map(([x, y]) => new THREE.Vector3(x * MM, y * MM, groundAt(p, [x, y]) * MM + 0.004)));
    } else {
      const ground = new THREE.Mesh(
        new THREE.ShapeGeometry(shapeFrom([[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]])),
        lambert(C.ground),
      );
      ground.position.z = -0.03;
      this.env.add(ground);
    }

    const size = Math.max(maxX - minX, maxY - minY) * MM;
    this.grid = new THREE.GridHelper(size, Math.round(size), 0x2c323b, 0x262b32);
    this.grid.position.set(((minX + maxX) / 2) * MM, -0.02, -((minY + maxY) / 2) * MM);
    this.scene.add(this.grid);
  }

  // ── Visibilidad: quitar techo / ver por pisos ──────────────

  /** Puertas abatibles abiertas (90°) o cerradas. */
  setDoorsOpen(open: boolean): void {
    this.doorsOpen = open;
    for (const d of this.doorPivots) d.pivot.rotation.z = open ? d.open : 0;
    this.invalidate();
  }

  /** Muestra u oculta la techumbre (con sus frontones). */
  setRoofVisible(on: boolean): void {
    this.roofVisible = on;
    this.applyVisibility();
  }

  /** Ver por pisos: muestra hasta el piso dado, sin techo ni pisos superiores (null = todo). */
  setLevelFilter(levelId: string | null): void {
    this.levelFilter = levelId;
    this.applyVisibility();
  }

  private applyVisibility(): void {
    const maxZ = this.levelFilter != null ? this.levelZ.get(this.levelFilter) ?? Infinity : Infinity;
    for (const [id, g] of this.groups) {
      const z = this.levelZ.get(this.groupLevel.get(id) ?? "") ?? -Infinity;
      const isRoof = this.roofIds.has(id);
      g.visible = z <= maxZ && !(isRoof && (!this.roofVisible || this.levelFilter != null));
    }
    this.invalidate();
  }

  // ── Nhìn ───────────────────────────────────────────────────

  private fitHome(): void {
    const box = new THREE.Box3();
    for (const g of this.groups.values()) box.expandByObject(g);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(box.getSize(new THREE.Vector3()).length() / 2, 1);
    const position = center.clone().add(new THREE.Vector3(0.95, 0.8, 0.95).normalize().multiplyScalar(radius * 2.3));
    this.camera.near = Math.max(radius / 200, 0.02);
    this.camera.far = radius * 40;
    this.camera.updateProjectionMatrix();
    this.home = { position, target: center };
    this.resetView();
  }

  resetView(): void {
    if (!this.home) this.fitHome();
    if (!this.home) return;
    this.camera.position.copy(this.home.position);
    this.controls.target.copy(this.home.target);
    this.controls.update();
    this.invalidate();
  }

  /** Flash 1.5s các entity vừa đổi (doc 09) — opening flash qua tường chứa nó. */
  flash(ids: string[]): void {
    const groups = new Set<THREE.Group>();
    for (const id of ids) {
      const g = this.groups.get(id) ?? this.groups.get(this.openingWall.get(id) ?? "");
      if (g) groups.add(g);
    }
    for (const g of groups) {
      const restore: Array<{ mat: THREE.MeshLambertMaterial; prev: number }> = [];
      g.traverse((obj) => {
        const mat = (obj as THREE.Mesh).material as THREE.Material | undefined;
        if (mat instanceof THREE.MeshLambertMaterial) {
          restore.push({ mat, prev: mat.emissive.getHex() });
          mat.emissive.setHex(C.flash);
        }
      });
      setTimeout(() => {
        for (const { mat, prev } of restore) mat.emissive.setHex(prev);
        this.invalidate();
      }, 1500);
    }
    this.invalidate();
  }

  // ── Đi bộ WASD (doc 09: pointer-lock, cao mắt 1600mm) ────────

  get walking(): boolean {
    return this.walk != null;
  }

  /**
   * Vào chế độ đi bộ tại tầng `level`, xuất phát `spawn` (mm model, bỏ trống =
   * tâm nhà). onEnd gọi khi thoát (Esc/pointer lock mất) để UI cập nhật nút.
   */
  enterWalk(level: Level, spawn?: [number, number], onEnd?: () => void): void {
    if (this.walk) return;
    const at = spawn ?? this.modelCenterXY();
    const eye = (level.elevation + 1600) * MM;
    const center = this.modelCenterXY();
    const yaw = Math.atan2(center[0] * MM - at[0] * MM, center[1] * MM - at[1] * MM) || 0;
    this.walk = {
      pos: new THREE.Vector3(at[0] * MM, at[1] * MM, eye),
      yaw,
      pitch: 0,
      keys: new Set(),
      ...(onEnd ? { onEnd } : {}),
    };
    this.controls.enabled = false;
    this.camera.fov = 60;
    this.camera.updateProjectionMatrix();
    this.renderer.domElement.requestPointerLock?.();
    this.applyWalkCamera();
  }

  exitWalk(): void {
    if (!this.walk) return;
    const onEnd = this.walk.onEnd;
    this.walk = null;
    if (document.pointerLockElement === this.renderer.domElement) document.exitPointerLock();
    this.controls.enabled = true;
    this.camera.fov = 45;
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.invalidate();
    onEnd?.();
  }

  private modelCenterXY(): [number, number] {
    const box = new THREE.Box3();
    for (const g of this.groups.values()) box.expandByObject(g);
    if (box.isEmpty()) return [0, 0];
    const c = box.getCenter(new THREE.Vector3()); // children nằm trong không gian model của root
    return [c.x / MM, c.y / MM];
  }

  private onWalkKey(e: KeyboardEvent, down: boolean): void {
    if (!this.walk) return;
    const k = e.key.toLowerCase();
    if (k === "escape" && down) {
      // tự thoát — không dựa vào trình duyệt nhả pointer lock (headless không có lock)
      this.exitWalk();
      return;
    }
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"].includes(k)) {
      if (down) this.walk.keys.add(k);
      else this.walk.keys.delete(k);
      e.preventDefault();
    }
  }

  private onWalkLook(e: MouseEvent): void {
    if (!this.walk || document.pointerLockElement !== this.renderer.domElement) return;
    this.walk.yaw += e.movementX * 0.0022;
    this.walk.pitch = Math.min(1.35, Math.max(-1.35, this.walk.pitch - e.movementY * 0.0022));
    this.applyWalkCamera();
  }

  private stepWalk(dt: number): void {
    const w = this.walk!;
    if (w.keys.size === 0) return;
    const speed = (w.keys.has("shift") ? 4.2 : 2.1) * dt; // m/s — bước đi người thật
    const fwd = [Math.sin(w.yaw), Math.cos(w.yaw)];
    const right = [Math.cos(w.yaw), -Math.sin(w.yaw)];
    let dx = 0, dy = 0;
    if (w.keys.has("w") || w.keys.has("arrowup")) { dx += fwd[0]!; dy += fwd[1]!; }
    if (w.keys.has("s") || w.keys.has("arrowdown")) { dx -= fwd[0]!; dy -= fwd[1]!; }
    if (w.keys.has("d") || w.keys.has("arrowright")) { dx += right[0]!; dy += right[1]!; }
    if (w.keys.has("a") || w.keys.has("arrowleft")) { dx -= right[0]!; dy -= right[1]!; }
    const len = Math.hypot(dx, dy);
    if (len === 0) return;
    w.pos.x += (dx / len) * speed;
    w.pos.y += (dy / len) * speed;
    this.applyWalkCamera();
  }

  private applyWalkCamera(): void {
    const w = this.walk;
    if (!w) return;
    this.root.updateWorldMatrix(true, false);
    const eye = this.root.localToWorld(w.pos.clone());
    const dir = new THREE.Vector3(
      Math.sin(w.yaw) * Math.cos(w.pitch),
      Math.cos(w.yaw) * Math.cos(w.pitch),
      Math.sin(w.pitch),
    );
    const target = this.root.localToWorld(w.pos.clone().add(dir));
    this.camera.position.copy(eye);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(target);
    this.invalidate();
  }

  // ── Sun study (doc 09: slider giờ + tháng) ───────────────────

  /** Bật/tắt chế độ nắng. null = về ánh sáng studio mặc định. */
  setSun(opts: { hour: number; month: number; lat: number; north: number } | null): void {
    this.sunMode = opts != null;
    if (!opts) {
      this.renderer.shadowMap.enabled = false;
      this.hemi.intensity = 1.05;
      this.sun.intensity = 0.9;
      this.sun.castShadow = false;
      this.sun.position.set(12, 18, 8);
      this.applyShadowFlags(false);
      this.invalidate();
      return;
    }
    const s = sunPosition(opts.hour, opts.month, opts.lat, opts.north);
    const up = s.altitude > 0;
    this.renderer.shadowMap.enabled = up;
    this.hemi.intensity = up ? 0.45 : 0.22;
    this.sun.intensity = up ? 1.25 : 0;
    this.sun.castShadow = up;
    // dir model (z lên) → world của root (y lên): (x, z, -y)
    const R = 40;
    this.sun.position.set(s.dir[0] * R, s.dir[2] * R, -s.dir[1] * R);
    const box = new THREE.Box3();
    for (const g of this.groups.values()) box.expandByObject(g);
    const radius = box.isEmpty() ? 15 : box.getSize(new THREE.Vector3()).length() / 2 + 2;
    const cam = this.sun.shadow.camera;
    cam.left = -radius; cam.right = radius; cam.top = radius; cam.bottom = -radius;
    cam.near = 1; cam.far = R * 2 + radius;
    cam.updateProjectionMatrix();
    this.sun.shadow.mapSize.set(2048, 2048);
    this.applyShadowFlags(up);
    this.invalidate();
  }

  /** Gắn cờ đổ bóng cho mọi mesh hiện có — gọi lại sau mỗi lần dựng khi đang bật nắng. */
  private applyShadowFlags(on: boolean): void {
    this.root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = on;
        obj.receiveShadow = on;
      }
    });
  }

  /** Chụp canvas — camera mm không gian model, bỏ trống giữ góc người dùng. Trả base64 PNG. */
  capture(cam?: CaptureCamera): string {
    this.root.updateWorldMatrix(true, false);
    if (cam?.position) this.camera.position.copy(this.toWorld(cam.position));
    if (cam?.lookAt) this.controls.target.copy(this.toWorld(cam.lookAt));
    if (cam?.position || cam?.lookAt) this.controls.update();
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL("image/png").split(",")[1]!;
  }

  private toWorld([x, y, z]: [number, number, number]): THREE.Vector3 {
    return this.root.localToWorld(new THREE.Vector3(x * MM, y * MM, z * MM));
  }

  // ── Quản lý group ──────────────────────────────────────────

  private setGroup(id: string, g: THREE.Group, levelId?: string, roof = false): void {
    this.removeGroup(id);
    g.name = id;
    this.groups.set(id, g);
    if (levelId) this.groupLevel.set(id, levelId);
    if (roof) this.roofIds.add(id);
    this.root.add(g);
    this.applyVisibility();
  }

  private removeGroup(id: string): void {
    const g = this.groups.get(id);
    if (!g) return;
    g.traverse((obj) => { if (obj.userData.door) this.doorPivots.delete(obj.userData.door as { pivot: THREE.Group; open: number }); });
    disposeChildren(g);
    this.root.remove(g);
    this.groups.delete(id);
    this.groupLevel.delete(id);
    this.roofIds.delete(id);
  }
}

function shapeFrom(outline: ReadonlyArray<[number, number]>, holes?: ReadonlyArray<ReadonlyArray<[number, number]>>): THREE.Shape {
  const shape = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x * MM, y * MM)));
  for (const hole of holes ?? []) {
    shape.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x * MM, y * MM))));
  }
  return shape;
}

function centroid(poly: ReadonlyArray<[number, number]>): [number, number] {
  let sx = 0;
  let sy = 0;
  for (const [x, y] of poly) {
    sx += x;
    sy += y;
  }
  return [sx / poly.length, sy / poly.length];
}

function makeLabel(text: string): THREE.Sprite | null {
  if (!text.trim()) return null;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const font = "600 40px 'Be Vietnam Pro', 'Segoe UI', sans-serif";
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + 24;
  canvas.width = w;
  canvas.height = 56;
  ctx.font = font;
  ctx.fillStyle = C.label;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12, 30);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }),
  );
  const worldW = Math.min(2.2, Math.max(0.8, w / 260));
  sprite.scale.set(worldW, worldW * (56 / w), 1);
  return sprite;
}

function disposeChildren(g: THREE.Object3D): void {
  g.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) for (const m of mat) m.dispose();
    else if (mat) {
      const tex = (mat as THREE.SpriteMaterial).map;
      if (tex) tex.dispose();
      mat.dispose();
    }
  });
  g.clear();
}
