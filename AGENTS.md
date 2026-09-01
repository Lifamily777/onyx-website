# ONYX Long-Term Development Principles

This file governs ongoing work in this repository. Apply these principles to product, content, design, engineering, and agent decisions.

## Core Principle

**Trust before transaction.**

ONYX is a knowledge-driven, education-first platform. Help users understand their situation before asking them to act, buy, book, or disclose personal information.

The preferred user experience sequence is:

> Question → Story → Explain → Try → See → Keep → Learn → Self-manage? → Deeper review? → Ask Sammi

Not every page must display every step, but the overall journey should preserve this order.

## Product Architecture

The vertical capital stages are:

1. Survival
2. Stability
3. Protection
4. Growth
5. Strategic
6. Optionality & Legacy

The horizontal domains are:

- Wealth
- Wellness

Use centralized, data-driven, reusable architecture where possible. Preserve the existing locale-aware routing and multilingual content model.

## Wealth and Commercial Boundaries

Long-term Wealth business goals may include:

- tax planning consultation
- appropriate life-insurance and risk-transfer solutions
- business-owner planning
- retirement planning
- recurring planning relationships

Commercial conversion must occur only after education and genuine need identification. Do not design ONYX as an obvious insurance lead funnel.

The insurance journey must follow:

> identified risk → education → needs analysis → alternatives → product discussion

Do not jump from a quiz answer or generic article directly to a product recommendation.

## Wellness Boundaries

Wellness must remain education-first. USANA may later appear as an optional resource or product layer, but it must never be the assumed or predetermined answer to an assessment.

## NS Federation

NS Federation may appear only as a separate embedded professional-resource page. Do not create or imply an ONYX-owned federation brand.

## Bilingual Content

- English is primary.
- Chinese appears directly below the English or in a clearly paired presentation.
- Keep terminology consistent across navigation, assessments, tools, articles, SEO, and structured data.
- Preserve the existing locale-aware architecture and all supported locales.

## Tax Content Safety

- Lead with education.
- Do not invent deadlines, thresholds, rates, eligibility rules, or tax-law conclusions.
- Verify claims involving current law against authoritative primary sources.
- Use cautious language when facts or current law may change.
- Never promise tax savings.

## Insurance Content Safety

- Never promise guaranteed tax-free income.
- Never claim or imply that IUL is automatically appropriate for a user.
- Do not use “best product” or similar language that makes an unsupported suitability determination.
- Keep examples educational and make assumptions visible.

## Protected Behavior and Files

Do not break or remove:

- `/capital-assessment`
- `/survey`
- existing user edits in `src/components/InsightArticlePage.jsx`
- existing user edits in `src/components/InsightArticlePage.module.css`

Treat pre-existing user work as owned by the user. Preserve it unless the user explicitly asks to change it.

## Verification

After every business-code change, run every currently available applicable check:

```text
npm test
npm run build
git diff --check
```

Run lint as well when a lint command is configured. Report failures and warnings accurately; do not silently weaken tests or validation to make checks pass.
