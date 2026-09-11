import ProfileSessionActions from './ProfileSessionActions'
import { useProfileSession } from '../features/onyxProfile/ProfileSessionContext'
import { profileDisclosure } from '../features/onyxProfile/copy'

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { profileSections, toggleAnswer, buildCapitalProfile } from '../features/onyxProfile/schema'
import { textFor } from '../features/onyxProfile/strategies'
import styles from './PhaseOne.module.css'

export default function OnyxProfilePage() {
 const { locale, localePath } = useLocale()
 const zh = locale === 'zh'
 const text = value => textFor(value, locale)
 const { session, update } = useProfileSession()
 const { step, answers } = session
 const setStep = step => update({ step })
 const heading = useRef(null)
 const total = profileSections.length
 const complete = step === total
 const section = profileSections[step]
 const profile = buildCapitalProfile(answers)
 const title = complete ? (zh ? 'ONYX 客户资本概况' : 'ONYX Client Capital Profile') : (zh ? 'ONYX 财务概况问卷' : 'Your ONYX Profile')
 const disclosure = profileDisclosure[zh ? 'zh' : 'en']
 useDocumentMeta(title + ' · ONYX', disclosure)
 useEffect(() => { if (step >= 0) heading.current?.focus() }, [step])
 const change = (id, value) => update({ answers: { ...answers, [id]: value } })
 return <main className={styles.page}>
  <p className={styles.eyebrow}>{zh ? '了解现状 · 先看全貌' : 'Assess · See the whole picture'}</p>
  <h1 ref={heading} tabIndex={-1}>{title}</h1>
  <p className={styles.note}>{disclosure}</p>
  <ProfileSessionActions />
  {step === -1 ? <>
   <h2>{zh ? '先了解您，再讨论策略。' : 'Understand you before discussing strategies.'}</h2>
   <p>{zh ? '涵盖收入、账户、保障、资产、房地产、债务、偏好与流动性。所有问题均可跳过，也可选择不确定或暂不回答。无需姓名、联系方式、账号或精确余额。' : 'Explore income, accounts, protection, assets, real estate, debt, preferences and liquidity. Every question is optional; skip it or choose “Not sure” or “Prefer not to say.” No name, contact details, account numbers or exact balances are needed.'}</p>

   <button className={styles.button} onClick={() => setStep(0)}>{zh ? '开始填写 ONYX 概况' : 'Start Your ONYX Profile'}</button>
  </> : complete ? <>
   <p>{zh ? '以下仅汇总您提供的资料。未回答不代表没有；此概况不包含评分、资格判断或产品推荐。可返回任一部分修改。' : 'This summarizes only what you shared. Unanswered does not mean absent. There are no scores, eligibility decisions or product recommendations. You can return to any section to edit.'}</p>
   {profileSections.map((group, index) => <details className={styles.summary} open key={group.id}><summary>{text(group.title)}</summary><dl>{group.fields.map(field => {
    const values = Array.isArray(profile[field.id]) ? profile[field.id] : [profile[field.id]]
    const labels = values.filter(Boolean).map(id => text(field.options.find(option => option.id === id).label))
    return <div key={field.id}><dt>{text(field.label)}</dt><dd>{labels.join(zh ? '、' : '; ') || (zh ? '未回答' : 'Not answered')}</dd></div>
   })}</dl><button className={`${styles.button} ${styles.secondary}`} onClick={() => setStep(index)}>{zh ? '修改本部分' : 'Edit this section'}</button></details>)}
   <div className={styles.note}><h2>{zh ? '为下一次交流做准备' : 'Prepare for a human conversation'}</h2><p>{zh ? '哪些信息需要核实？近期需求有哪些？哪些选择值得了解？策略中心帮助您整理问题，而不会根据答案为您选择策略。' : 'What needs verification? What near-term needs matter? Which choices do you want to understand? The Strategy Hub helps organize questions; it does not select strategies from your answers.'}</p></div>
   <div className={styles.actions}><Link className={`${styles.button} ${styles.secondary}`} to={localePath('/strategies')}>{zh ? '探索策略中心' : 'Explore the Strategy Hub'}</Link></div>
  </> : <>
   <p role="status">{zh ? `第 ${step + 1} 部分，共 ${total} 部分` : `Section ${step + 1} of ${total}`} · {zh ? '所有问题均可跳过' : 'All questions optional'}</p>
   <progress className={styles.progress} value={step + 1} max={total} aria-label={zh ? '问卷进度' : 'Profile progress'} />
   <h2>{text(section.title)}</h2>
   {section.id === 'income' && <p>{zh ? '收入范围仅用于探索，不计算税率或估算税款。请勿重复计算同一笔收入。' : 'Income bands support discovery only; we do not calculate tax brackets or estimate tax. Avoid counting the same income twice.'}</p>}
   {section.id === 'retirement' && <p>{zh ? '为每类账户选择最符合主要账户的状态；如有多种情况，可留待人工交流补充。' : 'For each account type, choose the status of your main account. Multiple arrangements can be clarified in a human conversation.'}</p>}
   {section.id === 'real-estate' && <p>{zh ? '房地产既是资本配置选择，也涉及取决于事实与法律的税务问题。持有物业或表达兴趣不代表符合任何税务资格。' : 'Real estate is a capital allocation choice with tax questions that depend on facts and law. Owning property or expressing interest does not establish tax eligibility.'}</p>}
   <form onSubmit={event => { event.preventDefault(); setStep(step + 1) }}>
    {section.fields.map(field => field.type === 'multi' ? <fieldset className={styles.field} key={field.id}><legend>{text(field.label)}</legend><div className={styles.options}>{field.options.map(option => <label className={styles.option} key={option.id}><input type="checkbox" checked={(answers[field.id] || []).includes(option.id)} onChange={() => change(field.id, toggleAnswer(answers[field.id], option.id))} />{text(option.label)}</label>)}</div></fieldset> : <label className={styles.field} key={field.id}><span>{text(field.label)}</span><select value={answers[field.id] || ''} onChange={event => change(field.id, event.target.value)}><option value="">{zh ? '跳过 / 未回答' : 'Skip / not answered'}</option>{field.options.map(option => <option key={option.id} value={option.id}>{text(option.label)}</option>)}</select></label>)}
    <div className={styles.actions}><button className={`${styles.button} ${styles.secondary}`} type="button" onClick={() => setStep(step - 1)}>{zh ? '返回' : 'Back'}</button><button className={styles.button} type="submit">{step === total - 1 ? (zh ? '查看我的概况' : 'Review my profile') : (zh ? '继续' : 'Continue')}</button></div>
   </form>
  </>}
 </main>
}
