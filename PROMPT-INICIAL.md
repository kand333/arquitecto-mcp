# Prompt inicial para la nueva sesión

**Antes de pegarlo**
1. Abre Claude Code en `D:\0Claude\arquitecto-mcp`.
2. Sal de bypass permissions con **Shift+Tab** hasta que el modo pida aprobación para cada comando.
3. Si Claude Code pide confiar en hooks o servidores MCP de la carpeta, **rechaza**.

Copia todo lo que hay entre las líneas `---` y pégalo como primer mensaje.

---

Lee primero `CONTEXTO.md` de esta carpeta, completo. Es la memoria de una conversación anterior: contiene el plan aprobado (E0–E6), las decisiones, las vulnerabilidades a corregir (A1, A2, M1, M2, M3) y el método didáctico. Síguelo al pie de la letra; si algo de lo que te pido aquí lo contradice, avísame antes de actuar.

Vamos a ejecutar **solo la etapa E0 · Línea base**.

Reglas para esta sesión:
- Modo de permisos manual: yo apruebo cada comando. No uses `dangerouslyDisableSandbox` ni subagentes.
- No modifiques nada en `D:\0Claude\Atelier-main`: solo léelo y cópialo.
- Al copiar el upstream, excluye `.claude/` y `.mcp.json`, como indica `CONTEXTO.md`.
- `CONTEXTO.md` y `PROMPT-INICIAL.md` **no** van en el commit del upstream, sino en un commit aparte después del tag.
- No hagas push ni crees remotos.
- Aplica el método didáctico de `CONTEXTO.md` en este orden:
  1. Qué y por qué.
  2. Explicación Feynman con una analogía. En E0, qué es MCP y cuáles son las 4 capas `core`/`server`/`web`/`cli`.
  3. Pasos, uno a uno.
  4. «Compruébalo tú»: comandos que yo ejecuto, con lo que debo ver.
  5. Commit.
- Si un comando falla, analiza el error y explícamelo antes de reintentar.

Al terminar E0:
1. Muéstrame `git log --oneline`, `git tag`, las primeras líneas de `SECURITY-AUDIT-BASE.md` y el resultado de `pnpm typecheck` y `pnpm test`, indicando qué falló y por qué (por ejemplo, falta Chromium).
2. Actualiza la sección «Estado actual» de `CONTEXTO.md`: E0 completada, con los hashes de los commits y lo pendiente.
3. Para ahí y espera mi confirmación antes de E1.

---
