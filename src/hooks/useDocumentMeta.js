import { useEffect } from 'react'
import { brandText } from '../i18n/brand'
import { useLocale } from '../i18n/LocaleContext'
import { translateLegacyText } from '../i18n/legacyPresentation'

export default function useDocumentMeta(title, description, options = {}) {
  const { locale } = useLocale()
  // A brand suffix is not a bilingual pair; keep the actual page title.
  const brandedTitle = title?.match(/^(.+?) · (ONYX.*|Onyx Wealth and Wellness)$/)
  title = brandedTitle
    ? `${translateLegacyText(brandedTitle[1], locale)} · ${brandText(brandedTitle[2])}`
    : title?.split(' | ').map(part => translateLegacyText(part, locale)).join(' | ')

  description = translateLegacyText(description, locale)
  title = brandText(title)
  if (title && !/ONYX WW|Onyx Wealth and Wellness/.test(title)) title += ' · ONYX WW'
  description = brandText(description)
  const { siteName = 'Onyx Wealth and Wellness', structuredData } = options
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : ''

  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }

    if (siteName) {
      let tag = document.querySelector('meta[property="og:site_name"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', 'og:site_name')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', siteName)
    }

    if (title) {
      let tag = document.querySelector('meta[property="og:title"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', 'og:title')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', title)
    }

    if (description) {
      let tag = document.querySelector('meta[property="og:description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', 'og:description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }

    if (!structuredDataJson) document.querySelector('script[data-onyx-website-schema]')?.remove()

    if (structuredDataJson) {
      let script = document.querySelector('script[data-onyx-website-schema]')
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-onyx-website-schema', '')
        document.head.appendChild(script)
      }
      script.textContent = structuredDataJson
    }
  }, [title, description, siteName, structuredDataJson])
}
