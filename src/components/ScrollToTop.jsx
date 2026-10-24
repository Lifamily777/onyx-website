import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }, [pathname, hash])

  return null
}
