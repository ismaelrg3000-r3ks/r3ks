# Kanban Task Board Prototype (Torv)

This note captures the live Convex-backed Kanban board we are building for Mission Control. It links the backlog to cards, surfaces gaps, and keeps activity logs so the dashboard layers (Agents / Kanban / Feed / Time / Progress) stay trustworthy.

## Column definitions
| Column | Statuses | What it shows |
| --- | --- | --- |
| **Plan & Triage** | backlog, triage, planned, ready | Scoped work waiting for someone to pull it into execution.
| **In Progress** | in progress, working, active, doing | Cards that are actively being shaped (design, engineering, writing).
| **Blocked** | blocked, on hold, stalled | Work that stopped because a dependency, approval, or environment is missing.
| **Review / QA** | review, qa, validation | Items that need a second set of eyes, compliance checks, or test passes before release.
| **Done** | done, complete, shipped, launched | Delivered outcomes that will feed the progress bar and launch guide.

Each column carries a short description in `getKanbanBoard` so the dashboard can surface contextual hints without reading a separate doc.

## Convex data flow
- `tasks` is the single source of truth. The new query `getKanbanBoard` groups all rows by the normalized status string and returns:
  1. `columns`: enriched columns with aggregated stats (total, assigned, blocked). It also keeps the individual `taskId`, `title`, `priority`, `assignees`, `blocked`, and `tags` so the board can render cards directly.
  2. `gaps`: actionable signals (empty columns, unassigned-heavy columns, unmapped statuses, stale activity). Every gap includes a reason string and optional detail for tooling to show a callout.
  3. `metrics`: totals for assigned/unassigned/blocked cards plus per-column counts for the progress bar.
  4. `activitySummary`: counts of all `activities` so the monitor can mention whether the board is being updated.
  5. `reportedAt`: a timestamp for the dashboard refresh trigger.

- `mutations/queueKanbanNotification` lets automation push `notifications` rows (now carrying a `message` column) tied to the agent who owns the board (Torv by default). This keeps the human-facing notification queue populated and decouples the monitoring script from needing to craft raw SQL.

- `scripts/kanban-gap-monitor.js` runs the query, writes the detected gaps to `logs/kanban-gap-monitor.log`, records an activity entry of type `kanban-gap`, and queues a high-priority notification for Torv whenever the board is missing cards or has too many unowned cards. This script is the “monitor tasks/activities for gaps and report via messages/notifications” hook referenced in the 15-minute plan.

## Gap detection heuristics
- **Empty column**: any column with zero cards. The script tags these as `empty-column` gaps.
- **Unassigned-heavy column**: if ≥50% of a column lacks assignees, the entry becomes `unassigned-heavy` and lists the share of unassigned cards.
- **Status gap**: tasks whose status string does not map to any column. They surface as `status-gap`. The detail summarizes counts per unmapped status so product owners can extend the column map.
- **Activity gap**: when the `activities` table is empty, we warn that there is no logging to feed the live feed panel.
- **Global gap**: when no tasks exist, the board itself is flagged so we can turn the schematic placeholder into something real.

Gaps are returned both to the dashboard (for UI callouts) and to the monitoring script (for logging + notifications).

## Next steps
1. Hook `getKanbanBoard` to the dashboard view so its returned columns render as cards and the gap list drives the UI badges. Link `metrics` into the progress bar and the agents panel.
2. Schedule `scripts/kanban-gap-monitor.js` on the daily Torv cron (or run it manually now) so messages + notifications stay current. The script is intentionally simple so we can swap it into a heartbeat job later.
3. Pair the board with the launch guide we are drafting: list the column meanings, the automation signals (`gaps`, `metrics`, `notifications`), and the action steps for each new signal type.
4. Re-run gap detection after every backlog update and log the summary to `mission-control/15min-log.md` (means we keep the cadence alive).

This doc can serve as the Kanban chapter we link to from the roadmap, the launch guide, or the dashboard tooltip when a column is empty.
