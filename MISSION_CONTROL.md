# Mission Control Doctrine

## Purpose
Turn this workspace into the Tycoon Command Cockpit: a single, trusted surface where agents coordinate, dashboards stay fresh, and every mission has a clear owner. Mission Control keeps rhythm through Momentum Sprints, Tycoon Command Boards, and the Mission Control narrative so the operation never loses sight of guardrails or KPIs.

## Core Rituals
- **15-minute loop:** Every cycle gets recorded in `mission-control/15min-log.md` (owner, update, blockers, next steps). This keeps the tempo sharp and lets the squad realign quickly.
- **Review flow:** Major deliverables route through TORV → RAMS → R3KS templates, documented in mission review files (e.g., `missions/tycoon-mvp/review-request.md`). Every path closes with accountability so decisions stay auditable.
- **Dashboard cadence:** After each sprint we refresh the dashboard data structures and the lightweight summary (Notion/Discord friendly) so the command center can render cards for agent health, blockers, and progress.
- **Tycoon narratives:** Momentum Sprint (execution), Mission Control (coordination), Tycoon Command Board (visibility). Refer to these phrases when describing progress or reconfiguring dashboards.

## Tools & Data
- Keep mission state in `missions/` with briefs, playbooks, dashboards, and review requests.
- Track agent health and dashboards under `status/` so migration to Discord embeds stays synchronized with Notion/Convex visuals.
- Use `templates/` for TORV/RAMS/R3KS snapshots, review skeletons, and dashboard embed wires. These templates keep reports consistent across mediums.

## Collaboration Protocol
1. Lock in the mission (e.g., `tycoon-mvp`) by creating brief, playbook, and dashboard artifacts inside `missions/`.
2. Log every 15-minute beat and immediately surface blockers/next steps to `mission-control/15min-log.md`.
3. Update status data structures (`status/agent-health.md`, `status/dashboard-data.md`) after wrapping each sprint so dashboards stay ready for Discord embeds.
4. When migrating to Discord, route reports through the command board (this doc + `status/` files) and schedule notifications via cron or Discord slash commands, ensuring the runway is documented for Ismael.
