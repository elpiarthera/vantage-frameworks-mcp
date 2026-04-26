import { z } from "zod";

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
  handler: async (_input: ListFrameworksInput): Promise<ListFrameworksOutput> => {
    throw new Error("NotImplemented — T6.A.3");
  },
};
