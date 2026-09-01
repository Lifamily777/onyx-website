# ONYX Build Status

## Current Branch

`codex/onyx-v2-platform`

## Current Known Modified Files

- `src/components/InsightArticlePage.jsx` — **Pre-existing user work — preserve and do not overwrite.**
- `src/components/InsightArticlePage.module.css` — **Pre-existing user work — preserve and do not overwrite.**

## Completed

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

## In Progress

- Full Build Day execution is in progress: Wellness integration and final UX/QA remain active milestones.

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

## Next Recommended Tasks

1. Strengthen the integrated Wellness pathway.
2. Complete final UX/QA.

## Last Updated

2026-09-01 (America/New_York)
