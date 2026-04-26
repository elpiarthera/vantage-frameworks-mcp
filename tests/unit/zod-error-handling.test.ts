import { describe, test, expect } from "vitest";
import { z } from "zod";
import { TOOLS } from "../../src/server.js";
import { FrameworksError } from "../../src/lib/errors.js";

/**
 * Mirror of the server.ts CallTool boundary logic — exercises Zod validation
 * and FrameworksError wrapping the same way the MCP server does at runtime.
 *
 * This guarantees that invalid enum values returned by an LLM client surface
 * as a readable `{isError:true, content:[{text:"Validation error: <field>: ..."}]}`
 * MCP response, NOT a generic "Internal error" (regression v1.0.3 → v1.0.4).
 */
async function callTool(name: string, args: unknown): Promise<{
  isError?: boolean;
  content: Array<{ type: string; text: string }>;
}> {
  const target = TOOLS.find((t) => t.name === name);
  if (!target) {
    return { isError: true, content: [{ type: "text", text: `Unknown tool: ${name}` }] };
  }
  try {
    try {
      target.inputSchema.parse(args);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const msg = e.errors
          .map((err) => `${err.path.join(".") || "<root>"}: ${err.message}`)
          .join("; ");
        return { isError: true, content: [{ type: "text", text: `Validation error: ${msg}` }] };
      }
      throw e;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out = await (target.handler as (i: any) => Promise<unknown>)(args);
    return { content: [{ type: "text", text: JSON.stringify(out) }] };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const msg = err.errors
        .map((e) => `${e.path.join(".") || "<root>"}: ${e.message}`)
        .join("; ");
      return { isError: true, content: [{ type: "text", text: `Validation error: ${msg}` }] };
    }
    if (err instanceof FrameworksError) {
      return { isError: true, content: [{ type: "text", text: err.message }] };
    }
    return { isError: true, content: [{ type: "text", text: "Internal error" }] };
  }
}

describe("Zod enum → readable MCP isError (v1.0.4 fix)", () => {
  test("apply_framework returns isError on invalid depth", async () => {
    const result = await callTool("apply_framework", {
      framework_id: "5-whys",
      problem: "A real problem statement of 30+ characters here",
      depth: "deep", // invalid enum value
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toMatch(/depth/);
    expect(result.content[0]?.text).toMatch(/Validation error/);
    expect(result.content[0]?.text).not.toMatch(/Internal error/);
  });

  test("apply_framework succeeds on valid input (no enum error path)", async () => {
    const result = await callTool("apply_framework", {
      framework_id: "5-whys",
      problem: "A real problem statement of 30+ characters here",
    });
    expect(result.isError).toBeFalsy();
  });

  test("suggest_framework returns isError on invalid goal", async () => {
    const result = await callTool("suggest_framework", {
      context: "A context string of 30+ characters here for testing",
      goal: "freetext-invalid", // invalid enum
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toMatch(/goal/);
    expect(result.content[0]?.text).toMatch(/Validation error/);
  });

  test("list_frameworks returns isError on invalid category", async () => {
    const result = await callTool("list_frameworks", {
      category: "not-a-category",
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toMatch(/category/);
  });

  test("apply_framework returns isError on invalid locale", async () => {
    const result = await callTool("apply_framework", {
      framework_id: "5-whys",
      problem: "A real problem statement of 30+ characters here",
      locale: "es", // invalid
    });
    expect(result.isError).toBe(true);
    expect(result.content[0]?.text).toMatch(/locale/);
  });
});
