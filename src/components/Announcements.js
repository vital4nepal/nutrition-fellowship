// import React from 'react';
// import './Announcements.css';

// const Announcement = ({ title, date, details }) => {
//   return (
//     <div className="announcement-content">
//       <p className="announcement-title"><b>{title}</b></p>
//       <p className="announcement-date">Date: {date}</p>
//       <p className="announcement-details">
//         {details}
//       </p>
//       <button className="read-more-btn">View Details</button>
//     </div>
//   );
// };

// const Announcements = () => {
//   const announcements = [
//     {
//       title: 'Nutrition Fellowship for Nepal: Second Meet',
//       date: '01/17/2025',
//       details: 'We are excited for the gathering of hearts and minds dedicated to transforming nutrition in Nepal!'
//     },
//     // {
//     //   title: 'Recognition of Community Health Volunteers',
//     //   date: '2025-03-10',
//     //   details: 'Join us in celebrating the achievements of community health volunteers on their 30th anniversary.'
//     // },
//     // {
//     //   title: 'Announcement 3',
//     //   date: '2025-04-01',
//     //   details: 'Details for Announcement 3'
//     // },
//     // {
//     //   title: 'Announcement 4',
//     //   date: '2025-05-01',
//     //   details: 'Details for Announcement 4'
//     // }
//   ];

//   return (
//     <div className="announcements-container">
//       <p className='announcements-top'>Announcements</p>
//       {announcements.map((announcement, index) => (
//         <Announcement 
//           key={index} 
//           title={announcement.title} 
//           date={announcement.date} 
//           details={announcement.details} 
//         />
//       ))}
//     </div>
//   );
// };

// export default Announcements;

import React from 'react';

const Announcement = ({ title, date, details }) => {
  return (
    <div className="bg-[#BAD8BB] p-4 my-4 rounded-lg shadow-md">
      <p className="text-gray-800 font-bold text-base mb-0.5">{title}</p>
      <p className="text-gray-600 text-base mb-0.5">Date: {date}</p>
      <p className="text-gray-600 text-base mb-0.5">
        {details}
      </p>
      {/* <button className="mt-0.5 bg-[#28a745] hover:bg-[#218838] text-white text-xs py-1.5 px-3 rounded transition-colors duration-300">
        View Details
      </button> */}
    </div>
  );
};

const Announcements = () => {
  const announcements = [
    {
      title: 'Nutrition Fellowship for Nepal: Second Meet',
      date: '01/17/2025',
      details: 'We are excited for the gathering of hearts and minds dedicated to transforming nutrition in Nepal!'
    },
  ];

  return (
    <div className="mx-5 mt-0 p-0">
      <p className="mb-2 ml-6 text-xl text-green-800">
        Announcements
      </p>
      {announcements.map((announcement, index) => (
        <Announcement 
          key={index} 
          title={announcement.title} 
          date={announcement.date} 
          details={announcement.details} 
        />
      ))}
    </div>
  );
};

export default Announcements;