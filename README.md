# arquitecto-mcp

Arquitecto IA local que se conecta a Claude Code mediante **MCP**. Sirve para dos usos:

- **Levantar propiedades existentes** (corretaje): rehacer la planta a partir de un DXF o una foto de un plano antiguo.
- **Diseñar casas nuevas**: desde un brief hasta planos acotados, un modelo 3D y documentación exportable.

Deriva de [Atelier](https://github.com/lebac-svg/Atelier) (MIT, © 2026 Bắc Lê). Ver [`LICENSE`](LICENSE).

> **Estado: en desarrollo.** Seguridad endurecida (E2) e interfaz en español (E3): herramientas MCP, editor web y plantillas `casa-1-piso`, `casa-2-pisos` y `depto-2d`. Normas chilenas (E4, MVP): los proyectos nuevos se validan con 2 reglas de la OGUC (art. 4.1.1, altura piso a cielo; art. 4.1.2, ventana al exterior), **aún sin validar** por el usuario; lo no evaluable se informa como «indeterminado». Ver [`docs/oguc-sources.md`](docs/oguc-sources.md). **No certifica cumplimiento legal.** Distanciamientos y alturas del Certificado de Informaciones Previas (CIP) se comparan contra los valores que declara el usuario (pack `cl-cip`). El presupuesto usa una tabla en UF/m² con precios «por completar» (`rules/don-gia.json` del proyecto); sin precios entrega solo cantidades, y con el valor de la UF muestra el equivalente en CLP. Los nombres del catálogo de mobiliario y los rótulos de los planos exportados aún no están en español.

> **Seguridad:** el editor web escucha solo en `127.0.0.1` y exige un token que se genera en cada arranque (`editor_open` abre la URL con él). El resto de la etapa de seguridad (E2: validación de IDs y rutas) sigue en curso; no expongas el puerto fuera de tu equipo.

## Qué incluye

- **18 herramientas MCP** sobre un único modelo paramétrico. Cada cambio es una transacción validada (geometría + reglas normativas).
- **Editor web en vivo** (`editor_open`): planta 2D y vista 3D en el navegador, sincronizadas con lo que hace el agente.
- **Exportes** (`export`): PDF A3 multipágina, SVG y DXF por lámina, glTF (`.glb`) y modelo IFC4 de anteproyecto.
- **Calco de planos** (`underlay_import`, `underlay_trace`): pone un DXF o una imagen bajo la planta y propone muros a partir de las líneas.

Los planos y modelos son de **anteproyecto**: no reemplazan un proyecto firmado por un arquitecto habilitado.

## Arquitectura

| Paquete | Rol |
|---|---|
| `@arquitecto/core` | Modelo, geometría y validación por reglas. Sin disco ni red. |
| `@arquitecto/server` | Servidor MCP, render, archivos del proyecto y servidor del editor. |
| `@arquitecto/web` | Editor 2D/3D en el navegador. |
| `arquitecto-mcp` (`packages/cli`) | Empaqueta todo en un solo bundle ejecutable. |

## Requisitos

- Node `>=20.10` y pnpm `11.8.0` (fijado en `packageManager`).
- Chromium de Playwright, solo para los exportes PNG/PDF.

## Desarrollo

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm test
pnpm build:web     # compila el editor web
pnpm build:cli     # editor + bundle en packages/cli/dist/main.mjs
```

## Variables de entorno

| Variable | Por defecto | Uso |
|---|---|---|
| `ARQUITECTO_DIR` | carpeta actual | Carpeta de la casa: contiene `arquitecto.project.json` y `.arquitecto/` |
| `ARQUITECTO_PORT` | `4823` | Puerto del editor; si está ocupado prueba los 9 siguientes |

## Documentación

- [`CLAUDE.md`](CLAUDE.md): convenciones para trabajar en el repo con Claude Code.
- [`docs/reference-en/`](docs/reference-en/): documentación técnica original de Atelier, conservada como referencia.
