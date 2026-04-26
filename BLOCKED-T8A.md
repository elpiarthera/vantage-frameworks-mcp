# BLOCKED-T8A — npm publish

**Date** : 2026-04-26
**Phase** : T8.A.4 (npm publish)
**Status** : BLOCKED

## Error

```
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/@vantage%2fmcp-frameworks
npm error 404 '@vantage/mcp-frameworks@1.0.0' is not in this registry.
```

Logged in as : `elpivantage`.

Cross-check : `npm org ls vantage` returns `403 Forbidden` — `elpivantage` is **not** a member of the `@vantage` npm org. The 404 on PUT is npm's standard masked-403 response when the account lacks publish rights on a scope.

## Suggested unblock (Pi to decide)

1. **Transfer scope** : Pi (current `@vantage` owner, if any) adds `elpivantage` as a publisher to the `@vantage` org via `npm org set vantage elpivantage developer`.
2. **Claim scope** : if `@vantage` is unowned, create the org (`npm org create vantage`) under the account that should own it, then add `elpivantage` as developer.
3. **Alternative scope** : re-publish under `@elpivantage/mcp-frameworks` or `@elpi/mcp-frameworks` (would require `package.json` rename + republish under v1.0.0 since not yet on registry).

## Recommendation

Option 1 if `@vantage` is already an ElPi-controlled npm org. Option 2 if the org does not yet exist (preferred long-term — `@vantage/*` is the canonical scope per BU MCP strategy). Option 3 only as last resort.

GitHub release + tag + repo are LIVE under `elpiarthera/vantage-frameworks-mcp`. Once npm scope unblocked, run `npm publish --access public` from this repo at the v1.0.0 tag — no other change needed.

---

Built by: mcp-publisher (via gamma) | bu-mcp BU | 2026-04-26
