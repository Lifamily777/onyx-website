import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './PlaceholderPage.module.css'

export default function NotFound() {
  const { t, localePath } = useLocale()

  useDocumentMeta(`${t('notFound.title')} · ${t('brand.shortName')}`)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <h1 className={styles.title}>{t('notFound.title')}</h1>
      <p className={styles.body}>{t('notFound.body')}</p>
      <p style={{ marginTop: '24px' }}>
        <Link to={localePath('/')}>{t('notFound.cta')}</Link>
      </p>
    </div>
  )
}
