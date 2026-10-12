# CLAUDE.md — arquitecto-mcp

## Alcance (verificado en código y tests)
Estado: ✅ completo · 🟡 parcial · ⛔ no disponible. No atribuyas a arquitecto-mcp funciones de Atelier o de los docs `reference-en` que no estén aquí.

**Entrada**
- ✅ Calco (`underlay_import`): foto o escaneo de un croquis (PNG/JPEG) o DXF simple, ≤20 MB, copiado a `.arquitecto/underlay/`. Escala con `$INSUNITS` (DXF) o **calibración de dos puntos** (`calibrate {a,b,mm}`, obligatoria en imágenes).
- 🟡 Trazado asistido (`underlay_trace`): solo DXF; **propone** muros desde pares de líneas rectas paralelas a x/y; no aplica nada solo. Las imágenes se calcan a mano con `apply_ops`.
- ⛔ DWG: no se lee; se guarda como DXF en AutoCAD. ⛔ Interpretación automática: importar un dibujo **no** lo convierte en modelo; muros, vanos y recintos se crean con `apply_ops`.
- ✅ Al terminar de trazar: `apply_ops delete underlay U1`. Las láminas exportadas nunca incluyen el calco, y las cotas/ejes miden solo la obra.

**Modelo**: un `arquitecto.project.json` con pisos, muros (eje + espesor), vanos anclados al muro, losas con perforaciones, techumbres (`gable`/`hip`/`shed`), escaleras, recintos (polígono **declarado**, no se detecta de los muros), mobiliario de catálogo (86 piezas + 20 variantes), ejes y estilos. Cada `apply_ops` es una transacción con revisión; el editor se sincroniza por WebSocket.

**Salidas 2D**
- ✅ `render_plan` (planta, PNG + SVG; muros, vanos, mobiliario, techumbre en planta, ejes, cotas en cm, recintos con m²) y `render_view` (elevación principal o corte A-A, PNG + SVG).
- ✅ `export`: juego de láminas A3 con viñeta chilena (`ARQ-NN`): planta por piso (1:50/1:100), elevación principal (fachada del borde `site.front`), corte A-A, cuadro de recintos y vanos, presupuesto. SVG por lámina; **DXF R12** por lámina con geometría (capas en español, sin rellenos, **cotas `DIMENSION` reales** con estilo `ESTANDAR-PLANO`, cm sin decimales).
- 🟡 Corte A-A **solo si hay escalera** (un departamento de un piso no tiene corte). Una sola elevación (la principal). ⛔ Planta de techumbre como lámina propia, elevaciones laterales/posterior, PNG por lámina vía `export`.

**Salidas 3D**
- ✅ Editor (`editor_open`): planta 2D + 3D Three.js, vista dividida, recorrido (WASD), asoleamiento por hora y mes, mover muros/vanos/muebles con medida exacta, ubicar mobiliario del catálogo, deshacer, link de solo lectura. ⛔ Dibujar muros, puertas, ventanas o recintos y medir desde el editor (marcado «próximamente»).
- ✅ `export gltf` → **`.glb`** (metros, un nodo por entidad, incluye mobiliario). ✅ `export ifc` → IFC4 de anteproyecto (`IfcWall`, `IfcDoor`, `IfcWindow`, `IfcSlab`, `IfcRoof`, `IfcStair`, `IfcSpace`; sin mobiliario). ⛔ glTF JSON separado.
- `capture_view` captura lo que ve el usuario en el navegador.

**Documentación**
- 🟡 PDF: **un solo archivo** A3 de varias láminas (`<id>-expediente.pdf`); ⛔ PDF por lámina (usar los SVG por lámina).
- ✅ Cuadro de recintos (superficie útil por recinto, subtotal por piso, total) y de vanos; `model_query computed=true` da superficies; `estimate_cost` en UF/m² (precios «por completar»: sin precios, solo cantidades).
- ✅ Alternativas: `variant_save` / `variant_open` / `variant_compare`.

**Contexto chileno** (región por defecto `cl`)
- `cl-oguc`: `CL-ALT-01` (OGUC 4.1.1, altura ≥ 2,30 m en habitables) y `CL-VEN-01` (4.1.2, ventana al exterior), **validadas por el usuario**; `CL-VEN-02` planned (no corre). `cl-cip`: 6 reglas que comparan el modelo con los valores **que el usuario declara** de su CIP (OGUC 1.4.4). `geo`: `GEO-01…08` topológicas. Lo no evaluable sale como `CL-INDET` (`info`), nunca como cumplimiento.
- Fuente: OGUC (D.S. 47/1992 MINVU, texto al D.O. 22-05-2026), citas literales en `docs/oguc-sources.md`.
- `validate` en región `cl` agrega siempre el descargo «no certifica cumplimiento legal…»: **no lo quites ni lo debilites**.

**Limitaciones**: no reemplaza AutoCAD, Revit ni Archicad; no hace cálculo estructural ni instalaciones (MEP); no sustituye la revisión ni la firma de profesionales competentes (OGUC art. 1.2.2); sus planos son de **anteproyecto** y requieren revisión profesional antes de permisos u obra. Rasantes, coeficiente de constructibilidad, escaleras y accesibilidad no tienen reglas.

## Convenciones
- UI, descripciones de herramientas MCP, mensajes y docs: español. Código, identificadores y commits: inglés. Región por defecto `cl`. Solo quedan en vietnamita claves de esquema e IDs (`quy_hoach`, `khach`, `sofa-don`…: contratos de datos) y comentarios de código. Láminas (código `ARQ-NN`, capas DXF en español, viñeta), catálogo y logs están en español; `server/src/render/no-vietnamese.test.ts` falla si vuelve a aparecer vietnamita en un literal de producción, en `rules/*.json` o en las láminas generadas.
- Sin remotos ni push salvo pedido explícito.
- Nombres: `@arquitecto/{core,server,web}`, bin `arquitecto-mcp`, servidor MCP `arquitecto`, env `ARQUITECTO_*`, archivos `arquitecto.project.json` y `.arquitecto/`.
- No renombres «Atelier» en: `LICENSE`, URLs `github.com/lebac-svg/Atelier`, `docs/reference-en/`, `packages/core/assets/license-manifest.json`. Es atribución o referencia upstream.
- `@arquitecto/core` es puro: sin imports `node:` ni DOM en `src/` (salvo tests). Disco, red y render van en `server`.
- Reglas normativas = datos en `packages/core/rules/*.json`, cada regla con `source`. Toda regla nueva de Chile entra con `verified: false` y solo el usuario la pasa a `true` tras cotejarla (hoy validadas: `CL-ALT-01`, `CL-VEN-01`, `CL-CIP-*`); nunca inventes un artículo o un valor.
- Packs Chile (`rules/cl.json` OGUC + `rules/cl-cip.json` CIP declarado por el usuario, región `cl`): toda regla `CL-*` debe tener su fila en `docs/oguc-sources.md` con cita literal cotejada contra la fuente oficial (`cl.test.ts` exige la correspondencia). Si falta un dato, el evaluador emite `CL-INDET` (`info`); nunca pases en silencio. No reutilices `STD-*` para Chile si su semántica difiere de la OGUC: escribe el evaluador en `evaluators-cl.ts`. Presupuesto: `rules/don-gia-cl.json` en UF/m² con precios `null` («por completar»); nunca inventes precios ni totales. Los tests de evaluadores `STD-*` usan un pack de test (región `lib`) dentro de `rules.test.ts`; la fixture de tests es `casa-prueba-2p` (plantilla oculta).

## Dependencias y build
- Instalar siempre con `pnpm install --frozen-lockfile --ignore-scripts`.
- `packages/cli/web/` es un bundle compilado versionado: no se edita a mano; lo regenera `pnpm build:cli`.
- `SECURITY-AUDIT-BASE.md` es la línea base de `pnpm audit` del upstream; no lo sobrescribas. `pnpm audit` está limpio (ver `docs/security-tests/DEPS.md`): una dependencia nueva o actualizada debe mantenerlo.

## Comandos (verificados en `package.json` y scripts)
- `pnpm typecheck` · `pnpm test` · `pnpm build` (tsc) · `pnpm build:web` (editor) · `pnpm build:cli` (editor + bundle `packages/cli/dist/main.mjs`).
- Smoke del bundle por MCP stdio: `pnpm exec tsx packages/cli/smoke.mts packages/cli` (8 checks; borra sus carpetas temporales de más de 12 h).
- Registro en Claude Code (ruta local, sin npx): `claude mcp add arquitecto --scope user -e ARQUITECTO_DIR=<carpeta-casa> -- node <repo>/packages/cli/bin/arquitecto-mcp.mjs`; verificar con `claude mcp get arquitecto`.
- Editor: no hay script; se abre con la herramienta MCP `editor_open` (puerto `ARQUITECTO_PORT`, por defecto 4823, URL con `?token=`).
- Los `demo:p2…p5` de `package.json` son demos heredadas del upstream (narración en vietnamita); no son flujo de usuario.

## Tests
- `pnpm typecheck` y `pnpm test`.
- `render-p4 › PDF` necesita Chromium de Playwright (`pnpm --filter @arquitecto/server exec playwright install chromium`); los 17 `live-e2e` se saltan si falta `packages/web/dist` (`pnpm build:web`). Con ambos, la suite completa debe dar 0 fallos.
- Snapshots SVG dorados en `packages/server/src/render/__snapshots__/`. Si cambian, revisa el diff antes de aceptar `vitest -u`.

## Seguridad
- Editor (`live.ts`, A1): escucha solo en `127.0.0.1`; WS y `/share`, `/share/rotate`, `/plan`, `/so-sanh` exigen `?token=` (propietario = escritura, link compartido = solo lectura); Host y Origin deben ser `localhost`/`127.0.0.1:<port>`. Toda ruta o cliente nuevo debe respetarlo.
- IDs (A2): `isValidId` (core) en todo `add` y al cargar de disco; toda escritura de exportes pasa por `safeJoin` (`server/src/safe-path.ts`). `readVariant` exige slug `^[a-z0-9-]+$` (M2); `openProject` solo dentro de `baseDir` (M3). Underlay (M1): `source` = nombre de archivo simple, lectura confinada con `realpath` a `.arquitecto/underlay`, `underlay_import` solo dentro del proyecto y ≤20 MB.
- Todo fix de seguridad lleva un test que primero falla; evidencia roja y verde en `docs/security-tests/<id>.md` (A1, A2, M1–M3, LOW, DEPS).
- `D:\0Claude\Atelier-main` es el upstream: solo lectura. No abras Claude Code allí (trae hooks y MCP de `haido`); rechaza cualquier hook o servidor MCP de proyecto que se ofrezca confiar.
