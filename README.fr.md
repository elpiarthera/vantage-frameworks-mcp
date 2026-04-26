# @vantageos/mcp-frameworks

Serveur MCP exposant 16 frameworks de pensée canoniques pour agents IA et humains. Bilingue FR+EN par design.

> Version : 1.0.2 — GA (2026-04-26)
> Vendable sous : `vantage-frameworks-mcp` (listing claudemarketplaces.com) + npm `@vantageos/mcp-frameworks`

## À propos

La plupart des agents IA pensent en paragraphes. Ce serveur leur apprend à penser en frameworks.

`@vantageos/mcp-frameworks` donne à tout agent compatible MCP accès à 16 frameworks de pensée canoniques — Design Thinking, Lean Startup, SWOT, OKR, MECE, First Principles, 5 Pourquoi, Matrice Eisenhower, RACI, OODA, Matrice BCG, Forces de Porter, Pareto 80/20, Hofstede, Cynefin, McKinsey 7S — avec un support bilingue FR+EN complet dès le premier jour.

### Ce qu'il fait

Cinq outils, chacun avec un périmètre clair :

| Outil | Ce que vous obtenez |
|---|---|
| `list_frameworks` | Les 16 frameworks avec une description en une ligne, filtrables par catégorie (`strategy`, `innovation`, `decision`, `communication`). |
| `get_framework` | Canvas complet, étapes structurées, prompts d'application et exemples pour un framework spécifique. |
| `apply_framework` | Décrivez un problème réel. Obtenez une analyse section par section avec recommandation et mises en garde. |
| `suggest_framework` | Décrivez votre contexte et votre objectif (`analyze`, `decide`, `plan`, `communicate`, `innovate`). Obtenez les 1 à 3 meilleurs frameworks avec score et justification. |
| `compose_workflow` | Enchaînez 2-3 frameworks en un workflow séquencé — ex. 5 Pourquoi → Eisenhower → OKR — appliqué à un seul problème. |

### Pour qui

- Développeurs qui construisent des agents IA raisonnant sur la stratégie, les décisions ou l'architecture
- Product managers et consultants qui veulent des sorties structurées plutôt que des résumés génériques
- Utilisateurs Claude Code francophones — premier serveur MCP nativement FR sur ce segment

### Pourquoi ce serveur plutôt qu'un simple prompt

Un prompt vous donne un nom de framework. Ce serveur vous donne le canvas, les étapes, les prompts localisés et la logique d'enchaînement — structurés, validés et reproductibles d'une session à l'autre.

### Démarrage rapide

```bash
npx -y @vantageos/mcp-frameworks
```

Ajoutez dans `mcp.json` :

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

Pas de clé API. Pas de compte. Redémarrez votre client MCP et demandez : "Quels frameworks as-tu pour choisir entre deux orientations produit ?"

### Exemples

**Stratégie :** Appelez `apply_framework` avec `framework_id: "swot"` et la situation de votre entreprise. Obtenez un SWOT section par section avec recommandation priorisée.

**Cause racine :** Passez la description d'un incident en production à `apply_framework` avec `framework_id: "5-whys"`. Obtenez cinq niveaux de causes itératives et une action corrective.

**Raisonnement enchaîné :** Utilisez `compose_workflow` avec `["5-whys", "eisenhower", "okr"]` sur un goulot d'étranglement organisationnel. Obtenez une sortie en trois étapes séquencées : cause racine → tri par priorité → définition d'objectifs.

### Doctrine Flexibilité — Phase 1 / Phase 2

Phase 1 (actuelle) : transport stdio, installation locale, pas de clé API, pas de serveur distant.
Phase 2 (prévue) : transport HTTP pour déploiements distants + tier Pro avec scoping workspace. Auth via Polar.sh. Calendrier : T3 2026.

---

Licence MIT — Auteur : ElPi Corp / Laurent Perello — Source : [github.com/elpiarthera/vantage-frameworks-mcp](https://github.com/elpiarthera/vantage-frameworks-mcp)

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
