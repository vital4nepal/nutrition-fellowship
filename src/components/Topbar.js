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
        <a href="/" className="flex min-h-11 min-w-11 shrink-0 items-center">
          <img src="/nutrition_logo_mark.png" alt="Nutrition Logo" className="h-12 lg:h-14 w-auto" />
        </a>

        {/* Before the nav in the DOM so the phone focus order is logo, Mail, Menu; lg:order-last restores the desktop layout. */}
        <div className="ml-auto lg:order-last lg:ml-0 flex items-center">
          <SocialLinks className="hidden lg:flex" linkClassName="text-ink hover:text-green" />
          <a
            href={emailHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={email}
            className="flex h-11 min-w-11 items-center justify-center gap-2 text-ink hover:text-green transition-colors"
          >
            <Mail size={20} />
            <span className="hidden xl:inline text-meta">{email}</span>
          </a>
        </div>

        {children}
      </div>
    </header>
  );
};

export default Topbar;
