# KB-05 — Handoff Artifact Template

Every `handoffArtifact` should include the following metadata so downstream clarity work remains reproducible.

```
Title: [short descriptive title]
Owner: [agent or repo/owner]
Timestamp: [ISO 8601 UTC]
Source: [repo path / Convex entry]
Summary: [what the artifact captures]
Signals: [cron/hook/automation that produced it]
Status: [draft | waiting review | approved]
Dependencies: [Convex tables, repos, credentials]
Next Action: [specific request for another agent]
Attachments: [path(s) to logs, exports, diagrams]
```

**Usage:**
- Torv populates this template when publishing instrumentation exports. Submit the filled template to `/mission-control/handoff-artifacts/<artifact>.md` and link it from the backlog.
- Rams references the template when reviewing the artifact, ensuring he assesses the same signals every time.
- Hint uses the `Summary` + `Attachments` fields to orient research before crafting knowledge reports.

_Last updated: 2026-02-20 14:35 UTC._