# Torv Heartbeat & Cron Audit — 2026-02-20 21:05 UTC

## Current cron state
- Key jobs: hourly mission-control sync (ok), mission control daily (9:00), mission control improvements (weekly Monday 18:00), Torv repeat implementation (11/14/17/20). Daily jobs (08:10 for Torv, 08:20 for Rams, 08:30 for Hint) are currently erroring even though the repeat jobs cover similar ground.

## Optimization plan
1. **Prune/repair failing dailies** – drop or fix the 08:xx jobs if repeat scans already exist. Having both causes wasted tokens and confusing statuses.
2. **Rationalize cadence** – keep one high-frequency job per agent (e.g., Torv repeat) and use the hourly mission-control sync for monitoring; avoid redundant Cron triggers unless they deliver unique output.
3. **Token tracking** – instrument every cron/heartbeat run with the telemetry helper (signal, tokensUsed, duration, outcome) and store the data in a Convex table so we can spot cost spikes.
4. **Telemetry logging standard** – treat activity logging as the canonical session memory: each cron/heartbeat run writes an activity entry summarizing the signal + result. Once telemetry ingestion proves stable, resetting sessions is safe because the new logs are the authoritative trail.
5. **Access control & retention** – define who can read/write telemetry data and set retention/archival to avoid data bloat.

## Readiness to reset
- After instrumenting cron jobs with the telemetry helper and confirming Convex ingestion works (the new document + activity entries show the flow), file cleanup is safe and resets won’t lose visibility because the telemetry records persist outside the session.
