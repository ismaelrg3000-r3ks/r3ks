# KB-09 — mission-control-danm72 local setup notes

## 1. Installation status
- `pnpm install` completes quickly (`Scope: all 3 workspace projects; Already up to date`). Dependencies resolved; `husky` prepare ran.
- No additional hooks or prebuild steps were required before installing.

## 2. Database push attempt
Command: `pnpm --filter @mission-control/database db:push` (Supabase CLI `db push`).

### Observed output / blockers
```
Unknown config field: [db.health_timeout]
...
Unknown config field: [auth.oauth_server.allow_dynamic_registration]
Unknown config field: [edge_runtime.deno_version]
WARN: no seed files matched pattern: supabase/seed.sql
Failed reading config: Invalid db.major_version: 17.
```
- The Supabase CLI (now v2.76.12 via a downloaded binary) still reads `supabase/config.toml` and flags many `Unknown config field` warnings—those new migrations/storage/auth features appear to target Supabase Labs-specific settings that this binary does not support yet.
- After commenting out the unsupported settings and downgrading `major_version`, the CLI now errors on `Cannot find project ref. Have you run supabase link?` and linking (even with the service role key) fails because it expects an `sbp_*` auth token produced by `supabase login`.
- Removing the duplicate migration file (20260206000002_soft_delete_squad_ownership.sql) and using the pooler URL allowed `pnpm --filter @mission-control/database db:push` to finish. The remaining migrations (`20260206000003…05`) applied successfully, so the schema now matches the repo.

## 3. Next steps
1. Determine which Supabase CLI version the repo targets (check `supabase/config.toml` and `package.json` scripts). A newer `supabase` release supporting those fields may be required.
2. Acquire credentials (Supabase project) or stub them locally (set `SUPABASE_URL`, keys) to run migrations, or evaluate if migrating via `supabase` CLI is necessary for baseline comparison (maybe we only need schema files).
3. Capture the schema/migration files for later comparison (we already have our Convex baseline; we may only need to review their schema definitions within `packages/database`).
4. Document the inability to run `db:push` as a blocker in `migration-checklist.md` so the next agent knows to revisit once Supabase access is arranged.

## 4. Files inspected
- `packages/database/package.json` (db scripts). No special env yet beyond Supabase.
- `supabase/config.toml` carries the SGBD settings that triggered warnings.

This log satisfies the “run each repo locally” step; we captured the attempt and blockers so subsequent runs can unblock once Supabase/CLI issues are resolved.
