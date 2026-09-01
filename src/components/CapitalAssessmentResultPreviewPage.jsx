import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { calculateAssessmentResult } from '../features/capitalAssessment'
import CapitalAssessmentResult from './CapitalAssessmentResult'
import { useLocale } from '../i18n/LocaleContext'

// Temporary developer preview using the fictional High Assets, Low Protection
// validation profile. Remove this page and its route after visual review.
const PREVIEW_ANSWERS = Object.fromEntries([
  'E','E','E','E','C', 'D','E','E','E','E', 'C','A','D','B','B',
  'E','E','E','E','E', 'E','E','E','D','E', 'C','C','F','D','D',
].map((answer, index) => [`Q${index + 1}`, answer]))

export default function CapitalAssessmentResultPreviewPage() {
  const navigate = useNavigate()
  const { localePath } = useLocale()
  const result = useMemo(() => calculateAssessmentResult(PREVIEW_ANSWERS), [])

  useDocumentMeta('Temporary Capital Map Preview | ONYX', 'Temporary visual preview of the ONYX Capital Map result experience.')

  return <CapitalAssessmentResult result={result} onRetake={() => navigate(localePath('/capital-assessment'))} />
}
