import { describe, it, expect } from "vitest";
import { tool } from "../../src/tools/apply_framework.js";
import { FrameworksError } from "../../src/lib/errors.js";

describe("apply_framework", () => {
  it("applies SWOT to a real strategic problem (EN)", async () => {
    const out = await tool.handler({
      framework_id: "swot",
      problem: "Our boutique consultancy is planning 2026 and we want to win in AI services.",
      locale: "en",
      depth: "thorough",
    });
    expect(out.framework).toContain("SWOT");
    expect(out.analysis.length).toBe(4);
    expect(out.analysis[0]?.section).toBe("Strengths");
    expect(out.recommendation).toMatch(/SWOT/);
    expect(out.caveats.length).toBeGreaterThan(0);
  });

  it("applies 5 Whys to an edge incident case (EN)", async () => {
    const out = await tool.handler({
      framework_id: "5-whys",
      problem: "Production deployment failed twice in a row this week and nobody knows why.",
      locale: "en",
      depth: "quick",
    });
    expect(out.analysis.length).toBeGreaterThanOrEqual(5);
    expect(out.recommendation).toMatch(/5 Whys/);
  });

  it("rejects a problem shorter than 20 chars with a localised error (FR)", async () => {
    try {
      await tool.handler({
        framework_id: "swot",
        problem: "trop court",
        locale: "fr",
        depth: "quick",
      });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(FrameworksError);
      expect((err as FrameworksError).code).toBe("PROBLEM_TOO_SHORT");
      expect((err as FrameworksError).message).toMatch(/20 caractères/);
    }
  });
});
