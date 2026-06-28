import React, { useState } from 'react'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import ServicePage from './components/ServicePage'
import ContactPage from './components/ContactPage'
import SurveyPage from './components/SurveyPage'
import VideoModal from './components/VideoModal'
import { servicePages } from './data/content'

export default function App() {
  const [page, setPage] = useState('home')
  const [activeVideo, setActiveVideo] = useState(null)

  function openVideo(video) { setActiveVideo(video) }
  function closeVideo() { setActiveVideo(null) }

  function navigate(id) {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderPage() {
    if (page === 'home') {
      return (
        <HomePage
          setPage={navigate}
          openVideo={openVideo}
          servicePages={servicePages}
        />
      )
    }
    if (page === 'contact') {
      return <ContactPage />
    }
    if (page === 'survey') {
      return <SurveyPage setPage={navigate} />
    }
    if (servicePages[page]) {
      return (
        <ServicePage
          data={servicePages[page]}
          setPage={navigate}
          openVideo={openVideo}
        />
      )
    }
    return null
  }

  return (
    <>
      <Nav page={page} setPage={navigate} />
      {renderPage()}
      {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
    </>
  )
}
