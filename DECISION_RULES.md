# ONYX Agent Decision Rules

These rules define when an agent may proceed autonomously and when human review is required.

## AUTO-PROCEED

Proceed when the requested work is in scope, reversible, and does not cross a review boundary:

- reversible UI improvements
- accessibility fixes
- tests
- refactoring without behavior change
- copy consistency
- adding new isolated files
- fixing obvious implementation bugs
- improving mobile behavior
- adding non-sensitive educational tooling

Preserve existing user work and verify changes in proportion to risk.

## PREFER

- usability over extra content
- trust over a stronger CTA
- explanation over jargon
- transparent assumptions over false precision
- data-driven reusable architecture over hard-coded pages
- progressive disclosure over overwhelming questionnaires
- neutral education over predetermined product conclusions

## STOP AND ADD TO REVIEW_QUEUE

Do not make the following decisions autonomously. Record the question in `REVIEW_QUEUE.md` and request direction:

- changing scoring thresholds
- changing tax or legal claims
- making insurance suitability decisions
- changing public product positioning
- deleting existing routes or features
- modifying production deployment settings
- adding sensitive-data upload or storage
- adding third-party tracking
- changing payment or commercial terms
- any irreversible or high-risk change

## Uncertain Tax Content

If tax content is uncertain:

1. Do not invent an answer.
2. Prefer cautious, clearly educational wording.
3. Verify current-law claims with authoritative primary sources when research is authorized and required.
4. Add unresolved language or interpretation questions to `REVIEW_QUEUE.md`.

## Reversible Implementation Decisions

When an implementation decision is reversible and stays within the approved scope, choose the simplest maintainable option and continue. Document assumptions that materially affect later work.
