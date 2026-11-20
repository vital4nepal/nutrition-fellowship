import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { events, longDate } from '../data/events';
import { resources } from '../data/resources';
import NotFound from './NotFound';
import PhotoCarousel from './PhotoCarousel';
import { PhotoSlideshow } from './Slideshow';
import {
    SectionTitle,
    SiteLink,
    SubTitle,
    groupTitleLink,
    textLink,
    useDocumentTitle,
} from './ui';

const link = 'inline-flex min-h-11 items-center gap-2 font-semibold text-green ' + textLink;

/**
 * The documents as cards.
 * On its own the list is a section with a rule above it and up to three cards a row.
 * `beside` is for a list in a side column next to photos:
 * no rule, and one card a row on a wide screen.
 */
export function DocumentList({ documents, beside = false }) {
    return (
        <section
            className={beside ? undefined : 'mt-16 border-t border-line pt-10'}
            aria-label="Documents"
        >
            <SectionTitle as="h2" size="sidebar" className="lg:text-title-sm">
                Documents
            </SectionTitle>
            <ul
                className={
                    'nf-stagger grid gap-4 sm:grid-cols-2 ' +
                    (beside ? 'mt-4 lg:grid-cols-1' : 'mt-6 lg:grid-cols-3')
                }
            >
                {documents.map(({ title: name, description, file, kind, size }) => (
                    <li key={file}>
                        <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                                'group flex h-full flex-col border border-line bg-surface p-5 ' +
                                'transition-colors hover:border-green'
                            }
                        >
                            <span
                                className={
                                    'text-base font-semibold text-ink lg:text-body ' +
                                    groupTitleLink
                                }
                            >
                                {name}
                            </span>
                            <span className="mt-2 text-meta text-muted">{description}</span>
                            <span
                                className={
                                    'mt-auto flex items-center justify-between gap-3 pt-5 ' +
                                    'text-meta tabular-nums text-muted'
                                }
                            >
                                {kind}, {size}
                                {/* A browser shows a PDF in the tab and saves any other file. */}
                                {kind === 'PDF' ? (
                                    <ArrowUpRight
                                        size={20}
                                        aria-hidden="true"
                                        className="text-green"
                                    />
                                ) : (
                                    <Download size={20} aria-hidden="true" className="text-green" />
                                )}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/**
 * The page of one resource folder or one event:
 * images in a carousel, a summary beside it, then the documents as cards.
 * With `slideshow`, the images show in the home page slideshow instead;
 * every image then needs a caption.
 * `links` end the page.
 * An address that starts with "/" is a site page, any other is an outside link.
 */
function ContentPage({
    section,
    backTo,
    title,
    date,
    summary,
    pointsTitle,
    points = [],
    images,
    imageKind = 'photo',
    slideshow = false,
    documents = [],
    links = [],
}) {
    useDocumentTitle(`${title} | ${section}`);

    return (
        <article>
            <Link to={backTo.to} className={link}>
                <ArrowLeft size={18} aria-hidden="true" />
                {backTo.label}
            </Link>
            <SectionTitle as="h1" className="mt-4 animate-rise">
                {title}
            </SectionTitle>
            {date && (
                <p
                    className={
                        'mt-2 animate-rise text-body tabular-nums text-muted ' +
                        '[animation-delay:60ms]'
                    }
                >
                    {date}
                </p>
            )}

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
                {/*
                 * min-w-0: a grid item grows to its content,
                 * and the thumbnail strip is wider than the screen.
                 */}
                <div className="min-w-0 animate-rise [animation-delay:120ms] lg:col-span-8">
                    {slideshow ? (
                        <PhotoSlideshow label={`${title}, ${imageKind}s`} photos={images} />
                    ) : (
                        <PhotoCarousel label={`${title}, ${imageKind}s`} photos={images} />
                    )}
                </div>
                <div className="min-w-0 animate-rise [animation-delay:200ms] lg:col-span-4">
                    <p className="text-body text-ink">
                        {summary ?? 'More photos and documents are coming soon.'}
                    </p>
                    {points.length > 0 && (
                        <>
                            <SubTitle as="h2" className="mt-8">
                                {pointsTitle}
                            </SubTitle>
                            <ul className="mt-4 space-y-3 text-body">
                                {points.map((point) => (
                                    <li key={point} className="flex gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent"
                                        />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {documents.length > 0 && <DocumentList documents={documents} />}

            {links.length > 0 && (
                <ul className="mt-10 flex flex-col gap-1">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <SiteLink
                                href={href}
                                {...(href.startsWith('/')
                                    ? {}
                                    : { target: '_blank', rel: 'noopener noreferrer' })}
                                className={link}
                            >
                                {label}
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </SiteLink>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

/** /resources/:id. An unknown id shows the 404 page. */
export function ResourcePage() {
    const { id } = useParams();
    const resource = resources.find((item) => item.id === id);
    if (!resource) {
        return <NotFound />;
    }

    const {
        title,
        date,
        summary,
        pointsTitle,
        points,
        photos,
        imageKind,
        documents,
        driveHref,
        slideshow,
    } = resource;
    return (
        <ContentPage
            key={id}
            section="Resources"
            backTo={{ to: '/resources', label: 'All resources' }}
            title={title}
            date={date}
            summary={summary}
            pointsTitle={pointsTitle}
            points={points}
            images={photos}
            imageKind={imageKind}
            slideshow={slideshow}
            documents={documents}
            links={driveHref ? [{ href: driveHref, label: 'More files in Google Drive' }] : []}
        />
    );
}

/** /events/:id. An unknown id shows the 404 page. */
export function EventPage() {
    const { id } = useParams();
    const event = events.find((item) => item.id === id);
    if (!event) {
        return <NotFound />;
    }

    const { title, date, summary, pointsTitle, points, img, photos, documents, links } = event;
    return (
        <ContentPage
            key={id}
            section="Events"
            backTo={{ to: '/#events', label: 'Events and Updates' }}
            title={title}
            date={longDate(date)}
            summary={summary}
            pointsTitle={pointsTitle}
            points={points}
            // The card photo is 960px wide, enough for the page.
            images={photos ?? [{ src: img, thumb: img }]}
            documents={documents}
            links={links}
        />
    );
}
