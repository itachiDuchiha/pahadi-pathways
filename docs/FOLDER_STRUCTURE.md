# Folder Structure

Generated from the tracked directories under `src/` and `scripts/`
(`git ls-files src scripts | xargs -n1 dirname | sort -u`), plus
`public/images/` and the root files. Each entry is a directory (or a root
file) with a short note on what it holds. The directory that holds the
admin pages is described but not named, because the admin URL is kept out
of the documentation.

## Root

- `README.md` — project overview, setup, content management, deployment
  and the Postgres switch.
- `package.json` / `package-lock.json` — scripts, dependencies, `npm audit`
  overrides and the locked dependency tree.
- `tsconfig.json` — TypeScript configuration (including the
  `@payload-config` alias).
- `next.config.ts` — Next.js configuration wrapped with Payload, security
  headers and the report-only Content-Security-Policy.
- `eslint.config.mjs` — ESLint configuration.
- `postcss.config.mjs` — PostCSS/Tailwind configuration.
- `vitest.config.mts` — Vitest configuration (node environment).
- `.nvmrc` — pinned Node version.
- `.npmrc` — `engine-strict` setting.
- `.editorconfig` — editor formatting rules.
- `.gitignore` — ignores builds, env files, the database (`data/`) and
  uploaded media (`media/`).
- `.env.example` — template for the environment variables.
- `AGENTS.md` / `CLAUDE.md` — notes for coding assistants.
- `.github/workflows/ci.yml` — CI pipeline (lint, typecheck, test, migrate
  and seed a throwaway database, build).
- `docs/` — project documentation (this file and its siblings).

## `scripts/`

- `scripts/` — operational scripts: `deploy.sh` (install, migrate, seed,
  build, restart on the server), `cms-seed.ts` (content seed),
  `cms-prune-enquiries.ts` (optional enquiry pruning) and
  `optimize-images.mjs` (re-encodes `public/images` to WebP).

## `public/images/`

- `public/images/` — bundled site images; also the source the seed uploads
  into the CMS media library.
- `public/images/destinations/` — destination photography.
- `public/images/hero/` — hero banner images for the home page and section pages.
- `public/images/logo/` — logo assets.
- `public/images/packages/` — package photography.
- `public/images/packages/heroes/` — hero images for individual package detail pages.

## `src/` and `src/app/` — routes (App Router)

- `src/` — `payload.config.ts`, the CMS configuration entry point.
- `src/app/` — the root `robots.ts` (with its test), the default
  `opengraph-image.tsx` and the favicon, shared by both route groups.
- `src/app/(frontend)/` — the public site: root layout, global styles, home
  page, `error.tsx`, `not-found.tsx` and `sitemap.ts`.
- `src/app/(frontend)/[...missing]/` — catch-all that returns the site's
  not-found page.
- `src/app/(frontend)/api/package-enquiry/` — `POST /api/package-enquiry` route.
- `src/app/(frontend)/api/trip-enquiry/` — `POST /api/trip-enquiry` route.
- `src/app/(frontend)/contact/` — contact page.
- `src/app/(frontend)/destinations/` — destinations listing page.
- `src/app/(frontend)/destinations/[slug]/` — destination detail page, statically generated.
- `src/app/(frontend)/experiences/` — experiences page.
- `src/app/(frontend)/gallery/` — gallery page.
- `src/app/(frontend)/llms-full.txt/` — `/llms-full.txt` route for AI crawlers.
- `src/app/(frontend)/llms.txt/` — `/llms.txt` route for AI crawlers.
- `src/app/(frontend)/packages/` — packages listing page; rendered on demand because it reads search params.
- `src/app/(frontend)/packages/[slug]/` — package detail page, statically generated.
- `src/app/(frontend)/privacy/`, `terms/` — privacy policy and terms pages
  (prose in `src/lib/legal-copy.ts`).
- `src/app/(frontend)/reviews/` — reviews page.
- `src/app/(payload)/` — the CMS route group: its layout and admin styles,
  plus a subdirectory (named after the private admin URL) holding the
  admin pages, their not-found page and the generated admin import map.
- `src/app/(payload)/api/[...slug]/` — the CMS REST API used by the admin
  and for serving media.

## `src/cms/` — Payload CMS

- `src/cms/` — generated `payload-types.ts`.
- `src/cms/access/` — access-control functions (published-only reads,
  editor/admin checks, server-only create), with tests.
- `src/cms/admin/` — custom admin views (the "not initialised" screen shown
  instead of a sign-up form).
- `src/cms/bootstrap/` — first-admin creation from the environment, with tests.
- `src/cms/collections/` — collection configs (packages, destinations,
  testimonials, gallery items, experiences, enquiries, media, users), with
  access tests.
- `src/cms/config/` — database adapter selection and security settings,
  with tests.
- `src/cms/fields/` — reusable fields (slug, image, string list).
- `src/cms/globals/` — pricing, site, legal and notification settings.
- `src/cms/hooks/` — revalidation of public pages on publish and the
  anonymous-create guard, with tests.
- `src/cms/migrations/postgres/` — committed Postgres migrations.
- `src/cms/migrations/sqlite/` — committed SQLite migrations.
- `src/cms/seed/` — bundled seed content, the media manifest, the seed and
  prune runner and the CLI wrapper, with integration tests.
- `src/cms/test/` — helper that boots Payload against a temporary SQLite
  database for integration tests.

## `src/components/`

- `src/components/destination-page/` — destination page templates
  (dedicated pages for Manali, Shimla and Spiti, the shared template, and
  the `registry.ts` that picks a page from the destination's layout field).
- `src/components/destinations/` — destination listing UI (card, hero, section).
- `src/components/forms/` — contact form and trip planner form.
- `src/components/gallery/` — gallery explorer UI.
- `src/components/home/` — homepage sections (hero, featured destinations,
  popular packages, testimonials, why-choose-us, call to action).
- `src/components/home/planner/` — hero planner popups (date, destination,
  traveller pickers) and the `useHeroPlanner` state hook.
- `src/components/legal/` — shared layout of the privacy and terms pages.
- `src/components/layout/` — navbar, footer, floating action buttons and
  the shared `PlannerProvider`.
- `src/components/package-details/` — package detail page sections
  (overview, day timeline, stay plan, FAQ, terms, etc.).
- `src/components/package-details/booking/` — the booking panel (stay,
  meal, vehicle and traveller selectors, price summary, enquiry modal,
  `useBookingState`).
- `src/components/packages/` — package card and custom-journey CTA.
- `src/components/seo/` — `JsonLd` structured-data renderer.
- `src/components/ui/` — shared UI primitives (modal, dialog hook, review
  card, scrolling testimonials).

## `src/config/`, `src/lib/`, `src/types/`

- `src/config/` — site configuration (name, URL, fallback contact details)
  and security headers, with tests.
- `src/lib/` — SEO helpers, server-side pricing, structured data and
  `llms.txt` builders, each with a colocated test.
- `src/lib/cms/` — the typed data layer the site reads content through:
  Payload client, queries, mappers from CMS documents to domain types,
  pricing tables, enquiry storage and the empty-database build guard, with
  tests.
- `src/lib/enquiry/` — the shared enquiry pipeline: Zod schema, origin/body
  guards and client-IP lookup, in-memory rate limiter, HTML email
  templates, Resend mail sender and the route handler factory, each with a
  colocated test.
- `src/lib/hooks/` — shared hooks, currently `useTodayIso` and its test.
- `src/types/` — shared TypeScript types (testimonials).
