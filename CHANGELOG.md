# Changelog

All notable changes to `@vantage/mcp-frameworks` are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [SemVer](https://semver.org/).

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

### Pending (deferred to next sub-tasks)
- T6.A.2 — TDD tests-first (15 cases per spec §7).
- T6.A.3 — Real framework data + tool handlers.
- T6.A.4 — stdio transport wiring + integration tests.
- T6.A.5 — Eval suite (≥3/tool) + coverage 80% gate.

[0.1.0]: https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v0.1.0
