# Changelog

All notable changes to the ONYX website are documented in this file.

## [1.0.0] — 2026-07-14

### Added — Multilingual Support
- Expanded the site from a bilingual (EN/ZH) display to a full 6-language locale system: English (default), Simplified Chinese, Spanish, Korean, French, and German.
- Locale-aware routing (`/`, `/zh`, `/es`, `/ko`, `/fr`, `/de`) that preserves the equivalent page across every language switch (e.g. `/zh/about` → `/fr/about`).
- A custom, dependency-free i18n system (`src/i18n`, `src/locales`) — no `react-i18next` — with an English-fallback translator and locale-aware path helper.
- `<html lang>`, per-locale page titles/descriptions, and hreflang + self-referencing canonical tags injected per route.
- A six-language language selector in the header and footer, keyboard-accessible and consistent across breakpoints.

### Added — ONYX Brand Implementation
- Full homepage rebuild to the approved brand architecture: Hero, Why ONYX Exists, Core Brand Statement, Three Pillars (Wealth / Wellness / Intelligence), Learning Together, Founder Story, Mission/Final CTA.
- New brand voice throughout: humble, educational, non-salesy — replacing the prior "Entropy Station" positioning on all new surfaces.
- New Nav and Footer reflecting the Wealth/Wellness/Intelligence pillar structure, with an educational disclaimer in the footer.
- Finalized public hero headline: "The world is becoming more complex. Understanding it shouldn't be." translated naturally (not literally) into all six languages.

### Added — Assessment Restoration
- Recovered and preserved the original scoring engine (`src/utils/surveyScore.js`) — question weights, tie-break logic, and demographic bonuses unchanged from the original implementation.
- Rebranded as the "ONYX Pathway Assessment," fully localized into all six languages.
- Rebuilt the result experience to be educational rather than sales-oriented: primary outcome, plain-language explanation, 2–3 next steps, one learning-area link, a review of the other two outcomes, retake option, and a compliance-safe educational disclaimer.
- Reintegrated the assessment as a visible homepage section ("Find your starting point"), and added it to the main navigation and footer.

### Added — Routing Improvements
- Migrated from in-memory page-state navigation to `react-router-dom`, giving every page a real, shareable, refreshable URL.
- Added a generic `PlaceholderPage` component and new routes for About, Insights, Intelligence, Privacy, Terms, and Disclosures — replacing what were previously non-existent or `href="#"`-style links.
- Added a locale-aware 404 page for unmatched routes and invalid locale segments.

### Added — Typography Refinements
- Introduced a language-aware CSS custom-property system (`--type-scale`, `--body-scale`, `--width-scale`, `--lh-*`, `--letter-*`) so headline size, line-height, letter-spacing, and column width adapt per language instead of reusing English metrics everywhere.
- Chinese and Korean: tightened/loosened line-height appropriately, added `word-break: keep-all` for Korean (prevents mid-word breaks), widened containers to avoid orphaned 1–2 character lines.
- Applied `text-wrap: balance` to all major headlines and `text-wrap: pretty` to body paragraphs (with a `balance` override for the longest founder-story paragraphs) to eliminate single-word orphan lines across every supported language.

### Added — Deployment Configuration
- Added `public/_redirects` for Cloudflare Pages SPA fallback support, so deep links (e.g. `/de/survey`) resolve correctly on refresh in production.

### Changed
- `src/data/content.js` trimmed to only the fields still in active use (advisor name/role, service page content).
- `src/data/survey.js` / `src/utils/surveyScore.js` split cleanly into scoring-engine-only modules, with all display copy moved to the locale files.

### Removed
- Dead exports from `content.js`: `brand`, `navItems`, `personas`, `services`, `flywheel`, and the unused `advisor.credentials` field.
- Unused `import React from 'react'` statements across 14 files (safe under the automatic JSX runtime already in use).
- The original "Entropy Station" homepage copy, hero headline, and "System Scan" survey branding.

### Fixed
- A dead `setPage()` reference in `ServicePage.jsx` left over from an earlier routing migration (would have thrown on click).
- Non-locale-aware internal navigation in `ServicePage.jsx` and `SurveyPage.jsx` that silently dropped users back into English mid-session.
- A `text-wrap: balance` scoping bug where the hero's second headline line (inside a `<span>` after a `<br>`) wasn't balanced independently, causing single-word orphan lines in Korean.
- A mobile breakpoint where the hero headline's responsive font-size briefly *increased* at the narrowest widths instead of continuing to shrink, causing German compound-word overflow.
- Weak focus indication on Contact page form fields (relied only on a subtle border-color change); added a visible `:focus-visible` outline consistent with the rest of the site.

---

## [0.1.0] — prior to this release cycle
- Initial bilingual (EN/ZH) "ONYX Entropy Station" website: homepage, tax/insurance/wellness service pages, contact form, and the original Pathway Assessment (as "System Scan").
