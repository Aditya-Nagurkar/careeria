
import React from 'react';
import { Career } from '../utils/careerData';
import { Briefcase, Laptop, User, School } from 'lucide-react';

interface CareerCardProps {
  career: Career;
  rank: number;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, rank }) => {
  // Map icon string to Lucide icon component
  const getIcon = () => {
    switch(career.icon) {
      case 'briefcase':
        return <Briefcase className="h-10 w-10 text-career-primary" />;
      case 'laptop':
        return <Laptop className="h-10 w-10 text-career-primary" />;
      case 'user':
        return <User className="h-10 w-10 text-career-primary" />;
      case 'school':
        return <School className="h-10 w-10 text-career-primary" />;
      default:
        return <Briefcase className="h-10 w-10 text-career-primary" />;
    }
  };

  return (
    <div className="career-card mb-6 animate-slide-up" style={{ animationDelay: `${rank * 100}ms` }}>
      <div className="flex items-start">
        <div className="mr-4">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-career-dark dark:text-white">{career.title}</h3>
            <span className="bg-career-light dark:bg-gray-800 text-career-primary px-3 py-1 rounded-full text-sm font-medium">
              Match #{rank + 1}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{career.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Education Required</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{career.educationRequired}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Salary Range</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{career.averageSalary}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Personality Traits</h4>
            <div className="flex flex-wrap gap-2">
              {career.personalityTraits.map((trait, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-1 text-gray-700 dark:text-gray-200">Growth Outlook</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{career.growthOutlook}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
