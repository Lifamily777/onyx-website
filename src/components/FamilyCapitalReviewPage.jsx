import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useLocale } from '../i18n/LocaleContext'
import {
  familyCapitalReviewQuestions,
  getVisibleReviewQuestions,
  getVisibleReviewFields,
  reviewFieldLabels,
  calculateFamilyCapitalReview,
} from '../features/familyCapitalReview'
import styles from './FamilyCapitalReviewPage.module.css'

const statusIcons = {red:'●',yellow:'●',green:'●',gray:'○'}
const stateCopy = {
  represented:{en:'Represented',zh:'已有体现'},needs_review:{en:'Needs review',zh:'需要梳理'},unclear:{en:'Unclear',zh:'尚不清楚'},not_selected:{en:'Not selected',zh:'未选择'},
}

export default function FamilyCapitalReviewPage() {
  const { locale, localePath } = useLocale()
  const zh = locale === 'zh'
  const local = (value) => value?.[zh ? 'zh' : 'en'] || ''
  const [phase,setPhase] = useState('intro')
  const [index,setIndex] = useState(0)
  const [answers,setAnswers] = useState({})
  const questions = getVisibleReviewQuestions(answers)
  const question = questions[index]
  const fields = question ? getVisibleReviewFields(question,answers) : []
  const result = useMemo(() => phase === 'result' ? calculateFamilyCapitalReview(answers) : null,[phase,answers])
  useDocumentMeta(zh ? '家庭资本梳理｜ONYX Wealth & Wellness' : 'Family Capital Review | ONYX Wealth & Wellness',zh ? '通过12个核心发现问题，梳理家庭基础、资本任务、行动顺序与下一步会谈重点。' : 'A 12-question first-meeting review of foundations, capital jobs, action horizons, and useful conversation priorities.')

  const choose = (field,optionId) => setAnswers((current) => {
    const questionAnswer = current[question.id] || {}
    if (field.type === 'single') return {...current,[question.id]:{...questionAnswer,[field.id]:optionId}}
    const selected = Array.isArray(questionAnswer[field.id]) ? questionAnswer[field.id] : []
    const exclusive = ['none','unsure','prefer_not','na']
    const next = selected.includes(optionId)
      ? selected.filter((id)=>id !== optionId)
      : exclusive.includes(optionId)
        ? [optionId]
        : [...selected.filter((id)=>!exclusive.includes(id)),optionId]
    return {...current,[question.id]:{...questionAnswer,[field.id]:next}}
  })

  const fieldAnswered = (field) => {
    if (field.optional) return true
    const value = answers[question.id]?.[field.id]
    return field.type === 'multi' ? Array.isArray(value) && value.length > 0 : Boolean(value)
  }
  const complete = fields.every(fieldAnswered)
  const restart = () => { setAnswers({}); setIndex(0); setPhase('intro') }
  const advance = () => {
    const latest = getVisibleReviewQuestions(answers)
    if (index >= latest.length - 1) setPhase('result')
    else setIndex(index + 1)
  }

  if (phase === 'intro') return <main className={`${styles.page} page-enter`}><section className={styles.intro}>
    <p className={styles.eyebrow}>{zh?'第一次会谈 · 12个核心问题':'FIRST MEETING · 12 CORE QUESTIONS'}</p>
    <h1>{zh?'先看清整个家庭，再讨论解决方案。':'See the whole family before discussing solutions.'}</h1>
    <p>{zh?'家庭资本梳理帮助我们了解目前的基础、资金需要完成的任务，以及哪些决定值得先讨论。它不打分，也不会根据是否拥有某种产品来判断好坏。':'The Family Capital Review helps us understand the current foundation, the jobs your money needs to perform, and which decisions deserve attention first. It does not score you or judge the household by product ownership.'}</p>
    <div className={styles.promiseGrid}><article><b>01</b><strong>{zh?'Foundation Map':'Foundation Map'}</strong><span>{zh?'看清基础与规划窗口':'See foundations and planning windows'}</span></article><article><b>02</b><strong>Capital Job Map</strong><span>{zh?'分开看现有资金与下一块钱':'Separate existing money from the next dollar'}</span></article><article><b>03</b><strong>Action Map</strong><span>{zh?'把决定放进正确的时间顺序':'Put decisions in the right time horizon'}</span></article></div>
    <button type="button" className={styles.primary} onClick={()=>setPhase('questions')}>{zh?'开始家庭资本梳理':'Begin Family Capital Review'}</button>
    <p className={styles.privacy}>{zh?'回答仅保留在当前页面内存中。刷新或离开页面后不会保存。请勿输入账号、身份证号或上传敏感文件。':'Answers remain only in page memory and are not saved after refresh or departure. Do not enter account numbers, identity numbers, or upload sensitive documents.'}</p>
  </section></main>

  if (phase === 'result') return <ReviewResult result={result} local={local} zh={zh} localePath={localePath} onRestart={restart} />

  const progress = (question.order / familyCapitalReviewQuestions.length) * 100
  return <main className={`${styles.page} page-enter`}><div className={styles.reviewShell}>
    <aside className={styles.steps}><p>{zh?'12项发现路径':'12-PART DISCOVERY PATH'}</p><ol>{familyCapitalReviewQuestions.map((item)=>{const isVisible=questions.some((visible)=>visible.id===item.id);const isCurrent=item.id===question.id;const isDone=isVisible&&item.order<question.order;return <li key={item.id} className={isCurrent?styles.current:isDone?styles.done:''} style={!isVisible?{opacity:.48}:undefined} aria-current={isCurrent?'step':undefined}><span>{String(item.order).padStart(2,'0')}</span>{local(item.title)}{!isVisible&&<small style={{gridColumn:2,fontSize:9,textTransform:'uppercase'}}>{zh?'不适用':'Skipped'}</small>}</li>})}</ol></aside>
    <section className={styles.questionPanel} aria-labelledby={`review-${question.id}`}>
      <header><div><p>{zh?`核心问题 ${question.order} / 12`:`Core question ${question.order} of 12`}</p><strong>{local(question.title)}</strong></div><button type="button" onClick={restart}>{zh?'重新开始':'Start over'}</button></header>
      <div className={styles.progress} role="progressbar" aria-valuemin="1" aria-valuemax="12" aria-valuenow={question.order}><span style={{width:`${progress}%`}} /></div>
      <h1 id={`review-${question.id}`}>{local(question.prompt)}</h1>
      <div className={styles.fields}>{fields.map((field)=><fieldset key={field.id}><legend>{local(reviewFieldLabels[`${question.id}.${field.id}`])}{field.optional&&<small>{zh?'（可选）':' (optional)'}</small>}</legend><div className={styles.options} role={field.type==='multi'?'group':'radiogroup'}>{field.options.map((item)=>{
        const value=answers[question.id]?.[field.id]; const selected=field.type==='multi'?Array.isArray(value)&&value.includes(item.id):value===item.id
        return <button type="button" key={item.id} role={field.type==='single'?'radio':undefined} aria-checked={field.type==='single'?selected:undefined} aria-pressed={field.type==='multi'?selected:undefined} className={selected?styles.selected:''} onClick={()=>choose(field,item.id)}><span>{local(item.label)}</span><i aria-hidden="true">{selected?'✓':''}</i></button>
      })}</div></fieldset>)}</div>
      {question.note&&<p className={styles.note}>{local(question.note)}</p>}
      <footer>{index>0&&<button type="button" className={styles.secondary} onClick={()=>setIndex(index-1)}>{zh?'返回':'Back'}</button>}<button type="button" className={styles.primary} disabled={!complete} onClick={advance}>{index===questions.length-1?(zh?'生成家庭资本地图':'Build My Review'):(zh?'继续':'Continue')}</button></footer>
    </section>
  </div></main>
}

function ReviewResult({result,local,zh,localePath,onRestart}) {
  const context = `Family Capital Review ${result.reviewVersion}; priority: ${result.clientPriority.id}; focus: ${result.sammiConversationContext.focusFoundationIds.join(', ') || 'review together'}. No sensitive documents.`
  const actionSections = [
    {key:'now',title:zh?'现在':'NOW',items:result.actionMap.now},
    {key:'next',title:zh?'未来12个月':'NEXT 12 MONTHS',items:result.actionMap.next12Months},
    {key:'track',title:zh?'进展良好':'ON TRACK',items:result.actionMap.onTrack},
  ]
  return <main className={`${styles.page} page-enter`}><div className={styles.results}>
    <header className={styles.resultHero}><p className={styles.eyebrow}>{zh?'家庭资本梳理结果':'FAMILY CAPITAL REVIEW'}</p><h1>{zh?'先看全局，再决定下一步。':'See the whole picture. Then decide what comes next.'}</h1><p>{zh?'这是一张会谈地图，不是分数，也不是产品建议。每项结论都可以回到你的回答和仍需确认的信息。':'This is a conversation map—not a score or product recommendation. Every finding traces back to your answers and the information still needed.'}</p><div><span>{zh?'你最关心':'YOUR PRIORITY'}</span><strong>{local(result.clientPriority.label)}</strong></div>{result.onyxAlsoNoticed&&<div><span>{zh?'黑曜同时注意到':'ONYX ALSO NOTICED'}</span><strong>{local(result.onyxAlsoNoticed.title)}</strong></div>}</header>

    <ResultSection eyebrow={zh?'01 · 基础地图':'01 · FOUNDATION MAP'} title={zh?'八项基础，一目了然':'Eight foundations at a glance'}><div className={styles.foundationGrid}>{result.foundations.map((item)=><article key={item.id} className={styles[item.status]}><div><span aria-hidden="true">{statusIcons[item.status]}</span><small>{local(item.statusLabel)}</small></div><h3>{local(item.title)}</h3><p>{local(item.whyFlagged)}</p><details><summary>{zh?'为什么这样显示':'Why this appears'}</summary><dl><dt>{zh?'关联':'CONNECTS TO'}</dt><dd>{local(item.whatItConnectsTo)}</dd><dt>{zh?'准备资料':'INFORMATION TO GATHER'}</dt><dd>{local(item.informationToGather)}</dd><dt>{zh?'下一步':'NEXT STEP'}</dt><dd>{local(item.suggestedNextStep)}</dd></dl><Link to={localePath(item.route)}>{zh?'查看相关知识':'Open related knowledge'} →</Link></details></article>)}</div></ResultSection>

    <ResultSection eyebrow="02 · CAPITAL JOB MAP" title={zh?'现有资金与下一块钱，不是同一个问题':'Existing money and the next dollar are different decisions'}><p className={styles.principle}>{local(result.capitalJobs.principle)}</p><div className={styles.jobColumns}><JobList title={zh?'现有资金':'EXISTING MONEY'} jobs={result.capitalJobs.existingMoney} local={local}/><JobList title={zh?'下一块钱':'NEXT DOLLAR'} jobs={result.capitalJobs.nextDollar} local={local}/></div></ResultSection>

    <ResultSection eyebrow="03 · ACTION MAP" title={zh?'先讨论决定，再讨论工具':'Prioritize decisions before tools'}><div className={styles.actionGrid}>{actionSections.map((section)=><article key={section.key}><h3>{section.title}</h3>{section.items.length?section.items.map((item)=><Link key={item.foundationId} to={localePath(item.route)}><strong>{local(item.title)}</strong><span>{local(item.why)}</span></Link>):<p>{zh?'目前没有归入这一时段的事项。':'No item currently falls in this horizon.'}</p>}</article>)}</div></ResultSection>

    <ResultSection eyebrow={zh?'04 · 决策线索':'04 · DECISION INTELLIGENCE'} title={zh?'重要的不是标签，而是接下来要弄清什么':'The useful question is what to clarify next'}><div className={styles.intelligence}>{result.foundations.filter((item)=>item.status!=='green').map((item)=><article key={item.id}><h3>{local(item.title)}</h3><p>{local(item.whyFlagged)}</p><b>{zh?'还需要：':'Still needed: '}{local(item.informationToGather)}</b></article>)}</div></ResultSection>

    <section className={styles.sammi}><p className={styles.eyebrow}>{zh?'05 · 会谈摘要':'05 · CONTEXTUAL SAMMI REVIEW'}</p><h2>{zh?'把地图带进一次有重点的谈话。':'Bring the map into a focused conversation.'}</h2><div className={styles.sammiGrid}><SummaryList title={zh?'目前健康':'WHAT APPEARS HEALTHY'} items={result.sammiReview.healthy} local={local}/><SummaryList title={zh?'需要关注':'NEEDS ATTENTION'} items={result.sammiReview.needsAttention} local={local}/><SummaryList title={zh?'临近决定':'DECISIONS APPROACHING'} items={result.sammiReview.decisionsApproaching} local={local}/><SummaryList title={zh?'仍缺信息':'MISSING INFORMATION'} items={result.sammiReview.missingInformation} local={local}/></div><Link className={styles.primary} to={`${localePath('/contact')}?context=${encodeURIComponent(context)}`}>{zh?'带着梳理结果联系 Sammi':'Review This Map with Sammi'}</Link><p>{zh?'Sammi 会使用这份摘要支持会谈；最终判断仍需要客户事实、专业分析，以及适用情况下的持牌审核。':'This summary supports a human conversation. Final decisions still depend on client facts, professional analysis, and licensed review where applicable.'}</p></section>
    <button type="button" className={styles.restart} onClick={onRestart}>{zh?'重新开始':'Start a new review'}</button>
  </div></main>
}

function ResultSection({eyebrow,title,children}) { return <section className={styles.resultSection}><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{children}</section> }
function JobList({title,jobs,local}) { return <article><h3>{title}</h3>{jobs.map((job)=><div key={job.id} className={styles.job}><strong>{job.id}</strong><span>{local(job.label)}</span><small>{local(stateCopy[job.state])}</small></div>)}</article> }
function SummaryList({title,items,local}) { return <article><h3>{title}</h3>{items.length?<ul>{items.map((item)=><li key={item.foundationId}>{local(item.title)}</li>)}</ul>:<p>—</p>}</article> }
