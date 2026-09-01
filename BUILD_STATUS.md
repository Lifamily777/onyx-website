# ONYX Build Status

## Current Branch

`content/insight-chinese-families-insurance`

## Current Known Modified Files

- `src/components/InsightArticlePage.jsx` — **Pre-existing user work — preserve and do not overwrite.**
- `src/components/InsightArticlePage.module.css` — **Pre-existing user work — preserve and do not overwrite.**

## Completed

- Capital Assessment Phase 1–4 complete.
- V1 assessment question, scoring, result-presentation, storage, validation, and testing layers complete.
- Capital Assessment validation complete.
- Locale-aware route architecture is established.
- Current design system uses shared global tokens with component-level CSS Modules.

## In Progress

- Ongoing ONYX product governance and long-term planning documentation.

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
- Current V2 architecture work is not yet implemented.

## Next Recommended Tasks

1. Obtain Sammi’s decisions on the seeded review items.
2. Approve the exact 15–20 question Foundation V2 scope before changing assessment behavior.
3. Review Event Radar tax language before public release.
4. Confirm Wellness/USANA positioning boundaries.
5. Confirm the NS Federation embed source and configuration.
6. Implement approved V2 work in isolated, testable increments.

## Last Updated

2026-09-01 (America/New_York)
