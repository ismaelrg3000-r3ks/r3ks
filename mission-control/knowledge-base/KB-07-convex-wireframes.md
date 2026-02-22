# KB-07 — Wireframe Concepts for Convex UX

## Source
Reference: `mission-control/knowledge-base/KB-06-convex-ux-audit.md` (current vs. ideal schema findings) + mission-control precedents (open-source dashboards, heartbeat instrumentation).

## Approach
For each surface we identified as critical (Notifications, Activity feed, Task board, Goal tracker), describe the current experience and the ideal/friendly experience, then call out what derived data (friendly fields, views, indexes) make the ideal possible.

### 1. Notifications / Alerts
| Aspect | Current | Ideal | Derived Data Needed |
| --- | --- | --- | --- |
| Layout | Simple list of `message` strings tied to `agentId`, with no timestamps or context. Hard to see what the alert applies to. | Card stack per agent, grouped by task/pipeline. Each card shows `source`, `taskTitle`, `agentName`, `priority`, `status`, and `createdAt`. There are inline CTA buttons (acknowledge, open task). | Derived `notificationView` that joins `agentName`, `taskTitle`, `taskStatus`, `relatedTaskId`, `status`, `timestamp`. Add indexes (`by_status`, `by_priority`). |
| Flow label | No status transitions. | Show `New`, `In Progress`, `Resolved`, `Ignored` tags. Notifications that turn into tasks automatically change stream. | Additional `status` column plus helper mutation that moves alerts to the `activities` feed when resolved. |

### 2. Activity Feed
| Aspect | Current | Ideal | Derived Data Needed |
| --- | --- | --- | --- |
| Structure | Chronological log with `type` + `details`, referencing `_id` for agents/tasks. No easy filtering. | Multi-column feed: left column shows `timestamp + type`, middle column explains `what happened` (task title + summary), right column shows `who` (agentName, role) + `next step` indicator. | Activity rows annotated with `agentName`, `taskTitle`, `context`, `taskStatus`, `friendlyType`. Provide default filters (by agent, by task, by mutation). |
| Navigation | Feed separated from tasks/notifications. | Each event links back to the task or notification it came from. Hovering shows toast with relevant docs/mentions. | Derived `eventStream` view linking `taskId`/`notificationId` & `documentId`, maybe via `activityContext` record. |

### 3. Task Board (Kanban)
| Aspect | Current | Ideal | Derived Data Needed |
| --- | --- | --- | --- |
| Card details | Title, status, raw `assignees` IDs. Blocker info is untyped. | Cards show title, normalized status badge (Plan/In Progress/Review/Done), assignee names + avatars, priority dots, blocker summary, metadata quick hits (tags, next milestone). | Synthesize `assigneesNames`, `blockedTitles`, `metadataFlags`, normalize statuses vs columns. Provide `taskHero` view for the board queries. |
| Gaps | Columns sometimes empty, unmapped statuses. | Visual gaps highlight unassigned cards, blocked counts, and missing statuses (w/ hints). | Use board query to compute `columnStats`, `gapHighlights`, `unmappedStatuses` (already partly there). Extend to include `alerted` counts if notifications exist for the task. |

### 4. Goal Tracker / Vision
| Aspect | Current | Ideal | Derived Data Needed |
| --- | --- | --- | --- |
| Goal overview | `visionGoals` rows store `name`, `type`, `status` but no linked tasks or owner names. | Goal dashboard showing owner (agentName), target date, linked tasks, progress bars (from `goalProgress`), and a backlog of related artifacts. | Derived `goalView`: join `visionGoals` to `tasks` (via tags/metadata) and `goalProgress` to show timeline. Display `ownerName`, `statusLabel`, `metric`, and `alert` flags when progress stalls. |
| Narrative | No narrative for how goals fit into mission. | Short story card summarizing how the goal advances the mission, referencing recent `activity` + `handoffArtifacts`. | Use `handoffArtifacts` + `activities` to generate `goalNarrative` glimpses (maybe with `taskTitle`, `summary`, `nextAction`). |

## Next Steps for Wireframes
1. Translate each table row into a card or feed row; annotate which friendly fields appear where.
2. Sketch or describe the user interactions (hover, filter, open task) and show how the derived metadata surfaces them.
3. Feed these wireframes back into the schema planning phase so we know exactly which fields/queries to implement next.

Once you're ready, I can hand this to kami for visual treatment, or we can mock it up ourselves in Markdown/diagram form for the next phase.