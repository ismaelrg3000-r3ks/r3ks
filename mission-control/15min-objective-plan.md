# Mission Control 15-Minute Cadence Plan

## Objective
Deliver the Mission Control interactive dashboard + docs experience by systematically activating the Agile 15-minute cycle across the workspace, using only the canonical channels (WORKING.md, Convex `activities`/`tasks`/`messages`/`notifications`, and the mission notes). Each cycle must (1) select the current deliverable, (2) evaluate the remaining work, (3) assign or execute a task, (4) report progress, and (5) log any blockers or pivots.

## Today’s Primary Deliverable
- **Kanban Task Board prototype** that reflects the Mission Control backlog and is visible via Convex (tasks table) and the upcoming dashboard panel.

## Cadence Steps (every 15 minutes between 09:00–17:00 UTC)
1. **Select & Define (minutes 0–5)**: Choose the immediate micro-goal (e.g., map `tasks` backlog to Kanban columns, or add a new `activity` entry summarizing the board). Capture context in `WORKING.md` (main session) and post an update to `messages` or `notifications` if needed.
2. **Plan Actions (minutes 5–7)**: Break the micro-goal into 1–2 tasks that fit 10 minutes. Use the `tasks` table for actionable items (create/update a row) and link to `activities` for decision logs.
3. **Execute/Delegate (minutes 7–12)**: Either run the work yourself (modify dashboard MD, update SQL query) or assign it to an agent (e.g., torv tweaks board layout, Kami writes copy). Record assignment/updates in `tasks` and trigger a `message` for visibility.
4. **Report & Log (minutes 12–14)**: Write a short update in `WORKING.md` and log the event in Convex `activities` or `notifications`, noting progress, blockers, and next steps.
5. **Break & Iterate (minutes 14–15)**: Pause, sync with the 15min loop note, and readjust the next chunk (possibly escalate to r3ks for orchestration).

Repeat until 17:00 UTC. Every cycle’s output should feed the "Agents, Kanban, Live Feed, Time, Progress" view you outlined. Keep the `mission-control/deliverables-checklist.md` updated so the progress bar matches reality.

## Log & Governance
- Use `mission-control/15min-log.md` (append-only) to capture time-stamped notes for every 15-minute cycle. Format: `HH:MM UTC | Owner | Task/Update | Blockers/Next Steps`

- When a cycle uncovers a problem, create an `activities` entry tagged `triage` and log the fix plan in `tasks`/`messages`.
- Treat the 17:00 UTC cycle as the final report: summarize the day’s progress, highlight blockers, and schedule follow-ups.

## High-Frequency Tasks (today’s priority)
1. **Skill catalog expansion** — follow the `mission-control/skill-learning-plan.md` roadmap: log each SKILL.md draft, Convex metadata update, and telemetry helper design as a distinct 15-minute beat. Every skill task must jot down which canonical file(s) it touched (e.g., `mission-control/skills/`, `mission-control/deliverables-checklist.md`, `mission-control/architecture-reference.md`). Hint/Torv lead the drafting; Rams/Kami refine the experience/communication tone.
2. **CEO/business course learning** — allocate a pulse for the chosen mini-module (MIT Communication for Managers, HBS entrepreneurship, etc.), summarize the takeaway in `mission-control/business-learning.md`, and note how the insight applies to Mission Control’s narrative. Log every beat in the 15-minute log with the `skills` label and mention the canonical doc you referenced.
3. **Architecture check-in** — before executing any new change, compare it to `mission-control/architecture-reference.md` in the same beat. If your work deviates, note it in the log and update the architecture doc so the blueprint stays current.

## Next Steps for Agents
- Hint: Pull the latest `tasks` rows, surface gaps in the Kanban board, and log insights in `activity` entries. Aim to update `notifications` when a new signal is logged.
- Torv: Iterate the Kanban layout (colors/columns) and capture the schema in `WORKING.md`; create a Convex `task` row describing the remaining engineering work.
- Rams: Audit the "Live Feed" narrative; use `messages` to broadcast the real-time updates generated during each cycle.
- Kami: Draft the copy that explains how the 15-minute loop feeds the dashboard; log it under `memory/working/kami-<timestamp>.md` and note it in `activities` for the summary feed.

Remember: every cycle is short but intentional—no extra files, no redundant updates. Keep flow tight, log outcomes, and respect the 15-minute beat.
