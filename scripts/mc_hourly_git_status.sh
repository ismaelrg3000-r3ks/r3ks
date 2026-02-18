#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/ubuntu/.openclaw/workspace"
LOG="${WORKSPACE}/logs/mc_git_status.log"
mkdir -p "${WORKSPACE}/logs"
{
  echo "--- $(date -u +%Y-%m-%dT%H:%M:%SZ) ---"
  git -C "${WORKSPACE}" status -sb
} >> "$LOG"
