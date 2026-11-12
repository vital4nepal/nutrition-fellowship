import { useEffect } from 'react';

// The whole site while `maintenance` in src/data/site.js is true. Text only.
// The server answers 200 here, so the noindex meta keeps a crawler from listing the placeholder.
const MaintenanceBanner = () => {
  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.append(robots);
    return () => robots.remove();
  }, []);

  return (
    <main id="main" className="grid min-h-screen place-items-center bg-paper px-4 text-center">
      <div>
        <h1 className="font-serif text-display font-semibold text-green">Under maintenance</h1>
        <p className="mt-4 text-body text-muted">We are updating the site. Please check back soon.</p>
      </div>
    </main>
  );
};

export default MaintenanceBanner;
