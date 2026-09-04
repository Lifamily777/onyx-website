import { technologyDoesNotDecideForYou } from './technology-does-not-decide-for-you.js'
import { waicAiSuperNodeAgentOsOpcAgi } from './waic-ai-super-node-agent-os-opc-agi.js'
import { whyChineseFamiliesLoveSavingButDistrustInsurance } from './why-chinese-families-love-saving-but-distrust-insurance.js'
import { termVsGulVsIulFamilyCapital } from './term-vs-gul-vs-iul-family-capital.js'
import { theThirdLedgerPartnershipBasis } from './the-third-ledger-partnership-basis.js'

// One import per article file. Add a new line here when a new insight file
// is created — this stays a one-line diff no matter how many articles exist.
// Display order is driven by publishDate (see getAllInsights below), not by
// this array's order.
const allInsights = [
  technologyDoesNotDecideForYou,
  waicAiSuperNodeAgentOsOpcAgi,
  whyChineseFamiliesLoveSavingButDistrustInsurance,
  theThirdLedgerPartnershipBasis,
  termVsGulVsIulFamilyCapital,
]

// Only 'published' articles are ever surfaced through these three entry
// points — draft/archived articles are invisible to the index, the latest-
// insight lookup, and direct-slug lookup alike (a draft link should 404,
// not silently preview).
export function getAllInsights(locale) {
  return allInsights
    .filter((insight) => insight.status === 'published')
    .filter((insight) => !locale || Boolean(insight.content[locale]))
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
export function getLatestInsights(limit, locale) {
  const published = getAllInsights(locale)
  return typeof limit === 'number' ? published.slice(0, limit) : published
}

export function getInsightsByPillar(pillarId, locale) {
  return getAllInsights(locale).filter((insight) => insight.pillars.includes(pillarId))
}

export function getLatestInsightsByPillar(pillarId, limit, locale) {
  const byPillar = getInsightsByPillar(pillarId, locale)
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
