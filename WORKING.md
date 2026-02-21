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
