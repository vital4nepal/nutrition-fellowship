import React from 'react';
import { container } from './ui';

const Topbar = ({ children }) => {
  return (
    <header
      data-section="topbar"
      className="sticky top-0 z-50 h-16 lg:h-[72px] bg-paper border-b border-line"
    >
      <div className={`${container} flex h-full items-center gap-4`}>
        <a href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-3">
          <img src="/nf-logo-128.png" width="128" height="128" alt="" className="h-11 lg:h-12 w-auto" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-serif text-base font-semibold text-green">Nutrition Fellowship</span>
            <span className="block text-[0.75rem] text-muted">An initiative of SidArt Foundation</span>
          </span>
          <span className="sr-only sm:hidden">Nutrition Fellowship</span>
        </a>

        {children}
      </div>
    </header>
  );
};

export default Topbar;
