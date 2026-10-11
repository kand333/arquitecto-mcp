# LOW — Estáticos con prefijo sin separador, WS sin tope de mensaje, temporales sin borrar

**Hallazgos de la auditoría (bajos):**
- Comprobación de prefijo de estáticos sin separador (`live.ts:324-327` del upstream): `file.startsWith(dist)` acepta una carpeta hermana con el mismo prefijo (`dist-secreto/`), y un `decodeURIComponent` mal formado lanza (500).
- `maxPayload` del WebSocket: se usaba el default de `ws` (100 MB).
- Carpetas temporales `mkdtemp` que nunca se borran (`assets_search` y `variant_compare` en `tools.ts`).

**Tests:** bloques `LOW` en `server/src/live.test.ts` y `server/src/mcp.test.ts`.

## Antes del fix (rojo)

- Fecha: 2026-10-11 · Commit base: `8e27aa0`
- Comando: `npx vitest run packages/server/src/live.test.ts packages/server/src/mcp.test.ts -t "LOW" --reporter=verbose --no-color`

Nota: el primer test muestra que `dist-secreto/x.txt` se sirve (200); el de temporales, que cada llamada a `assets_search` deja una carpeta `arquitecto-assets-*` más en el temp del sistema.

```text
 × packages/server/src/live.test.ts > LOW — estáticos confinados a dist y maxPayload del WS > una carpeta hermana con el mismo prefijo que dist → 403; URL mal codificada → 400 164ms
 × packages/server/src/mcp.test.ts > LOW — assets_search no deja carpetas temporales > con o sin Chromium, el mkdtemp de la lámina PNG se borra 1017ms
 × packages/server/src/live.test.ts > LOW — estáticos confinados a dist y maxPayload del WS > WS: un mensaje de más de 2 MB cierra la conexión (1009) 2057ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯
AssertionError: expected 200 to be 403 // Object.is equality
 ❯ packages/server/src/live.test.ts:430:25
AssertionError: expected -1 to be 1009 // Object.is equality
 ❯ packages/server/src/live.test.ts:442:18
AssertionError: expected 9 to be 8 // Object.is equality
 ❯ packages/server/src/mcp.test.ts:298:21
 Test Files  2 failed (2)
      Tests  3 failed | 25 skipped (28)
```

## Fix

- `live.ts` estáticos: `decodeURIComponent` en try/catch → `400`; la ruta pasa por `safeJoin(dist, rel)` (separador incluido) → fuera de `dist` = `403`.
- `live.ts` WS: `maxPayload: 2 MB`.
- `tools.ts`: `renderTempPng(prefix, render)` crea el `mkdtemp`, renderiza y lo borra en `finally` (también si Chromium falla). Lo usan `assets_search` y `variant_compare`.

Ajuste del test nuevo de WS: con `maxPayload` superado, `ws` cierra con `1009`, pero si el cliente aún está enviando solo ve el corte (`1006`). El test exige que la conexión se cierre (`1009` o `1006`); antes del fix seguía abierta (`-1`). Estable en 3 corridas seguidas.

## Después del fix (verde)

- Fecha: 2026-10-11
- Comando: el mismo de arriba.

```text
 ✓ packages/server/src/live.test.ts > LOW — estáticos confinados a dist y maxPayload del WS > una carpeta hermana con el mismo prefijo que dist → 403; URL mal codificada → 400 150ms
 ✓ packages/server/src/live.test.ts > LOW — estáticos confinados a dist y maxPayload del WS > WS: un mensaje de más de 2 MB cierra la conexión 72ms
 ✓ packages/server/src/mcp.test.ts > LOW — assets_search no deja carpetas temporales > con o sin Chromium, el mkdtemp de la lámina PNG se borra 856ms
 Test Files  2 passed (2)
      Tests  3 passed | 25 skipped (28)
```

Suite completa: `pnpm typecheck` verde; `pnpm test` → 248 passed, 1 failed (PDF: Chromium, preexistente), 17 skipped.
