import { getReflectionGuidance } from '../features/lifeCapitalMap/reflectionGuidance'
import styles from './CapitalMap.module.css'
import { translateLegacyText } from '../i18n/legacyPresentation'

export default function ReflectionFeedback({ node, answer, locale }) {
  const feedback = getReflectionGuidance(node, answer, locale, translateLegacyText(answer, locale))
  if (!feedback) return null
  return <div className={`${styles.reflectionFeedback} ${styles[feedback.level]}`} role="status" aria-live="polite">
    <strong>{feedback.title}</strong>
    <p>{feedback.body}</p>
    <small>{locale === 'zh' ? '仅供教育与整理思路，不是评分或个性化建议。' : 'For education and organization only—not a score or individualized advice.'}</small>
  </div>
}
