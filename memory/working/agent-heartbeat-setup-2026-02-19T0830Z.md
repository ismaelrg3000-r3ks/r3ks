# Agent Heartbeat Infrastructure — 2026-02-19T08:30:00Z UTC

## Objective
Implement the cron-driven heartbeat mutation + monitoring view inside Convex so the Phase 1 agent cadence is visible and can flag degradation after missed runs.

## Work done
1. Added a Convex schema in `convex-app/convex/schema.ts` that now declares the `agentHeartbeats` table plus minimal definitions for the existing tables we read; this allows us to persist heartbeat history and keep the agent/task documents typed.
2. Created three Convex functions:
   - `mutations/recordHeartbeat.ts` records each cron run, inserts a row into `agentHeartbeats`, and patches the `agents` row with the metadata the dashboard needs.
   - `queries/getAgentTaskCounts.ts` returns open/stale task counts for the cron caller so the heartbeat payload is rich.
   - `queries/getAgentDashboard.ts` surfaces every agent, their last heartbeat, open/stale counts, summary note, error, and a `degraded` flag when two intervals are missed.
3. Wrote `agent-monitoring/heartbeat-client.sh` which Cron can call; it calls the counts query, builds the heartbeat payload, fires `recordHeartbeat`, and logs to `logs/agent-heartbeat.log`. The matching `cron-schedule.md` outlines the Phase 1 schedule for hint, torv, rams, and kami plus the one-line summaries and status values.
4. Added an `npm run dev` script inside `convex-app/package.json` for the faster Convex dev loop and created the `/agent-monitoring/` directory as the control surface for heartbeat tooling.
5. Ran the heartbeat script once for `hint` to verify the mutation, `agentHeartbeats` table, and dashboards update as expected.

## Results
- Convex now understands the heartbeat schema and exposes a dashboard query with the degradation logic you requested.
- The Cron script automatically gathers open/stale counts before sending metadata, so the UI receives everything in one payload.
- Scheduling instructions are preserved in `agent-monitoring/cron-schedule.md`, so setting up the initial cadence on any host is straightforward.

## Improvements noted
- Running `npx convex dev` needs schema alignment; once we defined the existing tables’ fields the same as the data, deployments succeed. Keeping schema additions additive helps avoid repeated validation errors.
- The modular `agent-monitoring/` directory plus the `npm run dev` wrapper keeps the monitoring workflow isolated and easy to iterate on without touching the main workspace.
