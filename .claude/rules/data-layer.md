---
paths:
  - "src/**/*.{ts,tsx}"
---

# Storefront source constraints

- **All Medusa backend access goes through `src/lib/data/*`**, using the `sdk` from
  `lib/config.ts`. Components import those functions; they never call the SDK directly.
  Mutations follow the Server Action pattern of the neighbouring file (`cart.ts`,
  `customer.ts`, `orders.ts`).
- **Server Components by default.** Add `"use client"` only where hooks, events or browser APIs
  are genuinely needed. MUI components must live in client components.
- **Path aliases** `@lib/*`, `@modules/*`, `@components/*` — never deep relative imports.
- **No hardcoded user-facing strings.** Every one goes through `next-intl`.
- **Format money** with `lib/util/money.ts` / `lib/util/get-product-price.ts`, never by hand.
- No `console.log`, debug leftovers, or commented-out code in committed source.

`yarn build` is not a correctness check here — `next.config.js` ignores TypeScript and ESLint
errors. The gate is `yarn typecheck` + `yarn lint`.
