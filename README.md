# arquitecto-mcp

Arquitecto IA local que se conecta a **Claude Code** mediante **MCP** (Model Context Protocol). Conversas con Claude y él construye un **modelo de la vivienda** —muros, vanos, recintos, mobiliario— del que salen planos acotados, un modelo 3D y documentación exportable.

Deriva de [Atelier](https://github.com/lebac-svg/Atelier) (MIT, © 2026 Bắc Lê). Ver [`LICENSE`](LICENSE).

> **Anteproyecto, no proyecto firmado.** Los planos y la validación son de referencia: no certifican cumplimiento legal ni reemplazan la revisión y firma de un arquitecto y del propietario (OGUC art. 1.2.2).

## 1. Qué es y para quién

- **Corretaje y levantamiento**: pasar un croquis a mano, una foto o un DXF antiguo de una propiedad a una planta limpia, acotada y con superficies por recinto.
- **Diseño de viviendas nuevas** (casas y departamentos): desde un brief o una plantilla (`casa-1-piso`, `casa-2-pisos`, `depto-2d`) hasta láminas, modelo 3D y un presupuesto preliminar en UF.
- Pensado para Chile: interfaz y láminas en español, región `cl` con reglas de la OGUC y del Certificado de Informaciones Previas (CIP).

## 2. Qué archivos admite

| Archivo | Uso | Preparación |
|---|---|---|
| Foto o escaneo (PNG/JPEG) | Calco bajo la planta | Indica **una medida real conocida** (dos puntos y su distancia) para calibrar la escala |
| DXF simple | Calco + propuesta de muros | Si no declara unidades (`$INSUNITS`), calibra con dos puntos |
| DWG | **No se lee** | Ábrelo en AutoCAD y usa *Guardar como → DXF* |

Límite: 20 MB por archivo, dentro de la carpeta del proyecto. **Importar no es interpretar**: el calco es una guía visual; el modelo se construye encima (Claude lo traza con `apply_ops`). Con DXF, `underlay_trace` **propone** muros a partir de líneas rectas paralelas a los ejes; tú decides cuáles aplicar. Las imágenes se calcan a mano.

## 3. Flujo de trabajo

1. **Importar** el croquis: `underlay_import` (foto/DXF) → se ve tenue bajo la planta.
2. **Calibrar**: dos puntos y una medida real (`calibrate`), o las unidades del DXF.
3. **Trazar**: muros, vanos, recintos y mobiliario con `apply_ops` (en DXF, ayudado por `underlay_trace`).
4. **Validar**: `validate` aplica reglas geométricas y chilenas; lo que no se puede evaluar sale como «indeterminado».
5. **Revisar a la vista**: `render_plan` (imagen en el chat) o `editor_open` (planta 2D + 3D en el navegador, en vivo).
6. **Retirar el calco**: `apply_ops delete underlay U1`. No queda rastro del bosquejo; las cotas siempre miden la obra, no el dibujo a mano.
7. **Generar láminas y exportar**: `export` en PDF, SVG, DXF, GLB o IFC.

## 4. Qué obtienes: 2D, 3D y PDF

**2D (láminas A3 con viñeta chilena, código `ARQ-NN`)**
- Planta por piso (1:50 o 1:100) con muros, puertas y ventanas, mobiliario, techumbre proyectada, ejes, cotas en **cm sin decimales** y recintos con su superficie.
- Elevación principal y corte A-A. El corte solo existe si el modelo tiene escalera; un departamento de un piso no lleva corte.
- Cuadro de recintos (superficie por recinto, subtotal por piso y total) y cuadro de vanos.
- Presupuesto preliminar en UF, solo si cargas precios.
- Formatos: **SVG** por lámina y **DXF R12** por lámina con geometría. El DXF abre en AutoCAD y LibreCAD, va por capas en español, sin rellenos y con cotas reales editables; para tener `.dwg`, ábrelo en AutoCAD y *Guardar como → DWG*.

**3D**
- **Editor en el navegador**: planta 2D y vista 3D sincronizadas con Claude, recorrido en primera persona, asoleamiento por hora y mes, y mover muros, vanos y muebles con medida exacta. Dibujar muros o recintos desde el editor aún no está disponible: eso lo hace Claude.
- **GLB** (glTF binario, en metros, con mobiliario) e **IFC4** de anteproyecto (muros, vanos, losas, techumbre, escalera y espacios; sin mobiliario).

**PDF**
- Un solo PDF A3 de varias páginas con todas las láminas. No genera un PDF por lámina; para eso usa los SVG.

## 5. Normativa chilena: qué revisa y qué no

- **OGUC 4.1.1**: altura piso a cielo ≥ 2,30 m en locales habitables.
- **OGUC 4.1.2**: cada local habitable con ventana al exterior.
- **CIP (OGUC 1.4.4)**: antejardín, distanciamientos, coeficiente de ocupación, pisos y altura máxima, comparados con **los valores que tú declares** de tu CIP. Sin valor declarado, el resultado es «indeterminado».
- Reglas geométricas: vanos dentro del muro, muros superpuestos, muebles que chocan, polígonos válidos, etc.
- **No revisa**: rasantes, coeficiente de constructibilidad, escaleras, accesibilidad universal, estructura ni instalaciones.
- Citas literales y fuentes en [`docs/oguc-sources.md`](docs/oguc-sources.md). `validate` siempre recuerda que el resultado es orientativo.

## 6. Requisitos e instalación

- Node `>=20.10` y pnpm `11.8.0` (fijado en `packageManager`).
- Chromium de Playwright, para las imágenes PNG y el PDF: `pnpm --filter @arquitecto/server exec playwright install chromium`.
- Claude Code.

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm build:cli                                   # editor web + bundle packages/cli/dist/main.mjs
pnpm exec tsx packages/cli/smoke.mts packages/cli   # smoke: 8 comprobaciones por MCP
claude mcp add arquitecto --scope user -e ARQUITECTO_DIR=<carpeta-de-la-casa> -- node <ruta-repo>/packages/cli/bin/arquitecto-mcp.mjs
claude mcp get arquitecto                         # debe decir "Connected"
```

`ARQUITECTO_DIR` es la carpeta de **una** vivienda: ahí quedan `arquitecto.project.json` y `.arquitecto/` (calcos, alternativas y exportes en `.arquitecto/exports/expediente/`).

## 7. Ejemplo de uso

En una sesión nueva de Claude Code, con el servidor registrado:

1. «Crea un proyecto nuevo llamado *Departamento Pérez*» → `project_new`.
2. «Importa `croquis.jpg` como calco; el muro del living mide 5,40 m entre estos dos puntos» → `underlay_import` con `calibrate`.
3. «Traza los muros, ventanas y recintos siguiendo el calco» → `apply_ops`; revisa con `render_plan`.
4. «Valida el proyecto» → `validate` (indeterminados y observaciones OGUC).
5. «Abre el editor» → `editor_open`; recorre el 3D y corrige a mano.
6. «Retira el calco y exporta PDF y DXF» → `apply_ops delete underlay U1`, `export pdf`, `export dxf`.

## 8. Limitaciones

- No reemplaza AutoCAD, Revit ni Archicad. No hace cálculo estructural ni instalaciones (MEP).
- Los recintos se declaran como polígonos; no se detectan solos a partir de los muros.
- Solo hay una elevación (la principal); no hay planta de techumbre como lámina propia.
- La conversión a DWG la haces tú en AutoCAD.
- El presupuesto no trae precios: los completas tú (`rules/don-gia.json` del proyecto, en UF/m²).
- No hay capturas de pantalla de arquitecto-mcp en este repositorio. Las de `docs/images` y `docs/media` son del proyecto original.

**Aviso legal**: los resultados son anteproyectos de referencia. Antes de usarlos para permisos u obra, deben ser revisados y firmados por los profesionales competentes y el propietario.

## Para desarrolladores

| Paquete | Rol |
|---|---|
| `@arquitecto/core` | Modelo, geometría y validación por reglas. Sin disco ni red. |
| `@arquitecto/server` | Servidor MCP (18 herramientas), render, archivos del proyecto y servidor del editor. |
| `@arquitecto/web` | Editor 2D/3D en el navegador. |
| `arquitecto-mcp` (`packages/cli`) | Empaqueta todo en un solo bundle ejecutable. |

```bash
pnpm typecheck
pnpm test          # suite completa (con Chromium y packages/web/dist incluye los tests de navegador)
pnpm build:web     # solo el editor web
```

| Variable | Por defecto | Uso |
|---|---|---|
| `ARQUITECTO_DIR` | carpeta actual | Carpeta de la vivienda |
| `ARQUITECTO_PORT` | `4823` | Puerto del editor; si está ocupado prueba los 9 siguientes |

**Seguridad**: el editor escucha solo en `127.0.0.1` y exige un token generado en cada arranque (`editor_open` entrega la URL con él); el link compartido es de solo lectura. No expongas el puerto fuera de tu equipo.

**Documentación**: [`CLAUDE.md`](CLAUDE.md) (alcance verificado y convenciones), [`docs/oguc-sources.md`](docs/oguc-sources.md) (fuentes normativas), [`docs/reference-en/`](docs/reference-en/) (documentación original de Atelier, solo como referencia).
