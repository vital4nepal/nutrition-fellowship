import { BarChart3, Clock, GraduationCap, Languages, Microscope, Presentation, Search, Users, Wallet } from 'lucide-react';
import { countries, skills, themes } from '../data/pulseSurvey';
import { tickTo, useTicker } from './Ticker';
import { Section, SectionTitle, SubTitle } from './ui';

const TOP_ROWS = 4;
const total = countries.reduce((sum, { respondents }) => sum + respondents, 0);

// One icon for each skill that can make the top four, by its id in the data file.
const skillIcons = { research: Search, 'data-analysis': BarChart3, 'public-speaking': Presentation, leadership: Users };

/** The most frequent skills. Equal counts keep the order of the data file. */
const topSkills = skills
  .map((row) => {
    const count = row.counts.reduce((sum, value) => sum + value, 0);
    return { ...row, count, share: Math.round((count / total) * 100), icon: skillIcons[row.id] };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, TOP_ROWS);

const card = 'flex flex-col border border-t-2 border-line bg-surface p-5';

// One hue for each card: greens for what students want and know, orange for what holds them back.
const hues = {
  skills: { rule: 'border-t-green', text: 'text-green' },
  challenges: { rule: 'border-t-accent', text: 'text-accent' },
  policy: { rule: 'border-t-deep', text: 'text-deep', wedge: 'fill-deep' },
  career: { rule: 'border-t-accent', text: 'text-accent', wedge: 'fill-accent', row: 'xl:flex-col xl:items-start xl:gap-3' },
};


// The owner's figure for every student the platform has heard from, the same "500+" as Our Reach on the About page.
// The skill shares below come from the pulse survey alone, so they are shares of its respondents.
const VOICES = 500;

/**
 * The students heard, then the four most wanted skills and their shares of the survey respondents.
 * Every figure counts up together the first time the card is on screen. A screen reader reads the final figures only.
 */
const SkillStats = ({ hue }) => {
  const [ref, progress] = useTicker();
  return (
    <div ref={ref}>
      <p className="flex items-center gap-3 border-b border-line pb-4">
        <span className={`shrink-0 font-serif text-[2.5rem] font-semibold leading-none tabular-nums ${hue.text}`} aria-hidden="true">
          {tickTo(VOICES, progress)}+
        </span>
        <span className="sr-only">{VOICES}+</span>
        <span className="text-meta text-ink">students have shared their aspirations, challenges and needs</span>
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {topSkills.map(({ id, label, share, icon: Icon }) => (
          <li key={id} className="flex flex-col">
            <span className="flex items-center gap-2.5" aria-hidden="true">
              <span className={`shrink-0 ${hue.text}`}>
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <span className={`font-serif text-[1.75rem] font-semibold leading-none tabular-nums ${hue.text}`}>
                {tickTo(share, progress)}%
              </span>
            </span>
            <span className="sr-only">{share}% want {label}</span>
            <span className="mt-1 text-ui font-semibold text-ink" aria-hidden="true">{label}</span>
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

/** A share as a slice of a pie, from 12 o'clock, clockwise. `share` is `[filled, total]` and never reaches 1. */
const Pie = ({ share, hue }) => {
  const centre = PIE_SIZE / 2;
  const fraction = share[0] / share[1];
  const angle = fraction * 2 * Math.PI;
  const x = centre + PIE_RADIUS * Math.sin(angle);
  const y = centre - PIE_RADIUS * Math.cos(angle);
  return (
    <svg width={PIE_SIZE} height={PIE_SIZE} viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`} aria-hidden="true" className="shrink-0">
      <circle cx={centre} cy={centre} r={PIE_RADIUS} fill="#FFFFFF" />
      <path
        d={`M ${centre} ${centre} L ${centre} ${centre - PIE_RADIUS} A ${PIE_RADIUS} ${PIE_RADIUS} 0 ${fraction > 0.5 ? 1 : 0} 1 ${x} ${y} Z`}
        className={hue.wedge}
      />
      <circle cx={centre} cy={centre} r={PIE_RADIUS} fill="none" stroke="#8A877E" strokeWidth="1.5" />
    </svg>
  );
};

// On a wide screen the Challenges card, with the longest lines, gets more width and the Financial card less,
// so the four cards end up close in height and none has an empty bottom.
const SurveyDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle>South Asian Student’s Aspirations and Challenges</SectionTitle>
    <p className="mt-3 max-w-[60ch] text-body">
      In the South Asia Pulse Survey, we asked nutrition students what they want to learn, what skills they want to build, what holds them back and how they see their future.
    </p>
    <div className="nf-stagger mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.05fr_1.2fr_1fr_0.9fr]">
      {themes.map(({ id, title, kind, items, note, stats }) => {
        const hue = hues[id];
        return (
          <article key={id} className={`${card} ${hue.rule}`}>
            <SubTitle as="h3" tone={hue.text} className="mb-5 xl:min-h-[3.6rem]">{title}</SubTitle>
            {kind === 'bars' && <SkillStats hue={hue} />}
            {kind === 'list' && (
              <>
                <ul className="space-y-3">
                  {items.map((item, index) => {
                    const Icon = challengeIcons[index];
                    return (
                      <li key={item} className="flex items-start gap-3 text-ui text-ink">
                        <span className={`shrink-0 ${hue.text}`}>
                          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        {/* The odd parts of the split are the words marked in bold. */}
                        <span>
                          {item.split('**').map((part, partIndex) =>
                            partIndex % 2 ? <strong key={part} className="font-semibold">{part}</strong> : part,
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-ui text-ink">{note}</p>
              </>
            )}
            {kind === 'stats' && (
              // A card with a `row` puts its pies above the text on a wide screen, where its column is too narrow for both.
              <ul className="space-y-5">
                {stats.map(({ id: statId, value, share, text }) => (
                  <li key={statId} className={`flex items-center gap-4 ${hue.row ?? ''}`}>
                    {Array.isArray(share) && <Pie share={share} hue={hue} />}
                    <p className="text-ui text-ink">
                      <strong className={`font-semibold ${hue.text}`}>{value}</strong> {text}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  </Section>
);

export default SurveyDashboard;
