import { z } from "zod";
import { FRAMEWORK_ID } from "../schemas/index.js";
import { getFrameworkById } from "../data/frameworks.js";
import { FrameworksError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export const inputSchema = z.object({
  frameworks: z.array(FRAMEWORK_ID).min(2).max(3),
  problem: z.string().min(20).describe("The problem to run the workflow against"),
  locale: z.enum(["en", "fr"]).default("en"),
});

export const outputSchema = z.object({
  workflow: z.array(
    z.object({
      step: z.number(),
      framework: z.string(),
      input: z.string(),
      output: z.string(),
    }),
  ),
  final_synthesis: z.string(),
  fetchedAt: z.string().datetime(),
});

export type ComposeWorkflowInput = z.infer<typeof inputSchema>;
export type ComposeWorkflowOutput = z.infer<typeof outputSchema>;

export const tool = {
  name: "compose_workflow",
  description:
    "Chain 2-3 frameworks into a sequenced workflow on a single problem. Use this whenever the user wants to combine 5 Whys then OKR, or SWOT then Porter 5 Forces, etc. — even if they don't say 'compose' explicitly.",
  description_fr:
    "Enchaîne 2-3 frameworks en un workflow séquencé sur un seul problème. Utilise-le quand l'utilisateur veut combiner 5 Pourquoi puis OKR, ou SWOT puis Porter 5 Forces, etc. — même s'il ne dit pas 'composer' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (input: ComposeWorkflowInput): Promise<ComposeWorkflowOutput> => {
    const t0 = Date.now();
    // Pre-validation: localized errors for too few/many.
    if (Array.isArray(input?.frameworks)) {
      if (input.frameworks.length < 2) {
        throw new FrameworksError("TOO_FEW_FRAMEWORKS", input.locale ?? "en");
      }
      if (input.frameworks.length > 3) {
        throw new FrameworksError("TOO_MANY_FRAMEWORKS", input.locale ?? "en");
      }
    }
    if (typeof input?.problem === "string" && input.problem.length < 20) {
      throw new FrameworksError("PROBLEM_TOO_SHORT", input.locale ?? "en");
    }

    const parsed = inputSchema.parse(input);

    const workflow: ComposeWorkflowOutput["workflow"] = [];
    let runningInput = parsed.problem;

    for (let i = 0; i < parsed.frameworks.length; i++) {
      const fid = parsed.frameworks[i]!;
      const f = getFrameworkById(fid);
      if (!f) {
        throw new FrameworksError("FRAMEWORK_NOT_FOUND", parsed.locale, { id: fid });
      }
      const name = parsed.locale === "fr" ? f.name_fr : f.name;
      const stepOutput =
        parsed.locale === "fr"
          ? `Sortie de ${name} : ${f.steps_fr.join(" ; ")}`
          : `${name} output: ${f.steps.join(" ; ")}`;
      workflow.push({
        step: i + 1,
        framework: name,
        input: runningInput,
        output: stepOutput,
      });
      runningInput =
        parsed.locale === "fr"
          ? `Sortie de l'étape ${i + 1} (${name}) à passer à l'étape suivante.`
          : `Output of step ${i + 1} (${name}) to feed the next step.`;
    }

    const final_synthesis =
      parsed.locale === "fr"
        ? `Synthèse : enchaînement ${parsed.frameworks
            .map((id) => getFrameworkById(id)?.name_fr ?? id)
            .join(" → ")} appliqué au problème.`
        : `Synthesis: pipeline ${parsed.frameworks
            .map((id) => getFrameworkById(id)?.name ?? id)
            .join(" → ")} applied to the problem.`;

    const result: ComposeWorkflowOutput = {
      workflow,
      final_synthesis,
      fetchedAt: new Date().toISOString(),
    };
    const validated = outputSchema.parse(result);
    logger.info({ tool: "compose_workflow", duration_ms: Date.now() - t0 });
    return validated;
  },
};
