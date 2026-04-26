import { z } from "zod";

/**
 * Canonical 16 framework identifiers — single source of truth.
 * Reused by every tool input that targets a specific framework.
 * Critical Rule #4 : no z.any anywhere ; everything goes through this enum.
 */
export const FRAMEWORK_ID = z.enum([
  "design-thinking",
  "lean-startup",
  "swot",
  "okr",
  "mece",
  "first-principles",
  "5-whys",
  "eisenhower",
  "raci",
  "ooda",
  "bcg-matrix",
  "porter-5-forces",
  "pareto",
  "hofstede",
  "cynefin",
  "mckinsey-7s",
]);

export type FrameworkId = z.infer<typeof FRAMEWORK_ID>;

export const LOCALE = z.enum(["en", "fr"]);
export type Locale = z.infer<typeof LOCALE>;

export const CATEGORY = z.enum([
  "strategy",
  "innovation",
  "decision",
  "communication",
]);
export type Category = z.infer<typeof CATEGORY>;
