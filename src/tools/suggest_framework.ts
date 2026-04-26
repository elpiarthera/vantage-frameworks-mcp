import { z } from "zod";
import { FRAMEWORKS } from "../data/frameworks.js";
import { logger } from "../lib/logger.js";

export const inputSchema = z.object({
  context: z.string().min(20).describe("The situation or context to analyse (min 20 characters)"),
  goal: z
    .enum(["analyze", "decide", "plan", "communicate", "innovate"])
    .describe("User intent: 'analyze' | 'decide' | 'plan' | 'communicate' | 'innovate'"),
  locale: z
    .enum(["en", "fr"])
    .default("en")
    .describe("Locale for output: 'en' (default) | 'fr'"),
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

/**
 * Goal → category affinity weights (0-100). Multiple categories can match
 * a goal because frameworks are not strictly siloed.
 */
const GOAL_WEIGHTS: Record<
  SuggestFrameworkInput["goal"],
  Partial<Record<"strategy" | "innovation" | "decision" | "communication", number>>
> = {
  analyze: { strategy: 80, decision: 60, communication: 40, innovation: 30 },
  decide: { decision: 90, strategy: 60, communication: 30, innovation: 20 },
  plan: { strategy: 85, decision: 55, communication: 40, innovation: 30 },
  communicate: { communication: 90, strategy: 30, decision: 25, innovation: 20 },
  innovate: { innovation: 90, strategy: 40, decision: 30, communication: 25 },
};

/** Keyword nudges to disambiguate close matches based on textual context. */
const KEYWORD_NUDGES: Array<{ pattern: RegExp; framework_id: string; nudge: number }> = [
  { pattern: /\b(decide|decision|choice|choisir|décision)\b/i, framework_id: "eisenhower", nudge: 10 },
  { pattern: /\b(decide|decision|choice|choisir|décision|trade.?off|arbitrage)\b/i, framework_id: "cynefin", nudge: 8 },
  { pattern: /\b(quarter|quarterly|goal|objectif|trimestre|cible)\b/i, framework_id: "okr", nudge: 12 },
  { pattern: /\b(root cause|why|pourquoi|incident|post.?mortem)\b/i, framework_id: "5-whys", nudge: 12 },
  { pattern: /\b(industry|market|competitive|concurrence|secteur)\b/i, framework_id: "porter-5-forces", nudge: 10 },
  { pattern: /\b(strength|weakness|opportunit|threat|swot)\b/i, framework_id: "swot", nudge: 12 },
  { pattern: /\b(prototype|user|empath|interview)\b/i, framework_id: "design-thinking", nudge: 10 },
  { pattern: /\b(mvp|hypothesis|pivot|startup|expérimentation)\b/i, framework_id: "lean-startup", nudge: 12 },
  { pattern: /\b(culture|country|cross.?border|localization|culturel)\b/i, framework_id: "hofstede", nudge: 12 },
  { pattern: /\b(structure|exhaustive|mece|découpe)\b/i, framework_id: "mece", nudge: 10 },
  { pattern: /\b(portfolio|product line|gamme)\b/i, framework_id: "bcg-matrix", nudge: 10 },
  { pattern: /\b(20.?80|pareto|vital few|essentiel)\b/i, framework_id: "pareto", nudge: 10 },
];

export const tool = {
  name: "suggest_framework",
  description:
    "Suggest the best 1-3 thinking frameworks for a given context and goal. Use this whenever the user is unsure which framework to pick or asks 'how should I think about X' — even if they don't say 'suggest' explicitly.",
  description_fr:
    "Suggère les 1 à 3 meilleurs frameworks de pensée pour un contexte et un objectif donnés. Utilise-le quand l'utilisateur hésite sur le framework à choisir ou demande 'comment penser X' — même s'il ne dit pas 'suggérer' explicitement.",
  inputSchema,
  outputSchema,
  handler: async (input: SuggestFrameworkInput): Promise<SuggestFrameworkOutput> => {
    const t0 = Date.now();
    const parsed = inputSchema.parse(input);
    const weights = GOAL_WEIGHTS[parsed.goal];

    const scored = FRAMEWORKS.map((f) => {
      const base = weights[f.category] ?? 20;
      const nudge = KEYWORD_NUDGES.filter(
        (k) => k.framework_id === f.id && k.pattern.test(parsed.context),
      ).reduce((acc, k) => acc + k.nudge, 0);
      const score = Math.min(100, base + nudge);
      const reason =
        parsed.locale === "fr"
          ? `Catégorie ${f.category} alignée sur l'objectif « ${parsed.goal} » (base ${base}${nudge ? `, +${nudge} mots-clés` : ""}).`
          : `Category ${f.category} aligned with goal '${parsed.goal}' (base ${base}${nudge ? `, +${nudge} keywords` : ""}).`;
      return { framework_id: f.id, score, reason };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 3);

    const result: SuggestFrameworkOutput = {
      suggestions: top,
      fetchedAt: new Date().toISOString(),
    };
    const validated = outputSchema.parse(result);
    logger.info({ tool: "suggest_framework", duration_ms: Date.now() - t0 });
    return validated;
  },
};
