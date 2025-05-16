
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#603CBA] py-4 px-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-white">Careeria</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-purple-200 transition-colors">
              Home
            </Link>
            <Link to="/" className="text-white hover:text-purple-200 transition-colors">
              About
            </Link>
            <Link to="/" className="text-white hover:text-purple-200 transition-colors">
              Careers
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
