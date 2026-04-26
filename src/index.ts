#!/usr/bin/env node
/**
 * Entry point — @vantage/mcp-frameworks
 *
 * Boots the MCP server over stdio transport (Critical Rule #7).
 * Implementation wired in T6.A.4 ; this stub keeps the file shape stable.
 */
import { createServer } from "./server.js";

async function main(): Promise<void> {
  const server = createServer();
  // T6.A.4 : connect StdioServerTransport from @modelcontextprotocol/sdk
  // const transport = new StdioServerTransport();
  // await server.connect(transport);
  void server;
  throw new Error("NotImplemented — stdio wiring scheduled for T6.A.4");
}

main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error("[vantage-frameworks] fatal:", err);
  process.exit(1);
});
