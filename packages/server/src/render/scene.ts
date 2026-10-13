import type { Point } from "@arquitecto/core";

/**
 * SceneGraph2D trung gian (doc 08): mọi writer (SVG P1, DXF P4)
 * cùng đọc một nguồn primitive — không bao giờ lệch nhau.
 *
 * Quy ước không gian:
 * - space "model" (mặc định): tọa độ mm THẬT — writer transform điểm-điểm.
 * - space "paper": mm GIẤY trên khổ A3 (gốc trên-trái, y XUỐNG) — khung, khung tên.
 * - weight (độ dày nét) và size chữ LUÔN là mm giấy (paper-space).
 */

export const LAYERS = [
  "CALCO", // bản vẽ cũ/ảnh đồ lại — LUÔN dưới cùng, chỉ có ở plan live (không vào bộ tờ)
  "EJES",
  "MUROS-CORTE",
  "MUROS-VISTA",
  "VANOS",
  "ESCALERAS",
  "TECHUMBRE", // mái dốc (P7): nét mái mặt bằng, hình mái mặt đứng/mặt cắt
  "MOBILIARIO",
  "ARTEFACTOS", // sanitarios y cocina: tenues, se ven sobre todo en 3D
  "COTAS",
  "TEXTOS",
  "ACHURADOS",
  "VINETA",
] as const;

export type LayerName = (typeof LAYERS)[number];

/** Ejes: rojos, segmentados y finos (segundo plano). Marca de corte: magenta, segmentada y gruesa. */
export const AXIS_COLOR = "#d23c3c";
export const CUT_COLOR = "#c000c0";

export type Prim =
  | { kind: "line"; a: Point; b: Point; weight: number; dash?: string; color?: string }
  | { kind: "polyline"; pts: Point[]; weight: number; dash?: string; close?: boolean; color?: string }
  | { kind: "polygon"; pts: Point[]; fill?: string; weight?: number }
  | { kind: "circle"; c: Point; r: number; weight: number; fill?: string; rPaper?: boolean; color?: string }
  | { kind: "ellipse"; c: Point; rx: number; ry: number; rot: number; weight: number; color?: string }
  | { kind: "arc"; c: Point; r: number; a0: number; a1: number; weight: number; dash?: string }
  | {
      kind: "text";
      /** Color del texto (por defecto negro). */
      color?: string;
      at: Point;
      text: string;
      size: number; // mm giấy
      anchor?: "start" | "middle" | "end";
      bold?: boolean;
      /** Xoay chữ theo hướng đoạn model (writer tự chống lộn ngược đầu). */
      along?: { from: Point; to: Point };
    }
  | {
      /**
       * Ảnh raster đặt trong KHÔNG GIAN MODEL (underlay đồ lại) — chỉ SVG writer
       * vẽ; DXF writer bỏ qua. origin = model mm của góc DƯỚI-TRÁI ảnh,
       * scale = mm/pixel, rot = độ CCW quanh origin (cùng quy ước Underlay).
       */
      kind: "image";
      href: string;
      wpx: number;
      hpx: number;
      origin: Point;
      scale: number;
      rot: number;
    }
  | {
      /**
       * Cota semántica: el SVG la ignora (dibuja líneas, remates y texto ya presentes en la
       * escena); el DXF la exporta como entidad DIMENSION real (editable en AutoCAD).
       * a/b = puntos medidos; line = punto de la línea de cota; rot = 0 (horizontal) o 90;
       * text/textAt = valor mostrado (cm) y su posición, iguales a los del texto del SVG.
       */
      kind: "dim";
      a: Point;
      b: Point;
      line: Point;
      rot: 0 | 90;
      text: string;
      textAt: Point;
    }
  | {
      /**
       * Hoja de puerta abatible semántica: el SVG la ignora (dibuja hoja + arco ya presentes);
       * el DXF la exporta como INSERT de un bloque de biblioteca PUERTA-<r> en la capa PUERTAS.
       * a0 = dirección de la hoja cerrada, a1 = abierta (grados); siempre 90° entre ambas.
       */
      kind: "door";
      hinge: Point;
      r: number;
      a0: number;
      a1: number;
    };

export type SceneItem = {
  layer: LayerName;
  prim: Prim;
  dataId?: string;
  space?: "model" | "paper";
  /** Độ mờ 0..1 (underlay) — writer SVG áp lên element; DXF bỏ qua. */
  opacity?: number;
};

export type Scene2D = SceneItem[];

/** Bộ nét chuẩn (mm giấy) — doc 08. */
export const W = {
  hair: 0.13,
  thin: 0.18,
  mid: 0.25,
  strong: 0.35,
  cut: 0.5,
  frame: 0.7,
} as const;
