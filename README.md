# The Himalayan Compass

A Next.js travel website for The Himalayan Compass, a Himachal Pradesh-focused
tour operator. It presents destinations and packages, lets visitors plan a
trip through a shared planner modal, and routes enquiries by email to the
operator. Content, images and prices are managed in Payload CMS, which runs
inside the same Next.js process and stores data in SQLite (Postgres is
supported as a configuration switch).

## Tech stack

- Next.js (App Router, server components)
- Payload CMS 3 (admin, content storage, media)
- SQLite by default, Postgres optional
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
cp .env.example .env.local   # then fill in the values, see below
mkdir -p data media
npm run payload migrate
npm run cms:seed
npm run dev
```

Open http://localhost:3000 to view the site. For local development set
`NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`; the admin only
accepts requests from that origin, so the login does not stick otherwise.

## Environment variables

`.env.example` lists the variables the app reads; copy it to `.env.local` and
fill in real values (`.env.local` is ignored by git via `.gitignore`).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key used to send enquiry emails through Resend. Without it (or the sender) no email is sent; enquiries are still stored. |
| `RESEND_FROM_EMAIL` | Verified sender address the enquiry emails are sent from. |
| `TRIP_ENQUIRY_EMAIL` | Fallback recipient when the admin's notification settings have no addresses for a source (see Notifications). |
| `NEXT_PUBLIC_SITE_URL` | Public base URL used for metadata, sitemap, canonical links and the CMS origin checks (defaults to `https://thehimalayancompass.in`). Set it to the dev origin, e.g. `http://localhost:3000`, for local development. |
| `PAYLOAD_SECRET` | Required. Signing secret for CMS sessions, at least 32 random characters (`openssl rand -hex 32`). The server refuses to start without it. |
| `DATABASE_ADAPTER` | `sqlite` (default) or `postgres`. |
| `DATABASE_URL` | Required. `file:./data/cms.db` for SQLite, `postgres://user:password@host:5432/db` for Postgres. |
| `MEDIA_DIR` | Directory where uploaded images are stored (default `media`, relative to the repository root). Use an absolute path outside the checkout in production. |
| `PAYLOAD_ADMIN_EMAIL` | Email of the first admin account, created only while there are no users. |
| `PAYLOAD_ADMIN_PASSWORD` | Password of the first admin account, at least 12 characters. Remove it from the environment once the account exists. |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server (site and CMS). |
| `npm run build` | Build the production bundle. Reads the database, which must contain published content. |
| `npm start` | Serve the production build (run `npm run build` first). |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run typecheck` | Run `tsc --noEmit`. |
| `npm test` | Run the Vitest suite. |
| `npm run images:optimize` | Re-optimize images in `public/images` (see Images below). |
| `npm run payload migrate` | Apply the committed database migrations (`src/cms/migrations/<adapter>/`). |
| `npm run payload migrate:create <name>` | Generate a migration after a collection or field change. |
| `npm run generate:types` | Regenerate `src/cms/payload-types.ts` from the CMS config. |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components. |
| `npm run cms:seed` | Fill empty collections with the bundled content and create the first admin (see Content management). |
| `npm run cms:seed -- --overwrite` | Reset every seeded item to the bundled content, reverting editor changes. |
| `npm run cms:prune-enquiries` | Optional: delete stored enquiries older than 24 months (pass a number of months); only if the owner adopts a retention limit. |
| `npm run cms:set-password -- --email <addr>` | Set a user's password from `NEW_PASSWORD` (see "Recovering the admin account"). |
| `scripts/deploy.sh` | Install, migrate, seed, build and restart on the server (see Deployment). |

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`,
`npm run typecheck`, `npm test`, then migrates and seeds a throwaway SQLite
database, fails if the CMS config needs a migration that is not committed
(`migrate:create --skip-empty` must create nothing), and runs
`npm run build` against it, on every push and pull request. The CI build only proves the code builds; it is not what gets
deployed.

## Project structure

Public routes live under `src/app/(frontend)` and the CMS routes under
`src/app/(payload)`; the CMS configuration is `src/payload.config.ts` plus
`src/cms` (collections, globals, access rules, migrations and the seed
content), and the site reads it through the typed data layer in
`src/lib/cms`. Components are in `src/components`, images in
`public/images`, and scripts in `scripts/`. See
[`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) for the full layout
and a one-line purpose per directory.

## Content management

The admin interface is served by the site itself at a private admin URL
that the owner knows; it is deliberately not written in any documentation,
`robots.txt`, the sitemap or `llms.txt`, and its pages send `noindex`.

### Roles

- **Editors** create, edit, publish and delete packages, destinations,
  testimonials, gallery items, experiences and media, edit the pricing
  tables, and read stored enquiries.
- **Admins** can do everything editors can, and additionally manage user
  accounts, edit the site settings (phone, WhatsApp, email, social links,
  tagline), the legal settings (grievance officer, data contact email,
  effective date, deletion window, retention statement shown on `/privacy`
  and `/terms`) and the notification settings (see Notifications), and
  delete enquiries.
- New accounts are editors unless an admin chooses otherwise. Logins lock
  for 15 minutes after 5 failed attempts.
- Every user can change their own password in the admin; only admins can
  change anyone's email address or role, so an editor cannot promote
  themselves.

### First admin

There is no public sign-up screen. When the Users collection is empty, the
server (on start) and `npm run cms:seed` create the first admin from
`PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD`; until both are set, the
admin shows a "not initialised" message. The values are never printed.
Once the account exists, remove the password from the environment and
change it in the admin.

### Recovering the admin account

If the admin password is lost (or the account is locked after failed
logins), set a new one from the server, where the database is reachable:

```bash
NEW_PASSWORD='a-new-password-of-12-or-more' npm run cms:set-password -- --email owner@example.com
```

The script reads `.env.local` like the seed, takes the password only from
the `NEW_PASSWORD` environment variable (never as an argument, so it stays
out of the process list), refuses passwords shorter than 12 characters,
clears any login lockout and prints only `Password updated for <email>`.
It works for any user, not just admins. Prefix the command with a space or
clear the shell history afterwards so the password is not kept there.

### What is editable and what is code

- Editable in the CMS: package content, itineraries, prices (base price per
  adult, per-vehicle rates and optional per-package stay and meal
  options), destinations (including whether a destination uses its
  dedicated layout or the shared one), testimonials, gallery images,
  experiences (text and icon name), the default stay, meal and vehicle
  pricing tables, site contact details, and all images.
- Stay and meal options are priced in rupees per booking per night (added
  once, regardless of the number of adults): a quote adds the option's
  delta per night times the package's nights (the `N` in its
  duration, so 6 for "6N / 7D"), rounded to the rupee. The pricing
  settings hold the site-wide defaults. A package can list its own stay or
  meal options; a filled-in list replaces the default list for that
  package entirely (rows are not merged by label), and an empty list uses
  the defaults. Vehicle upgrades, GST and the child rule always come from
  the pricing settings.
- Code: page layouts, the dedicated Manali, Shimla and Spiti destination
  pages, gallery videos, the experience icon set, the price calculation
  rules and the enquiry forms.
- Packages and destinations have drafts; only published versions appear on
  the site. Publishing revalidates the affected pages, so changes show up
  without a rebuild. Enquiries submitted on the site are stored under
  Leads as well as emailed.
- An image that a package, destination (cover or gallery), gallery item or
  experience still uses cannot be deleted; the admin names up to five of
  the documents that use it. Replace the image there first. Drafts count
  too.
- Replacing or editing an image revalidates every page, since an image can
  appear anywhere on the site.

### Notifications

The notification settings decide, separately for trip planner, contact
form and package enquiries, whether an email is sent and to whom.

- **Admins** can turn the email for a source on or off and list up to 10
  recipient addresses for it (each a valid address, no repeats). Editors
  can see the settings but not change them; visitors cannot read them.
- **Email off:** the enquiry is still stored under Enquiries and the
  visitor is told it was received; no email is sent.
- **No addresses listed:** the email goes to `TRIP_ENQUIRY_EMAIL` from the
  server environment, so an unconfigured screen never silently drops
  mail. If that is not set either, the enquiry is stored and the server
  logs "no recipients configured".
- The Resend API key and sender address stay in the environment
  (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`); they are not editable in the
  admin.
- The seed turns email on for every source and leaves the lists empty;
  re-running it never changes an admin's choices.

### Seeding

- `npm run cms:seed` is create-only: it fills collections and settings that
  are still empty with the bundled content from `src/cms/seed/` and the
  images in `public/images`, and skips anything already populated. It is
  safe to re-run and is part of every deploy.
- `npm run cms:seed -- --overwrite` resets every seeded item to the bundled
  content. **It reverts editor changes** to those items and asks for no
  confirmation; use it only on a fresh or throwaway database, or to
  complete a seed that was interrupted.

### Backups

Everything editors change lives in the database (`data/` for SQLite, i.e.
the file named in `DATABASE_URL`) and the media directory (`MEDIA_DIR`,
default `media/`). Neither is in git. Back up both together, for example
with a nightly copy to another machine; for SQLite, copy the database file
while the server is stopped so the copy is consistent. Stored enquiries
contain personal data. They are kept to maintain each visitor's enquiry
history, and deleted on request within the window set in the legal
settings (six months by default), as the privacy policy states.

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
   (`src/lib/enquiry/rate-limit.ts`). The client IP is read from
   `x-forwarded-for`, then `x-real-ip`, then `cf-connecting-ip`; when none
   is present the limiter is skipped and a warning is logged.
6. Validate the payload with a Zod schema (`src/lib/enquiry/schema.ts`).
7. Recompute package pricing on the server (`src/lib/pricing.ts`), using
   the prices stored in the CMS and the package's own stay and meal
   options where it has them, rather than trusting a client-submitted
   total. A stay or meal label must be one the package offers.
8. Store the enquiry in the CMS (Leads) and send the notification email via
   Resend (`src/lib/enquiry/mail.ts`). A stored enquiry counts as success
   for the visitor even if the email fails; the failure is logged.

**Known limitation:** the rate limiter keeps its counters in process
memory. On a serverless or multi-instance host, each instance has its own
counter, so the effective limit is per instance rather than global. There
is no CAPTCHA.

## SEO, AEO and GEO

- `src/app/(frontend)/sitemap.ts` and `src/app/robots.ts` generate
  `sitemap.xml` and `robots.txt`; `robots.txt` explicitly allows common
  AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot and others)
  alongside general search bots.
- `src/components/seo/JsonLd.tsx` and `src/lib/structured-data.ts` emit
  JSON-LD (organization and page-level structured data).
- `src/app/(frontend)/llms.txt/route.ts` and
  `src/app/(frontend)/llms-full.txt/route.ts` serve `/llms.txt` and
  `/llms-full.txt` for AI crawlers, built from helpers in `src/lib/llms.ts`.
- `src/app/opengraph-image.tsx` provides a default Open Graph image, used
  as a fallback on every page.
- `src/app/(frontend)/destinations/[slug]/page.tsx` and
  `src/app/(frontend)/packages/[slug]/page.tsx` use `generateStaticParams`
  to pre-render destination and package pages;
  `src/app/(frontend)/packages/page.tsx` reads search params and is
  rendered on demand rather than statically.

## Images

Images uploaded in the CMS are stored in `MEDIA_DIR`, re-encoded into
several sizes, and served by the CMS; they are not part of the build. The
bundled images under `public/images` (about 13 MB total, WebP with capped
dimensions) are the seed source and the site's fixed artwork. Run
`npm run images:optimize` after adding or replacing images to re-encode
and resize them with `scripts/optimize-images.mjs`. A few
package/destination hero images are still in the 300–432 KB range and are
candidates for further trimming (see `docs/TODO.md`).

## Deployment

Production is one long-lived Node server (for example a VPS) behind a
reverse proxy that terminates HTTPS. The build reads the live database, so
it runs on the server itself.

**`scripts/deploy.sh` is the only supported way to deploy.** On the server:

1. Clone the repository and create `.env.local` from `.env.example` with
   real values. Point `DATABASE_URL` and `MEDIA_DIR` at locations outside
   the checkout (for example `file:/srv/thc/data/cms.db` and
   `/srv/thc/media`) so they survive a fresh clone and are easy to back up.
2. Back up `data/` (or wherever `DATABASE_URL` points) and the media
   directory, then run `scripts/deploy.sh` after every pull. It refuses to
   run unless `PAYLOAD_SECRET`, `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL`
   are set (it reads `.env.local` first, executing it as shell, so keep it
   to plain `KEY=value` lines and writable only by the deploy user; it
   refuses to run when a value contains `$`, a backtick, or an unquoted `;`
   or `&`). It then
   runs `nvm use` when nvm is installed; for SQLite it creates the database
   directory and copies the current database to `<file>.bak-<timestamp>`
   (keeping the newest three); it creates `MEDIA_DIR` if it is missing;
   then it runs `npm ci`, `npm run payload migrate`, `npm run cms:seed`
   (fills only empty collections, creates the first admin only when there
   are no users), `npm run build`, and restarts the server. Expect a brief
   disruption while the build replaces the running build output and the
   server restarts.
3. The restart command defaults to `systemctl --user restart thc`, i.e. a
   systemd user unit named `thc` that runs `npm start` in the checkout.
   For another process manager set `APP_RESTART_CMD`, for example
   `APP_RESTART_CMD="pm2 reload thc" scripts/deploy.sh`.

A minimal user unit, saved as `~/.config/systemd/user/thc.service` (adjust
the paths; `PATH` must contain the nvm Node version because systemd does
not load nvm):

```ini
[Unit]
Description=The Himalayan Compass

[Service]
WorkingDirectory=/srv/thc/app
EnvironmentFile=/srv/thc/app/.env.local
Environment=NODE_ENV=production
Environment=PATH=/home/deploy/.nvm/versions/node/v24.22.1/bin:/usr/bin:/bin
ExecStart=/home/deploy/.nvm/versions/node/v24.22.1/bin/npm start
Restart=on-failure

[Install]
WantedBy=default.target
```

Enable it with `systemctl --user enable --now thc`. A user unit stops when
that user logs out unless lingering is enabled once with
`loginctl enable-linger <user>`.

The reverse proxy **must set `X-Forwarded-For` to the real client
address**, overwriting any value the client sent. The rate limiter reads
`x-forwarded-for` before `x-real-ip`, so setting only `X-Real-IP` is not
enough: a client-forged `X-Forwarded-For` would pass through and defeat the
limiter. Without the header the client address is unknown and the rate limiter is
skipped entirely, so enquiries are unlimited; the proxy must set the
header for the limiter to work. For nginx:
`proxy_set_header X-Forwarded-For $remote_addr;`. Serve the site over
HTTPS: in production the admin session cookie is `secure`.

CI must pass (`npm run lint`, `npm run typecheck`, `npm test`,
`npm run build`) before merging to the default branch.

## Switching to Postgres

Both database adapters are installed, so switching is configuration only.
The Postgres schema is a single `init` migration in
`src/cms/migrations/postgres/`, generated from the current configuration;
it already contains every change the SQLite history adds step by step
(optional gallery captions, the pricing fields, enquiries), because no
Postgres database existed before it.

1. Create an empty Postgres database (16 has been tested).
2. Set `DATABASE_ADAPTER=postgres` and
   `DATABASE_URL=postgres://user:password@host:5432/db` in `.env.local`.
3. Run `npm run payload migrate`.
4. Run `npm run cms:seed` once on the empty database (or simply run
   `scripts/deploy.sh`, which does both).
5. Media files are not stored in the database: keep the same `MEDIA_DIR`,
   or copy the media directory to the new location. A fresh seed uploads the
   bundled images again.

Existing SQLite content is **not** migrated automatically, and no
export/import tool is installed. After seeding, re-apply any edits made
since the original seed by hand in the admin (or keep the SQLite database
until they are re-entered). Future schema changes need a migration for
each adapter: run `npm run payload migrate:create <name>` once with each
`DATABASE_ADAPTER` against a database of that type.

## Known limitations

- The enquiry rate limiter is per server process and keeps its counters in
  memory (they reset on restart); there is no CAPTCHA.
- The rate limiter trusts `x-forwarded-for`; the reverse proxy must set
  `X-Forwarded-For` to the real client address, overwriting any
  client-sent value (setting only `X-Real-IP` is not enough; see
  Deployment). On a bare `next start` without a proxy the header can be
  forged.
- `npm run cms:seed -- --overwrite` reverts editor changes without a
  confirmation step.
- Media files are publicly readable by URL, including images attached only
  to drafts that are not published yet (accepted by the owner).
- The deploy builds in place: a failed `npm run build` leaves the site
  without a working build until it is fixed. To roll back, restore the
  newest `<database>.bak-<timestamp>` copy over the database file,
  `git checkout` the previous commit and run `scripts/deploy.sh` again.
- Gallery videos and experience icons are managed in code, not the CMS.
- There is no live preview of drafts in the admin.
- Media is stored on the server's disk, which suits a single server only.
- Moving from SQLite to Postgres does not copy existing content.
- The Content-Security-Policy header is sent as
  `Content-Security-Policy-Report-Only`, so it currently reports violations
  rather than blocking them.
- `/packages` renders on demand (it reads search params), unlike the
  statically generated destination and package detail pages.
- A few images are still 300–432 KB.
- There are no browser/E2E tests yet, only Vitest unit and integration
  tests.
