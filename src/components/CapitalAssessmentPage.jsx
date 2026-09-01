import { useEffect, useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { CAPITAL_LAYERS, assessmentQuestions, trackCapitalAssessmentEvent } from '../features/capitalAssessment'
import useCapitalAssessment from '../features/capitalAssessment/hooks/useCapitalAssessment'
import CapitalAssessmentResult from './CapitalAssessmentResult'
import styles from './CapitalAssessmentPage.module.css'

const copy = {
  title: 'ONYX Capital Priority Assessment', titleZh: '家庭资本优先级自测',
  subtitle: 'Find where your family capital stands — before deciding where it should go next.',
  subtitleZh: '先看清家庭资本现在站在哪一层，再决定下一块钱该往哪里走。',
}

function BilingualButton({ en, zh, ...props }) {
  return <button type="button" {...props}><span>{en}</span><span lang="zh-Hans">{zh}</span></button>
}

export default function CapitalAssessmentPage() {
  const assessment = useCapitalAssessment()
  const [confirmRestart, setConfirmRestart] = useState(false)
  useDocumentMeta('ONYX Capital Priority Assessment | Wealth & Wellness', 'Explore six layers of family capital and identify what your next dollar may need to do first — stabilize, protect, grow, optimize, or create optionality.')
  useEffect(() => { trackCapitalAssessmentEvent('capital_assessment_viewed') }, [])

  if (assessment.phase === 'intro') {
    return (
      <main className={`${styles.page} page-enter`}>
        <section className={styles.intro} aria-labelledby="capital-assessment-title">
          <p className={styles.eyebrow}>Capital has an order. <span lang="zh-Hans">资本有先后顺序。</span></p>
          <h1 id="capital-assessment-title">{copy.title}<span lang="zh-Hans">{copy.titleZh}</span></h1>
          <p className={styles.subtitle}>{copy.subtitle}<span lang="zh-Hans">{copy.subtitleZh}</span></p>
          <div className={styles.introCopy}>
            <p>This assessment looks at six layers of family capital — from financial survival and stability to growth, strategy, and long-term optionality.</p>
            <p>It is designed to help you identify which layer deserves attention before asking your next dollar to do something new.</p>
            <div lang="zh-Hans">
              <p>这项自测从六个层次观察家庭资本：从基本生存与稳定，到保护、增长、战略配置，以及长期传承与选择权。</p>
              <p>它的目的不是告诉你“买什么”，而是帮助你先看清：在让下一块钱承担新任务之前，哪一级资本最值得先加固。</p>
            </div>
          </div>
          <div className={styles.introActions}>
            {assessment.hasIncompleteSavedProgress ? (
              <>
                <BilingualButton className={styles.primaryButton} onClick={assessment.resume} en="Continue Assessment" zh="继续上次自测" />
                <p className={styles.savedNote}>{assessment.answeredCount} of 30 questions completed <span lang="zh-Hans">已完成 {assessment.answeredCount} / 30</span></p>
                <BilingualButton className={styles.textButton} onClick={() => setConfirmRestart(true)} en="Start Over" zh="重新开始" />
              </>
            ) : <BilingualButton className={styles.primaryButton} onClick={assessment.start} en="Start Assessment" zh="开始自测" />}
          </div>
          <p className={styles.storageNote}>We’ll try to save your assessment progress in this browser so you can continue later. ONYX does not need to collect your individual answers for the assessment to generate your Capital Map.<span lang="zh-Hans">我们会尝试将自测进度保存在当前浏览器中，方便稍后继续。生成家庭资本地图并不需要 ONYX 收集你的个人回答。</span></p>
        </section>
        {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => { assessment.restart(); setConfirmRestart(false) }} />}
      </main>
    )
  }

  if (assessment.phase === 'complete') {
    return <Completion onView={assessment.showResultPreview} onRestart={() => setConfirmRestart(true)} confirmRestart={confirmRestart} cancel={() => setConfirmRestart(false)} restart={() => { assessment.restart(); setConfirmRestart(false) }} />
  }

  if (assessment.phase === 'result-preview') {
    return <><CapitalAssessmentResult result={assessment.result} onRetake={() => setConfirmRestart(true)} />
      {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => { assessment.retake(); setConfirmRestart(false) }} />}</>
  }

  const layer = CAPITAL_LAYERS.find((item) => item.id === assessment.question.layer)
  const selected = assessment.selectedAnswer
  const positionProgress = ((assessment.index + 1) / assessmentQuestions.length) * 100
  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.assessmentShell}>
        <aside className={styles.ladder} aria-label="Capital layers explored">
          <p className={styles.ladderLabel}>Capital Ladder <span lang="zh-Hans">资本阶梯</span></p>
          <ol reversed>
            {[...CAPITAL_LAYERS].reverse().map((item) => {
              const state = item.order < layer.order ? 'explored' : item.id === layer.id ? 'current' : 'upcoming'
              return <li key={item.id} className={styles[state]} aria-current={state === 'current' ? 'step' : undefined}>
                <span className={styles.layerNumber}>{item.order}</span>
                <span>{item.name}<small lang="zh-Hans">{item.nameZh}</small></span>
                <span className={styles.stateText}>{state === 'explored' ? 'Explored / 已探索' : state === 'current' ? 'Current / 当前' : 'Upcoming / 待探索'}</span>
              </li>
            })}
          </ol>
        </aside>

        <section className={styles.questionPanel} aria-labelledby={`question-${assessment.question.id}`}>
          <header className={styles.questionHeader}>
            <div>
              <p>Question {assessment.index + 1} of {assessmentQuestions.length}</p>
              <p className={styles.layerMeta}>Layer {layer.order} of 6 · {layer.name} <span lang="zh-Hans">{layer.nameZh}</span></p>
            </div>
            <button type="button" className={styles.restartLink} onClick={() => setConfirmRestart(true)}>Start Over <span lang="zh-Hans">重新开始</span></button>
          </header>
          <div className={styles.progressTrack} role="progressbar" aria-label="Assessment completion progress" aria-valuemin="0" aria-valuemax="30" aria-valuenow={assessment.index + 1}>
            <span style={{ width: `${positionProgress}%` }} />
          </div>
          <h1 id={`question-${assessment.question.id}`} className={styles.question}>{assessment.question.question}<span lang="zh-Hans">{assessment.question.questionZh}</span></h1>
          <div className={styles.options} role="radiogroup" aria-labelledby={`question-${assessment.question.id}`}>
            {assessment.question.options.map((option) => (
              <button key={option.id} type="button" role="radio" aria-checked={selected === option.id}
                className={`${styles.option} ${option.id === 'F' ? styles.notApplicable : ''} ${selected === option.id ? styles.selected : ''}`}
                onClick={() => assessment.selectAnswer(option.id)}>
                <span className={styles.optionLetter}>{option.id}</span>
                <span>{option.text}<small lang="zh-Hans">{option.textZh}</small></span>
                <span className={styles.selectionState}>{selected === option.id ? 'Selected / 已选择' : ''}</span>
              </button>
            ))}
          </div>
          {selected && (
            <div className={styles.insight} aria-live="polite">
              <p className={styles.insightLabel}>Insight <span lang="zh-Hans">洞察</span></p>
              <p>{assessment.question.insight}</p>
              <p lang="zh-Hans">{assessment.question.insightZh}</p>
            </div>
          )}
          <div className={styles.navigation}>
            {assessment.index > 0 && <BilingualButton className={styles.secondaryButton} onClick={assessment.back} en="Back" zh="返回" />}
            <BilingualButton className={styles.primaryButton} disabled={!selected} onClick={assessment.continueForward}
              en={assessment.index === 29 ? 'Complete Assessment' : 'Continue'} zh={assessment.index === 29 ? '完成自测' : '继续'} />
          </div>
        </section>
      </div>
      {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => { assessment.restart(); setConfirmRestart(false) }} />}
    </main>
  )
}

function Completion({ onView, onRestart, confirmRestart, cancel, restart }) {
  return <main className={`${styles.page} page-enter`}><section className={styles.handoff}>
    <p className={styles.eyebrow}>Assessment complete <span lang="zh-Hans">自测已完成</span></p>
    <h1>Your Capital Map is ready.<span lang="zh-Hans">你的家庭资本地图已经生成。</span></h1>
    <p>We’ve reviewed all six layers of your capital structure.</p><p lang="zh-Hans">我们已经梳理了你家庭资本结构的六个层次。</p>
    <div className={styles.previewList}><p>Next, we’ll show:</p><ul><li>your Capital Ladder</li><li>your Primary Capital Position</li><li>what your next dollar may need to do first</li></ul>
    <div lang="zh-Hans"><p>接下来，我们将呈现：</p><ul><li>你的资本阶梯</li><li>你的首要资本位置</li><li>下一块钱可能最需要先完成什么任务</li></ul></div></div>
    <BilingualButton className={styles.primaryButton} onClick={onView} en="View My Capital Map" zh="查看我的资本地图" />
    <BilingualButton className={styles.textButton} onClick={onRestart} en="Start Over" zh="重新开始" />
  </section>{confirmRestart && <RestartDialog onCancel={cancel} onConfirm={restart} />}</main>
}

function RestartDialog({ onCancel, onConfirm }) {
  return <div className={styles.dialogBackdrop}><div className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="restart-title" aria-describedby="restart-description">
    <h2 id="restart-title">Start over?<span lang="zh-Hans">重新开始？</span></h2>
    <p id="restart-description">Your current assessment progress will be cleared.<span lang="zh-Hans">当前自测进度将被清除。</span></p>
    <div className={styles.dialogActions}><BilingualButton className={styles.secondaryButton} onClick={onCancel} en="Cancel" zh="取消" /><BilingualButton className={styles.dangerButton} onClick={onConfirm} en="Start Over" zh="重新开始" /></div>
  </div></div>
}
