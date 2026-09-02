import { localized } from '../features/journeyEngine'
import styles from './JourneyEngine.module.css'

export default function JourneyConsequencePath({ paths, locale }) {
  return <div className={styles.consequenceGrid}>{paths.map((path)=><section key={path.id} className={styles.consequencePath}><h3>{localized(path.label,locale)}</h3><ol>{path.steps.map((step,index)=><li key={`${path.id}-${index}`}><span>{localized(step,locale)}</span>{index<path.steps.length-1&&<b aria-hidden="true">↓</b>}</li>)}</ol></section>)}</div>
}
