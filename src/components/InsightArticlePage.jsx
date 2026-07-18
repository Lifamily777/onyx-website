import { useParams, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getInsightBySlug, resolveInsightContent } from '../data/insights'
import { getTermsByInsightSlug, resolveTermContent } from '../data/glossary'
import NotFound from './NotFound'
import styles from './InsightArticlePage.module.css'

// Renders a text block's inline content. Most blocks carry plain `text`;
// blocks that need a clickable glossary term instead carry `segments` — a
// mix of plain text runs and { type: 'term', slug, text } runs. Older
// articles only ever use `text`, so this stays fully backward compatible.
function renderInline(block, localePath, styles) {
  if (!block.segments) return block.text
  return block.segments.map((segment, i) => {
    if (segment.type === 'term') {
      return (
        <Link key={i} to={localePath(`/glossary/${segment.slug}`)} className={styles.termLink}>
          {segment.text}
        </Link>
      )
    }
    return <span key={i}>{segment.text}</span>
  })
}

export default function InsightArticlePage() {
  const { slug } = useParams()
  const { t, locale, localePath } = useLocale()
  const insight = getInsightBySlug(slug)

  if (!insight) return <NotFound />

  const { data, isFallback } = resolveInsightContent(insight, locale)
  const relatedTerms = getTermsByInsightSlug(insight.slug)

  useDocumentMeta(`${data.title} · ONYX`)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <article>
        <p className={styles.eyebrow}>{t('insightsPage.eyebrow')}</p>

        {insight.pillarLabel && insight.insightNumber && (
          <p className={styles.badges}>
            <span className={styles.badge}>{insight.pillarLabel}</span>
            <span className={styles.badge}>ONYX Insight #{String(insight.insightNumber).padStart(3, '0')}</span>
          </p>
        )}

        {isFallback && (
          <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>
        )}

        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.meta}>{data.readingTime} {t('insightsPage.minReadSuffix')}</p>

        <div className={styles.body}>
          {data.body.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i} className={styles.h2}>{renderInline(block, localePath, styles)}</h2>
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.list}>
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )
            }
            if (block.type === 'mission') {
              return <p key={i} className={styles.mission}>{block.text}</p>
            }
            return <p key={i} className={styles.p}>{renderInline(block, localePath, styles)}</p>
          })}
        </div>

        {relatedTerms.length > 0 && (
          <section className={styles.relatedTerms}>
            <p className={styles.sectionLabel}>{t('insightsPage.relatedTermsLabel')}</p>
            <ul className={styles.termList}>
              {relatedTerms.map((term) => {
                const { data: termData } = resolveTermContent(term, locale)
                return (
                  <li key={term.slug}>
                    <Link to={localePath(`/glossary/${term.slug}`)} className={styles.termChip}>
                      {termData.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className={styles.takeaway}>
          <p className={styles.sectionLabel}>{t('insightsPage.takeawayLabel')}</p>
          {data.takeaway.map((line, i) => (
            <p key={i} className={styles.takeawayLine}>{line}</p>
          ))}
        </section>

        <section className={styles.continueLearning}>
          <p className={styles.sectionLabel}>{t('insightsPage.continueLearningLabel')}</p>
          <ul className={styles.clList}>
            {data.continueLearning.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <section className={styles.workWith}>
          <p className={styles.sectionLabel}>{t('insightsPage.workWithOnyxLabel')}</p>
          <p className={styles.workIntro}>{data.workWithOnyx.intro}</p>
          <Link to={localePath('/contact')} className={styles.btnPrimary}>
            {data.workWithOnyx.ctaLabel}
          </Link>
          <ul className={styles.futureList}>
            {data.workWithOnyx.futureOfferings.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <p className={styles.disclaimer}>{data.disclaimer}</p>

        <Link to={localePath('/insights')} className={styles.backLink}>
          {t('insightsPage.backToIndex')}
        </Link>
      </article>
    </div>
  )
}
