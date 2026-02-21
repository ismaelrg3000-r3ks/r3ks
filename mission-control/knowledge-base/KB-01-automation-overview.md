# KB-01 — Automation & Task Signal Inventory

## Purpose
Document the main signals triggering Mission Control workflows so the agents understand when to launch automation or research tasks.

### Key Signals
1. **Convex backlog tags**: `mission-control`, `handoff`, `automation`, `clarity`. When a task appears without an owner, r3ks assigns the relevant agent for review.
2. **Cron reminders**: hourly `mission-control-hourly-sync`, daily agent-specific jobs (hint, torv, rams). Each run surfaces new artifacts or blockers. The reminder text is recorded in `/cron/...` logs.
3. **Infrastructure monitoring**: Any instrumentation log exported via `torv` (wallet, cron health). Publish findings in `/mission-control/artifacts/` once available.

### Actionables
- Agents should confirm the signal source inside their report (e.g., “Triggered by hourly cron #...” or “New Convex activity `mission-backlog`”).
- When a signal produces a new artifact, document it here with owner, format, frequency, and storage location.

_Last updated: 2026-02-20 14:35 UTC — owner: r3ks._