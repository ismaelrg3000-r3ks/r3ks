# KB-03 — Agent Interface Contracts

## Why it exists
To avoid ambiguous handoffs we agree on what each agent produces, what inputs they expect, and where the outputs land.

| Agent | Inputs | Outputs | Delivery cadence |
| --- | --- | --- | --- |
| r3ks | Convex backlog, cron reminders, agent summaries | Command cues (`openclaw agent`), Telegram recaps, backlog updates | Hourly + on-demand
| hint | KB-01/03/05 inputs, rams’ handoff artifacts | Knowledge reports, document drafts, Convex activities/documents | Cron runs + ad-hoc requests
| torv | Automation logs, instrumentation data | Handoff artifacts, readiness status notes, automation fixes | Daily + repeat scans
| rams | Convex backlog status, handoff artifacts, charters | Clarity audits, artifact templates, severity reports | Daily + follow-up reviews
| kami | Charter/backlog drafts, agent summaries | Content briefs, copy, onboarding playbooks | When requested

## Communication Protocols
- Agents log outputs in both `/mission-control/backlog.md` and the matching `mission-control/knowledge-base` entry when possible.
- For each new artifact (e.g., `handoffArtifacts`), record the storage path + owner in KB-03 so the rest can follow the breadcrumb.
- r3ks relays final summaries to Telegram via the message tool to keep the human loop informed.

_Last updated: 2026-02-20 14:35 UTC._