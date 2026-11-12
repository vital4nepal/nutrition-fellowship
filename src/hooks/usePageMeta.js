import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteUrl } from '../data/site';

// index.html holds the home values. A page replaces them on mount and the cleanup puts them back.
const head = (selector) => document.head.querySelector(selector);

/** Sets the title, the description and the canonical link of the current route. `title` is the full tab title. */
export default function usePageMeta(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = head('meta[name="description"]');
    const canonical = head('link[rel="canonical"]');
    const previous = {
      title: document.title,
      description: meta.content,
      canonical: canonical.href,
    };

    document.title = title;
    meta.content = description;
    canonical.href = `${siteUrl}${pathname.replace(/\/$/, '')}`;
    return () => {
      document.title = previous.title;
      meta.content = previous.description;
      canonical.href = previous.canonical;
    };
  }, [title, description, pathname]);
}
