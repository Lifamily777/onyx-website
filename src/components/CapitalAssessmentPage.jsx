import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { useEffect, useState } from 'react';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { CAPITAL_LAYERS, assessmentQuestions, trackCapitalAssessmentEvent } from '../features/capitalAssessment';
import useCapitalAssessment from '../features/capitalAssessment/hooks/useCapitalAssessment';
import CapitalAssessmentResult from './CapitalAssessmentResult';
import styles from './CapitalAssessmentPage.module.css';
const copy = {
  title: 'ONYX Capital Priority Assessment',
  titleZh: '家庭资本优先级自测',
  subtitle: 'Find where your family capital stands — before deciding where it should go next.',
  subtitleZh: '先看清家庭资本现在站在哪一层，再决定下一块钱该往哪里走。'
};
function BilingualButton({
  en,
  zh,
  ...props
}) {
  return <button type="button" {...props}><Localized en={<><span><LocaleLabel value={en} /></span></>} zh={<><LocaleLabel value={zh} /></>} /></button>;
}
export default function CapitalAssessmentPage() {
  const assessment = useCapitalAssessment();
  const [confirmRestart, setConfirmRestart] = useState(false);
  useDocumentMeta('ONYX Capital Priority Assessment | Wealth & Wellness', 'Explore six layers of family capital and identify what your next dollar may need to do first — stabilize, protect, grow, optimize, or create optionality.');
  useEffect(() => {
    trackCapitalAssessmentEvent('capital_assessment_viewed');
  }, []);
  if (assessment.phase === 'intro') {
    return <main className={`${styles.page} page-enter`}>
        <section className={styles.intro} aria-labelledby="capital-assessment-title">
          <p className={styles.eyebrow}><Localized en={<>Capital has an order. </>} zh={<>资本有先后顺序。</>} /></p>
          <h1 id="capital-assessment-title"><Localized en={<><LocaleLabel value={copy.title} /></>} zh={<><LocaleLabel value={copy.titleZh} /></>} /></h1>
          <p className={styles.subtitle}><Localized en={<><LocaleLabel value={copy.subtitle} /></>} zh={<><LocaleLabel value={copy.subtitleZh} /></>} /></p>
          <div className={styles.introCopy}><Localized en={<>
            <p>This assessment looks at six layers of family capital — from financial survival and stability to growth, strategy, and long-term optionality.</p>
            <p>It is designed to help you identify which layer deserves attention before asking your next dollar to do something new.</p>
            </>} zh={<>
              <p>这项自测从六个层次观察家庭资本：从基本生存与稳定，到保护、增长、战略配置，以及长期传承与选择权。</p>
              <p>它的目的不是告诉你“买什么”，而是帮助你先看清：在让下一块钱承担新任务之前，哪一级资本最值得先加固。</p>
            </>} />
          </div>
          <div className={styles.introActions}>
            {assessment.hasIncompleteSavedProgress ? <>
                <BilingualButton className={styles.primaryButton} onClick={assessment.resume} en="Continue Assessment" zh="继续上次自测" />
                <p className={styles.savedNote}><Localized en={<><LocaleLabel value={assessment.answeredCount} /> of 30 questions completed </>} zh={<>已完成 <LocaleLabel value={assessment.answeredCount} /> / 30</>} /></p>
                <BilingualButton className={styles.textButton} onClick={() => setConfirmRestart(true)} en="Start Over" zh="重新开始" />
              </> : <BilingualButton className={styles.primaryButton} onClick={assessment.start} en="Start Assessment" zh="开始自测" />}
          </div>
          <p className={styles.storageNote}><Localized en={<>We’ll try to save your assessment progress in this browser so you can continue later. ONYX does not need to collect your individual answers for the assessment to generate your Capital Map.</>} zh={<>我们会尝试将自测进度保存在当前浏览器中，方便稍后继续。生成家庭资本地图并不需要 ONYX 收集你的个人回答。</>} /></p>
        </section>
        {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => {
        assessment.restart();
        setConfirmRestart(false);
      }} />}
      </main>;
  }
  if (assessment.phase === 'complete') {
    return <Completion onView={assessment.showResultPreview} onRestart={() => setConfirmRestart(true)} confirmRestart={confirmRestart} cancel={() => setConfirmRestart(false)} restart={() => {
      assessment.restart();
      setConfirmRestart(false);
    }} />;
  }
  if (assessment.phase === 'result-preview') {
    return <><CapitalAssessmentResult result={assessment.result} onRetake={() => setConfirmRestart(true)} />
      {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => {
        assessment.retake();
        setConfirmRestart(false);
      }} />}</>;
  }
  const layer = CAPITAL_LAYERS.find(item => item.id === assessment.question.layer);
  const selected = assessment.selectedAnswer;
  const positionProgress = (assessment.index + 1) / assessmentQuestions.length * 100;
  return <main className={`${styles.page} page-enter`}>
      <div className={styles.assessmentShell}>
        <aside className={styles.ladder} aria-label="Capital layers explored">
          <p className={styles.ladderLabel}><Localized en={<>Capital Ladder </>} zh={<>资本阶梯</>} /></p>
          <ol reversed>
            {[...CAPITAL_LAYERS].reverse().map(item => {
            const state = item.order < layer.order ? 'explored' : item.id === layer.id ? 'current' : 'upcoming';
            return <li key={item.id} className={styles[state]} aria-current={state === 'current' ? 'step' : undefined}>
                <span className={styles.layerNumber}><LocaleLabel value={item.order} /></span>
                <span><Localized en={<><LocaleLabel value={item.name} /></>} zh={<><LocaleLabel value={item.nameZh} /></>} /></span>
                <span className={styles.stateText}><LocaleLabel value={state === 'explored' ? 'Explored / 已探索' : state === 'current' ? 'Current / 当前' : 'Upcoming / 待探索'} /></span>
              </li>;
          })}
          </ol>
        </aside>

        <section className={styles.questionPanel} aria-labelledby={`question-${assessment.question.id}`}>
          <header className={styles.questionHeader}>
            <div>
              <p><LocaleLabel value={"Question "} /><LocaleLabel value={assessment.index + 1} /><LocaleLabel value={" of "} /><LocaleLabel value={assessmentQuestions.length} /></p>
              <p className={styles.layerMeta}><Localized en={<>Layer <LocaleLabel value={layer.order} /> of 6 · <LocaleLabel value={layer.name} /> </>} zh={<><LocaleLabel value={layer.nameZh} /></>} /></p>
            </div>
            <button type="button" className={styles.restartLink} onClick={() => setConfirmRestart(true)}><Localized en={<>Start Over </>} zh={<>重新开始</>} /></button>
          </header>
          <div className={styles.progressTrack} role="progressbar" aria-label="Assessment completion progress" aria-valuemin="0" aria-valuemax="30" aria-valuenow={assessment.index + 1}>
            <span style={{
            width: `${positionProgress}%`
          }} />
          </div>
          <h1 id={`question-${assessment.question.id}`} className={styles.question}><Localized en={<><LocaleLabel value={assessment.question.question} /></>} zh={<><LocaleLabel value={assessment.question.questionZh} /></>} /></h1>
          <div className={styles.options} role="radiogroup" aria-labelledby={`question-${assessment.question.id}`}>
            {assessment.question.options.map(option => <button key={option.id} type="button" role="radio" aria-checked={selected === option.id} className={`${styles.option} ${option.id === 'F' ? styles.notApplicable : ''} ${selected === option.id ? styles.selected : ''}`} onClick={() => assessment.selectAnswer(option.id)}>
                <span className={styles.optionLetter}><LocaleLabel value={option.id} /></span>
                <span><Localized en={<><LocaleLabel value={option.text} /></>} zh={<><LocaleLabel value={option.textZh} /></>} /></span>
                <span className={styles.selectionState}><LocaleLabel value={selected === option.id ? 'Selected / 已选择' : ''} /></span>
              </button>)}
          </div>
          {selected && <div className={styles.insight} aria-live="polite">
              <p className={styles.insightLabel}><Localized en={<>Insight </>} zh={<>洞察</>} /></p>
              <p><Localized en={<><LocaleLabel value={assessment.question.insight} /></>} zh={<><LocaleLabel value={assessment.question.insightZh} /></>} /></p>
            </div>}
          <div className={styles.navigation}>
            {assessment.index > 0 && <BilingualButton className={styles.secondaryButton} onClick={assessment.back} en="Back" zh="返回" />}
            <BilingualButton className={styles.primaryButton} disabled={!selected} onClick={assessment.continueForward} en={assessment.index === 29 ? 'Complete Assessment' : 'Continue'} zh={assessment.index === 29 ? '完成自测' : '继续'} />
          </div>
        </section>
      </div>
      {confirmRestart && <RestartDialog onCancel={() => setConfirmRestart(false)} onConfirm={() => {
      assessment.restart();
      setConfirmRestart(false);
    }} />}
    </main>;
}
function Completion({
  onView,
  onRestart,
  confirmRestart,
  cancel,
  restart
}) {
  return <main className={`${styles.page} page-enter`}><section className={styles.handoff}>
    <p className={styles.eyebrow}><Localized en={<>Assessment complete </>} zh={<>自测已完成</>} /></p>
    <h1><Localized en={<>Your Capital Map is ready.</>} zh={<>你的家庭资本地图已经生成。</>} /></h1>
    <p><Localized en={<>We’ve reviewed all six layers of your capital structure.</>} zh={<>我们已经梳理了你家庭资本结构的六个层次。</>} /></p>
    <div className={styles.previewList}><p><LocaleLabel value={"Next, we’ll show:"} /></p><ul><Localized en={<><li>your Capital Ladder</li><li>your Primary Capital Position</li><li>what your next dollar may need to do first</li></>} zh={<><p>接下来，我们将呈现：</p><ul><li>你的资本阶梯</li><li>你的首要资本位置</li><li>下一块钱可能最需要先完成什么任务</li></ul></>} /></ul></div>
    <BilingualButton className={styles.primaryButton} onClick={onView} en="View My Capital Map" zh="查看我的资本地图" />
    <BilingualButton className={styles.textButton} onClick={onRestart} en="Start Over" zh="重新开始" />
  </section>{confirmRestart && <RestartDialog onCancel={cancel} onConfirm={restart} />}</main>;
}
function RestartDialog({
  onCancel,
  onConfirm
}) {
  return <div className={styles.dialogBackdrop}><div className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="restart-title" aria-describedby="restart-description">
    <h2 id="restart-title"><Localized en={<>Start over?</>} zh={<>重新开始？</>} /></h2>
    <p id="restart-description"><Localized en={<>Your current assessment progress will be cleared.</>} zh={<>当前自测进度将被清除。</>} /></p>
    <div className={styles.dialogActions}><BilingualButton className={styles.secondaryButton} onClick={onCancel} en="Cancel" zh="取消" /><BilingualButton className={styles.dangerButton} onClick={onConfirm} en="Start Over" zh="重新开始" /></div>
  </div></div>;
}
