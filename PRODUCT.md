# Skalee Delivery — Product Specification

## Problem and objective

Local restaurants, stores, and delivery operations need a fast, mobile-first web application to receive customer orders, manage order preparation statuses, and coordinate courier deliveries without relying on high-commission marketplace intermediaries or complex desktop-only ERP interfaces.

**Skalee Delivery** provides a unified React + Vite + TypeScript web platform focused on clarity, low-latency order handling, accessible mobile and desktop workflows, and a multi-segment marketplace architecture (drinks & convenience, burgers, pizzas, bowls).

## Audience and roles

- **Customers (`customer`)**: Browse partner establishments, explore segmented catalogs, add items to a single-partner cart, checkout with delivery details, and track real-time order status.
- **Partner Operators (`partner`)**: Manage their specific establishment's catalog, opening hours, delivery fees, and order queue.
- **Store Attendants / Administrators (`admin`)**: View incoming orders across all establishments or filter by partner, advance lifecycle states (`pending` → `preparing` → `out_for_delivery` → `delivered` / `canceled`), and oversee operations.
- **Couriers (`courier`)**: View assigned deliveries, destination details, and confirm order handoff.

## Marketplace and Release Flows

1. **Marketplace & Directory Flow**: Customer browses partner establishments, searches by keyword or segment (drinks/convenience, burgers, pizzas, bowls), and inspects opening status, ratings, delivery fees, and estimated times.
2. **Partner Catalog & Single-Partner Cart Flow**: Customer explores a partner's digital menu. Items are scoped to that partner. If the customer attempts to add items from another partner, an accessible conflict dialog prompts to keep or switch the cart.
3. **Checkout & Order Dispatch Flow**: Customer submits the order with validated delivery address and integer-cent totals. The order is associated with the partner and enters the operational queue.
4. **Order Board & Multi-Partner Tracking Flow**: Store operators view the live order board filtered by status and partner establishment, advancing status with immediate feedback. Customers track their active order in real time.

## MVP Constraints and Decisions

1. **Monetary Precision**: All prices, subtotals, and delivery fees represented and calculated in integer cents (`centavos`) formatted via `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` to prevent floating-point rounding errors.
2. **Single-Partner Invariant**: Each order belongs to exactly one partner establishment for operational integrity.
3. **Demonstrative Local Persistence**: Cart and orders are safely persisted in `localStorage` with in-memory fallbacks, requiring zero remote database setup at this stage.
4. **Strict Layer Boundaries**: Presentation components (`src/components/`, `src/pages/`) consume typed domain/service modules (`src/services/`, `src/domain/`) rather than accessing low-level storage or database clients directly.

## Out of scope

- Migration to Next.js or Server-Side Rendering frameworks (the application strictly preserves **React + Vite + TypeScript**).
- Paid third-party SaaS observability, APM, or paid external APIs.
- Automated payment gateway settlement and remote database synchronization in this sprint.

## Acceptance criteria

- `npm run check` (`typecheck`, `lint`, `lint:typed`, `lint:rules`, `test`, `build`) passes with zero errors and zero warnings.
- `npm audit` reports zero vulnerabilities.
- Every production source file respects the 350-line budget (`quality/max-lines`).
- UI components do not import low-level data clients directly (`quality/no-direct-data-access`).
- Local development server (`npm run dev`) renders the Skalee Delivery marketplace cleanly with zero console/network errors.

## Maintenance

Update `PRODUCT.md` whenever scope, roles, constraints, or acceptance criteria change. Detailed architecture lives in [`docs/architecture.md`](docs/architecture.md) and setup evidence in [`docs/setup.md`](docs/setup.md).
