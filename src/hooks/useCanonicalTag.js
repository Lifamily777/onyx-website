import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Self-referencing canonical tag for the current path — pairs with the
// hreflang tags to tell search engines each locale is its own canonical
// page, not a duplicate. Same client-side-injection limitation as hreflang:
// invisible to crawlers that don't execute JavaScript.
export default function useCanonicalTag() {
  const location = useLocation()

  useEffect(() => {
    const href = `${window.location.origin}${location.pathname}`
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }, [location.pathname])
}
