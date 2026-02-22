# KB-06 — Convex UX & Information Architecture Audit

## Objective
Look at Convex through the customer lens. Evaluate each table/view for clarity, redundancy, missing context, and navigability, then identify the UX-friendly changes we would need before handing this cockpit to someone who relies on it.

## Findings
### 1. Agents
- **What hurts**: `agents` rows are mostly human-readable, but every supporting artifact (activities, notifications, tasks) only references `_id` and never includes the agent **name** or **role** inline. This forces the dashboard to rely on additional lookups instead of showing "Ismael" next to the entry.
- **UX fix**: Derive `agentName`, `role`, `statusLabel` fields for every activity/notification/task reference, or expose a helper `agentView` that already joins the friendly fields.

### 2. Tasks
- **What hurts**: `tasks` is the richest table, yet the only labels surfaced are `title` and `status`. Assignees and creators are IDs, so consuming views must re-join to get names. `metadata` is opaque.
- **UX fix**: Embed denormalized `assigneesNames`, `creatorName`, `blockedByTitles`, `visibleFlags` into a derived view. Document the canonical statuses/status groups (Plan/In-progress/Review/Done) so telemetry queries always map to a known axis.

### 3. Notifications
- **What hurts**: The table stores `message`, `priority`, `delivered`, and `agentId`, but lacks context (what task it references) and there’s no `status` (`read`, `acknowledged`, etc.) or timestamps, so "which alert is new" is unclear.
- **UX fix**: Add `relatedTaskId`, `relatedTaskTitle`, `status`, `createdAt`, and `source` (mutation name) to notifications. Combine with `agentName` so the UI listing doesn't show raw IDs.

### 4. Activities
- **What hurts**: All activity rows refer to `_id` for agent and nothing else; there is no `timestamp`, `taskTitle`, or `type` taxonomy beyond free-text `type` + `details`. There are also no indexes for sorting by date or agent.
- **UX fix**: Surface `agentName`, `taskTitle`, `context` (derived from the mutation that generated the activity). Add `timestamp`/`duration` columns and supply a `friendlyType` ("task update", "cron run", etc.). Consider merging some activities into notifications when they describe the same event.

### 5. Messages & Documents
- **What hurts**: Message threads and documents are stored separately, but neither table references the visibility path (task name, channel). They rely on IDs for `taskId`, `fromAgent`, `creator`, `mentions`, which means a user must perform multiple lookups to know what they're reading.
- **UX fix**: Build summary view `threadsWithContext` that returns `taskTitle`, `fromAgentName`, `snippet`, `mentionsNames`, and `latestAttachment`. Same for documents—show `taskTitle`, `creatorName`, `status`, and tags.

### 6. Notifications vs. Activities Redundancy
- **What hurts**: There is overlap between `notifications` (alert channel) and `activities` (audit trail). Many notifications are just renamed activities, so the experience looks like duplicated rows.
- **UX fix**: Consolidate or surface a single curated activity feed that merges both, grouped by task. Flag notifications that need explicit acknowledgement versus background logging. Alternatively, compute a derived `eventStream` table that unifies the two.

### 7. Additional Tables (visionGoals, goalProgress, handoffArtifacts)
- **What hurts**: These tables are mostly opaque to the customer; their relationships to the core mission (tasks, agents) are not surfaced. For example, `visionGoals` lacks owner names, timeline context, or linked tasks, making it unclear what to do with them.
- **UX fix**: Link each goal to `taskCount`, `ownerName`, `statusLabel`, and provide a `goalTimeline` view (progress snapshots from `goalProgress`). `handoffArtifacts` already includes `agentName`, which is good, but it could index `missionPhase` or `taskTitle` to make the handoff actionable.

### 8. Missing Views / Navigation
- **What hurts**: There is no canonical navigation map or "start here" screen for the Convex workspace. Without dashboards or doc references, a new customer would not know whether to look at `activities`, `tasks`, or another table first.
- **UX fix**: Build a navigation doc (maybe in Convex, maybe in mission-control/README) describing the workflow: "Start at Notifications to see what's new, then open Tasks/Activities for context and Documents for supporting files." Offer curated queries/mutations (via Cron) that feed UX screens.

## Next Up
1. Capture all of the above in a concise brief (we can combine the findings into a \"current vs. ideal\" table).
2. Have kami translate the brief into wireframes for the high-impact surfaces (Activity feed, Notifications, Task board, Goal tracker) showing the friendly fields, the collapsed redundancies, and where each derived view sits.
3. Use the wireframes to prioritize schema changes (new columns, derived views, merged streams) and schedule the restructuring work.

## Mission Control Precedents
- The open-source `mission-control` dashboards we cataloged (e.g., `abhi1693/openclaw-mission-control`, `manish-raana/openclaw-mission-control`, `crshdn/mission-control`) already blend agent names, task titles, and derived alerts into a single view instead of forcing folks to cross-reference IDs. We should borrow that idea by building helper views (derived queries) that join Agents + Tasks so every row is self-contained.
- Their mission dashboards also favor telemetry-friendly streams: when a cron job runs, it logs over not just `activities` but also normalized `events` that include timestamps, human-friendly labels, and what the next action should be. We can mirror that by enriching our `agentHeartbeats` and `activities` tables with the names/status labels that the UI expects.
- Those projects often combine Notifications + Activities into a single feed and then tag each event with `taskTitle`/`agentName`. That approach solves the redundancy problem and ensures even someone unfamiliar with the schema can read what’s happening without referencing the IDs.

I’ll hand this brief to kami for wireframes once you confirm, then we can plan the next phase of schema adjustments and cron jobs for the actual transformation.