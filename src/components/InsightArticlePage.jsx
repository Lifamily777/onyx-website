import { useParams, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getInsightBySlug, resolveInsightContent } from '../data/insights'
import NotFound from './NotFound'
import styles from './InsightArticlePage.module.css'

export default function InsightArticlePage() {
  const { slug } = useParams()
  const { t, locale, localePath } = useLocale()
  const insight = getInsightBySlug(slug)

  if (!insight) return <NotFound />

  const { data, isFallback } = resolveInsightContent(insight, locale)

  useDocumentMeta(`${data.title} · ONYX`)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <article>
        <p className={styles.eyebrow}>{t('insightsPage.eyebrow')}</p>

        {isFallback && (
          <p className={styles.languageNotice}>{t('insightsPage.languageNotice')}</p>
        )}

        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.meta}>{data.readingTime} {t('insightsPage.minReadSuffix')}</p>

        <div className={styles.body}>
          {data.body.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i} className={styles.h2}>{block.text}</h2>
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
            return <p key={i} className={styles.p}>{block.text}</p>
          })}
        </div>

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
