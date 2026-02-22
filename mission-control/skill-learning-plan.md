# Skill Learning & CEO Track Plan — 2026-02-21

## Objective
Expand Mission Control’s agent skills and deepen our CEO/business management capabilities so the squad is equipped to run the automation product and communicate the value story clearly.

---

## 1. Agent skills research + catalog expansion (hint-led)
1. **Scope**: Deepen the `mission-control/skills/` catalog with role-aligned SKILL.md entries (research diagnostics, telemetry helpers, UX storytelling, communication plays). Focus on metadata, triggers, attachments, and skill signals so the 15-minute pulse can call them on demand.
2. **Sources & inspiration**:
   - `memory/working/hint-agent-skills-20260220.md` (Vercel + Skillmatic + Augment + O-mega lessons) – already outlines best practices and quick wins.
   - External catalogs (Skillmatic, Vercel agent skills repo, Augment CLI docs) for metadata templates, progressive disclosure, and telemetry snippets.
3. **Actions**:
   - Hint: research + summarize new candidate skills (cron health, KB reporting, empathy check, telemetry helper); draft SKILL.md templates in `mission-control/skills/` with metadata + attachments.
   - Torv: help capture the Convex metadata table (e.g., `missionControlSkills`), wire the telemetry helper, and ensure each skill logs `signal/agent/artifact/duration/status` for the dashboard.
   - Rams + Kami: review the drafts, refine tone/transitions, and document the user-facing experience impact (log insights in `/memory/advisory/`).
   - **Daily community scan**: Use the `mission-control-news-check` cron (1:00 PM UTC) to revisit the MoltBook/OpenClaw community, gather new skill posts or use cases, and update the skills reading list/intelligence brief.
   - **Daily intelligence brief update**: After the scan, add a short entry to `mission-control/intelligence-brief.md` describing the new trend and your interpretation so the team (and you) stays current.
3.1 **Agent reference list**:
   - Build `mission-control/skills-reading.md`, a living doc where Hint collects articles/documentation for each agent (systems design/security for Torv, UX + experience patterns for Rams, communication + narrative templates for Kami, research/automation for Hint) to study and integrate into their skill sets. Log each resource with a short summary + action item (e.g., "systems design article → new instrumentation skill").
4. **Measurement**: Log each beat in `mission-control/15min-log.md` with the label `skills`, reference the architecture doc when deviations occur, and record telemetry via the helper.
5. **Timeline**: Start with two drafts today (telemetry helper + clarity audit). Review within this week, then schedule a short demo (15-minute beat) where each agent applies one new skill and logs the experience. 

---

## 2. CEO / Business Management mini-course track (self-study + shareable notes)
1. **Goal**: Build foundational CEO skills (strategy, finance, leadership, communication) through short, reputable courses and document key takeaways so the team can align the product and marketing story.
2. **Course candidates**:
   - **Harvard Business School Online — Entrepreneurship Essentials** (paid, certificate) for lean strategy and founder/CEO framing. [https://online.hbs.edu/courses/entrepreneurship-essentials/]
   - **MIT Open Learning free courses for entrepreneurs/innovators** (Communication for Managers, Leadership Development, You Can Innovate), great for modular, short modules. [https://openlearning.mit.edu/news/free-online-courses-mit-entrepreneurs-and-innovators]
   - **edX entrepreneurship/programs** (Harvard/MIT/Wharton either; we can audit for free) for market insights and operations modeling. [https://www.edx.org/learn/entrepreneurship]
   - **Alison free business courses** (business management, leadership, conflict management) for quick certificates and practical checklists. [https://alison.com/courses/business]
   - **Rutgers ExecEd short course** (Small Business & Entrepreneurship Certificate) for project-based confidence and coaching support if we want a deeper sprint. [https://execed.rutgers.edu/programs-for-individuals/leadership-and-management/small-business-management-and-entrepreneurship/]
3. **Plan**:
   - Week 1: Review course outlines, select 2–3 micro-modules (Harvard entrepreneurship for strategy + MIT communication for managers for narrative). Record summaries in `mission-control/business-learning.md`.
   - Week 2: Apply learnings by updating the Mission Control narrative (progress bar copy, review note, or pitch doc) and summarizing the impact (log in `mission-control/15min-log.md`).
   - Weekly: Share a short briefing in `mission-control/market-insights.md` describing the CEO insight of the week and how it translated into our product story.
4. **Support**: Gain help from Kami for translating course terminology into customer-friendly copy; have Rams integrate the insights into UX narratives (e.g., mapping course frameworks to the Kanban/feed/progress panels).
5. **Tracking**: Use a simple table inside `mission-control/business-learning.md` to mark which modules were completed, key takeaways, and action items for the product.

---

## Next steps
1. Share this plan by dropping it into `mission-control/15min-log.md` as part of today’s pulses so the squad knows the learning focus.
2. Ask Hint to begin the skills catalog research (SKILL.md drafts + Convex metadata); log progress in the new skills directory.
3. Begin the CEO course sampling this week—pick one short module (e.g., MIT Communication for Managers) and log the insights + translation to Mission Control in `mission-control/business-learning.md`.

Let me know if you want me to coordinate a short sync once the first skill demos/course summaries are ready.
