import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getLatestInsights, resolveInsightContent } from '../data/insights'
import styles from './HomePage.module.css'

const AUDIENCE_PATHS = [
  { id: 'families', to: '/capital-map' },
  { id: 'businessOwners', to: '/tax' },
  { id: 'communityPartners', to: '/contact' },
]
const LATEST_INSIGHTS_LIMIT = 3

export default function HomePage() {
  const { t, locale, localePath } = useLocale()

  const officialName = t('footer.officialName')

  useDocumentMeta(t('meta.title'), t('meta.description'), {
    siteName: officialName,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: officialName,
      description: t('meta.description'),
      url: `https://onyxww.com${localePath('/')}`,
    },
  })

  const areas = t('home.why.areas')
  const learningParagraphs = t('home.learningTogether.paragraphs')
  const founderParagraphs = t('home.founder.paragraphs')
  const founderRoles = t('home.founder.roles')
  const missionParagraphs = t('home.mission.paragraphs')
  const latestInsights = getLatestInsights(LATEST_INSIGHTS_LIMIT)

  return (
    <div className={`${styles.wrap} page-enter`}>

      {/* ── 1. HERO ── */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          {t('home.hero.headline1')}
          <br />
          <span className={styles.heroEmphasis}>{t('home.hero.headline2')}</span>
        </h1>
        <p className={styles.heroSupporting}>{t('home.hero.supporting')}</p>
        <p className={styles.heroBridge}>{t('home.hero.bridge')}</p>
        <div className={styles.heroLinks}>
          <Link className={styles.btnPrimary} to={localePath('/contact')}>
            {t('home.hero.ctaPrimary')}
          </Link>
          <Link className={styles.btnSecondary} to={localePath('/insights')}>
            {t('home.hero.ctaSecondary')}
          </Link>
        </div>
        <p className={styles.heroLine}>{t('home.hero.supportingLine')}</p>

        {/* Compact three-entry module. Desktop keeps this natural DOM
            position (after the full Hero); the mobile media query in
            HomePage.module.css reassigns `order` so this — and the
            primary CTA above — appear right under the headline, ahead of
            the longer supporting/bridge copy, keeping all three pillar
            names within the first viewport on small phones. */}
        <div className={styles.corePaths}>
          <h2 className={styles.corePathsTitle}>{t('home.corePaths.title')}</h2>
          <div className={styles.corePathsGrid}>
            {AUDIENCE_PATHS.map(({ id, to }) => (
              <Link key={id} to={localePath(to)} className={styles.corePathCard}>
                <span className={styles.corePathName}>{t(`home.corePaths.${id}.title`)}</span>
                <span className={styles.corePathDesc}>{t(`home.corePaths.${id}.description`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST INSIGHTS ── */}
      <section className={styles.latestInsights}>
        <h2 className={styles.latestInsightsTitle}>{t('home.latestInsights.title')}</h2>
        {latestInsights.length === 0 ? (
          <p className={styles.latestInsightsEmpty}>{t('insightsPage.indexEmpty')}</p>
        ) : (
          <div className={styles.latestInsightsGrid}>
            {latestInsights.map((insight) => {
              const { data, isFallback } = resolveInsightContent(insight, locale)
              return (
                <Link
                  key={insight.slug}
                  to={localePath(`/insights/${insight.slug}`)}
                  className={styles.insightCard}
                >
                  {insight.pillarLabel && insight.insightNumber && (
                    <p className={styles.insightBadges}>
                      <span className={styles.badge}>{insight.pillarLabel}</span>
                      <span className={styles.badge}>
                        {t('brand.shortName')} Insight #{String(insight.insightNumber).padStart(3, '0')}
                      </span>
                    </p>
                  )}
                  <h3 className={styles.insightCardTitle}>{data.title}</h3>
                  <p className={styles.insightCardSub}>{data.subtitle}</p>
                  <p className={styles.insightCardMeta}>
                    {data.readingTime} {t('insightsPage.minReadSuffix')}
                    {isFallback ? ` · ${t('insightsPage.languageNoticeShort')}` : ''}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
        <Link className={styles.latestInsightsCta} to={localePath('/insights')}>
          {t('home.mission.ctaSecondary')} ›
        </Link>
      </section>

      {/* ── 2. WHY ONYX EXISTS ── */}
      <section className={styles.why}>
        <p className={styles.whyLabel}>{t('home.why.label')}</p>
        <h2 className={styles.whyHeadline}>{t('home.why.headline')}</h2>
        <p className={styles.whyBody}>{t('home.why.body')}</p>
        <p className={styles.whyEmphasis}>{t('home.why.emphasis')}</p>
        <div className={styles.areaGrid}>
          {areas.map((area) => (
            <span key={area} className={styles.areaChip}>{area}</span>
          ))}
        </div>
      </section>

      {/* ── 3. CORE BRAND STATEMENT ── */}
      <section className={styles.brandStatement}>
        <h2 className={styles.brandHeadline}>{t('home.brandStatement.headline')}</h2>
        <p className={styles.brandBody}>{t('home.brandStatement.body')}</p>
      </section>

      {/* ── 4. THREE PILLARS ── */}
      <section className={styles.pillars} id="pillars">
        <h2 className={styles.pillarsEyebrow}>{t('home.pillars.eyebrow')}</h2>
        <div className={styles.pillarGrid}>
          <article className={styles.pillarCard}>
            <h3 className={styles.pillarTitle}>{t('home.pillars.wealth.title')}</h3>
            <p className={styles.pillarDescriptor}>{t('home.pillars.wealth.descriptor')}</p>
            <p className={styles.pillarBody}>{t('home.pillars.wealth.body')}</p>
            <Link className={styles.pillarCta} to={localePath('/tax')}>
              {t('home.pillars.wealth.cta')} ›
            </Link>
          </article>
          <article className={styles.pillarCard}>
            <h3 className={styles.pillarTitle}>{t('home.pillars.wellness.title')}</h3>
            <p className={styles.pillarDescriptor}>{t('home.pillars.wellness.descriptor')}</p>
            <p className={styles.pillarBody}>{t('home.pillars.wellness.body')}</p>
            <Link className={styles.pillarCta} to={localePath('/health')}>
              {t('home.pillars.wellness.cta')} ›
            </Link>
          </article>
          <article className={styles.pillarCard}>
            <h3 className={styles.pillarTitle}>{t('home.pillars.intelligence.title')}</h3>
            <p className={styles.pillarDescriptor}>{t('home.pillars.intelligence.descriptor')}</p>
            <p className={styles.pillarBody}>{t('home.pillars.intelligence.body')}</p>
            <Link className={styles.pillarCta} to={localePath('/intelligence')}>
              {t('home.pillars.intelligence.cta')} ›
            </Link>
          </article>
        </div>
      </section>

      {/* ── 5. LEARNING TOGETHER ── */}
      <section className={styles.learning}>
        <h2 className={styles.learningHeadline}>{t('home.learningTogether.headline')}</h2>
        <div className={styles.learningBody}>
          {learningParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Link className={styles.learningCta} to={localePath('/insights')}>
          {t('home.learningTogether.cta')} ›
        </Link>
      </section>

      {/* ── 6. FOUNDER STORY ── */}
      <section className={styles.founder}>
        <p className={styles.founderName}>{t('home.founder.name')}</p>
        <h2 className={styles.founderHeadline}>{t('home.founder.headline')}</h2>
        <ul className={styles.founderRoles}>
          {founderRoles.map((role) => <li key={role}>{role}</li>)}
        </ul>
        <div className={styles.founderBody}>
          {founderParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* ── 7. MISSION AND FINAL CTA ── */}
      <section className={styles.mission}>
        <h2 className={styles.missionHeadline}>{t('home.mission.headline')}</h2>
        <div className={styles.missionBody}>
          {missionParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <h3 className={styles.finalCta}>{t('home.mission.ctaHeadline')}</h3>
        <div className={styles.finalLinks}>
          <Link className={styles.btnPrimary} to={localePath('/contact')}>
            {t('home.mission.ctaPrimary')}
          </Link>
          <Link className={styles.btnSecondary} to={localePath('/insights')}>
            {t('home.mission.ctaSecondary')}
          </Link>
        </div>
      </section>

    </div>
  )
}
