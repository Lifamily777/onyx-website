import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { useLocale } from '../i18n/LocaleContext';
import { FOUNDATION_QUESTIONS, FOUNDATION_SECTIONS, calculateFoundationResult } from '../features/foundationV2';
import { getLifeEvent } from '../features/lifeCapitalMap';
import styles from './FoundationV2Page.module.css';
const Button = ({
  en,
  zh,
  ...props
}) => <button type="button" {...props}><Localized en={<><span><LocaleLabel value={en} /></span></>} zh={<><LocaleLabel value={zh} /></>} /></button>;
export default function FoundationV2Page() {
  const {
    localePath
  } = useLocale();
  const [phase, setPhase] = useState('intro'),
    [index, setIndex] = useState(0),
    [answers, setAnswers] = useState({});
  const question = FOUNDATION_QUESTIONS[index],
    selected = answers[question?.id];
  const result = useMemo(() => phase === 'result' ? calculateFoundationResult(answers) : null, [phase, answers]);
  useDocumentMeta('ONYX 4-Minute Foundation Check · 18 Questions', 'An optional bilingual check that highlights financial foundations, planning events, organization, and long-term capital areas worth exploring.');
  const choose = id => {
    if (question.type === 'single') return setAnswers(current => ({
      ...current,
      [question.id]: id
    }));
    setAnswers(current => {
      const existing = Array.isArray(current[question.id]) ? current[question.id] : [];
      const next = existing.includes(id) ? existing.filter(value => value !== id) : id === 'none' ? ['none'] : [...existing.filter(value => value !== 'none'), id];
      return {
        ...current,
        [question.id]: next
      };
    });
  };
  const hasAnswer = question?.type === 'multi' ? Array.isArray(selected) && selected.length > 0 : Boolean(selected);
  const restart = () => {
    setAnswers({});
    setIndex(0);
    setPhase('intro');
  };
  if (phase === 'intro') return <main className={`${styles.page} page-enter`}><section className={styles.intro}><p className={styles.eyebrow}><LocaleLabel value={"4-MINUTE FOUNDATION CHECK · 18 QUESTIONS"} /></p><h1><Localized en={<>Not sure where to begin?</>} zh={<>不确定从哪里开始？</>} /></h1><p><Localized en={<>This optional check highlights financial foundations, upcoming events, organization gaps, and long-term capital areas worth exploring. It is one entry into the Life Capital Map—not the map itself.</>} zh={<>这项可选检查提示值得探索的财务基础、近期事件、资料缺口和长期资本领域。它只是进入人生资本地图的一种方式，并不等同于地图本身。</>} /></p><ul><li><Localized en={<>No fake financial-health score</>} zh={<>不制造虚假健康分数</>} /></li><li><Localized en={<>No product recommendation</>} zh={<>不推荐具体产品</>} /></li><li><Localized en={<>Answers stay in memory for this visit only</>} zh={<>回答仅保留在本次访问内存中</>} /></li></ul><Button className={styles.primary} onClick={() => setPhase('questions')} en="Begin 4-Minute Check" zh="开始4分钟检查" /><Link to={localePath('/capital-map/journey')}><Localized en={<>Explore a real-life Journey instead</>} zh={<>改为探索真实生活旅程</>} /></Link><Link to={localePath('/capital-assessment')}><Localized en={<>Use the recoverable 30-question V1 instead</>} zh={<>使用可恢复进度的30题V1</>} /></Link></section></main>;
  if (phase === 'result') return <FoundationResult result={result} localePath={localePath} onRestart={restart} />;
  const section = FOUNDATION_SECTIONS.find(item => item.id === question.section),
    progress = (index + 1) / 18 * 100;
  return <main className={`${styles.page} page-enter`}><div className={styles.shell}><aside><p><Localized en={<>FOUNDATION PATH</>} zh={<>基础路径</>} /></p><ol>{FOUNDATION_SECTIONS.map(item => <li key={item.id} aria-current={item.id === section.id ? 'step' : undefined}><Localized en={<><LocaleLabel value={item.name} /></>} zh={<><LocaleLabel value={item.nameZh} /></>} /></li>)}</ol></aside><section className={styles.question} aria-labelledby={`foundation-${question.id}`}><header><div><strong><LocaleLabel value={question.id} /> · <LocaleLabel value={index + 1} /><LocaleLabel value={" of 18"} /></strong><span><Localized en={<><LocaleLabel value={section.name} /></>} zh={<><LocaleLabel value={section.nameZh} /></>} /></span></div><button type="button" onClick={restart}><Localized en={<>Restart</>} zh={<>重新开始</>} /></button></header><div className={styles.progress} role="progressbar" aria-valuemin="1" aria-valuemax="18" aria-valuenow={index + 1}><span style={{
            width: `${progress}%`
          }} /></div><h1 id={`foundation-${question.id}`}><Localized en={<><LocaleLabel value={question.question} /></>} zh={<><LocaleLabel value={question.questionZh} /></>} /></h1><div className={styles.options} role={question.type === 'single' ? 'radiogroup' : 'group'} aria-labelledby={`foundation-${question.id}`}>{question.options.map(item => {
            const active = question.type === 'multi' ? Array.isArray(selected) && selected.includes(item.id) : selected === item.id;
            return <button type="button" key={item.id} role={question.type === 'single' ? 'radio' : undefined} aria-checked={question.type === 'single' ? active : undefined} aria-pressed={question.type === 'multi' ? active : undefined} className={active ? styles.selected : undefined} onClick={() => choose(item.id)}><span><Localized en={<><LocaleLabel value={item.text} /></>} zh={<><LocaleLabel value={item.textZh} /></>} /></span><em><LocaleLabel value={active ? 'Selected · 已选择' : ''} /></em></button>;
          })}</div>{hasAnswer && <div className={styles.insight} aria-live="polite"><strong><Localized en={<>LEARN</>} zh={<>了解</>} /></strong><p><Localized en={<><LocaleLabel value={question.insight} /></>} zh={<><LocaleLabel value={question.insightZh} /></>} /></p></div>}<footer>{index > 0 && <Button className={styles.secondary} onClick={() => setIndex(index - 1)} en="Back" zh="返回" />}<Button className={styles.primary} disabled={!hasAnswer} onClick={() => index === 17 ? setPhase('result') : setIndex(index + 1)} en={index === 17 ? 'View My Foundation Map' : 'Continue'} zh={index === 17 ? '查看基础地图' : '继续'} /></footer></section></div></main>;
}
function FoundationResult({
  result,
  localePath,
  onRestart
}) {
  return <main className={`${styles.page} page-enter`}><div className={styles.results}><header><p className={styles.eyebrow}><Localized en={<>YOUR FOUNDATION MAP</>} zh={<>你的基础地图</>} /></p><h1><Localized en={<><LocaleLabel value={result.currentCapitalPosition.title} /></>} zh={<><LocaleLabel value={result.currentCapitalPosition.titleZh} /></>} /></h1><p><Localized en={<><LocaleLabel value={result.currentCapitalPosition.summary} /></>} zh={<><LocaleLabel value={result.currentCapitalPosition.summaryZh} /></>} /></p></header><ResultSection title="Immediate Attention Areas" titleZh="近期关注领域">{result.immediateAttention.length ? result.immediateAttention.map(node => <Link key={node.id} to={localePath(`/capital-map/node/${node.id.toLowerCase()}`)}><Localized en={<><LocaleLabel value={node.id} /> · <LocaleLabel value={node.title} /></>} zh={<><LocaleLabel value={node.titleZh} /></>} /></Link>) : <p><LocaleLabel value={"No foundational attention area was triggered; compare the Next Dollar roles without assuming one universal answer."} /></p>}</ResultSection><ResultSection title="Event Radar Signals" titleZh="事件雷达信号">{result.eventRadarSignals.events.map(id => {
          const event = getLifeEvent(id);
          return event ? <Link key={id} to={localePath(`/capital-map/event/${id}`)}><Localized en={<><LocaleLabel value={event.title} /></>} zh={<><LocaleLabel value={event.titleZh} /></>} /></Link> : null;
        })}{result.eventRadarSignals.noneKnown && <p><Localized en={<>None known today does not mean nothing will happen.</>} zh={<>目前没有已知事件，不代表什么都不会发生。</>} /></p>}{!result.eventRadarSignals.events.length && !result.eventRadarSignals.noneKnown && <p><LocaleLabel value={"No mapped event selected. Use the full Event Radar to explore planning windows."} /></p>}</ResultSection><ResultSection title="Long-Term Planning Signals" titleZh="长期规划信号">{result.longTermSignals.length ? result.longTermSignals.map(id => <span className={styles.signal} key={id}><LocaleLabel value={id.replaceAll('_', ' ')} /></span>) : <p><LocaleLabel value={"No long-term topic selected."} /></p>}<Link to={localePath('/capital-map/long-term')}><Localized en={<>Explore the 5–10 Year Planning Map</>} zh={<>探索5–10年规划地图</>} /></Link></ResultSection><ResultSection title="Records & Organization" titleZh="资料与组织">{result.organizationGaps.length ? result.organizationGaps.map(gap => <Link key={gap.id} to={localePath('/capital-map/node/w12')}><Localized en={<><LocaleLabel value={gap.title} /></>} zh={<><LocaleLabel value={gap.titleZh} /></>} /></Link>) : <p><LocaleLabel value={"No organization gap was triggered by this scan."} /></p>}</ResultSection><ResultSection title="Suggested Capital Map Nodes" titleZh="建议探索的资本地图节点">{result.suggestedNodes.map(node => <Link key={node.id} to={localePath(`/capital-map/node/${node.id.toLowerCase()}`)}><Localized en={<><LocaleLabel value={node.id} /> · <LocaleLabel value={node.title} /></>} zh={<><LocaleLabel value={node.titleZh} /></>} /></Link>)}</ResultSection><section className={styles.handoff}><h2><Localized en={<>Ask Sammi with context—not sensitive documents.</>} zh={<>带上背景联系Sammi，不发送敏感文件。</>} /></h2><Link to={`${localePath('/contact')}?context=${encodeURIComponent(result.askSammiContext)}`}><Localized en={<>Ask Sammi</>} zh={<>联系Sammi</>} /></Link></section><button type="button" className={styles.restart} onClick={onRestart}><Localized en={<>Restart Foundation</>} zh={<>重新开始</>} /></button></div></main>;
}
function ResultSection({
  title,
  titleZh,
  children
}) {
  return <section className={styles.resultSection}><h2><Localized en={<><LocaleLabel value={title} /></>} zh={<><LocaleLabel value={titleZh} /></>} /></h2><div><LocaleLabel value={children} /></div></section>;
}
