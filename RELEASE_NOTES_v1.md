# ONYX Website — Release Notes

**Version:** 1.0.0 ("ONYX Website Version 1.0" — foundation release)
**Date:** 2026-07-14
**Status:** Release candidate, validated and ready for production deployment

---

## Overview

This is the foundation release of the ONYX platform: a multilingual, editorial-style website built around the "Wealth · Wellness · Intelligence" brand architecture, with a restored and modernized Pathway Assessment. It replaces the prior single-locale "ONYX Entropy Station" implementation while preserving all working functionality (routing, scoring logic, and existing service pages).

---

## Major Features

**Six-language support** — English (default), Simplified Chinese, Spanish, Korean, French, and German, with locale-aware routing, a persistent language selector, hreflang + canonical tags, and typography tuned per language (Chinese/Korean line-breaking, German compound-word handling, Spanish/French length accommodation).

**Homepage redesign** — Hero, Why ONYX Exists, Core Brand Statement, Three Pillars, a homepage Assessment callout, Learning Together, Founder Story, and Mission/Final CTA, all fully localized.

**ONYX brand implementation** — Consistent "ONYX Wealth & Wellness, powered by Intelligence" positioning across navigation, footer, and metadata; the finalized public headline ("The world is becoming more complex. Understanding it shouldn't be.") in all six languages.

**Pathway Assessment restoration** — The original scoring engine (10 questions, three-tier weighted scoring with tie-break logic) is preserved from the pre-existing implementation. The experience was re-skinned with the new brand voice and a compliance-safe, educational result structure (outcome, explanation, next steps, one learning-area link, review of other outcomes, retake, disclaimer). Reintegrated into the homepage, main navigation, and footer.

**Routing** — Migrated to `react-router-dom` with real, shareable URLs for every page (previously in-memory state only). All pre-existing routes (`/tax`, `/ins`, `/health`, `/contact`, `/survey`) are preserved; new routes added for About, Insights, Intelligence, Privacy, Terms, and Disclosures.

**Deployment readiness** — `public/_redirects` added for Cloudflare Pages SPA fallback, so all locale-prefixed deep links resolve correctly on a hard refresh in production.

---

## Known Limitations

1. **Legacy service pages remain bilingual (EN/ZH) only.** `/tax`, `/ins`, `/health`, and the contact form were intentionally preserved as-is (per explicit scope decisions during development) and are not yet part of the 6-language locale system.
2. **Client-side-only SEO.** This is a client-rendered SPA — `<title>`, meta description, hreflang, and canonical tags are all injected via JavaScript after the page loads. Search engines that don't execute JavaScript will not see localized metadata. No server-side rendering or static pre-rendering is in place.
3. **Placeholder content pages.** About, Insights, Intelligence, Privacy, Terms, and Disclosures are honest "coming soon" placeholders, not final content. Privacy/Terms/Disclosures in particular are not yet binding legal documents.
4. **Secondary text color contrast.** The design system's muted secondary/tertiary text colors (`--ink2` `#75757a`, `--ink3` `#94949a`) measure at roughly 4.4:1 and 2.9:1 contrast against the light background — the former is marginally under, the latter clearly under, the WCAG AA 4.5:1 threshold for normal-size text. This is a pre-existing design-system choice (present since before this release cycle) used consistently for captions, labels, and footer text; changing it would be a visible, global color-token change and was intentionally not made without explicit sign-off during a "no redesign" pass. See Recommendations below.
5. **`/ins` (Insurance) has no top-level nav entry.** It's reachable directly and via the Assessment's Risk Protection result, but isn't one of the six primary nav items (which follow the Wealth/Wellness/Intelligence pillar structure).
6. **No automated test suite, lint, or type-checking is configured.** The project has no `tsconfig.json`, ESLint config, or test runner at any point in its history — validation for this release relied on `vite build` plus manual/scripted browser verification (all 72 route×locale combinations checked, full assessment flow tested for all three outcomes).

---

## Future Roadmap (Recommendations for v1.1+)

- **Fix the secondary-text contrast ratio.** Darken `--ink2` to approximately `#5f5f64` and `--ink3` to approximately `#5c5c61` (or restrict `--ink3`'s use to large/decorative text only) to reach compliant contrast without materially changing the visual hierarchy.
- **Extend the 6-language system to the legacy service pages** (`/tax`, `/ins`, `/health`) and the contact form, replacing the bilingual EN/ZH-only content with the same locale-driven pattern used elsewhere.
- **Add real content** to the Insights, About, and Intelligence placeholder pages as it becomes available.
- **Add a native-speaker review pass** for the French and German translations (currently professional-quality but not yet reviewed by a native speaker).
- **Consider static pre-rendering or SSR** (e.g. via a framework migration or a prerendering plugin) if organic search visibility across all six languages becomes a priority — the current client-only rendering is a real ceiling on SEO.
- **Add a lightweight test suite** (even a handful of smoke tests for routing and the assessment scoring logic) now that the codebase has reached a stable v1.0 baseline.
- **Give `/ins` a discoverable entry point** — either a sub-link under Wealth or a mention on the `/tax` page — so it isn't only reachable via direct URL or the assessment.
