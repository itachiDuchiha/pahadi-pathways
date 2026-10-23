# Folder Structure

Generated from the tracked files under `src/`, `scripts/` and
`public/images/`, plus the root configuration files. Each entry is a
directory (or a root file) with a short note on what it holds.

## Root

- `README.md` — project overview, setup and deployment notes.
- `package.json` / `package-lock.json` — scripts, dependencies and the
  locked dependency tree.
- `tsconfig.json` — TypeScript configuration.
- `next.config.ts` — security headers and the report-only Content-Security-Policy.
- `eslint.config.mjs` — ESLint configuration.
- `postcss.config.mjs` — PostCSS/Tailwind configuration.
- `vitest.config.mts` — Vitest configuration (node environment).
- `.nvmrc` — pinned Node version.
- `.npmrc` — `engine-strict` setting.
- `.editorconfig` — editor formatting rules.
- `.env.example` — template for required environment variables.
- `.github/workflows/ci.yml` — CI pipeline (lint, typecheck, test, build).
- `docs/` — project documentation (this file and its siblings).

## `scripts/`

- `scripts/` — one-off Node scripts; currently the image optimizer
  (`optimize-images.mjs`) that re-encodes `public/images` to WebP.

## `public/images/`

- `public/images/` — site images (root-level files plus the folders below).
- `public/images/destinations/` — destination photography.
- `public/images/hero/` — hero banner images for the home page and section pages.
- `public/images/logo/` — logo assets.
- `public/images/packages/` — package photography.
- `public/images/packages/heroes/` — hero images for individual package detail pages.

## `src/app/` — routes (App Router)

- `src/app/` — root layout, global styles, home page, and top-level routes
  (`error.tsx`, `not-found.tsx`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`).
- `src/app/api/package-enquiry/` — `POST /api/package-enquiry` route.
- `src/app/api/trip-enquiry/` — `POST /api/trip-enquiry` route.
- `src/app/contact/` — contact page.
- `src/app/destinations/` — destinations listing page.
- `src/app/destinations/[slug]/` — destination detail page, statically generated.
- `src/app/experiences/` — experiences page.
- `src/app/gallery/` — gallery page.
- `src/app/llms-full.txt/` — `/llms-full.txt` route for AI crawlers.
- `src/app/llms.txt/` — `/llms.txt` route for AI crawlers.
- `src/app/packages/` — packages listing page; rendered on demand because it reads search params.
- `src/app/packages/[slug]/` — package detail page, statically generated.
- `src/app/privacy/` — privacy policy page.
- `src/app/reviews/` — reviews page.

## `src/components/`

- `src/components/destination-page/` — destination page templates
  (dedicated pages for Manali, Shimla and Spiti, a shared generic
  template, and the `registry.ts` that maps a slug to its page).
- `src/components/destinations/` — destination listing UI (card, hero, section).
- `src/components/forms/` — contact form and trip planner form.
- `src/components/gallery/` — gallery explorer UI.
- `src/components/home/` — homepage sections (hero, featured destinations,
  popular packages, testimonials, why-choose-us, call to action).
- `src/components/home/planner/` — hero planner popups (date, destination,
  traveller pickers) and the `useHeroPlanner` state hook.
- `src/components/layout/` — navbar, footer, floating action buttons and
  the shared `PlannerProvider`.
- `src/components/package-details/` — package detail page sections
  (overview, day timeline, stay plan, FAQ, terms, etc.).
- `src/components/package-details/booking/` — the booking panel (stay,
  meal, vehicle and traveller selectors, price summary, enquiry modal,
  `useBookingState`).
- `src/components/packages/` — package card and custom-journey CTA.
- `src/components/seo/` — `JsonLd` structured-data renderer.
- `src/components/ui/` — shared UI primitives (modal, review card,
  scrolling testimonials).

## `src/config/`, `src/data/`, `src/lib/`, `src/types/`

- `src/config/` — site configuration (name, URL, contact details) and its test.
- `src/data/` — static destination, package and testimonial data.
- `src/lib/` — SEO helpers, server-side pricing, structured data and
  `llms.txt` builders, each with a colocated test.
- `src/lib/enquiry/` — the shared enquiry pipeline: Zod schema, origin/body
  guards, in-memory rate limiter, HTML email templates, Resend mail
  sender and the route handler factory, each with a colocated test.
- `src/lib/hooks/` — shared hooks, currently `useTodayIso` and its test.
- `src/types/` — shared TypeScript types (e.g. testimonials).
