import { z } from "zod";
import { FRAMEWORKS, getFrameworksByCategory } from "../data/frameworks.js";
import { logger } from "../lib/logger.js";

export const inputSchema = z.object({
  category: z
    .enum(["strategy", "innovation", "decision", "communication", "all"])
    .default("all")
    .describe("Filter by category — categorise frameworks par usage"),
  locale: z.enum(["en", "fr"]).default("en").describe("Locale for descriptions"),
});

export const outputSchema = z.object({
  frameworks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      name_fr: z.string(),
      category: z.string(),
      one_line: z.string(),
      one_line_fr: z.string(),
    }),
  ),
  count: z.number(),
  fetchedAt: z.string().datetime(),
});

export type ListFrameworksInput = z.infer<typeof inputSchema>;
export type ListFrameworksOutput = z.infer<typeof outputSchema>;

export const tool = {
  name: "list_frameworks",
  description:
    "List all available thinking frameworks. Use this whenever the user wants to discover frameworks for strategy, innovation, decision-making, or communication — even if they don't say 'list' explicitly.",
  description_fr:
    "Liste tous les frameworks de pensée disponibles. Utilise-le quand l'utilisateur veut découvrir des frameworks pour la stratégie, l'innovation, la décision ou la communication — même s'il ne dit pas 'lister' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (input: ListFrameworksInput): Promise<ListFrameworksOutput> => {
    const t0 = Date.now();
    const parsed = inputSchema.parse(input);
    const filtered = getFrameworksByCategory(parsed.category);
    const result: ListFrameworksOutput = {
      frameworks: filtered.map((f) => ({
        id: f.id,
        name: f.name,
        name_fr: f.name_fr,
        category: f.category,
        one_line: f.one_line,
        one_line_fr: f.one_line_fr,
      })),
      count: filtered.length,
      fetchedAt: new Date().toISOString(),
    };
    const validated = outputSchema.parse(result);
    logger.info({ tool: "list_frameworks", duration_ms: Date.now() - t0 });
    void FRAMEWORKS;
    return validated;
  },
};
