import { describe, it, expect } from "vitest";
import { tool } from "../../src/tools/get_framework.js";

describe("get_framework", () => {
  it("returns SWOT in EN with examples", async () => {
    const out = await tool.handler({ id: "swot", locale: "en", include_examples: true });
    expect(out.id).toBe("swot");
    expect(out.name).toContain("SWOT");
    expect(out.canvas.sections.length).toBe(4);
    expect(out.canvas.sections[0]?.name).toBe("Strengths");
    expect(out.examples?.length).toBeGreaterThan(0);
  });

  it("returns Design Thinking in FR with localised canvas", async () => {
    const out = await tool.handler({
      id: "design-thinking",
      locale: "fr",
      include_examples: true,
    });
    expect(out.id).toBe("design-thinking");
    expect(out.canvas.sections[0]?.name).toBe("Empathie");
    expect(out.canvas.sections[0]?.prompt).toMatch(/utilisateur/i);
    expect(out.steps_fr.length).toBeGreaterThan(0);
  });

  it("rejects an invalid framework id", async () => {
    await expect(
      // @ts-expect-error invalid id by design
      tool.handler({ id: "not-a-framework", locale: "en", include_examples: true }),
    ).rejects.toThrow();
  });
});
