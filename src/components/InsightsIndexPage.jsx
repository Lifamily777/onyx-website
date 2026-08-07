import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getAllInsights, resolveInsightContent } from '../data/insights'
import styles from './InsightsIndexPage.module.css'

export default function InsightsIndexPage() {
  const { t, locale, localePath } = useLocale()
  const insights = getAllInsights()

  useDocumentMeta(`${t('insightsPage.indexTitle')} · ${t('brand.shortName')}`)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <p className={styles.eyebrow}>{t('insightsPage.eyebrow')}</p>
      <h1 className={styles.title}>{t('insightsPage.indexTitle')}</h1>

      {insights.length === 0 ? (
        <p className={styles.empty}>{t('insightsPage.indexEmpty')}</p>
      ) : (
        <ul className={styles.list}>
          {insights.map((insight) => {
            const { data, isFallback } = resolveInsightContent(insight, locale)
            return (
              <li key={insight.slug} className={styles.item}>
                <Link to={localePath(`/insights/${insight.slug}`)} className={styles.itemLink}>
                  {insight.pillarLabel && insight.insightNumber && (
                    <p className={styles.itemBadges}>
                      <span className={styles.badge}>{insight.pillarLabel}</span>
                      <span className={styles.badge}>{t('brand.shortName')} Insight #{String(insight.insightNumber).padStart(3, '0')}</span>
                    </p>
                  )}
                  <h2 className={styles.itemTitle}>{data.title}</h2>
                  <p className={styles.itemSub}>{data.subtitle}</p>
                  <p className={styles.itemMeta}>
                    {data.readingTime} {t('insightsPage.minReadSuffix')}
                    {isFallback ? ` · ${t('insightsPage.languageNoticeShort')}` : ''}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
