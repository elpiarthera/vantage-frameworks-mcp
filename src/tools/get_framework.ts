import { z } from "zod";
import { FRAMEWORK_ID } from "../schemas/index.js";

export const inputSchema = z.object({
  id: FRAMEWORK_ID.describe("Framework identifier"),
  locale: z.enum(["en", "fr"]).default("en"),
  include_examples: z.boolean().default(true),
});

export const outputSchema = z.object({
  id: z.string(),
  name: z.string(),
  name_fr: z.string(),
  description: z.string(),
  description_fr: z.string(),
  canvas: z.object({
    sections: z.array(z.object({ name: z.string(), prompt: z.string() })),
  }),
  steps: z.array(z.string()),
  steps_fr: z.array(z.string()),
  examples: z
    .array(z.object({ context: z.string(), output: z.string() }))
    .optional(),
  fetchedAt: z.string().datetime(),
});

export type GetFrameworkInput = z.infer<typeof inputSchema>;
export type GetFrameworkOutput = z.infer<typeof outputSchema>;

export const tool = {
  name: "get_framework",
  description:
    "Get the full canvas and prompts for a specific thinking framework. Use this whenever the user wants to dive into a framework, run it on a problem, or learn how to apply it — even if they don't say 'get framework' explicitly.",
  description_fr:
    "Récupère le canvas complet et les prompts d'un framework de pensée spécifique. Utilise-le quand l'utilisateur veut approfondir un framework, l'appliquer à un problème ou apprendre à l'utiliser — même s'il ne dit pas 'obtenir framework' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (_input: GetFrameworkInput): Promise<GetFrameworkOutput> => {
    throw new Error("NotImplemented — T6.A.3");
  },
};
