import LocaleLabel from "./LocaleLabel";
import Localized from "./Localized";
import useDocumentMeta from '../hooks/useDocumentMeta';
import styles from './CapitalMap.module.css';
const NS_FEDERATION_EMBED_URL = import.meta.env.VITE_NS_FEDERATION_EMBED_URL || '';
export default function NsFederationPage() {
  useDocumentMeta('NS Federation | ONYX');
  return <main className={`${styles.shell} ${styles.nsShell} page-enter`}><header><p className={styles.eyebrow}><LocaleLabel value={"RESOURCE CONNECTION"} /></p><h1><LocaleLabel value={"NS Federation"} /></h1><p><Localized en={<>This space is prepared for an approved resource embed. No source has been invented or connected.</>} zh={<>此页面已为经批准的资源嵌入做好准备。目前未虚构或连接任何来源。</>} /></p></header>{NS_FEDERATION_EMBED_URL ? <iframe title="NS Federation" src={NS_FEDERATION_EMBED_URL} /> : <section><h2><LocaleLabel value={"Embed not configured"} /></h2><p><LocaleLabel value={"Set "} /><code><LocaleLabel value={"VITE_NS_FEDERATION_EMBED_URL"} /></code><LocaleLabel value={" at the isolated configuration point after the source is approved."} /></p></section>}</main>;
}
