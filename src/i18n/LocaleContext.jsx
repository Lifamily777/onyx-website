import { createContext, useContext, useEffect, useMemo } from 'react'
import en from '../locales/en'
import zh from '../locales/zh'
import es from '../locales/es'
import ko from '../locales/ko'
import fr from '../locales/fr'
import de from '../locales/de'
import { DEFAULT_LOCALE, LOCALE_HTML_LANG, buildLocalePath } from './config'

const dictionaries = { en, zh, es, ko, fr, de }

const LocaleContext = createContext(null)

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LocaleProvider({ locale, children }) {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
  const fallbackDict = dictionaries[DEFAULT_LOCALE]

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale] || LOCALE_HTML_LANG[DEFAULT_LOCALE]
  }, [locale])

  const value = useMemo(() => {
    function t(path) {
      const value = getByPath(dict, path)
      if (value !== undefined) return value
      const fallbackValue = getByPath(fallbackDict, path)
      return fallbackValue !== undefined ? fallbackValue : path
    }
    function localePath(subpath) {
      return buildLocalePath(locale, subpath)
    }
    return { locale, t, localePath, dict }
  }, [locale, dict, fallbackDict])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}
