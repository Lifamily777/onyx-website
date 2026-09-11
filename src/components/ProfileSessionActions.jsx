import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import { useProfileSession } from '../features/onyxProfile/ProfileSessionContext'
import { hasWorkingProfile } from '../features/onyxProfile/session'
import { storageNotice } from '../features/onyxProfile/copy'
import styles from './PhaseOne.module.css'

export default function ProfileSessionActions() {
 const { locale } = useLocale()
 const zh = locale === 'zh'
 const { session, storageStatus, unsaved, clear, markSaved } = useProfileSession()
 const [dialog, setDialog] = useState(null)
 const [busy, setBusy] = useState(false)
 const [error, setError] = useState('')
 const [notice, setNotice] = useState('')
 const ref = useRef(null)
 useEffect(() => { if (dialog) ref.current?.showModal(); else ref.current?.close() }, [dialog])
 function open(mode) { setError(''); setDialog({ mode, downloaded: false }) }
 async function save(mode) {
  setBusy(true); setError('')
  try {
   const { downloadProfilePdf } = await import('../features/onyxProfile/pdf')
   await downloadProfilePdf(session.answers, locale)
   setDialog({ mode, downloaded: true })
  } catch { setError(zh ? 'PDF 未能生成。概况仍然保留，请重试。' : 'The PDF could not be generated. Your profile is still preserved. Please try again.') }
  finally { setBusy(false) }
 }
 function confirmClear() {
  if (!clear()) { setError(zh ? '浏览器阻止了清除存储。资料尚未确认清除，请检查浏览器设置后重试。' : 'The browser blocked clearing storage. Your data has not been confirmed cleared. Check browser settings and retry.'); return }
  setDialog(null)
  setNotice(zh ? '概况已清除，会话已结束。' : 'Your profile is cleared and the session has ended.')
 }
 const working = hasWorkingProfile(session)
 return <section className={styles.session} aria-label={zh ? '概况工作会话' : 'Profile working session'}>
  <p>{storageNotice[zh ? 'zh' : 'en']}</p>
  {storageStatus !== 'ready' && <p role="alert">{storageStatus === 'invalid' ? (zh ? '旧缓存无法恢复，已安全清除。' : 'The previous cache could not be restored and was safely removed.') : (zh ? '临时存储不可用。本次站内导航仍会保留资料，但刷新或关闭可能丢失，请保存 PDF。' : 'Temporary storage is unavailable. In-app navigation still keeps this working profile, but refreshing or closing may lose it. Save a PDF.')}</p>}
  {working && <>
   <p>{unsaved ? (zh ? '当前概况尚未确认为已保存 PDF。浏览器离开警告可能出现，但并非始终可用。' : 'A PDF copy of the current profile has not been confirmed saved. Your browser may show a leave warning, but this is not always available.') : (zh ? '您已确认保存当前概况的 PDF。新的答案修改将需要新快照。' : 'You confirmed saving a PDF of the current answers. New edits will need a new snapshot.')}</p>
   <div className={styles.actions}>
    <button className={styles.button} onClick={() => { open('save'); save('save') }}>{zh ? '将我的概况保存为 PDF' : 'Save My Profile as PDF'}</button>
    <button className={`${styles.button} ${styles.secondary}`} onClick={() => open('clear')}>{zh ? '清除我的概况' : 'Clear My Profile'}</button>
    <button className={`${styles.button} ${styles.secondary}`} onClick={() => open('end')}>{zh ? '结束会话' : 'End Session'}</button>
   </div>
  </>}
  {notice && !working && <p role="status">{notice}</p>}
  <dialog ref={ref} className={styles.dialog} aria-labelledby="profile-dialog-title" onCancel={event => { event.preventDefault(); if (!busy) setDialog(null) }}>
   <h2 id="profile-dialog-title">{dialog?.mode === 'end' ? (zh ? '结束概况会话' : 'End profile session') : dialog?.mode === 'save' ? (zh ? '保存个人 PDF 快照' : 'Save a personal PDF snapshot') : (zh ? '清除我的概况' : 'Clear My Profile')}</h2>
   {dialog?.downloaded ? <p>{zh ? 'PDF 下载已发起。请确认文件已保存且可打开，再继续。浏览器无法替您确认下载是否完成。' : 'The PDF download was started. Confirm the file is saved and opens correctly before continuing. The browser cannot confirm download completion for you.'}</p> : <p>{dialog?.mode === 'save' ? (zh ? 'PDF 在此设备本地生成。您的概况不会上传。' : 'The PDF is generated on this device. Your profile is not uploaded.') : (zh ? '您有一份正在填写的 ONYX 概况。清除前，是否希望保存一份 PDF？' : 'You have an ONYX Profile in progress. Would you like to save a PDF copy before clearing it?')}</p>}
   {error && <p role="alert">{error}</p>}
   {busy && <p role="status">{zh ? '正在本地生成 PDF…' : 'Generating PDF locally…'}</p>}
   <div className={styles.actions}>
    {dialog?.downloaded ? <button className={styles.button} disabled={busy} onClick={() => { if (dialog.mode === 'save') { markSaved(); setDialog(null) } else confirmClear() }}>{dialog.mode === 'save' ? (zh ? '我已保存 PDF' : 'I have saved my PDF') : (zh ? '我已保存 PDF，确认清除' : 'I saved my PDF — confirm clearing')}</button> : <button className={styles.button} disabled={busy} onClick={() => save(dialog.mode)}>{dialog?.mode === 'end' ? (zh ? '保存 PDF 并结束' : 'Save PDF and End Session') : dialog?.mode === 'clear' ? (zh ? '保存 PDF 并清除' : 'Save PDF and Clear') : (zh ? '生成 PDF' : 'Generate PDF')}</button>}
    {dialog?.mode !== 'save' && !dialog?.downloaded && <button className={`${styles.button} ${styles.secondary}`} disabled={busy} onClick={confirmClear}>{dialog?.mode === 'end' ? (zh ? '不保存并结束' : 'End Without Saving') : (zh ? '不保存并清除' : 'Clear Without Saving')}</button>}
    <button className={`${styles.button} ${styles.secondary}`} disabled={busy} onClick={() => setDialog(null)}>{zh ? '取消' : 'Cancel'}</button>
   </div>
  </dialog>
 </section>
}
