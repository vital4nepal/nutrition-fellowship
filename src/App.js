import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import CoverpageLeft from './components/CoverpageLeft';
import CoverpageRight from './components/CoverpageRight';
import Repository from './components/Repository';
import Events from './components/Events';
import NextEvent from './components/NextEvent';
import Announcements from './components/Announcements';
import  Initiatives from './components/Initiatives';
import Thoughts from './components/Thoughts';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import { Section, container, textLink } from './components/ui';
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
      <Topbar><Navbar /></Topbar>

      <Routes>
        <Route path="/" element={
            <main>
              <Section
                name="hero"
                bordered={false}
                padding="pb-12 pt-6 lg:pb-16 lg:pt-8"
                className="grid gap-10 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-8"><CoverpageLeft /></div>
                <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8"><CoverpageRight /></div>
              </Section>
              <Initiatives/>
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
          <Route key={path} path={path} element={<main className={`${container} py-12 lg:py-16`}><ComingSoon title={title} /></main>} />
        ))}
        <Route path="*" element={
          <main className={`${container} py-12 lg:py-16`}>
            <ComingSoon title="Page not found">
              This page does not exist. <Link to="/" className={`text-green ${textLink}`}>Go to the home page</Link>.
            </ComingSoon>
          </main>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
