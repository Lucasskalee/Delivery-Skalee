# Onboarding — Skalee Delivery

## Prerequisites

- **Node.js**: `v24.x` (verified on `v24.13.0`)
- **Package Manager**: `npm` `11.x` (verified on `11.6.2`)
- **Git**: `2.x`
- **IDE / Agent Host**: Google Antigravity (reads `GEMINI.md`, `AGENTS.md`, `.agents/rules/`, and `.agents/skills/` automatically)

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Copy `.env.example` to `.env.local` if you need custom local overrides. The baseline application runs out-of-the-box without external credentials:
   ```bash
   cp .env.example .env.local
   ```

3. **Run the verification suite**:
   ```bash
   npm run check
   ```
   This runs:
   - `npm run lint:rules` (self-check of local ESLint rules in `eslint-rules/`)
   - `npm run typecheck` (`tsc -b --noEmit`)
   - `npm run lint` (fast ESLint tier)
   - `npm run lint:typed` (type-aware async safety ESLint tier)
   - `npm test` (Vitest domain and service unit tests)
   - `npm run build` (production Vite bundle)

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

## First Workflow in Google Antigravity

1. Read [`PRODUCT.md`](../PRODUCT.md) and [`AGENTS.md`](../AGENTS.md) to confirm scope and constraints.
2. Check [`docs/architecture.md`](architecture.md) before adding new modules:
   - Domain logic and centavo math go in `src/domain/`.
   - Data adapters and services go in `src/services/`.
   - Reusable UI components go in `src/components/`.
3. Run `npm run check` before concluding any task.

