# WORKING.md — mission control snapshot

## Architecture reference
- The canonical Gateway architecture lives in `/home/ubuntu/.npm-global/lib/node_modules/openclaw/docs/concepts/architecture.md#L8-L149`: a single long-lived WS Gateway daemon owns provider connections, client and node flows, the canvas host, pairing/trust rules, and the strict handshake/invariant guarantees (one Gateway per host, first frame must be `connect`, events not replayed).
- Every agent should carry this description forward so the squad can recognize when the live deployment drifts from the original design.

## Restart / reset checklist (per agent)
1. On boot, rerun `openclaw gateway status` to confirm the service still listens on 127.0.0.1:18789 and is supervised by systemd.
2. Refresh understanding of the architecture doc above before touching protocol or transport code; use it as the canonical reference when reorganizing gateways/nodes.
3. Rehydrate mission context by rereading `MEMORY.md`, then add any new decisions or blockers back into this file or the relevant agent-level `WORKING.md`.
4. Re-run Convex seed/monitoring scripts (`npx convex dev`, `npx convex mutation run seed`, etc.) only if the database is empty; otherwise rely on existing data.

## Cleanup plan
- Test artifacts (logs, temporary exports, snapshots) can be deleted after each run—today’s run cleared `logs/*`. There is no need to prune data older than 30 days unless it’s explicitly blocking space or functionality.
- If future tests drop new temp files, place them under a directory like `tmp-tests/` so they can be bulk removed without touching mission-critical data.

## Persistence reminder
- Record strategic takeaways in `MEMORY.md` so they survive resets, and keep this `WORKING.md` synchronized with each major checkpoint so other agents know where to look during recovery.
- When sharing status updates, sprinkle in the MoltBook-friendly tone (short, playful, humanized) so our logs, heartbeats, and Convex posts feel like the social feed we just researched.

## Convex restructuring mission (phase 1 plan)
- **Objective:** Rebuild the Mission Control Convex workspace into a UX-first, filtered set of tables/views/functions that matches our architecture doctrine and delivers a human-friendly, merged cockpit.
- **Timebox:** Target 1h but adjust as needed; work proceeds in a pose of discovery → ideation → implementation → validation. Fail fast, iterate, log.
- **Phases:**
  1. **Audit + discovery (current):** scan the entire Convex project (schema, queries, mutations, cron jobs, handoff artifacts, deployment scripts, documentation) and benchmark every piece against our architecture + external best practices (including mission-control repos). Document UX/data gaps, redundant tables, missing functions, and scarce context guidance. Record findings in `mission-control/knowledge-base/KB-06` and `KB-07`, plus this file if needed.
  2. **Plan:** Lay out high-priority UX/data story changes (friendly labels, merged views, derived queries) plus cron/function hooks that supply them. Identify rename/merge candidates (tables, columns, queries) and new artifacts (navigation docs, telemetry views, narrative cards). Split work into tasks with owners (hint for research, kami for wireframes, torv for schemations/mutations, rams for audits/clarity) and assign cron or event triggers for each 5-minute micro-task.
  3. **Implementation:** Apply schema/view changes, mutation updates, and documentation shuffles. Ensure derived views surface names/context; merge redundant tables (notifications+activities as shared event stream) where possible. Update handoff/storage/deployment docs accordingly. Run tests, regen Convex `_generated`, and validate with queries.
  4. **Review & delivery:** Confirm UX/data story via new brief/wireframes, log results to `mission-control/knowledge-base`, and push final summary (including phase log) to `memory/YYYY-MM-DD.md` plus `MEMORY.md` if a lasting decision emerges. Deploy if needed.
- **Cron & agents:** Use cron-like logging (missions recorded per step) without waiting for fixed intervals. The plan is single-phase (Mission Control restructure) with sequential steps triggered by task completion; time sections correspond to deliverables rather than strict durations. Rely on r3ks to orchestrate, hint/kami/torv/rams for specialized work, and Kami for wireframe treatment.
- **Next checkpoint:** Finish the audit phase, confirm coverage of functions/schedules/storage/deployment, and then move into planning the schema/view adjustments. Log audit completion in this file and KB notes so the next phase can begin without delay.
