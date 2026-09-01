# ONYX Capital Priority Assessment V1 — Release Readiness

Assessment version: `1.1`
Scoring version: `1.0`
Target: Cloudflare Pages via the existing Vite production build

## Release gate

Run before pilot deployment:

```bash
npm test
npm run validate:capital
npm run build
git diff --check
```

## Routing

- [x] `/capital-assessment` is registered in the shared React Router route set.
- [x] `/:locale/capital-assessment` uses the same route and locale-aware layout.
- [x] `public/_redirects` supports refresh and direct URL access through SPA fallback.
- [x] Unsupported locales fail safely through the existing `Layout`/`NotFound` behavior.
- [x] `/survey` remains a separate, unchanged Self Assessment.

## Content

- [x] Exactly 30 sequential questions are validated by automated tests.
- [x] Approved English and Chinese copy is live in one structured dataset.
- [x] No temporary-copy markers remain.
- [x] English appears first with Chinese directly below throughout the flow and result.
- [x] Result labels use only the approved vocabularies.
- [x] The educational disclaimer is visible at the bottom of the Capital Map.

## Engine

- [x] `assessmentVersion = 1.1` and `scoringVersion = 1.0` appear in results, storage, and validation output.
- [x] Result generation is deterministic.
- [x] Q29 remains profile-only and does not affect the Legacy average or Primary Position.
- [x] N/A options are excluded from averages.
- [x] All-solid and concentrated-risk cases are tested.
- [x] No total financial-health score is calculated or displayed.

## Persistence and recovery

- [x] Incomplete valid progress resumes from browser `localStorage`.
- [x] Malformed JSON, malformed answers, and incompatible versions are cleared safely.
- [x] A stored completed assessment must contain all Q1–Q30 answers or it is rejected.
- [x] Storage read/write/removal failures do not crash the in-session assessment.
- [x] Retake requires confirmation and then starts at Q1.
- [x] Completed valid progress recreates its result deterministically after refresh.
- [ ] Cross-device resume is not supported in V1; progress is browser-local.

## Accessibility and mobile

- [x] Answer choices and actions are semantic keyboard-accessible buttons.
- [x] Focus-visible treatment is provided globally and on answer controls.
- [x] Progress uses an accessible progressbar role and numeric bounds.
- [x] Micro-insights announce through `aria-live="polite"`.
- [x] Result statuses include text and markers rather than color alone.
- [x] Result sections follow semantic heading hierarchy.
- [x] Mobile layouts stack ladder, cards, prompts, and actions without horizontal diagrams.
- [x] Reduced-motion rules disable nonessential transitions.

## Privacy and analytics

- [x] The assessment asks no names, email addresses, account numbers, or other required PII.
- [x] Raw answers stay in browser storage and results are calculated client-side.
- [x] No backend or database receives assessment answers.
- [x] The intro explains browser-local persistence and its best-effort nature.
- [x] Pilot analytics defaults to no-op because no provider is configured.
- [x] The optional event abstraction allowlists only event names, layer IDs, and five-question progress buckets.
- [x] Raw answers, tags, structure statuses, localStorage contents, risk, and temperament are not accepted as event properties.
- [ ] ONYX must configure a reviewed event sink before any pilot telemetry is transmitted.

## SEO and production

- [x] The route uses the existing metadata hook with a dedicated title and description.
- [x] Vite production build and Cloudflare SPA fallback remain unchanged.
- [x] No production debug panel or validation fixture is imported by public components.
- [x] Print styling hides site navigation/actions, preserves result sections and disclaimer, and avoids major card breaks.
- [ ] Perform one final deployed-browser smoke test for console errors, direct-route refresh, keyboard flow, and print preview.

## Pilot observation checklist

- Confirm start, resume, completion, result-view, and retake events only after a reviewed sink is configured.
- Review progress by five-question bucket and layer; do not request or inspect individual answers.
- Watch for storage-disabled users losing progress after refresh while retaining in-session usability.
- Test common mobile widths and bilingual wrapping on the deployed asset bundle.
- Review support/feedback reports for unclear wording without collecting assessment answers automatically.
- Re-run all release gates before each pilot deployment.

## Known non-blocking V1 review items

1. Stable Middle-Income Builder: Strategic Capital resolves to Needs Attention because its average is below `3.0`.
2. Concentrated Business Owner: temperament resolves to Optionality Builder rather than Concentrated Operator.

Both follow the locked V1 logic and are not release-blocking contradictions.
