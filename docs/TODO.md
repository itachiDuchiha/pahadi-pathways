# The Himalayan Compass — TODO

Open items only; each line notes why it is still open.

## Content management

- **Move production to Postgres when ready.** The Postgres `init`
  migration is committed and rehearsed; the move itself is open because
  existing SQLite content is not copied automatically (see "Switching to
  Postgres" in the README). After the move, every schema change needs a
  migration for each adapter.
- **Add live preview of drafts.** Editors currently publish to see a
  change on the site; Payload's live preview needs a preview route and
  draft-aware reads.
- **Manage gallery videos in the CMS.** Videos are still code-managed; the
  Media collection accepts images only.
- **Move media to S3-compatible storage if the site ever runs on more than
  one server.** Media is on the server's disk (`MEDIA_DIR`), which only
  works for a single instance.
- **Ask before `cms:seed -- --overwrite`.** It reverts editor changes
  without a confirmation step; a prompt or a `--yes` flag would prevent
  accidents.
- **Render without a missing image.** Deleting an image that content
  still uses is now refused, but a media file removed from disk outside
  the admin still makes that page and the build fail; a fallback image
  would degrade more gracefully.
- **Build into a separate directory when deploying.** `scripts/deploy.sh`
  builds in place, so a failed build leaves no working build until the
  documented rollback is run; building into a fresh directory and
  switching over only on success would keep the old build serving.
- **De-duplicate the shared content types.** `DESTINATION_CATEGORIES`
  (CMS config and site types), `EXPERIENCE_ICONS` (CMS config and the
  site's `ExperienceIcon` type) and the `Package` type (built on the
  seed's `PackageContent`) each have more than one source; a single one
  would stop them drifting apart.

## Security

- **Enforce the Content-Security-Policy.** It is currently sent as
  `Content-Security-Policy-Report-Only` from `src/config/headers.ts` so violations
  can be observed first; switch it to an enforcing `Content-Security-Policy`
  header once a monitoring period shows no unexpected blocks.
- **Move the enquiry rate limiter to an external store (e.g. Redis).**
  `src/lib/enquiry/rate-limit.ts` keeps counters in process memory, so on a
  multi-instance or serverless host each instance has its own counter
  rather than a global limit, and counters reset on restart.
- **Add a CAPTCHA to the enquiry forms.** The honeypot field in
  `src/lib/enquiry/handler.ts` only deters simple bots; there is no
  challenge against more persistent automated submissions.

## Testing

- **Add browser/E2E tests.** Only Vitest unit and integration tests exist
  today (456 tests across `src/**/*.test.ts`); there is no coverage that
  exercises the app or the admin in a real browser (forms, modal focus
  trapping, navigation, editing and publishing, the consent banner and
  the analytics scripts it gates).

## Monitoring

- Add error reporting (for example Sentry or the host's log drain); API and render failures currently go to console.error only.

## Analytics

- **Delete vendor cookies on decline.** Declining after accepting reloads
  the page so the scripts stop, but cookies Google Analytics (`_ga*`) and
  Clarity (`_clck`, `_clsk`) already set stay until they expire.
- **Stop running scripts when another tab declines.** A decline in one tab
  updates the choice in the others, but a tab that already loaded the
  vendor scripts keeps them until it is reloaded.
- **Confirm the Clarity image hosts.** Clarity's documentation may also
  require `https://*.clarity.ms` and `https://c.bing.com` in `img-src` of
  the Content-Security-Policy; check before enforcing it.

## Performance

- **Trim the remaining large images.** A handful of package/destination
  hero images are still in the 300–432 KB range after the WebP conversion;
  `scripts/optimize-images.mjs` can be rerun with tighter settings once a
  size budget is agreed.

## Code structure

- **Extract the popup-positioning logic from `useHeroPlanner`.**
  `src/components/home/planner/useHeroPlanner.ts` currently computes popup
  visibility, viewport-aware positioning and the shared handlers in one
  hook; splitting the positioning math into its own hook would make the
  state hook easier to follow and test in isolation.
- **Narrow the hero picker props.** The picker components under
  `src/components/home/planner/` take broader prop types than they use
  internally; tightening them would make misuse show up at compile time.

## Dependencies

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

- **Set up Dependabot for `@types/*` and other dependency updates.** There
  is no automated dependency-update process yet; version bumps are
  currently manual.
