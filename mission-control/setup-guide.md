# Tycoon Mission Control Setup Guide

This playbook mirrors the clarity of the open-source `abhi1693/openclaw-mission-control` installer by summarizing how to bootstrap the Tycoon cockpit.

## Deployment modes
- **Docker (production-like)** — Run the Tycoon stack using `docker compose -f compose.yml --env-file .env up -d --build`. Use this for multi-agent teams and when you want persistence between restarts.
- **Local (development)** — Install Node.js ≥ 22 + Python/uv, run `make setup`, `make backend-migrate`, `make frontend-build`, and then `npm run start`/`uvicorn`. Use this when hacking on the mission docs, dashboards, or templates.

## Configuration baseline
1. Copy `.env.example` → `.env`; backend/frontend have their own `.env` examples as well.
2. Set the following keys (mirroring the installer fields):
   - `BACKEND_PORT`, `FRONTEND_PORT`, `AUTH_MODE` (local or clerk), `LOCAL_AUTH_TOKEN`, `NEXT_PUBLIC_API_URL`, `CORS_ORIGINS`, `NEXT_PUBLIC_AUTH_MODE`.
   - Add gateway metadata: `GATEWAY_HOSTS`, `GATEWAY_NAMES`, so the dashboard can display multi-gateway views.
3. For local mode with Docker-backed database, set `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`. Otherwise, point `DATABASE_URL` externally.

## Automation safety nets
- Generate a random token (`openssl rand -hex 32`) for `LOCAL_AUTH_TOKEN` when using shared auth.
- Keep a `LOG_DIR` similar to the installer so backend/frontend logs can be checked quickly for sanity or approvals.
- Schedule a cron-based heartbeat that writes to `mission-control/15min-log.md` so the audit trail stays updated.

## Governance surfaces to build
- Add a board called `Approvals` with custom fields (task owner, approver, priority, status).
- Track approvals via `status/dashboard-data.json` entries (e.g., `approvalQueue`) so the command board shows sensitive operations waiting for sign-off.
- Mirror the `skills marketplace` concept by maintaining a `skills/tycoon` folder with templates (briefs, review requests, dashboards) that any agent can install.

## Recommended commands
```
# Docker bootstrap (Tycoon production mode)
docker compose -f compose.yml --env-file .env up -d --build

# Local development
make setup
make backend-migrate
make frontend-build
npm run dev -- --hostname 0.0.0.0 --port 3000
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## What to watch
- Confirm the `mission-control` UI connects to the right API URL (`NEXT_PUBLIC_API_URL`).
- Ensure the dashboard reads `status/dashboard-data.md` so any bot posting to Discord can show up-to-date status, blockers, and next actions.
- Keep the `missions/tycoon-mvp/` folder synced with the live dashboard contents so Meridian can repurpose them for embeds when the blueprint is ready.
