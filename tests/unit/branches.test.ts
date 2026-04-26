import { describe, it, expect } from "vitest";
import { tool as getFw } from "../../src/tools/get_framework.js";
import { tool as applyFw } from "../../src/tools/apply_framework.js";
import { tool as composeWf } from "../../src/tools/compose_workflow.js";
import { tool as suggestFw } from "../../src/tools/suggest_framework.js";
import { tool as listFw } from "../../src/tools/list_frameworks.js";
import { FrameworksError } from "../../src/lib/errors.js";

describe("branch coverage helpers", () => {
  it("get_framework without examples in EN", async () => {
    const out = await getFw.handler({
      id: "okr",
      locale: "en",
      include_examples: false,
    });
    expect(out.examples).toBeUndefined();
  });

  it("apply_framework quick mode (FR)", async () => {
    const out = await applyFw.handler({
      framework_id: "design-thinking",
      problem: "Notre produit n'arrive pas à fidéliser les utilisateurs sur la durée.",
      locale: "fr",
      depth: "quick",
    });
    expect(out.framework).toMatch(/Design Thinking/);
    expect(out.recommendation).toMatch(/étapes/);
    expect(out.caveats.some((c) => c.includes("quick"))).toBe(true);
  });

  it("compose_workflow rejects too few frameworks (EN)", async () => {
    try {
      await composeWf.handler({
        // @ts-expect-error length 1 violates min(2)
        frameworks: ["swot"],
        problem: "An otherwise valid problem statement of more than twenty characters.",
        locale: "en",
      });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(FrameworksError);
      expect((err as FrameworksError).code).toBe("TOO_FEW_FRAMEWORKS");
    }
  });

  it("compose_workflow rejects short problem (EN)", async () => {
    try {
      await composeWf.handler({
        frameworks: ["swot", "okr"],
        problem: "too short",
        locale: "en",
      });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(FrameworksError);
      expect((err as FrameworksError).code).toBe("PROBLEM_TOO_SHORT");
    }
  });

  it("suggest_framework with goal=innovate boosts innovation frameworks", async () => {
    const out = await suggestFw.handler({
      context: "We want to invent a brand new MVP from scratch using lateral thinking.",
      goal: "innovate",
      locale: "en",
    });
    const ids = out.suggestions.map((s) => s.framework_id);
    expect(
      ids.some((i) => ["lean-startup", "design-thinking", "first-principles"].includes(i)),
    ).toBe(true);
  });

  it("list_frameworks innovation filter", async () => {
    const out = await listFw.handler({ category: "innovation", locale: "en" });
    expect(out.frameworks.every((f) => f.category === "innovation")).toBe(true);
    expect(out.count).toBeGreaterThan(0);
  });
});
