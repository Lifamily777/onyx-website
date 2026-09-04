import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { JOB_CHANGE_EVENT } from '../features/decisionIntelligence'
import styles from './DecisionGuidePage.module.css'

export default function DecisionEntryCard({ compact = false }) {
  const { locale, localePath } = useLocale(), zh=locale==='zh', l=value=>value[zh?'zh':'en']
  return <article className={`${styles.entryCard} ${compact?styles.compact:''}`}><span>{zh?'生活发生了变化':'SOMETHING CHANGED'}</span><h3>{l(JOB_CHANGE_EVENT.title)}</h3><p>{l(JOB_CHANGE_EVENT.summary)}</p><div>{JOB_CHANGE_EVENT.planningWindows.map(item=><small key={l(item)}>{l(item)}</small>)}</div><Link to={localePath('/decisions/job-change-old-401k')}>{zh?'先看看旧 401(k) 这一步 →':'Explore the old 401(k) decision →'}</Link></article>
}
