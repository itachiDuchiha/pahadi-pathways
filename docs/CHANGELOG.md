# Changelog

## 2026-10-23

### Added
- Added a sitemap, robots rules, JSON-LD structured data, FAQs and `llms.txt`/`llms-full.txt` for AI crawlers (9fdb070).
- Added error pages, static params and metadata for the dynamic destination and package routes (adc899b).
- Added security headers, a privacy policy page and a cookie/consent notice (1ddb152).
- Added test coverage for the enquiry handler pipeline and silenced a Vitest configuration warning (3a50daa).

### Changed
- Split the destination route, booking panel and hero planner into smaller, focused modules (dc4b087).
- Moved the navbar, footer and planner modal into the root layout so they render consistently across pages (c7d1445).
- Removed components that became unused during cleanup and brought lint to zero warnings (ae0c8ef).
- Removed components left orphaned by the cleanup and finished converting remaining links to the router's `Link` component (512723b).

### Fixed
- Fixed destination pages without a photo gallery to show a single hero image instead of an empty gallery (5f4e83d).
- Made the Open Graph image fall back to the site default on every page (6c553b4).
- Preserved correct not-found status codes and removed an unsourced seasonal FAQ answer (4759662).
- Made the trip planner modal accessible and removed hydration-unsafe date defaults (84bd86f).
- Closed a focus-trap gap in the modal and moved minimum-date calculation to an external store (45b646f).
- Centralised contact details in site configuration and wired up the contact form (da50398).

### Security
- Hardened the enquiry APIs with shared request validation, an origin check, a body-size cap, a honeypot and a per-IP rate limit, plus server-side price recomputation (7453d12).
- Patched known Next.js security advisories, pinned the Node/npm toolchain, and added CI and an `.env.example` template (9b3a198).

### Performance
- Converted site images to WebP and capped their dimensions to reduce page weight (5010cba).

## 2026-07-20

### Added
- Shared Trip Planner modal
- Reusable UI components

### Changed
- Rebranded to The Himalayan Compass

### Fixed
- Modal height issue
