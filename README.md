# @vantage/mcp-frameworks

MCP server exposing 16 canonical thinking frameworks for AI agents and humans. Bilingual FR+EN by design.

> Version: 1.0.0 — GA (2026-04-26)
> Sellable as: `vantage-frameworks-mcp` (claudemarketplaces.com listing) + npm `@vantage/mcp-frameworks`

## Installation

```bash
npx -y @vantage/mcp-frameworks
```

## Configuration

### Claude Desktop / Claude Code

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
