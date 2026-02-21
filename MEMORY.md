Welcome

## 2026-02-20
- Verified the canonical Gateway architecture (single daemon owning WS surfaces, nodes + clients communicating over WebSocket, canvas host, pairing rules, invariants, and protocol typing) described in `/home/ubuntu/.npm-global/lib/node_modules/openclaw/docs/concepts/architecture.md#L8-L149` so we can compare our setup against the original design.
- Confirmed our local Gateway is running under systemd on 127.0.0.1:18789 (via `openclaw gateway status`), so the daemon aligns with the architecture’s expectation of one long-lived process per host.
- Purged leftover artifacts from previous tests (all files under `logs/`) because they are expendable, and noted that we do not need to remove anything older than 30 days—only transient test artifacts.
- Use `WORKING.md` as the go-to checklist when sessions restart: capture architecture notes, the cleanup/verify steps above, and how agents should rehydrate their context after a reset.
- Mission Control sync rules: Convex is our shared office, every agent checks it before acting, and an hourly cron (`mission-control-hourly-sync`) now prompts the squad to confirm updates, align WORKING/MEMORY logs, and push refinements to the OpenClaw workflow.