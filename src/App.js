import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import CoverpageLeft from './components/CoverpageLeft';
import CoverpageRight from './components/CoverpageRight';
import ProgramCards from './components/ProgramCards';
import LiveDashboard from './components/LiveDashboard';
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
              <Section
                name="hero"
                bordered={false}
                padding="pb-12 pt-6 lg:pb-16 lg:pt-8"
                className="grid gap-10 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-8"><CoverpageLeft /></div>
                <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8"><ProgramCards /></div>
              </Section>
              <LiveDashboard />
              <Initiatives/>
              <Section name="highlights" id="highlights"><CoverpageRight /></Section>
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
        {innerPages.map(({ path, title }) => (
          <Route key={path} path={path} element={<main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}><ComingSoon title={title} /></main>} />
        ))}
        <Route path="*" element={
          <main id="main" tabIndex={-1} className={`${container} py-12 outline-none lg:py-16`}>
            <ComingSoon title="Page not found">This page does not exist.</ComingSoon>
          </main>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
