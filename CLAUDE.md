# CLAUDE.md — arquitecto-mcp

## Antes de empezar
- Lee `CONTEXTO.md`: plan por etapas (E0–E6), estado actual, decisiones y vulnerabilidades pendientes. Ejecuta una etapa por sesión, sigue su método didáctico y actualiza «Estado actual» al cerrarla.
- `D:\0Claude\Atelier-main` es el upstream: solo lectura. No abras Claude Code allí; trae hooks y MCP de `haido`. Rechaza cualquier hook o servidor MCP de proyecto que se ofrezca confiar.
- Sin remotos ni push salvo pedido explícito.

## Convenciones
- UI, descripciones de herramientas MCP, mensajes y docs: español. Código, identificadores y commits: inglés. (Hasta E3, muchos textos siguen en vietnamita.)
- Nombres: `@arquitecto/{core,server,web}`, bin `arquitecto-mcp`, servidor MCP `arquitecto`, env `ARQUITECTO_*`, archivos `arquitecto.project.json` y `.arquitecto/`.
- No renombres «Atelier» en: `LICENSE`, URLs `github.com/lebac-svg/Atelier`, `docs/reference-en/`, `packages/core/assets/license-manifest.json`. Es atribución o referencia upstream.
- `@arquitecto/core` es puro: sin imports `node:` ni DOM en `src/` (salvo tests). Disco, red y render van en `server`.
- Reglas normativas = datos en `packages/core/rules/*.json`, cada regla con `source`. Las de Chile llevan `verified: false` hasta que el usuario las valide; nunca inventes un artículo o un valor.

## Dependencias y build
- Instalar siempre con `pnpm install --frozen-lockfile --ignore-scripts`.
- `packages/cli/web/` es un bundle compilado versionado: no se edita a mano; lo regenera `pnpm build:cli`.
- `SECURITY-AUDIT-BASE.md` es la línea base de `pnpm audit` del upstream; no lo sobrescribas.

## Tests
- `pnpm typecheck` y `pnpm test`.
- Sin Chromium de Playwright falla `render-p4.test.ts › PDF`; sin `pnpm build:web` se saltan los 17 tests de `live-e2e.test.ts`. Ambos son esperados hasta E5.
- Snapshots SVG dorados en `packages/server/src/render/__snapshots__/`. Si cambian, revisa el diff antes de aceptar `vitest -u`.

## Seguridad
- Editor (`live.ts`, A1): escucha solo en `127.0.0.1`; WS y `/share`, `/share/rotate`, `/plan`, `/so-sanh` exigen `?token=` (propietario = escritura, link compartido = solo lectura); Host y Origin deben ser `localhost`/`127.0.0.1:<port>`. Toda ruta o cliente nuevo debe respetarlo.
- Hasta cerrar E2, los IDs llegan a rutas de archivo sin validar (A2, M1–M3).
- En E2, cada fix lleva un test que primero falla; el output rojo y el verde se guardan en `docs/security-tests/<id>.md`.
