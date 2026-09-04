# ONYX Build Status

## 2026-09-04 — Global Knowledge Search

- Added a reusable structured index for V3 paths, Hero Guides, Decision Intelligence, life events, Capital Map and Wellness nodes, tools, and published Insights.
- Added English/Chinese shared-topic search with financial-term normalization and aliases for 401(k), pro-rata, Backdoor Roth, S Corporation, 529, 1031 and common life-event language.
- Added an accessible header search overlay with Cmd/Ctrl+K, Escape, focus containment, grouped results, locale-aware deep links, and safe zero-result routes to the Capital Map, Event Radar, or a contextual Sammi conversation.
- Search does not scrape page content, fabricate an answer, transmit a query, or persist search history. The analytics adapter is deliberately a no-op pending a separate privacy/product decision.
- Validation passed: 90/90 tests, production build, `git diff --check`, and capital validation (three PASS and two existing REVIEW profiles). The existing bundle-size warning remains.
- Browser QA passed in English and Chinese for exact/alias, multiple-result, zero-result, Cmd/Ctrl+K, Escape, focus, and locale-aware deep-link behavior. At a 390×844 mobile viewport the full-screen overlay remained within the viewport with no horizontal overflow; the desktop overlay and header control were also verified. No merge or production deployment performed.

## 2026-09-04 — Phase 2.5 Decision Intelligence prototype

- Added reusable EventNode, DecisionNode, KnowledgeNode, PlanningWindow, DecisionTrap, FutureFlexibilityImpact, BeforeYouAct, OfficialSource and ReviewTrigger model support without a persistent profile or sensitive-data storage.
- Implemented one complete EN/ZH prototype: job change → old 401(k) → destination choices → IRA/pro-rata/future Roth awareness → Before You Act → fact-dependent stopping point → contextual Sammi review.
- Added non-ranked visual branches, reusable Future Flexibility and Before You Act components, optional deeper-learning disclosures, verified IRS source links, and entries from Build for Tomorrow and Event Radar.
- Technical retirement language is queued for tax review before production. No merge or deployment performed.
- Browser QA passed in English and Chinese at the available 926px viewport: four decision branches, four optional learning layers, localized contextual handoff, route-aware architecture highlight and no horizontal overflow. The current browser runtime did not expose phone emulation and no local headless browser binary was available; the mobile single-column CSS is implemented and requires final visual review before production.

## 2026-09-04 — Full architecture correction

- Replaced the collapsible navigator with an always-expanded, stable architecture diagram: four V3 paths, all 20 published Wealth/Wellness nodes in six stages, all 10 events, tools, learning, contact and policies. Route changes highlight the relevant branch without changing the diagram's contents.
- Right-hand reserved column now applies at 760px and above; phones show the entire map above the content without a disclosure control. Nodes have accessible names and title labels. No body copy, scoring or protected article changes in this correction.
- Tests/build/diff checks passed; existing bundle-size warning remains. Browser confirmed contact highlight and no horizontal overflow at 926px. Not deployed.

## 2026-09-04 — Reading navigator and conversational Chinese preview

- Added a shared, route-aware reading navigator on public pages: six existing capital stages, Wealth/Wellness columns, and separate locations for events, tools, learning and site information. The marker identifies the content being read, never a user's assessed financial standing.
- Wide screens use a reserved right sidebar; smaller windows use a collapsible top-right navigator. It follows page changes, uses locale-aware links, supports keyboard navigation and hides for printing. No browsing history, financial answers, or personal data are stored.
- First editorial pass covers all six Wellness foundation pages, common event/action labels, and selected Wealth entry descriptions (emergency cash, monthly surplus, non-W2 income and tax reserves). English content, calculations, scoring, source options, legal disclosures and protected InsightArticlePage files are preserved. This is not a completed rewrite of every Chinese article.
- Validation: 79 tests pass, production build and diff whitespace check pass. Existing bundle-size warning remains. Browser review verified the compact navigator at 926px, expanding/collapsing, no horizontal overflow, and marker movement from WL1 to WL2. Full phone/wide-desktop visual review remains before publication.
- Local preview only; no merge, production deployment, commit or push in this iteration.

## 2026-09-04 — Locale separation (local review)

- Public language choices now include English and Chinese only. Other dictionaries are retained but not loaded or exposed.
- Legacy Capital Map, event, Wealth/Wellness node, assessment/result, Foundation, long-term and journey screens render one locale instead of paired translations. Input values and calculation rules are unchanged.
- Added localized legacy labels and translation-coverage tests. Insight lists avoid opposite-language fallback; unavailable article translations show an explanatory page without deleting source content.
- **Partial completion:** existing protected InsightArticlePage renderer still contains bilingual editorial layouts. Await permission before changing that file. Some legacy Chinese prose also retains technical English terminology; further copy review remains.
- Original InsightArticlePage JSX/CSS in the original worktree retain their previously recorded SHA-256 hashes. No production deployment or merge performed.
- Validation: 76/76 tests passed; production build and `git diff --check` passed. Existing >500 kB bundle warning remains. Capital validation completed with existing product-review flags (not new calculation changes).

## Current Branch

`codex/onyx-v2-platform`

## Current Known Modified Files

- `src/components/InsightArticlePage.jsx` — **Pre-existing user work — preserve and do not overwrite.**
- `src/components/InsightArticlePage.module.css` — **Pre-existing user work — preserve and do not overwrite.**

## Completed

- V3 Phase 2 adds a reusable bilingual Knowledge Guide schema, renderer, non-persistent result model, and four interconnected Hero Knowledge Guides.
- The Second Income guide distinguishes an entity from a genuine business and includes a transparent revenue-minus-expenses lens without calculating tax liability.
- The Business / Payroll / Retirement guide explains profit, compensation, payroll, entity, cash-flow, employee, and retirement-plan interactions without ranking plans or promising savings.
- The New Baby guide uses a life-stage timeline and illustrative Cost of Waiting calculator to demonstrate time without recommending a product.
- The Rental Equity guide compares hold, sell, and reposition choices as family-capital jobs, with 1031 concepts limited to pre-transaction awareness.
- Knowledge Guide result objects are Phase 3-ready but store no answers or sensitive data; cross-guide links and contextual Sammi handoffs preserve explored context.

- ONYX V3 public architecture introduces Working Family Capital positioning for W-2 professionals, 1099 earners, and modern growing families without hard income eligibility language.
- Homepage, navigation, footer, About Sammi, SEO metadata, and bilingual core copy now use ONYX Wealth & Wellness without “Club.”
- Four reusable primary knowledge paths—Keep More, Build for Tomorrow, Fund Their Future, and Protect the Plan—sit above retained V2 tools.
- Foundation remains a tertiary optional check; Capital Map and Event Radar are the primary homepage entry points.
- A centralized V3 path model, reusable path renderer, contextual CTA language, and reusable educational disclaimer are established.

- Capital Assessment Phase 1–4 complete.
- V1 assessment question, scoring, result-presentation, storage, validation, and testing layers complete.
- Capital Assessment validation complete.
- Locale-aware route architecture is established.
- Current design system uses shared global tokens with component-level CSS Modules.
- Life Capital Map foundation is implemented with 14 first-priority Wealth nodes, 10 Event Radar events, centralized data models, generic renderers, educational calculators, and contextual Ask Sammi handoffs.
- Wellness foundation includes six bilingual, education-first nodes with non-persistent reflection tools and qualified-review boundaries.
- Event Radar includes bilingual readiness guidance, accessible category filtering, and page-only status reflection; no event selections are stored.
- Next Dollar Planner presents six fixed-order capital jobs with visible assumptions, bilingual signals, and trade-offs; it does not rank or select a winner.
- First-priority Wealth node renderer has accessible reflection states, non-persistence notices, and readable educational calculator results instead of raw JSON.
- Foundation Assessment V2 includes 18 bilingual questions, multi-select income/event/long-term paths, deterministic non-score results, Capital Map routing, restart, and visit-only in-memory answers; V1 remains intact.
- All 10 Event Radar pages include a story, common blind spots, self-management guidance, deeper-review triggers, records, questions, related nodes, Insight seeds, and cautious current-rule verification language.
- The 5–10 Year Planning Map covers retirement transition, healthcare cost readiness, protection and continuity, asset structure, business continuity and exit, legacy organization, and work optionality with bilingual educational paths and clear review boundaries.
- The Capital Map offers eight safe CSV working templates, including tax-reserve and event-preparation worksheets; relevant Wealth and Event pages link directly to them.
- Wellness nodes connect to related Wealth paths at each capital stage while remaining education-first, non-scoring, non-persistent, and separate from product resources.
- Full Build Day browser QA covers desktop and mobile Capital Map, Foundation V2 progression, Event Radar filtering, Next Dollar reactions, long-term and Wellness pages, V1 assessment, survey, NS Federation shell, and not-found behavior.
- The Journey Engine prototype adds a reusable bilingual scenario schema and renderer, visual consequence paths, non-scoring judgment feedback, and three Hero Journeys: Emergency Liquidity, Sell a Rental Property, and Work Optionality.
- The Capital Map now opens with three primary paths—Explore My Capital Journey, Something Changed, and the optional 4-Minute Foundation Check—rather than presenting the 18-question check as the Financial Map itself.
- Emergency Liquidity includes a non-persistent Runway tool with empty, invalid, and valid states; rental-sale and optionality journeys use reusable organization/reflection experiments.

## In Progress

- V3 Phases 1–2 are awaiting product and professional-language review before production release.

## Blocked

- No current engineering failure blocks the completed V2 foundation work.
- Further prioritized V2 scope requires product, tax/legal, insurance/compliance, or partner decisions recorded in `REVIEW_QUEUE.md`.

## Tests

Configured commands:

```text
npm test
npm run build
git diff --check
npm run validate:capital
```

No lint command is currently configured in `package.json`.

## Known Issues

- Two non-blocking V1 validation profiles remain queued for product review; see `REVIEW_QUEUE.md`.
- The two pre-existing InsightArticlePage modifications must not be overwritten.
- Foundation V2 is implemented in parallel with V1; it intentionally does not persist financial answers across refreshes.
- Journey choices and calculator inputs intentionally remain component-memory only. Leaving and reopening a Journey starts it again.
- The production bundle succeeds but Vite reports a non-blocking JavaScript chunk-size warning above 500 kB; code splitting is a future performance task.

## Next Recommended Tasks

1. Review the four Hero Knowledge Guides for tone, depth, and contextual handoff usefulness.
2. Obtain tax, payroll, retirement, education-funding, insurance, and rental-language reviews recorded in `REVIEW_QUEUE.md` before production publication.

## Last Updated

2026-09-03 (America/New_York)
