#!/usr/bin/env node
/**
 * Entry point — @vantage/mcp-frameworks
 *
 * Boots the MCP server over stdio transport (Critical Rule #7).
 */
import { createServer } from "./server.js";

async function main(): Promise<void> {
  const server = createServer();
  const { StdioServerTransport } = await import(
    "@modelcontextprotocol/sdk/server/stdio.js"
  );
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error("[vantage-frameworks] fatal:", err);
  process.exit(1);
});
