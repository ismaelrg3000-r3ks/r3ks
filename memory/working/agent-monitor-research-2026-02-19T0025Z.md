# Agent Activation & Monitoring Research — 2026-02-19T00:25:00Z UTC

## Objective
Continue investigating how to keep the Mission Control squad active, visible, and monitorable, with an eye toward mobile dashboards/Notion + cron-based activation hooks.

## Sources Consulted
- `mission-control/README.md` (workspace) for the Convex schema, seeded agents, and instructions to rerun the local dev server + seeds.
- `scripts/` (mc_healthcheck, mc_task_gap_check) for existing cron-style helpers and how they log activity into `logs/` and `memory/working/`.
- External dashboards: GitHub repos `abhi1693/openclaw-mission-control`, `manish-raana/openclaw-mission-control`, `crshdn/mission-control`; `Cronitor`, `Healthchecks.io`, and the idea of using Notion + API updates.

## Findings
1. **Mission Control data model**—Convex tables cover `agents`, `tasks`, `messages`, `activities`, `documents`, `notifications`. Existing scripts seed agents and log health/housekeeping, so running `npx convex dev` + `seed`/`seedAgents` keeps the roster populated and ready for inspection.
2. **Local cron-style helpers**—`mc_healthcheck.sh`, `mc_hourly_git_status.sh`, and `mc_task_gap_check.py` already log diagnostics and gaps into `logs/` and `/memory/working/`. They form the basis of activation/monitoring (could be scheduled with cron or openclaw cron jobs).
3. **Hosted monitoring services**—Cronitor/Healthchecks.io already offer mobile-friendly dashboards for cron/heartbeat visibility; we could forward agent heartbeats or script exits to them via simple HTTP pings, and they can send alerts/pushes when anything misses its window.
4. **Open-source dashboards**—The GitHub mission-control projects show how to stream OpenClaw lifecycle events into a Convex-backed UI (hook handler, websockets, etc.). Steps include copying `~/.openclaw/hooks/mission-control`, setting up webhook URLs, and letting the dashboard subscribe to those events. This gives a command-center view plus mobile-friendly responsive design.
5. **Notion integration**—With the team space API already configured, we can mirror agent/cron summaries there (databases for agent status + timeline). A scheduled script or OpenClaw cron can push updates via Notion’s API.

## Next Steps
- Confirm which convective data endpoints (Convex queries or logs) provide agent heartbeat/status info; build a small API that the dashboard/Notion sync job can poll.
- Blueprint the mobile view you want (agent summary + cron timeline + alert feed); decide on hosted service vs. custom Notion/Next.js approach.
- Consider wiring existing helper scripts or OpenClaw cron jobs so that they emit webhooks/HTTP pings (for hosted monitors) and update Notion.

If it helps, I can prototype the Notion database structure or start wiring a simple Next.js dashboard that consumes the same data.
