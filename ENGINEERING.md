# ONYX Engineering Guide

Version: 0.2

Last Updated: 2026-07-16

Related documents: [README.md](./README.md) · [BRAND_BIBLE.md](./BRAND_BIBLE.md) · [CONTENT_BIBLE.md](./CONTENT_BIBLE.md)

---

# Mission

Build software that reduces complexity while preserving human judgment.

Software should help people make better decisions—not replace their ability to think.

---

# Read First

Before writing any code, read, in order:

1. `DOC_INDEX.md` (if present)
2. `README.md`
3. `ENGINEERING.md` (this file)
4. `BRAND_BIBLE.md`
5. `CONTENT_BIBLE.md`
6. Relevant Claude Skills under `.claude/skills/`
7. `CLAUDE.md` (if applicable)

Understand the existing architecture before proposing any implementation.

Never start coding immediately.

---

# Core Principles

## 1. Verify Before Build

Before writing any code, always verify:

- Repository path
- Git remote
- Current branch
- Latest origin/main
- Production baseline
- Deployment target
- Current architecture

Never assume localhost represents production.

---

## 2. One Production Repository

GitHub origin/main is the single source of truth.

Never assume multiple production repositories exist.

Always verify where production is deployed before implementation.

---

## 3. Production Is Sacred

The main branch must always remain deployable.

Do not experiment directly on main.

Use:

- feature/* for active development
- archive/* only for preserving historical prototypes

Every change should improve production stability.

---

## 4. Architecture First

Before implementing any feature:

- Understand the existing architecture.
- Reuse existing patterns whenever possible.
- Extend instead of replacing.
- Design for long-term maintainability.

Do not port code blindly from previous prototypes.

Reimplement features natively inside the current architecture.

---

## 5. Development Workflow

Every implementation follows this sequence:

1. Understand the request.
2. Review the architecture.
3. Explain the root cause.
4. Propose the smallest safe solution.
5. Wait for approval if the scope changes.
6. Implement.
7. Verify (see Quality Assurance below).
8. Report.
9. Stage only approved files.
10. Commit only after approval.
11. Push only after approval.

Thinking comes before coding.

---

## 6. Small Atomic Changes

Each commit should have one clear purpose.

Avoid unrelated refactoring.

Never stage unrelated files.

Before committing, show:

- `git diff --cached --stat`
- `git status --short`

Show `git status --short` again after committing.

---

## 7. Git Is Source of Truth

### Start every session

- `git status`
- `git fetch`
- compare local main with origin/main
- `git pull --ff-only` (when appropriate)

### Before pushing

Confirm:

- commit hash
- target branch
- deployment target

Never push without explicit approval. Never push blindly.

---

## 8. Content Is Data

Long-form editorial content belongs in structured data modules.

UI strings belong in locale dictionaries.

Presentation and content should remain independent whenever practical.

Design content structures that can scale to hundreds of articles.

See [CONTENT_BIBLE.md](./CONTENT_BIBLE.md) for how that content is created and published.

---

## 9. AI Explains Before Writing

AI should inspect the production architecture before generating code.

Before implementation, AI should explain:

- the architecture
- the design
- affected files
- implementation scope

AI must stop whenever uncertainty could affect production safety.

---

## 10. Human Judgment Is Final

AI accelerates implementation.

Humans decide:

- architecture
- priorities
- release timing
- production approval

The final decision always belongs to the human.

---

## 11. Release Philosophy

Prefer small, frequent, production-quality releases.

Shipping one meaningful improvement today is better than waiting for a perfect release.

Every release should leave the platform stronger than before.

---

# Quality Assurance

Every production change must pass all three verification stages.

## Stage 1 — Build Verification

Run:

```
npm run build
```

Build must succeed with no errors.

## Stage 2 — Static Verification

Run:

```
git diff --check
```

Then verify:

- Translation keys exist.
- No hardcoded UI strings remain.
- Route definitions are correct.
- Locale-aware navigation is preserved.
- No unintended file modifications.
- grep checks for important strings where appropriate.

Report `git status --short`.

## Stage 3 — Runtime Verification

Preferred: **Playwright** (automated end-to-end).

If Playwright is unavailable: perform manual verification.

Check all supported locales — English, Chinese, Spanish, Korean, French, German — for:

- [ ] Homepage
- [ ] Navigation
- [ ] Language Switcher
- [ ] Internal links preserve locale
- [ ] Refresh preserves locale
- [ ] Deep links
- [ ] CTA buttons
- [ ] Forms
- [ ] Mobile layout
- [ ] Desktop layout
- [ ] Browser Back / Forward
- [ ] No console errors

**Future improvement:** when Playwright is available, prefer automated end-to-end verification over manual testing. Every new production feature should eventually receive Playwright coverage.

---

# Localization Rules

Never hardcode visible UI text.

Every user-facing string must come from locale files.

Every supported language must contain a translation.

Do not intentionally leave supported locales using English fallback unless explicitly approved.

*Added after the July 16, 2026 Contact page incident — see Lesson Learned below.*

---

# Release Checklist

Before every production release:

- [ ] Correct repository
- [ ] Correct branch
- [ ] Synced with origin/main
- [ ] Scope approved
- [ ] Stage 1: Build passed
- [ ] Stage 2: Static verification passed (whitespace, translation keys, no hardcoded strings, routes correct)
- [ ] Stage 3: Runtime verification passed (Playwright, or documented manual check)
- [ ] Only approved files staged
- [ ] Commit reviewed
- [ ] Push approved
- [ ] Deployment verified

---

# Reporting Template

After every implementation, report:

1. Root cause.
2. Files changed.
3. Translation keys added or modified.
4. Build result.
5. Runtime verification results.
6. Remaining limitations.
7. `git status --short`

Stop. Do not commit unless instructed. Do not push unless instructed.

---

# Lesson Learned

## July 16, 2026 — Production baseline drift

A local project can appear correct while still being behind production.

Always verify:

- remote history
- production baseline
- deployment target
- repository ownership

before implementing any feature.

## July 16, 2026 — Silent locale fallback

A page can carry the correct locale in its URL and still fail the user: `ContactPage.jsx` preserved the right route for every language but rendered fixed, hardcoded English + Chinese text regardless of locale. Routing correctness does not guarantee content correctness — both must be verified independently. This is the direct origin of the Localization Rules above.

Today's lessons reinforced one principle:

Understand first.
Build second.

---

# ONYX Philosophy

Documentation defines the system.

Architecture guides implementation.

Code implements the design.

Verification protects production.

Human judgment has final authority.

---

# Version

Version: 0.2
Last updated: 2026-07-16
