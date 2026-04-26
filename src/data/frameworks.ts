/**
 * Framework catalog — placeholder data.
 *
 * Real bilingual content (canvas sections, steps, examples) is sourced from
 * `vantage-studio` repo `analysis/vantage-studio-frameworks-inventory-2026-04-26.md`
 * and populated in T6.A.3.
 *
 * Critical Rule #1 (bilingue) : every record exposes EN + FR fields.
 */
import type { FrameworkId, Category } from "../schemas/index.js";

export interface FrameworkExample {
  context: string;
  output: string;
}

export interface FrameworkCanvasSection {
  name: string;
  prompt: string;
}

export interface FrameworkRecord {
  id: FrameworkId;
  name: string;
  name_fr: string;
  category: Category;
  one_line: string;
  one_line_fr: string;
  canvas: { sections: FrameworkCanvasSection[] };
  steps: string[];
  steps_fr: string[];
  examples: FrameworkExample[];
}

const stub = (
  id: FrameworkId,
  name: string,
  name_fr: string,
  category: Category,
): FrameworkRecord => ({
  id,
  name,
  name_fr,
  category,
  one_line: `TODO EN one-liner for ${name} — populated in T6.A.3.`,
  one_line_fr: `TODO description FR pour ${name_fr} — à compléter en T6.A.3.`,
  canvas: { sections: [] },
  steps: [],
  steps_fr: [],
  examples: [],
});

export const FRAMEWORKS: FrameworkRecord[] = [
  stub("design-thinking", "Design Thinking", "Design Thinking", "innovation"),
  stub("lean-startup", "Lean Startup", "Lean Startup", "innovation"),
  stub("swot", "SWOT Analysis", "Analyse SWOT", "strategy"),
  stub("okr", "OKR", "OKR", "strategy"),
  stub("mece", "MECE", "MECE", "communication"),
  stub("first-principles", "First Principles", "Premiers Principes", "innovation"),
  stub("5-whys", "5 Whys", "5 Pourquoi", "decision"),
  stub("eisenhower", "Eisenhower Matrix", "Matrice d'Eisenhower", "decision"),
  stub("raci", "RACI", "RACI", "communication"),
  stub("ooda", "OODA Loop", "Boucle OODA", "decision"),
  stub("bcg-matrix", "BCG Matrix", "Matrice BCG", "strategy"),
  stub("porter-5-forces", "Porter's 5 Forces", "5 Forces de Porter", "strategy"),
  stub("pareto", "Pareto 80/20", "Pareto 80/20", "decision"),
  stub("hofstede", "Hofstede Cultural Dimensions", "Dimensions Culturelles de Hofstede", "communication"),
  stub("cynefin", "Cynefin Framework", "Framework Cynefin", "decision"),
  stub("mckinsey-7s", "McKinsey 7S", "McKinsey 7S", "strategy"),
];

export function getFrameworkById(id: FrameworkId): FrameworkRecord | undefined {
  return FRAMEWORKS.find((f) => f.id === id);
}
