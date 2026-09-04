import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { EDUCATIONAL_DISCLAIMER, getWellnessNode, getWealthNode, LIFE_CAPITAL_STAGES } from '../features/lifeCapitalMap';
import NotFound from './NotFound';
import styles from './CapitalMap.module.css';
export default function WellnessNodePage() {
  const {
    id
  } = useParams();
  const {
    localePath
  } = useLocale();
  const node = getWellnessNode(id);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState([]);
  useDocumentMeta(node ? `${node.title} | ONYX Wellness Map` : 'Wellness node not found', node?.shortDescription || '');
  if (!node) return <NotFound />;
  const stage = LIFE_CAPITAL_STAGES.find(item => item.id === node.stage);
  const toggle = item => setChecked(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item]);
  return <main className={`${styles.shell} ${styles.detail} page-enter`}>
    <Link className={styles.back} to={localePath('/capital-map/wellness')}><Localized en={<>← Wellness Map</>} zh={<>健康地图</>} /></Link>
    <header className={styles.detailHero}><p><Localized en={<><LocaleLabel value={node.id} /> · <LocaleLabel value={stage.name} /></>} zh={<><LocaleLabel value={stage.nameZh} /></>} /></p><h1><Localized en={<><LocaleLabel value={node.title} /></>} zh={<><LocaleLabel value={node.titleZh} /></>} /></h1><p><Localized en={<><LocaleLabel value={node.shortDescription} /></>} zh={<><LocaleLabel value={node.shortDescriptionZh} /></>} /></p></header>

    <section className={styles.ask}><span><Localized en={<>QUESTION</>} zh={<>先问自己一个问题</>} /></span><h2><Localized en={<><LocaleLabel value={node.question.prompt} /></>} zh={<><LocaleLabel value={node.question.promptZh} /></>} /></h2><div>{node.question.options.map(option => <button type="button" key={option} aria-pressed={answer === option} onClick={() => setAnswer(option)}><LocaleLabel value={option} /></button>)}</div>{answer && <p className={styles.reflectionResult}><Localized en={<>Your reflection: <strong><LocaleLabel value={answer} /></strong>. This is not a score or diagnosis.</>} zh={<>你选的是：<strong><LocaleLabel value={answer} /></strong>。这不是评分或诊断。</>} /></p>}</section>
    <section className={styles.story}><span><Localized en={<>STORY</>} zh={<>生活案例</>} /></span><h2><Localized en={<><LocaleLabel value={node.story.title} /></>} zh={<><LocaleLabel value={node.story.titleZh} /></>} /></h2><p><Localized en={<><LocaleLabel value={node.story.body} /></>} zh={<><LocaleLabel value={node.story.bodyZh} /></>} /></p></section>
    <section className={styles.prose}><span><Localized en={<>EXPLAIN</>} zh={<>把事情说清楚</>} /></span><p><Localized en={<><LocaleLabel value={node.explain.body} /></>} zh={<><LocaleLabel value={node.explain.bodyZh} /></>} /></p></section>

    <section className={styles.tool}><span><Localized en={<>TRY</>} zh={<>自己试一试</>} /></span><h2><Localized en={<>Private reflection checklist </>} zh={<>先检查这几件事</>} /></h2><p><Localized en={<>Selections stay only on this page and are not submitted or saved.</>} zh={<>选择仅保留在当前页面，不会提交或保存。</>} /></p><div className={styles.checkGrid}>{node.tryItems.map(item => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} /><LocaleLabel value={item} /></label>)}</div><div className={styles.progressText} aria-live="polite"><Localized en={<>{checked.length} of {node.tryItems.length} reflected on</>} zh={<>已核对 {checked.length}/{node.tryItems.length} 项</>} /></div></section>
    <section className={styles.keep}><span><Localized en={<>KEEP</>} zh={<>记下来，方便以后用</>} /></span><h2><Localized en={<><LocaleLabel value={node.keep.title} /></>} zh={<><LocaleLabel value={node.keep.titleZh} /></>} /></h2><p><Localized en={<><LocaleLabel value={node.keep.note} /></>} zh={<><LocaleLabel value={node.keep.noteZh} /></>} /></p></section>
    <section className={styles.guidance}><article><span><LocaleLabel value={"SELF-MANAGE?"} /></span><h2><Localized en={<>What you may organize yourself</>} zh={<>你可以先做什么</>} /></h2><p><Localized en={<><LocaleLabel value={node.selfManage.body} /></>} zh={<><LocaleLabel value={node.selfManage.bodyZh} /></>} /></p></article><article><span><LocaleLabel value={"DEEPER REVIEW?"} /></span><h2><Localized en={<>When qualified review may help</>} zh={<>哪些问题需要问专业人士</>} /></h2><p><Localized en={<><LocaleLabel value={node.deeperReview.body} /></>} zh={<><LocaleLabel value={node.deeperReview.bodyZh} /></>} /></p><ul>{node.deeperReview.triggers.map(trigger => <li key={trigger}><LocaleLabel value={trigger} /></li>)}</ul></article></section>
    <section className={styles.related}><h2><Localized en={<>Connected Wealth Paths</>} zh={<>这些财务安排也值得一起看</>} /></h2><p><Localized en={<>These links show planning dependencies. Wellness reflections remain separate from Wealth assessment scores.</>} zh={<>就医和照护准备，也常常牵涉家庭开支和收入保障。你可以接着了解下面的主题；这里的健康选择不会影响财务自测结果。</>} /></p>{node.relatedWealthNodes.map(nodeId => {
        const wealthNode = getWealthNode(nodeId);
        return wealthNode ? <Link key={nodeId} to={localePath(`/capital-map/node/${nodeId.toLowerCase()}`)}><LocaleLabel value={nodeId} /> · <Localized en={<><LocaleLabel value={wealthNode.title} /></>} zh={<><LocaleLabel value={wealthNode.titleZh} /></>} /></Link> : null;
      })}</section>
    <section className={styles.askSammi}><span><LocaleLabel value={"ASK SAMMI"} /></span><h2><Localized en={<>Organize the question before sharing information.</>} zh={<>想问什么，可以先列出来。不必发送私人资料。</>} /></h2><Link to={`${localePath('/contact')}?context=${encodeURIComponent(node.askSammiContext)}`}><Localized en={<>Ask Sammi with context</>} zh={<>带着这些问题和 Sammi 聊聊</>} /></Link></section>
    <footer className={styles.disclaimer}><p><Localized en={<>Wellness content is educational and does not diagnose, treat, or replace care from qualified health professionals.</>} zh={<>健康内容仅用于教育，不提供诊断或治疗，也不能替代合格医疗专业人员的照护。</>} /></p><p><Localized en={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.en} /></>} zh={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.zh} /></>} /></p></footer>
  </main>;
}
