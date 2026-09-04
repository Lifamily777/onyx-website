import { useLocale } from '../i18n/LocaleContext'

// Render only the requested locale; the other language never enters the DOM.
export default function Localized({ en, zh }) {
  const { locale } = useLocale()
  return locale === 'zh' ? zh : en
}
