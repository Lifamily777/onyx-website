import { useMemo, useState } from 'react'
import {
  assessmentQuestions, calculateAssessmentResult, clearAssessmentProgress,
  loadAssessmentProgress, saveAssessmentProgress,
} from '../index.js'
import { questionProgressBucket, trackCapitalAssessmentEvent } from '../utils/pilotEvents.js'

export function createFreshProgress(now = new Date().toISOString()) {
  return { currentQuestion: 1, answers: {}, startedAt: now, completedAt: null }
}

export function countAnswered(answers) {
  return Object.keys(answers).filter((id) => answers[id]).length
}

export default function useCapitalAssessment() {
  const [savedAtLoad] = useState(() => loadAssessmentProgress())
  const [hasSavedProgress, setHasSavedProgress] = useState(Boolean(savedAtLoad))
  const [phase, setPhase] = useState(savedAtLoad?.completedAt ? 'complete' : 'intro')
  const [progress, setProgress] = useState(() => savedAtLoad || createFreshProgress())
  const [result, setResult] = useState(() => savedAtLoad?.completedAt
    ? calculateAssessmentResult(savedAtLoad.answers) : null)

  const index = Math.max(0, Math.min(assessmentQuestions.length - 1, progress.currentQuestion - 1))
  const question = assessmentQuestions[index]
  const hasIncompleteSavedProgress = hasSavedProgress && !progress.completedAt

  function persist(next) {
    setProgress(next)
    if (saveAssessmentProgress(next)) setHasSavedProgress(true)
  }

  function start() {
    const fresh = createFreshProgress()
    setResult(null)
    persist(fresh)
    setPhase('questions')
    trackCapitalAssessmentEvent('capital_assessment_started')
  }

  function resume() {
    setPhase('questions')
    trackCapitalAssessmentEvent('capital_assessment_resumed', {
      questionBucket: questionProgressBucket(progress.currentQuestion),
      layer: question.layer,
    })
  }

  function selectAnswer(optionId) {
    persist({ ...progress, answers: { ...progress.answers, [question.id]: optionId } })
    trackCapitalAssessmentEvent('capital_assessment_question_progress', {
      questionBucket: questionProgressBucket(progress.currentQuestion),
      layer: question.layer,
    })
  }

  function back() {
    if (index === 0) return
    persist({ ...progress, currentQuestion: index })
  }

  function continueForward() {
    if (!progress.answers[question.id]) return
    if (index < assessmentQuestions.length - 1) {
      persist({ ...progress, currentQuestion: index + 2 })
      const nextQuestion = assessmentQuestions[index + 1]
      if (nextQuestion.layer !== question.layer) {
        trackCapitalAssessmentEvent('capital_assessment_layer_reached', { layer: nextQuestion.layer })
      }
      return
    }
    const completed = { ...progress, currentQuestion: 30, completedAt: new Date().toISOString() }
    const calculated = calculateAssessmentResult(completed.answers)
    persist(completed)
    setResult(calculated)
    setPhase('complete')
    trackCapitalAssessmentEvent('capital_assessment_completed')
  }

  function restart() {
    clearAssessmentProgress()
    setHasSavedProgress(false)
    const fresh = createFreshProgress()
    setProgress(fresh)
    setResult(null)
    setPhase('intro')
  }

  function retake() {
    clearAssessmentProgress()
    const fresh = createFreshProgress()
    setProgress(fresh)
    setResult(null)
    saveAssessmentProgress(fresh)
    setHasSavedProgress(true)
    setPhase('questions')
    trackCapitalAssessmentEvent('capital_assessment_retake_started')
  }

  return useMemo(() => ({
    phase, progress, result, index, question, hasIncompleteSavedProgress,
    answeredCount: countAnswered(progress.answers), selectedAnswer: progress.answers[question.id] || null,
    start, resume, selectAnswer, back, continueForward, restart, retake,
    showResultPreview: () => {
      setPhase('result-preview')
      trackCapitalAssessmentEvent('capital_assessment_result_viewed')
    },
  // Function identities intentionally update with state; consumers use them as event handlers.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [phase, progress, result, index, question, hasIncompleteSavedProgress])
}
