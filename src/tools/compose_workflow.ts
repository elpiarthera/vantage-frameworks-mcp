import { z } from "zod";
import { FRAMEWORK_ID } from "../schemas/index.js";

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
  handler: async (_input: ComposeWorkflowInput): Promise<ComposeWorkflowOutput> => {
    throw new Error("NotImplemented — T6.A.3");
  },
};
