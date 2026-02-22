# Mission Control Heartbeat Goals Review

## Context
We currently log heartbeats for the Phase 1 agents (hint, torv, rams, kami) via `agent-monitoring/heartbeat-client.sh`. Each cron run is meant to both keep their work visible in Convex (through the `agentHeartbeats` table and `getAgentDashboard` query) and ensure the squads don't drift. Recent feedback highlighted that the cron purposes (e.g., "content progression check") feel vague; we should clarify the tangible deliverables behind each run and make sure they can be mapped onto the business idea Ismael proposed.

## Current Scheduled Crons (Phase 1)
| Agent | Schedule | Current Purpose | Proposed Clarification / Deliverable Focus |
| --- | --- | --- | --- |
| hint | Every 6h | "drift detection scan" | Research + log one automation gap or signal; update `mission-control/backlog` with new opportunity and metric evidence from live systems or dashboards. Report gap into Convex `activities` for downstream action. |
| torv | Daily 08:15 UTC | "implementation review" | Review one architecture/task status, confirm blockers, and prepare a short `materials/torv-status-<date>.md` summarizing what needs design/dev follow-up for the interactive dashboard product. Sink decisions into `tasks/mission-control-backlog.md`. |
| rams | Daily 08:20 UTC | "UX/system clarity audit" | Evaluate UI flows (dashboard, docs, onboarding), capture at least one improvement idea, and draft a recommendation in `memory/working/rams-ux-note-<timestamp>.md`. Feed insights into the Mission Control product pitch—highlight ease-of-use and single source of truth. |
| kami | Daily 00:30 UTC | "content progression check" | (Current phrasing is vague.) Proposed purpose: Review the Mission Control dashboard narrative materials (e.g., income plays, ROI story) and publish a two-paragraph update + next step list to `memory/working/kami-mission-highlight-<timestamp>.md`. Pair it with a short checklist for “dashboard business launch” copy (value proposition, pricing tiers, KPIs). |

## Next Steps
1. Treat this note as the discussion artifact for the other agents—add comments or edits before deploying the simplified Convex dashboard, so everything maps to the business idea (ready-to-implement interactive Mission Control dashboard + docs/guide).
2. If the squad agrees, we can lock these clarified purpose strings into `agent-monitoring/cron-schedule.md` and use the dashboard query to surface the specific deliverables per run (last heartbeat, current focus, outstanding blockers).
3. Once the product idea is crystallized, we can add a cron reminder for periodic “product check-ins” (e.g., weekly demo notes) that tie the automation work back to revenue/launch metrics.

Let me know if you want me to invite the execution agents to comment here or if I should spawn sessions for them to review these proposals.