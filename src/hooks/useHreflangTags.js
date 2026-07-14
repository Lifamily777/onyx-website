import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, buildLocalePath, parseLocaleFromPath } from '../i18n/config'

// Client-side hreflang injection. Limitation: this runs after JS executes, so
// crawlers that do not execute JavaScript will not see these tags — see the
// SEO limitations note in the implementation summary.
export default function useHreflangTags() {
  const location = useLocation()

  useEffect(() => {
    const { subpath } = parseLocaleFromPath(location.pathname)
    const origin = window.location.origin

    const tags = SUPPORTED_LOCALES.map((loc) => ({
      hreflang: loc === 'zh' ? 'zh-Hans' : loc,
      href: `${origin}${buildLocalePath(loc, subpath)}`,
    }))
    tags.push({ hreflang: 'x-default', href: `${origin}${buildLocalePath(DEFAULT_LOCALE, subpath)}` })

    const created = tags.map(({ hreflang, href }) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', hreflang)
      link.setAttribute('href', href)
      link.setAttribute('data-hreflang', 'true')
      document.head.appendChild(link)
      return link
    })

    return () => {
      created.forEach((el) => el.remove())
    }
  }, [location.pathname])
}
