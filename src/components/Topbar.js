import React from 'react';
import { Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572729923914', icon: faFacebookF },
  { name: 'Instagram', href: 'https://www.instagram.com/nutfellowship/?hl=en', icon: faInstagram },
  { name: 'X', href: 'https://x.com/nutfellowship', icon: faXTwitter },
];

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
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nutfellowship@gmail.com"
            aria-label="nutfellowship@gmail.com"
            className="flex h-11 min-w-11 items-center justify-center gap-2 text-ink hover:text-green transition-colors"
          >
            <Mail size={20} />
            <span className="hidden xl:inline text-[15px]">nutfellowship@gmail.com</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
