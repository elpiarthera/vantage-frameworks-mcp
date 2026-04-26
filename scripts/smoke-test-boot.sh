#!/usr/bin/env bash
# Pre-publish boot smoke test gate (lesson #11 fleet-wide, Day 51 PM C v1.0.4 incident).
# Verifies `node dist/index.js` responds to MCP `initialize` handshake before publish proceeds.
set -e
SMOKE=$(echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke","version":"1.0"}}}' | timeout 5 node dist/index.js 2>&1)
if [[ "$SMOKE" != *'"protocolVersion"'* ]]; then
  echo "FATAL: server did not respond to initialize"
  echo "Output: $SMOKE"
  exit 1
fi
echo "Smoke test PASS — server responds to initialize"
