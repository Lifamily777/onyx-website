import test from 'node:test'
import assert from 'node:assert/strict'
import { strategies, trustEstateModules, strategyModules, resolveStrategy } from '../../onyxProfile/strategies.js'
import { profileSections, buildCapitalProfile } from '../../onyxProfile/schema.js'
import { readSession, writeSession, emptySession } from '../../onyxProfile/session.js'
import { getContentLibrary, queryContentLibrary, trustContentTags } from '../../../data/contentLibrary.js'

test('trust is nested under Tax Architecture with six valid modules, never a fifth category', () => {
 assert.equal(strategies.length, 4)
 assert.equal(resolveStrategy('tax-architecture','trust-estate').topic.id, 'trust-estate')
 assert.equal(resolveStrategy('tax-now','trust-estate').topic, undefined)
 assert.equal(trustEstateModules.length, 6)
 assert.equal(new Set(trustEstateModules.map(m=>m.id)).size, 6)
 assert.deepEqual(strategyModules('tax-now','trust-estate'), [])
 assert.equal(strategyModules('tax-architecture','trust-estate'), trustEstateModules)
 trustEstateModules.forEach(m=>assert.ok(m.title.en && m.title.zh))
})
test('two optional trust answers round-trip with progress and summary; older sessions remain compatible', () => {
 const fields=profileSections.flatMap(s=>s.fields)
 assert.equal(fields.length, 39)
 const values=new Map(), storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}
 const answers={'has-trust':'yes','estate-priority':'no',w2:'100to200'}
 assert.ok(writeSession(storage,{...emptySession(),step:profileSections.length,answers}))
 assert.deepEqual(readSession(storage).session.answers,buildCapitalProfile(answers))
 assert.ok(writeSession(storage,{...emptySession(),step:2,answers:{w2:'100to200'}}))
 assert.equal(readSession(storage).session.answers['has-trust'],'')
 assert.equal(readSession(storage).session.answers.w2,'100to200')
 assert.equal(buildCapitalProfile({'has-trust':'suitable'})['has-trust'],'')
})
test('trust strategy resources are references to the canonical Learn library, not a new collection', () => {
 const library=getContentLibrary()
 assert.equal(new Set(library.map(r=>r.id)).size,library.length)
 for(const topic of [trustContentTags.topic,...trustContentTags.subtopics]) {
  const matches=queryContentLibrary({category:trustContentTags.category,topic})
  assert.ok(matches.length)
  matches.forEach(resource=>assert.ok(library.includes(resource)))
 }
 assert.equal(queryContentLibrary({topic:'trust-estate',type:'article'}).length,0)
 assert.equal(queryContentLibrary({topic:'trust-estate',type:'video'}).length,0)
})
