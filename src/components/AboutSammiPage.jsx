import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './AboutSammiPage.module.css'

export default function AboutSammiPage(){
  const { locale, localePath }=useLocale(); const zh=locale==='zh'
  useDocumentMeta(`${zh?'关于 Sammi':'About Sammi'} · ONYX Wealth & Wellness`, zh?'认识黑曜财商创始人 Sammi Q，以及她以信任为先的家庭资本方法。':'Meet Sammi Q and her trust-first approach to working family capital.')
  return <main className={`${styles.page} page-enter`}><header className={styles.hero}><p>{zh?'关于 SAMMI':'ABOUT SAMMI'}</p><h1>Sammi Q</h1><h2>{zh?'黑曜财商创始人 · 家庭资本策略师':'Founder, ONYX Wealth & Wellness · Family Capital Strategist'}</h2></header><section className={styles.intro}><h2>{zh?'先理解问题，再讨论解决方案。':'Understand the problem before discussing a solution.'}</h2><p>{zh?'我是 Sammi Q，ONYX Wealth & Wellness 的创始人。我的主要服务对象是 W-2 工薪人士、1099 自雇人士，以及处于事业和家庭成长阶段的家庭。我的工作重点，是帮助客户发现容易忽略的财务问题，并围绕收入与税务、退休规划、教育资金、家庭保障及其他重要人生目标，梳理彼此关联的解决方向。':'Hi, I’m Sammi Q, founder of ONYX Wealth & Wellness. I work primarily with W-2 professionals, 1099 earners, and modern growing families. My focus is helping clients identify overlooked financial questions and build coordinated solutions around income and taxes, retirement planning, education funding, family protection, and other important life goals.'}</p><Link to={localePath('/capital-map')}>{zh?'探索资本地图':'Explore My Capital Map'}</Link></section></main>
}
