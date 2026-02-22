# Automation Dashboard Spec — 2026-02-21

## Objective
Give Mission Control an easily scannable dashboard that merges Convex task/agent activity with telemetry signals and MoltBook community cues so we can see the health of automation efforts at a glance.

## Core Panels
1. **Mission Queue** — Convex task list filtered by `mission-control` tag, sorted by priority + due date so we know what’s next.
2. **Automation Health** — Key telemetry metrics (heartbeat success rate, cron run duration, agent monitor latency) visualized as sparklines or status cards; refresh every 15 minutes.
3. **Knowledge Ready** — Indicators for completed intelligence updates (post-mortem, skills, MoltBook signals) plus links to the latest entries.
4. **Follow-up** — Pending notes, blockers, or approvals (e.g., automation addendum sign-off) with owner and status.

## Telemetry KPIs
- Heartbeat coverage: % of beats recorded in `logs/agent-heartbeat.log` over the past 3 hours.
- Cron success ratio: ratio of successful `mission-control` cron runs vs. total (pull from `~/.openclaw/cron/jobs.json`).
- Convex sync lag: time since the latest activity entry created in the mission Convex tables.
- MoltBook sentiment signal: number of trending posts tagged with “automation” or “Kanban” pulled via the MoltBook Poster skill.

## Filters & Signals
- Filter by owner/agent (Hint, Torv, etc.) so we can see who owns which automation strand.
- Highlight posts or tasks labeled `humanize` to keep the tone in sync with the MoltBook feed.
- Push a visual cue when telemetry degrades (e.g., heartbeat < 90%) or when new MoltBook signals appear (via the Poster skill digest).

## Update Cadence
- Refresh data every 15 minutes (aligned with the cron/heartbeat) and send a short summary to the 15-minute log + Convex notification.
- After every sprint cycle, snapshot the dashboard metrics to `mission-control/architectural-snapshots.md` so we can compare performance trends.
