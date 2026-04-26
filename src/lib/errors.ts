/**
 * Typed error helpers — wraps MCP SDK McpError when available, otherwise a
 * plain Error with `code` so tests can introspect without depending on the SDK.
 *
 * Critical Rule #6 : never expose stack traces to the client. The `cause`
 * field stays server-side and is logged via `lib/logger.ts`.
 */
import { t, type Locale } from "./i18n.js";

export type ErrorCode =
  | "INVALID_PARAMS"
  | "FRAMEWORK_NOT_FOUND"
  | "PROBLEM_TOO_SHORT"
  | "TOO_MANY_FRAMEWORKS"
  | "TOO_FEW_FRAMEWORKS"
  | "INVALID_CATEGORY"
  | "INVALID_GOAL"
  | "INTERNAL_ERROR";

const CODE_TO_KEY: Record<ErrorCode, string> = {
  INVALID_PARAMS: "error.invalid_params",
  FRAMEWORK_NOT_FOUND: "error.framework_not_found",
  PROBLEM_TOO_SHORT: "error.problem_too_short",
  TOO_MANY_FRAMEWORKS: "error.too_many_frameworks",
  TOO_FEW_FRAMEWORKS: "error.too_few_frameworks",
  INVALID_CATEGORY: "error.invalid_category",
  INVALID_GOAL: "error.invalid_goal",
  INTERNAL_ERROR: "error.internal",
};

export class FrameworksError extends Error {
  public readonly code: ErrorCode;
  public readonly locale: Locale;
  public readonly data?: Record<string, unknown>;

  constructor(
    code: ErrorCode,
    locale: Locale = "en",
    data?: Record<string, unknown>,
  ) {
    super(t(CODE_TO_KEY[code], locale));
    this.code = code;
    this.locale = locale;
    if (data !== undefined) this.data = data;
    this.name = "FrameworksError";
  }
}
