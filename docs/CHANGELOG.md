# Changelog

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
