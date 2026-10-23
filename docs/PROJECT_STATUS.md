# The Himalayan Compass

## Project Overview

**Project Name:** The Himalayan Compass

**Purpose:**
A modern travel website focused on handcrafted Himalayan journeys. The company launches with Himachal Pradesh tours, helping travellers book hotels, taxis, tour packages, and custom itineraries while connecting them with trusted local providers. The platform is designed to expand to other Himalayan destinations in the future.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Zod
- Resend
- Vitest

---

## Status as of 2026-10-23

The rebrand to The Himalayan Compass is complete; there is no remaining
Pahadi Pathways naming in the app.

### Pages and routing

- Home, destinations listing, destination detail, packages listing,
  package detail, contact, experiences, gallery, reviews and privacy
  pages are all implemented as server components with page-level
  `metadata`.
- Destination detail (`/destinations/[slug]`) and package detail
  (`/packages/[slug]`) pages use `generateStaticParams` and are statically
  generated at build time. Destination pages are resolved through
  `src/components/destination-page/registry.ts`, which maps a slug either
  to a dedicated page (Manali, Shimla, Spiti) or to the shared generic
  template.
- The packages listing page (`/packages`) reads search params and is
  rendered on demand rather than statically.
- `error.tsx` and `not-found.tsx` provide error and not-found handling
  with correct status codes.

### Enquiry system

- Two API routes, `POST /api/trip-enquiry` and `POST /api/package-enquiry`,
  share a validation and delivery pipeline in `src/lib/enquiry/`: an
  origin check, a 16 KB body-size cap, a honeypot field, an in-memory
  rate limit of 5 requests per 10 minutes per IP, Zod schema validation,
  and email delivery through Resend.
- Package pricing is recomputed on the server (`src/lib/pricing.ts`)
  instead of trusting client-submitted totals.
- The rate limiter is intentionally per server instance (an accepted
  trade-off, documented in `src/lib/enquiry/rate-limit.ts`); there is no
  CAPTCHA.

### SEO, AEO and GEO

- `sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts`
  and `src/app/robots.ts`; `robots.txt` explicitly allows common AI/answer
  engine crawlers.
- JSON-LD structured data is emitted via `src/components/seo/JsonLd.tsx`
  and `src/lib/structured-data.ts`.
- `/llms.txt` and `/llms-full.txt` are served for AI crawlers, built from
  `src/lib/llms.ts`.
- A default Open Graph image (`src/app/opengraph-image.tsx`) is used as a
  fallback on every page.

### Security

- `next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security`
  headers, plus a Content-Security-Policy sent as
  `Content-Security-Policy-Report-Only` (reporting only, not yet enforced).
- A privacy policy page (`/privacy`) and a consent notice are in place.

### Images

- Site images were converted to WebP and have capped dimensions
  (`public/images` is about 13 MB total). A few package/destination hero
  images remain in the 300–432 KB range. `scripts/optimize-images.mjs`
  (run via `npm run images:optimize`) re-optimizes images after they are
  added or replaced.

### Tests and CI

- 71 Vitest unit tests across 11 files under `src/**/*.test.ts` cover site
  configuration, SEO helpers, pricing, the enquiry schema/guards/rate
  limiter/HTML/handler pipeline, structured data, the `llms.txt` builders
  and the `useTodayIso` hook.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`,
  `npm run typecheck`, `npm test` and `npm run build` on every push and
  pull request.
- There are no browser or end-to-end tests yet.

### Intentionally deferred

- Enforcing the Content-Security-Policy (moving off report-only) after a
  monitoring period.
- An external, shared rate limiter (for example Redis-backed) and a
  CAPTCHA for the enquiry APIs, to replace the current per-instance
  in-memory limiter.
- Browser/end-to-end tests.
- Analytics.
- Further trimming of the largest remaining images.

See `docs/TODO.md` for the full list of open items.
