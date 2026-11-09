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
import Profile from './documents/newsletter/Profile';
import Policy2025 from './documents/plans_and_policies/Policy2025';
import AIinNutrition from './documents/research/AIinNutrition';
import Jan17blog from './documents/blogs/Jan17blog';
import NRCintern from './documents/blogs/NRCintern';

function App() {
  return (
    <Router>
      <Topbar><Navbar /></Topbar>

      <Routes>
        <Route path="/" element={
          <>
            <main>
              <section data-section="hero" className="mx-auto max-w-content px-4 pt-6 pb-12 lg:px-6 lg:pt-8 lg:pb-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8"><CoverpageLeft /></div>
                <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8"><CoverpageRight /></div>
              </section>
              <Initiatives/>
              <Repository/>
              <Events/>
              <section data-section="updates" className="mx-auto max-w-content px-4 pb-12 lg:px-6 lg:pb-16 grid gap-10 md:grid-cols-2 md:gap-12">
                <NextEvent /><Announcements />
              </section>
              <Thoughts/>
            </main>
            <Footer/>
          </>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path='/policy2025' element={<Policy2025/>} />
        <Route path='/aiinnutrition' element={<AIinNutrition/>} />
        <Route path='/nfn2ndmeetblog' element={<Jan17blog/>} />
        <Route path='/nrcinternblog' element={<NRCintern/>} />
      </Routes>
    </Router>
  );
}

export default App;
