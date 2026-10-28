# Changelog

## 2026-10-28

### Added
- Asked for confirmation before `cms:seed -- --overwrite` reverts editor changes: it prints a warning and wants `overwrite` typed, or `--yes` when there is no terminal (55b229a).
- Compressed and resized uploaded images (upright, WebP, maximum width) with an admin quality and width setting, refused unreadable files and images over 10 MB, skipped compression for untrusted uploads and kept sharp out of reads (9807d9a, 09a6b9f).
- Protected the enquiry forms with Cloudflare Turnstile when both keys are set, with a fallback message pointing to WhatsApp and a logged warning for a misconfigured key; the check fails open if Cloudflare is unreachable (286eea9, 266d59e).
- Built deploys into a fresh `.next-build` directory and swapped it in only on success, so a failed build leaves the running site untouched, with a `scripts/deploy.test.sh` check and a rollback recipe in the README (be0df92, b74fac9).
- Managed gallery videos in the CMS: a gallery item is an image or an MP4/WebM video (up to 100 MB) with a poster, shown in the gallery's video section; uploads are streamed to temp files and the video checks tightened (203789d, 6466f79).
- Previewed draft packages and destinations from the admin with Live Preview at Mobile, Tablet and Desktop sizes, on a signed-in-only route that is never cached or indexed (50cd3d7).

### Changed
- Kept one source for the shared content types (0bc5d52).
- Brought the remaining images under the size budget where the quality floor allows, and validated the `images:optimize` budget flags, which now also state what stays over budget (f357843, 1ee8568).
- Split popup positioning out of the hero planner hook (599318d).

### Fixed
- Showed a placeholder image when a media file is missing from disk, keeping the placeholder out of the seeded media library (b67af35, fd5a955).
- Cleared the Google Analytics and Clarity cookies the site can see and stopped vendor scripts on every open tab that ran them when a visitor declines, reloading only tabs where scripts ran (47c5af4, 4f7a42d).

### Security
- Added Dependabot for npm and GitHub Actions (e64a65e).

## 2026-10-27

### Added
- Added Payload CMS 3 inside the Next.js app, with a private admin, required signing secret, secure session cookies and a first-admin bootstrap from the environment instead of an open sign-up screen (c64685a).
- Added CMS collections for packages, destinations, testimonials, gallery items, experiences and media, plus pricing and site settings globals, with role-based access control (f20738d).
- Added an idempotent content seed from the bundled content and images, and an optional script that prunes old stored enquiries (2153255).
- Stored every enquiry in the CMS alongside the notification email; a stored enquiry counts as success even if the email fails (e13d72b).
- Made the site contact details editable through site settings (4d01ac7).
- Added a deploy script, the Postgres migration, CI seeding and CMS documentation (f8f24ee).
- Branded the admin with the site logo and icon, the site name in page titles, the site favicon and Open Graph image, and the brand colours (0e26097).
- Added legal settings (grievance officer, data contact email, effective date, deletion window, retention statement) and a terms page; the privacy page reads the same settings (93235ac).
- Added notification settings: per enquiry source, admins turn the email on or off and list up to 10 recipients, falling back to `TRIP_ENQUIRY_EMAIL` (5874b7e).
- Added analytics settings for Google Analytics 4 and Microsoft Clarity; vendor scripts load only after a visitor accepts the consent banner, and the privacy page names the vendors and lets visitors change their choice (7ae1eec).

### Changed
- Read all site content from Payload through a typed data layer, with a build guard against an empty database (a220936).
- Moved the stay, meal and vehicle pricing tables into the CMS while keeping quotes computed on the server (b2ff325).
- Refresh changelog commit references after a history rewrite (af2c281)
- Priced stay and meal options per booking per night (added once, regardless of the number of adults), with site-wide defaults and optional per-package lists that replace them; a migration gives the five existing packages per-night values that keep their quotes unchanged (53f47b3).

### Fixed
- Made gallery captions optional, tested draft isolation and extended package pricing fields (44931a3).
- Made the content seed skip populated collections by default, with `--overwrite` to reset them (e10acb7).
- Explained the base price versus vehicle rates in the admin and trimmed option labels (a27e0ad).
- Kept the package slug and title on stored leads (c4e316b).
- Closed editor workflow gaps: media changes revalidate the site, base-price changes reach Sedan quotes (seeded and stored Sedan rates equal to the base price are cleared by a migration), users can change their own password while role and email stay admin-only, `npm run cms:set-password` recovers an account, in-use images cannot be deleted, and a missing schema at startup says which commands to run (6998267).
- Described stay and meal upgrades as per booking per night across the site and admin (52d44c5).
- Removed the per-adult price claim from the terms, made the legal effective date required with a default, and made the seed fill only empty legal fields (5dd94db).
- Kept the owner's data contact email, analytics IDs and notification choices out of the `--overwrite` seed, which now only restores the consent banner text (cd40be1 and its follow-up).

### Security
- Restricted unlocking locked user accounts to admins and tested the authentication seams (9a69e3c).
- Hardened the admin routes and robots rules, and skipped the rate limiter instead of sharing one bucket when the client IP is unknown (ff47d7b).
- Kept CMS media indexable and closed a bypass through an empty `x-forwarded-for` header (4e4bcda).
- Made the deploy script create the database and media directories and back up the SQLite file before migrating, and corrected the reverse-proxy guidance to require `X-Forwarded-For` (6734f5e).
- Allowed the Google Analytics and Clarity hosts in the report-only Content-Security-Policy (7ae1eec).

## 2026-10-23

### Added
- Added a sitemap, robots rules, JSON-LD structured data, FAQs and `llms.txt`/`llms-full.txt` for AI crawlers (efec7f2).
- Added error pages, static params and metadata for the dynamic destination and package routes (452e218).
- Added security headers, a privacy policy page and a cookie/consent notice (a035342).
- Added test coverage for the enquiry handler pipeline and silenced a Vitest configuration warning (4b61112).

### Changed
- Split the destination route, booking panel and hero planner into smaller, focused modules (8792c88).
- Moved the navbar, footer and planner modal into the root layout so they render consistently across pages (b89c5a1).
- Removed components that became unused during cleanup and brought lint to zero warnings (ae0c8ef).
- Removed components left orphaned by the cleanup and finished converting remaining links to the router's `Link` component (512723b).
- Rewrote the README, changelog, folder structure, status and TODO docs to match the app and recorded review resolutions (f016e60).
- Shared dialog behaviour through one hook, derived the destination list from data and recorded deferrals (55e7ce3).

### Fixed
- Fixed destination pages without a photo gallery to show a single hero image instead of an empty gallery (9c6e498).
- Made the Open Graph image fall back to the site default on every page (b9911ae).
- Preserved correct not-found status codes and removed an unsourced seasonal FAQ answer (e68b40b).
- Made the trip planner modal accessible and removed hydration-unsafe date defaults (01492f6).
- Closed a focus-trap gap in the modal and moved minimum-date calculation to an external store (9f702d6).
- Centralised contact details in site configuration and wired up the contact form (da50398).

### Security
- Hardened the enquiry APIs with shared request validation, an origin check, a body-size cap, a honeypot and a per-IP rate limit, plus server-side price recomputation (85356cd).
- Patched known Next.js security advisories, pinned the Node/npm toolchain, and added CI and an `.env.example` template (9b3a198).

### Performance
- Converted site images to WebP and capped their dimensions to reduce page weight (3c62eff).

## 2026-07-20

### Added
- Shared Trip Planner modal
- Reusable UI components

### Changed
- Rebranded to The Himalayan Compass

### Fixed
- Modal height issue
