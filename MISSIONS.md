# MISSIONS.md - Mission Control Doctrine

## Task Routing Doctrine
1. **Research & Planning**
   - `hint` gathers context, summarizes findings, and hands off structured recommendations.
   - The target execution agent(s) (torv, rams, kami) are identified in the recommendation output so work is routed deliberately.
2. **Execution & Advisory**
   - `torv` and `rams` operate as advisory systems: their findings stay in `/memory/advisory/` following their templates and never touch `MEMORY.md` unless r3ks approves a promotion.
   - `kami` drafts content in `/memory/working/` and waits for feedback before final publication.
3. **Promotion Authority**
   - `r3ks` alone determines what graduates from the daily/working/advisory logs into `MEMORY.md` and broader strategy documents.

## Memory Lifecycle Doctrine
- Daily work is logged under `/memory/working/` (per-agent timestamps) with append-only edits.
- Weekly compaction occurs during the Friday sync; r3ks distills summaries from `/memory/working/` and `/memory/advisory/` for promotion.
- Older entries move into `/memory/archives/` after promotion or once they cross the two-week retention window.
- Tag completed tasks with the pattern `@complete` (in logs or filenames) so searches and audits can filter easily.

## Agent Authority Reminder
- hint, torv, rams, and kami follow their authority tiers and report directly to r3ks before any cross-agent promotion or lifecycle decision.
- Any inter-agent handoff or policy exception requires explicit r3ks approval to keep the hierarchy intact.

## Looking Ahead
- We can add QA or Ops agents once the first task cycles reveal missing coverage; no need to onboard them until a concrete gap appears.
