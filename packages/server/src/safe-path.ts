import path from "node:path";

/**
 * A2: une `dir` + `name` y exige que el resultado quede DENTRO de `dir`
 * (sin `..`, rutas absolutas ni el propio directorio). Se usa en cada escritura de exportes.
 */
export function safeJoin(dir: string, name: string): string {
  const base = path.resolve(dir);
  const full = path.resolve(base, name);
  if (!full.startsWith(base + path.sep)) {
    throw new Error(`Ruta fuera del directorio permitido: ${JSON.stringify(name)}.`);
  }
  return full;
}
