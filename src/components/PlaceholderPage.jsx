import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './PlaceholderPage.module.css'

export default function PlaceholderPage({ pageKey }) {
  const { t } = useLocale()
  const title = t(`placeholders.${pageKey}.title`)

  useDocumentMeta(`${title} · ONYX`)

  return (
    <div className={`${styles.wrap} page-enter`}>
      <p className={styles.eyebrow}>{t(`placeholders.${pageKey}.eyebrow`)}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.body}>{t(`placeholders.${pageKey}.body`)}</p>
    </div>
  )
}
