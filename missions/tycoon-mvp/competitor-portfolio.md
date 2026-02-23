# Mission Control Research Portfolio

## abhi1693/openclaw-mission-control (GitHub project from the video)
- **Value prop:** Operations + governance UI for OpenClaw. Work orchestration, approvals, gateway mgmt, audit, API-first automation.
- **Stack:** Installer shell script + Docker/local mode, backend/frontend (Python + Node), MIT license.
- **Standout:** Installer, auth modes (local/clerk), multi-org/board structure, documentation, active contributors. Sets the new baseline we need to eclipse.

## crshdn/mission-control
- **Value prop:** AI agent orchestration dashboard with task planning, agent system, gateway discovery, and event stream.
- **Stack:** Next.js 14, TypeScript, SQLite; includes Docker compose and security-first architecture (bearer tokens, HMAC webhooks).
- **Standout:** Rich Kanban pipeline (7 columns), AI planning flow (Q&A clarifiers), multi-machine + Tailscale support, fluid live feed, clear quickstart instructions.

## clawdeckio/clawdeck
- **Value prop:** Kanban dashboard + API for agent assignments. Emphasizes hosted option + self-hosted rails stack.
- **Stack:** Ruby on Rails 8.1, PostgreSQL, Hotwire + Tailwind, REST API.
- **Standout:** Hosted SaaS (clawdeck.io), emphasis on API-first access, GitHub OAuth/email authentication, detailed task API (status filtering, assign/unassign), priority model.

## Danm72/mission-control
- **Value prop:** Squad design + coordination layer with Supabase backend. Agents designed through conversational onboarding and then bootstrapped into OpenClaw.
- **Stack:** Next.js 15, pnpm monorepo, Supabase/PostgreSQL, Anthropic Claude for squad design.
- **Standout:** Squad bootstrap skill that writes SOUL.md, sets up heartbeat crons, and automates agent configuration via a skill. Deep integration with OpenClaw skill system.

## Implication for Tycoon
- **Goal:** Combine their reliability (installers, dashboards, APIs) with Tycoon’s narrative (Momentum Sprint, Discord command boards, review rituals). 
- **Action items:** Emphasize multi-board/approval structure, embed marketplace/skills concept, expose filtered APIs for dashboards, and consider bundling a "squad bootstrap" script similar to Danm72’s mission-control skill.
