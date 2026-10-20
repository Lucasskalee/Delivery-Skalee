# Quality Gates and Verification — Skalee Delivery

## Canonical Commands

| Command | Script | What It Proves |
|---|---|---|
| `npm run lint:rules` | `node eslint-rules/verify.mjs` | Local ESLint plugin (`quality/max-lines`, `quality/no-direct-console`, `quality/no-direct-data-access`) passes 100% of `RuleTester` cases. |
| `npm run typecheck` | `tsc -b --noEmit` | Strict TypeScript compilation across app (`tsconfig.app.json`) and tooling (`tsconfig.node.json`). |
| `npm run lint` | `eslint .` | Fast syntactic ESLint tier: React Hooks rules, React Refresh, TypeScript strictness, 350-line budget, console ban, and layer boundary checks. |
| `npm run lint:typed` | `eslint . --config eslint.typed.config.mjs` | Focused type-aware ESLint tier: `@typescript-eslint/no-floating-promises` and `@typescript-eslint/no-misused-promises` at `error`. |
| `npm test` | `vitest run` | Unit and domain tests covering centavo calculations, order state transitions, and service boundaries. |
| `npm run build` | `tsc -b && vite build` | Production bundle generation and asset verification. |
| `npm run check` | Combined pipeline | Runs `lint:rules`, `typecheck`, `lint`, `lint:typed`, `test`, and `build` sequentially. |

## Baseline Quality Rules

1. **Strict TypeScript**: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`.
2. **File Size Budget (`quality/max-lines`)**: Maximum **350 lines** per production source file (`error`). Test files are monitored at `warn` (`includeTests: true`).
3. **Structured Logging (`quality/no-direct-console`)**: Direct `console.*` calls are banned in production code (`error`); use `src/lib/logger.ts`.
4. **Data Layer Isolation (`quality/no-direct-data-access`)**: Presentation files (`src/components/**`, `src/pages/**`, `*.tsx`) cannot import `@/services/data-client` directly (`error`).
5. **Focused Type-Aware Async Gate (`lint:typed`)**: Enforces `@typescript-eslint/no-floating-promises` and `@typescript-eslint/no-misused-promises` at `error` using TypeScript `projectService: true`.

## Testing Strategy

- **Domain & Service Unit Tests (`src/domain/*.test.ts`, `src/services/*.test.ts`)**: Verify order total calculations in integer cents (`centavos`), delivery fee waivers, and valid/invalid order status transitions.
- **Local Rule Self-Check (`eslint-rules/verify.mjs`)**: Verifies AST selectors and path normalization on Windows and POSIX paths.
- **UI & Accessibility Verification**: Uses `.agents/skills/web-design-guidelines/SKILL.md` and Google Antigravity's `chrome-devtools` / `a11y-debugging` skills against the local Vite server.

## Review After Implementation or Fixes

- Scope reviews by risk and actual diff.
- For nontrivial changes, dispatch a read-only `research` subagent in Google Antigravity to inspect the diff, connected callers, contracts, and tests.
- Complete work only when findings are resolved or explicitly dispositioned and `npm run check` passes.

## Security Review

- **Reusable Prompt**: [`docs/prompts/security-review.md`](prompts/security-review.md) (adapted from Vibe Coding Toolkit `13-security-review.md` at revision `de66fe371a49f5a4d3b521759e5c401f390b6424`).
- **Default Mode**: Read-only repository baseline or diff review; reports are redacted and stored outside the repository (in the Antigravity conversation `scratch/` directory).
- **Focus Areas**: Client bundle environment variable leaks (`VITE_*`), DOM XSS sinks, order pricing/status invariants, and dependency audits (`npm audit`).

