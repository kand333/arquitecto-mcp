import path from "node:path";

/**
 * A2: une `dir` + `name` y exige que el resultado quede DENTRO de `dir`
 * (sin `..`, rutas absolutas ni el propio directorio). Se usa en cada escritura de exportes.
 */
export function safeJoin(dir: string, name: string): string {
  const base = path.resolve(dir);
  // la barra invertida es separador en Windows pero no en Linux/macOS: se trata como separador en
  // todos, así "..\x" es traversal en cualquier sistema (y las rutas de Windows siguen valiendo)
  const full = path.resolve(base, name.replace(/\\/g, "/"));
  if (!full.startsWith(base + path.sep)) {
    throw new Error(`Ruta fuera del directorio permitido: ${JSON.stringify(name)}.`);
  }
  return full;
}
