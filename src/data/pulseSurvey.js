// Counts from the Nutrition Student Pulse Survey analysis sheets. Each array is in the order of `countries`.
// A percentage is always computed from these counts, so a new count never leaves a stale percentage behind.
export const countries = [
  { id: 'nepal', label: 'Nepal', respondents: 85 },
  { id: 'bangladesh', label: 'Bangladesh', respondents: 119 },
  { id: 'sri-lanka', label: 'Sri Lanka', respondents: 126 },
  { id: 'pakistan', label: 'Pakistan', respondents: 46 },
];

// A student could pick more than one skill, so these do not add up to 100%.
export const skills = [
  { id: 'research', label: 'Research', counts: [74, 92, 72, 30] },
  { id: 'data-analysis', label: 'Data analysis', counts: [56, 67, 40, 24] },
  { id: 'public-speaking', label: 'Presentation', counts: [5, 60, 68, 21] },
  { id: 'leadership', label: 'Leadership', counts: [3, 46, 64, 14] },
  { id: 'social-media', label: 'Social media', counts: [22, 35, 44, 7] },
  { id: 'program-management', label: 'Program management', counts: [6, 35, 39, 13] },
  { id: 'scientific-writing', label: 'Scientific writing', counts: [4, 32, 30, 20] },
  { id: 'advocacy', label: 'Advocacy', counts: [41, 8, 7, 4] },
  { id: 'monitoring', label: 'Monitoring and evaluation', counts: [4, 22, 20, 10] },
  { id: 'policy-analysis', label: 'Policy analysis', counts: [4, 15, 7, 4] },
];

// The four dashboard themes in display order. Only "skills" is computed from the counts above;
// the rest is typed from the owner's website updates document and has no per-country split.
export const themes = [
  { id: 'skills', title: 'Skills students want to build', kind: 'bars' },
  {
    id: 'challenges',
    title: 'Challenges students face',
    kind: 'list',
    // Words between ** ** show in bold.
    items: [
      '**Institutional gaps** for learning',
      '**Academic pressure** and time management',
      'Limited **program exposure** and **research experience**',
      '**Language** and communication barriers',
      '**Financial** and resource constraints',
    ],
    note: 'Many students have also raised concerns about stress and mental health.',
  },
  {
    id: 'policy',
    title: 'Policy and program awareness',
    kind: 'stats',
    stats: [
      // `share` as `[filled, total]` draws a pie beside the text. A percent shows as the number only.
      { id: 'who-targets', value: 'Only 51%', share: 51, text: 'were aware of World Health Assembly nutrition targets' },
      // The survey sheets agree: 116 of 376 students answered yes.
      { id: 'sdg-track', value: '1 in 3', share: [1, 3], text: 'think their country is on track for the nutrition SDGs' },
      { id: 'programme', value: 'Only 1 in 4', share: [1, 4], text: 'have exposure to a government nutrition program' },
    ],
  },
  {
    id: 'career',
    title: 'Financial and career issues',
    kind: 'stats',
    stats: [
      // 53% is the owner's figure. The survey sheets give 52% (197 of 376 confident or very confident).
      { id: 'job-confidence', value: 'Only 53%', share: [53, 100], text: 'feel confident of landing a nutrition job' },
      { id: 'job-status', value: '4 out of 10', share: [4, 10], text: 'are working or looking for work' },
    ],
  },
];

export const ALL = 'all';

/** The count of one answer for one country, or for every country when `countryId` is ALL. */
export function countFor(row, countryId) {
  if (countryId === ALL) return row.counts.reduce((sum, count) => sum + count, 0);
  return row.counts[countries.findIndex((country) => country.id === countryId)];
}

export function respondentsFor(countryId) {
  if (countryId === ALL) return countries.reduce((sum, country) => sum + country.respondents, 0);
  return countries.find((country) => country.id === countryId).respondents;
}
