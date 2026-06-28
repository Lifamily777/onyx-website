import React, { useState } from 'react'
import { brand } from '../data/content'
import { surveyIntro, surveyQuestions, tierLabels, tierProfiles, TIER_IDS } from '../data/survey'
import { calculateSurveyResult } from '../utils/surveyScore'
import styles from './SurveyPage.module.css'

const TENDENCY_ROLES = [
  { en: 'Primary', zh: '主要倾向' },
  { en: 'Secondary', zh: '次要倾向' },
  { en: 'Supplementary', zh: '补充倾向' },
]

export default function SurveyPage({ setPage }) {
  const [phase, setPhase] = useState('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

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
          <p className={styles.eyebrow}>{brand.fitCheck}</p>
          <h1 className={styles.title}>{surveyIntro.title}</h1>
          <p className={styles.titleZh}>{surveyIntro.titleZh}</p>
          <p className={styles.sub}>{surveyIntro.subtitle}</p>
          <p className={styles.subZh}>{surveyIntro.subtitleZh}</p>

          <div className={styles.tierPreview}>
            {TIER_IDS.map((key) => (
              <div key={key} className={`${styles.tierChip} ${styles[key]}`}>
                <span className={styles.tierChipLabel}>
                  {tierLabels[key].en} · {tierLabels[key].zh}
                </span>
                <span className={styles.tierChipDesc}>
                  {key === 'tax' && 'Tax structure & asset building · 筹税节税与资产积累'}
                  {key === 'risk' && 'Insurance, cash value & legacy · 保险理财与长期传承'}
                  {key === 'wellness' && 'Health, energy & prevention · 身体养护与精力管理'}
                </span>
              </div>
            ))}
          </div>

          <p className={styles.privacy}>{surveyIntro.privacy}</p>
          <p className={styles.privacyZh}>{surveyIntro.privacyZh}</p>

          <button type="button" className={styles.startBtn} onClick={startSurvey}>
            Start · 开始（约 5–8 分钟）
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'result' && result) {
    const { profile, percentages, rankedServices, rankedTiers, tier } = result

    return (
      <div className={`${styles.wrap} page-enter`}>
        <div
          className={styles.resultHero}
          style={{ background: profile.color, borderColor: profile.accent }}
        >
          <span className={styles.resultBadge} style={{ color: profile.accent }}>
            {profile.badge} · {profile.badgeZh}
          </span>
          <h1 className={styles.resultTitle}>{profile.nameZh}</h1>
          <p className={styles.resultHeadline}>{profile.headline}</p>
          <p className={styles.resultHeadlineZh}>{profile.headlineZh}</p>
        </div>

        <div className={styles.resultBody}>
          <p className={styles.resultSummary}>{profile.summary}</p>
          <p className={styles.resultSummaryZh}>{profile.summaryZh}</p>

          <div className={styles.scoreBars}>
            <h3 className={styles.scoreTitle}>Your profile mix · 阶段分布</h3>
            {TIER_IDS.map((t) => (
              <div key={t} className={styles.scoreRow}>
                <span className={`${styles.scoreLabel} ${styles[`label_${t}`]}`}>
                  {tierLabels[t].en} · {tierLabels[t].zh}
                  {t === tier && <span className={styles.primaryTag}>主要</span>}
                </span>
                <div className={styles.scoreTrack}>
                  <div
                    className={`${styles.scoreFill} ${styles[`fill_${t}`]}`}
                    style={{ width: `${percentages[t]}%` }}
                  />
                </div>
                <span className={styles.scorePct}>{percentages[t]}%</span>
              </div>
            ))}
          </div>

          <div className={styles.tendencyBox}>
            <h3 className={styles.blockTitle}>Your tendencies · 倾向概览</h3>
            {rankedTiers.map((t, i) => (
              <div
                key={t.id}
                className={`${styles.tendencyRow} ${i === 0 ? styles.tendencyPrimary : ''}`}
              >
                <span className={styles.tendencyRole}>
                  {TENDENCY_ROLES[i].zh} {TENDENCY_ROLES[i].en}
                </span>
                <span className={`${styles.tendencyName} ${styles[`label_${t.id}`]}`}>
                  {t.label.zh}档
                </span>
                <span className={styles.tendencyPct}>{t.percentage}%</span>
              </div>
            ))}
          </div>

          <div className={styles.traits}>
            <h3 className={styles.blockTitle}>Why this fits you · 为何匹配</h3>
            <ul className={styles.traitList}>
              {profile.traits.map((t, i) => (
                <li key={i}>
                  {t.en}
                  <span className={styles.traitZh}>{t.zh}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.services}>
            <h3 className={styles.blockTitle}>
              Recommended services · 服务导向
              <span className={styles.servicesHint}>（按上方百分比排序）</span>
            </h3>
            {rankedServices.map((s) => (
              <div key={s.id} className={styles.serviceCard}>
                <div className={styles.serviceTop}>
                  <div className={styles.serviceMeta}>
                    <span
                      className={styles.servicePriority}
                      style={{ color: tierProfiles[s.tier].accent }}
                    >
                      {s.priority} · {s.priorityZh}
                    </span>
                    <span className={`${styles.servicePct} ${styles[`label_${s.tier}`]}`}>
                      {s.tierLabel.zh} {s.percentage}%
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.serviceLink}
                    onClick={() => setPage(s.id)}
                  >
                    {s.title} · {s.titleZh} ›
                  </button>
                </div>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <p className={styles.serviceDescZh}>{s.descZh}</p>
              </div>
            ))}
          </div>

          <div className={styles.resultActions}>
            <button type="button" className={styles.primaryBtn} onClick={() => setPage('contact')}>
              Book Free Consultation · 预约咨询
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={startSurvey}>
              Retake · 重新测试
            </button>
            <button type="button" className={styles.textBtn} onClick={() => setPage('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.wrap} page-enter`}>
      <div className={styles.quiz}>
        <div className={styles.quizHeader}>
          <button type="button" className={styles.backBtn} onClick={goBack}>
            ‹ Back
          </button>
          <span className={styles.stepCount}>
            {step + 1} / {totalSteps}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <h2 className={styles.question}>{current.question}</h2>
        <p className={styles.questionZh}>{current.questionZh}</p>
        {current.questionHint && (
          <p className={styles.questionHint}>{current.questionHint}</p>
        )}

        <div className={styles.options}>
          {current.options.map((opt) => {
            const selected = answers[current.id] === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                onClick={() => selectOption(opt.id)}
              >
                <span className={styles.optionEn}>{opt.label}</span>
                <span className={styles.optionZh}>{opt.labelZh}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
