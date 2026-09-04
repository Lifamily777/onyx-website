export const DEFAULT_LOCALE = 'en'

export const SUPPORTED_LOCALES = ['en', 'zh']

export const LOCALE_LABELS = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ko: '한국어',
  fr: 'Français',
  de: 'Deutsch',
}

// BCP-47 tags for the <html lang> attribute.
export const LOCALE_HTML_LANG = {
  en: 'en',
  zh: 'zh-Hans',
  es: 'es',
  ko: 'ko',
  fr: 'fr',
  de: 'de',
}

// Given any pathname, returns { locale, subpath } — subpath always starts with "/".
export function parseLocaleFromPath(pathname) {
  const match = pathname.match(/^\/(zh)(\/.*)?$/)
  if (match) {
    return { locale: match[1], subpath: match[2] || '/' }
  }
  return { locale: DEFAULT_LOCALE, subpath: pathname || '/' }
}

// Builds a path for `subpath` in the given locale (English has no prefix).
export function buildLocalePath(locale, subpath = '/') {
  const clean = subpath.startsWith('/') ? subpath : `/${subpath}`
  if (locale === DEFAULT_LOCALE || !SUPPORTED_LOCALES.includes(locale)) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
