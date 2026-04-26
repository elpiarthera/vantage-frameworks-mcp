# vantage-frameworks v1.0.0 — 16 thinking frameworks for AI agents

First GA release of `@vantage/mcp-frameworks`, a bilingual FR+EN MCP server exposing 16 canonical thinking frameworks as composable tools for AI agents and humans.

## Highlights

- **5 MCP tools** wired to the official MCP SDK (stdio transport).
- **16 canonical frameworks** with complete bilingual data (canvas, steps, prompts, seed examples).
- **Bilingual FR+EN by design** — every tool description, error message, and framework payload ships in both languages.
- **29 unit + integration tests**, 99.29% coverage, 15/15 evals passing.
- **Spec-reviewer APPROVED** (10 Critical Rules + Doctrine Flexibilité 5/5).
- **MIT license**, free, public, no API key.

## 5 Tools

| Tool | Description |
|---|---|
| `list_frameworks` | List all 16 frameworks with one-line descriptions, optional category filter. |
| `get_framework` | Get full canvas, steps, and prompts for a specific framework. |
| `apply_framework` | Apply a framework to a user-provided problem and return structured analysis. |
| `suggest_framework` | Recommend the best 1-3 frameworks given a context and goal. |
| `compose_workflow` | Chain 2-3 frameworks into a sequenced workflow on a single problem. |

## 16 Frameworks

Design Thinking · Lean Startup · SWOT · OKR · MECE · First Principles · 5 Whys · Eisenhower · RACI · OODA · BCG Matrix · Porter 5 Forces · Pareto · Hofstede · Cynefin · McKinsey 7S.

## Bilingual

All framework payloads include `name/name_fr`, `one_line/one_line_fr`, `description/description_fr`, canvas sections (EN+FR prompts), `steps/steps_fr`, and seed examples. Locale toggle via `locale: "en" | "fr"` on every tool input.

## Install

```bash
npx -y @vantage/mcp-frameworks
```

Claude Desktop / Claude Code config:

```json
{
  "mcpServers": {
    "vantage-frameworks": {
      "command": "npx",
      "args": ["-y", "@vantage/mcp-frameworks"]
    }
  }
}
```

See `examples/cursor.json` for Cursor.

## Standards compliance

- MCP spec **2025-06-18** (server side).
- ElPi Corp `mcp-standard.md` v1 — **10/10 Critical Rules** validated.
- Doctrine Flexibilité **5/5** : MCP-first · abstraction fonctionnelle · migration-ready · composabilité VantagePeers-native · parallélisable.
- Structured JSON logger to stderr (Critical Rule #6 — no stack-trace leak, opt-in `DEBUG=vantage-frameworks:*`).
- Zod schemas on every tool input/output.

## Links

- npm : https://www.npmjs.com/package/@vantage/mcp-frameworks
- Source : https://github.com/elpiarthera/vantage-frameworks-mcp
- Changelog : [`CHANGELOG.md`](./CHANGELOG.md)

---

Orchestrator: Gamma — VantageOS Team | 2026-04-26
