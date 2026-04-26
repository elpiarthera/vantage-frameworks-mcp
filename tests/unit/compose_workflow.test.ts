import { describe, it, expect } from "vitest";
import { tool } from "../../src/tools/compose_workflow.js";
import { FrameworksError } from "../../src/lib/errors.js";

describe("compose_workflow", () => {
  it("chains [5-whys, eisenhower, okr] in EN", async () => {
    const out = await tool.handler({
      frameworks: ["5-whys", "eisenhower", "okr"],
      problem: "Our team is overloaded and missing strategic priorities every quarter.",
      locale: "en",
    });
    expect(out.workflow.length).toBe(3);
    expect(out.workflow[0]?.step).toBe(1);
    expect(out.workflow[0]?.framework).toMatch(/5 Whys/);
    expect(out.workflow[2]?.framework).toMatch(/OKR/);
    expect(out.final_synthesis).toMatch(/5 Whys/);
  });

  it("supports a 2-step pareto+swot workflow in FR (locale routing)", async () => {
    const out = await tool.handler({
      frameworks: ["pareto", "swot"],
      problem: "Notre support client est saturé et nous voulons définir une stratégie 2026.",
      locale: "fr",
    });
    expect(out.workflow.length).toBe(2);
    expect(out.workflow[0]?.framework).toMatch(/Pareto/);
    expect(out.workflow[1]?.framework).toMatch(/SWOT/);
    expect(out.final_synthesis).toMatch(/Synthèse/);
    expect(out.workflow[0]?.output).toMatch(/Sortie de/);
  });

  it("rejects 4 frameworks with a localised TOO_MANY_FRAMEWORKS error", async () => {
    try {
      await tool.handler({
        // @ts-expect-error length 4 violates max(3) — we want to catch the manual guard
        frameworks: ["swot", "okr", "5-whys", "eisenhower"],
        problem: "An otherwise valid problem statement of more than twenty characters.",
        locale: "fr",
      });
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(FrameworksError);
      expect((err as FrameworksError).code).toBe("TOO_MANY_FRAMEWORKS");
      expect((err as FrameworksError).message).toMatch(/maximum/);
    }
  });
});
