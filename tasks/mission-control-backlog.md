# Mission Control Backlog (2026-02-19)

## rams (Strategic Drift Analyst)
1. **Signal catalogue** – Document the "Signal → Task" mapping for critical alerts (GitHub issues, Sentry incidents, Slack threads) + required context payloads/responsible agents. (Due in 2d; depends on access to current alert logs and subscriptions.)
2. **agents.md persona pack** – Define consistent prompts, tone, and persona notes for triage/analysis runs to keep outputs predictable. (Due in 3d; depends on sample prompts and desired tone examples.)
3. **Parallel/Sequential runbook** – Write guidance for when to scale from sequential to parallel automation, including partitioning rules to avoid merge conflicts. (Due in 4d; depends on historical incident data.)
4. **Goal-progress drift alerts** – Turn the visionGoalProgress ledger into a drift detector that compares short/long goal counts to backlog/agent health and surfaces anomalies before they bleed into the backlog. (Due in 3d; depends on the new goalProgress query and weekly vision report data.)

## torv (Technical Sentinel)
1. **Mission Control dashboard prototype** – Sketch a four-pane interface (queue, roster, event stream, detail view) and collect stakeholder feedback on viability. (Due in 5d; depends on UI tooling access and representative event data.)
2. **Heartbeat/health policies** – Define monitoring rules for missed pings, failing tests, and stalled queues plus the escalation paths. (Due in 7d; depends on telemetry API access.)
3. **Priority lane policy** – Publish Critical/Standard/Batch lane definitions and per-agent concurrency caps to guide scheduling. (Due in 3d; depends on historic runtime stats.)
4. **Vision-goal instrumentation** – Tie mission-control-triage outputs to the `visionGoals` table, record `goalId` on each `goalProgress` row, and expose the new aggregated query so dashboards and scripts can read goal-level KPIs without scanning every row. (Due in 2d; depends on the visionGoals registry and updated triage code.)

## kami (Content Creator)
1. **Integration inventory** – Catalogue current signal integrations (GitHub, Sentry, Slack, etc.) and list gaps for triggering Workflows. (Due in 3d; depends on integration configs.)
2. **Drift-retry tooling spec** – Blueprint automated retry/escalation behavior when drift is detected mid-run (test failures, scope creep). (Due in 4d; depends on defined drift indicators.)
3. **Health checklist** – Compose the gating checklist (tests, heartbeat, backlog) that signals a Workflow is safe to scale down oversight. (Due in 2d; depends on run review notes.)

## hint (Knowledge Architect)
1. **Convex insights digest** – Research docs.convex.dev/best-practices and the Convex for Claw command center, then capture the architectural lessons (indexes, real-time telemetry, goal dashboards) plus recommended tweaks in the knowledge base so the squad can iterate faster. (Due in 3d; depends on those references and the new goalProgress instrumentation.)

## r3ks (Orchestrator)
1. **Orchestrator guide** – Link signals to context templates and agent assignments, referencing Mission Control best practices. (Due in 2d; depends on rams’ signal catalogue and kami’s integration list.)
2. **Tooling/priority roadmap** – Document needed connectors, visibility surfaces, and drift detectors, prioritize by impact, and document dependencies. (Due in 3d; depends on torv’s dashboard mock and kami’s tooling spec.)
3. **Review cadence** – Schedule a Mission Control sync (status + blockers) to keep the backlog updated and surface blockers weekly. (Due in 1w; depends on completion of the above deliverables.)
4. **Vision-report ops** – Author CEO/CTO/COO themes in the `visionGoals` table, keep the weekly vision report script updated, and share the Sunday briefing triggered by the new cron so the investor-level scorecard stays visible. (Due in 2d; depends on torv’s instrumentation and the cron-triggered report.)

## Cross-agent dependencies
- Dashboard, signal catalog, and tooling specs feed r3ks’ orchestrator guide.  
- Heartbeat/health policies + health checklist create the data r3ks uses to gate automation confidence.  
- Signal catalogue informs integration inventory and drift tooling specs.

## Missing tooling/data to resolve now
- Additional connectors for untracked signals (e.g., new Sentry projects, Slack App hooks).  
- A live visibility/dashboard workspace combining queue + health telemetry.  
- Drift detection instrumentation (tests/timeouts) to trigger retries.  
- Historic runtime/priority stats to validate concurrency caps.

## Status tracker
- **Signal catalogue** – Not started  
- **Persona pack** – Not started  
- **Runbook** – Not started  
- **Dashboard prototype** – Not started  
- **Heartbeat policy** – Not started  
- **Priority lanes** – Not started  
- **Integration inventory** – Not started  
- **Drift tooling spec** – Not started  
- **Health checklist** – Not started  
- **Orchestrator guide** – Not started  
- **Tooling roadmap** – Not started  
- **Review cadence** – Not started
- **Goal-progress drift alerts** – Not started
- **Vision-goal instrumentation** – Not started
- **Vision-report ops** – Not started
- **Convex insights digest** – Not started

## Auto-triage suggestions

- [ ] (handoff:hint-1771529719-932701) hint handoff (2026-02-19T19:35:19.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771533436-421380) hint handoff (2026-02-19T20:37:16.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771545904-680662) hint handoff (2026-02-20T00:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771556704-910673) hint handoff (2026-02-20T03:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771567505-711830) hint handoff (2026-02-20T06:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771578304-781617) hint handoff (2026-02-20T09:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771589104-238303) hint handoff (2026-02-20T12:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771599904-760700) hint handoff (2026-02-20T15:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771610704-205525) hint handoff (2026-02-20T18:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771621504-754406) hint handoff (2026-02-20T21:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771632304-89326) hint handoff (2026-02-21T00:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771643104-493942) hint handoff (2026-02-21T03:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771653904-425492) hint handoff (2026-02-21T06:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771664704-263132) hint handoff (2026-02-21T09:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771675505-397574) hint handoff (2026-02-21T12:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771686305-726239) hint handoff (2026-02-21T15:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771697104-635266) hint handoff (2026-02-21T18:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771707904-342517) hint handoff (2026-02-21T21:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771718704-51232) hint handoff (2026-02-22T00:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771729504-783932) hint handoff (2026-02-22T03:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771740305-506442) hint handoff (2026-02-22T06:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771751105-946865) hint handoff (2026-02-22T09:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771761905-398493) hint handoff (2026-02-22T12:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771772704-627024) hint handoff (2026-02-22T15:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771783504-945569) hint handoff (2026-02-22T18:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771794305-873820) hint handoff (2026-02-22T21:05:05.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

- [ ] (handoff:hint-1771805104-504277) hint handoff (2026-02-23T00:05:04.000Z): status=active; openTasks=1; staleTasks=0; lastError=none
  - Prioritize 1 open task for hint.
  - Surface any workflow automation ideas and record them for the knowledge base.
  - source: mission-control-triage auto-router

