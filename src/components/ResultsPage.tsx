
import React from 'react';
import { Career } from '../utils/careerData';
import CareerCard from './CareerCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserProfile } from '../utils/aiRecommendation';

interface ResultsPageProps {
  careers: Career[];
  userProfile: UserProfile;
  onStartOver: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ careers, userProfile, onStartOver }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="bg-white dark:bg-card rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-career-dark dark:text-gray-100 mb-4">Your Career Matches</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Based on your education level, personality traits, skills, and interests, 
          here are the careers that best match your profile:
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Your Profile Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Education:</span>{' '}
              {educationLabel(userProfile.education)}
            </div>
            <div>
              <span className="font-medium">Skills:</span>{' '}
              {userProfile.skills.map((skill, i) => (
                <span key={i} className="mr-1">
                  {formatSkillLabel(skill)}{i < userProfile.skills.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
            <div>
              <span className="font-medium">Personality:</span>{' '}
              {userProfile.personalityTraits.map((trait, i) => (
                <span key={i} className="mr-1">
                  {formatTraitLabel(trait)}{i < userProfile.personalityTraits.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
            <div>
              <span className="font-medium">Interests:</span>{' '}
              {userProfile.interests.map((interest, i) => (
                <span key={i} className="mr-1">
                  {interest}{i < userProfile.interests.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={onStartOver}
          className="mb-6 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Start Over
        </Button>
      </div>
      
      <div className="space-y-6">
        {careers.map((career, index) => (
          <CareerCard key={career.id} career={career} rank={index} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Not seeing what you're looking for? Try adjusting your profile or exploring more options.
        </p>
        <Button
          onClick={onStartOver}
          variant="outline"
          className="mx-auto"
        >
          Start a New Assessment
        </Button>
      </div>
    </div>
  );
};

// Helper functions
const educationLabel = (value: string): string => {
  const map: {[key: string]: string} = {
    'high-school': 'High School Diploma',
    'associate': 'Associate Degree',
    'bachelor': 'Bachelor\'s Degree',
    'master': 'Master\'s Degree',
    'doctorate': 'Doctorate or Professional Degree'
  };
  return map[value] || value;
};

const formatTraitLabel = (value: string): string => {
  return value.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const formatSkillLabel = (value: string): string => {
  return value.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export default ResultsPage;
