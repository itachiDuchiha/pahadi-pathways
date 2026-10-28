# The Himalayan Compass — TODO

Open items only; each line notes why it is still open.

## Content management

- **Move production to Postgres when ready.** The Postgres `init`
  migration is committed and rehearsed; the move itself is open because
  existing SQLite content is not copied automatically (see "Switching to
  Postgres" in the README). After the move, every schema change needs a
  migration for each adapter.
- **Move media to S3-compatible storage if the site ever runs on more than
  one server.** Media is on the server's disk (`MEDIA_DIR`), which only
  works for a single instance.

## Security

- **Enforce the Content-Security-Policy.** It is currently sent as
  `Content-Security-Policy-Report-Only` from `src/config/headers.ts` so violations
  can be observed first; switch it to an enforcing `Content-Security-Policy`
  header once a monitoring period shows no unexpected blocks.
- **Move the enquiry rate limiter to an external store (e.g. Redis).**
  `src/lib/enquiry/rate-limit.ts` keeps counters in process memory, so on a
  multi-instance or serverless host each instance has its own counter
  rather than a global limit, and counters reset on restart.

## Testing

- **Add browser/E2E tests.** Only Vitest unit and integration tests exist
  today (`src/**/*.test.ts`); there is no coverage that
  exercises the app or the admin in a real browser (forms, modal focus
  trapping, navigation, editing and publishing, the consent banner and
  the analytics scripts it gates).

## Monitoring

- Add error reporting (for example Sentry or the host's log drain); API and render failures currently go to console.error only.

## Analytics

- **Confirm the Clarity image hosts.** Clarity's documentation may also
  require `https://*.clarity.ms` and `https://c.bing.com` in `img-src` of
  the Content-Security-Policy; check before enforcing it.

## Dependencies

- **Upstream advisory GHSA-gcqx-w48m-w2h4 (prototype poisoning in
  `deepmerge`).** Pulled in by `payload`; no fixed release exists yet, so
  `npm audit --omit=dev` shows only this one (low severity) and an override
  cannot clear it. Remove this note when `payload` updates.
- **Remove the `npm audit` overrides in `package.json` when upstream
  catches up.** They keep `npm audit --omit=dev` clean:
  - `dompurify` 3.4.17 — `monaco-editor` (the admin's code editor, via
    `@payloadcms/ui`) pins 3.4.15, which has a critical XSS advisory.
    Remove when `monaco-editor` ships with a patched `dompurify`.
  - `sass` 1.106.1 — `@payloadcms/next` pins `sass` 1.77.4, which pulls in
    chokidar 3 and a `braces` release with a high-severity advisory and no
    fix; sass 1.79 and later use chokidar 4. A minor-version bump; remove
    when `@payloadcms/next` depends on sass 1.79 or later.
  - `esbuild` 0.25.12 under `@esbuild-kit/core-utils` — replaces the old
    esbuild 0.18 that `drizzle-kit` (via `@payloadcms/db-postgres`) pulls in
    through `@esbuild-kit/esm-loader`. It is outside the range that package
    declares, but that loader path is never run by the app or migrations.
    Remove when `drizzle-kit` drops `@esbuild-kit/esm-loader`.
  After removing one, run `npm install`, `npm audit --omit=dev` and the
  full build; keep the override if the audit is no longer clean.

## Owner to decide

- **Gallery videos: uploads only, or pasted YouTube links too?** Only
  uploaded MP4/WebM files (up to 100 MB) are supported today.

## Known limits

Each is accepted for now; the line says why it is still open.

- **Clarity's own-domain cookies (`CLID`, `ANONCHK`, `MUID`, `SM`) survive a
  decline.** They belong to Clarity's domain, which the site cannot clear.
- **Visitors with Cloudflare blocked cannot pass the CAPTCHA.** They see a
  message pointing to WhatsApp; there is no second challenge provider.
- **Stray multipart temp files can sit in `UPLOAD_TEMP_DIR` for up to 6
  hours** after an interrupted upload; the periodic sweep is the only cleanup.
- **A 100 MB video needs the proxy body limit raised on the media route**
  (README, Deployment); the app cannot raise a limit set in front of it.
- **Videos are stored as uploaded**, with no transcoding or codec check.
- **Live preview needs the admin on the same origin as
  `NEXT_PUBLIC_SITE_URL`.** From another origin it does not work at all:
  `X-Frame-Options: SAMEORIGIN` blocks the frame and the admin login
  cookie is bound to the admin's host, so the preview page answers 404.
- **Four hero images stay above the 260 KB budget at the quality floor of
  60** (`destination-shimla`, and the Dharamshala, Kalpa and Manali package
  heroes); meeting it would mean smaller dimensions.
- **A failed deploy build leaves migrations and seed applied.** Only the
  running build is protected; restoring the database backup undoes them.
- **Changing the image quality or width affects new uploads only.**
