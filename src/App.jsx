import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import ServicePage from './components/ServicePage'
import ContactPage from './components/ContactPage'
import SurveyPage from './components/SurveyPage'
import PlaceholderPage from './components/PlaceholderPage'
import PillarPage from './components/PillarPage'
import NotFound from './components/NotFound'
import InsightsIndexPage from './components/InsightsIndexPage'
import InsightArticlePage from './components/InsightArticlePage'
import GlossaryIndexPage from './components/GlossaryIndexPage'
import GlossaryTermPage from './components/GlossaryTermPage'
import CapitalAssessmentPage from './components/CapitalAssessmentPage'
import CapitalAssessmentResultPreviewPage from './components/CapitalAssessmentResultPreviewPage'
import CapitalMapPage from './components/CapitalMapPage'
import CapitalNodePage from './components/CapitalNodePage'
import CapitalEventPage from './components/CapitalEventPage'
import WellnessNodePage from './components/WellnessNodePage'
import NsFederationPage from './components/NsFederationPage'
import { servicePages } from './data/content'

// Shared page routes rendered under both the unprefixed (English) branch
// and the "/:locale" (zh / es / ko) branch, so every existing page and
// URL continues to resolve in every supported language.
const pageRoutes = [
  <Route key="index" index element={<HomePage />} />,
  <Route key="tax" path="tax" element={<ServicePage data={servicePages.tax} />} />,
  <Route key="ins" path="ins" element={<ServicePage data={servicePages.ins} />} />,
  <Route key="health" path="health" element={<ServicePage data={servicePages.health} />} />,
  <Route key="contact" path="contact" element={<ContactPage />} />,
  <Route key="survey" path="survey" element={<SurveyPage />} />,
  <Route key="capital-assessment" path="capital-assessment" element={<CapitalAssessmentPage />} />,
  <Route key="capital-assessment-preview" path="capital-assessment-preview" element={<CapitalAssessmentResultPreviewPage />} />,
  <Route key="capital-map" path="capital-map" element={<CapitalMapPage />} />,
  <Route key="capital-map-wealth" path="capital-map/wealth" element={<CapitalMapPage view="wealth" />} />,
  <Route key="capital-map-wellness" path="capital-map/wellness" element={<CapitalMapPage view="wellness" />} />,
  <Route key="capital-map-events" path="capital-map/events" element={<CapitalMapPage view="events" />} />,
  <Route key="capital-map-node" path="capital-map/node/:id" element={<CapitalNodePage />} />,
  <Route key="capital-map-event" path="capital-map/event/:id" element={<CapitalEventPage />} />,
  <Route key="capital-map-wellness-node" path="capital-map/wellness/:id" element={<WellnessNodePage />} />,
  <Route key="ns-federation" path="ns-federation" element={<NsFederationPage />} />,
  <Route key="about" path="about" element={<PlaceholderPage pageKey="about" />} />,
  <Route key="insights" path="insights" element={<InsightsIndexPage />} />,
  <Route key="insight-detail" path="insights/:slug" element={<InsightArticlePage />} />,
  <Route key="glossary" path="glossary" element={<GlossaryIndexPage />} />,
  <Route key="glossary-detail" path="glossary/:slug" element={<GlossaryTermPage />} />,
  <Route key="wealth" path="wealth" element={<PillarPage pillarId="wealth" />} />,
  <Route key="wellness" path="wellness" element={<PillarPage pillarId="wellness" />} />,
  <Route key="intelligence" path="intelligence" element={<PillarPage pillarId="intelligence" />} />,
  <Route key="privacy" path="privacy" element={<PlaceholderPage pageKey="privacy" />} />,
  <Route key="terms" path="terms" element={<PlaceholderPage pageKey="terms" />} />,
  <Route key="disclosures" path="disclosures" element={<PlaceholderPage pageKey="disclosures" />} />,
  <Route key="not-found" path="*" element={<NotFound />} />,
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout forceLocale="en" />}>
        {pageRoutes}
      </Route>
      <Route path="/:locale" element={<Layout />}>
        {pageRoutes}
      </Route>
    </Routes>
  )
}
