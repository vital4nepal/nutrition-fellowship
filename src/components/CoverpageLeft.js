import React, { useState, useEffect } from 'react';

const CombinedCoverAbout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('value');
  
  const images = [
    "/ImageSlider/5generations.jpeg",
    "/ImageSlider/Cover-collage.png",
  ];

  const pillars = ["Celebrate", "Convene", "Coach", "Collaborate", "Connect"];

  const totalSlides = images.length + 1; // +1 for AboutUs section

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [totalSlides]);

  const AboutUsContent = () => (
    <div className="w-full h-screen flex items-center p-4 md:p-8">
      <div className="w-full bg-gray-100 rounded-lg shadow-lg p-4 md:p-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('value')} 
            className={`px-4 py-2 ${activeTab === 'value' ? 'font-bold' : ''}`}
          >
            Value Proposition
          </button>
          <button 
            onClick={() => setActiveTab('vision')} 
            className={`px-4 py-2 ${activeTab === 'vision' ? 'font-bold' : ''}`}
          >
            Our Vision
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3">
            {activeTab === 'value' && 
              <p className="text-left text-[#265728] text-xl md:text-2xl">
                Our Value Proposition
              </p>
            }
            {activeTab === 'vision' && 
              <p className="text-left text-[#265728] text-xl md:text-2xl">
                "No Nepali is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition"
              </p>
            }
          </div>
          
          <div className="w-full md:w-2/3 p-4 md:p-6 rounded-lg shadow-md">
            {activeTab === 'value' && (
              <div className="text-center">
                <p className="text-md md:text-lg leading-relaxed">
                  We unite three generations of stakeholders from Nepal and around the world—combining experience, innovation, and passion to accelerate the fight against undernutrition in Nepal.
                </p>
                <p className="text-md md:text-lg leading-relaxed">
                  Through this fellowship, we foster meaningful connections, convene diverse perspectives, and promote transformative collaboration.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-6 md:space-y-8">
                <div className="text-center">
                  <p className="text-lg md:text-xl leading-relaxed mb-4 md:mb-8">
                    "Bound by purpose, United for Nutrition: A fellowship to Nourish Generations"
                  </p>
                </div>
                <div className="text-center font-bold">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mx-auto">
                    <img src="/nutrition_logo333.png" alt="Nutrition Logo" className="absolute w-16 h-16 md:w-22 md:h-20" />
                    {pillars.map((pillar, index) => (
                      <div
                        key={index}
                        className="absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-300 rounded-full text-xs md:text-sm"
                        style={{ 
                          transform: `rotate(${index * 72}deg) translate(80px) rotate(-${index * 72}deg)` 
                        }}
                      >
                        {pillar}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
            currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        <AboutUsContent />
      </div>

      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index + 1 === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-auto h-auto max-w-full max-h-full object-contain mx-auto"
          />
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          className={`w-3 h-3 rounded-full ${
            currentSlide === 0 ? 'bg-[#265728]' : 'bg-[#265728]/50'
          }`}
          onClick={() => setCurrentSlide(0)}
        />
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index + 1 === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default CombinedCoverAbout;
