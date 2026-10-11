import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

/**
 * Smoke test del bundle COMPILADO: ejecuta el bin real por MCP stdio, como Claude Code.
 *
 *   pnpm build:cli && pnpm exec tsx packages/cli/smoke.mts packages/cli
 */

const pkgRoot = process.argv[2];
if (!pkgRoot) {
  console.error("Uso: pnpm exec tsx packages/cli/smoke.mts <carpeta del paquete arquitecto-mcp>");
  process.exit(1);
}
const BIN = path.join(pkgRoot, "bin", "arquitecto-mcp.mjs");
const HOUSE = mkdtempSync(path.join(tmpdir(), "arquitecto-smoke-"));

const ok = (cond: boolean, label: string): void => {
  console.log(cond ? `✔ ${label}` : `✘ ${label}`);
  if (!cond) process.exitCode = 1;
};
const textOf = (r: { content?: unknown }): string =>
  ((r.content ?? []) as Array<{ type: string; text?: string }>).filter((c) => c.type === "text").map((c) => c.text).join("\n");

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [BIN],
  env: { ...(process.env as Record<string, string>), ARQUITECTO_DIR: HOUSE, ARQUITECTO_PORT: "4991" },
  stderr: "pipe",
});
const client = new Client({ name: "smoke", version: "0.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
ok(tools.length === 18, `listTools: ${tools.length} tools`);

const created = await client.callTool({ name: "project_new", arguments: { name: "Casa smoke", template: "casa-1-piso" } });
ok(textOf(created).includes("✅"), "project_new desde plantilla");

const plan = await client.callTool({ name: "render_plan", arguments: { level: "L1" } });
const hasImage = ((plan.content ?? []) as Array<{ type: string }>).some((c) => c.type === "image");
ok(hasImage, `render_plan devuelve PNG${hasImage ? "" : ` — ${textOf(plan).slice(0, 120)}`}`);

const est1 = await client.callTool({ name: "estimate_cost", arguments: {} });
ok(textOf(est1).includes("➤ TOTAL: por completar"), "estimate_cost con la tabla empaquetada: sin total inventado");

// tabla de precios del PROYECTO (UF/m²) sobre la empaquetada
mkdirSync(path.join(HOUSE, "rules"), { recursive: true });
writeFileSync(
  path.join(HOUSE, "rules", "don-gia.json"),
  JSON.stringify({
    version: "local-smoke-2026",
    don_gia_m2: { xay_tho: { label: "Obra gruesa", monto: 10 }, hoan_thien: { "trung-binh-kha": { label: "Terminaciones medias", monto: 5 } } },
  }),
  "utf8",
);
const est2 = textOf(await client.callTool({ name: "estimate_cost", arguments: {} }));
ok(est2.includes("local-smoke-2026") && /➤ TOTAL: [\d.,]+ UF/.test(est2), "rules/don-gia.json del proyecto: total en UF");

const editor = await client.callTool({ name: "editor_open", arguments: { openBrowser: false } });
const m = textOf(editor).match(/(http:\/\/localhost:\d+)\/\?token=([\w-]+)/);
const url = m?.[1];
ok(!!url, `editor_open URL: ${url}`);
if (url) {
  const html = await (await fetch(url)).text();
  ok(html.includes("<script") && !html.includes("no está compilado"), "editor web empaquetado servido");
  const svg = await (await fetch(`${url}/plan/L1.svg?token=${m?.[2]}`)).text();
  ok(svg.includes("Be Vietnam Pro") && svg.includes("data:font/ttf"), "fuente incrustada desde los assets del paquete");
}

await client.close();
console.log(`— smoke terminado (casa de prueba: ${HOUSE}) —`);
