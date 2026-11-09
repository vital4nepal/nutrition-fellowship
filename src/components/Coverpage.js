// import React from 'react';

// const Coverpage = () => {
//   return (
//     <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-[#f9f9f9] flex flex-col items-center justify-between py-8">
//       {/* Top Section with Collaborate */}
//       <div className="w-full flex justify-center mt-4">
//         <PillarButton text="Collaborate" />
//       </div>

//       {/* Middle Section with Logo and Other Pillars */}
//       <div className="relative w-full flex-1 my-8 pb-16 sm:pb-20 md:pb-24"> {/* Added padding bottom for spacing */}
//         {/* Logo */}
//         <img 
//           src="/nutrition_logo333.png" 
//           alt="Logo" 
//           className="absolute w-40 md:w-64 lg:w-80 h-auto object-contain z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//         />
        
//         {/* Side Pillars */}
//         <div className="absolute left-[10%] top-[60%] -translate-x-1/2 -translate-y-1/2">
//           <PillarButton text="Convene" />
//         </div>
        
//         <div className="absolute left-[25%] top-[30%] -translate-x-1/2 -translate-y-1/2">
//           <PillarButton text="Celebrate" />
//         </div>
        
//         <div className="absolute right-[25%] top-[30%] translate-x-1/2 -translate-y-1/2">
//           <PillarButton text="Connect" />
//         </div>
        
//         <div className="absolute right-[10%] top-[60%] translate-x-1/2 -translate-y-1/2">
//           <PillarButton text="Coach" />
//         </div>
//       </div>

//       {/* Bottom Tagline with increased spacing */}
//       <div className="w-full text-center px-4 mt-8 sm:mt-12 md:mt-16"> {/* Added margin top for spacing */}
//         <p className="text-sm md:text-lg lg:text-xl text-[#135127] font-bold italic max-w-2xl mx-auto">
//           "Bound by Purpose, United for Nutrition : A Fellowship to Nourish Generations"
//         </p>
//       </div>
//     </div>
//   );
// };

// // Separate component for pillar buttons to maintain consistency
// const PillarButton = ({ text }) => (
//   <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl font-bold text-[#135127] hover:bg-[#BAD8BB] transition-colors cursor-pointer">
//     {text}
//   </div>
// );

// export default Coverpage;

import React, { useState, useEffect } from 'react';

const Coverpage = () => {
  // State for left slider
  const [leftCurrentSlide, setLeftCurrentSlide] = useState(0);
  // State for right slider
  const [rightCurrentSlide, setRightCurrentSlide] = useState(0);

  // Left side content
  const leftSlides = [
    {
      title: "Our Pillars",
      content: (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl font-bold text-[#135127] mb-4">The 5 Cs</div>
          <div className="grid grid-cols-2 gap-4">
            <PillarButton text="Convene" />
            <PillarButton text="Celebrate" />
            <PillarButton text="Collaborate" />
            <PillarButton text="Connect" />
            <PillarButton text="Coach" className="col-span-2 mx-auto" />
          </div>
        </div>
      )
    },
    {
      title: "Vision",
      content: (
        <div className="flex flex-col items-center p-6">
          <h2 className="text-2xl font-bold text-[#135127] mb-4">Our Vision</h2>
          <p className="text-center text-lg">
          <p>“NO NEPALI IS DEPRIVED OF RIGHT</p>
          <p>TO BE FREE FROM</p>
          <p>UNDERNUTRITION AND SUFFER FROM</p>
          <p>ILLS EFFCT OF</p>
          <p>OVERNUTRITION"</p>
          </p>
        </div>
      )
    },
    {
      title: "About Us",
      content: (
        <div className="flex flex-col items-center p-6">
          <h2 className="text-2xl font-bold text-[#135127] mb-4">About Us</h2>
          <p className="text-center text-lg">
          We unite three generations of stakeholders from Nepal and around the world—combining experience, innovation, and passion to accelerate the fight against undernutrition in Nepal.
          Through this fellowship, we foster meaningful connections, convene diverse perspectives, and promote transformative collaboration.
          </p>
        </div>
      )
    }
  ];

  // Right side images
  const rightSlides = [
    "/1remembering.jpeg",
    "/2spotlight.jpeg",
    "/2spotlight.jpeg",
    "/4interaction.jpeg",
    "/5generations.jpeg"
  ];

  // Auto-slide functionality for both sections
  useEffect(() => {
    const timer = setInterval(() => {
      setLeftCurrentSlide((prev) => (prev + 1) % leftSlides.length);
      setRightCurrentSlide((prev) => (prev + 1) % rightSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Navigation functions
  const goToSlide = (side, index) => {
    if (side === 'left') {
      setLeftCurrentSlide(index);
    } else {
      setRightCurrentSlide(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-[#f9f9f9]">
        <div className="h-full relative">
          {/* Content */}
          <div className="h-full flex items-center justify-center p-6">
            <div className="transition-opacity duration-1000">
              {leftSlides[leftCurrentSlide].content}
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {leftSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide('left', index)}
                className={`w-3 h-3 rounded-full ${
                  index === leftCurrentSlide ? 'bg-[#135127]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
        {/* Images */}
        <div className="h-full relative overflow-hidden">
          {rightSlides.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === rightCurrentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {rightSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide('right', index)}
                className={`w-3 h-3 rounded-full ${
                  index === rightCurrentSlide ? 'bg-white' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pillar Button Component
const PillarButton = ({ text, className = "" }) => (
  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center 
    text-base md:text-lg font-bold text-[#135127] bg-white hover:bg-gray-100 
    transition-colors cursor-pointer shadow-md ${className}`}>
    {text}
  </div>
);

export default Coverpage;


// import React, { useState, useEffect } from 'react';

// const Coverpage = () => {
//   const [currentContentSlide, setCurrentContentSlide] = useState(0);
//   const [currentImageSlide, setCurrentImageSlide] = useState(0);

//   // Content slides
//   const contentSlides = [
//     {
//       title: "Our Pillars",
//       content: (
//         <div className="flex flex-col items-center space-y-4">
//           <div className="text-xl font-bold text-[#135127] mb-4">The 5 Cs</div>
//           <div className="grid grid-cols-2 gap-4">
//             <PillarButton text="Convene" />
//             <PillarButton text="Celebrate" />
//             <PillarButton text="Collaborate" />
//             <PillarButton text="Connect" />
//             <PillarButton text="Coach" className="col-span-2 mx-auto" />
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Vision",
//       content: (
//         <div className="flex flex-col items-center p-6">
//           <h2 className="text-2xl font-bold text-[#135127] mb-4">Our Vision</h2>
//           <p className="text-center text-lg">
//           <p>"NO NEPALI IS DEPRIVED OF RIGHT</p>
//           <p>TO BE FREE FROM</p>
//           <p>UNDERNUTRITION AND SUFFER FROM</p>
//           <p>ILLS EFFCT OF</p>
//           <p>OVERNUTRITION"</p>
//           </p>
//         </div>
//       )
//     },
//     {
//       title: "About Us",
//       content: (
//         <div className="flex flex-col items-center p-6">
//           <h2 className="text-2xl font-bold text-[#135127] mb-4">About Us</h2>
//           <p className="text-center text-lg">
//           We unite three generations of stakeholders from Nepal and around the world—combining experience, innovation, and passion to accelerate the fight against undernutrition in Nepal.
//           Through this fellowship, we foster meaningful connections, convene diverse perspectives, and promote transformative collaboration.
//           </p>
//         </div>
//       )
//     }
//   ];

//   // Image slides
//   const imageSlides = [
//     "/1remembering.jpeg",
//     "/2spotlight.jpeg",
//     "/2spotlight.jpeg",
//     "/4interaction.jpeg",
//     "/5generations.jpeg"
//   ];

//   // Auto-slide functionality
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentContentSlide((prev) => (prev + 1) % contentSlides.length);
//       setCurrentImageSlide((prev) => (prev + 1) % imageSlides.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const goToSlide = (section, index) => {
//     if (section === 'content') {
//       setCurrentContentSlide(index);
//     } else {
//       setCurrentImageSlide(index);
//     }
//   };

//   return (
//     <div className="snap-y snap-mandatory h-screen overflow-y-auto">
//       {/* First Screen - Images */}
//       <div className="h-screen w-full snap-start relative">
//         {imageSlides.map((img, index) => (
//           <div
//             key={index}
//             className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
//               index === currentImageSlide ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img
//               src={img}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
        
//         {/* Image Navigation Dots */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {imageSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide('image', index)}
//               className={`w-3 h-3 rounded-full ${
//                 index === currentImageSlide ? 'bg-white' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Second Screen - Content */}
//       <div className="h-screen w-full snap-start relative bg-[#f9f9f9]">
//         <div className="h-full relative">
//           {/* Content */}
//           <div className="h-full flex items-center justify-center p-6">
//             <div className="transition-opacity duration-1000">
//               {contentSlides[currentContentSlide].content}
//             </div>
//           </div>
          
//           {/* Content Navigation Dots */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {contentSlides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide('content', index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentContentSlide ? 'bg-[#135127]' : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Pillar Button Component
// const PillarButton = ({ text, className = "" }) => (
//   <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center 
//     text-base md:text-lg font-bold text-[#135127] bg-white hover:bg-gray-100 
//     transition-colors cursor-pointer shadow-md ${className}`}>
//     {text}
//   </div>
// );

// export default Coverpage;