import { z } from "zod";

export const inputSchema = z.object({
  context: z.string().min(20).describe("The situation or context to analyse"),
  goal: z.enum(["analyze", "decide", "plan", "communicate", "innovate"]),
  locale: z.enum(["en", "fr"]).default("en"),
});

export const outputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        framework_id: z.string(),
        score: z.number().min(0).max(100),
        reason: z.string(),
      }),
    )
    .max(3),
  fetchedAt: z.string().datetime(),
});

export type SuggestFrameworkInput = z.infer<typeof inputSchema>;
export type SuggestFrameworkOutput = z.infer<typeof outputSchema>;

export const tool = {
  name: "suggest_framework",
  description:
    "Suggest the best 1-3 thinking frameworks for a given context and goal. Use this whenever the user is unsure which framework to pick or asks 'how should I think about X' — even if they don't say 'suggest' explicitly.",
  description_fr:
    "Suggère les 1 à 3 meilleurs frameworks de pensée pour un contexte et un objectif donnés. Utilise-le quand l'utilisateur hésite sur le framework à choisir ou demande 'comment penser X' — même s'il ne dit pas 'suggérer' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (_input: SuggestFrameworkInput): Promise<SuggestFrameworkOutput> => {
    throw new Error("NotImplemented — T6.A.3");
  },
};
