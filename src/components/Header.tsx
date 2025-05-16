
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-career-primary" />
          <span className="text-xl font-semibold text-career-dark dark:text-gray-100">CareerAI</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-career-primary dark:hover:text-career-primary transition-colors">
            Home
          </Link>
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-career-primary dark:hover:text-career-primary transition-colors">
            About
          </Link>
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-career-primary dark:hover:text-career-primary transition-colors">
            Resources
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className="bg-career-primary hover:bg-career-accent text-white px-4 py-2 rounded-md transition-colors hidden sm:block"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
