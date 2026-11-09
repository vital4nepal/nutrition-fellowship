import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#265728] border-b border-orange-100 h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-center items-center gap-2 h-full">
          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center justify-center space-x-12">
            <a 
              href="/" 
              className="text-white text-[14px] hover:text-[16px] duration-200"
            >
              HOME
            </a>
            <a 
              href="#aboutus" 
              className="text-white text-[14px] hover:text-[16px] transition-all duration-200"
            >
              ABOUT US
            </a>
            <a 
              href="#initiatives" 
              className="text-white text-[14px] hover:text-[16px] transition-all duration-200"
            >
              PROJECTS AND INITIATIVES
            </a>
            <a 
              href="#documents" 
              className="text-white text-[14px] hover:text-[16px] transition-all duration-200"
            >
              RESOURCES
            </a>
            <a 
              href="#events" 
              className="text-white text-[14px] hover:text-[16px] transition-all duration-200"
            >
              EVENTS AND UPDATES
            </a>
            <a 
              href="#thoughts" 
              className="text-white text-[14px] hover:text-[16px] transition-all duration-200"
            >
              CONTACT US
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-orange-50 shadow-lg">
            <a
              href="/"
              className="block px-3 py-2 text-green-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              Home
            </a>
            <a
              href="#aboutus"
              className="block px-3 py-2 text-gray-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              About Us
            </a>
            <a
              href="#documents"
              className="block px-3 py-2 text-gray-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              Resources
            </a>
            <a
              href="#events"
              className="block px-3 py-2 text-gray-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              Events and Updates
            </a>
            <a
              href="#initiatives"
              className="block px-3 py-2 text-gray-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              Initiatives
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 text-[14px] hover:text-[16px] transition-all duration-200 rounded-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
