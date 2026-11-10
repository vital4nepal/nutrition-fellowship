import React from 'react';
import { SectionTitle } from './ui';

// No registration link exists yet, so Register renders disabled instead of pointing nowhere.
const cardClass = 'border border-line bg-surface p-5';
const disabledButton =
  'mt-4 inline-flex min-h-11 items-center border border-line-strong px-5 text-ui font-semibold text-muted';

const ProgramCards = () => (
  <>
    <SectionTitle size="sidebar">Programs</SectionTitle>
    <ul className="mt-4 grid gap-4">
      <li className={cardClass}>
        <h3 className="text-lg">Student Pulse Survey</h3>
      </li>
      <li className={cardClass}>
        <h3 className="text-lg">D4N Cohort</h3>
        <button type="button" disabled className={disabledButton}>
          Register
        </button>
      </li>
    </ul>
  </>
);

export default ProgramCards;
