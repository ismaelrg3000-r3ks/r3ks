# Tycoon Mission Control Approval Flow

This mirrors the governance-first positioning of the GitHub Mission Control project. Any mission-critical agent task flows through an explicit approval checklist before execution.

## Structure
- **Dashboard card:** `Approvals` board with lanes: `Pending`, `In Review`, `Approved`, `Rejected`.
- **Fields per card:** mission, owner, reviewer, impact (high/medium/low), estimated blocking risk, linked mission docs, and requested action.
- **Templates:** Use `templates/torv-report.md` + `templates/rams-strategic-review.md` for the approval summary. Add a new field `Approval Status` (pending/approved/rejected) inside the template.

## Flow
1. Agent (torv/ hint etc.) proposes a sensitive action (gateway change, cron update, Discord migration). They fill out `missions/tycoon-mvp/approval-request.md` (a short prompt pulled from the TORV template) and tag the card `Needs r3ks approval`.
2. r3ks reviews the TORV + RAMS outputs, updates `missions/tycoon-mvp/approval-log.md` with the decision, and marks the card `Approved` or `Rejected` on the board.
3. Dashboard cards read from `status/dashboard-data.md` field `approvalQueue` so Meridian sees outstanding approvals inside the Tycoon Command Board.

## Review artifacts
- `missions/tycoon-mvp/approval-log.md`: append entries like `2026-02-23 | r3ks | Approved Discord migration summary | Next action: implement once blueprint arrives.`
- `status/dashboard-data.md`: include `approvals` array of `{ mission, requestedBy, reviewer, status, dueIn }` so the embed can show what still needs sign-off.
