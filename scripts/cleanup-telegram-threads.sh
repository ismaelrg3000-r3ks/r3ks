#!/usr/bin/env python3
"""Prune idle Telegram thread sessions (keys containing ":thread:").
This keeps the UI tidy without touching the main session or agent-specific threads.
"""
from pathlib import Path
import json
import time

HOME = Path.home()
AGENT_SESSIONS_DIR = HOME / ".openclaw" / "agents" / "main" / "sessions"
SESSION_STORE = AGENT_SESSIONS_DIR / "sessions.json"
MAX_AGE_MS = 30 * 60 * 1000  # 30 minutes

if not SESSION_STORE.exists():
    print(f"session store missing: {SESSION_STORE}")
    raise SystemExit(1)

with open(SESSION_STORE, "r", encoding="utf-8") as f:
    try:
        sessions = json.load(f)
    except json.JSONDecodeError as err:
        print(f"failed to parse sessions.json: {err}")
        raise

now_ms = int(time.time() * 1000)
removed = 0
for key in list(sessions.keys()):
    if ":thread:" not in key:
        continue
    entry = sessions.get(key, {})
    updated_at = entry.get("updatedAt") or 0
    if now_ms - updated_at <= MAX_AGE_MS:
        continue
    session_file = entry.get("sessionFile")
    if session_file:
        path = Path(session_file)
        if path.exists():
            path.unlink(missing_ok=True)
    session_id = entry.get("sessionId")
    if session_id:
        for candidate in AGENT_SESSIONS_DIR.glob(f"{session_id}*" ):
            candidate.unlink(missing_ok=True)
    sessions.pop(key, None)
    removed += 1

if removed:
    with open(SESSION_STORE, "w", encoding="utf-8") as f:
        json.dump(sessions, f, indent=2)
    print(f"Pruned {removed} idle Telegram thread session(s).")
else:
    print("No Telegram thread sessions older than 30 minutes found.")
