import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import { instagramUrl, youtubeChannelUrl } from '../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, localePath } = useLocale()

  const columns = [
    { label: t('nav.keepMore'), to: localePath('/keep-more') },
    { label: t('nav.buildTomorrow'), to: localePath('/build-for-tomorrow') },
    { label: t('nav.fundFuture'), to: localePath('/fund-their-future') },
    { label: t('nav.protectPlan'), to: localePath('/protect-the-plan') },
    { label: t('footer.columns.about'), to: localePath('/about') },
    { label: t('footer.columns.insights'), to: localePath('/insights') },
    { label: t('footer.columns.assessment'), to: localePath('/capital-map') },
    { label: t('footer.columns.wellness'), to: localePath('/capital-map/wellness') },
    { label: t('footer.columns.contact'), to: localePath('/contact') },
  ]

  const legal = [
    { label: t('footer.legal.privacy'), to: localePath('/privacy') },
    { label: t('footer.legal.terms'), to: localePath('/terms') },
    { label: t('footer.legal.disclosures'), to: localePath('/disclosures') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <span className={styles.officialName}>{t('footer.officialName')}</span>
            <span className={styles.descriptor}>{t('footer.descriptor')}</span>
            <span className={styles.domain}>ONYXWW.com</span>
            <div className={styles.socialLinks}>
              <a
                className={styles.socialLink}
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                YouTube · @ONYXWW ↗
              </a>
              <a
                className={styles.socialLink}
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram · @onyxwealthandwellness ↗
              </a>
            </div>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {columns.map((item) => (
              <Link key={item.to} to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.langBlock}>
            <span className={styles.langLabel}>{t('nav.languageLabel')}</span>
            <LanguageSwitcher className={styles.footerSelect} />
          </div>
        </div>

        <p className={styles.disclaimer}>{t('footer.disclaimer')}</p>

        <div className={styles.bottom}>
          <span className={styles.brandLine}>{t('footer.brandLine')}</span>
          <div className={styles.legalLinks}>
            {legal.map((item) => (
              <Link key={item.to} to={item.to} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
