export const CORE_VERSION = "0.1.0";

export * from "./types.js";
export * from "./ids.js";
export * from "./catalog.js";
export * from "./issues.js";
export * from "./model.js";
export {
  CASA_2_PISOS, DEPTO_2D, DETACHED_UK, CASA_1_PISO, CASA_PRUEBA_2P, NHA_VUON,
  loadCasa2Pisos, loadDepto2d, loadDetachedUk, loadCasa1Piso, loadCasaPrueba2p, loadNhaVuon,
} from "./fixture.js";

export * from "./geometry/vec.js";
export * from "./geometry/segment.js";
export * from "./geometry/polygon.js";
export * from "./geometry/wall.js";
export * from "./geometry/wall-pieces.js";
export * from "./geometry/obb.js";
export * from "./geometry/stair.js";
export * from "./geometry/roof.js";

export * from "./estimate.js";

export * from "./ops/ops.js";
export * from "./ops/apply.js";
export * from "./ops/summary.js";

export * from "./protocol.js";

export * from "./validate/rules.js";
export * from "./validate/loban.js";
export * from "./validate/engine.js";
export type { Finding } from "./validate/finding.js";
