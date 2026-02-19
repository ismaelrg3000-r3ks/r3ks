#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/ubuntu/.openclaw/workspace"
LOG_FILE="${WORKSPACE}/logs/mc_r3ks_monitor.log"
mkdir -p "${WORKSPACE}/logs"
{
  echo "--- $(date -u +%Y-%m-%dT%H:%M:%SZ) ---"
  openclaw agent --agent main --message "Mission Control status check: summarize the backlog, note blockers, and confirm next actions." --json
} >> "$LOG_FILE" 2>&1
