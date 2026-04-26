/**
 * MCP server factory — registers the 5 tools of @vantage/mcp-frameworks.
 *
 * Real `Server` instance (from @modelcontextprotocol/sdk) wired in T6.A.4.
 * Stub keeps the import surface stable for tests.
 */
import { tool as listFrameworks } from "./tools/list_frameworks.js";
import { tool as getFramework } from "./tools/get_framework.js";
import { tool as applyFramework } from "./tools/apply_framework.js";
import { tool as suggestFramework } from "./tools/suggest_framework.js";
import { tool as composeWorkflow } from "./tools/compose_workflow.js";

export const TOOLS = [
  listFrameworks,
  getFramework,
  applyFramework,
  suggestFramework,
  composeWorkflow,
] as const;

export interface VantageFrameworksServer {
  readonly name: string;
  readonly version: string;
  readonly tools: typeof TOOLS;
}

export function createServer(): VantageFrameworksServer {
  return {
    name: "vantage-frameworks-mcp",
    version: "0.1.0",
    tools: TOOLS,
  };
}
