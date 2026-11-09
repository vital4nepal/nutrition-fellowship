import React from 'react';
import EntryList from './EntryList';

const events = [
  {
    title: 'Nutrition Data Camps',
    date: '2025-monthly',
    description: 'Nutrition data camps will be conducted every month among the students and professionals.',
  },
  {
    title: 'Orientation for students',
    date: '2025-monthly',
    description: 'Orientation programs on various technical skills will be conducted among the students.',
  },
];

const NextEvent = () => <EntryList heading="Upcoming Events" entries={events} />;

export default NextEvent;
