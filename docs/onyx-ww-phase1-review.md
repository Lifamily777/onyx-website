# ONYX WW phase-one review

## Baseline and scope

Built from `origin/main` at `9a715a4`, in a separate `codex/onyx-ww-phase1` worktree. The original checkout and its uncommitted editorial work were not changed or included.

The current main branch uses React 18, Vite 5, React Router 6, CSS modules, locale dictionaries, and Cloudflare Pages with the existing contact Pages Function. English and Chinese are public on this baseline; the other four dictionaries remain intact. The older local branch had a different language configuration and a placeholder contact form; neither was used as the implementation baseline.

The homepage now explains the audience, four checkup modules, three-step process, Sammi's existing published background, service scope, and contact route. No new qualifications, income eligibility rule, guaranteed outcome, financial calculation, tracking integration, paid service or data field was introduced. System Georgia/Songti/Noto Serif fallbacks avoid new font downloads and font licensing dependencies.

## Preserved functionality

All route definitions, including `/survey`, `/capital-assessment`, `/profile`, strategy paths, capital map paths, learning content and legal pages remain unchanged. The footer exposes both protected tools alongside Profile, Strategies, Build, Learn and Capital Map. Global search remains available on mobile and desktop.

Contact form, `/api/contact`, provider configuration, request validation, abuse controls, questionnaire schemas, scoring, storage keys, PDF generation and data logic remain unchanged. No database migration or deployment configuration change. Existing privacy and terms disclosures remain, with brand-only wording changes. No production form submissions were made.

Protected `InsightArticlePage.jsx` and `InsightArticlePage.module.css` are unchanged. Historical editorial text and legacy internal names are not globally rewritten; header/footer, current homepage, public dictionaries, core tool labels and document metadata use the requested branding.

## Verification

- `npm test`: 163 passed, 0 failed.
- `npm run build`: passed. Existing large-chunk warnings remain (main bundle and lazy PDF bundle exceed 500 kB).
- `git diff --check`: passed.
- No lint script is configured.
- Browser: inspected English/Chinese homepage, mobile 390 px and 320 px, desktop 1440 px; no homepage horizontal overflow observed. Four service modules render as a row on desktop and stack on small screens.
- Browser: tested navigation anchors, language switch preserving the anchor, homepage CTA to existing contact page, browser Back, and loading core survey/assessment/Profile/map/contact routes in both public languages.
- Also loaded strategies, about, insights, build, learn, privacy, terms and disclosures in both languages.
- No browser error logs observed; React Router v7 migration warnings remain.
- Contact server tests pass; live email delivery was not exercised. Vite alone does not run Cloudflare Pages Functions. Production delivery still depends on the existing environment configuration.
- Package install reports existing npm allow-scripts notices for esbuild/fsevents; build succeeded without dependency changes.

## Preview

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173/` and `http://127.0.0.1:5173/zh`. Follow the footer Survey and Capital Assessment links to verify preserved entry points. For a production bundle preview use `npm run build && npm run preview`; contact delivery requires the existing Cloudflare runtime/configuration.

This branch is for PR review only. It has not been merged or deployed to production.
