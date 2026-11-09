import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navLinks as links } from '../data/site';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      data-section="nav"
      aria-label="Main"
      className="order-last lg:order-none lg:flex lg:flex-1 lg:justify-center"
    >
      <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="whitespace-nowrap text-[15px] font-medium text-ink underline-offset-[6px] hover:text-green hover:underline transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-label="Menu"
        className="lg:hidden flex h-11 w-11 items-center justify-center text-ink hover:text-green transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
