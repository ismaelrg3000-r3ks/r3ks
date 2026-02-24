# Model Cost Tracker

Track daily model usage and spending against the $3/day budget. Update after every run that calls a paid model (especially `openai/gpt-5.1-codex-mini`).

| Date (UTC) | Model | Calls | Estimated Tokens | Cost (USD) | Notes |
| --- | --- | --- | --- | --- | --- |
| 2026-02-23 | openai/gpt-5.1-codex-mini | 0 | 0 | 0.00 | Gateway work only so far, no Codex calls yet. |

## Notes
- **Haiku (Anthropic/haiku-4.0)**: use for general research (low cost). Record estimated tokens if you monitor. Aim to keep 90% of prompts on Haiku for budget control.
- **Codex (openai/gpt-5.1-codex-mini)**: reserve for critical code/deep reasoning. Batch prompts to reduce calls.
- **Claude/other mid-tier**: record under model name and keep costs summarized here along with any transitions.

## Daily Budget Check
- Daily limit: $3.00
- Current tally (today): $0.00
- Strategy reminder: start with Haiku, escalate only when needed. Log that decision in Notes when you switch.
