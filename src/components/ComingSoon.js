import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SITE_TITLE, SectionTitle, textLink, useDocumentTitle } from './ui';

/** The body of an inner page that has no content yet. */
const ComingSoon = ({ title }) => {
    useDocumentTitle(title, `${title}: coming soon on the ${SITE_TITLE} site.`);

    return (
        <>
            <SectionTitle as="h1">{title}</SectionTitle>
            <p className="mt-4 text-sub text-ink">Coming soon.</p>
            <Link
                to="/"
                className={
                    'mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-green ' +
                    textLink
                }
            >
                <ArrowLeft size={18} aria-hidden="true" />
                Back to home
            </Link>
        </>
    );
};

export default ComingSoon;
