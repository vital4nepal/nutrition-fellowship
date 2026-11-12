import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, textLink } from './ui';

/**
 * A site address that sends the visitor to another site.
 * A click inside the site lands here. A direct visit never does: the server redirects it, see public/_redirects.
 */
function ExternalRedirect({ title, href }) {
  usePageMeta(`${title} | ${SITE_TITLE}`, `Opens the ${title} of the ${SITE_TITLE} on another site.`);
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <>
      <SectionTitle as="h1">{title}</SectionTitle>
      <p className="mt-4 text-sub text-ink">Opening {title}.</p>
      <a href={href} className={`mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}>
        Open it now
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </>
  );
}

export default ExternalRedirect;
