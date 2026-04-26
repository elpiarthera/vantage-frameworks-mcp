# @vantageos/mcp-frameworks

MCP server exposing 16 canonical thinking frameworks for AI agents and humans. Bilingual FR+EN by design.

> Version: 1.0.2 — GA (2026-04-26)
> Sellable as: `vantage-frameworks-mcp` (claudemarketplaces.com listing) + npm `@vantageos/mcp-frameworks`

## About

Most AI agents think in paragraphs. This server makes them think in frameworks.

`@vantageos/mcp-frameworks` gives any MCP-compatible agent access to 16 canonical thinking frameworks — Design Thinking, Lean Startup, SWOT, OKR, MECE, First Principles, 5 Whys, Eisenhower Matrix, RACI, OODA, BCG Matrix, Porter 5 Forces, Pareto 80/20, Hofstede, Cynefin, McKinsey 7S — with full bilingual FR+EN support from day one.

### What it does

Five tools, each with a clear job:

| Tool | What you get |
|---|---|
| `list_frameworks` | All 16 frameworks with one-line descriptions, filterable by category (`strategy`, `innovation`, `decision`, `communication`). |
| `get_framework` | Full canvas, structured steps, application prompts, and seed examples for a specific framework. |
| `apply_framework` | Pass a real problem. Get back a section-by-section structured analysis with a recommendation and caveats. |
| `suggest_framework` | Describe your context and goal (`analyze`, `decide`, `plan`, `communicate`, `innovate`). Get the top 1-3 framework matches with scored rationale. |
| `compose_workflow` | Chain 2-3 frameworks into a sequenced workflow — e.g., 5 Whys → Eisenhower → OKR — applied to a single problem. |

### Who it is for

- Developers building AI agents that reason about strategy, decisions, or architecture
- Product managers and consultants who want structured outputs instead of freeform summaries
- French-speaking Claude Code users — the first FR-native MCP server in this space

### Why this, not a plain prompt

A prompt gives you a framework name. This server gives you the canvas, the steps, the locale-switched prompts, and the chaining logic — structured, validated, and reproducible across sessions.

### Quick Start

```bash
npx -y @vantageos/mcp-frameworks
```

Add to `mcp.json`:

```json
{
  "mcpServers": {
    "vantage-frameworks": {
      "command": "npx",
      "args": ["-y", "@vantageos/mcp-frameworks"]
    }
  }
}
```

No API key. No account. Restart your MCP client and ask: "What frameworks do you have for deciding between two product paths?"

### Examples

**Strategy:** Ask `apply_framework` with `framework_id: "swot"` and your company situation. Get a section-by-section SWOT with a prioritized recommendation.

**Root cause:** Pass a production incident description to `apply_framework` with `framework_id: "5-whys"`. Get five iterative cause levels and a corrective action.

**Chained reasoning:** Use `compose_workflow` with `["5-whys", "eisenhower", "okr"]` on an organizational bottleneck. Get a three-step sequenced output: root cause → priority sort → goal setting.

### Doctrine Flexibilité — Phase 1 / Phase 2

Phase 1 (current): stdio transport, local install, no API key, no remote server.
Phase 2 (planned): HTTP transport for remote deployments + Pro tier workspace scoping. Auth via Polar.sh. Timeline: Q3 2026.

---

MIT License — Author: ElPi Corp / Laurent Perello — Source: [github.com/elpiarthera/vantage-frameworks-mcp](https://github.com/elpiarthera/vantage-frameworks-mcp)

## Installation

```bash
npx -y @vantageos/mcp-frameworks
```

## Configuration

### Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "vantage-frameworks": {
      "command": "npx",
      "args": ["-y", "@vantageos/mcp-frameworks"]
    }
  }
}
```

### Cursor

See `examples/cursor.json`.

## Tools

| Name | Description |
|---|---|
| `list_frameworks` | List all 16 frameworks with one-line descriptions, optional category filter. |
| `get_framework` | Get full canvas, steps, and prompts for a specific framework. |
| `apply_framework` | Apply a framework to a user-provided problem and return structured analysis. |
| `suggest_framework` | Recommend the best 1-3 frameworks given a context and goal. |
| `compose_workflow` | Chain 2-3 frameworks into a sequenced workflow on a single problem. |

### Catalog (16 frameworks)

`design-thinking`, `lean-startup`, `swot`, `okr`, `mece`, `first-principles`, `5-whys`, `eisenhower`, `raci`, `ooda`, `bcg-matrix`, `porter-5-forces`, `pareto`, `hofstede`, `cynefin`, `mckinsey-7s`.

## Examples

See `examples/` directory.

## Authentication

None. Public local MCP server (stdio). No API key required.

## Troubleshooting

1. **Server doesn't start** — verify Node >= 20 (`node --version`).
2. **Tool not discovered** — restart your MCP client after editing config.
3. **Invalid framework id** — check the catalog above (16 IDs, kebab-case).
4. **Locale not switching** — pass `locale: "fr"` explicitly in tool inputs.
5. **Need French docs** — see `README.fr.md`.

## License & Attribution

Author : ElPi Corp / Laurent Perello
License : MIT
Source : https://github.com/elpiarthera/vantage-frameworks-mcp
