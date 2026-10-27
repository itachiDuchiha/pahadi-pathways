# The Himalayan Compass

## Project Overview

**Project Name:** The Himalayan Compass

**Purpose:**
A modern travel website focused on handcrafted Himalayan journeys. The company launches with Himachal Pradesh tours, helping travellers book hotels, taxis, tour packages, and custom itineraries while connecting them with trusted local providers. The platform is designed to expand to other Himalayan destinations in the future.

---

## Tech Stack

- Next.js (App Router)
- Payload CMS 3 (SQLite by default, Postgres supported)
- React
- TypeScript
- Tailwind CSS
- Zod
- Resend
- Vitest

---

## Status as of 2026-10-27

The site's content, images and prices are now managed in Payload CMS,
which runs inside the Next.js app. The rebrand to The Himalayan Compass is
complete.

### Content management

- Packages, destinations, testimonials, gallery items, experiences and
  media are CMS collections; stay, meal and vehicle pricing tables and the
  site contact details are CMS globals. The public pages read them through
  the typed data layer in `src/lib/cms/`.
- Editors manage content, media and prices and read stored enquiries;
  admins additionally manage users, site and legal settings and enquiry
  deletion.
  The admin lives at a private URL known to the owner and is not linked or
  listed anywhere public.
- There is no open sign-up: the first admin is created from
  `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` while there are no users.
- Packages and destinations have drafts; publishing revalidates the
  affected pages. The build fails if the database has no published
  packages.
- `npm run cms:seed` fills empty collections from the bundled content
  (create-only by default; `--overwrite` resets seeded items).
  `npm run cms:prune-enquiries` is optional, only if the owner adopts a
  retention limit; enquiries are otherwise kept and deleted on request.
- SQLite is the default database; a Postgres `init` migration is committed
  and was rehearsed end to end (migrate, seed, build) against Postgres 16.

### Pages and routing

- Public pages live in the `src/app/(frontend)` route group and the CMS in
  `src/app/(payload)`. Home, destinations listing, destination detail,
  packages listing, package detail, contact, experiences, gallery, reviews
  and privacy pages are server components with page-level `metadata`.
- Destination detail (`/destinations/[slug]`) and package detail
  (`/packages/[slug]`) pages use `generateStaticParams` and are statically
  generated at build time from the database. `registry.ts` picks a
  dedicated page (Manali, Shimla, Spiti) or the shared template from each
  destination's layout field.
- The packages listing page (`/packages`) reads search params and is
  rendered on demand rather than statically.

### Enquiry system

- Two API routes, `POST /api/trip-enquiry` and `POST /api/package-enquiry`,
  share a validation and delivery pipeline in `src/lib/enquiry/`: an
  origin check, a 16 KB body-size cap, a honeypot field, an in-memory
  rate limit of 5 requests per 10 minutes per IP, Zod schema validation,
  storage in the CMS and email delivery through Resend.
- Package pricing is recomputed on the server from the prices stored in
  the CMS instead of trusting client-submitted totals.
- The rate limiter is per server process; when no client IP header is
  present it is skipped (and logged) rather than shared. The reverse proxy
  must forward the real client IP. There is no CAPTCHA.

### SEO, AEO and GEO

- `sitemap.xml` and `robots.txt` are generated from
  `src/app/(frontend)/sitemap.ts` and `src/app/robots.ts`; `robots.txt`
  explicitly allows common AI/answer engine crawlers and keeps crawlers out
  of the CMS API.
- JSON-LD structured data is emitted via `src/components/seo/JsonLd.tsx`
  and `src/lib/structured-data.ts`.
- `/llms.txt` and `/llms-full.txt` are served for AI crawlers, built from
  `src/lib/llms.ts`.
- A default Open Graph image (`src/app/opengraph-image.tsx`) is used as a
  fallback on every page.

### Security

- `src/config/headers.ts` sets `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security`
  headers, plus a Content-Security-Policy sent as
  `Content-Security-Policy-Report-Only` (reporting only, not yet enforced).
  The admin routes get their own policy and a `noindex` header.
- The CMS requires `PAYLOAD_SECRET`, restricts CORS/CSRF to the site URL,
  disables GraphQL, uses `httpOnly` session cookies (`secure` in
  production), locks logins after 5 failures and accepts only image
  uploads.
- `npm audit --omit=dev` is clean, with three dependency overrides
  documented in `docs/TODO.md`.
- Privacy policy (`/privacy`) and terms (`/terms`) pages are in place; their
  variable facts (grievance officer, data contact, effective date, deletion
  window) come from the legal settings, and the consent line under each
  form links both.

### Images

- Uploaded images are stored in `MEDIA_DIR` and served by the CMS in
  several sizes. The bundled images in `public/images` (about 13 MB, WebP)
  are the seed source; `npm run images:optimize` re-optimizes them.

### Tests, CI and deployment

- 276 Vitest tests across 31 files cover site configuration, SEO helpers,
  pricing, the enquiry pipeline, structured data, CMS access control,
  fields, hooks, mappers, the data layer and the seed (integration tests
  run against a temporary SQLite database).
- `.github/workflows/ci.yml` runs `npm ci`, lint, typecheck and tests, then
  migrates and seeds a throwaway SQLite database and builds against it.
- `scripts/deploy.sh` is the supported deployment: it refuses to run
  without the required environment, then installs, migrates, seeds,
  builds and restarts the server (default `systemctl --user restart thc`,
  overridable with `APP_RESTART_CMD`). It was rehearsed on a fresh clone.
- There are no browser or end-to-end tests yet.

### Intentionally deferred

- Moving production to Postgres (the path is ready; existing SQLite
  content would have to be re-entered).
- Live preview of drafts, gallery videos in the CMS, and S3-style media
  storage for a multi-server setup.
- Enforcing the Content-Security-Policy (moving off report-only) after a
  monitoring period.
- An external, shared rate limiter and a CAPTCHA for the enquiry APIs.
- Browser/end-to-end tests, analytics, error reporting.
- Further trimming of the largest remaining images.

See `docs/TODO.md` for the full list of open items.
