import { Link, useParams } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { getInsightBySlug } from '../data/insights'
import InsightArticlePage from './InsightArticlePage'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './InsightsIndexPage.module.css'

// Preserve the existing article renderer and content. Never silently display
// an article in the opposite language when its requested translation is absent.
export default function LocalizedInsightPage() {
  const { slug } = useParams()
  const { locale, localePath } = useLocale()
  const insight = getInsightBySlug(slug)
  const unavailable = insight && !insight.content[locale]
  const title = locale === 'zh' ? '本文中文版尚未提供' : 'This article is not yet available in English'
  useDocumentMeta(unavailable ? title : undefined)
  if (!unavailable) return <InsightArticlePage />
  return <main className={styles.wrap}>
    <h1 className={styles.title}>{title}</h1>
    <p>{locale === 'zh' ? '文章仍保留在原语言页面，你可以切换语言查看。' : 'The original article is preserved. Switch languages to read it.'}</p>
    <Link to={localePath('/insights')}>{locale === 'zh' ? '返回洞察' : 'Back to Insights'}</Link>
  </main>
}
