import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SurveyDashboard from './components/SurveyDashboard';
import D4N from './components/D4N';
import CountryChapter from './components/CountryChapter';
import Repository from './components/Repository';
import Events from './components/Events';
import NextEvent from './components/NextEvent';
import Announcements from './components/Announcements';
import  Initiatives from './components/Initiatives';
import Thoughts from './components/Thoughts';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import { Section, container } from './components/ui';
import ComingSoon from './components/ComingSoon';
import { ChapterPage, InitiativePage } from './components/InitiativePage';
import NotFound from './components/NotFound';
import ResourcesPage from './components/ResourcesPage';
import ResourcePage from './components/ResourcePage';
import EventPage from './components/EventPage';
import ExternalRedirect from './components/ExternalRedirect';
import { dashboard } from './data/resources';

const innerPages = [
  { path: '/profile', title: 'Nutrition Profile' },
  { path: '/policy2025', title: 'Policy 2025' },
  { path: '/aiinnutrition', title: 'Research on AI in nutrition' },
  { path: '/nfn2ndmeetblog', title: 'Nutrition Fellowship for Nepal: 2nd meet blog' },
  { path: '/nrcinternblog', title: 'Nutrition Rehabilitation Center: Internship blog' },
];

function App() {
  return (
    <Router>
      <ScrollToHash />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-green focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Topbar><Navbar /></Topbar>

      <Routes>
        <Route path="/" element={
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <SurveyDashboard />
              <D4N />
              <Initiatives/>
              <CountryChapter />
              <Repository/>
              <Events/>
              <Section
                name="updates"
                bordered={false}
                padding="pb-12 lg:pb-16"
                className="grid gap-10 md:grid-cols-2 md:gap-8"
              >
                <NextEvent /><Announcements />
              </Section>
              <Thoughts/>
            </main>
        } />
        <Route path="/initiatives/:id" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><InitiativePage /></main>} />
        <Route path="/chapters/:id" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ChapterPage /></main>} />
        <Route path="/resources" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ResourcesPage /></main>} />
        <Route path="/resources/:id" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ResourcePage /></main>} />
        <Route path="/events/:id" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><EventPage /></main>} />
        <Route path="/nutrition-dashboard" element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ExternalRedirect title={dashboard.title} href={dashboard.href} /></main>} />
        {innerPages.map(({ path, title }) => (
          <Route key={path} path={path} element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ComingSoon title={title} /></main>} />
        ))}
        <Route path="*" element={
          <main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-24`}>
            <NotFound />
          </main>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
