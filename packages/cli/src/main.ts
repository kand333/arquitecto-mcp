import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createArquitectoServer, LiveServer, ProjectStore } from "@arquitecto/server";

/**
 * Entry bản ĐÓNG GÓI (npm: arquitecto-mcp) — cùng ruột với packages/server/src/mcp.ts
 * nhưng font + web editor lấy TRONG package (build.mjs copy vào assets/ + web/)
 * thay vì lần theo cây source. Người dùng đứng trong thư mục dự án nhà của họ:
 *
 *   claude mcp add arquitecto -- npx -y arquitecto-mcp
 *
 * ARQUITECTO_DIR (mặc định: cwd) = một căn nhà. KHÔNG được ghi ra stdout — stdio là kênh MCP.
 */

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.env.ARQUITECTO_FONT_DIR ??= path.join(pkgRoot, "assets", "fonts");

const baseDir = path.resolve(process.env.ARQUITECTO_DIR ?? ".");
mkdirSync(baseDir, { recursive: true });

const store = new ProjectStore(baseDir);
try {
  store.openProject();
  console.error(`[arquitecto] đã tự mở dự án có sẵn tại ${store.filePath}`);
} catch {
  console.error(`[arquitecto] chưa có dự án tại ${baseDir} — chờ project_new/project_open`);
}

const live = new LiveServer(store, { webDist: process.env.ARQUITECTO_WEB_DIST ?? path.join(pkgRoot, "web") });
const server = createArquitectoServer(store, live);
await server.connect(new StdioServerTransport());
console.error("[arquitecto] MCP server sẵn sàng (stdio)");
