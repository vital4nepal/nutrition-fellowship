import React from 'react';
import { Mail } from 'lucide-react';
import { email, emailHref } from '../data/site';
import SocialLinks from './SocialLinks';
import { container } from './ui';

const Topbar = ({ children }) => {
  return (
    <header
      data-section="topbar"
      className="sticky top-0 z-50 h-16 lg:h-[72px] bg-paper border-b border-line"
    >
      <div className={`${container} flex h-full items-center gap-4`}>
        <a href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-3">
          <img src="/nf-logo.png" alt="" className="h-11 lg:h-12 w-auto" />
          <span className="hidden leading-tight sm:block lg:hidden xl:block">
            <span className="block font-serif text-base font-semibold text-green">Nutrition Fellowship</span>
            <span className="block text-[0.75rem] text-muted">An initiative of SidArt Foundation</span>
          </span>
          <span className="sr-only sm:hidden lg:inline xl:hidden">Nutrition Fellowship</span>
        </a>

        {children}

        <div className="flex items-center">
          <SocialLinks className="hidden lg:flex" linkClassName="text-ink hover:text-green" />
          <a
            href={emailHref}
            aria-label={email}
            className="flex h-11 min-w-11 items-center justify-center gap-2 text-ink hover:text-green transition-colors"
          >
            <Mail size={20} />
            <span className="hidden xl:inline text-meta">{email}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
