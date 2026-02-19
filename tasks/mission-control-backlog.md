# Mission Control Backlog (2026-02-19)

## rams (Strategic Drift Analyst)
1. **Signal catalogue** – Document the "Signal → Task" mapping for critical alerts (GitHub issues, Sentry incidents, Slack threads) + required context payloads/responsible agents. (Due in 2d; depends on access to current alert logs and subscriptions.)
2. **agents.md persona pack** – Define consistent prompts, tone, and persona notes for triage/analysis runs to keep outputs predictable. (Due in 3d; depends on sample prompts and desired tone examples.)
3. **Parallel/Sequential runbook** – Write guidance for when to scale from sequential to parallel automation, including partitioning rules to avoid merge conflicts. (Due in 4d; depends on historical incident data.)

## torv (Technical Sentinel)
1. **Mission Control dashboard prototype** – Sketch a four-pane interface (queue, roster, event stream, detail view) and collect stakeholder feedback on viability. (Due in 5d; depends on UI tooling access and representative event data.)
2. **Heartbeat/health policies** – Define monitoring rules for missed pings, failing tests, and stalled queues plus the escalation paths. (Due in 7d; depends on telemetry API access.)
3. **Priority lane policy** – Publish Critical/Standard/Batch lane definitions and per-agent concurrency caps to guide scheduling. (Due in 3d; depends on historic runtime stats.)

## kami (Content Creator)
1. **Integration inventory** – Catalogue current signal integrations (GitHub, Sentry, Slack, etc.) and list gaps for triggering Workflows. (Due in 3d; depends on integration configs.)
2. **Drift-retry tooling spec** – Blueprint automated retry/escalation behavior when drift is detected mid-run (test failures, scope creep). (Due in 4d; depends on defined drift indicators.)
3. **Health checklist** – Compose the gating checklist (tests, heartbeat, backlog) that signals a Workflow is safe to scale down oversight. (Due in 2d; depends on run review notes.)

## r3ks (Orchestrator)
1. **Orchestrator guide** – Link signals to context templates and agent assignments, referencing Mission Control best practices. (Due in 2d; depends on rams’ signal catalogue and kami’s integration list.)
2. **Tooling/priority roadmap** – Document needed connectors, visibility surfaces, and drift detectors, prioritize by impact, and document dependencies. (Due in 3d; depends on torv’s dashboard mock and kami’s tooling spec.)
3. **Review cadence** – Schedule a Mission Control sync (status + blockers) to keep the backlog updated and surface blockers weekly. (Due in 1w; depends on completion of the above deliverables.)

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
