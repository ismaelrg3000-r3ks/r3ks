# Mission Control Documentation Governance

## Purpose
Mission Control already carries a deep stack of docs, and our job is to keep only the ones that actually keep the r3ks bot product moving. This governance note explains how to decide where to put new information, how to keep the workspace lean, and how to persist the "forgettable priorities" so no insight vanishes between sessions.

## Rules for New Files
1. **Reference the product vision first.** Before creating `mission-control/foo.md`, ask whether `mission-control/product-vision.md` or one of the canonical logs (`mission-control/15min-log.md`, `mission-control/backlog.md`, `mission-control/brief.md`) already covers it. If so, append there instead of spinning up a new doc.
2. **Justify the new artifact.** Every new file must include a single-sentence rationale at the top explaining why existing docs weren’t enough. This keeps file creation intentional and traceable.
3. **Pick a canonical home.** Prefer `mission-control/` or `missions/` over ad-hoc folders. Every mission or product note should live in the mission namespace so we never lose sight of the single source of truth told in `mission-control/15min-log.md`.
4. **Link before you duplicate.** If a file is meant to summarize or adapt content from another clone (`openclaw-mission-control`, `mission-control-crshdn`, etc.), keep a short link/backlink and avoid copying entire sections unless they diverge significantly.

## Forgettable Priorities System
1. **Priority anchors live in this file.** The three forgettable priorities we care about right now are: (a) mission control as a business, (b) r3ks bot product focus, (c) persistence/clarity of memory between sessions. Whenever one of those priorities is addressed (audit done, doc pruned, memory sync), log the action in `mission-control/15min-log.md` and add a short note here that the priority was reinforced.
2. **Persist via Memory.** After each session where a forgettable priority is touched, append a short entry to `memory/YYYY-MM-DD.md` and, if it becomes a lasting pattern, update `MEMORY.md` under a new "Forgettable Priorities" heading. This ensures the priority isn’t lost when the session ends.
3. **Automated reminders.** When creating a new doc, include a `<!-- priority: path/to/priority -->` HTML comment pointing back to one of the forgettable priorities. That way any automation or quick script can flag whether a file has a peace with a product need.

## Cleanup Cadence
- Every seven days, run a doc audit (note: the next audit is logged in `mission-control/15min-log.md` under the “doc audit” label) and retire files that haven’t been touched or cited in the log since creation. Archive retired artifacts under `mission-control/archive/` with a short reason so we can recover them if needed.
- When a file grows beyond 500 lines, reconsider whether it can be split into notes + links instead of one monstrous doc.

## Archiving Guidelines
- When you archive a file, include a short summary inside the new `mission-control/archive/README.md` so future agents know why it was moved and where to find it if the knowledge becomes relevant again.
- Prefer to fold archived content into existing canonical docs (e.g., `mission-control/intelligence-brief.md`, `mission-control/product-vision.md`, `MISSION_CONTROL.md`) before removing the file.
- Archived files count toward history, not the active backlog. Treat them as references, not living documents.

This governance ensures Mission Control stays lean, every artifact supports the r3ks bot product, and the priorities we can’t afford to forget are preserved in both logs and memory.