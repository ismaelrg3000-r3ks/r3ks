#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/ubuntu/.openclaw/workspace"
cd "$WORKSPACE"
if git status --porcelain | grep -q .; then
  git add .
  git commit -m "Nightly Mission Control update: auto-committed logs and working files" || true
  git push origin main || true
else
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) - Nothing to commit" >> "$WORKSPACE/logs/mc_nightly_push.log"
fi
