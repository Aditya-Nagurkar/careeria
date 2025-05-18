
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UserProfile } from '../utils/aiRecommendation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import PersonalityQuestions from './PersonalityQuestions';

interface AssessmentPageProps {
  onComplete: (userProfile: UserProfile) => void;
}

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    trait: string;
  }[];
  category: 'skills' | 'specialization' | 'country' | 'interests';
}

const questions: Question[] = [
  {
    id: 'tech-comfort',
    text: 'How comfortable are you with learning new technologies?',
    options: [
      { value: 'very-comfortable', label: 'Very comfortable - I love learning new tech', trait: 'technical' },
      { value: 'comfortable', label: 'Comfortable - I can adapt when needed', trait: 'adaptable' },
      { value: 'somewhat', label: 'Somewhat comfortable - I prefer familiar tools', trait: 'practical' },
      { value: 'uncomfortable', label: 'Uncomfortable - I find new tech challenging', trait: 'traditional' }
    ],
    category: 'skills'
  },
  {
    id: 'communication',
    text: 'How would you describe your communication skills?',
    options: [
      { value: 'excellent', label: 'Excellent - I communicate clearly and persuasively', trait: 'communication' },
      { value: 'good', label: 'Good - I communicate effectively most of the time', trait: 'communication' },
      { value: 'average', label: 'Average - I get my point across', trait: 'basic-communication' },
      { value: 'needs-improvement', label: 'Needs improvement - Communication is not my strength', trait: 'technical' }
    ],
    category: 'skills'
  },
  {
    id: 'specialization',
    text: 'What field are you most interested in or specialized in?',
    options: [
      { value: 'computer-science', label: 'Computer Science & IT', trait: 'computer-science' },
      { value: 'business', label: 'Business & Management', trait: 'business' },
      { value: 'engineering', label: 'Engineering', trait: 'engineering' },
      { value: 'health-sciences', label: 'Health Sciences', trait: 'health-sciences' },
      { value: 'social-sciences', label: 'Social Sciences', trait: 'social-sciences' },
      { value: 'arts-humanities', label: 'Arts & Humanities', trait: 'arts-humanities' },
      { value: 'education', label: 'Education', trait: 'education' },
      { value: 'other', label: 'Other', trait: 'other' }
    ],
    category: 'specialization'
  },
  {
    id: 'interests',
    text: 'Which of these areas most interests you?',
    options: [
      { value: 'technology', label: 'Technology and Innovation', trait: 'technology' },
      { value: 'creativity', label: 'Creative Arts and Design', trait: 'creativity' },
      { value: 'helping', label: 'Helping and Supporting Others', trait: 'helping' },
      { value: 'analysis', label: 'Analysis and Research', trait: 'analysis' },
      { value: 'business', label: 'Business and Finance', trait: 'business' },
      { value: 'nature', label: 'Nature and Environment', trait: 'nature' }
    ],
    category: 'interests'
  },
  {
    id: 'work-style',
    text: 'Which work style do you prefer?',
    options: [
      { value: 'hands-on', label: 'Hands-on, practical work', trait: 'hands-on' },
      { value: 'analytical', label: 'Analytical, problem-solving work', trait: 'analytical' },
      { value: 'creative', label: 'Creative, expressive work', trait: 'creative' },
      { value: 'service', label: 'Service-oriented, helping others', trait: 'service' },
      { value: 'leadership', label: 'Leadership, guiding teams', trait: 'leadership' }
    ],
    category: 'interests'
  },
  {
    id: 'country',
    text: 'Which country are you based in?',
    options: [
      { value: 'United States', label: 'United States', trait: 'United States' },
      { value: 'United Kingdom', label: 'United Kingdom', trait: 'United Kingdom' },
      { value: 'Canada', label: 'Canada', trait: 'Canada' },
      { value: 'Australia', label: 'Australia', trait: 'Australia' },
      { value: 'India', label: 'India', trait: 'India' },
      { value: 'Germany', label: 'Germany', trait: 'Germany' },
      { value: 'France', label: 'France', trait: 'France' },
      { value: 'Other', label: 'Other', trait: 'Other' }
    ],
    category: 'country'
  }
];

// Reorder questions so specialization comes before country
const reorderedQuestions = [...questions];

const AssessmentPage: React.FC<AssessmentPageProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { trait: string, category: string }>>({});
  const [showPersonalityQuestions, setShowPersonalityQuestions] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  
  const handleAnswer = (value: string) => {
    const question = reorderedQuestions[currentStep];
    const selectedOption = question.options.find(opt => opt.value === value);
    
    if (selectedOption) {
      const trait = selectedOption.trait;
      
      setAnswers(prev => ({
        ...prev,
        [question.id]: { trait, category: question.category }
      }));
    }
  };

  const nextQuestion = () => {
    if (currentStep < reorderedQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show personality questions as the final step
      setShowPersonalityQuestions(true);
    }
  };
  
  const handlePersonalityComplete = (traits: string[]) => {
    setPersonalityTraits(traits);
    
    // Process all answers and complete assessment
    const profile: UserProfile = {
      education: 'bachelor', // Default value since we removed education questions
      specialization: Object.entries(answers)
        .filter(([_, data]) => data.category === 'specialization')
        .map(([_, data]) => data.trait)[0] || '',
      personalityTraits: traits,
      skills: Object.entries(answers)
        .filter(([_, data]) => data.category === 'skills')
        .map(([_, data]) => data.trait),
      interests: Object.entries(answers)
        .filter(([_, data]) => data.category === 'interests')
        .map(([_, data]) => data.trait),
      country: Object.entries(answers)
        .filter(([_, data]) => data.category === 'country')
        .map(([_, data]) => data.trait)[0] || 'United States'
    };
    
    onComplete(profile);
  };
  
  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // If showing personality questions
  if (showPersonalityQuestions) {
    return <PersonalityQuestions onComplete={handlePersonalityComplete} />;
  }
  
  const question = reorderedQuestions[currentStep];
  const isAnswered = answers[question.id] !== undefined;
  const progress = Math.round((currentStep / reorderedQuestions.length) * 100);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Career Assessment</h1>
        <p className="text-gray-600 mt-2">Let's find the perfect career match for you</p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between mb-2 text-sm text-gray-500">
          <span>Question {currentStep + 1} of {reorderedQuestions.length}</span>
          <span>{progress}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-8">
          <div 
            className="bg-[#603CBA] h-full transition-all duration-300 ease-out" 
            style={{width: `${progress}%`}}
          />
        </div>
        
        <h2 className="text-xl font-medium text-gray-800 mb-6">{question.text}</h2>
        
        <RadioGroup 
          value={answers[question.id]?.trait ? 
            question.options.find(opt => opt.trait === answers[question.id].trait)?.value || '' : 
            ''}
          onValueChange={handleAnswer}
          className="space-y-4"
        >
          {question.options.map((option) => (
            <div 
              key={option.value} 
              className="flex items-center border border-gray-200 rounded-lg p-4 hover:border-[#603CBA]/50 transition-colors cursor-pointer"
              onClick={() => handleAnswer(option.value)}
            >
              <RadioGroupItem 
                value={option.value} 
                id={`option-${option.value}`} 
                className="text-[#603CBA] cursor-pointer"
              />
              <Label 
                htmlFor={`option-${option.value}`} 
                className="ml-3 cursor-pointer w-full font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentStep === 0}
            className="flex items-center justify-center gap-1 w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Question</span>
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="flex items-center justify-center gap-1 w-full sm:w-auto bg-[#603CBA] hover:bg-[#4e309e]"
          >
            <span>Next Question</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
