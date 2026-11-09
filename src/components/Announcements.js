import React from 'react';
import EntryList from './EntryList';

const announcements = [
  {
    title: 'Nutrition Fellowship for Nepal: Second Meet',
    date: '01/17/2025',
    description: 'We are excited for the gathering of hearts and minds dedicated to transforming nutrition in Nepal!',
  },
];

const Announcements = () => <EntryList heading="Announcements" entries={announcements} />;

export default Announcements;
