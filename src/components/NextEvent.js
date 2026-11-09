// import React from 'react';
// import './NextEvent.css';

// const Event = ({ name, date, description }) => {
//   return (
//     <div className="nextevent-content">
//       <p className="event-name"><b>{name}</b></p>
//       <p className="event-date">Date: {date}</p>
//       <p className="event-description">
//         {description}
//       </p>
//       <button className="view-details-btn">View Details</button>
//       {/* <span className="underline"></span> */}
//     </div>
//   );
// };

// const NextEvent = () => {
//   const events = [
//     {
//       name: 'Nutrition Data Camps',
//       date: '2025-monthly',
//       description: 'Nutrition data camps will be conducted every month among the students and professionals.'
//     },
//     {
//       name: 'Orientation for students',
//       date: '2025-monthly',
//       description: 'Orientation programs on various technical skills will be conducted among the students.'
//     },
//     // {
//     //   name: 'Event 3',
//     //   date: '2024/12/25',
//     //   description: 'Description for Event 3'
//     // },
//     // {
//     //   name: 'Event 4',
//     //   date: '2024/12/30',
//     //   description: 'Description for Event 4'
//     // }
//   ];

//   return (
//     <div className="nextevent-container">
//       <p className='nextevent-top'>Upcoming Events</p>
//       {events.map((event, index) => (
//         <Event 
//           key={index} 
//           name={event.name} 
//           date={event.date} 
//           description={event.description} 
//         />
//       ))}
//     </div>
//   );
// };

// export default NextEvent;


import React from 'react';

const Event = ({ name, date, description }) => {
  return (
    <div className="bg-[#bad8bb] p-4 my-4 rounded-lg shadow-md">
      <p className="text-gray-800 font-bold text-base mb-0.5">{name}</p>
      <p className="text-gray-600 text-base mb-0.5">Date: {date}</p>
      <p className="text-gray-600 text-base mb-0.5">
        {description}
      </p>
      {/* <button className="mt-0.5 bg-[#28a745] hover:bg-[#218838] text-white text-xs py-1.5 px-3 rounded transition-colors duration-300">
        View Details
      </button> */}
    </div>
  );
};

const NextEvent = () => {
  const events = [
    {
      name: 'Nutrition Data Camps',
      date: '2025-monthly',
      description: 'Nutrition data camps will be conducted every month among the students and professionals.'
    },
    {
      name: 'Orientation for students',
      date: '2025-monthly',
      description: 'Orientation programs on various technical skills will be conducted among the students.'
    },
  ];

  return (
    <div className="mx-5 mt-0 mb-1">
      <p className="mb-2 ml-6 text-xl text-green-800">
        Upcoming Events
      </p>
      {events.map((event, index) => (
        <Event 
          key={index} 
          name={event.name} 
          date={event.date} 
          description={event.description} 
        />
      ))}
    </div>
  );
};

export default NextEvent;

