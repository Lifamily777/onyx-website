const list = value => Array.isArray(value) ? Object.freeze([...value]) : Object.freeze([])

// Optional attachments keep the Capital Map stable while knowledge deepens.
// Empty collections are deliberate: renderers should omit empty sections.
export const createContentRelationships = (data = {}) => Object.freeze({
  quickInsight: data.quickInsight || null,
  hiddenQuestion: data.hiddenQuestion || null,
  beforeYouAct: data.beforeYouAct || null,
  articles: list(data.articles),
  videos: list(data.videos),
  cases: list(data.cases),
  officialSources: list(data.officialSources),
  calculators: list(data.calculators),
  relatedDecisions: list(data.relatedDecisions),
  relatedEvents: list(data.relatedEvents),
  planningWindows: list(data.planningWindows),
  sammiReviewContext: data.sammiReviewContext || null,
})

export const createVideoMetadata = (data) => {
  const required = ['videoId','title','titleZh','description','descriptionZh','platform','url','thumbnail','publishedAt']
  for (const key of required) if (!data?.[key]) throw new TypeError(`Video metadata requires ${key}`)
  return Object.freeze({
    ...data,
    relatedNodeIds: list(data.relatedNodeIds),
    relatedDecisionIds: list(data.relatedDecisionIds),
  })
}

export const hasContentRelationships = relationships => Boolean(
  relationships && Object.values(relationships).some(value => Array.isArray(value) ? value.length > 0 : Boolean(value))
)
