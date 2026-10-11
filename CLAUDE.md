# CLAUDE.md — arquitecto-mcp

## Antes de empezar
- Lee `CONTEXTO.md`: plan por etapas (E0–E6), estado actual, decisiones y vulnerabilidades pendientes. Ejecuta una etapa por sesión, sigue su método didáctico y actualiza «Estado actual» al cerrarla.
- `D:\0Claude\Atelier-main` es el upstream: solo lectura. No abras Claude Code allí; trae hooks y MCP de `haido`. Rechaza cualquier hook o servidor MCP de proyecto que se ofrezca confiar.
- Sin remotos ni push salvo pedido explícito.

## Convenciones
- UI, descripciones de herramientas MCP, mensajes y docs: español. Código, identificadores y commits: inglés. El legado VN se borró en E4b (packs `std-vn`/`loban`/`pln`, región `vn`, VND, diccionario `vi`); la región por defecto es `cl`. Quedan claves de esquema (`quy_hoach`, `dien_tich`…), rótulos de planos exportados y comentarios en vietnamita: no los expongas en superficies nuevas.
- Nombres: `@arquitecto/{core,server,web}`, bin `arquitecto-mcp`, servidor MCP `arquitecto`, env `ARQUITECTO_*`, archivos `arquitecto.project.json` y `.arquitecto/`.
- No renombres «Atelier» en: `LICENSE`, URLs `github.com/lebac-svg/Atelier`, `docs/reference-en/`, `packages/core/assets/license-manifest.json`. Es atribución o referencia upstream.
- `@arquitecto/core` es puro: sin imports `node:` ni DOM en `src/` (salvo tests). Disco, red y render van en `server`.
- Reglas normativas = datos en `packages/core/rules/*.json`, cada regla con `source`. Las de Chile llevan `verified: false` hasta que el usuario las valide; nunca inventes un artículo o un valor.
- Packs Chile (`rules/cl.json` OGUC + `rules/cl-cip.json` CIP declarado por el usuario, región `cl`): toda regla `CL-*` debe tener su fila en `docs/oguc-sources.md` con cita literal cotejada contra la fuente oficial (`cl.test.ts` exige la correspondencia). Si falta un dato, el evaluador emite `CL-INDET` (`info`); nunca pases en silencio. No reutilices `STD-*` para Chile si su semántica difiere de la OGUC: escribe el evaluador en `evaluators-cl.ts`. Presupuesto: `rules/don-gia-cl.json` en UF/m² con precios `null` («por completar»); nunca inventes precios ni totales. Los tests de evaluadores `STD-*` usan un pack de test (región `lib`) dentro de `rules.test.ts`; la fixture de tests es `casa-prueba-2p` (plantilla oculta).

## Dependencias y build
- Instalar siempre con `pnpm install --frozen-lockfile --ignore-scripts`.
- `packages/cli/web/` es un bundle compilado versionado: no se edita a mano; lo regenera `pnpm build:cli`.
- `SECURITY-AUDIT-BASE.md` es la línea base de `pnpm audit` del upstream; no lo sobrescribas. Desde E2 (DEPS) `pnpm audit` está limpio: una dependencia nueva o actualizada debe mantenerlo.

## Tests
- `pnpm typecheck` y `pnpm test`.
- `render-p4 › PDF` necesita Chromium de Playwright (`pnpm --filter @arquitecto/server exec playwright install chromium`); los 17 `live-e2e` se saltan si falta `packages/web/dist` (`pnpm build:web`). Con ambos, la suite completa debe dar 0 fallos.
- Snapshots SVG dorados en `packages/server/src/render/__snapshots__/`. Si cambian, revisa el diff antes de aceptar `vitest -u`.

## Seguridad
- Editor (`live.ts`, A1): escucha solo en `127.0.0.1`; WS y `/share`, `/share/rotate`, `/plan`, `/so-sanh` exigen `?token=` (propietario = escritura, link compartido = solo lectura); Host y Origin deben ser `localhost`/`127.0.0.1:<port>`. Toda ruta o cliente nuevo debe respetarlo.
- IDs (A2): `isValidId` (core) en todo `add` y al cargar de disco; toda escritura de exportes pasa por `safeJoin` (`server/src/safe-path.ts`). `readVariant` exige slug `^[a-z0-9-]+$` (M2); `openProject` solo dentro de `baseDir` (M3). Underlay (M1): `source` = nombre de archivo simple, lectura confinada con `realpath` a `.arquitecto/underlay`, `underlay_import` solo dentro del proyecto y ≤20 MB.
- En E2, cada fix lleva un test que primero falla; el output rojo y el verde se guardan en `docs/security-tests/<id>.md`.
