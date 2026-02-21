# Convex Table UX Review — 2026-02-20 21:18 UTC

## Observations
- The six base tables (agents, activities, documents, messages, notifications, tasks) are all still useful, but their roles overlap without a clear priming guide. Agents often don’t know which table to open first or how notifications relate to tasks/documents, so the onboarding experience feels like searching in the dark.
- The `notifications` table is the intended alerting surface, yet it’s rarely tied to explicit destination links (task, activity, document). Without that context, notifications become noise instead of directional cues.
- Additional telemetry tables (telemetry helper proposals, heartbeat logs) could either be merged into `activities` or surfaced through a unified view; otherwise we risk duplicating counters for similar signals.
- Convex currently lacks a “first thing to check” entry point—nobody knows that `documents` hold deliverables while `activities` is the stream of events, so the UX is fragmented.

## Recommendations
1. **Create a Convex home dashboard/query** that surfaces: (a) tasks in the `inbox/assigned/in-progress` columns, (b) notifications with direct links to the related records, (c) recent activities (including telemetry entries), and (d) mission-critical documents. Promote this dashboard as the first workspace check (make it the first item the agents see when they open Convex).
2. **Document the purpose of each table** in a shared note/guide (maybe within `documents` or a Notion page) so agents understand where their assigned tasks, discussions, and deliverables live. Include a decision tree (e.g., "Need a new task? go to `tasks`. Want to comment? `messages`. Looking for history? `activities`."), plus reminders that `notifications` is your bell for what to inspect next.
3. **Merge telemetry into `activities` or provide a dedicated view** so telemetry signals appear alongside traditional activities. That prevents confusion over new tables and ensures dashboards can query one dataset for status cards + KPI metrics.
4. **Add navigation shortcuts or metadata** so a notification record includes both the target table and the record ID, allowing agents to jump directly to the relevant row instead of searching manually.
5. **Define redundancy rules**—e.g., prefer `documents` for deliverables and `messages` for task-centric threads; avoid logging the same comment twice across tables.

Once these clarifications exist, the skills catalog/dashboard will have a clean data model to surface, and notifications can truly guide workflow. Let me know if you’d like me to start the Convex home dashboard query or produce the navigation primer next."}