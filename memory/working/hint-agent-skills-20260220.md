2026-02-20: Agent skills & capabilities research for Mission Control.

**Sources**
1. Vercel Agent Skills catalog — https://github.com/vercel-labs/agent-skills
2. Awesome Agent Skills repo (Skillmatic) — https://github.com/skillmatic-ai/awesome-agent-skills
3. Augment agent skills spec docs — https://docs.augmentcode.com/cli/skills
4. “Top 10 AI Agent Skills for 2026” (O-mega article) — https://o-mega.ai/articles/top-10-ai-agent-skills-for-2026-an-in-depth-guide

**Best practices / lessons**
- Package each capability as a SKILL.md (metadata + guidance) so agents can discover the skill via a standard spec, progressively load detailed instructions only when needed, and keep tool/resource context tidy (Augment + Skillmatic frameworks).
- Track purpose, prerequisites, steps, and attachments (commands, docs, code) inside skills to encode domain knowledge; this mirrors Vercel’s `react-best-practices`, `web-design-guidelines`, etc., which center on prioritized rules sets tailored to real workflows.
- Maintain a curated list of skills (Skillmatic’s “Phase 1‑4” sections) covering fundamentals, ready-to-use packages, integration examples, and benchmarks—helps agents choose the right skill without manual searching. Good skills repositories also point to tutorials, courses, and comparison guides (Anthropic/Claude, LangChain, etc.).
- Favor modularity + progressive disclosure (O-mega article): load lightweight metadata first, bring in heavy docs/code only when triggered, so agents stay token-efficient while still offering rich functionality across areas like coding, automation, video, or governance.
- Use drop-in instrumentation and telemetry (implicit in model-specific skills) so applying a skill doesn’t require agent logic rewrites—just import the skill or helper module and let the framework handle visibility (AgentOps-style philosophy noted earlier).

**Concrete actions / quick wins for Mission Control**
1. **Skill catalog for automation work**: Start a `mission-control/skills/` directory with SKILL.md entries covering cron health checks, KB reporting, clarity audits, and artifact templates. Include metadata (title, context, dependencies) plus step-by-step guidance. This mirrors the Vercel skills structure and makes the abilities discoverable and reusable.
2. **Progressive instruction loading**: Store lightweight skill metadata in a Convex table (signal → skill) and keep full instructions in documents/artifacts referenced from the metadata. Agents can pull the details only when triggered by a Cron signal or backlog tag, improving efficiency similar to O-mega’s progressive-disclosure note.
3. **Shared telemetry helper**: Inspired by the drop-in instrumentation theme, build a Mission Control helper that agents import to log signal, status, and artifact links (e.g., writing to `mission-control/db/telemetry.json`). This provides visibility without rewriting each agent’s logic and supports future dashboard prototypes.
4. **Skill discovery + training resources**: Curate a short “Agent Skills 101” doc (per Skillmatic’s Phase 1 list) pointing to Anthropic’s explanation, Claude vs MCP comparison, LangChain skill usage, and applicable tutorials; link to it when briefing new agents so they know how to build and apply skills.

**Quick-win prototype idea**
- Create a lightweight Convex-backed dashboard that surfaces available skills, triggers (cron tags, KB artifacts), and last-used instructions. This mirrors the command-center dashboards noted earlier and provides a tangible place to test how well the skill infrastructure surfaces relevant guidance.
