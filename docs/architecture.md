# Architecture — L3

> Placeholder L3 documentation. Detailed internals + extension points populated in T6.A.3 / T6.A.4.

## Layers

```
src/
├── index.ts           # entry — boot stdio transport
├── server.ts          # createServer() — registers 5 tools
├── tools/             # 1 file per tool (handler + schemas wiring)
├── schemas/           # FRAMEWORK_ID enum + shared Zod schemas
├── data/              # frameworks.ts — 16 framework objects
├── i18n/              # en.json + fr.json (localised error keys)
└── lib/               # logger, future helpers
```

## Doctrine Flexibilité 5/5 (per spec §8)

1. **MCP-first** — pure MCP server, stdio standard transport. No proprietary protocol layer.
2. **Abstraction fonctionnelle** — tools exposed as verb-imperative actions, decoupled from any specific LLM implementation.
3. **Migration-ready** — alternative transport documented : a thin REST API on the same `src/data/` + `src/tools/` layer is achievable in 1-2 person-days.
4. **Composabilité VantagePeers-native** — registered via `register_component` (category=mcp-server) at publish time. The frameworks data layer is extractable as a standalone package (`@vantage/frameworks-data`) for reuse by other BUs.
5. **Parallélisable** — 5 tools are independent ; TDD build can be parallelised across tools without coupling.

## Extension points (post-v0.1)

- HTTP transport (Phase 2) — drop-in beside stdio.
- ALLOWED_ROLES env-var auth (Phase 2) — placeholder TODO in `src/lib/auth.ts` once added.
- Custom framework injection — exposed via `register_framework` resource (post-v1.0).
