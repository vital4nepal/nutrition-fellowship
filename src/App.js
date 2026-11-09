import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
import { Section, container } from './components/ui';
import Profile from './documents/newsletter/Profile';
import Policy2025 from './documents/plans_and_policies/Policy2025';
import AIinNutrition from './documents/research/AIinNutrition';
import Jan17blog from './documents/blogs/Jan17blog';
import NRCintern from './documents/blogs/NRCintern';

const innerPages = [
  { path: '/profile', Page: Profile },
  { path: '/policy2025', Page: Policy2025 },
  { path: '/aiinnutrition', Page: AIinNutrition },
  { path: '/nfn2ndmeetblog', Page: Jan17blog },
  { path: '/nrcinternblog', Page: NRCintern },
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
        {innerPages.map(({ path, Page }) => (
          <Route key={path} path={path} element={<main className={`${container} py-12 lg:py-16`}><Page /></main>} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
