
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-8 mt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-career-dark dark:text-gray-100">CareerAI</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Guiding your career journey with AI-powered recommendations tailored to your personality, skills, and education.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-career-dark dark:text-gray-100">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-career-primary dark:hover:text-career-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-career-primary dark:hover:text-career-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-career-primary dark:hover:text-career-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-career-primary dark:hover:text-career-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-career-dark dark:text-gray-100">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Have questions or feedback?
            </p>
            <Link
              to="/"
              className="inline-block bg-career-primary hover:bg-career-accent text-white px-4 py-2 rounded-md transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
