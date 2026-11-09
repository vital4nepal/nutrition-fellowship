import React, { useState } from 'react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('value');

  const pillars = ["Celebrate", "Convene", "Coach", "Collaborate", "Connect"];

  return (
    <div className="w-full mt-5 mx-auto p-8 bg-gray-100 rounded-lg shadow-lg" id='aboutus'>
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setActiveTab('value')} className={`px-4 py-2 ${activeTab === 'value' ? 'font-bold' : ''}`}>Value Proposition</button>
        <button onClick={() => setActiveTab('vision')} className={`px-4 py-2 ${activeTab === 'vision' ? 'font-bold' : ''}`}>Our Vision</button>
      </div>

      <div className="flex flex-row items-center">
        <div>
          {activeTab === 'value' && <p className="text-left text-[#265728] text-2xl mr-20">Our Value Proposition</p>}
          {activeTab === 'vision' && <p className='text-left text-[#265728] text-[25px]'>"No Nepali is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition"</p> }
        </div>
        
        <div className="w-2/3 p-6 rounded-lg shadow-md">
          {activeTab === 'value' && (
            <div className="text-center">
              <p className="text-lg leading-relaxed">
                We unite three generations of stakeholders from Nepal and around the world—combining experience, innovation, and passion to accelerate the fight against undernutrition in Nepal.
              </p>
              <p className="text-lg leading-relaxed">
                Through this fellowship, we foster meaningful connections, convene diverse perspectives, and promote transformative collaboration.
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl leading-relaxed mb-8">"Bound by purpose, United for Nutrition: A fellowship to Nourish Generations"</p>
              </div>
              
              <div className="text-center font-bold">
                <div className="relative w-64 h-64 flex items-center justify-center mx-auto">
                  <img src="/nutrition_logo333.png" alt="Nutrition Logo" className="absolute w-22 h-20" />
                  {pillars.map((pillar, index) => (
                    <div
                      key={index}
                      className="absolute w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full text-sm"
                      style={{ transform: `rotate(${index * 72}deg) translate(100px) rotate(-${index * 72}deg)` }}
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
  );
};

export default AboutUs;

