# The Himalayan Compass

A Next.js travel website for The Himalayan Compass, a Himachal Pradesh-focused
tour operator. It presents destinations and packages, lets visitors plan a
trip through a shared planner modal, and routes enquiries by email to the
operator.

## Tech stack

- Next.js (App Router, server components)
- React
- TypeScript
- Tailwind CSS
- Zod (enquiry validation)
- Resend (transactional email)
- Vitest (unit tests)

## Requirements

- Node 24 (see `.nvmrc`)
- npm 11.9.0 (pinned via `packageManager` in `package.json`)

`.npmrc` sets `engine-strict=true`, so npm refuses to install on an
unsupported Node/npm version.

## Getting started

```bash
git clone <repository-url>
cd the-himalayan-compass
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 to view the site.

## Environment variables

`.env.example` lists the variables the app reads; copy it to `.env.local` and
fill in real values (`.env.local` is ignored by git via `.gitignore`).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key used to send enquiry emails through Resend. |
| `RESEND_FROM_EMAIL` | Verified sender address the enquiry emails are sent from. |
| `TRIP_ENQUIRY_EMAIL` | Mailbox that receives trip and package enquiry notifications. |
| `NEXT_PUBLIC_SITE_URL` | Public base URL used for metadata, sitemap and canonical links (defaults to `https://thehimalayancompass.in`). |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Build the production bundle. |
| `npm start` | Serve the production build (run `npm run build` first). |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run typecheck` | Run `tsc --noEmit`. |
| `npm test` | Run the Vitest suite. |
| `npm run images:optimize` | Re-optimize images in `public/images` (see Images below). |

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`,
`npm run typecheck`, `npm test` and `npm run build` on every push and pull
request.

## Project structure

The app lives under `src/app` (routes), `src/components`, `src/lib`,
`src/data`, `src/config` and `src/types`, with images in `public/images` and
a one-off image script in `scripts/`. See
[`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) for the full layout
and a one-line purpose per directory.

## Enquiry pipeline

Two API routes collect enquiries: `POST /api/trip-enquiry` (sources `trip`
and `contact`) and `POST /api/package-enquiry`. Both share the pipeline in
`src/lib/enquiry/`:

1. Reject requests whose declared body exceeds 16 KB.
2. Check the request's `Origin`/`Referer` against the site URL (same-host
   requests are also allowed, for local/preview use).
3. Read and parse the JSON body, enforcing the same 16 KB cap on bytes
   actually received.
4. Answer honeypot submissions (a hidden `website` field) immediately,
   before they consume a rate-limit slot.
5. Apply an in-memory rate limit of 5 requests per 10 minutes per IP
   (`src/lib/enquiry/rate-limit.ts`).
6. Validate the payload with a Zod schema (`src/lib/enquiry/schema.ts`).
7. Recompute package pricing on the server (`src/lib/pricing.ts`) rather
   than trusting a client-submitted total.
8. Send the notification email via Resend (`src/lib/enquiry/mail.ts`).

**Known limitation:** the rate limiter keeps its counters in process
memory. On a serverless or multi-instance host, each instance has its own
counter, so the effective limit is per instance rather than global. There
is no CAPTCHA.

## SEO, AEO and GEO

- `src/app/sitemap.ts` and `src/app/robots.ts` generate `sitemap.xml` and
  `robots.txt`; `robots.txt` explicitly allows common AI/answer-engine
  crawlers (GPTBot, ClaudeBot, PerplexityBot and others) alongside general
  search bots.
- `src/components/seo/JsonLd.tsx` and `src/lib/structured-data.ts` emit
  JSON-LD (organization and page-level structured data).
- `src/app/llms.txt/route.ts` and `src/app/llms-full.txt/route.ts` serve
  `/llms.txt` and `/llms-full.txt` for AI crawlers, built from helpers in
  `src/lib/llms.ts`.
- `src/app/opengraph-image.tsx` provides a default Open Graph image, used
  as a fallback on every page.
- `src/app/destinations/[slug]/page.tsx` and `src/app/packages/[slug]/page.tsx`
  use `generateStaticParams` to pre-render destination and package pages;
  `src/app/packages/page.tsx` reads search params and is rendered on
  demand rather than statically.

## Images

Images live under `public/images` (about 13 MB total) as WebP files with
capped dimensions. Run `npm run images:optimize` after adding or replacing
images to re-encode and resize them with `scripts/optimize-images.mjs`. A
few package/destination hero images are still in the 300–432 KB range and
are candidates for further trimming (see `docs/TODO.md`).

## Deployment

The app runs on any Node 24-compatible host, or on Vercel.

1. Set the four environment variables listed above on the host.
2. Build and run: `npm run build && npm start`.
3. CI must pass (`npm run lint`, `npm run typecheck`, `npm test`,
   `npm run build`) before merging to the default branch.

## Known limitations

- The enquiry rate limiter is per server instance, not global, on
  multi-instance/serverless hosts; there is no CAPTCHA.
- The rate limiter identifies clients by the first `x-forwarded-for`
  entry, so it relies on a trusted proxy or edge that sets that header
  (Vercel does); on a bare `next start` host without a proxy the header
  can be forged.
- The Content-Security-Policy header is sent as
  `Content-Security-Policy-Report-Only`, so it currently reports violations
  rather than blocking them.
- `/packages` renders on demand (it reads search params), unlike the
  statically generated destination and package detail pages.
- A few images are still 300–432 KB.
- There are no browser/E2E tests yet, only Vitest unit tests.
