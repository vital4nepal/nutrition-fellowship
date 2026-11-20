import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteUrl } from '../data/site';

export const SITE_TITLE = 'Nutrition Fellowship';

export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const headTag = (selector) => document.head.querySelector(selector);

/**
 * The tab title is "page | site" while the page shows, and the site name after.
 * An empty `page` leaves it alone.
 * With a `description`, the page also sets the description meta and the canonical link
 * of its route. index.html holds the home values, and the cleanup puts them back.
 * A page with no description, such as the 404 page, has no canonical address.
 */
export function useDocumentTitle(page, description) {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!page) {
            return undefined;
        }
        const meta = headTag('meta[name="description"]');
        const canonical = headTag('link[rel="canonical"]');
        const home = { description: meta.content, canonical: canonical.href };

        document.title = `${page} | ${SITE_TITLE}`;
        if (description) {
            meta.content = description;
            canonical.href = `${siteUrl}${pathname.replace(/\/$/, '')}`;
        }
        return () => {
            document.title = SITE_TITLE;
            meta.content = home.description;
            canonical.href = home.canonical;
        };
    }, [page, description, pathname]);
}

export const container = 'mx-auto max-w-content px-4 lg:px-6';
export const underlineLink = 'underline-offset-4 transition-colors hover:underline';
export const textLink = `${underlineLink} hover:text-green`;
// The one fill for a primary action: Register, Submit and the 404 home button.
export const primaryButton =
    'inline-flex min-h-11 items-center gap-2 bg-green px-6 font-semibold text-paper ' +
    'transition-colors hover:bg-deep';
// For a title inside a link row: the row carries `group`, so the whole row is the hover target.
export const groupTitleLink =
    'underline-offset-4 transition-colors group-hover:text-green group-hover:underline';
// The page h1 is one step above a section h2 on a phone. From lg both use the display size.
const titleSizes = {
    page: 'text-title lg:text-display',
    section: 'text-title-sm lg:text-display',
    sidebar: 'text-sub',
};

/** A site route opens without a reload. Any other address is an outside link. */
export function SiteLink({ href, children, ...props }) {
    return href.startsWith('/') ? (
        <Link to={href} {...props}>
            {children}
        </Link>
    ) : (
        <a href={href} {...props}>
            {children}
        </a>
    );
}

/**
 * A home page band: optional hairline on top, the page container inside,
 * and the data-section name the screenshots key on.
 */
export function Section({
    name,
    id,
    bordered = true,
    padding = 'py-12 lg:py-16',
    className = '',
    children,
}) {
    return (
        <section
            data-section={name}
            id={id}
            className={bordered ? 'border-t border-line' : undefined}
        >
            <div className={`${container} ${padding} ${className}`}>{children}</div>
        </section>
    );
}

export function SectionTitle({
    as: Tag = 'h2',
    size = Tag === 'h1' ? 'page' : 'section',
    children,
    className = '',
}) {
    return <Tag className={`${titleSizes[size]} text-green ${className}`}>{children}</Tag>;
}

export function SubTitle({ as: Tag = 'h3', tone = 'text-ink', children, className = '' }) {
    return <Tag className={`text-sub ${tone} ${className}`}>{children}</Tag>;
}
