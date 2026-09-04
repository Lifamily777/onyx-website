import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import VideoModal from './VideoModal'
import ScrollToTop from './ScrollToTop'
import NotFound from './NotFound'
import { LocaleProvider } from '../i18n/LocaleContext'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../i18n/config'
import useHreflangTags from '../hooks/useHreflangTags'
import useCanonicalTag from '../hooks/useCanonicalTag'
import ReadingNavigator from './ReadingNavigator'
import readingStyles from './ReadingNavigator.module.css'

export default function Layout({ forceLocale }) {
  const params = useParams()
  const rawLocale = forceLocale || params.locale
  const isValidLocale = !forceLocale ? SUPPORTED_LOCALES.includes(rawLocale) : true
  const locale = isValidLocale ? rawLocale : DEFAULT_LOCALE

  const [activeVideo, setActiveVideo] = useState(null)

  function openVideo(video) { setActiveVideo(video) }
  function closeVideo() { setActiveVideo(null) }

  return (
    <LocaleProvider locale={locale}>
      <LayoutBody
        isValidLocale={isValidLocale}
        activeVideo={activeVideo}
        openVideo={openVideo}
        closeVideo={closeVideo}
      />
    </LocaleProvider>
  )
}

function LayoutBody({ isValidLocale, activeVideo, openVideo, closeVideo }) {
  useHreflangTags()
  useCanonicalTag()

  return (
    <>
      <ScrollToTop />
      <Nav />
      <div className={readingStyles.frame}>
        <div className={readingStyles.content}>{isValidLocale ? <Outlet context={{ openVideo }} /> : <NotFound />}</div>
        {isValidLocale && <ReadingNavigator />}
      </div>
      <Footer />
      {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
    </>
  )
}
