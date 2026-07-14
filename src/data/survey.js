// ─── ONYX PATHWAY ASSESSMENT — scoring engine ──────────────────────────────
// 10 questions · ~4–6 min · no sensitive personal data collected.
//
// This file holds only IDs and score weights — no display text. All
// question/option/result copy lives in the locale files (src/locales/*.js)
// under the `survey` key, so the same engine drives all six languages.
// This structure, the scoring weights, and the tie-break inputs are
// preserved from the original assessment; only the display layer changed.

export const TIER_IDS = ['wellness', 'tax', 'risk']

// Maps each result tier to the existing ONYX learning-area route.
export const TIER_ROUTE = { tax: 'tax', risk: 'ins', wellness: 'health' }

export const surveyQuestions = [
  {
    id: 'age',
    options: [
      { id: 'under30', scores: { tax: 2, risk: 2, wellness: 0 } },
      { id: '30s', scores: { tax: 1, risk: 3, wellness: 1 } },
      { id: '40s', scores: { tax: 0, risk: 2, wellness: 3 } },
      { id: '50plus', scores: { tax: 0, risk: 1, wellness: 5 } },
    ],
  },
  {
    id: 'children_count',
    options: [
      { id: 'none', scores: { tax: 0, risk: 0, wellness: 4 } },
      { id: 'one', scores: { tax: 0, risk: 3, wellness: 1 } },
      { id: 'two', scores: { tax: 1, risk: 4, wellness: 0 } },
      { id: 'three_plus', scores: { tax: 3, risk: 3, wellness: 0 } },
      { id: 'planning', scores: { tax: 1, risk: 4, wellness: 0 } },
    ],
  },
  {
    id: 'children_ages',
    options: [
      { id: 'na', scores: { tax: 0, risk: 0, wellness: 3 } },
      { id: 'all_young', scores: { tax: 0, risk: 6, wellness: 0 } },
      { id: 'mixed_ages', scores: { tax: 1, risk: 5, wellness: 1 } },
      { id: 'all_teens', scores: { tax: 1, risk: 3, wellness: 2 } },
      { id: 'three_plus_all_minors', scores: { tax: 8, risk: 2, wellness: 0 } },
    ],
  },
  {
    id: 'income_stage',
    options: [
      { id: 'building', scores: { tax: 4, risk: 0, wellness: 0 } },
      { id: 'steady', scores: { tax: 2, risk: 2, wellness: 1 } },
      { id: 'growing', scores: { tax: 1, risk: 2, wellness: 2 } },
      { id: 'established', scores: { tax: 0, risk: 1, wellness: 4 } },
    ],
  },
  {
    id: 'savings_room',
    options: [
      { id: 'tight', scores: { tax: 4, risk: 0, wellness: 0 } },
      { id: 'some', scores: { tax: 3, risk: 1, wellness: 0 } },
      { id: 'comfortable', scores: { tax: 0, risk: 3, wellness: 2 } },
      { id: 'substantial', scores: { tax: 0, risk: 2, wellness: 3 } },
    ],
  },
  {
    id: 'debt',
    options: [
      { id: 'minimal', scores: { tax: 2, risk: 0, wellness: 2 } },
      { id: 'manageable', scores: { tax: 2, risk: 2, wellness: 1 } },
      { id: 'significant', scores: { tax: 1, risk: 4, wellness: 0 } },
      { id: 'heavy', scores: { tax: 0, risk: 5, wellness: 0 } },
    ],
  },
  {
    id: 'health',
    options: [
      { id: 'excellent', scores: { tax: 2, risk: 1, wellness: 0 } },
      { id: 'good', scores: { tax: 1, risk: 2, wellness: 1 } },
      { id: 'fatigue', scores: { tax: 0, risk: 1, wellness: 3 } },
      { id: 'subhealth', scores: { tax: 0, risk: 0, wellness: 5 } },
    ],
  },
  {
    id: 'workload',
    options: [
      { id: 'predictable', scores: { tax: 2, risk: 1, wellness: 0 } },
      { id: 'occasional', scores: { tax: 1, risk: 2, wellness: 1 } },
      { id: 'travel', scores: { tax: 0, risk: 1, wellness: 4 } },
      { id: 'high_stress', scores: { tax: 0, risk: 2, wellness: 5 } },
    ],
  },
  {
    id: 'protection',
    hasHint: true,
    options: [
      { id: 'not_ready', scores: { tax: 1, risk: 4, wellness: 0 } },
      { id: 'somewhat', scores: { tax: 0, risk: 4, wellness: 1 } },
      { id: 'fairly', scores: { tax: 1, risk: 1, wellness: 2 } },
      { id: 'well', scores: { tax: 0, risk: 0, wellness: 4 } },
    ],
  },
  {
    id: 'priority',
    options: [
      { id: 'tax', scores: { tax: 5, risk: 0, wellness: 0 } },
      { id: 'protect', scores: { tax: 0, risk: 5, wellness: 0 } },
      { id: 'health', scores: { tax: 0, risk: 0, wellness: 5 } },
      { id: 'balance', scores: { tax: 1, risk: 2, wellness: 2 } },
    ],
  },
]
