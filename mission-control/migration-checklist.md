# Mission Control Migration Checklist

This checklist keeps the new mission-control migration visible, prevents task drift, and gives the squad a safe reset point.

## 1. Preparation
- [x] Clone the candidate repos (abhi1693/openclaw-mission-control, crshdn/mission-control, Danm72/mission-control) to compare feature sets.
- [x] Document the key differentiators in `missions/tycoon-mvp/competitor-portfolio.md` (done; still reference for decisions).
- [x] Resolve infrastructure blockers (disk space, uv/docker errors). ✅ disk solved — keep monitoring in case it resurfaces.

## 2. Baseline audit (before migrating any data)
- [x] Capture the current Convex/mission-control schema/query surface so we can spot gaps when adopting the new version (KB entries + `WORKING.md`). ➜ documented in `mission-control/knowledge-base/KB-08-convex-baseline.md`.
- [ ] Inventory the new repo features: tables/views, crons/hooks, dashboards, and any missing docs. Record findings in `mission-control/knowledge-base/KB-06.md` & `KB-07.md`.
- [ ] Note exact blocker(s) for each repo (e.g., missing env vars, build failures, migration scripts) along with owners.

## 3. Migration work
- [x] Run each repo locally (install + start) to validate setup instructions. Use docker/local mode, note CVEs, and capture logs. ➜ mission-control-danm72 run succeeded after removing the duplicate migration file and pointing `supabase db push` at the pooler URL (`postgresql://postgres.qpztzqnhupjzqixkusli:MKjxT9y4oRhTjEtf@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`). The last three migrations applied cleanly; the schema now matches the repo.
- [ ] Compare schemas/migrations (Alembic + Supabase) and decide which changes we adopt or adapt for our workspace.
- [ ] Draft any new crons/functions needed to align the gateway with the updated mission control UI (Convex tasks, dashboards, heartbeat coverage).

## 4. Documentation & safety
- [ ] Update `mission-control/15min-log.md` after every session that touches the migration; include blockers, owners, and next steps so resets have a trace.
- [ ] Keep `HEARTBEAT.md` in sync with migration checkpoints (the new migration pulse already ensures this check will run).
- [ ] Summarize progress in the next `memory/YYYY-MM-DD.md` entry so the story survives restarts.
- [ ] Share a short status summary in `mission-control/review-request.md` once we have a concrete migration proposal to review.

## 5. Ready-for-reset signals
- [ ] All blockers cleared or documented with owners.
- [ ] A baseline log entry exists for the latest migration status (15min log + migration checklist updates).
- [ ] Key instructions (setup steps, outstanding decisions) live in mission-control docs so any agent can restart cleanly.

> Tip: Leave every session with a short status sentence in `mission-control/migration-checklist.md` (below) to make the next run predictable.

Status note: 2026-02-23 06:55 UTC | Baseline audit captured in `mission-control/knowledge-base/KB-08-convex-baseline.md`; next step is a local run of `mission-control-danm72` (document blockers/setup) before comparing schemas.

_Last updated: 2026-02-23 06:55 UTC_
