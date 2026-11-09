import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socials } from '../data/site';

/** The three social marks as 44px icon links. The caller styles the link for its own background. */
export default function SocialLinks({ className = '', linkClassName = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`flex h-11 w-11 items-center justify-center transition-colors ${linkClassName}`}
        >
          <FontAwesomeIcon icon={social.icon} className="text-[18px]" />
        </a>
      ))}
    </div>
  );
}
