import type { Project } from "./types.js";
import casaPrueba2pJson from "../fixtures/casa-prueba-2p.json" with { type: "json" };
import casa2PisosJson from "../fixtures/casa-2-pisos.json" with { type: "json" };
import casa1PisoJson from "../fixtures/casa-1-piso.json" with { type: "json" };
import depto2dJson from "../fixtures/depto-2d.json" with { type: "json" };
import detachedUkJson from "../fixtures/detached-uk.json" with { type: "json" };

/** Casa de prueba (solo tests): 4×16 m, 2 pisos con escalera, 3 dormitorios — base de los goldens. */
export const CASA_PRUEBA_2P = casaPrueba2pJson as unknown as Project;

/** Copia profunda para que los tests no ensucien la fixture original. */
export function loadCasaPrueba2p(): Project {
  return structuredClone(CASA_PRUEBA_2P);
}

/** Plantilla casa-2-pisos: techo hip, sitio en esquina con dos frentes y pendiente ~1,1 m. */
export const CASA_2_PISOS = casa2PisosJson as unknown as Project;

export function loadCasa2Pisos(): Project {
  return structuredClone(CASA_2_PISOS);
}

/** Plantilla casa-1-piso: un piso, sin escalera, techo de planchas a dos aguas. */
export const CASA_1_PISO = casa1PisoJson as unknown as Project;

export function loadCasa1Piso(): Project {
  return structuredClone(CASA_1_PISO);
}

/** Plantilla depto-2d: remodelación sin terreno; el deslinde es el contorno del departamento. */
export const DEPTO_2D = depto2dJson as unknown as Project;

export function loadDepto2d(): Project {
  return structuredClone(DEPTO_2D);
}

/** Solo tests (P9): casa UK región "uk", prueba la arquitectura multirregión con el pack Approved Documents. */
export const DETACHED_UK = detachedUkJson as unknown as Project;

export function loadDetachedUk(): Project {
  return structuredClone(DETACHED_UK);
}
