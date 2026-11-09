// import React from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Events() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4, // Show 4 cards per slide
//     slidesToScroll: 1
//   };

//   return (
//     <div className='w-full  mx-auto mb-0' id='events'>
//       <p className='text-xl lg:text-[22px] font-bold  text-center mt-5'>EVENTS AND UPDATES</p>
//       <p className='mb-2 ml-6 text-xl text-green-800'>Recent Events</p>
//       <div className='w-full px-10 py-8 bg-gray-100 '>
//         <Slider {...settings}>
//           {data.map((d, index) => (
//             <div key={index} className="px-2"> {/* Adds horizontal spacing */}
//               <div className='h-80 w-60 bg-[#bad8bb] text-black overflow-hidden shadow-md'>
//                 <div className='w-full h-40 p-2'>
//                   <img src={d.img} alt='' className='w-full h-full object-cover'/>
//                 </div>
//                 <div className='p-3 h-32 flex flex-col justify-between'>
//                   <p className='font-semibold text-sm'>{d.date}</p>
//                   <p className='text-[18] mt-2'>{d.review}</p>
//                   <button className='bg-green-600 text-white py-1 px-2 rounded-md text-[18] hover:bg-green-700 transition-transform transform hover:scale-105 mt-4'>Read More</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// const data = [
//   {
//     date: '08/01/2024',
//     img: '/Recentevents/1st meet.jpg',
//     review: 'Nutrition Fellowship for Nepal: First Meet',
//   },
//   {
//     date: '12/26/2024',
//     img: '/Recentevents/2nd meet.jpg',
//     review: 'Strategic Planning for Fellowship Meet',
//   },
//   {
//     date: '01/02/2025',
//     img: '/Recentevents/Pk data camp.jpg',
//     review: 'Nutrition Data Camp : at Padma Kanya College',
//   },
//   {
//     date: '01/05/2025',
//     img: '/Recentevents/CAFODAT data camp.jpg',
//     review: 'Nutrition Data Camp : at CAFODAT College',
//   },
//   {
//     date: '01/17/2025',
//     img: '/Recentevents/Meet_and_Greet_12.jpg',
//     review: '2nd Nutrition Fellowship for Nepal Meet',
//   },
//   {
//     date: '01/20/2025',
//     img: '/Recentevents/DC-mmihs1.jpg',
//     review: 'Nutrition Data Camp : at MMIHS',
//   },
//   {
//     date: '02/19/2025',
//     img: '/Recentevents/canvabatch1.jpg',
//     review: 'Canva Workshop: Batch 1',
//   },
// ];

// export default Events;

// import React, { useEffect, useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Events() {
//   const [slidesToShow, setSlidesToShow] = useState(4);

//   // Update slidesToShow based on window width
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setSlidesToShow(2); // Mobile screens - 2 cards
//       } else if (window.innerWidth < 1024) {
//         setSlidesToShow(3); // Tablet screens - 3 cards
//       } else {
//         setSlidesToShow(4); // Larger screens - 4 cards
//       }
//     };

//     // Initial call
//     handleResize();
    
//     // Add resize listener
//     window.addEventListener('resize', handleResize);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <div className='w-full mx-auto mb-0' id='events'>
//       <p className='text-xl lg:text-[22px] font-bold text-center mt-5'>EVENTS AND UPDATES</p>
//       <p className='mb-2 ml-3 md:ml-6 text-lg md:text-xl text-green-800'>Recent Events</p>
//       <div className='w-full px-3 md:px-10 py-4 md:py-8 bg-gray-100'>
//         <Slider {...settings}>
//           {data.map((d, index) => (
//             <div key={index} className="px-1 md:px-2"> {/* Reduced padding on mobile */}
//               <div className='h-64 sm:h-72 md:h-80 w-full bg-[#bad8bb] text-black overflow-hidden shadow-md rounded'>
//                 <div className='w-full h-32 md:h-40 p-2'>
//                   <img src={d.img} alt='' className='w-full h-full object-cover rounded'/>
//                 </div>
//                 <div className='p-2 md:p-3 h-32 flex flex-col justify-between'>
//                   <p className='font-semibold text-xs md:text-sm'>{d.date}</p>
//                   <p className='text-sm md:text-base mt-1 md:mt-2 line-clamp-2'>{d.review}</p>
//                   <button className='bg-green-600 text-white py-1 px-2 rounded-md text-xs md:text-sm hover:bg-green-700 transition-transform transform hover:scale-105 mt-2 md:mt-4'>Read More</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// const data = [
//   {
//     date: '08/01/2024',
//     img: '/Recentevents/1st meet.jpg',
//     review: 'Nutrition Fellowship for Nepal: First Meet',
//   },
//   {
//     date: '12/26/2024',
//     img: '/Recentevents/2nd meet.jpg',
//     review: 'Strategic Planning for Fellowship Meet',
//   },
//   {
//     date: '01/02/2025',
//     img: '/Recentevents/Pk data camp.jpg',
//     review: 'Nutrition Data Camp : at Padma Kanya College',
//   },
//   {
//     date: '01/05/2025',
//     img: '/Recentevents/CAFODAT data camp.jpg',
//     review: 'Nutrition Data Camp : at CAFODAT College',
//   },
//   {
//     date: '01/17/2025',
//     img: '/Recentevents/Meet_and_Greet_12.jpg',
//     review: '2nd Nutrition Fellowship for Nepal Meet',
//   },
//   {
//     date: '01/20/2025',
//     img: '/Recentevents/DC-mmihs1.jpg',
//     review: 'Nutrition Data Camp : at MMIHS',
//   },
//   {
//     date: '02/19/2025',
//     img: '/Recentevents/canvabatch1.jpg',
//     review: 'Canva Workshop: Batch 1',
//   },
// ];

// export default Events;

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Events() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Update slidesToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(2); // Mobile screens - 2 cards
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3); // Tablet screens - 3 cards
      } else {
        setSlidesToShow(4); // Larger screens - 4 cards
      }
    };

    // Initial call
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='w-full mx-auto mb-0' id='events'>
      <p className='text-xl lg:text-[22px] font-bold text-center mt-5'>EVENTS AND UPDATES</p>
      <p className='mb-2 ml-3 md:ml-6 text-lg md:text-xl text-green-800'>Recent Events</p>
      <div className='w-full px-3 md:px-10 py-4 md:py-8 bg-gray-100'>
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className="px-1 md:px-2"> {/* Reduced padding on mobile */}
              <div className='h-72 sm:h-80 md:h-96 w-full bg-[#bad8bb] text-black overflow-hidden shadow-md'>
                <div className='w-full h-32 md:h-40 p-2'>
                  <img src={d.img} alt='' className='w-full h-full object-cover rounded'/>
                </div>
                <div className='p-2 mb-1 md:p-3 flex flex-col h-20 md:h-56'>
                  <p className='font-semibold text-xs md:text-sm mb-1'>{d.date}</p>
                  
                  {/* Added fixed height container for review text */}
                  <div className='md:mb-1  py-0'>
                    <p className='text-sm md:text-base line-clamp-2 md:line-clamp-3'>{d.review}</p>
                  </div>
                  
                  {/* Button is now outside the flex-grow area */}
                  <div className='mt-2 mb-0'>
                    <button className='bg-green-600 text-white py-1 px-2 rounded-md text-xs md:text-sm hover:bg-green-700 transition-transform transform hover:scale-105'>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const data = [
  {
    date: '08/01/2024',
    img: '/Recentevents/1st meet.jpg',
    review: 'Nutrition Fellowship for Nepal: First Meet',
  },
  {
    date: '12/26/2024',
    img: '/Recentevents/2nd meet.jpg',
    review: 'Strategic Planning for Fellowship Meet',
  },
  {
    date: '01/02/2025',
    img: '/Recentevents/Pk data camp.jpg',
    review: 'Nutrition Data Camp : at Padma Kanya College',
  },
  {
    date: '01/05/2025',
    img: '/Recentevents/CAFODAT data camp.jpg',
    review: 'Nutrition Data Camp : at CAFODAT College',
  },
  {
    date: '01/17/2025',
    img: '/Recentevents/Meet_and_Greet_12.jpg',
    review: '2nd Nutrition Fellowship for Nepal Meet',
  },
  {
    date: '01/20/2025',
    img: '/Recentevents/DC-mmihs1.jpg',
    review: 'Nutrition Data Camp : at MMIHS',
  },
  {
    date: '02/19/2025',
    img: '/Recentevents/canvabatch1.jpg',
    review: 'Canva Workshop among different colleges: Batch 1',
  },
];

export default Events;
