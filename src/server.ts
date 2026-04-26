/**
 * MCP server factory — registers the 5 tools of @vantageos/mcp-frameworks.
 *
 * Lazy-loads the @modelcontextprotocol/sdk only when `connect()` is invoked
 * so the test suite can import `TOOLS` and `createServer` without requiring
 * the SDK at unit-test time.
 */
import { tool as listFrameworks } from "./tools/list_frameworks.js";
import { tool as getFramework } from "./tools/get_framework.js";
import { tool as applyFramework } from "./tools/apply_framework.js";
import { tool as suggestFramework } from "./tools/suggest_framework.js";
import { tool as composeWorkflow } from "./tools/compose_workflow.js";
import { logger } from "./lib/logger.js";
import { FrameworksError } from "./lib/errors.js";

export const TOOLS = [
  listFrameworks,
  getFramework,
  applyFramework,
  suggestFramework,
  composeWorkflow,
] as const;

export const SERVER_NAME = "vantage-frameworks-mcp";
export const SERVER_VERSION = "1.0.0";

type AnyTool = (typeof TOOLS)[number];

function jsonSchemaFromZod(toolDef: AnyTool): Record<string, unknown> {
  // Minimal hand-rolled converter — keeps the package free of an extra dep.
  // The SDK accepts any JSON-Schema-compatible object; this loose shape is
  // good enough for tools/list and tools/call discovery in MCP clients.
  const shape = toolDef.inputSchema._def.shape();
  const properties: Record<string, unknown> = {};
  const required: string[] = [];
  for (const [key, value] of Object.entries(shape)) {
    const def = (value as { _def: { typeName: string; description?: string } })._def;
    const description =
      (value as { description?: string }).description ?? def.description ?? "";
    properties[key] = { description };
    // Naive required detection: if no .default applied at top level.
    const hasDefault =
      typeof (value as { isOptional?: () => boolean }).isOptional === "function" &&
      (value as { isOptional: () => boolean }).isOptional();
    if (!hasDefault) required.push(key);
  }
  return {
    type: "object",
    properties,
    required,
    additionalProperties: false,
  };
}

export interface VantageFrameworksServer {
  readonly name: string;
  readonly version: string;
  readonly tools: typeof TOOLS;
  /** Connect the server to a transport (stdio by default). */
  connect: (transport: unknown) => Promise<void>;
}

export function createServer(): VantageFrameworksServer {
  return {
    name: SERVER_NAME,
    version: SERVER_VERSION,
    tools: TOOLS,
    async connect(transport: unknown) {
      // Dynamic import : keeps unit tests fast and SDK-agnostic.
      const { Server } = await import(
        "@modelcontextprotocol/sdk/server/index.js"
      );
      const { CallToolRequestSchema, ListToolsRequestSchema } = await import(
        "@modelcontextprotocol/sdk/types.js"
      );

      const server = new Server(
        { name: SERVER_NAME, version: SERVER_VERSION },
        { capabilities: { tools: {} } },
      );

      server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
          tools: TOOLS.map((t) => ({
            name: t.name,
            description: t.description,
            inputSchema: jsonSchemaFromZod(t),
          })),
        };
      });

      server.setRequestHandler(CallToolRequestSchema, async (req: { params: { name: string; arguments?: unknown } }) => {
        const name = req.params.name;
        const args = req.params.arguments ?? {};
        const target = TOOLS.find((t) => t.name === name);
        if (!target) {
          return {
            isError: true,
            content: [{ type: "text", text: `Unknown tool: ${name}` }],
          };
        }
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const out = await (target.handler as (i: any) => Promise<unknown>)(args);
          return {
            content: [{ type: "text", text: JSON.stringify(out) }],
            structuredContent: out,
          };
        } catch (err) {
          if (err instanceof FrameworksError) {
            logger.warn({ tool: name, error: err.code });
            return {
              isError: true,
              content: [{ type: "text", text: err.message }],
            };
          }
          logger.error({
            tool: name,
            error: err instanceof Error ? err.message : "unknown",
          });
          // Critical Rule #6 : never leak stack traces to the client.
          return {
            isError: true,
            content: [{ type: "text", text: "Internal error" }],
          };
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await server.connect(transport as any);
    },
  };
}
