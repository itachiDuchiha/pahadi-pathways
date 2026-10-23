# The Himalayan Compass — TODO

Open items only; each line notes why it is still open.

## Security

- **Enforce the Content-Security-Policy.** It is currently sent as
  `Content-Security-Policy-Report-Only` in `next.config.ts` so violations
  can be observed first; switch it to an enforcing `Content-Security-Policy`
  header once a monitoring period shows no unexpected blocks.
- **Move the enquiry rate limiter to an external store (e.g. Redis).**
  `src/lib/enquiry/rate-limit.ts` keeps counters in process memory, so on a
  multi-instance or serverless host each instance has its own counter
  rather than a global limit.
- **Add a CAPTCHA to the enquiry forms.** The honeypot field in
  `src/lib/enquiry/handler.ts` only deters simple bots; there is no
  challenge against more persistent automated submissions.

## Testing

- **Add browser/E2E tests.** Only Vitest unit tests exist today (73 tests
  across `src/**/*.test.ts`); there is no coverage that exercises the app
  in a real browser (forms, modal focus trapping, navigation).

## Monitoring

- Add error reporting (for example Sentry or the host's log drain); API and render failures currently go to console.error only.

## Analytics

- **Add analytics.** There is currently no visitor or conversion tracking
  on the site, so there is no data-driven view of which pages or packages
  convert enquiries.

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

- **Set up Dependabot for `@types/*` and other dependency updates.** There
  is no automated dependency-update process yet; version bumps are
  currently manual.
