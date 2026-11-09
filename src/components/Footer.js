import React from "react";
import { email, emailHref } from '../data/site';
import SocialLinks from './SocialLinks';
import { container, underlineLink } from './ui';

const usefulLinks = [
  { href: 'https://nutrition-dashboard-vision.vercel.app/', label: 'Nutrition Dashboard' },
  { href: 'http://www.nnfsp.gov.np/', label: 'Nepal Nutrition and Food Security Portal' },
];

function Footer() {
  return (
    <footer data-section="footer" className="bg-deep text-paper [--nf-green:theme(colors.paper)]">
      <div className={`${container} py-14`}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-10">
          <div className="md:col-span-2 lg:col-span-5">
            <div className="inline-block bg-paper p-2">
              <img src="/nutrition_logo_mark.png" alt="Company Logo" className="h-16 w-auto" />
            </div>
            <p className="mt-4 max-w-[60ch] text-ui">
              Nutrition Fellowship for Nepal aims to unite three generations of stakeholders
              from Nepal and around the world.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-xl">Useful Links</h3>
            <ul className="mt-2">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`flex min-h-11 items-center text-meta ${underlineLink}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xl">Get in Touch</h3>
            <SocialLinks className="mt-2 gap-3" linkClassName="border border-paper/30 hover:border-paper" />
          </div>
        </div>

        <div className="mt-10 border-t border-paper/20 pt-6 text-meta">
          <p>
            If you have any queries, feel free to email us at:{" "}
            <a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className={underlineLink}
            >
              {email}
            </a>
          </p>
          <p className="mt-2">
            Copyright © {new Date().getFullYear()} All Rights Reserved{" "}
            <a href="/" className={underlineLink}>NutritionFellowshipForNepal</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
