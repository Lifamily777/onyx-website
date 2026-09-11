import ContentLibraryView from './ContentLibraryView'

import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './PhaseOne.module.css'

export default function PhaseOneResourcePage({ mode }) {
 const { locale, localePath } = useLocale()
 const zh = locale === 'zh'
 const build = mode === 'build'
 const title = build ? (zh ? '实施 · 先有策略，再行动' : 'Build · Strategy before action') : (zh ? '学习 · 持续理解' : 'Learn · Keep building understanding')
 useDocumentMeta(title + ' · ONYX', zh ? '以教育与人工判断为基础。' : 'Grounded in education and human judgment.')
 return <main className={styles.page}><h1>{title}</h1>{build ? <>
  <p>{zh ? '先了解完整情况，再讨论合适的实施路径。以下服务方向尚在筹备，不代表已经开放或适合每个人。' : 'Understand the whole picture before discussing implementation. These pathways are planned, not currently available services or recommendations for everyone.'}</p>
  <div className={styles.card}><h2>{zh ? '未来的实施与指导' : 'Future implementation and guidance'}</h2><ul>{(zh ? ['退休计划设置与审阅','Roth 策略指导','保险需求审阅与演示','房地产策略协调','企业基础设施','健康与养生事业','AI 驱动的一人公司'] : ['Retirement-plan setup and review','Roth strategy guidance','Insurance needs review and illustration','Real-estate strategy coordination','Business infrastructure','Health & Wellness Business','AI-Powered One-Person Company']).map(item=><li key={item}>{item}</li>)}</ul></div>
  <div className={styles.actions}><Link className={styles.button} to={localePath('/profile')}>{zh ? '从我的概况开始' : 'Begin with my profile'}</Link><Link to={localePath('/strategies')}>{zh ? '先理解策略' : 'Understand strategies first'} →</Link></div>
 </> : <>
  <p>{zh ? '先理解，再决定。阅读 ONYX 文章，并通过权威来源进一步核实。' : 'Understand before deciding. Read ONYX articles and use authoritative sources to explore further.'}</p>
  <ContentLibraryView />
  <div className={styles.actions}><Link to={localePath('/insights')}>ONYX Insights →</Link><Link to={localePath('/glossary')}>{zh ? '术语表' : 'Glossary'} →</Link></div>
 </>}</main>
}
