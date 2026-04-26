import { z } from "zod";
import { FRAMEWORK_ID } from "../schemas/index.js";
import { getFrameworkById } from "../data/frameworks.js";
import { FrameworksError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export const inputSchema = z.object({
  framework_id: FRAMEWORK_ID,
  problem: z
    .string()
    .min(20)
    .describe("The situation or problem to analyze"),
  locale: z.enum(["en", "fr"]).default("en"),
  depth: z.enum(["quick", "thorough"]).default("quick"),
});

export const outputSchema = z.object({
  framework: z.string(),
  problem: z.string(),
  analysis: z.array(z.object({ section: z.string(), insight: z.string() })),
  recommendation: z.string(),
  caveats: z.array(z.string()),
  fetchedAt: z.string().datetime(),
});

export type ApplyFrameworkInput = z.infer<typeof inputSchema>;
export type ApplyFrameworkOutput = z.infer<typeof outputSchema>;

export const tool = {
  name: "apply_framework",
  description:
    "Apply a thinking framework to a specific problem and return the structured analysis. Use this whenever the user describes a situation and wants SWOT, 5 Whys, OKR, etc. applied to it — even if they don't say 'apply' explicitly.",
  description_fr:
    "Applique un framework de pensée à un problème spécifique et retourne l'analyse structurée. Utilise-le quand l'utilisateur décrit une situation et veut SWOT, 5 Pourquoi, OKR, etc. appliqués dessus — même s'il ne dit pas 'appliquer' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (input: ApplyFrameworkInput): Promise<ApplyFrameworkOutput> => {
    const t0 = Date.now();
    // Manual problem length check first to provide localized error.
    if (typeof input?.problem === "string" && input.problem.length < 20) {
      throw new FrameworksError("PROBLEM_TOO_SHORT", input.locale ?? "en", {
        provided_length: input.problem.length,
      });
    }
    const parsed = inputSchema.parse(input);
    const framework = getFrameworkById(parsed.framework_id);
    if (!framework) {
      throw new FrameworksError("FRAMEWORK_NOT_FOUND", parsed.locale, {
        id: parsed.framework_id,
      });
    }

    // Apply : map each canvas section to a structured prompt-anchored insight.
    // The handler intentionally returns a structured *scaffold* — actual
    // creative reasoning is performed by the LLM client that consumes the
    // payload. This keeps the tool deterministic and testable.
    const sections =
      parsed.locale === "fr"
        ? framework.canvas.sections.map((s) => ({ name: s.name_fr, prompt: s.prompt_fr }))
        : framework.canvas.sections.map((s) => ({ name: s.name, prompt: s.prompt }));

    const analysis = sections.map((s) => ({
      section: s.name,
      insight:
        parsed.locale === "fr"
          ? `${s.prompt} — applique cette question au problème : "${parsed.problem.slice(0, 200)}"`
          : `${s.prompt} — apply this question to the problem: "${parsed.problem.slice(0, 200)}"`,
    }));

    const recommendation =
      parsed.locale === "fr"
        ? `Suis les ${framework.steps_fr.length} étapes du framework ${framework.name_fr} et synthétise l'arbitrage à la fin.`
        : `Follow the ${framework.steps.length} steps of the ${framework.name} framework and synthesise the trade-off at the end.`;

    const caveats =
      parsed.locale === "fr"
        ? [
            "Sortie structurelle : le raisonnement créatif final reste de la responsabilité du modèle appelant.",
            parsed.depth === "quick"
              ? "Mode 'quick' : pas d'analyse de second ordre."
              : "Mode 'thorough' : prévoir 2-3 itérations avant publication.",
          ]
        : [
            "Structural output: final creative reasoning remains the calling model's responsibility.",
            parsed.depth === "quick"
              ? "Quick mode: no second-order analysis."
              : "Thorough mode: plan 2-3 iterations before publishing.",
          ];

    const result: ApplyFrameworkOutput = {
      framework: parsed.locale === "fr" ? framework.name_fr : framework.name,
      problem: parsed.problem,
      analysis,
      recommendation,
      caveats,
      fetchedAt: new Date().toISOString(),
    };
    const validated = outputSchema.parse(result);
    logger.info({ tool: "apply_framework", duration_ms: Date.now() - t0 });
    return validated;
  },
};
