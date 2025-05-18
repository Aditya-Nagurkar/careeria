
import React from 'react';
import { Career } from '../utils/careerData';
import { Briefcase, Laptop, User, School } from 'lucide-react';

interface CareerCardProps {
  career: Career;
  rank: number;
  country: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, rank, country }) => {
  // Map icon string to Lucide icon component
  const getIcon = () => {
    switch(career.icon) {
      case 'briefcase':
        return <Briefcase className="h-10 w-10 text-[#603CBA]" />;
      case 'laptop':
        return <Laptop className="h-10 w-10 text-[#603CBA]" />;
      case 'user':
        return <User className="h-10 w-10 text-[#603CBA]" />;
      case 'school':
        return <School className="h-10 w-10 text-[#603CBA]" />;
      default:
        return <Briefcase className="h-10 w-10 text-[#603CBA]" />;
    }
  };

  // Get the salary for the user's country or fall back to global
  const getSalary = () => {
    return career.averageSalary[country] || career.averageSalary['Global'] || 'Salary data not available';
  };

  // Get country-specific information if available
  const getCountrySpecificInfo = () => {
    if (career.countrySpecificInfo && career.countrySpecificInfo[country]) {
      return career.countrySpecificInfo[country];
    }
    return null;
  };

  // Determine if this career is available in the user's selected country
  const isAvailableInCountry = career.countries.includes(country);
  
  // Get country-specific information
  const countryInfo = getCountrySpecificInfo();

  // Calculate match score label
  const getMatchLabel = () => {
    if (career.matchScore !== undefined) {
      if (career.matchScore >= 80) return 'Excellent Match';
      if (career.matchScore >= 60) return 'Strong Match';
      if (career.matchScore >= 40) return 'Good Match';
      return 'Potential Match';
    }
    return isAvailableInCountry ? `Match #${rank + 1}` : 'International Opportunity';
  };
  
  // Calculate match score color
  const getMatchColor = () => {
    if (career.matchScore !== undefined) {
      if (career.matchScore >= 80) return 'bg-green-100 text-green-800';
      if (career.matchScore >= 60) return 'bg-emerald-100 text-emerald-800';
      if (career.matchScore >= 40) return 'bg-blue-100 text-blue-800';
      return 'bg-purple-100 text-purple-800';
    }
    return isAvailableInCountry ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600';
  };

  return (
    <div 
      className={`career-card mb-6 animate-slide-up rounded-lg ${isAvailableInCountry ? 'border-l-4 border-[#603CBA]' : 'border-l-4 border-gray-400'}`}
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      <div className="flex items-start p-6">
        <div className="mr-4 hidden sm:block">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2 flex-col sm:flex-row">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className="sm:hidden mr-3">
                {getIcon()}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
            </div>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor()}`}>
                {getMatchLabel()}
                {career.matchScore !== undefined && ` (${career.matchScore}%)`}
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{career.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-1 text-gray-700">Education Required</h4>
              <p className="text-sm text-gray-600">{career.educationRequired}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1 text-gray-700">Salary Range ({country})</h4>
              <p className="text-sm text-gray-600">{getSalary()}</p>
            </div>
          </div>
          
          {countryInfo && (
            <div className="p-3 bg-blue-50 rounded-lg mb-4">
              <h4 className="font-medium text-blue-800 mb-1">
                Market Information for {country}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="font-medium">Demand:</span> {countryInfo.demand}
                </div>
                {countryInfo.regulations && (
                  <div className="text-sm">
                    <span className="font-medium">Regulations:</span> {countryInfo.regulations}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <h4 className="font-medium mb-1 text-gray-700">Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1 text-gray-700">Personality Traits</h4>
            <div className="flex flex-wrap gap-2">
              {career.personalityTraits.map((trait, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h4 className="font-medium mb-1 text-gray-700">Growth Outlook</h4>
                <p className="text-sm text-gray-600">{career.growthOutlook}</p>
              </div>
              
              <div className="mt-2 sm:mt-0">
                <h4 className="font-medium mb-1 text-gray-700">Available In</h4>
                <div className="flex flex-wrap gap-1">
                  {career.countries.map((countryCode) => (
                    <span 
                      key={countryCode} 
                      className={`text-xs px-2 py-1 rounded ${countryCode === country ? 'bg-[#603CBA]/20 text-[#603CBA]' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {countryCode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
