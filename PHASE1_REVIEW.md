# ONYX Phase 1 — implementation review

Status: initial Phase 1 plus requested persistence/PDF/canonical-library review changes implemented and tested; awaiting review. No commit, merge, deployment or Phase 2 work.

## Repository safety

- Worktree: `/Users/onyx/onyx-website-governance`
- Branch: `codex/onyx-v2-platform`
- Starting and current HEAD: `b41a82b5eccc5a7cd67d6d51bb67f2a9687c4e80`
- The requested worktree was clean before implementation.
- No changes were made to `/Users/onyx/onyx-website` or its protected InsightArticlePage edits.
- No existing functional components were deleted.

## September 4 background

Identified from commit `ec781a1a4ba8ab9bd227d131ae3a2cf482344ea5`, dated September 4, 2026, “feat: add sun and moon sea homepage hero.”

- Desktop: `public/assets/onyx-sun-moon-sea-hero.jpg` — Git blob `4d6aa4d552dd849786dca8d6dce116bf54443585`.
- Mobile: `public/assets/onyx-sun-moon-sea-hero-mobile.jpg` — Git blob `d1f5d8948da1c8fbc10480891ccacca8ff139ddd`.

Both assets match that commit. Existing image URLs and responsive background rules remain unchanged. Only foreground homepage layout rules were appended.

## Resulting homepage

The sun-and-moon sea visual supports the new headline: “You don’t need more financial products. You need to know how they fit together.” The primary CTA is “Start Your ONYX Profile.” Supporting sections describe the existing pieces of a household’s financial life, four clarity questions, the four tax strategy categories, and Profile → Strategy → Implementation → Ongoing guidance. The audience is W-2 professionals, 1099 earners and small business owners. The page avoids product selection, lead capture and financial outcome promises.

## Routes and navigation

All new routes use the existing shared English/Chinese route architecture, including `/zh` equivalents.

- `/profile`: ONYX Profile discovery survey.
- `/strategies`: Tax Strategy Hub and an illustrative household relationship view.
- `/strategies/tax-later`, `/strategies/tax-now`, `/strategies/tax-advantage`, `/strategies/tax-architecture`.
- `/strategies/:categoryId/:topicId`: reusable educational topic outlines.
- `/strategies/tax-advantage/real-estate`: first-class Real Estate Strategies landing.
- `/strategies/tax-advantage/real-estate/:moduleId`: eight reserved educational modules.
- `/build`: restrained future implementation/guidance directory; no service activation.
- `/learn`: searchable/filterable canonical library of seven existing Insights, six existing videos and three external IRS resources, plus the existing glossary link.

Header and footer navigation now use Assess → Strategize → Build → Learn. Header links remain reachable on phones. The dense legacy architecture navigator is hidden on the homepage and new journey pages; it remains available on legacy pages. Unknown strategy categories, topics and modules resolve to NotFound.

## Profile survey

37 optional fields across eight sections:

1. Income and tax: filing status, household annual W-2, 1099, business and other income bands; self-reported approximate marginal bracket; state of residence.
2. Retirement and tax accounts: Traditional/Roth 401(k), Traditional/Roth IRA, SEP, SIMPLE, Solo 401(k), HSA and other accounts, with contribution and sponsorship status where appropriate.
3. Protection: life, employer life, medical, disability, liability and other coverage.
4. Assets: residence, brokerage, stock exposure, cash, business ownership and other assets.
5. Real estate: residence, investment property count/types, residential/commercial and long-/short-term rental interests, purchase/sale plans, 1031 interest, cash flow/appreciation preference, borrowing comfort and overall real estate preference.
6. Debt: mortgage, investment property, auto, student, personal, business and other liabilities.
7. Preferences: risk tolerance plus independent stock, real estate and entrepreneurship interest dimensions.
8. Liquidity: longer-term allocation range, monthly investable cash flow, emergency reserve concerns and major anticipated expenses.

Every field supports skipping, uncertainty and privacy. “None” and privacy/uncertainty options are mutually exclusive with positive multi-select answers. Account options are tailored to account type. Income bands are not legal thresholds; no tax bracket or eligibility calculation occurs.

The result is an ONYX Client Capital Profile summarizing answers, with editing and a direct local PDF download. Missing answers remain visibly missing. The profile now uses temporary browser session storage, with one record shared across language versions. Internal navigation and refresh preserve answers, progress and the completed summary. There is no scoring, recommendation engine, backend submission or credential collection. See the review-change sections below for exact persistence and clearing behavior.

The original scored `/survey` remains unchanged, rather than being silently replaced by this materially different discovery process.

## Strategy architecture

- Tax Later: Traditional 401(k)/IRA, SIMPLE, SEP, Solo 401(k), qualified plans and future Defined Benefit/Cash Balance.
- Tax Now: Roth IRA/401(k), backdoor Roth and conversion outlines. IUL has a separate insurance subsection, explicit account-type boundaries and an unavailable future “Explore an Illustration” area; no carrier connection.
- Tax Advantage: real estate, HSA, 529 and charitable strategies.
- Tax Architecture: existing business; new income engine; optional future Health & Wellness Business; AI-Powered One-Person Company.

The reusable educational outline reserves definition, eligibility, current-tax effects, contribution/framework concepts, limitations, suitability/non-suitability questions and future guidance. Published articles, videos and external resources now appear through the shared contextual library view, not separate placeholder collections. Detailed new tax content is intentionally forthcoming.

Real estate modules: rental property; depreciation/basis; cost segregation; 1031 exchange; short-term rentals; passive activity; material participation; real estate professional status. Planned topics distinguish capital allocation from fact-dependent tax treatment. No property answer establishes tax eligibility or W-2 offsets.

## Existing functionality preserved but no longer promoted on the homepage

Capital Map and event routes, Family Capital Review, the four previous knowledge paths, founder/contact content, capital assessment, original survey, Insights/article rendering, glossary, Wellness, NS Federation and related tools remain. Their routes and source implementations were not removed. Global search remains unchanged; new strategy outlines are reached through navigation and are not yet added to its legacy search index.

## Files changed

Modified:

- `src/App.jsx` — new shared locale-aware routes and lazy imports.
- `src/components/HomePage.jsx` — homepage positioning and information architecture.
- `src/components/HomePage.module.css` — foreground layout only.
- `src/components/Nav.jsx` — four primary journey links and visible mobile wordmark.
- `src/components/Nav.module.css` — accessible mobile navigation layout.
- `src/components/Footer.jsx` — matching navigation and audience wording.
- `src/components/Layout.jsx` — show legacy architecture navigator only on legacy pages.

Created:

- `src/components/OnyxProfilePage.jsx` — discovery flow and capital profile summary.
- `src/components/StrategyPage.jsx` — reusable hub, category, topic and real estate module renderer.
- `src/components/PhaseOneResourcePage.jsx` — Build and Learn structures.
- `src/components/PhaseOne.module.css` — responsive shared styling and print treatment.
- `src/features/onyxProfile/schema.js` — bilingual discovery schema and answer helpers.
- `src/features/onyxProfile/strategies.js` — bilingual category/module registry and reusable outline sections.
- `src/features/foundationV2/__tests__/onyxPhaseOne.test.js` — four discovery/hierarchy tests, included in the existing test command.
- `PHASE1_REVIEW.md` — this report.

Package scripts, legacy survey logic, assessment engine, homepage image files and InsightArticlePage files remain unchanged. The review changes add pdf-lib and @pdf-lib/fontkit dependencies and their lockfile entries, plus a licensed local font. The full cumulative file inventory is listed below.

## Verification

- `npm test`: 145 passed, 0 failed, including four initial Phase 1 tests and eight review-change tests.
- `npm run build`: passed, 390 modules transformed. The shared NotFound import warning remains. Vite also warns about the 510.97 kB main chunk and 1,011.66 kB PDF chunk (509.76 kB gzip). The PDF chunk is dynamically imported only when exporting; warning thresholds were not weakened.
- `git diff --check`: passed. New-file whitespace checked separately.
- Lint: no lint script is configured.
- `npm run validate:capital`: exit 0; three PASS and two REVIEW cases in unchanged assessment logic:
  - Stable Middle-Income Builder: strategic status is `needs_attention`, while expected intuition favored `developing`.
  - Concentrated Business Owner: `optionality_builder` temperament is outside the plausible set.
- Build warning: NotFound is imported both statically and dynamically, so the dynamic import does not create a separate chunk. This shared-import pattern already exists; StrategyPage also uses that component.
- Browser: desktop hero inspected at 1440 px; phone layout checked at 390 and 320 px without horizontal overflow in the checked views. Full synthetic profile completion and summary, optional skipping, answer editing, Chinese language switching with retained answers, Chinese real estate navigation, representative new routes, invalid topic handling and original English/Chinese assessment routes checked. No captured console errors.
- September 4 asset Git blobs match exactly.

## Review items and deliberate limits

1. Review English and Chinese positioning and financial terminology before publication.
2. Category descriptions are educational framing. All later detailed tax eligibility, limits, contribution rules and strategy content require current primary-source verification and professional review.
3. Pay particular attention to IUL separation; 1031, short-term-rental and real-estate-professional boundaries; and genuine-business/profit-motive wording for USANA-related and AI business pathways. No automatic deductions, savings or financial outcomes are promised.
4. Review the requested temporary tab-session retention model and explicit clear/end confirmation wording. There is no lead capture or submission.
5. Detailed new educational content, implementation services and illustration integrations remain future structures. Existing videos are now reused in the canonical library; no new videos were authored.
6. The two legacy capital validation REVIEW cases and non-blocking build warning are recorded above; they were not suppressed or changed.

Verified resource entry points (September 11, 2026): [IRS retirement plans](https://www.irs.gov/retirement-plans), [IRS rental income and expenses](https://www.irs.gov/taxtopics/tc414), [IRS small business and self-employed](https://www.irs.gov/businesses/small-businesses-self-employed).

Implementation stops here for review. A dedicated Phase 1 commit requires the user's later approval.


## Additional review changes: temporary working session

- Mechanism: `sessionStorage`, key `onyx.profile.session.v1`, plus an application-level React provider above every page/locale route.
- One locale-independent record stores versioned canonical option IDs, current section, a completed summary when appropriate, and the fingerprint of the answers whose PDF the user confirmed saving.
- Synchronous storage writes occur when answers/progress change, before navigation can unmount the form. Summary display is rebuilt from validated answers, not trusted from arbitrary cached text.
- Internal Assess/Strategize/Build/Learn/Insights navigation, language switches and same-tab reloads preserve the working session. Tabs have separate browser sessions; no cross-tab or cross-device synchronization is claimed.
- Closing a tab normally discards session storage, but browser session recovery may restore it. Private browsing, blocked storage or browser clearing can affect persistence. The UI explains this and recommends explicit clearing on shared devices.
- If storage is unavailable, the application provider still preserves internal navigation in memory and shows a warning about reload/close loss. Invalid/version-incompatible caches are safely removed. A failed storage deletion is reported without claiming successful clearing.
- Profile values are not included in URLs, sent to a server, analytics, CRM, API, PDF service or remote storage. PDF generation fetches only a static same-origin font; it does not transmit answers.
- The existing account-specific answer choices remain. Cached input is additionally normalized to known field/option IDs, deduplicated, and exclusive `none`/`unknown`/`private` multi-select values are enforced. No SSNs, credentials, exact account/policy numbers or arbitrary free-text data can enter the schema.

## Exact PDF/clear/end behavior

- **Save My Profile as PDF / 将我的概况保存为 PDF** generates a local file at any in-progress or completed stage.
- A save alone never clears data. The user confirms “I have saved my PDF” before the current answers are treated as saved. Editing an answer makes the working profile unsaved again.
- **Clear My Profile / 清除我的概况** opens the requested save-before-clearing question, with **Save PDF and Clear**, **Clear Without Saving**, and **Cancel**.
- **Save PDF and Clear** initiates the download, retains the cache, and asks the user to verify the saved file before the final explicit clearing confirmation. Generation failure or Cancel retains the session.
- **Clear Without Saving** is an explicit confirmation inside the dialog; it removes only the ONYX profile key and resets the profile to the introduction. It does not clear other browser data.
- **End Session** opens the same confirmation workflow with **Save PDF and End Session / 保存 PDF 并结束**, **End Without Saving / 不保存并结束**, and Cancel.
- The save-and-end route uses the same verified-download-before-clearing sequence. End Without Saving explicitly clears the record. Merely opening/dismissing a dialog never clears it.
- Native `beforeunload` handling is active whenever there is a working profile without a confirmed current PDF, across all ONYX pages. Browser-controlled generic wording may be shown; custom text and display cannot be guaranteed, particularly on mobile/embedded browsers. The embedded QA browser did not expose a visible reload dialog. Restoration after reload was verified independently; the cache is the primary protection.

## Local PDF implementation and inspection

- `pdf-lib` + `@pdf-lib/fontkit`, dynamically loaded for export.
- Bundled 165,880-byte **ONYX Profile Sans** TrueType font, derived by subsetting and converting open-source Noto Sans CJK SC; OFL license and attribution included under `public/assets/fonts/`.
- Selectable bilingual text, A4 pagination, ONYX branding, generation date, page numbers, major profile sections, supplied answers and educational disclaimer.
- Unanswered individual fields are omitted; sections without supplied answers explicitly say that missing information is not a negative answer.
- No scores, product choices or inferred tax eligibility are included.
- The initial OpenType embedding issue found during PDF rendering was fixed using a TrueType subset. Final Poppler renders have no font errors.
- English and Chinese maximal synthetic profiles were generated with the exact runtime PDF builder, rendered and visually inspected on all four pages each. Text extraction confirmed Chinese glyphs and disclaimer content.
- Browser downloads in both languages were also generated and parsed; the English partial profile was rendered and inspected on both pages. These QA PDFs contain synthetic test answers, not client data. Browser save-and-clear and save-and-end controls were exercised.
- Download initiation cannot prove that an OS/browser completed saving the file; the explicit user confirmation avoids clearing based on that assumption.

## One canonical content library

`src/data/contentLibrary.js` adapts the existing published Insights and `servicePages` video objects by reference. It adds three canonical external resource entries. There are currently **7 articles, 6 videos and 3 external resources**.

- Existing Insight bodies are not copied or rewritten. Six article records receive only a `learning` metadata property; the remaining general-learning record receives safe default tags through the adapter.
- Existing video objects receive metadata in their current source; the library deduplicates them by video ID. No new video collection with copied titles/bodies is created.
- Supported metadata: resource type, available language(s), strategy categories, specific topic IDs, audiences and general-learning flag.
- `queryContentLibrary` returns references to canonical resource objects; Learn and strategy views use the same function and `ContentLibraryView` renderer.
- Learn offers search plus category, content-type, resource-language, audience and general-learning filters. Untagged general education remains discoverable without being forced onto a strategy page.
- Category/topic/module pages filter the canonical resources using matching tags. Unpublished topics show an honest empty state rather than invented content.
- The existing IUL Insight was verified to have the identical `insight:term-vs-gul-vs-iul-family-capital` ID in Learn and IUL strategy views and retain its original `/insights/term-vs-gul-vs-iul-family-capital` URL.
- Articles without the selected translation link to their existing published-language URL and label that language. They do not route to an unavailable translation or create a duplicate article.
- Existing `/insights`, slug routing, publication filtering and article renderers remain. Existing bilingual editorial layouts are preserved.
- Existing video source records do not establish spoken language, so the adapter explicitly labels them “Language not verified” rather than inventing language metadata. Video language verification remains an editorial review item.

## Additional verification and warnings

- Browser sequence verified: start and answer fields → Strategy Hub → Tax Now → Learn → English/Chinese switch → Profile; prior answer values and section restored.
- Reload restored supplied filing status, income and state. Completed summary restored after Learn → Assess.
- Clear Cancel retained values. Save PDF and Clear retained them until final confirmation, then removed them across reload. Clear Without Saving and both end-session choices worked.
- Learn/IUL shared IDs verified in rendered DOM; existing Insight link opened, and original-language-only linking verified.
- Chinese Learn filters checked at 390 px with no horizontal overflow. Final captured browser error log was empty.
- `npm audit` reports **8 vulnerabilities (4 moderate, 4 high)** in unchanged existing packages/dependency chains: baseline-browser-mapping, browserslist, esbuild, nanoid, postcss, react-router, react-router-dom and vite. The new PDF dependencies were not listed in the audit findings. No unrelated/breaking dependency upgrades were applied.
- npm also noted existing esbuild/fsevents install scripts not covered by the current allow-scripts configuration. No blanket script approval was granted; build nevertheless passes.
- No lint script is configured. Existing capital-assessment review flags recorded earlier remain outside this change.

## Full cumulative working-tree file inventory

This includes both the initial Phase 1 implementation and these additional review changes. Paths are relative to the governance worktree; no commit has been created.

- `PHASE1_REVIEW.md`
- `package-lock.json`
- `package.json`
- `public/assets/fonts/OFL.txt`
- `public/assets/fonts/ONYXProfileSans.ttf`
- `public/assets/fonts/README.md`
- `src/App.jsx`
- `src/components/ContentLibraryView.jsx`
- `src/components/Footer.jsx`
- `src/components/HomePage.jsx`
- `src/components/HomePage.module.css`
- `src/components/Layout.jsx`
- `src/components/Nav.jsx`
- `src/components/Nav.module.css`
- `src/components/OnyxProfilePage.jsx`
- `src/components/PhaseOne.module.css`
- `src/components/PhaseOneResourcePage.jsx`
- `src/components/ProfileSessionActions.jsx`
- `src/components/StrategyPage.jsx`
- `src/data/content.js`
- `src/data/contentLibrary.js`
- `src/data/insights/tax-underpayment-penalties.js`
- `src/data/insights/technology-does-not-decide-for-you.js`
- `src/data/insights/term-vs-gul-vs-iul-family-capital.js`
- `src/data/insights/the-third-ledger-partnership-basis.js`
- `src/data/insights/waic-ai-super-node-agent-os-opc-agi.js`
- `src/data/insights/why-chinese-families-love-saving-but-distrust-insurance.js`
- `src/features/foundationV2/__tests__/onyxPhaseOne.test.js`
- `src/features/foundationV2/__tests__/onyxPhaseOneReview.test.js`
- `src/features/onyxProfile/ProfileSessionContext.jsx`
- `src/features/onyxProfile/copy.js`
- `src/features/onyxProfile/pdf.js`
- `src/features/onyxProfile/schema.js`
- `src/features/onyxProfile/session.js`
- `src/features/onyxProfile/strategies.js`
