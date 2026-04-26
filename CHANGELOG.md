# Changelog

All notable changes to `@vantage/mcp-frameworks` are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [SemVer](https://semver.org/).

## [1.0.4] - 2026-04-26
### Fixed
- Zod enum validation errors now return readable `{isError:true, content:[{text:"Validation error: <field>: <reason>"}]}` instead of generic "Internal error" — fixes 2/5 tools previously unusable for LLM clients (apply_framework + suggest_framework).
- Tool input schema descriptions now list explicit enum values for every `z.enum()` — LLM clients can pick valid values without trial-and-error. Affects `depth`, `goal`, `category`, `locale`, `include_examples`.

## [1.0.3] - 2026-04-26
### Removed
- Internal `SELLABLE AS` taxonomy marker from public surfaces (README.md, README.fr.md, etc.). This marker is internal ElPi Corp brief taxonomy and should not appear on npm registry, GitHub, or VantageRegistry public catalog.
- Future-dated timelines ("Q3 2026", "Q4 2026", "Timeline:") from public surfaces. Replaced with neutral "Activated based on adoption signal" / "Activée selon le signal d'adoption" — ElPi Corp doctrine: do not commit publicly to dates that ship-fast velocity will invalidate.

## [1.0.2] - 2026-04-26
### Changed
- Vitrine descriptions across 4 surfaces (package.json, README.md, README.fr.md, VantageRegistry) per ElPi Corp standard: HOOK + WHAT + WHO + WHY + QUICK START + BILINGUAL FR+EN + EXAMPLES + Doctrine Flexibilité Phase 1/2 disclosure.
- No behavioral or API change.

## [1.0.1] - 2026-04-26
### Changed
- Renamed npm scope `@vantage` → `@vantageos` for ElPi Corp brand unification (matches existing `@vantageos/vantage-radar-mcp` + `vantageos-agency` GitHub org).
- No behavioral change. Install command: `npx -y @vantageos/mcp-frameworks` (replaces `@vantage/mcp-frameworks`).

## [1.0.0] — 2026-04-26

> Build sequence note : 0.1.0 = scaffold (T6.A.1 commit `c4ddcfe`), 1.0.0 = full implementation (T6.A.2-5 commit `86029f5`), same-day fast iteration session Day 51.

### Added
- Full implementation of the 5 MCP tools : `list_frameworks`, `get_framework`, `apply_framework`, `suggest_framework`, `compose_workflow`.
- Complete bilingual data layer for the 16 canonical frameworks (Design Thinking, Lean Startup, SWOT, OKR, MECE, First Principles, 5 Whys, Eisenhower, RACI, OODA, BCG Matrix, Porter 5 Forces, Pareto, Hofstede, Cynefin, McKinsey 7S) — each with `name/name_fr`, `one_line/one_line_fr`, `description/description_fr`, canvas sections (EN+FR prompts), `steps/steps_fr`, and seed examples.
- Bilingual error catalog (`src/i18n/{en,fr}.json`) wired through `lib/i18n.ts` and `lib/errors.ts` (typed `FrameworksError` with code + locale + payload data).
- Stdio transport wiring via `@modelcontextprotocol/sdk` ; lazy import keeps unit tests SDK-agnostic.
- Structured JSON logger writing to stderr (Critical Rule #6 : no stack-trace leak, opt-in debug mode via `DEBUG=vantage-frameworks:*`).
- Vitest configuration with v8 coverage and 80 % thresholds on lines / branches / functions / statements.
- 29 unit + integration tests, including the 15-case minimum from spec §7 (3 cases per tool, FR + EN happy paths, edge cases, validation failures).
- `evals/evals.json` (15 cases) + `scripts/run-evals.js` runner exposed as `npm run evals`.

### Changed
- `package.json` and `mcp.json` bumped to `1.0.0` (parity).
- TypeScript build target cleaned up : `tsc` produces ESM in `dist/` consumed by the npx binary.

### Pending (post-build)
- T7 — `mcp-spec-reviewer` audit (10 Critical Rules + Doctrine Flexibilité 5/5).
- T8 — Multi-channel publish (npm + GitHub Release + claudemarketplaces.com + VantageRegistry).

## [0.1.0] — 2026-04-26

### Added
- Initial scaffold (T6.A.1) per `mcp-server-v1` template v1.3.0.
- Repository structure (`src/`, `tests/`, `evals/`, `docs/`, `examples/`, `scripts/`).
- 5 tool stubs : `list_frameworks`, `get_framework`, `apply_framework`, `suggest_framework`, `compose_workflow` (handlers throw `NotImplemented` — implementation in T6.A.3).
- Bilingual descriptions (EN + FR) on package, MCP manifest, and each tool.
- 16 framework IDs declared in `src/schemas/index.ts` (`FRAMEWORK_ID` Zod enum).
- Placeholder data layer for 16 frameworks in `src/data/frameworks.ts` (real content in T6.A.3).
- i18n key files (`src/i18n/en.json`, `src/i18n/fr.json`) — empty placeholder values.
- Bilingual READMEs (`README.md` EN canonical, `README.fr.md`).
- MIT license (year 2026, holder ElPi Corp / Laurent Perello).
- Examples for Claude Desktop and Cursor configurations.

[1.0.2]: https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v1.0.2
[1.0.1]: https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v1.0.1
[1.0.0]: https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v1.0.0
[0.1.0]: https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v0.1.0
