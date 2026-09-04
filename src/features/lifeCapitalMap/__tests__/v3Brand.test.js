import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { V3_PATHS, EDUCATIONAL_GUIDANCE_DISCLAIMER } from '../../../data/v3Brand.js'

test('V3 exposes four unique bilingual working-family knowledge paths', () => {
  assert.equal(V3_PATHS.length, 4)
  assert.equal(new Set(V3_PATHS.map((path) => path.id)).size, 4)
  for (const path of V3_PATHS) {
    for (const key of ['eyebrow', 'subtitle', 'title', 'description', 'eyebrowZh', 'subtitleZh', 'titleZh', 'descriptionZh', 'cta', 'ctaZh']) {
      assert.ok(path[key], `${path.id}.${key} is required`)
    }
    assert.ok(path.topics.length >= 6)
    assert.equal(path.topics.length, path.topicsZh.length)
  }
})

test('V3 public routes are locale-aware additions and retained V2 routes remain present', () => {
  const app = readFileSync(new URL('../../../App.jsx', import.meta.url), 'utf8')
  for (const route of ['keep-more', 'build-for-tomorrow', 'fund-their-future', 'protect-the-plan', 'capital-map', 'foundation', 'survey', 'capital-assessment']) {
    assert.match(app, new RegExp(`path="${route.replaceAll('/', '\\/')}"`))
  }
})

test('standard educational disclaimer preserves advice and licensed-review boundaries', () => {
  assert.match(EDUCATIONAL_GUIDANCE_DISCLAIMER.en, /not individualized tax, legal, investment, or insurance advice/i)
  assert.match(EDUCATIONAL_GUIDANCE_DISCLAIMER.en, /needs analysis/i)
  assert.match(EDUCATIONAL_GUIDANCE_DISCLAIMER.zh, /不构成个性化/)
})
