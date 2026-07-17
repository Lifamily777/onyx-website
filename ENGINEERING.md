# ONYX Engineering Guide

Version: 0.1

Last Updated: 2026-07-16

Related documents: [README.md](./README.md) · [BRAND_BIBLE.md](./BRAND_BIBLE.md) · [CONTENT_BIBLE.md](./CONTENT_BIBLE.md)

---

# Mission

Build software that reduces complexity while preserving human judgment.

Software should help people make better decisions—not replace their ability to think.

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

## 5. Plan Before Code

Every implementation follows this sequence:

1. Read
2. Explain
3. Propose implementation
4. Identify affected files
5. Wait for approval
6. Implement
7. Build
8. Verify
9. Commit only after approval
10. Push only after approval

Thinking comes before coding.

---

## 6. Small Atomic Changes

Each commit should have one clear purpose.

Avoid unrelated refactoring.

Stage only approved files.

Review:

- git diff
- git diff --cached
- git status

before every commit.

---

## 7. Git Is Source of Truth

### Start every session

- git status
- git fetch
- compare local main with origin/main
- git pull --ff-only (when appropriate)

### Before committing

- npm run build
- git diff --check
- git diff --cached --stat
- git status

### Before pushing

Confirm:

- commit hash
- target branch
- deployment target

Never push blindly.

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

# Release Checklist

Before every production release:

- [ ] Correct repository
- [ ] Correct branch
- [ ] Synced with origin/main
- [ ] Scope approved
- [ ] Build passed
- [ ] Whitespace check passed
- [ ] Local routes tested
- [ ] Only approved files staged
- [ ] Commit reviewed
- [ ] Push approved
- [ ] Deployment verified

---

# Lesson Learned

July 16, 2026

A local project can appear correct while still being behind production.

Always verify:

- remote history
- production baseline
- deployment target
- repository ownership

before implementing any feature.

Today's lesson reinforced one principle:

Understand first.
Build second.

---

# Version

Version: 0.1
Last updated: 2026-07-16
