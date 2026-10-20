@AGENTS.md

# Google Antigravity Host Configuration (`Skalee Delivery`)

This repository is configured for native discovery in **Google Antigravity (AGY)**:

- **Always-on workspace rules**: [`AGENTS.md`](AGENTS.md) and [`GEMINI.md`](GEMINI.md) at the repository root, plus modular rules in [`.agents/rules/`](.agents/rules/).
- **Progressive-disclosure workspace skills**: Located in [`.agents/skills/`](.agents/skills/) (`vercel-react-best-practices`, `vercel-composition-patterns`, `web-design-guidelines`, `writing-guidelines`, `vercel-react-view-transitions`, `find-skills`).
- **Subagent orchestration**:
  - Use `invoke_subagent` with `Model: "inherit"` by default (per Antigravity system rules).
  - Use `TypeName: "research"` for read-only codebase exploration and independent code/security reviews.
  - Use `TypeName: "self"` for isolated implementation waves following [`.agents/rules/parallel-subagent-driven-development.md`](.agents/rules/parallel-subagent-driven-development.md) (disjoint `Files:`, isolated `Resources:`, explicit `Depends-on:`, no subagent commits).
  - If Firebase Firestore rules (`firestore.rules`) are added in the future, always delegate rule authoring to `TypeName: "firestore-rules-author"`.
- **Layered memory**:
  - Durable product and architectural knowledge lives in [`PRODUCT.md`](PRODUCT.md) and [`docs/`](docs/).
  - Temporary multi-session handoffs use [`docs/task-handoff.template.md`](docs/task-handoff.template.md) or conversation artifacts.

