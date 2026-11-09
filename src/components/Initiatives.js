import React from 'react';

const Initiatives = () => {
  return (
    <div className="text-center my-16 mx-5" id="initiatives">
      <h2 className="text-lg lg:text-xl font-bold mb-6">PROJECTS AND INITIATIVES</h2>
      <div className="flex flex-wrap justify-around items-center gap-6">
        {[ 
          { title: 'GEN-N INITIATIVES', img: '/Initiatives/Gen-N.png', link: 'https://drive.google.com/drive/folders/1_PZuUUcI1jwHlIVtsgN01VcXAdH8B8PO?usp=drive_link' },
          { title: 'ADVOCACY AND CAMPAIGNS', img: '/Initiatives/Advocacy.png', link: 'https://example.com/advocacy' },
          { title: 'TECHNOLOGY IN NUTRITION', img: '/Initiatives/TechInNut.png', link: 'https://example.com/technology' }
        ].map((item, index) => (
          <div key={index} className="bg-[#bad8bb] text-[#265728] p-6 text-center w-44 h-44 flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105 border border-[grey]">
            <img src={item.img} alt={item.title} className="w-16 h-16 mb-3" />
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-base font-semibold leading-relaxed transition-transform hover:underline"
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
