import { NavLink, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Nav.module.css'

export default function Nav() {
  const { t, localePath } = useLocale()

  const navItems = [
    { key: 'home', label: t('nav.home'), to: localePath('/'), end: true },
    { key: 'wealth', label: t('nav.wealth'), to: localePath('/tax') },
    { key: 'wellness', label: t('nav.wellness'), to: localePath('/health') },
    { key: 'intelligence', label: t('nav.intelligence'), to: localePath('/intelligence') },
    { key: 'about', label: t('nav.about'), to: localePath('/about') },
    { key: 'insights', label: t('nav.insights'), to: localePath('/insights') },
    { key: 'assessment', label: t('nav.assessment'), to: localePath('/survey') },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={localePath('/')} className={styles.logo}>
          <span className={styles.logoEn}>ONYX</span>
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
            {t('nav.startLearning')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
