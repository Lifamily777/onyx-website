import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ONYX_SEARCH_INDEX, normalizeSearchTerm, searchOnyx } from '../../search/index.js'

const root = new URL('../../../../', import.meta.url)
const source = path => readFileSync(new URL(path, root), 'utf8')
const includesId = (query, id) => searchOnyx(query).some(item => item.id === id)

test('global search index covers all five discovery groups', () => {
  assert.deepEqual([...new Set(ONYX_SEARCH_INDEX.map(item => item.group))].sort(), ['DECISIONS','INSIGHTS','KNOWLEDGE','LIFE EVENTS','TOOLS'])
  assert.ok(ONYX_SEARCH_INDEX.some(item => item.id.startsWith('insight:')))
})

test('English aliases and financial punctuation normalize consistently', () => {
  assert.equal(normalizeSearchTerm('401(k)'), normalizeSearchTerm('401-k'))
  assert.equal(normalizeSearchTerm('pro-rata'), normalizeSearchTerm('pro rata'))
  assert.equal(normalizeSearchTerm('back door Roth'), normalizeSearchTerm('Backdoor Roth'))
  assert.equal(normalizeSearchTerm('S Corp'), normalizeSearchTerm('S corporation'))
  assert.ok(includesId('401k', 'decision:job-change-old-401k'))
  assert.ok(includesId('pro-rata', 'knowledge:pro-rata'))
  assert.ok(includesId('S Corp', 'guide:business-payroll-retirement'))
  assert.ok(includesId('529', 'guide:new-baby-education'))
  assert.ok(includesId('1031 exchange', 'guide:rental-equity'))
})

test('Chinese searches share the same structured concepts', () => {
  assert.ok(includesId('换工作', 'event:job-change'))
  assert.ok(includesId('副业', 'guide:second-income-engine'))
  assert.ok(includesId('孩子教育', 'guide:new-baby-education'))
})

test('unknown topics return a safe zero-result state', () => {
  assert.deepEqual(searchOnyx('unindexed quantum alpaca treaty'), [])
  assert.deepEqual(searchOnyx(''), [])
})

test('header search is accessible, keyboard-enabled, and non-persistent', () => {
  const nav = source('src/components/Nav.jsx')
  const ui = source('src/components/GlobalSearch.jsx')
  const engine = source('src/features/search/searchEngine.js')
  assert.match(nav, /<GlobalSearch \/>/)
  assert.match(ui, /aria-modal="true"/)
  assert.match(ui, /event\.metaKey \|\| event\.ctrlKey/)
  assert.match(ui, /event\.key === 'Escape'/)
  assert.match(ui, /localePath\(item\.path\)/)
  assert.doesNotMatch(`${ui}${engine}`, /localStorage|sessionStorage|fetch\(|XMLHttpRequest/)
})
