
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#603CBA] py-4 px-4">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xl">C</span>
          </div>
          <span className="text-xl font-bold text-white">Careeria</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
