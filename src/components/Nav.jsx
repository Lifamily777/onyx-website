import { NavLink, Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'
import GlobalSearch from './GlobalSearch'
import styles from './Nav.module.css'

export default function Nav() {
  const { t, locale, localePath } = useLocale()

  const navItems = [
    { key: 'assess', label: locale === 'zh' ? '了解现状' : 'Assess', to: localePath('/profile') },
    { key: 'strategize', label: locale === 'zh' ? '理解策略' : 'Strategize', to: localePath('/strategies') },
    { key: 'build', label: locale === 'zh' ? '构建未来' : 'Build', to: localePath('/build') },
    { key: 'learn', label: locale === 'zh' ? '持续学习' : 'Learn', to: localePath('/learn') },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={localePath('/')} className={styles.logo}>
          <span className={styles.logoName}>{t('brand.shortName')}</span>
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
          <GlobalSearch />
          <LanguageSwitcher />
          <Link to={localePath('/contact')} className={styles.cta}>
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
