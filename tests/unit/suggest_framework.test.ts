import { describe, it, expect } from "vitest";
import { tool } from "../../src/tools/suggest_framework.js";

describe("suggest_framework", () => {
  it("suggests decision-friendly frameworks for a real EN ask", async () => {
    const out = await tool.handler({
      context: "I need to decide between two product paths for next quarter.",
      goal: "decide",
      locale: "en",
    });
    expect(out.suggestions.length).toBeGreaterThan(0);
    expect(out.suggestions.length).toBeLessThanOrEqual(3);
    const ids = out.suggestions.map((s) => s.framework_id);
    // Top 3 should include at least one of: eisenhower, okr, cynefin.
    expect(ids.some((i) => ["eisenhower", "okr", "cynefin"].includes(i))).toBe(true);
    // Scores monotonically non-increasing.
    for (let i = 1; i < out.suggestions.length; i++) {
      expect(out.suggestions[i - 1]!.score).toBeGreaterThanOrEqual(
        out.suggestions[i]!.score,
      );
    }
  });

  it("rejects an empty/too-short context", async () => {
    await expect(
      tool.handler({ context: "short", goal: "analyze", locale: "en" }),
    ).rejects.toThrow();
  });

  it("handles an ambiguous goal but still returns max 3 suggestions", async () => {
    const out = await tool.handler({
      context: "We need a generic structuring tool for an executive workshop.",
      goal: "communicate",
      locale: "fr",
    });
    expect(out.suggestions.length).toBeLessThanOrEqual(3);
    expect(out.suggestions.every((s) => s.score >= 0 && s.score <= 100)).toBe(true);
    expect(out.suggestions.every((s) => /Catégorie|alignée/.test(s.reason))).toBe(true);
  });
});
