import { buildCapitalProfile, profileSections } from './schema.js'

export const PROFILE_STORAGE_KEY = 'onyx.profile.session.v1'
export const emptySession = () => ({ version: 1, answers: {}, step: -1, savedFingerprint: null })
export const answerFingerprint = answers => JSON.stringify(buildCapitalProfile(answers))
export const hasWorkingProfile = session => session.step >= 0 || Object.values(session.answers).some(value => Array.isArray(value) ? value.length : Boolean(value))
export const hasUnsavedProfile = session => hasWorkingProfile(session) && session.savedFingerprint !== answerFingerprint(session.answers)

export function normalizeSession(value) {
 if (!value || value.version !== 1 || !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers) || !Number.isInteger(value.step) || value.step < -1 || value.step > profileSections.length) throw new Error('Invalid profile cache')
 const answers = buildCapitalProfile(value.answers)
 const fingerprint = answerFingerprint(answers)
 return { version: 1, answers, step: value.step, savedFingerprint: value.savedFingerprint === fingerprint ? fingerprint : null }
}

export function readSession(storage) {
 try {
  const raw = storage.getItem(PROFILE_STORAGE_KEY)
  if (!raw) return { session: emptySession(), status: 'ready' }
  try { return { session: normalizeSession(JSON.parse(raw)), status: 'ready' } }
  catch {
   storage.removeItem(PROFILE_STORAGE_KEY)
   return { session: emptySession(), status: 'invalid' }
  }
 } catch { return { session: emptySession(), status: 'unavailable' } }
}

export function writeSession(storage, session) {
 try {
  const normalized = normalizeSession(session)
  // Summary contains only the same canonical answer IDs, never translated strings or scores.
  const summary = normalized.step === profileSections.length ? buildCapitalProfile(normalized.answers) : null
  storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ ...normalized, summary }))
  return true
 } catch { return false }
}

export function clearStoredSession(storage) {
 try { storage.removeItem(PROFILE_STORAGE_KEY); return true } catch { return false }
}
