import type { Project } from "./types.js";
import casaPrueba2pJson from "../fixtures/casa-prueba-2p.json" with { type: "json" };
import casa2PisosJson from "../fixtures/casa-2-pisos.json" with { type: "json" };
import casa1PisoJson from "../fixtures/casa-1-piso.json" with { type: "json" };
import nhaVuonJson from "../fixtures/nha-vuon.json" with { type: "json" };
import depto2dJson from "../fixtures/depto-2d.json" with { type: "json" };
import detachedUkJson from "../fixtures/detached-uk.json" with { type: "json" };

/** Fixture chuẩn: nhà ống 4×16m, 2 tầng, 3PN — dùng cho golden tests + template. */
export const CASA_PRUEBA_2P = casaPrueba2pJson as unknown as Project;

/** Bản sao sâu để test/mutation không làm bẩn fixture gốc. */
export function loadCasaPrueba2p(): Project {
  return structuredClone(CASA_PRUEBA_2P);
}

/**
 * Fixture P7 (DoD doc 12): biệt thự 2 tầng MÁI HIP trên LÔ GÓC 2 mặt tiền,
 * ĐẤT DỐC ~1.1m — bài tổng hợp mái dốc + đa mặt tiền + địa hình.
 */
export const CASA_2_PISOS = casa2PisosJson as unknown as Project;

export function loadCasa2Pisos(): Project {
  return structuredClone(CASA_2_PISOS);
}

/** Fixture P8: nhà cấp 4 một tầng — không thang, mái tôn gable, mẫu nhập môn. */
export const CASA_1_PISO = casa1PisoJson as unknown as Project;

export function loadCasa1Piso(): Project {
  return structuredClone(CASA_1_PISO);
}

/** Fixture P8: nhà vườn — lô lớn méo + terrain nhẹ, 1 tầng mái ngói hip, mật độ ~21%. */
export const NHA_VUON = nhaVuonJson as unknown as Project;

export function loadNhaVuon(): Project {
  return structuredClone(NHA_VUON);
}

/** Fixture P8: căn hộ cải tạo — KHÔNG lô đất, boundary = khung căn hộ có sẵn. */
export const DEPTO_2D = depto2dJson as unknown as Project;

export function loadDepto2d(): Project {
  return structuredClone(DEPTO_2D);
}

/**
 * Fixture P9 (DoD doc 12): detached UK 2 tầng gable — region "uk", validate
 * bằng pack Approved Documents, KHÔNG dính TCVN/Lỗ Ban/VND ở bất kỳ đâu.
 */
export const DETACHED_UK = detachedUkJson as unknown as Project;

export function loadDetachedUk(): Project {
  return structuredClone(DETACHED_UK);
}
