import { useLocale } from '../i18n/LocaleContext'
import { translateLegacyText } from '../i18n/legacyPresentation'

// Explicit presentation boundary for legacy labels; never changes stored values.
export default function LocaleLabel({ value }) {
  const { locale } = useLocale()
  return translateLegacyText(value, locale)
}
