# CONTEXTO — arquitecto-mcp

> **Este archivo es la memoria de la conversación previa. Léelo al inicio de cada sesión y actualízalo al final de cada etapa.**

## Estado actual

- **Etapa:** E2 completada (2026-10-11). Siguiente: E3, a la espera de la confirmación del usuario. Volver a modo de permisos manual antes de E3 (parte de E2 corrió en bypass/auto por decisión del usuario).
- Al terminar cada etapa, actualiza esta sección. Registra la etapa completada, los commits y lo que quedó pendiente o falló.

| Etapa | Estado | Commits / notas |
|---|---|---|
| E0 Línea base | completada | `6ec6023` import (tag `upstream-import`), `8a6e7a0` audit baseline; luego commit de `CONTEXTO.md` + `PROMPT-INICIAL.md` |
| E1 Limpieza e identidad | completada | `2af29c8` limpieza, `3b41efb` renombre, `e41e7c1` docs, `836cdb3` identidad |
| E2 Seguridad | completada | A1 `7297c1a` + `79336ae` (scripts demo); A2 `fca078e`; M2+M3 `3de5489`; M1 `8e27aa0`; LOW `6be626c`; DEPS (commit `fix(security): DEPS …`) |
| E3 Español y región Chile | pendiente | — |
| E4 Rule pack OGUC | pendiente | — |
| E5 App completa | pendiente | — |
| E6 Registro y prueba final | pendiente | — |

### Resultado E0

- Copia: 211 archivos, sin `.claude/` ni `.mcp.json`. Rama `main`; sin remoto.
- `pnpm install --frozen-lockfile --ignore-scripts`: 163 paquetes; el lockfile pasa las políticas de supply chain de pnpm 11.8.0.
- `SECURITY-AUDIT-BASE.md`: 37 vulnerabilidades (3 critical, 12 high, 21 moderate, 1 low), todas en dependencias de terceros.
  - Solo de desarrollo, vía `vitest`/`vite`: `tinypool`, `postcss`, `nanoid`, `source-map-js`.
  - De runtime, vía `@modelcontextprotocol/sdk` → `express`: `proxy-addr`, `fast-uri`, `ip-address` y el propio SDK (OAuth). Sin verificar si afectan al transporte stdio.
- `pnpm typecheck`: verde.
- `pnpm test`: 229 passed, 1 failed, 17 skipped.
  - El fallo es `render-p4.test.ts › PDF`: falta Chromium de Playwright (E5).
  - Los saltados son `live-e2e.test.ts`: falta el dist del editor (`pnpm build:web`, E5).

- El usuario verificó E0. Se borró el tag `backup/pre-amend`. Se aprobó el ítem `DEPS` en E2.

### Resultado E1

- **Eliminado:** `haido.toml`, `docs/memory-pack/`, `README.vi.md`, `docs/01..13` vietnamitas, `publish.yml`, `setup.ts` y su test, y la rama `setup` de `cli/src/main.ts`.
- **Renombrado:** sed ordenado sobre 92 archivos, más `git mv` del bin. Se reinstaló con `--frozen-lockfile` para crear los enlaces `@arquitecto/*`. Los snapshots SVG se renombraron con el mismo sed y siguen pasando.
- **Sin renombrar a propósito:** URLs `lebac-svg/Atelier`, `docs/reference-en/`, `license-manifest.json` (procedencia), `rules/std-vn.json` (se borra en E3) y el bundle `packages/cli/web/`.
- **Además del plan:**
  - `package.json` raíz y `cli`: se quitaron `repository`/`homepage`/`bugs` del upstream; `cli` quedó `private: true` (no se publica en npm).
  - `CONTRIBUTING.md` del upstream se movió a `docs/reference-en/`.
- **LICENSE:** `Copyright (c) 2026 Kand` + aviso original de Bắc Lê; el texto MIT sigue en inglés.
- `pnpm typecheck`: verde. `pnpm test`: 226 passed, 1 failed (PDF/Chromium), 17 skipped. Bajan de 229 a 226 por los 3 tests de `setup` eliminados.
- **Propuesto para E5:** des-versionar `packages/cli/web/` y agregarlo a `.gitignore`, porque `build.mjs` lo regenera. Hoy es un bundle precompilado con marca «Atelier».
- `docs/images/` y `docs/media/` se conservan; el README nuevo ya no los enlaza.

### Resultado E2

- **A1** (2026-10-11): ver `docs/security-tests/A1.md`. Decisiones del usuario: token del propietario en la query `?token=`, verificación de Host en todo HTTP y en el WS, un solo commit. Escucha fija en `127.0.0.1`; se eliminó `ARQUITECTO_HOST`, así que el link compartido solo funciona en el mismo equipo. Tests: 231 passed, 1 failed (Chromium), 17 skipped. `live-e2e` y `smoke.mts` se actualizaron sin poder ejecutarlos (E5). Seguimiento: los 5 scripts de `packages/server/scripts/` abren `live.editorUrl()`; verificados con `tsc --strict` desde `packages/server` (no están en el `tsconfig`), sin ejecutar (requieren Chromium).
- **A2** (2026-10-11): ver `docs/security-tests/A2.md`. Decisiones del usuario: regex `^[A-Za-z0-9_-]{1,32}$` + lista negra `__proto__`/`constructor`/`prototype`; al cargar de disco (`openProject`, `openVariant`) se validan todos los IDs; `safeJoin` en todos los sinks de exporte; un commit. Desviación documentada: se recorta `meta.id` en `newProject` y no `slugify` (que también nombra variantes; recortarlo podía pisar variantes). Tests: 239 passed, 1 failed (Chromium), 17 skipped. La sesión de A2 corrió en bypass permissions por decisión del usuario («continúa, termina»).
- **M2 + M3** (2026-10-11, auto mode «GO» del usuario): ver `docs/security-tests/M2.md` y `M3.md`. M2: `readVariant` exige `^[a-z0-9-]+$` (cubre los 4 llamadores). M3: `openProject` confina con `safeJoin` y no reenvía el mensaje de `JSON.parse`. Un commit conjunto porque comparten archivos. Tests: 242 passed, 1 failed (Chromium), 17 skipped.
- **M1** (2026-10-11): ver `docs/security-tests/M1.md`. Tres capas: `applyUnderlay` (add y update) solo acepta un nombre de archivo; `underlaySourcePath` con `realpath` confinado a `.arquitecto/underlay`; `underlay_import` solo dentro del proyecto y ≤20 MB. Se ajustó el test existente de `underlay_import` (importaba desde fuera del proyecto). Tests: 245 passed, 1 failed (Chromium), 17 skipped.
- **LOW** (2026-10-11): ver `docs/security-tests/LOW.md`. Estáticos con `safeJoin` y `decodeURIComponent` protegido (400/403); WS `maxPayload` 2 MB; `renderTempPng` borra el `mkdtemp` en `finally`. Tests: 248 passed, 1 failed (Chromium), 17 skipped.
- **DEPS** (2026-10-11): ver `docs/security-tests/DEPS.md`. SDK MCP 1.29.0→1.32.1, vitest 3.2.7→4.1.11 (mayor mínima que elimina `tinypool`), hono 4.12.29→4.13.13 y @hono/node-server 2.0.8→2.1.4 (parches dentro de rango, fuera del texto original del ítem). `pnpm audit`: 37 → 0. Sin cambios en config ni tests; 248 passed, 1 failed (Chromium), 17 skipped.
- **Pendiente para E5:** ejecutar `live-e2e.test.ts`, `cli/smoke.mts` y los scripts demo (actualizados en A1, no ejecutados por falta del editor compilado).
- **Post-E2** (2026-10-11): Chromium de Playwright instalado a pedido del usuario (`pnpm --filter @arquitecto/server exec playwright install chromium --with-deps`; revisión v1228 fijada por `playwright@1.61.1`, en `%LOCALAPPDATA%\ms-playwright`). El test de PDF pasa. Quedó expuesto un test intermitente: `mcp.test.ts › phương án A/B … compare` (con Chromium, `variant_compare` renderiza PNG y bajo la suite en paralelo superaba los 5 s). Se le puso `{ timeout: 15_000 }` solo a ese test (`test.slow()` es de Playwright Test y no existe en vitest); el timeout global no cambia. Suite completa 3 veces seguidas: 249 passed, 0 failed, 17 skipped (`live-e2e`, falta `pnpm build:web`).

## Origen y objetivo

- **Upstream:** Atelier, en `D:\0Claude\Atelier-main`. Es una descarga ZIP, no un repo git. Licencia MIT, © 2026 Bắc Lê (lebac-svg), https://github.com/lebac-svg/Atelier. **No se modifica**: queda como referencia.
- **Auditoría estática previa** (solo lectura, sin ejecutar código). Veredicto: **APTO CON RESTRICCIONES**.
  - No encontró malware, telemetría ni conexiones externas en el código fuente ni en el bundle web.
  - Sí encontró vulnerabilidades confirmadas en el código y una cadena de suministro no auditable: `npx -y atelier-mcp` sin versión, y `dist/main.mjs` no está versionado.
- **Objetivo:** un proyecto propio, `arquitecto-mcp`, a nombre del usuario y con crédito MIT.
  - Todas las capas funcionando como app local: MCP, editor web 2D/3D y exportes PNG/SVG/PDF/DXF/IFC/glTF.
  - En español y con reglas de Chile (OGUC).
  - Uso: **levantar propiedades existentes (corretaje) y diseñar casas nuevas**.
- **Tutoría:** el proceso debe servirle al usuario para aprender (método Feynman, ver abajo).
- No hace falta ingeniería inversa: el código fuente completo es MIT y se deriva legalmente.

## Decisiones tomadas

1. **Fork con crédito MIT.** Proyecto nuevo `arquitecto-mcp` a nombre del usuario. `LICENSE` lleva el copyright del usuario **y** el aviso MIT original de Bắc Lê, que es obligatorio para el código derivado.
2. **Carpeta:** `D:\0Claude\arquitecto-mcp` con git propio. El commit 1 es el import literal del upstream, para que cada cambio posterior sea un diff legible.
3. **Idioma:** español en la UI, las descripciones de las herramientas MCP, los mensajes y la documentación. Código, nombres y commits en inglés.
4. **Región Chile:** reglas OGUC investigadas en fuentes oficiales, con cita textual por artículo y `verified:false` hasta que el usuario o un arquitecto las valide.
5. **Seguridad:** se corrigen las vulnerabilidades altas y medias (A1, A2, M1, M2, M3) y, de paso, algunas bajas baratas.
6. **Dependencias:** `pnpm install --frozen-lockfile --ignore-scripts` en el host. El lockfile tiene integridad verificada y solo `esbuild` necesita compilar.
7. **Modo de permisos: aprobación manual, NUNCA bypass.**
   - El usuario aprueba cada comando.
   - No se usa `dangerouslyDisableSandbox`.
   - No se spawnean subagentes salvo que el usuario lo pida.
8. **Nombres:**
   - Paquetes: `@arquitecto/core`, `@arquitecto/server`, `@arquitecto/web`.
   - Bin: `arquitecto-mcp`. Servidor MCP: `arquitecto`.
   - Variables de entorno: `ATELIER_*` → `ARQUITECTO_*`.
   - Archivos: `atelier.project.json` → `arquitecto.project.json`; `.atelier/` → `.arquitecto/`.

### Los 5 ajustes de verificación pedidos por el usuario

1. **E0:** `git tag upstream-import` tras el primer commit, y `pnpm audit --audit-level=high > SECURITY-AUDIT-BASE.md` como línea base.
2. **E0:** `pnpm install` se ejecuta **sin bypass permissions**; el usuario aprueba cada comando.
3. **E1:** renombrar `docs/en/` a `docs/reference-en/`, con un `README.md` que aclare que es documentación del upstream.
4. **E2:** para cada fix, capturar el output del test **fallando antes del fix** y guardarlo en `docs/security-tests/<id>.md`.
5. **E4:** `rules/cl.json` lleva **solo reglas citables textualmente de la OGUC**, cada una con `source` y `verified: false`. Además va un `docs/oguc-sources.md` con los artículos y las URLs.

## Vulnerabilidades a corregir (rutas del upstream)

- **A1 (alta):** el WebSocket `/ws` y los endpoints HTTP del editor no tienen autenticación ni verificación de Origin/Host. Sin token se obtiene lectura y escritura completas, así que el modo «solo lectura» se elude. Evidencia: `packages/server/src/live.ts:341-351, 378-409, 247-255`; `tools.ts:276` sugiere `0.0.0.0`.
- **A2 (alta):** los IDs no tienen validación de formato, y `level.id`/`meta.id` acaban en rutas de archivo. Con `../` se escriben `.svg/.png/.dxf/.pdf/.glb/.ifc` fuera de `.atelier/exports`. Evidencia: `core/src/ops/apply.ts:116-122`, `server/src/render/render.ts:85-89`, `render/sheets.ts:59,66`, `tools.ts:604,611,631`, `store.ts:136`.
- **M1 (media):** `underlay.source` no se valida y el resultado es la lectura de cualquier PNG/JPEG/DXF del disco, incrustado en `/plan/<level>.svg` sin autenticación. `underlay_import` además acepta rutas absolutas. Evidencia: `core/src/ops/apply.ts:224,243`, `server/src/import/underlay.ts:133-135`, `tools.ts:688-735`.
- **M2 (media):** path traversal en el slug de variantes. Se lee cualquier `.json` vía MCP y vía HTTP `/plan?variant=` y `/so-sanh?a=`. Evidencia: `store.ts:234`, `live.ts:277-283, 311`.
- **M3 (media):** `project_open` acepta cualquier ruta, y el mensaje de error de `JSON.parse` puede filtrar contenido al agente. Evidencia: `store.ts:131-135`, `tools.ts:42-45`.
- **Otros a eliminar en E1** (riesgos de la auditoría):
  - El instalador `setup`, que registra en todos los clientes sin consentimiento y reescribe configuraciones sin copia de seguridad (`packages/cli/src/setup.ts`).
  - Los hooks y el MCP de `haido`: `.claude/settings.json` y `.mcp.json` no se copian en E0; `haido.toml` se borra en E1.
- **Bajos que se corrigen de paso en E2:**
  - Comprobación de prefijo de estáticos sin separador (`live.ts:324-327`).
  - `maxPayload` del WebSocket.
  - Carpetas temporales `mkdtemp` que nunca se borran.

## Método didáctico (cada etapa)

Cada etapa se explica y ejecuta en este orden:

1. **Qué y por qué:** 2–3 líneas.
2. **Feynman:** explicarlo como a alguien sin base técnica, con una analogía concreta. Si el usuario no podría re-explicarlo con sus palabras, simplificar más.
3. **Pasos:** comandos y cambios, uno a uno, cada uno aprobado por el usuario.
4. **Compruébalo tú:** un comando que el usuario ejecuta él mismo y qué debe ver.
5. **Commit:** mensaje en inglés, solo cuando la verificación pasa.

Una etapa por sesión. Se para al final de cada etapa, se actualiza este archivo y se espera la confirmación del usuario.

## Plan aprobado

### E0 · Línea base

**Permisos:** toda la ejecución es SIN bypass permissions. Antes de E0 el usuario cambia el modo de la sesión a uno con aprobación (Shift+Tab hasta salir de bypass). Cada comando lo aprueba el usuario y nunca se usa `dangerouslyDisableSandbox`.

**Pasos:**
1. Copiar el contenido de `D:\0Claude\Atelier-main` a esta carpeta, **excepto `.claude/` y `.mcp.json`**. La sesión de Claude Code corre en esta carpeta y esos archivos ejecutarían `haido` (binario externo no auditado). Se documentan como excluidos en el mensaje del commit.
2. `git init`.
3. Commit `chore: import Atelier upstream (MIT)`, **solo con los archivos del upstream** (sin `.claude/` ni `.mcp.json`). En el cuerpo del mensaje va «excluded .claude/ and .mcp.json (haido hooks, security)». `CONTEXTO.md` y `PROMPT-INICIAL.md` van en un commit aparte posterior.
4. `git tag upstream-import`.
5. `pnpm install --frozen-lockfile --ignore-scripts`, con aprobación explícita.
6. `pnpm audit --audit-level=high > SECURITY-AUDIT-BASE.md` como línea base. Consulta el registro npm; un código de salida distinto de 0 solo indica hallazgos y el archivo se conserva. Después, commit.
7. `pnpm typecheck` y `pnpm test`, anotando qué falla sin Chromium.

**Feynman:**
- Qué es MCP: un «enchufe» estándar. Claude pide herramientas por stdio en JSON-RPC.
- Las 4 capas:
  - `core`: el cerebro puro (modelo, geometría y reglas).
  - `server`: las manos (MCP, render, archivos y editor).
  - `web`: los ojos (editor 2D/3D).
  - `cli`: la caja de envío (el bundle).

### E1 · Limpieza e identidad

- **Quitar:**
  - `haido.toml` (`.claude/` y `.mcp.json` ya se excluyeron en E0).
  - `docs/memory-pack/`, `README.vi.md` y los `docs/*.md` vietnamitas.
  - `.github/workflows/publish.yml`.
  - `packages/cli/src/setup.ts`, su test y la rama `setup` de `cli/src/main.ts:18-22`.
- **Renombrar:** según la decisión 8.
- **Documentación de referencia:** `git mv docs/en docs/reference-en` y crear `docs/reference-en/README.md`. Debe aclarar que es documentación del upstream Atelier (MIT, © Bắc Lê), conservada como referencia y no necesariamente vigente para arquitecto-mcp.
- **Identidad:** `LICENSE` con el nombre del usuario más el aviso original, `README.md` propio en español y un `CLAUDE.md` del proyecto.
- **Feynman:** por qué la MIT exige conservar el aviso (como citar la fuente en un trabajo).

### E2 · Seguridad (cada fix con un test que primero falla)

**Protocolo por fix:**
1. Escribir el test.
2. Ejecutarlo **sin el fix** y guardar el output real del fallo en `docs/security-tests/<id>.md` (ids: `A1`, `A2`, `M1`, `M2`, `M3`, `LOW`, `DEPS`), con comando, fecha y hallazgo de la auditoría.
3. Aplicar el fix.
4. Añadir al mismo archivo el output en verde.
5. Un commit por fix.

**Fixes:**
- **A1** (`server/src/live.ts`):
  - Token de propietario aleatorio en cada arranque.
  - El WebSocket exige `token`: el del propietario da escritura, el de share da solo lectura y sin token se rechaza la conexión.
  - `verifyClient` acepta solo `Origin` `http://localhost:<port>` o `http://127.0.0.1:<port>`, y se comprueba `Host`.
  - `/share`, `/share/rotate`, `/plan` y `/so-sanh` exigen token.
  - `editor_open` abre la URL con el token.
  - Quitar la sugerencia `0.0.0.0` (`tools.ts:276`) y forzar loopback.
- **A2:**
  - En `core/src/ops/apply.ts` (`applyArray`, `applyRecord`), los IDs deben cumplir `^[A-Za-z0-9_-]{1,32}$`.
  - `store.openProject` valida `meta.id` con la misma regla.
  - Crear un helper `safeJoin(dir, name)` (resolve + `startsWith(dir + sep)`) y usarlo en `render/render.ts:85-89`, `render/sheets.ts` y el export de `tools.ts` (glb/ifc/pdf/svg/dxf).
- **M1:**
  - `applyUnderlay` exige `basename(source) === source`.
  - `import/underlay.ts` resuelve con `realpath` y exige que quede dentro de `underlayDir`.
  - `underlay_import` solo acepta archivos dentro de la carpeta del proyecto, con un tope de tamaño de 20 MB.
- **M2:** `store.readVariant` acepta solo slugs `^[a-z0-9-]+$`.
- **M3:** `project_open` solo abre archivos dentro de la carpeta del proyecto y no reenvía los mensajes crudos de `JSON.parse`.
- **LOW:**
  - Comprobación de prefijo de estáticos con `sep` y try/catch en `decodeURIComponent` (`live.ts:324-327`).
  - `maxPayload` de 2 MB.
  - Borrar los temporales de `mkdtemp` en un `finally`.
- **DEPS** (aprobado tras E0):
  - Actualizar `@modelcontextprotocol/sdk` y `vitest` a versiones parcheadas.
  - Volver a correr `pnpm audit --audit-level=high`.
  - En `docs/security-tests/DEPS.md`: el «rojo» es `SECURITY-AUDIT-BASE.md` y el «verde» es el audit nuevo, con `pnpm typecheck` y `pnpm test` en verde. Lo que no tenga parche se documenta con su justificación.

**Feynman:** «la puerta sin llave» (A1) y «el cartero que acepta cualquier dirección» (A2/M1).

### E3 · Español y región Chile (todavía sin reglas)

- **Traducir:**
  - Descripciones de herramientas (`server/src/tools.ts`).
  - Mensajes de `store.ts`, de los validadores y los `messages` de `rules/*.json`.
  - Web: `i18n.ts`, agregando `es` como idioma por defecto.
- **Quitar lo vietnamita:**
  - `rules/std-vn.json`.
  - `rules/loban.json` junto con `validate/evaluators-lbb.ts`.
  - El campo `phong_thuy` del brief.
- **Plantillas:**
  - Conservar y renombrar: `can-ho`→`depto-2d`, `nha-cap-4`→`casa-1-piso`, `biet-thu-doc`→`casa-2-pisos`.
  - Eliminar `nha-ong`, `nha-vuon` y `detached-uk`, con sus fixtures y tests.
- **Presupuesto:** el motor se conserva. `rules/don-gia.json` pasa a una tabla CLP/UF con valores marcados «por completar»; los precios los da el usuario y no se inventan.
- **Feynman:** «reglas como datos». El motor es una balanza y el rule pack son las pesas: se cambian las pesas sin tocar la balanza.

### E4 · Rule pack Chile (OGUC)

- **Investigar el texto oficial** (bcn.cl / minvu.gob.cl):
  - Habitabilidad: alturas mínimas, iluminación y ventilación.
  - Escaleras: huella, contrahuella y ancho.
  - Puertas, pasillos y accesibilidad.
  - Distanciamientos, rasantes y coeficientes de constructibilidad y ocupación.
- **`packages/core/rules/cl.json`** (`region: "cl"`):
  - Contiene **solo reglas citables textualmente de la OGUC**, cada una con `source { vanBan, dieu, verified:false }`.
  - Lo que no tenga cita textual queda fuera: se lista como pendiente y no se codifica.
  - Reutiliza los evaluadores existentes vía `evaluator` + `params` (patrón de `rules/std-generic.json`). Un evaluador nuevo solo si ninguno sirve.
- **`docs/oguc-sources.md`:** por cada regla, su id, artículo, cita textual, URL oficial, fecha de consulta y estado de validación.
- **Validación:** el usuario revisa regla por regla y cambia a `verified:true`.
- **Feynman:** cómo una frase legal se convierte en un número comprobable.

### E5 · App completa y programas externos

- **Build:** `pnpm build:web` y luego `pnpm --filter arquitecto-mcp build`, que genera `packages/cli/dist/main.mjs`. Es un bundle propio y auditado porque lo compila el usuario.
- **Programas especializados** (se avisa cuándo instalar cada uno):
  - **Chromium (Playwright):** obligatorio para PNG/PDF; se instala con `pnpm exec playwright install chromium`.
  - **Blender** (opcional): render fotorrealista desde `.glb` con `scripts/render-photoreal.py`.
  - **CAD** (LibreCAD/QCAD/AutoCAD) para abrir `.dxf`; **BIM** (Bonsai/BlenderBIM, FreeCAD) para abrir `.ifc`.
- **Feynman:** por qué un servidor local más el navegador ya es una «app», y por qué no hace falta Electron ahora.

### E6 · Registro en Claude Code y prueba final

- **Registro:** `claude mcp add arquitecto --scope user -e ARQUITECTO_DIR=<carpeta-casa> -- node D:\0Claude\arquitecto-mcp\packages\cli\bin\arquitecto-mcp.mjs`, con ruta local y sin npx.
- **Flujo real:** brief → `project_new` → `apply_ops` → `validate` → `render_plan` → `editor_open` → `export pdf/dxf/ifc/gltf`.
- **Feynman:** el recorrido de un mensaje del usuario hasta el archivo PDF.

Fuera de este plan queda, como trabajo futuro, integrar los exportes con corretaje-canete vía Cloudinary.

## Verificación por etapa

- **Siempre:** `pnpm typecheck` y `pnpm test` en verde, y `git diff --stat` revisado.
- **E0:** el tag `upstream-import` existe (`git tag`) y `SECURITY-AUDIT-BASE.md` está versionado.
- **E2:** cada `docs/security-tests/<id>.md` contiene el output rojo (antes) y el verde (después). Tests nuevos de cada fix:
  - WebSocket sin token → conexión cerrada.
  - Origin ajeno → rechazado.
  - ID con `../` → bloqueo OPS.
  - Underlay `../x.png` → bloqueo.
  - Slug `../x` → error.
  - `project_open` fuera de la carpeta → error.
- **E4:** cada regla de `rules/cl.json` tiene su entrada en `docs/oguc-sources.md` (y viceversa), y todas están en `verified:false`.
- **E5:** el smoke del bundle por MCP stdio pasa (`npx tsx packages/cli/smoke.mts <ruta-paquete>`) y el editor abre en el navegador con token.
- **E6:** las herramientas aparecen en Claude Code (`/mcp`) y se genera un PDF en `<carpeta-casa>/.arquitecto/exports/`.
- **Git remoto:** sin commit ni push a un remoto salvo que el usuario lo pida.

## Entorno conocido (verificado el 2026-10-11)

- Windows 11, Node v24.20.0 y pnpm disponible. El upstream declara `packageManager: pnpm@11.8.0` y `engines.node >=20.10`.
- `D:\0Claude\Atelier-main` no es un repo git (es una descarga ZIP).
- El upstream incluye `.claude/settings.json` y `.mcp.json` con `haido`. **No hay que abrir Claude Code dentro de `Atelier-main`.** En esta carpeta no se copian nunca (ver E0); `haido.toml` sí se copia porque es inofensivo sin el binario, y se borra en E1. Si Claude Code pide confiar en hooks o servidores MCP del proyecto, **rechazarlo**.
