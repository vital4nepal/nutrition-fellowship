import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    Clock,
    Download,
    GraduationCap,
    Languages,
    MapPin,
    Microscope,
    Presentation,
    Search,
    Users,
    Wallet,
} from 'lucide-react';
import About from './components/About';
import Navbar from './components/Navbar';
import Slideshow from './components/Slideshow';
import { tickTo, useTicker } from './components/Ticker';
import Events from './components/Events';
import EntryList from './components/EntryList';
import Thoughts from './components/Thoughts';
import ScrollToHash from './components/ScrollToHash';
import {
    Section,
    SectionTitle,
    SiteLink,
    SubTitle,
    container,
    groupTitleLink,
    textLink,
    underlineLink,
} from './components/ui';
import ComingSoon from './components/ComingSoon';
import ChapterPage from './components/ChapterPage';
import { InitiativePage } from './components/InitiativePage';
import NotFound from './components/NotFound';
import ResourcesPage from './components/ResourcesPage';
import { EventPage, ResourcePage } from './components/ContentPage';
import ExternalRedirect from './components/ExternalRedirect';
import { initiatives } from './data/initiatives';
import { countries, skills, themes } from './data/pulseSurvey';
import { dashboard, resources } from './data/resources';
import { d4n, email, emailHref, maintenance, socials } from './data/site';

const innerPages = [
    { path: '/profile', title: 'Nutrition Profile' },
    { path: '/policy2025', title: 'Policy 2025' },
    { path: '/aiinnutrition', title: 'Research on AI in nutrition' },
    { path: '/nfn2ndmeetblog', title: 'Nutrition Fellowship for Nepal: 2nd meet blog' },
    { path: '/nrcinternblog', title: 'Nutrition Rehabilitation Center: Internship blog' },
];

const upcomingEvents = [
    {
        title: 'Nutrition Data Camps',
        date: '2025-monthly',
        description:
            'Nutrition data camps will be conducted every month ' +
            'among the students and professionals.',
    },
    {
        title: 'Orientation for students',
        date: '2025-monthly',
        description:
            'Orientation programs on various technical skills ' +
            'will be conducted among the students.',
    },
];

const announcements = [
    {
        title: 'Nutrition Fellowship for Nepal: Second Meet',
        date: '01/17/2025',
        description:
            'We are excited for the gathering of hearts and minds ' +
            'dedicated to transforming nutrition in Nepal!',
    },
];

const usefulLinks = [
    { href: '/nutrition-dashboard', label: 'Nutrition Dashboard' },
    { href: '/resources', label: 'Resources' },
    { href: 'http://www.nnfsp.gov.np/', label: 'Nepal Nutrition and Food Security Portal' },
];

// The newest event comes first. A photo has a 1600px file and an 800px file for phones.
// A photo with a `width` has a large file of that width instead of 1600px.
// A `clip` slide is a muted 5 second video (`.webm` and `.mp4`) with a poster of the same name.
// A collage tile has a large file and a `-500` file, 1000px and 500px wide.
// `focus` keeps the faces inside the crop.
// Below 1024px the frame is the screen minus the 2rem page padding, split into thirds.
const BIG_TILE = '(min-width: 1024px) 540px, calc((100vw - 2rem) * 2 / 3)';
const SMALL_TILE = '(min-width: 1024px) 270px, calc((100vw - 2rem) / 3)';
const slides = [
    {
        name: 'vitamin-a',
        caption:
            'National Vitamin A Supplementation- Monitoring by Students in Nepal, ' +
            'November 2026',
        // One large tile on the left, three stacked on the right.
        collage: [
            { name: 'vita-2', focus: '55% 45%', area: 'col-span-2 row-span-3', sizes: BIG_TILE },
            { name: 'vita-1', focus: '50% 40%', area: '', sizes: SMALL_TILE },
            { name: 'vita-5', focus: '50% 45%', area: '', sizes: SMALL_TILE },
            { name: 'vita-6', focus: '45% 55%', area: '', sizes: SMALL_TILE },
        ],
    },
    {
        name: 'strategy-meeting',
        caption: 'Strategy meeting with JPG-SPH, BRAC University',
        focus: '50% 25%',
        width: 1280,
    },
    {
        name: 'brac-bangladesh-camp',
        caption: 'WHA assessment camp in Bangladesh University of Health Sciences',
        clip: true,
    },
    { name: 'second-meet', caption: 'Second Fellowship meet, January 2025', focus: '50% 40%' },
    { name: 'canva-workshop', caption: 'Canva workshop, February 2025', focus: '50% 50%' },
    {
        name: 'primeasia-bia-training',
        caption:
            'Students were trained on Bioelectrical Impedance Analysis (BIA) device ' +
            'to assess overall body composition in Primeasia University',
        portrait: true,
    },
];

// Stagger the four campaign photos when they first load. Keep them ready for later fades.
function Collage({ tiles, wanted, onSettle }) {
    const [loaded, setLoaded] = useState(() => new Set());

    return (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 bg-ink">
            {tiles.map(({ name, focus, area, sizes }, index) => {
                const done = () => {
                    setLoaded((set) => (set.has(index) ? set : new Set(set).add(index)));
                    if (index === 0) {
                        onSettle();
                    }
                };
                return (
                    <img
                        key={name}
                        src={wanted ? `/hero/${name}.jpg` : undefined}
                        srcSet={
                            wanted
                                ? `/hero/${name}-500.jpg 500w, /hero/${name}.jpg 1000w`
                                : undefined
                        }
                        sizes={sizes}
                        alt=""
                        fetchpriority={index === 0 ? 'high' : 'low'}
                        onLoad={done}
                        onError={done}
                        style={{ objectPosition: focus, animationDelay: `${index * 140}ms` }}
                        className={
                            `h-full w-full object-cover ${area} ` +
                            (loaded.has(index) ? 'animate-tile' : 'opacity-0')
                        }
                    />
                );
            })}
        </div>
    );
}

/**
 * A muted clip that plays from the start each time its slide shows.
 * Until the clip loads, the poster shows.
 * `playable` is false for a visitor who asked for reduced motion and has not pressed Play:
 * they see the poster.
 * The last source reports an error when the browser plays neither format,
 * so the slideshow never waits for it.
 */
function Clip({ name, visible, wanted, playable, onSettle, className }) {
    const video = useRef(null);
    useEffect(() => {
        const element = video.current;
        if (visible && playable) {
            element.currentTime = 0;
            element.play().catch(() => {});
        } else {
            element.pause();
        }
    }, [visible, playable]);

    return (
        <video
            ref={video}
            muted
            loop
            playsInline
            preload={wanted ? 'auto' : 'none'}
            poster={wanted ? `/hero/${name}.jpg` : undefined}
            onLoadedData={onSettle}
            className={className}
        >
            {wanted && (
                <>
                    <source src={`/hero/${name}.webm`} type="video/webm" />
                    <source src={`/hero/${name}.mp4`} type="video/mp4" onError={onSettle} />
                </>
            )}
        </video>
    );
}

const highlights = [
    {
        image: '/KeyHighlights/thumbs/Dr. RP Bichha-128.jpg',
        topic: 'Dr. RP Bichha Speech',
        description: 'Honorable Member of the National Planning Commission',
        link: 'https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v',
    },
];

const cardLink =
    'inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 ' +
    'transition-colors hover:underline';

const TOP_ROWS = 4;
const total = countries.reduce((sum, { respondents }) => sum + respondents, 0);

// One icon for each skill that can make the top four, by its id in the data file.
const skillIcons = {
    research: Search,
    'data-analysis': BarChart3,
    'public-speaking': Presentation,
    leadership: Users,
};

/** The most frequent skills. Equal counts keep the order of the data file. */
const topSkills = skills
    .map((row) => {
        const count = row.counts.reduce((sum, value) => sum + value, 0);
        return {
            ...row,
            count,
            share: Math.round((count / total) * 100),
            icon: skillIcons[row.id],
        };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_ROWS);

const card = 'flex flex-col border border-t-2 border-line bg-surface p-5';

// One hue for each card: greens for what students want and know, orange for what holds them back.
const hues = {
    skills: { rule: 'border-t-green', text: 'text-green' },
    challenges: { rule: 'border-t-accent', text: 'text-accent' },
    policy: { rule: 'border-t-deep', text: 'text-deep', wedge: 'fill-deep' },
    career: {
        rule: 'border-t-accent',
        text: 'text-accent',
        wedge: 'fill-accent',
        row: 'xl:flex-col xl:items-start xl:gap-3',
    },
};

// The owner's figure for every student the platform has heard from,
// the same "500+" as Our Reach on the About page.
// The skill shares below come from the pulse survey alone, so they are shares of its respondents.
const VOICES = 500;

/**
 * The students heard, then the four most wanted skills and their shares of the survey respondents.
 * Every figure counts up together the first time the card is on screen.
 * A screen reader reads the final figures only.
 */
const SkillStats = ({ hue }) => {
    const [ref, progress] = useTicker();
    return (
        <div ref={ref}>
            <p className="flex items-center gap-3 border-b border-line pb-4">
                <span
                    className={
                        'shrink-0 font-serif text-[2.5rem] font-semibold leading-none ' +
                        `tabular-nums ${hue.text}`
                    }
                    aria-hidden="true"
                >
                    {tickTo(VOICES, progress)}+
                </span>
                <span className="sr-only">{VOICES}+</span>
                <span className="text-meta text-ink">
                    students have shared their aspirations, challenges and needs
                </span>
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
                {topSkills.map(({ id, label, share, icon: Icon }) => (
                    <li key={id} className="flex flex-col">
                        <span className="flex items-center gap-2.5" aria-hidden="true">
                            <span className={`shrink-0 ${hue.text}`}>
                                <Icon size={24} strokeWidth={1.75} />
                            </span>
                            <span
                                className={
                                    'font-serif text-[1.75rem] font-semibold leading-none ' +
                                    `tabular-nums ${hue.text}`
                                }
                            >
                                {tickTo(share, progress)}%
                            </span>
                        </span>
                        <span className="sr-only">
                            {share}% want {label}
                        </span>
                        <span className="mt-1 text-ui font-semibold text-ink" aria-hidden="true">
                            {label}
                        </span>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-meta text-muted">Students could pick more than one skill.</p>
        </div>
    );
};

// One icon for each challenge, in the order of `items` in the data file.
const challengeIcons = [GraduationCap, Clock, Microscope, Languages, Wallet];

const PIE_SIZE = 80;
const PIE_RADIUS = PIE_SIZE / 2 - 1;

/**
 * A share as a slice of a pie, from 12 o'clock, clockwise.
 * `share` is `[filled, total]` and never reaches 1.
 */
const Pie = ({ share, hue }) => {
    const centre = PIE_SIZE / 2;
    const fraction = share[0] / share[1];
    const angle = fraction * 2 * Math.PI;
    const x = centre + PIE_RADIUS * Math.sin(angle);
    const y = centre - PIE_RADIUS * Math.cos(angle);
    return (
        <svg
            width={PIE_SIZE}
            height={PIE_SIZE}
            viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`}
            aria-hidden="true"
            className="shrink-0"
        >
            <circle cx={centre} cy={centre} r={PIE_RADIUS} fill="#FFFFFF" />
            <path
                d={
                    `M ${centre} ${centre} L ${centre} ${centre - PIE_RADIUS} ` +
                    `A ${PIE_RADIUS} ${PIE_RADIUS} 0 ${fraction > 0.5 ? 1 : 0} 1 ${x} ${y} Z`
                }
                className={hue.wedge}
            />
            <circle
                cx={centre}
                cy={centre}
                r={PIE_RADIUS}
                fill="none"
                stroke="#8A877E"
                strokeWidth="1.5"
            />
        </svg>
    );
};

// The session plan from the D4N concept note.
// `minutes` drives the width of each block on the timeline.
const schedule = [
    { minutes: 15, title: 'South Asian student voice', fill: 'bg-green' },
    { minutes: 25, title: 'From learning to doing', fill: 'bg-meadow' },
    { minutes: 45, title: 'Regional plenary', fill: 'bg-deep' },
    { minutes: 5, title: 'South Asia Call to Action', fill: 'bg-accent' },
];

// The organizers named on the flyer, in its order, with their logos as the flyer shows them.
const partners = [
    { name: 'Ministry of Health and Food Safety, Nepal', src: '/partners/mohfs-nepal.png' },
    { name: 'Bhutan Health Trust Fund', src: '/partners/bhutan-health-trust-fund.png' },
    { name: 'International Food Policy Research Institute (IFPRI)', src: '/partners/ifpri.png' },
    { name: 'IIHS Multiversity', src: '/partners/iihs.png' },
    { name: 'BRAC James P Grant School of Public Health', src: '/partners/brac-jpgsph.png' },
    { name: 'Nutrition Fellowship', src: '/partners/nutrition-fellowship.png' },
];

// The two parts of the Learning Lab, in the owner's words.
const parts = [
    {
        lead: 'Part 1 | What does the nutrition workforce need?',
        text:
            'Governments, partners, faculty and students will discuss ' +
            'how to strengthen the nutrition workforce.',
    },
    {
        lead: 'Part 2 | What can partners do together?',
        text:
            'Partners will discuss how to strengthen learning including use of technology ' +
            'and through program exposure. The event will build commitment and roadmap ' +
            'to enhance capacity of students to address nutrition policy crisis ' +
            'that region now faces now and beyond 2030.',
    },
];

const facts = [
    { icon: CalendarDays, text: d4n.labDate },
    { icon: Clock, text: d4n.labTime },
    { icon: MapPin, text: `Hybrid, ${d4n.venue}` },
];

const documents = [
    {
        category: 'Reports',
        links: resources
            .find(({ id }) => id === 'reports')
            .documents.map(({ title, file }) => ({
                title,
                path: '/resources/reports',
                pdfUrl: file,
            })),
    },
    {
        category: 'Policies and Plans',
        links: [{ title: 'Nutrition Policy 2025', path: '/policy2025' }],
    },
    {
        category: 'Blogs',
        links: [
            { title: 'Nutrition Fellowship for Nepal : 2nd Meet', path: '/nfn2ndmeetblog' },
            { title: 'Internship at Nutrition Rehabilitation Center', path: '/nrcinternblog' },
        ],
    },
    {
        category: 'Researches',
        links: [{ title: 'AI in Nutrition', path: '/aiinnutrition' }],
    },
];

const rowClass = 'flex min-h-[56px] items-center justify-between border-b border-line';
const titleClass = 'block flex-1 py-3 pr-4 font-medium';
const slotClass = 'flex h-11 w-11 shrink-0 items-center justify-center';

// The body of every page except the home page. The skip link jumps to its id.
const Page = ({ padding = 'lg:py-16', children }) => (
    <main id="main" tabIndex={-1} className={`${container} py-12 outline-none ${padding}`}>
        {children}
    </main>
);

function App() {
    if (maintenance) {
        // The whole site while `maintenance` in src/data/site.js is true.
        // Text and the contact email only.
        return (
            <main
                id="main"
                className="grid min-h-screen place-items-center bg-paper px-4 text-center"
            >
                <div>
                    <h1 className="font-serif text-display font-semibold text-green">
                        Under maintenance
                    </h1>
                    <p className="mt-4 text-body text-muted">
                        We are updating the site. Please check back soon.
                    </p>
                    <p className="mt-2 text-body text-muted">
                        If you have any queries, please contact us at{' '}
                        <a
                            href={emailHref}
                            className={
                                'font-semibold text-green underline underline-offset-4 ' +
                                'decoration-green/40 transition-colors hover:decoration-green'
                            }
                        >
                            {email}
                        </a>
                        .
                    </p>
                </div>
            </main>
        );
    }

    return (
        <Router>
            <ScrollToHash />
            <a
                href="#main"
                className={
                    'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] ' +
                    'focus:bg-green focus:px-4 focus:py-3 focus:font-semibold focus:text-paper'
                }
            >
                Skip to content
            </a>
            <header
                data-section="topbar"
                className="sticky top-0 z-50 h-16 lg:h-[72px] bg-paper border-b border-line"
            >
                <div className={`${container} flex h-full items-center gap-4`}>
                    <a href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-3">
                        <img
                            src="/nf-logo-128.png"
                            width="128"
                            height="128"
                            alt=""
                            className="h-11 lg:h-12 w-auto"
                        />
                        <span
                            className={
                                'hidden font-serif text-base font-semibold text-green sm:block'
                            }
                        >
                            Nutrition Fellowship
                        </span>
                        <span className="sr-only sm:hidden">Nutrition Fellowship</span>
                    </a>

                    <Navbar />
                </div>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <main id="main" tabIndex={-1} className="outline-none">
                            <section
                                data-section="hero"
                                className={`${container} pb-12 pt-6 lg:pb-16 lg:pt-8`}
                            >
                                <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
                                    <div className="lg:col-span-8">
                                        <SectionTitle
                                            as="h1"
                                            className="mb-6 animate-rise lg:mb-8"
                                        >
                                            Nutrition Fellowship
                                        </SectionTitle>
                                        <div className="animate-rise [animation-delay:120ms]">
                                            <Slideshow
                                                label="Fellowship highlights"
                                                slides={slides}
                                                // One hero slide: a collage, a clip or a photo.
                                                renderSlide={(
                                                    {
                                                        name,
                                                        collage,
                                                        clip,
                                                        portrait,
                                                        focus,
                                                        width = 1600,
                                                    },
                                                    { layer, visible, wanted, playable, settle }
                                                ) => {
                                                    if (clip) {
                                                        return (
                                                            <Clip
                                                                key={name}
                                                                name={name}
                                                                visible={visible}
                                                                wanted={wanted}
                                                                playable={playable}
                                                                onSettle={settle}
                                                                className={
                                                                    `${layer} ` +
                                                                    'h-full w-full object-cover'
                                                                }
                                                            />
                                                        );
                                                    }
                                                    if (collage) {
                                                        return (
                                                            <div key={name} className={layer}>
                                                                <Collage
                                                                    tiles={collage}
                                                                    wanted={wanted}
                                                                    onSettle={settle}
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <img
                                                            key={name}
                                                            src={
                                                                wanted
                                                                    ? `/hero/${name}.jpg`
                                                                    : undefined
                                                            }
                                                            srcSet={
                                                                wanted && !portrait
                                                                    ? `/hero/${name}-800.jpg ` +
                                                                        `800w, /hero/${name}.jpg ` +
                                                                        `${width}w`
                                                                    : undefined
                                                            }
                                                            sizes="(min-width: 1024px) 800px, 100vw"
                                                            alt=""
                                                            onLoad={settle}
                                                            onError={settle}
                                                            style={{ objectPosition: focus }}
                                                            className={
                                                                `${layer} h-full w-full ` +
                                                                (portrait
                                                                    ? 'bg-ink object-contain'
                                                                    : 'object-cover')
                                                            }
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        <About />
                                    </div>
                                    <div
                                        className={
                                            'grid content-start gap-4 sm:grid-cols-2 ' +
                                            'lg:col-span-4 lg:grid-cols-1 lg:border-l ' +
                                            'lg:border-line lg:pl-8 [&>*]:animate-rise ' +
                                            '[&>*:nth-child(2)]:[animation-delay:200ms] ' +
                                            '[&>*:nth-child(3)]:[animation-delay:320ms] ' +
                                            '[&>*:nth-child(1)]:[animation-delay:80ms]'
                                        }
                                    >
                                        <article
                                            className={
                                                'flex flex-col border border-line bg-surface p-6'
                                            }
                                        >
                                            <h2 className="text-sub text-green">
                                                Student Pulse Survey
                                            </h2>
                                            <p className="mt-3 text-body">
                                                Voice and Appeals of nutrition students in South
                                                Asia
                                            </p>
                                            <a
                                                href="/#dashboard"
                                                className={`${cardLink} pt-2 text-green`}
                                            >
                                                See the results
                                                <ArrowDown size={18} aria-hidden="true" />
                                            </a>
                                            <p className="mt-auto pt-2 text-body">
                                                Pulse survey to understand aspirations, challenges
                                                and needs.
                                            </p>
                                        </article>
                                        <article
                                            className={
                                                'flex flex-col bg-deep p-6 text-paper ' +
                                                '[&_:focus-visible]:outline-paper'
                                            }
                                        >
                                            <h2 className="text-sub">D4N 2026 Learning Lab</h2>
                                            <p className="mt-3 text-body text-paper/90">
                                                {d4n.theme}
                                            </p>
                                            <p className="mt-2 text-body text-paper/90">
                                                {d4n.labDate}, {d4n.labTime}.
                                                Hybrid, at the {d4n.venue}.
                                            </p>
                                            <div
                                                className={
                                                    'mt-auto flex flex-wrap items-center gap-x-6 ' +
                                                    'gap-y-2 pt-4'
                                                }
                                            >
                                                <a
                                                    href={d4n.registerHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={
                                                        'inline-flex min-h-11 items-center gap-2 ' +
                                                        'bg-accent px-6 font-semibold text-paper ' +
                                                        'transition-colors hover:bg-paper ' +
                                                        'hover:text-deep'
                                                    }
                                                >
                                                    Register
                                                    <ArrowUpRight size={18} aria-hidden="true" />
                                                </a>
                                                <a href="/#d4n" className={cardLink}>
                                                    Details
                                                    <ArrowDown size={18} aria-hidden="true" />
                                                </a>
                                            </div>
                                        </article>
                                        <div
                                            id="highlights"
                                            className="mt-4 sm:col-span-2 lg:col-span-1"
                                        >
                                            <SectionTitle size="sidebar">
                                                Key Highlights/Alerts
                                            </SectionTitle>
                                            <ul className="mt-4 border-t border-line">
                                                {highlights.map((highlight) => (
                                                    <li key={highlight.topic}>
                                                        <SiteLink
                                                            href={highlight.link}
                                                            className={
                                                                'group flex min-h-[80px] gap-4 ' +
                                                                'border-b border-line py-3'
                                                            }
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                src={highlight.image}
                                                                alt=""
                                                                width={56}
                                                                height={56}
                                                                className={
                                                                    'h-12 w-12 shrink-0 ' +
                                                                    'object-cover lg:h-14 lg:w-14'
                                                                }
                                                            />
                                                            <span className="min-w-0">
                                                                <span
                                                                    className={
                                                                        'block text-base ' +
                                                                        'font-semibold text-ink ' +
                                                                        groupTitleLink
                                                                    }
                                                                >
                                                                    {highlight.topic}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        'line-clamp-2 text-meta ' +
                                                                        'text-muted ' +
                                                                        'lg:line-clamp-3'
                                                                    }
                                                                >
                                                                    {highlight.description}
                                                                </span>
                                                            </span>
                                                        </SiteLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/*
                             * On a wide screen the Challenges card, with the longest lines,
                             * gets more width and the Financial card less, so the four cards
                             * end up close in height and none has an empty bottom.
                             */}
                            <Section name="dashboard" id="dashboard">
                                <SectionTitle>
                                    South Asian Student’s Aspirations and Challenges
                                </SectionTitle>
                                <p className="mt-3 max-w-[60ch] text-body">
                                    In the South Asia Pulse Survey, we asked nutrition students what
                                    they want to learn, what skills they want to build, what holds
                                    them back and how they see their future.
                                </p>
                                <div
                                    className={
                                        'nf-stagger mt-6 grid gap-4 sm:grid-cols-2 ' +
                                        'xl:grid-cols-[1.05fr_1.2fr_1fr_0.9fr]'
                                    }
                                >
                                    {themes.map(({ id, title, kind, items, note, stats }) => {
                                        const hue = hues[id];
                                        return (
                                            <article key={id} className={`${card} ${hue.rule}`}>
                                                <SubTitle
                                                    as="h3"
                                                    tone={hue.text}
                                                    className="mb-5 xl:min-h-[3.6rem]"
                                                >
                                                    {title}
                                                </SubTitle>
                                                {kind === 'bars' && <SkillStats hue={hue} />}
                                                {kind === 'list' && (
                                                    <>
                                                        <ul className="space-y-3">
                                                            {items.map((item, index) => {
                                                                const Icon = challengeIcons[index];
                                                                return (
                                                                    <li
                                                                        key={item}
                                                                        className={
                                                                            'flex items-start ' +
                                                                            'gap-3 text-ui text-ink'
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={
                                                                                'shrink-0 ' +
                                                                                hue.text
                                                                            }
                                                                        >
                                                                            <Icon
                                                                                size={22}
                                                                                strokeWidth={1.75}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                        {/* Odd parts are bold. */}
                                                                        <span>
                                                                            {item
                                                                                .split('**')
                                                                                .map((part, at) =>
                                                                                    at % 2 ? (
                                                                                        <strong
                                                                                            key={part}
                                                                                            className="font-semibold"
                                                                                        >
                                                                                            {part}
                                                                                        </strong>
                                                                                    ) : (
                                                                                        part
                                                                                    )
                                                                                )}
                                                                        </span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                        <p className="mt-4 text-ui text-ink">
                                                            {note}
                                                        </p>
                                                    </>
                                                )}
                                                {kind === 'stats' && (
                                                    // A card with a `row` puts its pies above the
                                                    // text on a wide screen, where its column is
                                                    // too narrow for both.
                                                    <ul className="space-y-5">
                                                        {stats.map(
                                                            ({
                                                                id: statId,
                                                                value,
                                                                share,
                                                                text,
                                                            }) => (
                                                                <li
                                                                    key={statId}
                                                                    className={
                                                                        'flex items-center gap-4 ' +
                                                                        (hue.row ?? '')
                                                                    }
                                                                >
                                                                    {Array.isArray(share) && (
                                                                        <Pie
                                                                            share={share}
                                                                            hue={hue}
                                                                        />
                                                                    )}
                                                                    <p className="text-ui text-ink">
                                                                        <strong
                                                                            className={
                                                                                'font-semibold ' +
                                                                                hue.text
                                                                            }
                                                                        >
                                                                            {value}
                                                                        </strong>{' '}
                                                                        {text}
                                                                    </p>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </Section>

                            <Section name="d4n" id="d4n">
                                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                                    <div className="lg:col-span-7">
                                        <SectionTitle>D4N 2026 Learning Lab</SectionTitle>
                                        <p
                                            className={
                                                'mt-4 max-w-[48ch] font-serif text-sub ' +
                                                'font-semibold text-ink'
                                            }
                                        >
                                            {d4n.theme}
                                        </p>
                                        <p className="mt-3 max-w-[60ch] text-body">
                                            Delivering for Nutrition Conference 2026 (
                                            {d4n.conferenceDates}).
                                        </p>

                                        <div className="mt-4 max-w-[60ch] space-y-4 text-body">
                                            {parts.map(({ lead, text }) => (
                                                <p key={lead}>
                                                    <span className="font-semibold text-ink">
                                                        {lead}
                                                    </span>{' '}
                                                    {text}
                                                </p>
                                            ))}
                                        </div>

                                        <ul className="mt-6 space-y-2 text-body">
                                            {facts.map(({ icon: Icon, text }) => (
                                                <li key={text} className="flex items-center gap-3">
                                                    <Icon
                                                        size={20}
                                                        aria-hidden="true"
                                                        className="shrink-0 text-green"
                                                    />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>

                                        <a
                                            href={d4n.registerHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={
                                                'mt-6 inline-flex min-h-11 items-center gap-2 ' +
                                                'bg-accent px-6 font-semibold text-paper ' +
                                                'transition-colors hover:bg-deep'
                                            }
                                        >
                                            Register
                                            <ArrowUpRight size={18} aria-hidden="true" />
                                        </a>
                                        <p className="mt-4 text-meta text-muted">
                                            For more information, contact us at:{' '}
                                            <a
                                                href={emailHref}
                                                className={`font-semibold text-green ${textLink}`}
                                            >
                                                {email}
                                            </a>
                                        </p>

                                        <SubTitle className="mt-12">Session plan</SubTitle>
                                        <div aria-hidden="true" className="mt-4 flex h-2 gap-0.5">
                                            {schedule.map(({ title, minutes, fill }) => (
                                                <div
                                                    key={title}
                                                    className={fill}
                                                    style={{ flexGrow: minutes, flexBasis: 0 }}
                                                />
                                            ))}
                                        </div>
                                        <ol className="nf-stagger mt-1">
                                            {schedule.map(({ title, minutes, fill }) => (
                                                <li
                                                    key={title}
                                                    className={
                                                        'flex items-center gap-3 border-b ' +
                                                        'border-line py-3 text-body'
                                                    }
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`h-2.5 w-2.5 shrink-0 ${fill}`}
                                                    />
                                                    <span className="font-semibold text-ink">
                                                        {title}
                                                    </span>
                                                    <span
                                                        className={
                                                            'ml-auto whitespace-nowrap text-meta ' +
                                                            'tabular-nums text-muted'
                                                        }
                                                    >
                                                        {minutes} min
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>

                                        <SubTitle className="mt-12">Organized with</SubTitle>
                                        {/*
                                         * One height for every logo,
                                         * a thin rule between them as on the flyer.
                                         */}
                                        <ul className="mt-4 flex flex-wrap items-center gap-y-5">
                                            {partners.map(({ name, src }) => (
                                                <li
                                                    key={name}
                                                    className={
                                                        'border-r border-line px-3.5 first:pl-0 ' +
                                                        'last:border-r-0 last:pr-0'
                                                    }
                                                >
                                                    <img
                                                        src={src}
                                                        alt={name}
                                                        loading="lazy"
                                                        className={
                                                            'h-11 w-auto object-contain ' +
                                                            'sm:h-14'
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <figure className="lg:col-span-5">
                                        <a
                                            href="/d4n-2026-learning-lab.jpg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block"
                                        >
                                            <img
                                                src="/d4n-2026-learning-lab.jpg"
                                                alt={
                                                    'D4N 2026 Learning Lab flyer: ' +
                                                    `${d4n.labDate}, ${d4n.labTime}, ${d4n.venue}.`
                                                }
                                                width={800}
                                                height={1000}
                                                loading="lazy"
                                                className={
                                                    'w-full border border-line ' +
                                                    'transition-transform duration-500 ' +
                                                    'group-hover:scale-[1.01]'
                                                }
                                            />
                                        </a>
                                        <figcaption className="mt-2 text-meta text-muted">
                                            The event flyer. Select it to open the full size.
                                        </figcaption>
                                    </figure>
                                </div>
                            </Section>

                            <Section name="initiatives" id="initiatives">
                                <SectionTitle>Projects and Initiatives</SectionTitle>
                                <p className="mb-8 mt-3 max-w-[60ch] text-body">
                                    Students, researchers and policy leaders work together in three
                                    workstreams to improve nutrition in Nepal.
                                </p>
                                <ul
                                    className={
                                        'nf-stagger grid border-t border-line lg:grid-cols-3 ' +
                                        'lg:gap-8'
                                    }
                                >
                                    {initiatives.map(({ id, title, img, width, height }) => {
                                        const words = title.split(' ');
                                        const last = words.pop();
                                        return (
                                            <li key={id}>
                                                <Link
                                                    to={`/initiatives/${id}`}
                                                    className={
                                                        'group flex min-h-[80px] items-center ' +
                                                        'gap-4 border-b border-line py-3 ' +
                                                        'lg:border-b-0 lg:py-5'
                                                    }
                                                >
                                                    <img
                                                        loading="lazy"
                                                        src={img}
                                                        alt=""
                                                        width={width}
                                                        height={height}
                                                        className={
                                                            'h-14 w-14 shrink-0 border ' +
                                                            'border-line object-cover ' +
                                                            'transition-transform ' +
                                                            'duration-300 group-hover:scale-105 ' +
                                                            'md:h-16 md:w-16'
                                                        }
                                                    />
                                                    <span
                                                        className={
                                                            'text-lg font-semibold ' +
                                                            groupTitleLink
                                                        }
                                                    >
                                                        {words.join(' ')}{' '}
                                                        {/*
                                                         * The last word and the arrow share one
                                                         * nowrap span, so the arrow never wraps
                                                         * onto a line alone.
                                                         */}
                                                        <span className="whitespace-nowrap">
                                                            {last}
                                                            <ArrowRight
                                                                size={18}
                                                                aria-hidden="true"
                                                                className={
                                                                    'ml-1 inline-block ' +
                                                                    'align-text-bottom ' +
                                                                    'transition-transform ' +
                                                                    'group-hover:translate-x-1'
                                                                }
                                                            />
                                                        </span>
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Section>

                            <Section name="resources" id="documents">
                                <SectionTitle className="mb-8">
                                    Resources & Publications
                                </SectionTitle>
                                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                                    {documents.map(({ category, links }) => (
                                        <div key={category} className="border-t border-ink pt-4">
                                            <SubTitle>{category}</SubTitle>
                                            <ul className="mt-2">
                                                {/*
                                                 * Every row ends in the same 44px slot.
                                                 * A PDF row has two links (title opens its page,
                                                 * icon downloads); a page row is one link.
                                                 */}
                                                {links.map(({ title, path, pdfUrl }) =>
                                                    pdfUrl ? (
                                                        <li key={title} className={rowClass}>
                                                            <Link
                                                                to={path}
                                                                className={
                                                                    `${titleClass} ` + textLink
                                                                }
                                                            >
                                                                {title}
                                                            </Link>
                                                            <a
                                                                href={pdfUrl}
                                                                download
                                                                aria-label={`Download ${title}`}
                                                                className={
                                                                    `${slotClass} text-green`
                                                                }
                                                            >
                                                                <Download
                                                                    size={20}
                                                                    aria-hidden="true"
                                                                />
                                                            </a>
                                                        </li>
                                                    ) : (
                                                        <li key={title}>
                                                            <Link
                                                                to={path}
                                                                className={`group ${rowClass}`}
                                                            >
                                                                <span
                                                                    className={
                                                                        `${titleClass} ` +
                                                                        groupTitleLink
                                                                    }
                                                                >
                                                                    {title}
                                                                </span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={
                                                                        `${slotClass} text-muted ` +
                                                                        'transition-colors ' +
                                                                        'group-hover:text-green'
                                                                    }
                                                                >
                                                                    <ArrowRight size={20} />
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Events />
                            <Section
                                name="updates"
                                bordered={false}
                                padding="pb-12 lg:pb-16"
                                className="grid gap-10 md:grid-cols-2 md:gap-8"
                            >
                                <EntryList heading="Upcoming Events" entries={upcomingEvents} />
                                <EntryList heading="Announcements" entries={announcements} />
                            </Section>
                            <Thoughts />
                        </main>
                    }
                />
                <Route
                    path="/initiatives/:id"
                    element={
                        <Page>
                            <InitiativePage />
                        </Page>
                    }
                />
                <Route
                    path="/chapters/:id"
                    element={
                        <Page>
                            <ChapterPage />
                        </Page>
                    }
                />
                <Route
                    path="/resources"
                    element={
                        <Page>
                            <ResourcesPage />
                        </Page>
                    }
                />
                <Route
                    path="/resources/:id"
                    element={
                        <Page>
                            <ResourcePage />
                        </Page>
                    }
                />
                <Route
                    path="/events/:id"
                    element={
                        <Page>
                            <EventPage />
                        </Page>
                    }
                />
                <Route
                    path="/nutrition-dashboard"
                    element={
                        <Page>
                            <ExternalRedirect title={dashboard.title} href={dashboard.href} />
                        </Page>
                    }
                />
                {innerPages.map(({ path, title }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Page>
                                <ComingSoon title={title} />
                            </Page>
                        }
                    />
                ))}
                <Route
                    path="*"
                    element={
                        <Page padding="lg:py-24">
                            <NotFound />
                        </Page>
                    }
                />
            </Routes>

            <footer
                data-section="footer"
                className="bg-deep text-paper [--nf-green:theme(colors.paper)]"
            >
                <div className={`${container} py-14`}>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-10">
                        <div className="md:col-span-2 lg:col-span-5">
                            <img
                                src="/nf-logo-128.png"
                                width="128"
                                height="128"
                                alt="Nutrition Fellowship"
                                className="h-16 w-auto"
                            />
                            <p className="mt-4 max-w-[60ch] text-ui">
                                Nutrition Fellowship for Nepal aims to unite three generations of
                                stakeholders from Nepal and around the world.
                            </p>
                        </div>

                        <div className="lg:col-span-3 lg:col-start-7">
                            <SubTitle as="h2" tone="text-inherit">
                                Useful Links
                            </SubTitle>
                            <ul className="mt-2">
                                {usefulLinks.map((link) => (
                                    <li key={link.href}>
                                        <SiteLink
                                            href={link.href}
                                            className={
                                                'flex min-h-11 items-center text-meta ' +
                                                underlineLink
                                            }
                                        >
                                            {link.label}
                                        </SiteLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <SubTitle as="h2" tone="text-inherit">
                                Get in Touch
                            </SubTitle>
                            <div className="flex items-center mt-2 gap-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className={
                                            'flex h-11 w-11 items-center justify-center ' +
                                            'transition-colors border border-paper/30 ' +
                                            'hover:border-paper'
                                        }
                                    >
                                        <svg
                                            viewBox={social.viewBox}
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-[18px] overflow-visible"
                                        >
                                            <path d={social.path} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            'mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 text-meta ' +
                            'md:flex-row md:items-center md:justify-between md:gap-8'
                        }
                    >
                        <p>
                            Questions? Email us at{' '}
                            <a href={emailHref} className={underlineLink}>
                                {email}
                            </a>
                        </p>
                        <p>Copyright © {new Date().getFullYear()} All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </Router>
    );
}

export default App;
