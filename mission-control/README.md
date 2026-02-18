# Mission Control — Orientation & Handoff

This document captures the current scope of Mission Control inside Convex. Treat it as the single point of truth when you wake up on a new host (e.g., the EC2 session) and want to understand the project before touching anything.

---

## 1. Project at a Glance

- **Convex workspace path:** `~/.openclaw/workspace/convex`
- **Target deployment:** `dev:next-zebra-972`
- **API URL:** `https://next-zebra-972.eu-west-1.convex.cloud`
- **HTTP action base:** `https://next-zebra-972.eu-west-1.convex.site`
- **Deployment key:** `dev:next-zebra-972|eyJ2MiI6IjgxNWZhMjk2NTJmMzRmMGI4N2UyYWU0NzgyMmIwNDFkIn0=`

Mission Control is a lightweight ops layer: agents, tasks, messages, documents, and notifications are stored in Convex tables; helper mutations keep activity/notifications flowing. The goal is to keep whoever is connected informed, coordinated, and ready for action.

---

## 2. Schema & Data Model (`convex/schema.ts`)

- `agents`: Squad members (r3ks, hint, kami, rams, torv). Stores session keys, priorities, and status.
- `tasks`: Mission cards with status, assignees, anytime blockers, metadata, subscribers, and tags.
- `messages`: Thread comments tied to tasks. Mentions + tags are preserved.
- `activities`: Append-only log of actions for audit/feedback.
- `documents`: Reference material attached to tasks.
- `notifications`: Deliverable events for each agent (e.g., task assignment, message post). Useful indexes are defined (`by_session`, `by_status`, `by_priority`, etc.) so filters can stay fast.

---

## 3. Functions / Mutations Located inside `functions/` — see `helpers.ts` for shared utilities.

- `tasks/create.ts` and `tasks/update.ts`: handle task creation/updates, record activities, queue notifications.
- `messages/create.ts`: posts to task threads, logs activity, alerts subscribers.
- `documents/create.ts`: attaches docs to tasks and notifies assignees.
- `seed.ts` / `seedAgents.ts`: bootstrap squad members + starter tasks/messages.
- `cleanupAgents.ts`: dedupes agent rows by name.

Every mutation uses generated helpers (`_generated/server`, `_generated/dataModel`). Regenerate them if schema changes by running `npx convex dev`.

---

## 4. Seed & Mission Setup

Before doing real work, ensure data exists:

1. `cd ~/.openclaw/workspace/convex`
2. `npx convex dev` (this spins the local dev server, refreshes `_generated`).
3. Run seed mutations if needed:
   ```bash
   npx convex mutation run seed
   npx convex mutation run seedAgents
   ```
   (If newer CLI versions use `npx convex run --function seed`, adjust accordingly.)

This gives you a baseline: r3ks (squad lead) + the other agents each have starter tasks/messages. Use `convex query` or the dev UI to inspect tables.

---

## 5. Deployment Workflow

You can push this app to `dev:next-zebra-972` using either the deployment name or the preview key. The key is preferred for automation:

```bash
export CONVEX_DEPLOY_KEY="dev:next-zebra-972|eyJ2MiI6IjgxNWZhMjk2NTJmMzRmMGI4N2UyYWU0NzgyMmIwNDFkIn0="
npx convex deploy --yes --verbose
```

On Windows/PowerShell use `$Env:CONVEX_DEPLOY_KEY = "..."` for that session. If you prefer explicit deployment control, set `CONVEX_DEPLOYMENT=dev:next-zebra-972` (already established in `.env.local`) and run `npx convex deploy --yes`.

---

## 6. Handing Off to the Remote Session

When the EC2 session boots up and asks "what now?", deliver these instructions:

1. Read this README + `.openclaw/workspace/AGENTS.md` to understand culture/agent structure.
2. Start the local dev server (`npx convex dev`) and regenerate `_generated` if necessary.
3. Run `seed` + `seedAgents` to populate mission control (skip if data already present).
4. Run queries (via `convex query` or `node scripts`) to verify agent/task/message tables.
5. Deploy only after seeds & tests pass, using the deploy key above.
6. Keep the AGENTS.md token/heartbeat notes in mind: limit tokens per session, save snapshots before resets, monitor usage.

Use Git or Convex HTTP actions to communicate status updates—`activities` + `notifications` already exist to capture them.

---

## 7. Suggested Next Tasks

- Document any unanswered questions or missing tools into `tasks` (via `tasks/create.ts`).
- Build a simple UI or script to visualize `tasks` + `messages` so the squad lead (r3ks) can see progress.
- Wire an HTTP action (if needed) through `convex/http.js` and route it via `https://next-zebra-972.eu-west-1.convex.site`.
- If you need to reorganize this workspace, move artifacts into `mission-control/` folders, keep helper docs in `README.mission-control.md`, and sync the README to Git.

---

Need me to keep this README in sync with other docs or push it into the GitHub repository for the remote session to clone? Let me know what format works best for them.
