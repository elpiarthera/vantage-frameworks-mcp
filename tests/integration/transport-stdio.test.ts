import { describe, it, expect } from "vitest";
import { createServer, TOOLS, SERVER_NAME, SERVER_VERSION } from "../../src/server.js";

/**
 * Integration test : verifies the MCP server factory exposes the expected
 * surface used by the stdio transport handshake (initialize → list tools →
 * call tool roundtrip). We exercise the in-process tool registry directly
 * because spawning the SDK in CI requires the SDK to be installed and we
 * keep this test stable across environments.
 */
describe("transport-stdio (in-process roundtrip)", () => {
  it("performs an initialize-equivalent handshake and a tool call", async () => {
    const server = createServer();
    expect(server.name).toBe(SERVER_NAME);
    expect(server.version).toBe(SERVER_VERSION);
    expect(server.tools.length).toBe(5);

    // tools/list equivalent
    const names = TOOLS.map((t) => t.name);
    expect(names).toEqual([
      "list_frameworks",
      "get_framework",
      "apply_framework",
      "suggest_framework",
      "compose_workflow",
    ]);

    // tools/call equivalent — list_frameworks(category=all, locale=en)
    const tool = TOOLS.find((t) => t.name === "list_frameworks")!;
    const result = await tool.handler({ category: "all", locale: "en" } as never);
    expect((result as { count: number }).count).toBe(16);
  });
});
