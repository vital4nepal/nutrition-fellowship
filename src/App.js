import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SurveyDashboard from './components/SurveyDashboard';
import D4N from './components/D4N';
import Repository from './components/Repository';
import Events from './components/Events';
import EntryList from './components/EntryList';
import  Initiatives from './components/Initiatives';
import Thoughts from './components/Thoughts';
import ScrollToHash from './components/ScrollToHash';
import { Section, SiteLink, SubTitle, container, underlineLink } from './components/ui';
import ComingSoon from './components/ComingSoon';
import ChapterPage from './components/ChapterPage';
import { InitiativePage } from './components/InitiativePage';
import NotFound from './components/NotFound';
import ResourcesPage from './components/ResourcesPage';
import ResourcePage from './components/ResourcePage';
import EventPage from './components/EventPage';
import ExternalRedirect from './components/ExternalRedirect';
import { dashboard } from './data/resources';
import { email, emailHref, maintenance, socials } from './data/site';

const innerPages = [
  { path: '/profile', title: 'Nutrition Profile' },
  { path: '/policy2025', title: 'Policy 2025' },
  { path: '/aiinnutrition', title: 'Research on AI in nutrition' },
  { path: '/nfn2ndmeetblog', title: 'Nutrition Fellowship for Nepal: 2nd meet blog' },
  { path: '/nrcinternblog', title: 'Nutrition Rehabilitation Center: Internship blog' },
];

const upcomingEvents = [
  {
    title: 'Nutrition Data Camps',
    date: '2025-monthly',
    description: 'Nutrition data camps will be conducted every month among the students and professionals.',
  },
  {
    title: 'Orientation for students',
    date: '2025-monthly',
    description: 'Orientation programs on various technical skills will be conducted among the students.',
  },
];

const announcements = [
  {
    title: 'Nutrition Fellowship for Nepal: Second Meet',
    date: '01/17/2025',
    description: 'We are excited for the gathering of hearts and minds dedicated to transforming nutrition in Nepal!',
  },
];

const usefulLinks = [
  { href: '/nutrition-dashboard', label: 'Nutrition Dashboard' },
  { href: '/resources', label: 'Resources' },
  { href: 'http://www.nnfsp.gov.np/', label: 'Nepal Nutrition and Food Security Portal' },
];

// The body of every page except the home page. The skip link jumps to its id.
const Page = ({ padding = 'lg:py-16', children }) => (
  <main id="main" tabIndex={-1} className={`${container} py-12 outline-none ${padding}`}>{children}</main>
);

function App() {
  if (maintenance) {
    // The whole site while `maintenance` in src/data/site.js is true. Text and the contact email only.
    return (
      <main id="main" className="grid min-h-screen place-items-center bg-paper px-4 text-center">
        <div>
          <h1 className="font-serif text-display font-semibold text-green">Under maintenance</h1>
          <p className="mt-4 text-body text-muted">We are updating the site. Please check back soon.</p>
          <p className="mt-2 text-body text-muted">
            If you have any queries, please contact us at{' '}
            <a
              href={emailHref}
              className="font-semibold text-green underline underline-offset-4 decoration-green/40 transition-colors hover:decoration-green"
            >
              {email}
            </a>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <Router>
      <ScrollToHash />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-green focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <header
        data-section="topbar"
        className="sticky top-0 z-50 h-16 lg:h-[72px] bg-paper border-b border-line"
      >
        <div className={`${container} flex h-full items-center gap-4`}>
          <a href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-3">
            <img src="/nf-logo.png" alt="" className="h-11 lg:h-12 w-auto" />
            <span className="hidden font-serif text-base font-semibold text-green sm:block">Nutrition Fellowship</span>
            <span className="sr-only sm:hidden">Nutrition Fellowship</span>
          </a>

          <Navbar />
        </div>
      </header>

      <Routes>
        <Route path="/" element={
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <SurveyDashboard />
              <D4N />
              <Initiatives/>
              <Repository/>
              <Events/>
              <Section
                name="updates"
                bordered={false}
                padding="pb-12 lg:pb-16"
                className="grid gap-10 md:grid-cols-2 md:gap-8"
              >
                <EntryList heading="Upcoming Events" entries={upcomingEvents} />
                <EntryList heading="Announcements" entries={announcements} />
              </Section>
              <Thoughts/>
            </main>
        } />
        <Route path="/initiatives/:id" element={<Page><InitiativePage /></Page>} />
        <Route path="/chapters/:id" element={<Page><ChapterPage /></Page>} />
        <Route path="/resources" element={<Page><ResourcesPage /></Page>} />
        <Route path="/resources/:id" element={<Page><ResourcePage /></Page>} />
        <Route path="/events/:id" element={<Page><EventPage /></Page>} />
        <Route path="/nutrition-dashboard" element={<Page><ExternalRedirect title={dashboard.title} href={dashboard.href} /></Page>} />
        {innerPages.map(({ path, title }) => (
          <Route key={path} path={path} element={<Page><ComingSoon title={title} /></Page>} />
        ))}
        <Route path="*" element={<Page padding="lg:py-24"><NotFound /></Page>} />
      </Routes>

      <footer data-section="footer" className="bg-deep text-paper [--nf-green:theme(colors.paper)]">
        <div className={`${container} py-14`}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-10">
            <div className="md:col-span-2 lg:col-span-5">
              <img src="/nf-logo.png" alt="Nutrition Fellowship" className="h-16 w-auto" />
              <p className="mt-4 max-w-[60ch] text-ui">
                Nutrition Fellowship for Nepal aims to unite three generations of stakeholders
                from Nepal and around the world.
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-7">
              <SubTitle as="h2" tone="text-inherit">Useful Links</SubTitle>
              <ul className="mt-2">
                {usefulLinks.map((link) => (
                  <li key={link.href}>
                    <SiteLink href={link.href} className={`flex min-h-11 items-center text-meta ${underlineLink}`}>
                      {link.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <SubTitle as="h2" tone="text-inherit">Get in Touch</SubTitle>
              <div className="flex items-center mt-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center transition-colors border border-paper/30 hover:border-paper"
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 text-meta md:flex-row md:items-center md:justify-between md:gap-8">
            <p>
              Questions? Email us at{' '}
              <a href={emailHref} className={underlineLink}>
                {email}
              </a>
            </p>
            <p>
              Copyright © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
