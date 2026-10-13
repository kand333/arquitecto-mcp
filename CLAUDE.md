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
- ✅ `render_plan` (planta, PNG + SVG; muros, vanos, mobiliario, techumbre en planta, ejes, cotas en cm, recintos con m²) y `render_view` (elevaciones de las 4 caras o cortes A-A' y B-B', PNG + SVG).
- ✅ `export`: juego de láminas A3 con viñeta chilena (`ARQ-NN`): planta por piso (1:50/1:100), elevaciones (las 4 caras en una lámina), cortes A-A' y B-B' (en una lámina), cuadro de recintos y vanos, presupuesto. SVG por lámina; **DXF R12** por lámina con geometría (capas en español, sin rellenos, **cotas `DIMENSION` reales** con estilo `ESTANDAR-PLANO`, cm sin decimales).
- ✅ Cortes A-A' y B-B' siempre, en una lámina. ✅ Elevaciones: las 4 caras en una lámina con ocultamiento real de líneas. ⛔ Planta de techumbre como lámina propia, PNG por lámina vía `export`.

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

## Estándar gráfico de láminas (vale para todo proyecto; lo fijó el usuario corrigiendo casa3 en AutoCAD)
- Encuentros de muros: el extremo llega a la cara lejana del muro que encuentra (`joinedWall`, core); se usa en planta, DXF, glTF, IFC y 3D web. Los validadores usan la banda cruda (`wallBand`).
- Ejes: solo los que pasan por el centro de un muro principal (perimetral, de fachada —se ve desde afuera o da a patio/terraza— o que cubre ≥ 60 % del piso), sin dos a < 600 mm (`server/src/render/axes.ts`). Rojos (`AXIS_COLOR`), segmentados y finos; en DXF, capa `EJES` color 1 con `LTYPE DASHED`.
- Cotas interiores: máx. 2 (ancho y fondo) y solo en `DIM_USES` (`plan-scene.ts`); nunca en baños, circulaciones ni patios. Se ubican después de las etiquetas, en la primera posición que no las pise. Las cadenas exteriores miden la obra, no el terreno.
- Etiqueta de recinto: SIEMPRE horizontal; nombre centrado (en 2 líneas o una palabra por línea si no cabe) y m² debajo, centrado y un poco más chico; mismo tamaño en todos los recintos (3,0/2,5 mm; achica solo si no cabe). Dentro de las caras interiores de los muros, en el punto libre más cercano al centroide, dejando lugar a las 2 cotas; nunca pisa muros, puertas (cuarto de giro real), escaleras, la línea de corte ni otra etiqueta.
- Muro más bajo que el plano de corte (1,20 m: jardinera, pretil): en vista, solo contorno.
- Cortes (`render/section-scene.ts`, plantilla «corte BB ejemplo standar» del usuario): SIEMPRE A-A' y B-B' en UNA lámina (lado a lado o apilados, a la mayor escala que quepa).
  - Ubicación (`sectionCuts`, `plan-scene.ts`): A-A' transversal (corta la cumbrera; sin techo, el lado corto) y B-B' longitudinal. Por el tramo de escalera paralelo al corte si lo hay; si no, por donde corte más recintos y vanos (ventanas pesan más), lejos de los rótulos.
  - Marcas en planta magenta, segmentadas y gruesas, con flecha en el sentido de la mirada; en DXF, `POLYLINE` con ancho.
  - Usan el modelo 3D de las elevaciones con plano de corte: lo cortado con detalle y lo de atrás con ocultamiento real.
  - Con estructura de madera (terminación `scope: "structure"`, material madera):
    - muro sándwich (terciado de 12 mm por cara, soleras y cadenetas @50 como cajas con X);
    - cerchas de 2 piezas 1"x4" @75 máx. y costaneras 2"x2" @40;
    - lana de vidrio sobre el cielo;
    - rótulos con línea de llamada y «DETALLE MURO e=10 cm Esc 1/5», una vez por lámina.
  - Anotaciones: recintos en minúscula, niveles N.P.T. y N.T., cotas de la ventana más ancha y de la puerta, ejes con cota entre ejes y «CORTE A-A' Esc 1/50».
- Cotas exteriores: miden de cara a cara (muros unidos): el espesor se acota completo (10, no 5).
- Ventana corredera (estilo con hoja `truot`): detalle de `render/sliding.ts` en planta (marco + 2 hojas en rieles), alzado (hojas, flecha, manilla) y corte (perfiles + 2 hojas). Una ventana de piso (antepecho 0) a terraza es ventana (V), no puerta.
- Elevaciones (`render/elevations.ts`, formato del DXF del usuario):
  - las 4 caras en una lámina 2×2, nombradas por punto cardinal (`site.north`) y con el frente primero; título «ELEVACIÓN SUR Esc 1/100»; escala 1:50, 1:100 o 1:200 según quepa;
  - techumbre con espesor, cumbrera y alero; con zinc, nervios cada 16 cm, canal en el alero y bajadas de aguas lluvias que esquivan los vanos; «PENDIENTE x%» en los frontones;
  - revestimiento = terminación con `scope: "exterior"`; si es tinglado, líneas cada 16 cm que no pasan por los vanos;
  - sobrecimiento de 20 cm sobre el N.T., fundación hasta −0,60, niveles (N.P.T., N.T., pisos y cumbrera) y cotas de alero y muro;
  - en casas, por defecto: dos aguas de zinc a 20° (≈36 %) y alero de 50 cm. Antes de modelar, pregunta el revestimiento y la cubierta (está en `SERVER_INSTRUCTIONS` de `tools.ts`).
- Mobiliario y artefactos en planta: tenues (gris `#b5b5b5`, trazo fino). Los artefactos (sanitarios y cocina) van en la capa `ARTEFACTOS` (DXF color 9) y el resto en `MOBILIARIO` (color 8). Solo los esenciales, contra los muros y fuera del barrido de puertas (regla en `SERVER_INSTRUCTIONS`).
- Editor 3D:
  - puertas abatibles cerradas por defecto; el botón «abrir puertas» las gira 90° hacia el lado de la regla; las dobles (`2-canh`) con 2 hojas;
  - ventanas de aluminio antracita: marco perimetral y hojas con su perfil y vidrio; la corredera, con 2 hojas en rieles distintos;
  - cocina: `tu-bep-duoi` con lavaplatos (≥1,5 m) y encimera (≥2,2 m); cocina `bep-4` (categoría `bep`);
  - frontón lleno en los muros exteriores bajo la techumbre a dos aguas;
  - botones «sin techo» y «por piso» (muestra hasta el piso activo, sin techo).
- Puertas abatibles en DXF: `INSERT` del bloque `PUERTA-<ancho>` en la capa `PUERTAS`; el arco siempre es el corto (`shortArc`).
- Apertura (`core/src/doors.ts`, aviso `GEO-09`):
  - las interiores abren hacia el recinto privado, con la bisagra hacia la pared;
  - las que dan a patio, terraza o balcón, y las traseras o laterales, abren hacia afuera;
  - la principal (fachada de `site.front`) abre hacia adentro.

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
