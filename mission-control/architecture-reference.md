# Mission Control Architecture Reference — 2026-02-20

This document reflects the original Mission Control architecture you described: multiple independent OpenClaw/Clawdbot sessions, a shared Convex workspace, heartbeat cron jobs, notification delivery, and a React-style dashboard that synthesizes tasks, activities, documents, and agent statuses. Use it as the canonical blueprint for how every agent should coordinate.

## Key elements (from the source doc)
1. **Gateway + sessions** – A single Gateway daemon runs 24/7, hosting multiple sessions, each with its own SOUL/personality, memory, and tooling. Sessions (main vs. isolated) are the units of identity and context. Cron jobs wake isolated sessions with structured prompts.
2. **Workspace files** – Each agent has AGENTS.md, SOUL.md, memory/WORKING.md (current task), memory/YYYY-MM-DD.md (daily notes), and a shared `memory` tree for persistence. Everything agents remember is written to disk; "mental notes" disappear.
3. **Heartbeat & cron system** – Agents wake every 15 minutes via staggered cron jobs, read WORKING.md, check for @mentions or assigned tasks, examine the activity feed, then either execute work or report HEARTBEAT_OK.
4. **Notification & thread system** – Notifications queue delivered messages when agents are asleep, and thread subscriptions ensure agents keep receiving replies even without explicit @mentions.
5. **Mission Control DB (Convex)** – Six core tables: `agents`, `tasks`, `messages`, `activities`, `documents`, `notifications`. Agents interact via Convex CLI/queries to log tasks, comments, docs, and statuses. The UI layers these tables into a dashboard (Activity Feed, Kanban board, Agent Cards, Document panel).
6. **Standups & squad identity** – Daily standups aggregate progress for quick visibility. Each agent has a distinct identity (e.g., Shuri the skeptical tester, Loki the content writer). Roles include intern, specialist, lead. Mission Control replicates this structure in the `SOUL` + `AGENTS` instructions.

## Missing / improvement opportunities we should log
- **Telemetry / instrumentation helper**: The architecture doc references cron/heartbeat jobs but does not prescribe a single instrumentation schema. We should define a telemetry helper for logging `signal`, `agent`, `artifact`, `duration`, `status`, etc., so retrospective dashboards can read consistent data.
- **Convex navigation map**: Agents still lack a "Convex home" that lists which tables to visit first. We need to publish a navigation guide that ties notifications to specific tables and surfaces the Mission Control dashboard as the first checkpoint.
- **Skill catalog**: The architecture hints at specializations but doesn't define how to build/discover reusable skills (SKILL.md entries, docs, etc.). We should integrate the skill catalog plan (phase 1-4) from the previous research note.
- **Access control + retention**: While the original doc mentions serverless real-time data, it doesn’t say who can write/read each table or how long telemetry should live. We'll need roles/retention policies before exposing the cockpit.

## Integration plan (per agent, repeated checks)
1. **Log the canonical architecture** in Convex (document with `mission-control`/`architecture` tags) and point future cron runs to this document for reference.
2. **Schedule an architecture review job** (see cron below) to remind the squad to revisit the blueprint, compare the current implementation, and log deviations.
3. **Agent onboarding**: Add the architecture reference to every agent’s daily prep (e.g., read the Convex doc as part of the startup checklist) so they internalize table purposes (activity vs. notification vs. document) and the heartbeat/cron cycle.
4. **Comparison tasks**: Whenever we create new skills, KB entries, or telemetry designs, compare them against the architecture reference to ensure they align with the shared workspace concept.

## Quick references
- `convex/jobs` list for cron health (see `openclaw cron list`).
- `memory/working` folder for artifacts, audits, and skill briefs.
- `/AGENTS.md`, `SOUL.md`, `HEARTBEAT.md` for per-agent culture.

Keep this doc updated as we integrate new telemetry schemas, dashboards, or Convex tables. Every agent review cycle should start here before branching off into specialized tasks.
