import path from "node:path";

/**
 * A2: une `dir` + `name` y exige que el resultado quede DENTRO de `dir`
 * (sin `..`, rutas absolutas ni el propio directorio). Se usa en cada escritura de exportes.
 */
export function safeJoin(dir: string, name: string): string {
  // la barra invertida separa rutas en Windows pero no en Linux/macOS: se rechaza en todos para
  // que "..\x" no pase en un sistema y falle en otro (los nombres de exporte nunca la usan)
  if (name.includes("\\")) throw new Error(`Ruta fuera del directorio permitido: ${JSON.stringify(name)}.`);
  const base = path.resolve(dir);
  const full = path.resolve(base, name);
  if (!full.startsWith(base + path.sep)) {
    throw new Error(`Ruta fuera del directorio permitido: ${JSON.stringify(name)}.`);
  }
  return full;
}
