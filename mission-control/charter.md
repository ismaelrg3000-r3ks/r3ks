# Mission Control Charter

## Purpose
Coordinate the Mission Control squad (r3ks, hint, torv, rams, kami) to continuously maintain and improve the Convex-backed automation workspace. The charter ensures every agent understands the orchestration flow, their deliverables, and how we validate completion.

## Success Metrics
1. **Convex Synchronization:** All mission-critical updates (backlog, knowledge reports, automation changes) flow through Convex activities/documents within 24 hours.
2. **Agent Activation:** Cron reminders trigger an actionable run every hour, and the resulting insights get logged and shared (Telegram summary + mission backlog update).
3. **Artifact Visibility:** `handoffArtifacts` and related KB entries stay published in the workspace so every audit references the same reality.

## Roles & Interfaces
| Role | Responsibility | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- |
| **r3ks (orchestrator)** | Reads Convex state, issues commands, relays summaries to Telegram. | Mission backlog, agent reports | Cron-triggered agent runs, strategic instructions. | Maintains charter/backlog, keeps cron/canvas aligned. |
| **Hint (researcher)** | Turns inputs into knowledge, discovers best practices, and writes KB content. | Artifacts (KB-01/03/05, handoff data) | Convex documents, knowledge reports, task recommendations. | Works from main instructions; logs everything under `/memory/working/`. |
| **Torv (technical sentinel)** | Keeps instrumentation/infra honest and publishes the `handoffArtifacts` mirror. | Agent monitoring scripts, logs | Handoff artifacts, readiness notes, automation fixes. | Pushes artifacts into workspace/Convex for others to consume. |
| **Rams (strategic clarity)** | Audits drift, clarifies handoffs, and maintains artifact templates. | Mission backlog, torv artifacts | Clarity reports in `/memory/advisory/`, artifact templates. | Logs severity + recommendations; never writes MEMORY.md. |
| **Kami (content)** | Crafts messaging/backlog updates, builds quickstarts for Mission Control usage. | Charter/backlog, agent summaries | Docs, onboarding copy, dashboards. | Stores drafts as `/memory/working/kami-<timestamp>.md`. |

## Coordination Flow
1. Cron jobs deliver reminders to `main` (r3ks). 2. r3ks reviews backlog/Convex, runs `openclaw agent` for the appropriate worker. 3. Agent writes findings back into Convex (activities/documents/backlog). 4. r3ks sends a succinct recap to Telegram and updates `/mission-control/backlog.md`. 5. Repeat with follow-up one-shot crons for the next refinement.

## Artifact Governance
- `mission-control/knowledge-base/` holds the KB-01/03/05 nodes (see below). Each entry tracks dependencies, owner, and last update.
- `mission-control/backlog.md` captures the live deliverables table.
- `/memory/working/` stores operational outputs; `/memory/advisory/` keeps the strategic assessments.
- Agents must confirm whenever a deliverable is done so the rest of the squad can move on the next task.
