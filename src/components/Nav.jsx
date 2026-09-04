import { NavLink, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Nav.module.css'

export default function Nav() {
  const { t, localePath } = useLocale()

  const navItems = [
    { key: 'home', label: t('nav.home'), to: localePath('/'), end: true },
    { key: 'keepMore', label: t('nav.keepMore'), to: localePath('/keep-more') },
    { key: 'buildTomorrow', label: t('nav.buildTomorrow'), to: localePath('/build-for-tomorrow') },
    { key: 'fundFuture', label: t('nav.fundFuture'), to: localePath('/fund-their-future') },
    { key: 'protectPlan', label: t('nav.protectPlan'), to: localePath('/protect-the-plan') },
    { key: 'insights', label: t('nav.insights'), to: localePath('/insights') },
    { key: 'about', label: t('nav.about'), to: localePath('/about') },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={localePath('/')} className={styles.logo}>
          <span className={styles.logoEn}>{t('brand.shortName')}</span>
          <span className={styles.logoName}>{t('footer.officialName')}</span>
        </Link>
        <div className={styles.links}>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `${styles.nb} ${isActive ? styles.on : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link to={localePath('/contact')} className={styles.cta}>
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
