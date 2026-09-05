import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { LIFE_CAPITAL_STAGES } from '../features/lifeCapitalMap';
import { HERO_JOURNEYS, localized } from '../features/journeyEngine';
import styles from './JourneyEngine.module.css';
export default function JourneyIndexPage() {
  const {
    locale,
    localePath
  } = useLocale();
  const zh = locale === 'zh';
  useDocumentMeta(zh ? '人生资本旅程 | ONYX Wealth & Wellness' : 'Life Capital Journey | ONYX', 'Explore real decisions, consequences, and capital principles across Wealth and Wellness.');
  return <main className={`${styles.shell} page-enter`}><header className={styles.indexHero}><p><LocaleLabel value={zh ? '人生资本旅程' : 'LIFE CAPITAL JOURNEY'} /></p><h1><LocaleLabel value={zh ? '从真实选择出发，看见资本如何影响人生。' : 'Explore the decisions that shape your life capital.'} /></h1><p><LocaleLabel value={zh ? '不是测试，也没有分数。选择一个真实场景，判断接下来可能发生什么，再看清其中的资本原则。' : 'This is not a test and there is no score. Enter a real scenario, make a judgment, and discover the capital principle underneath it.'} /></p></header><section className={styles.journeyRoad} aria-label={zh ? '六阶段人生资本路径' : 'Six-stage Life Capital path'}>{LIFE_CAPITAL_STAGES.map((stage, index) => {
        const items = HERO_JOURNEYS.filter(item => item.stage === stage.id);
        return <article key={stage.id} className={styles.roadStage}><div className={styles.roadMarker}><span><LocaleLabel value={String(stage.order).padStart(2, '0')} /></span>{index < LIFE_CAPITAL_STAGES.length - 1 && <i aria-hidden="true" />}</div><div className={styles.roadContent}><p><LocaleLabel value={zh ? stage.nameZh : stage.name} /></p><small><LocaleLabel value={zh ? stage.descriptionZh : stage.description} /></small><div className={styles.lanes}><span><Localized en={<>WEALTH</>} zh={<>财富</>} /></span><span><Localized en={<>WELLNESS</>} zh={<>健康</>} /></span></div>{items.map(item => <Link key={item.id} to={localePath(`/capital-map/journey/${item.id}`)} className={styles.journeyStop}><b><LocaleLabel value={localized(item.title, locale)} /></b><small><LocaleLabel value={localized(item.subtitle, locale)} /></small><em><LocaleLabel value={zh ? '开始场景 →' : 'Explore scenario →'} /></em></Link>)}</div></article>;
      })}</section><footer className={styles.indexFooter}><Link to={localePath('/capital-map')}><LocaleLabel value={zh ? '← 返回人生资本地图' : '← Back to Life Capital Map'} /></Link><p><LocaleLabel value={zh ? '更多场景将随着有价值的教育案例成熟后逐步加入。' : 'More scenarios will be added as useful educational cases are developed.'} /></p></footer></main>;
}
