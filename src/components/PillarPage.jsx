import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getLatestInsightsByPillar, resolveInsightContent } from '../data/insights'
import { getTermsByPillar, resolveTermContent } from '../data/glossary'
import styles from './PillarPage.module.css'

const INSIGHTS_LIMIT = 6

// Which Action buttons each pillar shows, and in what order. Intelligence
// swaps "Book a Conversation" for "Explore the Glossary" since it already
// has a live Glossary section above — everything else is shared config,
// not a pillar-specific branch in the render logic below.
const ACTION_DEFS = {
  startLearning: { to: '/contact', label: (t) => t('home.hero.ctaPrimary') },
  exploreInsights: { to: '/insights', label: (t, pillarId) => t(`pillarPages.${pillarId}.exploreInsightsCta`) },
  exploreGlossary: { to: '/glossary', label: (t) => t('pillarPages.common.exploreGlossaryCta') },
  bookAppointment: { to: '/contact', label: (t) => t('pillarPages.common.bookAppointmentCta') },
}

const PILLAR_ACTIONS = {
  wealth: ['startLearning', 'exploreInsights', 'bookAppointment'],
  wellness: ['startLearning', 'exploreInsights', 'bookAppointment'],
  intelligence: ['exploreInsights', 'exploreGlossary', 'startLearning'],
}

export default function PillarPage({ pillarId }) {
  const { t, locale, localePath } = useLocale()

  const heroTitle = t(`pillarPages.${pillarId}.heroTitle`)
  const heroSubtitle = t(`pillarPages.${pillarId}.heroSubtitle`)

  useDocumentMeta(`${heroTitle} · ${t('brand.shortName')}`, heroSubtitle)

  const insights = getLatestInsightsByPillar(pillarId, INSIGHTS_LIMIT)
  const terms = getTermsByPillar(pillarId)
  const topics = t(`pillarPages.${pillarId}.topics`)
  const actions = PILLAR_ACTIONS[pillarId] || []

  return (
    <div className={`${styles.wrap} page-enter`}>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{t(`nav.${pillarId}`)}</p>
        <h1 className={styles.title}>{heroTitle}</h1>
        <p className={styles.subtitle}>{heroSubtitle}</p>
      </section>

      {/* Featured Content — reserved for a future pillar video. Mirrors the
          `videoId` reservation pattern used by servicePages in
          src/data/content.js, but no real video exists for any pillar yet,
          so this only ever renders a "coming soon" state. */}
      <section className={styles.featured}>
        <p className={styles.sectionLabel}>{t('pillarPages.common.featuredLabel')}</p>
        <div className={styles.featuredCard}>
          <p className={styles.comingSoonTag}>{t('pillarPages.common.comingSoonLabel')}</p>
          <p className={styles.featuredBody}>{t(`pillarPages.${pillarId}.featuredBody`)}</p>
        </div>
      </section>

      {/* Latest Insights for this pillar */}
      <section className={styles.insightsSection}>
        <p className={styles.sectionLabel}>{t(`pillarPages.${pillarId}.latestInsightsLabel`)}</p>
        {insights.length === 0 ? (
          <p className={styles.empty}>{t('insightsPage.indexEmpty')}</p>
        ) : (
          <ul className={styles.insightList}>
            {insights.map((insight) => {
              const { data, isFallback } = resolveInsightContent(insight, locale)
              return (
                <li key={insight.slug} className={styles.insightItem}>
                  <Link to={localePath(`/insights/${insight.slug}`)} className={styles.insightLink}>
                    {insight.pillarLabel && insight.insightNumber && (
                      <p className={styles.insightBadges}>
                        <span className={styles.badge}>{insight.pillarLabel}</span>
                        <span className={styles.badge}>
                          {t('brand.shortName')} Insight #{String(insight.insightNumber).padStart(3, '0')}
                        </span>
                      </p>
                    )}
                    <h3 className={styles.insightTitle}>{data.title}</h3>
                    <p className={styles.insightSub}>{data.subtitle}</p>
                    <p className={styles.insightMeta}>
                      {data.readingTime} {t('insightsPage.minReadSuffix')}
                      {isFallback ? ` · ${t('insightsPage.languageNoticeShort')}` : ''}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* Knowledge Base — live Glossary terms for this pillar (if any exist
          yet) plus a static list of key topics. Reads getTermsByPillar()
          directly, so Wealth/Wellness terms will appear here automatically
          the moment they're published — nothing pillar-specific to wire up. */}
      <section className={styles.knowledgeBase}>
        <p className={styles.sectionLabel}>{t('pillarPages.common.knowledgeBaseLabel')}</p>

        {terms.length > 0 && (
          <>
            <ul className={styles.termList}>
              {terms.map((term) => {
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
            <Link to={localePath('/glossary')} className={styles.glossaryLink}>
              {t('pillarPages.common.exploreGlossaryCta')}
            </Link>
          </>
        )}

        <p className={styles.topicsLabel}>{t('pillarPages.common.keyTopicsLabel')}</p>
        <ul className={styles.topicList}>
          {topics.map((topic) => (
            <li key={topic} className={styles.topicChip}>{topic}</li>
          ))}
        </ul>
      </section>

      {/* Action */}
      <section className={styles.action}>
        <div className={styles.actionButtons}>
          {actions.map((key, i) => {
            const def = ACTION_DEFS[key]
            const Cls = i === 0 ? styles.btnPrimary : styles.btnSecondary
            return (
              <Link key={key} className={Cls} to={localePath(def.to)}>
                {def.label(t, pillarId)}
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  )
}
