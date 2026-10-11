# arquitecto-mcp

Arquitecto IA local que se conecta a Claude Code mediante **MCP**. Sirve para dos usos:

- **Levantar propiedades existentes** (corretaje): rehacer la planta a partir de un DXF o una foto de un plano antiguo.
- **Diseñar casas nuevas**: desde un brief hasta planos acotados, un modelo 3D y documentación exportable.

Deriva de [Atelier](https://github.com/lebac-svg/Atelier) (MIT, © 2026 Bắc Lê). Ver [`LICENSE`](LICENSE).

> **Estado: en desarrollo.** Hoy el código es el de Atelier renombrado. La UI y las reglas siguen en vietnamita/inglés con normas TCVN/UK. El español y las reglas de Chile (OGUC) llegan en etapas posteriores.

> **Seguridad:** hasta completar la etapa de seguridad (E2), el editor web **no tiene autenticación**. No cambies `ARQUITECTO_HOST` a `0.0.0.0` ni expongas el puerto fuera de tu equipo.

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
| `ARQUITECTO_HOST` | `127.0.0.1` | Interfaz del editor. Ver la advertencia de seguridad |

## Documentación

- [`CLAUDE.md`](CLAUDE.md): convenciones para trabajar en el repo con Claude Code.
- [`docs/reference-en/`](docs/reference-en/): documentación técnica original de Atelier, conservada como referencia.
