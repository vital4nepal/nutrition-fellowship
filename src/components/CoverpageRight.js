// // Coverpage-right.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CoverpageRight = () => {
//   const navigate = useNavigate();

//   const highlights = [
//     {
//       id: 1,
//       image: "/KeyHighlights/NutritionDashboard.png",
//       topic: "Nutrition Dashboard",
//       description: "The Nutrition Dashboard of Nepal",
//       link: "/nutritiondashboard"
//     },
//     {
//       id: 2,
//       image: "/KeyHighlights/NFNbanner.jpeg",
//       topic: "Jan 17 Documents",
//       description: "The documents from the 2nd Nutrition Fellowship meeting",
//       link: "/nfn2ndmeetdocs"
//     },
//     {
//       id: 3,
//       image: "/KeyHighlights/Dr. RP Bichha.jpg",
//       topic: "Dr. RP Bichha Speech",
//       description: "The speech given by Dr. RP Bichha at the 2nd Nutrition Fellowship meeting",
//       link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
//     },
//     {
//       id: 4,
//       image: "/KeyHighlights/Miriam Krantz.jpg",
//       topic: "Miriam Krantz Speech",
//       description: "The speech given by Miriam Krantz at the 2nd Nutrition Fellowship meeting",
//       link: "/miriamkrantzspeech"
//     },
//     {
//       id: 5,
//       image: "/KeyHighlights/Dr. Ramesh K Adhikari.jpg",
//       topic: "Dr. RK Adhikari Speech",
//       description: "The speech given by Dr. Ramesh K Adhikari at the 2nd Nutrition Fellowship meeting",
//       link: "/dradhikarispeech"
//     },

//   ];

//   return (
//     <div className="w-full min-h-[50vh] lg:h-screen bg-gray-50 p-4 lg:p-8 overflow-y-auto order-2 lg:order-none ">
//       <h1 className="text-xl lg:text-[22px] font-bold mb-4">Key Highlights</h1>
//       <div className="space-y-2">
//         {highlights.map((highlight) => (
//           <div
//             key={highlight.id}
//             className="bg-white rounded-lg shadow-md p-3 lg:p-4 cursor-pointer hover:shadow-lg transition-shadow"
//             onClick={() => navigate(highlight.link)}
//           >
//             <div className="flex justify-start items-center space-x-3 lg:space-x-4">
//               <img
//                 src={highlight.image}
//                 alt={highlight.topic}
//                 className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
//               />
//               <div className="h-[60px] lg:h-[75px] w-auto">
//                 <span className="text-[14px] lg:text-[16px]">{highlight.topic}</span>
//                 <p className="text-[12px] lg:text-[14px] text-gray-600">{highlight.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoverpageRight;


// import React from 'react';

// const CoverpageRight = () => {
//   const handleClick = (link) => {
//     window.location.href = link;
//   };

//   const highlights = [
//     {
//       id: 1,
//       image: "/KeyHighlights/NutritionDashboard.png",
//       topic: "Nutrition Dashboard",
//       description: "The Nutrition Dashboard of Nepal",
//       link: "https://nutrition-dashboard-vision.vercel.app/"
//     },
//     {
//       id: 2,
//       image: "/KeyHighlights/NFNbanner.jpeg",
//       topic: "Jan 17 Documents",
//       description: "The documents from the 2nd Nutrition Fellowship meeting",
//       link: "https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link"
//     },
//     {
//       id: 3,
//       image: "/KeyHighlights/Dr. RP Bichha.jpg",
//       topic: "Dr. RP Bichha Speech",
//       description: "The speech given by Dr. RP Bichha at the 2nd Nutrition Fellowship meeting",
//       link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
//     },
//     {
//       id: 4,
//       image: "/KeyHighlights/Miriam Krantz.jpg",
//       topic: "Miriam Krantz Speech",
//       description: "The speech given by Miriam Krantz at the 2nd Nutrition Fellowship meeting",
//       // Update this with actual YouTube link
//       link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
//     },
//     {
//       id: 5,
//       image: "/KeyHighlights/Dr. Ramesh K Adhikari.jpg",
//       topic: "Dr. RK Adhikari Speech",
//       description: "The speech given by Dr. Ramesh K Adhikari at the 2nd Nutrition Fellowship meeting",
//       // Update this with actual YouTube link
//       link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
//     },
//   ];

//   return (
//     <div className="w-full min-h-[50vh] lg:h-screen bg-gray-50 p-4 lg:p-8 overflow-y-auto order-2 lg:order-none">
//       <h1 className="text-xl lg:text-[22px] font-bold mb-4">Key Highlights</h1>
//       <div className="space-y-2">
//         {highlights.map((highlight) => (
//           <div
//             key={highlight.id}
//             className="bg-white rounded-lg shadow-md p-3 lg:p-4 cursor-pointer hover:shadow-lg transition-shadow group"
//             onClick={() => handleClick(highlight.link)}
//           >
//             <div className="flex justify-start items-center space-x-3 lg:space-x-4">
//               <img
//                 src={highlight.image}
//                 alt={highlight.topic}
//                 className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
//               />
//               <div className="h-[60px] lg:h-[75px] w-auto">
//                 <span className="text-[14px] lg:text-[16px] group-hover:text-blue-600 transition-colors">
//                   {highlight.topic}
//                 </span>
//                 <p className="text-[12px] lg:text-[14px] text-gray-600">{highlight.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoverpageRight;

import React from 'react';

const CoverpageRight = () => {
  const handleClick = (link) => {
    window.location.href = link;
  };

  const highlights = [
    {
      id: 1,
      image: "/KeyHighlights/NutritionDashboard.png",
      topic: "Nutrition Dashboard",
      description: "The Nutrition Dashboard of Nepal",
      link: "https://nutrition-dashboard-vision.vercel.app/"
    },
    {
      id: 2,
      image: "/KeyHighlights/NFNbanner.jpeg",
      topic: "Jan 17 Documents",
      description: "The documents from the 2nd Nutrition Fellowship meeting",
      link: "https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link"
    },
    {
      id: 3,
      image: "/KeyHighlights/Dr. RP Bichha.jpg",
      topic: "Dr. RP Bichha Speech",
      description: "The speech given by Dr. RP Bichha at the 2nd Nutrition Fellowship meeting",
      link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
    },
    {
      id: 4,
      image: "/KeyHighlights/Miriam Krantz.jpg",
      topic: "Miriam Krantz Speech",
      description: "The speech given by Miriam Krantz at the 2nd Nutrition Fellowship meeting",
      link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
    },
    {
      id: 5,
      image: "/KeyHighlights/Dr. Ramesh K Adhikari.jpg",
      topic: "Dr. RK Adhikari Speech",
      description: "The speech given by Dr. Ramesh K Adhikari at the 2nd Nutrition Fellowship meeting",
      link: "https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v"
    },
  ];

  return (
    <div className="w-full min-h-[50vh] md:min-h-0 lg:h-screen bg-gray-50 p-4 lg:p-8 overflow-y-auto 
                    order-last">
      <h1 className="text-xl lg:text-2xl font-bold mb-4">Key Highlights</h1>
      <div className="space-y-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="bg-white rounded-lg shadow-md p-3 lg:p-4 cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={() => handleClick(highlight.link)}
          >
            <div className="flex justify-start items-center space-x-3 lg:space-x-4">
              <img
                src={highlight.image}
                alt={highlight.topic}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <span className="text-sm lg:text-base font-medium group-hover:text-blue-600 transition-colors block">
                  {highlight.topic}
                </span>
                <p className="text-xs lg:text-sm text-gray-600">{highlight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverpageRight;