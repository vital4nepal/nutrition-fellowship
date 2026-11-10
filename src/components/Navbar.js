import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

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
        // Two targets can sit side by side in the hero. The one the address names wins, so a clicked link stays current.
        const named = [...inBand].find((element) => element.id === window.location.hash.slice(1));
        const chosen = named ?? [...inBand].pop();
        setActive(chosen ? navIdOf(chosen) : '');
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    const targets = links
      .map((link) => sectionOf(link.href) && document.getElementById(sectionOf(link.href)))
      .filter(Boolean);
    [...targets, document.querySelector('[data-section="updates"]')].forEach((element) => {
      if (element) observer.observe(element);
    });
    // The observer fires only when a target enters or leaves the band. A click on a link that is already in it does not.
    const onHashChange = () => {
      const named = targets.find((element) => element.id === window.location.hash.slice(1));
      if (named) setActive(navIdOf(named));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [pathname]);

  return active;
}

const desktopLink =
  'whitespace-nowrap text-ui font-medium text-ink underline-offset-[6px] hover:text-green hover:underline aria-[current=location]:text-green aria-[current=location]:underline transition-colors';

/**
 * One link inside a nav menu. A route opens without a reload and is current on its own page.
 * A section anchor is current while its section sits in the band under the header.
 */
function ChildLink({ child, active, className, onClick }) {
  const { pathname } = useLocation();
  const route = !child.href.includes('#');
  const current = route
    ? pathname === child.href && 'page'
    : sectionOf(child.href) === active && 'location';
  const props = { onClick, className, 'aria-current': current || undefined };
  return route ? <Link to={child.href} {...props}>{child.label}</Link> : <a href={child.href} {...props}>{child.label}</a>;
}

/** A desktop nav item that opens a list of links. Click, Enter or Space opens it; Escape and a click outside close it. */
function MenuItem({ link, active }) {
  const { pathname } = useLocation();
  const current = sectionOf(link.href) === active || link.children.some((child) => child.href === pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!ref.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      ref.current.querySelector('button').focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`menu-${sectionOf(link.href)}`}
        aria-current={current ? 'location' : undefined}
        onClick={() => setOpen(!open)}
        className={`flex h-11 items-center gap-1 ${desktopLink}`}
      >
        {link.label}
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul
        id={`menu-${sectionOf(link.href)}`}
        className={`${open ? 'block' : 'hidden'} absolute left-1/2 top-full z-10 mt-2 min-w-[12rem] -translate-x-1/2 animate-menu border border-line bg-paper py-1`}
      >
        {link.children.map((child) => (
          <li key={child.id}>
            <ChildLink
              child={child}
              active={active}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center px-4 text-ui text-ink transition-colors hover:bg-surface hover:text-green aria-[current]:font-semibold aria-[current]:text-green"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      className="ml-auto lg:flex lg:flex-1 lg:justify-end"
    >
      <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
        {links.map((link) => (
          <li key={link.href}>
            {link.children ? (
              <MenuItem link={link} active={active} />
            ) : (
              <a
                href={link.href}
                aria-current={sectionOf(link.href) === active ? 'location' : undefined}
                className={`flex h-11 items-center ${desktopLink}`}
              >
                {link.label}
              </a>
            )}
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
            {link.children ? (
              <>
                <span className="flex h-12 items-center text-body text-muted">{link.label}</span>
                <ul className="pb-2 pl-4">
                  {link.children.map((child) => (
                    <li key={child.id}>
                      <ChildLink
                        child={child}
                        active={active}
                        onClick={() => setIsOpen(false)}
                        className="flex h-11 items-center text-body text-ink transition-colors hover:text-green aria-[current]:font-semibold aria-[current]:text-green"
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={sectionOf(link.href) === active ? 'location' : undefined}
                className="flex h-12 items-center text-body text-ink hover:text-green aria-[current=location]:font-semibold aria-[current=location]:text-green transition-colors"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
