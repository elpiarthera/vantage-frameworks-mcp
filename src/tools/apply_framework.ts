import { z } from "zod";
import { FRAMEWORK_ID } from "../schemas/index.js";

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
  handler: async (_input: ApplyFrameworkInput): Promise<ApplyFrameworkOutput> => {
    throw new Error("NotImplemented — T6.A.3");
  },
};
