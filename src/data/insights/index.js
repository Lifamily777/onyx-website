import { technologyDoesNotDecideForYou } from './technology-does-not-decide-for-you'
import { waicAiSuperNodeAgentOsOpcAgi } from './waic-ai-super-node-agent-os-opc-agi'
import { whyChineseFamiliesLoveSavingButDistrustInsurance } from './why-chinese-families-love-saving-but-distrust-insurance'

// One import per article file. Add a new line here when a new insight file
// is created — this stays a one-line diff no matter how many articles exist.
// Display order is driven by publishDate (see getAllInsights below), not by
// this array's order.
const allInsights = [
  technologyDoesNotDecideForYou,
  waicAiSuperNodeAgentOsOpcAgi,
  whyChineseFamiliesLoveSavingButDistrustInsurance,
]

// Only 'published' articles are ever surfaced through these three entry
// points — draft/archived articles are invisible to the index, the latest-
// insight lookup, and direct-slug lookup alike (a draft link should 404,
// not silently preview).
export function getAllInsights() {
  return allInsights
    .filter((insight) => insight.status === 'published')
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
}

export function getInsightBySlug(slug) {
  return getAllInsights().find((insight) => insight.slug === slug) || null
}

export function getLatestInsight() {
  const published = getAllInsights()
  return published.length > 0 ? published[0] : null
}

// getAllInsights() already means "all *published* insights" (see above) —
// every query below builds on it so pillar/limit filtering never has to
// re-implement the published+sorted contract.
export function getLatestInsights(limit) {
  const published = getAllInsights()
  return typeof limit === 'number' ? published.slice(0, limit) : published
}

export function getInsightsByPillar(pillarId) {
  return getAllInsights().filter((insight) => insight.pillars.includes(pillarId))
}

export function getLatestInsightsByPillar(pillarId, limit) {
  const byPillar = getInsightsByPillar(pillarId)
  return typeof limit === 'number' ? byPillar.slice(0, limit) : byPillar
}

// Resolves the best available content for `locale`, falling back to the
// article's originalLocale (never an empty article, never an invented
// translation) — isFallback tells the caller to show the language notice.
export function resolveInsightContent(insight, locale) {
  const localeContent = insight.content[locale]
  if (localeContent) {
    return { data: localeContent, isFallback: false, resolvedLocale: locale }
  }
  return {
    data: insight.content[insight.originalLocale],
    isFallback: true,
    resolvedLocale: insight.originalLocale,
  }
}
