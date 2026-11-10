// Counts from the Nutrition Student Pulse Survey analysis sheets. Each array is in the order of `countries`.
// A percentage is always computed from these counts, so a new count never leaves a stale percentage behind.
export const countries = [
  { id: 'nepal', label: 'Nepal', respondents: 85 },
  { id: 'bangladesh', label: 'Bangladesh', respondents: 119 },
  { id: 'sri-lanka', label: 'Sri Lanka', respondents: 126 },
  { id: 'pakistan', label: 'Pakistan', respondents: 46 },
];

export const profile = [
  { id: 'studying', label: 'Studying only', counts: [33, 76, 80, 26] },
  { id: 'seeking', label: 'Studying and looking for work', counts: [13, 32, 15, 14] },
  { id: 'working', label: 'Studying and working', counts: [39, 11, 31, 6] },
];

// Nepal offered a sixth answer, "Somewhat worried" (1 response). It is counted under "Worried".
export const jobConfidence = [
  { id: 'very-confident', label: 'Very confident', counts: [5, 9, 20, 7] },
  { id: 'confident', label: 'Confident', counts: [31, 38, 66, 21] },
  { id: 'neutral', label: 'Neutral', counts: [24, 29, 28, 10] },
  { id: 'worried', label: 'Worried', counts: [3, 32, 9, 5] },
  { id: 'very-worried', label: 'Very worried', counts: [22, 11, 3, 3] },
];

export const sdgOutlook = [
  { id: 'yes', label: 'Yes', counts: [22, 46, 38, 10] },
  { id: 'no', label: 'No', counts: [32, 38, 29, 14] },
  { id: 'unsure', label: 'Do not know', counts: [31, 35, 59, 22] },
];

// A student could pick more than one skill and name more than one challenge, so these do not add up to 100%.
export const skills = [
  { id: 'research', label: 'Research', counts: [74, 92, 72, 30] },
  { id: 'data-analysis', label: 'Data analysis', counts: [56, 67, 40, 24] },
  { id: 'public-speaking', label: 'Presentation and public speaking', counts: [5, 60, 68, 21] },
  { id: 'leadership', label: 'Leadership', counts: [3, 46, 64, 14] },
  { id: 'social-media', label: 'Social media and communication', counts: [22, 35, 44, 7] },
  { id: 'program-management', label: 'Program management', counts: [6, 35, 39, 13] },
  { id: 'scientific-writing', label: 'Scientific writing', counts: [4, 32, 30, 20] },
  { id: 'advocacy', label: 'Advocacy', counts: [41, 8, 7, 4] },
  { id: 'monitoring', label: 'Monitoring and evaluation', counts: [4, 22, 20, 10] },
  { id: 'policy-analysis', label: 'Policy analysis', counts: [4, 15, 7, 4] },
];

export const challenges = [
  { id: 'time', label: 'Time management and workload', counts: [8, 37, 47, 15] },
  { id: 'practical', label: 'Practical and field exposure', counts: [26, 47, 10, 17] },
  { id: 'content', label: 'Understanding course content', counts: [19, 30, 28, 9] },
  { id: 'language', label: 'Language barriers', counts: [0, 0, 48, 2] },
  { id: 'research', label: 'Research and data skills', counts: [9, 22, 3, 6] },
  { id: 'resources', label: 'Study resources', counts: [8, 21, 3, 6] },
  { id: 'focus', label: 'Concentration and motivation', counts: [4, 22, 7, 5] },
  { id: 'finance', label: 'Financial difficulties', counts: [3, 9, 15, 7] },
  { id: 'wellbeing', label: 'Stress and wellbeing', counts: [6, 9, 12, 5] },
  { id: 'infrastructure', label: 'Infrastructure and transport', counts: [1, 14, 7, 6] },
  { id: 'career', label: 'Career uncertainty', counts: [6, 12, 7, 2] },
  { id: 'teaching', label: 'Teaching guidance', counts: [16, 7, 0, 3] },
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
