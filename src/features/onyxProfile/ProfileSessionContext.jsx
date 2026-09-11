import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { answerFingerprint, clearStoredSession, emptySession, hasUnsavedProfile, readSession, writeSession } from './session'

const ProfileSessionContext = createContext(null)
function browserStorage() { try { return window.sessionStorage } catch { return null } }

export function ProfileSessionProvider({ children }) {
 const [initial] = useState(() => readSession(browserStorage()))
 const [session, setSession] = useState(initial.session)
 const [storageStatus, setStorageStatus] = useState(initial.status)
 const current = useRef(session)
 const unsaved = hasUnsavedProfile(session)
 // This provider is above all locale/page routes, so the warning also works from Learn/Insights.
 useEffect(() => {
  if (!unsaved) return
  const warn = event => { event.preventDefault(); event.returnValue = 'You have an unsaved ONYX Profile.' }
  window.addEventListener('beforeunload', warn)
  return () => window.removeEventListener('beforeunload', warn)
 }, [unsaved])
 function update(patch) {
  const next = { ...current.current, ...patch }
  current.current = next
  // Persist synchronously before navigation can unmount the profile page.
  setStorageStatus(writeSession(browserStorage(), next) ? 'ready' : 'unavailable')
  setSession(next)
 }
 function clear() {
  if (!clearStoredSession(browserStorage())) { setStorageStatus('unavailable'); return false }
  const next = emptySession()
  current.current = next
  setSession(next)
  setStorageStatus('ready')
  return true
 }
 return <ProfileSessionContext.Provider value={{ session, storageStatus, unsaved, update, clear, markSaved: () => update({ savedFingerprint: answerFingerprint(current.current.answers) }) }}>{children}</ProfileSessionContext.Provider>
}

export function useProfileSession() {
 const context = useContext(ProfileSessionContext)
 if (!context) throw new Error('ProfileSessionProvider is required')
 return context
}
