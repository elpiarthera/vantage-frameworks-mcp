# @vantageos/mcp-frameworks

Serveur MCP exposant 16 frameworks de pensée canoniques pour agents IA et humains. Bilingue FR+EN par design.

> Version : 1.0.0 — GA (2026-04-26)
> Vendable sous : `vantage-frameworks-mcp` (listing claudemarketplaces.com) + npm `@vantageos/mcp-frameworks`

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

Voir `examples/cursor.json`.

## Tools

| Nom | Description |
|---|---|
| `list_frameworks` | Liste les 16 frameworks avec une description en une ligne, filtre par catégorie optionnel. |
| `get_framework` | Récupère le canvas complet, les étapes et les prompts d'un framework spécifique. |
| `apply_framework` | Applique un framework à un problème fourni et retourne l'analyse structurée. |
| `suggest_framework` | Recommande les 1 à 3 meilleurs frameworks pour un contexte et un objectif donnés. |
| `compose_workflow` | Enchaîne 2-3 frameworks en un workflow séquencé sur un seul problème. |

### Catalogue (16 frameworks)

`design-thinking`, `lean-startup`, `swot`, `okr`, `mece`, `first-principles`, `5-whys`, `eisenhower`, `raci`, `ooda`, `bcg-matrix`, `porter-5-forces`, `pareto`, `hofstede`, `cynefin`, `mckinsey-7s`.

## Exemples

Voir le dossier `examples/`.

## Authentification

Aucune. Serveur MCP local public (stdio). Pas de clé API requise.

## Dépannage

1. **Le serveur ne démarre pas** — vérifier Node >= 20 (`node --version`).
2. **Tool non découvert** — redémarrer le client MCP après modification de la config.
3. **Framework id invalide** — vérifier le catalogue ci-dessus (16 IDs, kebab-case).
4. **Locale non prise en compte** — passer `locale: "fr"` explicitement dans les inputs.
5. **Doc EN** — voir `README.md`.

## Licence & Attribution

Auteur : ElPi Corp / Laurent Perello
Licence : MIT
Source : https://github.com/elpiarthera/vantage-frameworks-mcp
