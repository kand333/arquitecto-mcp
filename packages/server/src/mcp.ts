import { mkdirSync } from "node:fs";
import path from "node:path";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ProjectStore } from "./store.js";
import { createArquitectoServer } from "./tools.js";

/**
 * Entry MCP stdio — một process duy nhất (ADR-02).
 * ARQUITECTO_DIR = thư mục chứa arquitecto.project.json (mặc định: cwd —
 * tức repo dự án nhà của người dùng). KHÔNG được ghi ra stdout.
 */
const baseDir = path.resolve(process.env.ARQUITECTO_DIR ?? ".");
mkdirSync(baseDir, { recursive: true });

const store = new ProjectStore(baseDir);
try {
  store.openProject();
  console.error(`[arquitecto] proyecto existente abierto: ${store.filePath}`);
} catch {
  console.error(`[arquitecto] no hay proyecto en ${baseDir}: esperando project_new/project_open`);
}

const server = createArquitectoServer(store);
await server.connect(new StdioServerTransport());
console.error("[arquitecto] servidor MCP listo (stdio)");
