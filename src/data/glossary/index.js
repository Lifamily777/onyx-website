import { superNode } from './super-node'
import { agentOs } from './agent-os'
import { onePersonCompany } from './one-person-company'
import { aiForScience } from './ai-for-science'
import { artificialGeneralIntelligence } from './artificial-general-intelligence'

// One import per term file — mirrors src/data/insights/index.js so both
// content types stay easy to reason about side by side. Add a new line
// here when a new term file is created.
const allTerms = [
  superNode,
  agentOs,
  onePersonCompany,
  aiForScience,
  artificialGeneralIntelligence,
]

export function getAllTerms() {
  return allTerms
}

export function getPublishedTerms() {
  return allTerms.filter((term) => term.status === 'published')
}

// Only published terms are ever surfaced by slug — a draft link should
// 404, not silently preview, matching getInsightBySlug's behavior.
export function getTermBySlug(slug) {
  return getPublishedTerms().find((term) => term.slug === slug) || null
}

export function getTermsByPillar(pillarId) {
  return getPublishedTerms().filter((term) => term.pillars.includes(pillarId))
}

export function getTermsByInsightSlug(insightSlug) {
  return getPublishedTerms().filter((term) =>
    (term.relatedInsightSlugs || []).includes(insightSlug)
  )
}

// Resolves the best available content for `locale`, falling back to the
// term's originalLocale (never an empty entry, never an invented
// translation) — isFallback tells the caller to show the language notice.
export function resolveTermContent(term, locale) {
  const localeContent = term.content[locale]
  if (localeContent) {
    return { data: localeContent, isFallback: false, resolvedLocale: locale }
  }
  return {
    data: term.content[term.originalLocale],
    isFallback: true,
    resolvedLocale: term.originalLocale,
  }
}
