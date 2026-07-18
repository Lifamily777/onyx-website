import { useParams, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getTermBySlug, resolveTermContent } from '../data/glossary'
import { getInsightBySlug, resolveInsightContent } from '../data/insights'
import NotFound from './NotFound'
import styles from './GlossaryTermPage.module.css'

export default function GlossaryTermPage() {
  const { slug } = useParams()
  const { t, locale, localePath } = useLocale()
  const term = getTermBySlug(slug)

  if (!term) return <NotFound />

  const { data, isFallback } = resolveTermContent(term, locale)

  // seeAlso may be curated per-locale on the content block; when absent,
  // fall back to the term's locale-independent relatedTermSlugs.
  const seeAlsoSlugs = data.seeAlso || term.relatedTermSlugs || []
  const relatedTerms = seeAlsoSlugs
    .map((s) => getTermBySlug(s))
    .filter(Boolean)

  const relatedInsights = (term.relatedInsightSlugs || [])
    .map((s) => getInsightBySlug(s))
    .filter(Boolean)

  useDocumentMeta(`${data.title} · ONYX Glossary`, data.shortDefinition)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <article>
        <p className={styles.eyebrow}>{t('glossaryPage.eyebrow')}</p>

        {isFallback && (
          <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>
        )}

        <p className={styles.metaRow}>
          <span className={styles.category}>{t(`glossaryPage.categories.${term.category}`)}</span>
          {term.pillars.map((id) => (
            <span key={id} className={styles.pillarTag}>{t(`nav.${id}`)}</span>
          ))}
        </p>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.shortDefinition}>{data.shortDefinition}</p>

        {data.definition && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t('glossaryPage.definitionLabel')}</p>
            <p className={styles.p}>{data.definition}</p>
          </section>
        )}

        {data.context && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t('glossaryPage.contextLabel')}</p>
            <p className={styles.p}>{data.context}</p>
          </section>
        )}

        {data.application && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t('glossaryPage.applicationLabel')}</p>
            <p className={styles.p}>{data.application}</p>
          </section>
        )}

        {data.caution && (
          <section className={styles.caution}>
            <p className={styles.sectionLabel}>{t('glossaryPage.cautionLabel')}</p>
            <p className={styles.cautionText}>{data.caution}</p>
          </section>
        )}

        {relatedTerms.length > 0 && (
          <section className={styles.related}>
            <p className={styles.sectionLabel}>{t('glossaryPage.seeAlsoLabel')}</p>
            <ul className={styles.relatedList}>
              {relatedTerms.map((relatedTerm) => {
                const { data: relatedData } = resolveTermContent(relatedTerm, locale)
                return (
                  <li key={relatedTerm.slug}>
                    <Link to={localePath(`/glossary/${relatedTerm.slug}`)} className={styles.relatedLink}>
                      {relatedData.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {relatedInsights.length > 0 && (
          <section className={styles.related}>
            <p className={styles.sectionLabel}>{t('glossaryPage.relatedInsightsLabel')}</p>
            <ul className={styles.relatedList}>
              {relatedInsights.map((insight) => {
                const { data: insightData, isFallback: insightIsFallback } = resolveInsightContent(insight, locale)
                return (
                  <li key={insight.slug}>
                    <Link to={localePath(`/insights/${insight.slug}`)} className={styles.relatedLink}>
                      {insightData.title}
                      {insightIsFallback ? ` · ${t('insightsPage.languageNoticeShort')}` : ''}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <Link to={localePath('/glossary')} className={styles.backLink}>
          {t('glossaryPage.backToIndex')}
        </Link>
      </article>
    </div>
  )
}
