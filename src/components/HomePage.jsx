import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './HomePage.module.css'
import { V3_PATHS } from '../data/v3Brand'

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
  const founderParagraphs = t('home.founder.paragraphs')
  const founderRoles = t('home.founder.roles')

  return (
    <div className={`${styles.wrap} page-enter`}>

      {/* ── 1. HERO ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>{t('home.hero.eyebrow')}</p>
        <h1 className={styles.heroTitle}>
          {t('home.hero.headline1')}
          <br />
          <span className={styles.heroEmphasis}>{t('home.hero.headline2')}</span>
        </h1>
        <p className={styles.heroSupporting}>{t('home.hero.supporting')}</p>
        <p className={styles.heroBridge}>{t('home.hero.bridge')}</p>
        <div className={styles.heroLinks}>
          <Link className={styles.btnPrimary} to={localePath('/capital-map')}>
            {t('home.hero.ctaPrimary')}
          </Link>
          <Link className={styles.btnSecondary} to={localePath('/capital-map/events')}>
            {t('home.hero.ctaSecondary')}
          </Link>
        </div>
        <Link className={styles.tertiaryLink} to={localePath('/foundation')}>{t('home.hero.ctaTertiary')} →</Link>
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
            {V3_PATHS.map((path) => (
              <Link key={path.id} to={localePath(`/${path.id}`)} className={styles.corePathCard}>
                <span className={styles.corePathName}>{locale === 'zh' ? path.eyebrowZh : path.eyebrow}<small>{locale === 'zh' ? path.subtitleZh : path.subtitle}</small></span>
                <span className={styles.corePathDesc}>{locale === 'zh' ? path.titleZh : path.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WHY CHOOSE ONYX ── */}
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
        <div className={styles.whyLinks}>
          <Link className={styles.btnPrimary} to={localePath('/insights')}>{t('home.mission.ctaSecondary')}</Link>
          <Link className={styles.btnSecondary} to={localePath('/glossary')}>{t('glossaryPage.indexTitle')}</Link>
        </div>
      </section>

      {/* ── 3. WHO IS SAMMI Q ── */}
      <section className={styles.founder}>
        <p className={styles.founderName}>{t('home.founder.name')}</p>
        <h2 className={styles.founderHeadline}>{t('home.founder.headline')}</h2>
        <ul className={styles.founderRoles}>
          {founderRoles.map((role) => <li key={role}>{role}</li>)}
        </ul>
        <div className={styles.founderBody}>
          {founderParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className={styles.founderLinks}>
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
