import React from 'react';
import { Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socials, email, emailHref } from '../data/site';

const Topbar = ({ children }) => {
  return (
    <header
      data-section="topbar"
      className="sticky top-0 z-50 h-16 lg:h-[72px] bg-paper border-b border-line"
    >
      <div className="mx-auto flex h-full max-w-content items-center gap-4 px-4 lg:px-6">
        <a href="/" className="shrink-0">
          <img src="/nutrition_logo333.png" alt="Nutrition Logo" className="h-10 lg:h-12 w-auto" />
        </a>

        {children}

        <div className="ml-auto lg:ml-0 flex items-center">
          <div className="hidden lg:flex items-center">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-11 w-11 items-center justify-center text-ink hover:text-green transition-colors"
              >
                <FontAwesomeIcon icon={social.icon} className="text-[18px]" />
              </a>
            ))}
          </div>
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
