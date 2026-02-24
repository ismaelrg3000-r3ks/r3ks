# KB-08 — Current Convex Baseline

This file captures the existing Convex schema, queries, and mutation surface so we have a firm baseline before we migrate new mission-control versions.

## 1. Schema snapshot (`convex-app/convex/schema.ts`)
| Table | Key fields | Indexes / notes |
| --- | --- | --- |
| `agents` | `name`, `role`, `status`, `sessionKey`, `timezone`, `priorities`, `lastHeartbeat`, `openTasks`, `staleTasks`, `summaryNote`, `lastError`, `heartbeatStatus` | Index `by_name`; used to drive dashboards, heartbeat monitoring, and task assignment status.
| `agentHeartbeats` | `agent`, `timestamp`, `status`, `openTasks`, `staleTasks`, `lastError`, `summary` | Index `by_agent`; stores historical heartbeat events for r3ks dashboards.
| `notifications` | `agentId`, `delivered`, `priority`, `message` | Lightweight alerts feed (flows into automation dashboard + agent UI TODOs).
| `activities` | `agentId`, `type`, `details` | Unstructured activity stream powering Kanban gaps / history counts.
| `handoffArtifacts` | `agentId`, `agentName`, `timestamp`, `summary`, `nextActions`, `classification`, `references` | Index `by_agent`; tracks handoff summaries for the command cockpit.
| `tasks` | `title`, `status`, `assignees`, `priority`, `creator`, `description`, `tags`, `blockers`, `metadata`, `threadSubscribers` | Primary work queue for dashboard + Kanban board.
| `documents` | `creator`, `title`, `body`, `tags` | General note storage (unused today but ready for knowledge artifacts).
| `visionGoals` | `name`, `type`, `description`, `owner`, `targetDate`, `metric`, `status`, `createdAt` | Index `by_type`; supports the Vision Goals dashboard.
| `goalProgress` | `goalId`, `timestamp`, `summary`, `taskCount`, `contentCount`, `knowledgeCount`, `backlogEntries`, `notes` | Index `by_goal`; tracks longitudinal progress metrics.

## 2. Query surface (`convex-app/convex/queries/*`)
1. `getAgents` — returns every agent row for platform dashboards or debugging. No filters.
2. `getAgentDashboard` — enriches `agents` rows with heartbeat metadata (expected interval, degraded flag, open/stale task counts) for the agent overview.
3. `getAgentTaskCounts` — accepts `agentName`, resolves it via `agents.by_name`, then counts open vs. stale tasks for that agent (stale = older than 7 days).
4. `getKanbanBoard` — gathers tasks, agents, activities and buckets cards into columns (`plan`, `inProgress`, `blocked`, `review`, `done`). Returns stats/gaps + unmapped tasks for the Kanban view.
5. `getGoalProgress` — simple timeseries read from `goalProgress` for charts/insights.
6. `getRecentHandoffs` — returns sorted handoff artifacts for the handoff list/commands.
7. `getVisionGoals` — returns every `visionGoals` row for goal dashboards.

## 3. Mutation surface (`convex-app/convex/mutations/*`)
- `recordHeartbeat` — writes heartbeat snapshots (used when agents report status). Ingests agent name, status, counts, last error, summary.
- `recordActivity` — logs an activity event with `agentId`, `type`, `details` for Kanban gaps.
- `createDocument` — persisted notes; currently unused but available for knowledge capture.
- `recordGoalProgress` — appends a goal progress entry (task/content/knowledge/backlog tallies).
- `logHandoff` — stores a new handoff artifact (summary + next actions/classifications).
- `queueKanbanNotification` — pushes RB queue work (hooked into statuses) to feed alerts (linked to the notification table + automation dashboards).

## 4. Observations
- All tables are simple (no nested records beyond arrays of strings/IDs) and rely on Convex index helpers (`by_name`, `by_agent`, `by_goal`).
- Queries mostly stream entire tables; there are no server-side joins beyond simple lookups, so we can consider derived views when migrating to Danm72’s stack.
- Agent heartbeat logic is currently hard-coded (interval map per agent names). If we adopt a new mission-control variant, we should reconcile their heartbeat cadence before refactoring this component.
- The Kanban query takes a bulk read of tasks/agents/activities and infers column buckets; it already emits `gaps`, which our new UI can reuse.

## 5. Next steps (for migration)
- Compare this schema/query surface to `mission-control-danm72` and note differences in `mission-control/knowledge-base/KB-06`/`KB-07` plus this file.
- Determine which tables/queries can map directly (e.g., `tasks` → Danm72’s `cards`) and where we need transformation logic (e.g., `agents` vs. their `operators`).
- Use the Kanban/vision goal queries as baseline sensors: run them after the new repo is seeded so we can compare results and highlight gaps.
