
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UserProfile } from '../utils/aiRecommendation';

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
  category: 'personality' | 'skills' | 'education';
}

const questions: Question[] = [
  {
    id: 'problem-solving',
    text: 'When solving a complex problem at work or in studies, you prefer to:',
    options: [
      { value: 'analytical', label: 'Break it down into smaller parts and analyze each systematically', trait: 'analytical' },
      { value: 'creative', label: 'Brainstorm creative solutions and experiment with new approaches', trait: 'creative' },
      { value: 'collaborative', label: 'Discuss with peers or mentors to get different perspectives', trait: 'collaborative' },
      { value: 'methodical', label: 'Follow established methods that have proven successful', trait: 'methodical' }
    ],
    category: 'personality'
  },
  {
    id: 'work-environment',
    text: 'Which work environment do you prefer?',
    options: [
      { value: 'structured', label: 'Structured with clear expectations and processes', trait: 'organized' },
      { value: 'flexible', label: 'Flexible with room for creativity and innovation', trait: 'creative' },
      { value: 'collaborative', label: 'Collaborative with lots of teamwork and discussion', trait: 'social' },
      { value: 'independent', label: 'Independent with autonomy over your work', trait: 'independent' }
    ],
    category: 'personality'
  },
  {
    id: 'decision-making',
    text: 'When making important decisions, you typically:',
    options: [
      { value: 'data', label: 'Rely on data and logic', trait: 'analytical' },
      { value: 'intuition', label: 'Trust your intuition and experience', trait: 'intuitive' },
      { value: 'consult', label: 'Consult others before deciding', trait: 'collaborative' },
      { value: 'principles', label: 'Consider your values and principles', trait: 'principled' }
    ],
    category: 'personality'
  },
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
    id: 'education',
    text: 'What is your highest level of education?',
    options: [
      { value: 'high-school', label: 'High School Diploma or GED', trait: 'high-school' },
      { value: 'associate', label: 'Associate Degree or Some College', trait: 'associate' },
      { value: 'bachelor', label: 'Bachelor\'s Degree', trait: 'bachelor' },
      { value: 'master', label: 'Master\'s Degree', trait: 'master' },
      { value: 'doctorate', label: 'Doctorate or Professional Degree', trait: 'doctorate' }
    ],
    category: 'education'
  }
];

const AssessmentPage: React.FC<AssessmentPageProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { trait: string, category: string }>>({});
  
  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion];
    const trait = question.options.find(opt => opt.value === value)?.trait || '';
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: { trait, category: question.category }
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Process answers and complete assessment
      const profile: UserProfile = {
        education: Object.entries(answers)
          .filter(([_, data]) => data.category === 'education')
          .map(([_, data]) => data.trait)[0] || '',
        personalityTraits: Object.entries(answers)
          .filter(([_, data]) => data.category === 'personality')
          .map(([_, data]) => data.trait),
        skills: Object.entries(answers)
          .filter(([_, data]) => data.category === 'skills')
          .map(([_, data]) => data.trait),
        interests: [] // This would need to be populated based on additional questions
      };
      
      onComplete(profile);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const question = questions[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;
  const progress = Math.round(((currentQuestion) / questions.length) * 100);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Career Assessment</h1>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between mb-2 text-sm text-gray-500">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
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
              className="flex items-center border border-gray-200 rounded-lg p-4 hover:border-[#603CBA]/50 transition-colors"
            >
              <RadioGroupItem 
                value={option.value} 
                id={`option-${option.value}`} 
                className="text-[#603CBA]"
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
        
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Question
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="bg-[#603CBA] hover:bg-[#4e309e] text-white"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            {currentQuestion !== questions.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
