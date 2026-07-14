import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { t, localePath } = useLocale()

  useDocumentMeta(t('meta.title'), t('meta.description'))

  const areas = t('home.why.areas')
  const learningParagraphs = t('home.learningTogether.paragraphs')
  const founderParagraphs = t('home.founder.paragraphs')
  const missionParagraphs = t('home.mission.paragraphs')

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
          <a className={styles.btnSecondary} href="#pillars">
            {t('home.hero.ctaSecondary')}
          </a>
        </div>
        <p className={styles.heroLine}>{t('home.hero.supportingLine')}</p>
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

      {/* ── ASSESSMENT — "not sure where to begin" ── */}
      <section className={styles.assessment}>
        <p className={styles.assessmentLabel}>{t('home.assessment.label')}</p>
        <h2 className={styles.assessmentHeadline}>{t('home.assessment.headline')}</h2>
        <p className={styles.assessmentBody}>{t('home.assessment.body')}</p>
        <Link className={styles.btnPrimary} to={localePath('/survey')}>
          {t('home.assessment.cta')}
        </Link>
        <p className={styles.assessmentLine}>{t('home.assessment.supportingLine')}</p>
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
