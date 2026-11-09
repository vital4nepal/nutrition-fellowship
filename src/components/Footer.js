import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socials, email, emailHref } from '../data/site';

const usefulLinks = [
  { href: 'https://nutrition-dashboard-vision.vercel.app/', label: 'Nutrition Dashboard' },
  { href: 'http://www.nnfsp.gov.np/', label: 'Nepal Nutrition and Food Security Portal' },
];

const linkClass = "underline-offset-4 hover:underline transition-colors";

function Footer() {
  return (
    <footer data-section="footer" className="bg-deep text-paper [--nf-green:theme(colors.paper)]">
      <div className="mx-auto max-w-content px-4 py-14 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <img src="/Nutrition_logo33.png" alt="Company Logo" className="h-[72px] w-auto" />
            <p className="mt-4 text-[15px] max-w-[60ch]">
              Nutrition Fellowship for Nepal aims to unite three generations of stakeholders
              from Nepal and around the world.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-xl">Useful Links</h3>
            <ul className="mt-2">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`flex min-h-11 items-center text-meta ${linkClass}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xl">Get in Touch</h3>
            <div className="mt-2 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center border border-paper/30 hover:border-paper transition-colors"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-paper/20 pt-6 text-meta">
          <p>
            If you have any queries, feel free to email us at:{" "}
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {email}
            </a>
          </p>
          <p className="mt-2">
            Copyright © {new Date().getFullYear()} All Rights Reserved{" "}
            <a href="/" className={linkClass}>NutritionFellowshipForNepal</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
