# Skalee Delivery — Shared Agent Instructions

## Product and stack

- **Product and scope**: [`PRODUCT.md`](PRODUCT.md).
- **Stack**: React 19, Vite, TypeScript 5 (strict), ESLint 9 (flat config + local `quality/*` rules + typed async rules), Vitest, Node.js `v24.13.0`, `npm` `11.6.2`.
- **Architecture & boundaries**: [`docs/architecture.md`](docs/architecture.md).
- **UI & accessibility**: [`docs/design.md`](docs/design.md).
- **Quality gates & security review**: [`docs/quality.md`](docs/quality.md) and [`docs/prompts/security-review.md`](docs/prompts/security-review.md).
- **Setup evidence & coverage matrix**: [`docs/setup.md`](docs/setup.md).

## Canonical commands

Run these commands from the repository root (`d:\Delivery-Skalee`):

- **Install**: `npm install`
- **Develop**: `npm run dev`
- **Fast Lint**: `npm run lint`
- **Typed Async Lint**: `npm run lint:typed`
- **Local Lint Rules Self-Check**: `npm run lint:rules` (`node eslint-rules/verify.mjs`)
- **Typecheck**: `npm run typecheck` (`tsc -b --noEmit`)
- **Tests**: `npm test` (`vitest run`)
- **Build**: `npm run build`
- **Verify Foundation (Full Gate)**: `npm run check` (`npm run lint:rules && npm run typecheck && npm run lint && npm run lint:typed && npm test && npm run build`)

## Hard constraints

1. **Preserve the Stack**: Keep **React + Vite + TypeScript**. Never migrate to Next.js or introduce SSR frameworks.
2. **No Paid Services**: Never introduce paid SaaS services, paid APIs, or external telemetry SDKs without explicit user authorization.
3. **Monetary Precision**: Represent currency values in integer cents (`centavos`) and format with `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`.
4. **Architecture Boundaries**: UI components (`src/components/**`, `src/pages/**`, `*.tsx`) must never import low-level data clients (`@/services/data-client`) directly; always go through domain services (`src/services/**`).
5. **File Size & Logging**: Keep production files under **350 lines** (`quality/max-lines`) and use `src/lib/logger.ts` instead of raw `console.*` (`quality/no-direct-console`).
6. **Design System & UI Invariants**: Always consult [`docs/design.md`](docs/design.md) before making any UI, visual style, or component changes. Adhere strictly to Skalee design tokens, safe areas (`env(safe-area-inset-*)`), 44x44px minimum tap targets, and accessibility criteria. Never introduce arbitrary colors or bypass tokens.

## Working agreements

- Read relevant code and instructions before editing. State assumptions that affect behavior or scope.
- **Design System First**: Consult [`docs/design.md`](docs/design.md) before modifying or creating visual components, styles, or layouts. Reuse existing design tokens, components, and accessibility patterns.
- **Ponytail (`full`)**: Complete the request with the smallest sufficient change. Reuse existing patterns, components, and dependencies. Do not create speculative abstractions, extra layers, or unrequested features.
- **Caveman**: Keep conversation responses concise and direct in the user's language (`pt-BR` by default), preserving clarity and full explanations when requested. Write code, comments, documentation, and commits in normal, clear prose.
- **Superpowers**: Scale the workflow proportionally to scope (*Understand → Design/Plan when nontrivial → Implement → Verify → Review*). Explicit user instructions and already-authorized plans take precedence over repeated approval gates.
- Preserve local changes, validation, error handling, security, accessibility, and explicit requirements.
- Run `npm run check` after code changes. Test relevant domain logic and regressions.
- Publishing, pushing, messaging third parties, costs, and destructive actions require explicit user authorization.

## Execution continuity

- During authorized work, answer status questions and resume remaining actions. Stop immediately if the user asks to pause or changes the objective.
- A blocker stops only dependent tasks. Complete independent tasks that remain safe and authorized.
- When resuming multi-session work, verify actual files, Git state, and checks before trusting any handoff notes. Use [`docs/task-handoff.template.md`](docs/task-handoff.template.md) only when work spans sessions.

## Installed project skills (`.agents/skills/`)

Loaded on demand by Google Antigravity and compatible agents:

- `vercel-react-best-practices`: React rendering, hooks, state management, and bundle discipline.
- `vercel-composition-patterns`: Component composition and clean prop APIs when building reusable UI.
- `web-design-guidelines`: Accessibility, keyboard navigation, focus states, forms, and responsive mobile-first review.
- `writing-guidelines`: Documentation and UI copy clarity.
- `vercel-react-view-transitions`: View transitions when requested (respecting `prefers-reduced-motion`).
- `find-skills`: Discovering additional official skills when a concrete gap arises.

## Global capabilities available in Google Antigravity

- **Browser & A11y Inspection**: `chrome-devtools`, `a11y-debugging`, `debug-optimize-lcp`, `memory-leak-debugging` (via `chrome-devtools-plugin`).
- **Firebase Integration (if selected for backend)**: `firebase-auth-basics`, `firebase-firestore`, `firestore-rules-creation`, `firebase-security-rules-auditor`, and the `firestore-rules-author` subagent.
- **Security Review**: Reusable read-only baseline/diff review prompt in [`docs/prompts/security-review.md`](docs/prompts/security-review.md).

## Delegation and review

- Follow [`.agents/rules/parallel-subagent-driven-development.md`](.agents/rules/parallel-subagent-driven-development.md) when dispatching parallel subagents via `invoke_subagent`.
- Preserve `Model: "inherit"` unless the user explicitly requests a different tier.
- One writer per file; the coordinator owns `package.json`, `package-lock.json`, shared configs, and Git operations.
- Parallel reviewers (`research` subagent) run read-only and report findings with file/line evidence.

