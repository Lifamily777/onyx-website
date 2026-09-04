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

### Core Content Principle

> Teach enough to reveal the problem. Explain enough to build trust. Personalize only when the client's facts are known.

> 讲到客户看见问题，解释到客户建立信任；真正的方案，建立在客户自己的事实和数字之上。

This does not permit omission of material facts or artificial information asymmetry. Explain the issue, importance, connections, available choices, and what to understand before acting. Stop before a final public-page decision when personal facts, calculations, suitability, plan rules, legal facts, or professional judgment determine the answer.

Use three content depths: **Discover** reveals an overlooked issue; **Understand** explains connections, major choices, and trade-offs; **Decide** applies actual client facts. Public Knowledge Guides generally end at Understand and identify the facts needed for Decide.

- usability over extra content
- trust over a stronger CTA
- explanation over jargon
- transparent assumptions over false precision
- data-driven reusable architecture over hard-coded pages
- progressive disclosure over overwhelming questionnaires
- neutral education over predetermined product conclusions
- a visible stopping point over a simulated individualized answer

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
