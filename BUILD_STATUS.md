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

## In Progress

- Event Radar now includes bilingual readiness guidance and non-persistent category filtering; exact tax language remains pending human review before launch.
- Next Dollar Planner now presents six fixed-order capital jobs with visible assumptions, bilingual signals, and trade-offs; it does not rank or select a winner.
- First-priority Wealth node renderer now has accessible reflection states, non-persistence notices, and readable educational calculator results instead of raw JSON.

## Blocked

- No current engineering blocker recorded.
- Items requiring product, tax/legal, insurance/compliance, or partner decisions belong in `REVIEW_QUEUE.md`.

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
- V2 Foundation question-set decisions remain blocked on Sammi review; the existing V1 assessment is unchanged.

## Next Recommended Tasks

1. Obtain Sammi’s decision on the exact 15–20 question Foundation V2 before changing assessment behavior.
2. Review Event Radar tax language before public release.
3. Confirm Wellness/USANA positioning and NS Federation configuration before those integrations proceed.

## Last Updated

2026-09-01 (America/New_York)
