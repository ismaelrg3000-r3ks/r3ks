#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/ubuntu/.openclaw/workspace"
LOG="${WORKSPACE}/logs/mc_health.log"
mkdir -p "${WORKSPACE}/logs"
{
  echo "--- $(date -u +%Y-%m-%dT%H:%M:%SZ) ---"
  openclaw healthcheck
} >> "$LOG" 2>&1
