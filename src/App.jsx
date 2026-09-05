import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import { servicePages } from './data/content'

const ServicePage = lazy(() => import('./components/ServicePage'))
const ContactPage = lazy(() => import('./components/ContactPage'))
const SurveyPage = lazy(() => import('./components/SurveyPage'))
const PlaceholderPage = lazy(() => import('./components/PlaceholderPage'))
const PillarPage = lazy(() => import('./components/PillarPage'))
const NotFound = lazy(() => import('./components/NotFound'))
const InsightsIndexPage = lazy(() => import('./components/InsightsIndexPage'))
const InsightArticlePage = lazy(() => import('./components/LocalizedInsightPage'))
const GlossaryIndexPage = lazy(() => import('./components/GlossaryIndexPage'))
const GlossaryTermPage = lazy(() => import('./components/GlossaryTermPage'))
const CapitalAssessmentPage = lazy(() => import('./components/CapitalAssessmentPage'))
const CapitalAssessmentResultPreviewPage = lazy(() => import('./components/CapitalAssessmentResultPreviewPage'))
const CapitalMapPage = lazy(() => import('./components/CapitalMapPage'))
const CapitalNodePage = lazy(() => import('./components/CapitalNodePage'))
const CapitalEventPage = lazy(() => import('./components/CapitalEventPage'))
const WellnessNodePage = lazy(() => import('./components/WellnessNodePage'))
const FoundationV2Page = lazy(() => import('./components/FoundationV2Page'))
const LongTermPlanningPage = lazy(() => import('./components/LongTermPlanningPage'))
const NsFederationPage = lazy(() => import('./components/NsFederationPage'))
const JourneyIndexPage = lazy(() => import('./components/JourneyIndexPage'))
const JourneyScenarioPage = lazy(() => import('./components/JourneyScenarioPage'))
const KnowledgePathPage = lazy(() => import('./components/KnowledgePathPage'))
const AboutSammiPage = lazy(() => import('./components/AboutSammiPage'))
const KnowledgeGuidePage = lazy(() => import('./components/KnowledgeGuidePage'))
const DecisionGuidePage = lazy(() => import('./components/DecisionGuidePage'))

// Shared page routes rendered under both the unprefixed (English) branch
// and the "/:locale" (zh / es / ko) branch, so every existing page and
// URL continues to resolve in every supported language.
const pageRoutes = [
  <Route key="index" index element={<HomePage />} />,
  <Route key="tax" path="tax" element={<ServicePage data={servicePages.tax} />} />,
  <Route key="keep-more" path="keep-more" element={<KnowledgePathPage pathId="keep-more" />} />,
  <Route key="build-for-tomorrow" path="build-for-tomorrow" element={<KnowledgePathPage pathId="build-for-tomorrow" />} />,
  <Route key="fund-their-future" path="fund-their-future" element={<KnowledgePathPage pathId="fund-their-future" />} />,
  <Route key="protect-the-plan" path="protect-the-plan" element={<KnowledgePathPage pathId="protect-the-plan" />} />,
  <Route key="knowledge-guide" path="guides/:guideId" element={<KnowledgeGuidePage />} />,
  <Route key="decision-job-change-401k" path="decisions/job-change-old-401k" element={<DecisionGuidePage />} />,
  <Route key="ins" path="ins" element={<ServicePage data={servicePages.ins} />} />,
  <Route key="health" path="health" element={<ServicePage data={servicePages.health} />} />,
  <Route key="contact" path="contact" element={<ContactPage />} />,
  <Route key="survey" path="survey" element={<SurveyPage />} />,
  <Route key="capital-assessment" path="capital-assessment" element={<CapitalAssessmentPage />} />,
  <Route key="foundation" path="foundation" element={<FoundationV2Page />} />,
  <Route key="capital-assessment-preview" path="capital-assessment-preview" element={<CapitalAssessmentResultPreviewPage />} />,
  <Route key="capital-map" path="capital-map" element={<CapitalMapPage />} />,
  <Route key="capital-map-wealth" path="capital-map/wealth" element={<CapitalMapPage view="wealth" />} />,
  <Route key="capital-map-wellness" path="capital-map/wellness" element={<CapitalMapPage view="wellness" />} />,
  <Route key="capital-map-events" path="capital-map/events" element={<CapitalMapPage view="events" />} />,
  <Route key="capital-map-long-term" path="capital-map/long-term" element={<LongTermPlanningPage />} />,
  <Route key="capital-map-journey" path="capital-map/journey" element={<JourneyIndexPage />} />,
  <Route key="capital-map-journey-scenario" path="capital-map/journey/:id" element={<JourneyScenarioPage />} />,
  <Route key="capital-map-node" path="capital-map/node/:id" element={<CapitalNodePage />} />,
  <Route key="capital-map-event" path="capital-map/event/:id" element={<CapitalEventPage />} />,
  <Route key="capital-map-wellness-node" path="capital-map/wellness/:id" element={<WellnessNodePage />} />,
  <Route key="ns-federation" path="ns-federation" element={<NsFederationPage />} />,
  <Route key="about" path="about" element={<AboutSammiPage />} />,
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
