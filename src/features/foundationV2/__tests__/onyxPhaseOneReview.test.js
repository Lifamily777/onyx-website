import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PROFILE_STORAGE_KEY, emptySession, readSession, writeSession, clearStoredSession, hasUnsavedProfile, answerFingerprint } from '../../onyxProfile/session.js'
import { profileSections, buildCapitalProfile } from '../../onyxProfile/schema.js'
import { profileDisclosure } from '../../onyxProfile/copy.js'
import { createProfilePdf } from '../../onyxProfile/pdf.js'
import fontkit from '@pdf-lib/fontkit'
import { PDFDocument } from 'pdf-lib'
import { getContentLibrary, queryContentLibrary, presentResource, resourcePath } from '../../../data/contentLibrary.js'
import { getAllInsights } from '../../../data/insights/index.js'

const storage = () => {
 const values = new Map()
 return { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }
}
test('one tab session round-trips answer IDs, progress and summary without locale records', () => {
 const cache = storage()
 const session = { ...emptySession(), answers: { w2: '100to200', assets: ['cash'], 'property-count': 'one' }, step: profileSections.length }
 assert.equal(writeSession(cache, session), true)
 const restored = readSession(cache)
 assert.equal(restored.session.step, profileSections.length)
 assert.equal(restored.session.answers.w2, '100to200')
 assert.deepEqual(restored.session.answers.assets, ['cash'])
 const record = JSON.parse(cache.getItem(PROFILE_STORAGE_KEY))
 assert.deepEqual(record.summary, buildCapitalProfile(session.answers))
 assert.equal(record.locale, undefined)
 assert.equal(hasUnsavedProfile(restored.session), true)
 const saved = { ...restored.session, savedFingerprint: answerFingerprint(restored.session.answers) }
 assert.equal(hasUnsavedProfile(saved), false)
 assert.equal(hasUnsavedProfile({ ...saved, answers: { ...saved.answers, w2: '200to400' } }), true)
})
test('corrupt, wrong-version and invalid-progress caches are rejected without breaking the session', () => {
 for (const value of ['{bad', JSON.stringify({version:99}), JSON.stringify({...emptySession(),step:999})]) {
  const cache = storage(); cache.setItem(PROFILE_STORAGE_KEY, value)
  assert.equal(readSession(cache).status, 'invalid')
  assert.equal(cache.getItem(PROFILE_STORAGE_KEY), null)
 }
 const broken = { getItem(){throw Error()},setItem(){throw Error()},removeItem(){throw Error()} }
 assert.equal(readSession(broken).status, 'unavailable')
 assert.equal(writeSession(broken, emptySession()), false)
 assert.equal(clearStoredSession(broken), false)
})
test('explicit clearing removes only the ONYX profile key', () => {
 const cache = storage(); cache.setItem('other-app', 'retained'); writeSession(cache, {...emptySession(),step:1})
 assert.equal(clearStoredSession(cache), true)
 assert.equal(cache.getItem(PROFILE_STORAGE_KEY), null)
 assert.equal(cache.getItem('other-app'), 'retained')
})
test('cached answers reject arbitrary data and normalize exclusive multi-select values', () => {
 const answers = buildCapitalProfile({ssn:'synthetic-invalid',assets:['cash','none','cash'],w2:{bad:'value'}})
 assert.deepEqual(answers.assets, ['none'])
 assert.equal(answers.ssn, undefined)
 assert.equal(answers.w2, '')
 assert.doesNotThrow(()=>buildCapitalProfile(null))
})
test('Learn and contextual strategy queries return the same canonical article and preserve all Insight URLs', () => {
 const library = getContentLibrary()
 const contextual = queryContentLibrary({category:'tax-now',topic:'iul'})
 const article = contextual.find(item=>item.id === 'insight:term-vs-gul-vs-iul-family-capital')
 assert.ok(article)
 assert.equal(article, library.find(item=>item.id === article.id))
 assert.equal(article.source, getAllInsights().find(item=>item.slug === 'term-vs-gul-vs-iul-family-capital'))
 assert.equal(new Set(library.map(item=>item.id)).size, library.length)
 for (const source of getAllInsights()) assert.equal(library.find(item=>item.source === source).href, '/insights/' + source.slug)
 assert.equal(queryContentLibrary({topic:'not-a-topic'}).length, 0)
 assert.ok(queryContentLibrary({general:true}).some(item=>item.id === 'insight:technology-does-not-decide-for-you'))
 assert.ok(queryContentLibrary({type:'video'}).length > 0)
 assert.ok(queryContentLibrary({type:'external',category:'tax-later'}).length > 0)
})
test('library language, search and audience filters retain truthful source-language metadata', () => {
 const chinese = queryContentLibrary({language:'zh',query:'科技',locale:'en'})
 assert.ok(chinese.some(item=>item.id === 'insight:technology-does-not-decide-for-you'))
 assert.equal(presentResource(chinese.find(item=>item.id === 'insight:technology-does-not-decide-for-you'),'en').contentLocale,'zh')
 assert.equal(resourcePath(chinese.find(item=>item.id === 'insight:technology-does-not-decide-for-you'),'en'),'/zh/insights/technology-does-not-decide-for-you')
 assert.ok(queryContentLibrary({audience:'small-business'}).every(item=>item.audiences.includes('small-business')))
 assert.ok(queryContentLibrary({language:'und'}).every(item=>item.type === 'video'))
})
const fontBytes = readFileSync(new URL('../../../../public/assets/fonts/ONYXProfileSans.ttf', import.meta.url))
test('bundled PDF font covers all bilingual answer labels and disclosures', () => {
 const font = fontkit.create(fontBytes)
 const strings = [...Object.values(profileDisclosure),...profileSections.flatMap(s=>[...Object.values(s.title),...s.fields.flatMap(f=>[...Object.values(f.label),...f.options.flatMap(o=>Object.values(o.label))])])]
 for (const char of strings.join('').replace(/[–—−]/g,'-')) if (!/\s/u.test(char)) assert.ok(font.hasGlyphForCodePoint(char.codePointAt(0)), `Missing PDF glyph: ${char}`)
})
test('both local PDF exports are valid, paginated snapshots with branding and date metadata', async () => {
 const answers = Object.fromEntries(profileSections.flatMap(s=>s.fields).map(f=>[f.id, f.type==='multi' ? f.options.filter(o=>!['none','unknown','private'].includes(o.id)).map(o=>o.id) : f.options[1].id]))
 for (const locale of ['en','zh']) {
  const bytes = await createProfilePdf({answers,locale,fontBytes,generatedAt:new Date('2026-09-11T16:00:00Z')})
  const pdf = await PDFDocument.load(bytes)
  assert.ok(pdf.getPageCount() >= 2)
  assert.ok(pdf.getTitle().includes('ONYX'))
  assert.equal(pdf.getCreationDate().toISOString(),'2026-09-11T16:00:00.000Z')
 }
})
