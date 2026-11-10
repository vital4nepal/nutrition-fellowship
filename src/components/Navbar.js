import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { navLinks as links } from '../data/site';

const sectionOf = (href) => href.split('#')[1];

// The updates block has no link of its own: it counts as the Events link.
const navIdOf = (element) => (element.dataset.section === 'updates' ? 'events' : element.id);

/** The id of the home page section that sits in the band under the header, or an empty string. */
function useActiveSection() {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => {
    if (pathname !== '/' || !('IntersectionObserver' in window)) {
      setActive('');
      return undefined;
    }
    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) inBand.add(target);
          else inBand.delete(target);
        });
        const last = [...inBand].pop();
        setActive(last ? navIdOf(last) : '');
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    const targets = links.map((link) => sectionOf(link.href) && document.getElementById(sectionOf(link.href)));
    [...targets, document.querySelector('[data-section="updates"]')].forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

// inline-block keeps the link underline from running under the badge.
const NewMark = () => (
  <>
    <span className="sr-only">, </span>
    <span className="ml-2 inline-block bg-meadow px-1.5 py-0.5 text-meta font-semibold leading-none text-deep">New</span>
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const active = useActiveSection();

  // The open menu owns the screen: Escape closes it and the page behind it stops scrolling.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      toggleRef.current.focus();
    };
    // The menu button disappears at the desktop width, so a rotated tablet must not stay locked.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (event) => {
      if (event.matches) setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeWhenFocusLeaves = (event) => {
    if (isOpen && !event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  };

  return (
    <nav
      data-section="nav"
      aria-label="Main"
      onBlur={closeWhenFocusLeaves}
      className="ml-auto lg:ml-0 lg:flex lg:flex-1 lg:justify-center"
    >
      <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={sectionOf(link.href) === active ? 'location' : undefined}
              className="whitespace-nowrap text-ui font-medium text-ink underline-offset-[6px] hover:text-green hover:underline aria-[current=location]:text-green aria-[current=location]:underline transition-colors"
            >
              {link.label}
              {link.isNew && <NewMark />}
            </a>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-label="Menu"
        className="lg:hidden flex h-11 w-11 items-center justify-center text-ink"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-x-0 bottom-0 top-[var(--nf-header-h)] bg-ink/20"
        />
      )}

      <ul
        id="main-menu"
        className={`${isOpen ? 'block' : 'hidden'} lg:hidden absolute top-full inset-x-0 max-h-[calc(100dvh-var(--nf-header-h))] overflow-y-auto bg-paper border-b border-line px-4`}
      >
        {links.map((link) => (
          <li key={link.href} className="border-t border-line">
            <a
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={sectionOf(link.href) === active ? 'location' : undefined}
              className="flex h-12 items-center text-body text-ink hover:text-green aria-[current=location]:font-semibold aria-[current=location]:text-green transition-colors"
            >
              {link.label}
              {link.isNew && <NewMark />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
