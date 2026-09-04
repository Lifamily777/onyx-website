import { ONYX_SEARCH_INDEX } from './searchIndex.js'

export function normalizeSearchTerm(value='') {
  return String(value).normalize('NFKD').toLowerCase()
    .replace(/401\s*\(\s*k\s*\)|401[\s-]+k/g,'401k')
    .replace(/back\s+door/g,'backdoor').replace(/pro[\s-]*rata/g,'prorata').replace(/s[\s.-]+corp(?:oration)?/g,'scorporation')
    .replace(/[^a-z0-9\u3400-\u9fff]+/g,' ').trim()
}

function searchable(record) {
  return [record.title,record.titleZh,record.description,record.descriptionZh,...record.keywords,...record.keywordsZh,...record.aliases,...record.relatedTopics].filter(Boolean).map(normalizeSearchTerm)
}

function fieldMatches(value, normalized, compact) {
  if (/^[a-z]*\d+[a-z]*$/.test(normalized) && normalized.length <= 4) {
    return value.split(' ').includes(normalized)
  }
  return value.includes(normalized) || value.replaceAll(' ','').includes(compact)
}

export function searchOnyx(query, { limit=12 }={}) {
  const normalized=normalizeSearchTerm(query)
  if (!normalized) return []
  const compact=normalized.replaceAll(' ','')
  const terms=normalized.split(' ').filter(Boolean)
  return ONYX_SEARCH_INDEX.map(item=>{
    const fields=searchable(item), title=[item.title,item.titleZh].map(normalizeSearchTerm)
    let score=item.priority||0
    if (title.some(value=>value===normalized)) score+=180
    if (fields.some(value=>value===normalized||value.replaceAll(' ','')===compact)) score+=140
    if (fields.some(value=>fieldMatches(value,normalized,compact))) score+=90
    const matched=fields.filter(value=>fieldMatches(value,normalized,compact)||(terms.length>1&&terms.every(term=>value.includes(term))))
    if (matched.length) score+=60+Math.min(30,matched.length*5)
    if (!matched.length && !fields.some(value=>fieldMatches(value,normalized,compact))) return null
    const matchedTopics=[...item.keywords,...item.keywordsZh,...item.aliases,...item.relatedTopics].filter(value=>fieldMatches(normalizeSearchTerm(value),normalized,compact)).slice(0,5)
    return {...item,score,matchedTopics}
  }).filter(Boolean).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,limit)
}

export function groupSearchResults(results) {
  return results.reduce((groups,item)=>{(groups[item.group]??=[]).push(item);return groups},{})
}

// Future analytics may subscribe here. Phase 1 intentionally transmits and persists nothing.
export const searchAnalytics = Object.freeze({ recordSearch(){}, recordClick(){}, recordZeroResult(){} })
