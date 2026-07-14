import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { surveyQuestions, TIER_IDS, TIER_ROUTE } from '../data/survey'
import { calculateSurveyResult } from '../utils/surveyScore'
import styles from './SurveyPage.module.css'

export default function SurveyPage() {
  const { t, localePath } = useLocale()
  const [phase, setPhase] = useState('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  useDocumentMeta(`${t('survey.meta.title')} · ONYX`, t('survey.meta.subtitle'))

  const totalSteps = surveyQuestions.length
  const current = surveyQuestions[step]
  const progress = phase === 'questions' ? ((step + 1) / totalSteps) * 100 : 0

  function startSurvey() {
    setPhase('questions')
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  function selectOption(optionId) {
    const next = { ...answers, [current.id]: optionId }

    // Auto-set children_ages to N/A when no dependents
    if (current.id === 'children_count' && optionId === 'none') {
      next.children_ages = 'na'
    }
    if (current.id === 'children_count' && optionId !== 'none' && next.children_ages === 'na') {
      delete next.children_ages
    }

    setAnswers(next)

    if (step < totalSteps - 1) {
      // Skip children_ages if no dependents
      if (current.id === 'children_count' && optionId === 'none') {
        const agesIdx = surveyQuestions.findIndex((q) => q.id === 'children_ages')
        if (step + 1 === agesIdx) {
          setTimeout(() => setStep(step + 2), 180)
          return
        }
      }
      setTimeout(() => setStep(step + 1), 180)
    } else {
      setResult(calculateSurveyResult(next))
      setPhase('result')
    }
  }

  function goBack() {
    if (phase === 'result') {
      setPhase('questions')
      setStep(totalSteps - 1)
      setResult(null)
      return
    }
    if (step > 0) {
      const prevQ = surveyQuestions[step - 1]
      if (prevQ.id === 'children_ages' && answers.children_count === 'none') {
        setStep(step - 2)
      } else {
        setStep(step - 1)
      }
    } else {
      setPhase('intro')
    }
  }

  if (phase === 'intro') {
    return (
      <div className={`${styles.wrap} page-enter`}>
        <div className={styles.intro}>
          <h1 className={styles.title}>{t('survey.meta.title')}</h1>
          <p className={styles.sub}>{t('survey.meta.subtitle')}</p>
          <p className={styles.description}>{t('survey.intro.description')}</p>
          <p className={styles.timeNote}>{t('survey.intro.timeNote')}</p>
          <p className={styles.privacy}>{t('survey.intro.privacyNote')}</p>

          <button type="button" className={styles.startBtn} onClick={startSurvey}>
            {t('survey.intro.startCta')}
          </button>

          <p className={styles.disclaimer}>{t('survey.disclaimer')}</p>
        </div>
      </div>
    )
  }

  if (phase === 'result' && result) {
    const { tier, percentages, rankedTiers } = result
    const nextSteps = t(`survey.results.${tier}.nextSteps`)
    const otherTiers = rankedTiers.filter((rt) => rt.id !== tier)

    return (
      <div className={`${styles.wrap} page-enter`}>
        <div className={styles.resultHero}>
          <p className={styles.eyebrow}>{t('survey.resultPage.eyebrow')}</p>
          <h1 className={styles.resultTitle}>{t(`survey.results.${tier}.name`)}</h1>
        </div>

        <div className={styles.resultBody}>
          <p className={styles.resultSummary}>{t(`survey.results.${tier}.summary`)}</p>

          <div className={styles.scoreBars}>
            <h2 className={styles.scoreTitle}>{t('survey.resultPage.mixHeading')}</h2>
            {TIER_IDS.map((id) => (
              <div key={id} className={styles.scoreRow}>
                <span className={`${styles.scoreLabel} ${styles[`label_${id}`]}`}>
                  {t(`survey.results.${id}.name`)}
                  {id === tier && (
                    <span className={styles.primaryTag}>{t('survey.resultPage.primaryTag')}</span>
                  )}
                </span>
                <div className={styles.scoreTrack}>
                  <div
                    className={`${styles.scoreFill} ${styles[`fill_${id}`]}`}
                    style={{ width: `${percentages[id]}%` }}
                  />
                </div>
                <span className={styles.scorePct}>{percentages[id]}%</span>
              </div>
            ))}
          </div>

          <div className={styles.nextStepsBlock}>
            <h2 className={styles.blockTitle}>{t('survey.resultPage.nextStepsHeading')}</h2>
            <ul className={styles.nextStepsList}>
              {nextSteps.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.resultActions}>
            <Link className={styles.primaryBtn} to={localePath(`/${TIER_ROUTE[tier]}`)}>
              {t(`survey.results.${tier}.cta`)}
            </Link>
          </div>

          <div className={styles.reviewOthers}>
            <h2 className={styles.blockTitle}>{t('survey.resultPage.reviewOthersHeading')}</h2>
            {otherTiers.map((rt) => (
              <div key={rt.id} className={styles.reviewCard}>
                <span className={styles.reviewName}>{t(`survey.results.${rt.id}.name`)}</span>
                <Link className={styles.reviewLink} to={localePath(`/${TIER_ROUTE[rt.id]}`)}>
                  {t(`survey.results.${rt.id}.cta`)} ›
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.resultActions}>
            <button type="button" className={styles.secondaryBtn} onClick={startSurvey}>
              {t('survey.resultPage.retakeCta')}
            </button>
            <Link className={styles.textBtn} to={localePath('/')}>
              {t('survey.resultPage.backHomeCta')}
            </Link>
          </div>

          <p className={styles.disclaimer}>{t('survey.disclaimer')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.wrap} page-enter`}>
      <div className={styles.quiz}>
        <div className={styles.quizHeader}>
          <button type="button" className={styles.backBtn} onClick={goBack}>
            ‹ {t('survey.progress.back')}
          </button>
          <span className={styles.stepCount}>
            {t('survey.progress.step')
              .replace('{{current}}', step + 1)
              .replace('{{total}}', totalSteps)}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <h2 className={styles.question}>{t(`survey.questions.${current.id}.question`)}</h2>
        {current.hasHint && (
          <p className={styles.questionHint}>{t(`survey.questions.${current.id}.hint`)}</p>
        )}

        <div
          className={styles.options}
          role="radiogroup"
          aria-label={t(`survey.questions.${current.id}.question`)}
        >
          {current.options.map((opt) => {
            const selected = answers[current.id] === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                onClick={() => selectOption(opt.id)}
              >
                {t(`survey.questions.${current.id}.options.${opt.id}`)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
