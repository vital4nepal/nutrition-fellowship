import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { chapterPages } from '../data/chapterPages';
import { chapters } from '../data/site';
import NotFound from './NotFound';
import { SectionTitle, useDocumentTitle } from './ui';

// Leaflet and the border data load only on a chapter page,
// so the home page does not pay for them.
const ChapterMap = lazy(() => import('./ChapterMap'));

const names = Object.fromEntries(chapters.map(({ id, label }) => [id, label]));

/**
 * /chapters/:id. The chapter name, a coming soon line and a map of the country.
 * An unknown id shows the 404 page.
 */
export default function ChapterPage() {
    const { id } = useParams();
    const known = id in chapterPages;
    const label = names[id];
    useDocumentTitle(known && `${label} Chapter`);

    if (!known) {
        return <NotFound />;
    }
    return (
        <article>
            <SectionTitle as="h1">{label} Chapter</SectionTitle>
            <p className="mt-4 text-sub text-ink">Coming soon.</p>
            {/*
             * The frame has the height of the map before the map loads,
             * so nothing below it moves.
             */}
            <div className="mt-8 h-[60svh] min-h-[22rem] border border-line bg-paper lg:h-[70vh]">
                <Suspense fallback={null}>
                    <ChapterMap id={id} label={label} />
                </Suspense>
            </div>
        </article>
    );
}
