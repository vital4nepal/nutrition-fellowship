import { email, emailHref } from '../data/site';

// The whole site while `maintenance` in src/data/site.js is true. Text and the contact email only.
const MaintenanceBanner = () => (
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

export default MaintenanceBanner;
