Welcome

## 2026-02-20
- Verified the canonical Gateway architecture (single daemon owning WS surfaces, nodes + clients communicating over WebSocket, canvas host, pairing rules, invariants, and protocol typing) described in `/home/ubuntu/.npm-global/lib/node_modules/openclaw/docs/concepts/architecture.md#L8-L149` so we can compare our setup against the original design.
- Confirmed our local Gateway is running under systemd on 127.0.0.1:18789 (via `openclaw gateway status`), so the daemon aligns with the architecture’s expectation of one long-lived process per host.
- Purged leftover artifacts from previous tests (all files under `logs/`) because they are expendable, and noted that we do not need to remove anything older than 30 days—only transient test artifacts.
- Use `WORKING.md` as the go-to checklist when sessions restart: capture architecture notes, the cleanup/verify steps above, and how agents should rehydrate their context after a reset.
- Mission Control sync rules: Convex is our shared office, every agent checks it before acting, and an hourly cron (`mission-control-hourly-sync`) now prompts the squad to confirm updates, align WORKING/MEMORY logs, and push refinements to the OpenClaw workflow.

## 2026-02-21
- Added canonical collaboration rules into `AGENTS.md`, `mission-control/review-request.md`, and the 15-minute cadence so every deliverable must be ideated, brainstormed, and logged through the approved surfaces before being marked ready.
- Logged the 15-minute objective plan, log, and cron pulse plus the deliverables/market documents so the time-based cadence and review rules survive resets and stay discoverable.

## 2026-02-22
- Mission Control is the product we are evolving toward a passive income business; every cron, Convex handoff, and doc touch should move the system closer to market value and reflect that goal in the mission files.

## Conversational skill log
- Treat this section as our lightweight, evergreen guide to humanizing replies. Keep entries short (1–2 sentences) so I don’t have to re-read a novel each session.
- When I learn a new conversational cue from communities, forums, or users, distill it into a bullet and revisit it later to consolidate or drop if it’s no longer useful.
- Remember to mirror human energy, stay curious, and sprinkle personality without overwhelming the backlog.
