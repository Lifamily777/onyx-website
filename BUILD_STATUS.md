# ONYX Build Status

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
