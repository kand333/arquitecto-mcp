# DEPS — Vulnerabilidades en dependencias de terceros

**Origen:** línea base de E0 (`SECURITY-AUDIT-BASE.md`, `pnpm audit --audit-level=high` sobre el lockfile del upstream). Ítem aprobado por el usuario tras E0.

**Análisis:**
- `vitest` 3.x depende de `tinypool ^1.1.1` (vulnerable ≤2.1.0, crítico). Ninguna 3.x lo corrige; la primera rama sin `tinypool` es la 4.x → salto mínimo a `vitest@^4.1.11` (no a 5.x).
- `@modelcontextprotocol/sdk` 1.29.0 → 1.32.1 (misma mayor). Su `express ^5.2.1` no cambia: `proxy-addr`, `fast-uri` e `ip-address` son versiones transitivas fijadas en el lockfile y se corrigen refrescándolas dentro de sus rangos.

## Antes (rojo)

- Fecha: 2026-10-11 · Commit base: `6be626c`
- Comando: `pnpm audit --audit-level=high`

```text
      2  high fast-uri vulnerable to server-side request forgery via 	 Package fast-uri 
      1  high source-map-js allows event-loop denial of service 	 Package source-map-js 
      1  high PostCSS: Path Traversal in Previous Source Map 	 Package postcss 
      1  high nanoid: custom generators can loop indefinitely when 	 Package nanoid 
      1  high MCP TypeScript SDK: OAuth client could send 	 Package @modelcontextprotocol/sdk 
      1  high ip-address: Address4 decodes leading-zero octets as 	 Package ip-address 
      1  high fast-uri vulnerable to host confusion via skipped IDN 	 Package fast-uri 
      1  high fast-uri vulnerable to host confusion via literal 	 Package fast-uri 
      1  high fast-uri vulnerable to host confusion via backslash 	 Package fast-uri 
      1  high fast-uri vulnerable to host confusion via 	 Package fast-uri 
      1  high fast-uri vulnerable to authority injection via an 	 Package fast-uri 
      1  critical Tinypool: Prototype Pollution Gadget to RCE in run() 	 Package tinypool 
      1  critical Tinypool: Prototype Pollution gadget in worker options 	 Package tinypool 
      1  critical proxy-addr vulnerable to IP spoofing via IPv4-mapped 	 Package proxy-addr 
37 vulnerabilities found
Severity: 1 low | 21 moderate | 12 high | 3 critical
```

## Fix

Actualizaciones (todas con `pnpm up -r --ignore-scripts`; ningún paquete directo nuevo):

| Paquete | Antes | Después | Rango en package.json |
|---|---|---|---|
| `@modelcontextprotocol/sdk` (server, cli) | 1.29.0 | 1.32.1 | `^1.12.0` → `^1.32.1` |
| `vitest` (raíz, core, server, web) | 3.2.7 | 4.1.11 | `^3.2.0` → `^4.1.11` (mayor: elimina `tinypool`) |
| `hono` (server) | 4.12.29 | 4.13.13 | `^4.12.29` → `^4.13.7` |
| `@hono/node-server` (server) | 2.0.8 | 2.1.4 | `^2.0.8` → `^2.0.10` |

- Tras SDK + vitest: 37 → 9 (1 low, 8 moderate), todas en `hono` / `@hono/node-server`. Sus parches estaban dentro de los rangos ya declarados; se fijaron los mínimos parcheados. Una afectaba al parser de query (`?token=` de A1).
- `hono` y `@hono/node-server` no estaban en el texto original del ítem (que nombraba SDK y vitest), pero sí en su objetivo: todo lo que tenga parche se actualiza.
- vitest 4: sin cambios en `vitest.config.ts` ni en los tests.
- `SECURITY-AUDIT-BASE.md` se conserva como línea base del upstream.

## Después (verde)

- Fecha: 2026-10-11
- `pnpm audit --audit-level=high`:

```text
No known vulnerabilities found
```

- `pnpm install --frozen-lockfile --ignore-scripts`: «Already up to date» (lockfile coherente).
- `pnpm typecheck` verde; `pnpm test` → 248 passed, 1 failed (PDF: Chromium, preexistente), 17 skipped. Mismo resultado que antes de actualizar.
