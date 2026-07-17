import { technologyDoesNotDecideForYou } from './technology-does-not-decide-for-you'

// One import per article file. Add a new line here when a new insight file
// is created — this stays a one-line diff no matter how many articles exist.
const allInsights = [technologyDoesNotDecideForYou]

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
