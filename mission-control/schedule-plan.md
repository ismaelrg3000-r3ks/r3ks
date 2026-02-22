# Mission Control Schedule & Time Management Plan

## Guiding principle
We work lean, purposeful, and scheduled. Time management isn't just personal—it's organizational. Following Slack's guidance, we dedicate 10–30 minutes to plan daily/weekly tasks, align on priorities, and support each other in scheduling so time becomes a shared asset, not a scramble. (Slack blog: *Invest in time management strategies to improve team efficiency*.)

## Weekly Rhythm
| Day (UTC) | Focus | Cadence | Owners | Notes |
| --- | --- | --- | --- | --- |
| Monday AM | Sprint planning + priority check (review deliverables checklist + cron updates) | Weekly | r3ks | 10-15 min planning block, update checklist statuses, call out blockers for agent specializations. Use `mission-control/deliverables-checklist.md` as single source. |
| Tuesday | Execution deep work (dashboards, docs, automation) | Ongoing | hint/torv/rams/kami | Agents follow plan; each heartbeat run updates progress status + latest artifact. Encourage time blocking to avoid context switching. |
| Wednesday | Market research capture & insight drop | Weekly | r3ks | Read 1–2 articles (DevOps dashboards, product ops, automation) and append to `mission-control/market-insights.md`. |
| Thursday | Specialist coverage audit + knowledge upskilling | Weekly | r3ks + agents | Review SOUL/WORKING for gaps; brainstorm new personas or expansions. Document in `mission-control/agent-specialization-plan.md`. |
| Friday | File pruning review & readiness check | Weekly | r3ks | Remove clutter, archive outdated notes, confirm deliverables table still accurate. Update readiness status for progress bar panel. |
| Daily | Heartbeats/cron runs (hint/torv/rams/kami) | Daily/6h for hint | All agents | Each run captures deliverable outcome, updates `agentHeartbeats`, and writes short log entry for live feed + progress bar. |

## Key Priorities
1. **Deliverables readiness** – ensure every cron/job maps to a dashboard or docs asset (Agents view, Kanban, Live feed, Time, Progress). Update `mission-control/deliverables-checklist.md` after every heartbeats check-in.
2. **Product/story alignment** – keep tracking market signals weekly and anchor messaging in those trends; use insights to adjust the live feed copy or launch guide.
3. **Specialist capability** – audit needs and stage new personas or upskill briefings, so the squad can handle product ops, revenue storytelling, and automation readiness seamlessly.
4. **Time boxing + collaboration** – block focused work slots (per Slack, plan daily/weekly) and share the plan; encourage agents to flag urgent interruptions or request support so we protect high-leverage hours.

## Execution Orchestration
- **Daily planning blocks:** Each morning, call out the day’s top 2-3 priorities in the chat/log so we all share the same view. Update the Deliverables checklist to keep the progress bar accurate.
- **Weekly status note:** After Friday pruning, publish a short summary (`mission-control/weekly-status-<date>.md`) highlighting triumphs, blockers, and learnings.
- **Heartbeats run alignment:** The cron jobs should now log not just “status” but the specific deliverable outcome. Use their output to refresh the dashboard's progress bar every time.

## Next steps
1. Share this schedule plan with the squad so everyone can reference the cadences and time management intention. 2. Set a lightweight reminder (cron or note) to re-read this plan at the start of each week. 3. Continue capturing market research + deliverables updates according to the weekly rhythm.

Let me know if you want me to automate the reminders (cron job, Telegram note, etc.) or adjust the plan for other time zones/parallel projects.