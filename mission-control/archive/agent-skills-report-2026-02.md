# Mission Control Agent Skills Research — 2026-02-21

## Objective
Survey the stored Mission Control research to surface the most valuable agent skills, assess whether we need new hires or training, and outline an actionable plan for a living catalog that powers the Mission Control dashboard product.

## Sources
- Mission Control research note: `memory/working/hint-agent-skills-20260220.md#L1-L23`
  (Vercel/Skillmatic/Augment/O-mega articles).

## Key insights (from the research note above)
1. **Treat each capability as a SKILL.md template** (metadata + guidance) so discovery is standardized, instructions can be progressively revealed, and resources stay tidy (Augment + Skillmatic). Packaging them this way lets agents plug into the right workflow without memorizing dozens of docs.
2. **Document purpose/prerequisites/steps/attachments** for each skill, mirroring the prioritized rule sets found in Vercel’s canonical guides (react best practices, design guidelines). That level of discipline encodes domain knowledge, lowers onboarding friction, and keeps the knowledge base human-friendly.
3. **Build a curated, phased catalog of skills** (Skillmatic’s Phase 1–4) that pairs fundamentals with ready-to-use packages, integration recipes, and benchmarks (Anthropic/Claude comparisons, LangChain tutorials). This lets each agent quickly assess whether a skill meets their immediate need or if they should upskill further.
4. **Favor modularity + progressive disclosure** (O-mega) so the catalog surfaces lightweight metadata first and only loads the heavy tactics when triggered by a cron signal, backlog tag, or skill request. That keeps token usage efficient while still providing depth across coding, automation, video, and governance scenarios.
5. **Instrument drops-in telemetry helpers** so applying a skill doesn’t require rewiring each agent—the helper logs `signal`, `agent`, `artifact`, `duration`, and `status`, and feeds the dashboard and retrospectives automatically.

## Recommendations for Mission Control
| Strategy | Action items | Purpose | Owner(s) |
| --- | --- | --- | --- |
| **Skill catalog** | Create `mission-control/skills/` with SKILL.md entries (cron health, KB reports, clarity audits, artifact templates). Each entry should include metadata, triggers, dependencies, and attachments. | Makes capabilities discoverable/reusable and supports the product narrative. | hint + torv with input from rams/kami for UX tone. |
| **Progressive loading** | Capture lightweight metadata (title, summary, signal) in a Convex table; store full instructions in docs (linked assets). Use cron tags/backlog signals to trigger the full instructions only when needed. | Keeps token costs low while still providing depth on-demand. | hint + torv (Convex table). |
| **Telemetry helper** | Build a small library or `mission-control/db/telemetry.json` helper that agents import to log `signal/agent/artifact/duration/status` every time they run a skill or heartbeat. Hook it into the dashboard so the telemetry feeds the progress bar and review notes. | Ensures consistent, instrumented data for the mission cockpit. | torv + r3ks (orchestrate). |
| **Skills 101 onboarding** | Produce a short, human-friendly “Agent Skills 101” doc referencing Skillmatic phase list, Anthropic/Claude/LC comparisons, and LangChain guides. Pair it with a quick training session or mini-project (e.g., build a Cron skill). | Helps new hires (or upskilling current agents) understand how to build, discover, and apply skills. | kami + hint (copy + research). |
| **Communications + persona refinement** | Have Kami iterate on each agent’s SOUL/WORKING language to sound human, while Rams uses design briefs to visualize how skills map to customer touchpoints. | Aligns the internal skill catalog with the customer experience narrative, making the product easier to sell/understand. | kami + rams. |

## Hiring vs. Training
- The research suggests the tooling/capabilities live in reusable skills rather than fixed personas. Therefore, we can **train existing agents** (hint/torv/rams/kami) to adopt new SKILL.md workflows instead of immediately recruiting new hires.
- If we need more coverage (e.g., dedicated automation ops or customer insights), we should extend the catalog with a new skill-specialist persona whose expertise lines up with the Phase 1–4 list rather than hiring arbitrarily. That way, the onboarding for new agents is just a matter of teaching them the same skill catalog.

## Next steps
1. Use this report as the agenda for the next cron/15-minute loop so the squad can ideate on which skills we build first. Document comments in `mission-control/15min-log.md` under a "skills" label.
2. Start the `mission-control/skills/` directory with the first few SKILL.md files (cron health, KB reporting, clarity check, instrumentation helper) and link them from a new Convex table.
3. Schedule a short training/check-in (maybe weekly) where each agent demonstrates applying a skill and logs the telemetry through the helper—this keeps the catalog alive and surfaces gaps promptly.

_Source: memory/working/hint-agent-skills-20260220.md#L1-L23_