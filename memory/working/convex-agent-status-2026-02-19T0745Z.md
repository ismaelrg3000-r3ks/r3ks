# Convex Agent Status Check — 2026-02-19T07:45:00Z UTC

## Objective
Capture live data from the judicious-buzzard-460 Convex deployment to understand the current agents/tables and to derive what instrumentation we can build for the dashboard/activation pipeline.

## Actions
1. Booted a fresh Convex app (`convex-app`) locally, installed `convex`, and configured `npx convex dev --configure=existing --team ismael-gomes --project openclaw`. That generated the `.env.local` pointing to `dev:next-zebra-972` plus `https://next-zebra-972.eu-west-1.convex.cloud`.
2. Added a temporary query (`convex/queries/getAgents.ts`) using `./_generated/server` helpers so we could run `npx convex run queries/getAgents:default` against the deployment.
3. Queried the `agents` table: the row set includes r3ks, hint, kami, rams, and torv, along with their session keys, roles, priorities, statuses, and creation timestamps.
4. Ran `npx convex data` to confirm the available tables: `activities`, `agents`, `documents`, `messages`, `notifications`, and `tasks` — these are the hooks we can surface to the dashboard/Notion/cron monitoring.

## Findings
- The `agents` rows already model each persona (sessionKey, timezone, radial priorities). We can use the table as the source of truth for dashboard status indicators and to control activations (e.g., by updating `status` via mutations when a heartbeat response is received).
- The helper queries/mutations we add locally can directly read/write those tables because we now have a dev deployment configured. We can also add more queries for `tasks`, `notifications`, or `activities` later.
- The absence of a local `package.json` was why `npx convex dev` failed earlier; the new `convex-app` serves as a light wrapper to interact with the remote project.

## Next Steps
- Sketch the agent-cron dashboard view (maybe Notion plus a hosted monitor) referencing the `agents`, `activities`, and `notifications` tables (and `tasks` for drilling into assignments).
- Determine whether we want to push data into Notion or rely on another UI (or a hybrid). For activation, we can augment the helper scripts or cron jobs to run Convex mutations that flip `status`/`lastHeartbeat` and let the dashboard visualize that.
- If you want me to keep mapping specific tables or create more queries/mutations, tell me what stats (e.g., cron logs, notifications, agent uptime) you’d like on the UI.
