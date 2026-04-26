import { describe, it, expect } from "vitest";
import { t, listKeys } from "../../src/lib/i18n.js";
import { FrameworksError } from "../../src/lib/errors.js";
import { logger } from "../../src/lib/logger.js";

describe("lib/i18n", () => {
  it("returns the EN string by default", () => {
    expect(t("error.invalid_params")).toMatch(/Invalid/);
  });
  it("returns the FR string when locale is fr", () => {
    expect(t("error.invalid_params", "fr")).toMatch(/invalides/);
  });
  it("falls back to the key when missing", () => {
    expect(t("missing.key", "fr")).toBe("missing.key");
  });
  it("lists keys deterministically", () => {
    const en = listKeys("en");
    const fr = listKeys("fr");
    expect(en).toEqual(fr);
    expect(en.length).toBeGreaterThanOrEqual(8);
  });
});

describe("lib/errors", () => {
  it("builds a localised error with code + data", () => {
    const err = new FrameworksError("FRAMEWORK_NOT_FOUND", "fr", { id: "x" });
    expect(err.code).toBe("FRAMEWORK_NOT_FOUND");
    expect(err.locale).toBe("fr");
    expect(err.message).toMatch(/identifiant/);
    expect(err.data).toEqual({ id: "x" });
  });
  it("defaults to EN when no locale is given", () => {
    const err = new FrameworksError("INTERNAL_ERROR");
    expect(err.locale).toBe("en");
    expect(err.message).toMatch(/internal error/i);
  });
});

describe("lib/logger", () => {
  it("emits info / warn / error without throwing", () => {
    expect(() => logger.info({ tool: "x" })).not.toThrow();
    expect(() => logger.warn({ tool: "x" })).not.toThrow();
    expect(() => logger.error({ tool: "x" })).not.toThrow();
    expect(() => logger.debug({ tool: "x" })).not.toThrow();
  });
});
