import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { EDUCATIONAL_DISCLAIMER, LONG_TERM_AREAS, getLifeEvent, getWealthNode, getWellnessNode } from '../features/lifeCapitalMap';
import styles from './CapitalMap.module.css';
export default function LongTermPlanningPage() {
  const {
    localePath
  } = useLocale();
  useDocumentMeta('ONYX 5–10 Year Planning Map · 长期规划地图', 'Explore retirement, healthcare, protection, assets, business, legacy, and work optionality as an educational planning horizon.');
  return <main className={`${styles.shell} page-enter`}><header className={styles.hero}><p className={styles.eyebrow}><Localized en={<>5–10 YEAR HORIZON</>} zh={<>5–10年视野</>} /></p><h1><Localized en={<>Long-Term Planning Map</>} zh={<>长期规划地图</>} /></h1><p><Localized en={<>Long-term planning is not prediction. It is a way to notice dependencies, decision windows, and questions before they become urgent.</>} zh={<>长期规划不是预测，而是在问题变得紧急之前，看见依赖关系、决策窗口和值得提出的问题。</>} /></p></header><nav className={styles.axisNav} aria-label="Long-term planning areas">{LONG_TERM_AREAS.map(area => <a key={area.id} href={`#${area.id}`}><LocaleLabel value={area.title} /></a>)}</nav><section className={styles.longTermGrid}>{LONG_TERM_AREAS.map(area => <article id={area.id} key={area.id} className={styles.longTermArea}><header><span><Localized en={<>EXPLORE</>} zh={<>探索</>} /></span><h2><Localized en={<><LocaleLabel value={area.title} /></>} zh={<><LocaleLabel value={area.titleZh} /></>} /></h2><p><Localized en={<><LocaleLabel value={area.summary} /></>} zh={<><LocaleLabel value={area.summaryZh} /></>} /></p></header><div className={styles.longTermColumns}><section><h3><Localized en={<>Topics to understand</>} zh={<>值得理解</>} /></h3><ul>{area.topics.map(topic => <li key={topic}><LocaleLabel value={topic} /></li>)}</ul></section><section><h3><Localized en={<>Questions to consider</>} zh={<>值得思考</>} /></h3><ul>{area.questions.map(question => <li key={question}><LocaleLabel value={question} /></li>)}</ul></section></div><div className={styles.guidance}><section><span><LocaleLabel value={"SELF-MANAGE?"} /></span><p><LocaleLabel value={area.selfManage} /></p></section><section><span><LocaleLabel value={"DEEPER REVIEW?"} /></span><p><LocaleLabel value={area.deeperReview} /></p></section></div><div className={styles.related}><h3><Localized en={<>Connected Map Paths</>} zh={<>相关地图路径</>} /></h3><LocaleLabel value={area.relatedNodes?.map(id => {
            const node = getWealthNode(id);
            return node ? <Link key={id} to={localePath(`/capital-map/node/${id.toLowerCase()}`)}>{id} · <Localized en={<>{node.title}</>} zh={<>{node.titleZh}</>} /></Link> : null;
          })} /><LocaleLabel value={area.wellnessNodes?.map(id => {
            const node = getWellnessNode(id);
            return node ? <Link key={id} to={localePath(`/capital-map/wellness/${id.toLowerCase()}`)}>{id} · <Localized en={<>{node.title}</>} zh={<>{node.titleZh}</>} /></Link> : null;
          })} /><LocaleLabel value={area.relatedEvents?.map(id => {
            const event = getLifeEvent(id);
            return event ? <Link key={id} to={localePath(`/capital-map/event/${id}`)}><Localized en={<>{event.title}</>} zh={<>{event.titleZh}</>} /></Link> : null;
          })} /></div></article>)}</section><section className={styles.askSammi}><span><LocaleLabel value={"ASK SAMMI"} /></span><h2><Localized en={<>Organize the long-term questions before choosing an implementation.</>} zh={<>先整理长期问题，再决定如何执行。</>} /></h2><Link to={`${localePath('/contact')}?context=${encodeURIComponent('I’m reviewing my 5–10 year Life Capital Map and want to organize the planning questions.')}`}><Localized en={<>Ask Sammi with context</>} zh={<>带背景联系Sammi</>} /></Link></section><footer className={styles.disclaimer}><p><LocaleLabel value={"This is an educational planning horizon, not individualized retirement, investment, tax, insurance, legal, or medical advice."} /></p><p><Localized en={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.en} /></>} zh={<><LocaleLabel value={EDUCATIONAL_DISCLAIMER.zh} /></>} /></p></footer></main>;
}
