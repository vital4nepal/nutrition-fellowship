import React from "react";
import { email, emailHref } from '../data/site';
import SocialLinks from './SocialLinks';
import { SiteLink, SubTitle, container, underlineLink } from './ui';

const usefulLinks = [
  { href: '/dashboard', label: 'Nutrition Dashboard' },
  { href: '/resources', label: 'Resources' },
  { href: 'http://www.nnfsp.gov.np/', label: 'Nepal Nutrition and Food Security Portal' },
];

function Footer() {
  return (
    <footer data-section="footer" className="bg-deep text-paper [--nf-green:theme(colors.paper)]">
      <div className={`${container} py-14`}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-10">
          <div className="md:col-span-2 lg:col-span-5">
            <img src="/nf-logo.png" alt="Nutrition Fellowship" className="h-16 w-auto" />
            <p className="mt-4 max-w-[60ch] text-ui">
              Nutrition Fellowship for Nepal aims to unite three generations of stakeholders
              from Nepal and around the world.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <SubTitle tone="text-inherit">Useful Links</SubTitle>
            <ul className="mt-2">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <SiteLink href={link.href} className={`flex min-h-11 items-center text-meta ${underlineLink}`}>
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <SubTitle tone="text-inherit">Get in Touch</SubTitle>
            <SocialLinks className="mt-2 gap-3" linkClassName="border border-paper/30 hover:border-paper" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 text-meta md:flex-row md:items-center md:justify-between md:gap-8">
          <p>
            Questions? Email us at{" "}
            <a href={emailHref} className={underlineLink}>
              {email}
            </a>
          </p>
          <p>
            Copyright © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
