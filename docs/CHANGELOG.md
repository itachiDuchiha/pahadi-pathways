# Changelog

## 2026-10-27

### Added
- Added Payload CMS 3 inside the Next.js app, with a private admin, required signing secret, secure session cookies and a first-admin bootstrap from the environment instead of an open sign-up screen (c64685a).
- Added CMS collections for packages, destinations, testimonials, gallery items, experiences and media, plus pricing and site settings globals, with role-based access control (97c6db9).
- Added an idempotent content seed from the bundled content and images, and a script that prunes stored enquiries after 24 months (e78d3e8).
- Stored every enquiry in the CMS alongside the notification email; a stored enquiry counts as success even if the email fails (813e211).
- Made the site contact details editable through site settings (df5d371).
- Added a deploy script, the Postgres migration, CI seeding and CMS documentation (this commit).

### Changed
- Recorded review resolutions and rewrote the README, changelog, folder structure, status and TODO docs to match the app (f016e60).
- Shared dialog behaviour through one hook, derived the destination list from data and recorded deferrals (55e7ce3).
- Read all site content from Payload through a typed data layer, with a build guard against an empty database (4f718e9).
- Moved the stay, meal and vehicle pricing tables into the CMS while keeping quotes computed on the server (bbba484).

### Fixed
- Made gallery captions optional, tested draft isolation and extended package pricing fields (46e3f69).
- Made the content seed skip populated collections by default, with `--overwrite` to reset them (d026e84).
- Explained the base price versus vehicle rates in the admin and trimmed option labels (4832e15).
- Kept the package slug and title on stored leads (8cb56cb).

### Security
- Restricted unlocking locked user accounts to admins and tested the authentication seams (9a69e3c).
- Hardened the admin routes and robots rules, and skipped the rate limiter instead of sharing one bucket when the client IP is unknown (ef5f290).
- Kept CMS media indexable and closed a bypass through an empty `x-forwarded-for` header (6b3779e).

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
