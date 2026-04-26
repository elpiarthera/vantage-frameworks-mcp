import { describe, it, expect } from "vitest";
import { tool as applyFramework } from "../../src/tools/apply_framework.js";
import { tool as composeWorkflow } from "../../src/tools/compose_workflow.js";

/**
 * Hard-gate test for v1.0.5 bug #3 (input duplication / silent truncation).
 * Before v1.0.5, `apply_framework.analysis[].insight` duplicated the input problem
 * sliced to ~200 chars (silent truncation, no ellipsis). v1.0.5 removes the duplication
 * entirely — input remains intact in `result.problem` top-level.
 */
describe("bug #3 — no input duplication / silent truncation", () => {
  it("apply_framework: full problem preserved at top-level, NOT duplicated inside insights (EN)", async () => {
    const longProblem =
      "A".repeat(800) + " strategic positioning question about market expansion in EMEA";
    const out = await applyFramework.handler({
      framework_id: "5-whys",
      problem: longProblem,
      locale: "en",
      depth: "quick",
    });

    // Top-level problem MUST be intact (no truncation).
    expect(out.problem).toBe(longProblem);
    expect(out.problem.length).toBe(longProblem.length);

    // Insights MUST NOT contain any chunk of the problem (no duplication, truncated or not).
    const allInsights = out.analysis.map((a) => a.insight).join(" ");
    expect(allInsights).not.toContain("A".repeat(50));
    expect(allInsights).not.toContain("strategic positioning");
    // No quoted-string artefact from the old `"${problem.slice(0, 200)}"` pattern.
    expect(allInsights).not.toMatch(/apply this question to the problem:/i);
  });

  it("apply_framework: same guarantee in FR locale", async () => {
    const longProblem =
      "B".repeat(800) + " question stratégique sur l'expansion du marché EMEA";
    const out = await applyFramework.handler({
      framework_id: "5-whys",
      problem: longProblem,
      locale: "fr",
      depth: "quick",
    });
    expect(out.problem).toBe(longProblem);
    const allInsights = out.analysis.map((a) => a.insight).join(" ");
    expect(allInsights).not.toContain("B".repeat(50));
    expect(allInsights).not.toContain("question stratégique");
    expect(allInsights).not.toMatch(/applique cette question au problème/i);
  });

  it("compose_workflow: step 1 input preserves the FULL problem (no truncation)", async () => {
    const longProblem =
      "C".repeat(800) + " — workflow audit problem to verify no slice happens";
    const out = await composeWorkflow.handler({
      frameworks: ["5-whys", "okr"],
      problem: longProblem,
      locale: "en",
    });
    // Step 1 input is the original problem — must be intact.
    expect(out.workflow[0]?.input).toBe(longProblem);
    expect(out.workflow[0]?.input.length).toBe(longProblem.length);
  });
});
