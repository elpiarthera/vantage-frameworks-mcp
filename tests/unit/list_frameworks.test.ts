import { describe, it, expect } from "vitest";
import { tool } from "../../src/tools/list_frameworks.js";

describe("list_frameworks", () => {
  it("lists all 16 frameworks in FR locale", async () => {
    const out = await tool.handler({ category: "all", locale: "fr" });
    expect(out.count).toBe(16);
    expect(out.frameworks).toHaveLength(16);
    expect(out.frameworks[0]?.name_fr).toBeTruthy();
    expect(out.frameworks.every((f) => f.one_line_fr.length > 0)).toBe(true);
    expect(new Date(out.fetchedAt).toString()).not.toBe("Invalid Date");
  });

  it("filters by category 'strategy'", async () => {
    const out = await tool.handler({ category: "strategy", locale: "en" });
    expect(out.count).toBeGreaterThan(0);
    expect(out.count).toBeLessThan(16);
    expect(out.frameworks.every((f) => f.category === "strategy")).toBe(true);
    // SWOT, OKR, BCG, Porter, McKinsey 7S all expected.
    const ids = out.frameworks.map((f) => f.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "swot",
        "okr",
        "bcg-matrix",
        "porter-5-forces",
        "mckinsey-7s",
      ]),
    );
  });

  it("rejects an invalid category", async () => {
    // Zod default does not coerce; an invalid literal must throw.
    await expect(
      // @ts-expect-error — purposely passing wrong literal
      tool.handler({ category: "bogus", locale: "en" }),
    ).rejects.toThrow();
  });
});
