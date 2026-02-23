# Tycoon MVP Playbook

## Roles
- **r3ks (field agent)** — Orchestrates momentum, approves TORV/RAMS/R3KS review outputs, keeps dashboards/status files fresh, and reports to Ismael.
- **hint (researcher)** — Feeds context, pulls telemetry, and tracks market signal when asked.
- **torv (execution)** — Automates cron/dashboard work once the playbook clarifies requirements.
- **rams (architecture/data)** — Builds data views, links Convex tables, and ensures dashboards reflect real-time agent health.
- **kami (design copy)** — Crafts narratives for the Momentum Sprint, Mission Control, and Tycoon Command Board presentation layers.

## Cadence
1. **15-minute loop:** Log updates in `mission-control/15min-log.md` with owner, update, blockers, and next steps.
2. **Sprint check-in (every 60 min):** Refresh `status/agent-health.md`, `status/dashboard-data.md`, and `missions/tycoon-mvp/dashboard-summary.md`.
3. **Review flow:** For every major update route through templates (`templates/torv-report.md`, `templates/rams-strategic-review.md`, `templates/dashboard-embed.md`) and note approvals in `missions/tycoon-mvp/review-request.md`.
4. **Discord migration prep:** Draft channel structures and slash commands, document embed specs, and plan how updates land in Discord threads.

## Dashboard Cards
- **Tycoon Command Board (high level):** shows mission, phase, KPIs, sprint progress, and cross-agent health.
- **Momentum Sprint card:** tracks what shipped during the current sprint (docs created, dashboards updated, review requests triggered).
- **Mission Control card:** surface blockages (pending info, missing files, outstanding decisions) and next actions.
- **Agent health card:** derived from `status/agent-health.md` with statuses and readiness notes.

## Discord Channels (migration plan)
1. `#tycoon-command-board` — Dashboard embed updates; each summary becomes its own pinned message or thread.
2. `#tycoon-momentum-sprint` — 15-minute loop highlights, blockers, and next steps.
3. `#tycoon-ops` — CRON/Convex/automation updates, including slash command triggers.
4. `#tycoon-mentor` — For Ismael and the consultant bridge to ask clarifying questions or get coaching.

Slash command ideas:
- `/tycoon status` → Posts the latest dashboard embed.
- `/tycoon blockers` → Lists current blockers from `status/dashboard-data.md`.
- `/tycoon next` → Outputs the next three recommended actions for the sprint.

## Discord Reporting Notes
- Embed each summary using the Notion/Discord format in `templates/dashboard-embed.md`.
- Use threads per sprint so Ismael can follow the momentum without cluttering Telegram.
- Convert TORV/RAMS/R3KS reports into pinned Discord notes for each mission deliverable.
