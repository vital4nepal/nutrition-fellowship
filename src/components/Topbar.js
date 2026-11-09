import React from 'react';
import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="bg-white py-0 px-2 sm:px-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo - Made smaller on mobile */}
          <div className="flex items-center">
            <img src="/nutrition_logo333.png" alt="Nutrition Logo" className="h-10 w-auto sm:h-16 md:h-20" />
          </div>

          {/* Right side content - Adjusted for mobile */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {/* Social Media Links */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61572729923914" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <a href="https://www.instagram.com/nutfellowship/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Instagram size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <a href="https://x.com/nutfellowship" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
            </div>
            
            {/* Vertical Separator */}
            <div className="h-4 w-px bg-gray-300 sm:h-5"></div>
            
            {/* Email - Hidden text on very small screens */}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nutfellowship@gmail.com" className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Mail size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="hidden xs:inline text-xs sm:text-sm">nutfellowship@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
