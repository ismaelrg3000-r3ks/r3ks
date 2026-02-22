# Mission Control Deliverables & Expectations Checklist

## Objective
Translate heartbeat goals into explicit deliverables + customer expectations so every cron run clearly contributes to the ready-to-implement Mission Control dashboard + docs product.

## Deliverables Grid
| Deliverable | Owner | Heartbeat / Cron | Customer Value | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Dashboard roster/status view (agents + last heartbeat) | r3ks | hint/torv/rams | Shows ops lead who is active, what they’re tracking, and whether anything is degraded | Drafting | Aligns with "Agents" panel in ideal view |
| Kanban task board for mission-control activities | torv | torv daily | Customers get transparent view into blockers, assignments, and progress within the dashboard | In progress | Powered by `getKanbanBoard` (Convex query) + `scripts/kanban-gap-monitor.js` so gaps feed notifications |
| Live feed (logs, heartbeat entries, mission notes) | hint | hint 6h | Keeps stakeholders aware of recent signals + decisions, enabling better triage | Planned | Could auto-push from heartbeat metadata and `logs/agent-heartbeat.log` |
| Time + countdown indicator (UTC clock, next cron) | r3ks | cron visualization (generic) | Helps customers coordinate across teams and know when the next review/update happens | Pending | Combine with cron schedule note and live timers in the dashboard |
| Progress bar (product readiness) | kami/rams | kami daily / rams daily | Transparent progress toward launch makes the dashboard feel trustworthy, not just reactive | Pending | Build off deliverables checklist; update status field each heartbeat run |
| Mission Control launch guide (documentation + pitch) | kami | kami daily | Customers receive a ready-to-implement playbook describing the dashboard setup, roles, and KPIs | Pending | Pair narrative highlights to deliverable milestones |
| Telemetry schema & instrumentation helper | hint/torv | hint daily | Ensures every heartbeat/crons emits consistent signals for retrospectives & dashboards | Pending | Define `signal`, `agent`, `artifact`, `duration`, `status` fields and logging helper |
| Convex navigation map | rams | rams weekly | Guides the squad to the right tables first so the dashboard is the default entry point | Pending | Map `activities`, `notifications`, `tasks`, `documents`, `agents` to the Mission Control view |
| Skill catalog reference | hint | hint research | Makes skills discoverable so agents reuse best practices (phase 1‑4 breakdown) | Pending | Link SKILL.md artifacts to phases noted in memory/research files |
| Access/retention policy for Convex tables | r3ks | cron review | Establishes who can write/read + how long telemetry lives before wider exposure | Pending | Document roles/retention expectations before exposing cockpit |

## Customer Expectations (Hypotheses to Validate)
1. They expect a **single surface** where team status, planning, and operations converge (no jumping between tools). The ideal view you sketched (Agents / Kanban / Feed / Time / Progress) already addresses that.
2. They need **clarity on who owns what**—every heartbeat should log the owner + current focus so the dashboard can show it in the Agents panel.
3. They want **predictable updates**—chron jobs should surface measurable deliverables (task reviewed, narrative delivered) not just “heartbeat ok.”
4. They crave **actionable insights**—e.g., quick blockers, alert if an agent is degraded, or notes affecting the launch.
5. They value **a launchable guide** explaining how to install the dashboard, hook up Convex, and keep the automation running.

## Next Steps
1. Share this checklist with Kami, Rams, Torv, and Hint so they confirm what they’re delivering and how it turns into customer value. Once they respond, lock those descriptions into the cron notes and the 15-minute log so the dashboard can trust the source data.
2. Keep the market research going in the background (digest 1–2 articles weekly) and log interesting bits into `mission-control/market-insights.md` so the product framing stays fresh.
3. After each beat, compare new artifacts to `mission-control/architecture-reference.md` so we respect the original blueprint; log deviations or updates in that document.
4. Link each heartbeat run to the deliverable it supports—when the dashboard displays the progress bar, it can read directly from this checklist/document for the latest status.

Let me know if you’d like me to spawn agent sessions for them to review this checklist, or if you want to feedback on the proposed customer expectations before I hand it off.