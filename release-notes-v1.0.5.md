# vantage-frameworks v1.0.5 — input duplication fix + smoke gate

Cumulative patch:

- **Bug #3 fix** — removed silent truncation of `problem` input duplicated inside `apply_framework.analysis[].insight`. The full problem is preserved at `result.problem` top-level; sub-section insights now contain pure prompts. `compose_workflow` audited (clean: step-1 `input` intentionally stores the full problem, no truncation).
- **Boot smoke test gate** — pre-publish hook (`prepublishOnly`) now runs `scripts/smoke-test-boot.sh` to verify `node dist/index.js` responds to MCP `initialize` handshake before npm publish proceeds. Lesson #11 fleet-wide capture (Day 51 v1.0.4 broken-publish incident).
- **Hard-gate test** — `tests/unit/no-input-duplication.test.ts` (3 cases EN/FR + compose_workflow) to prevent bug #3 regression.

See [v1.0.0 release notes](https://github.com/elpiarthera/vantage-frameworks-mcp/releases/tag/v1.0.0) for full feature list.

## Install

```bash
npx -y @vantageos/mcp-frameworks
```
