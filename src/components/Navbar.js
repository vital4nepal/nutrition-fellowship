import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navLinks as links } from '../data/site';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

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
              className="whitespace-nowrap text-ui font-medium text-ink underline-offset-[6px] hover:text-green hover:underline transition-colors"
            >
              {link.label}
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
        className={`${isOpen ? 'block' : 'hidden'} lg:hidden absolute top-full inset-x-0 bg-paper border-b border-line px-4`}
      >
        {links.map((link) => (
          <li key={link.href} className="border-t border-line">
            <a
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex h-12 items-center text-body text-ink hover:text-green transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
