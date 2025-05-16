
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PersonalityQuestionsProps {
  onComplete: (traits: string[]) => void;
}

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    trait: string;
  }[];
}

const personalityQuestions: Question[] = [
  {
    id: 'work-environment',
    text: 'In a work environment, I prefer to:',
    options: [
      { value: 'collaborate', label: 'Work closely with others in a team', trait: 'collaborative' },
      { value: 'independent', label: 'Work independently with minimal supervision', trait: 'independent' },
      { value: 'mix', label: 'A mix of collaborative and independent work', trait: 'adaptable' }
    ]
  },
  {
    id: 'decision-making',
    text: 'When making important decisions, I typically:',
    options: [
      { value: 'analytical', label: 'Analyze all data and facts before deciding', trait: 'analytical' },
      { value: 'intuitive', label: 'Trust my intuition and go with my gut feeling', trait: 'intuitive' },
      { value: 'consult', label: 'Consult with others to get different perspectives', trait: 'collaborative' }
    ]
  },
  {
    id: 'problem-solving',
    text: 'When faced with a complex problem, I prefer to:',
    options: [
      { value: 'creative', label: 'Find creative, unique solutions', trait: 'creative' },
      { value: 'systematic', label: 'Use proven, methodical approaches', trait: 'detail-oriented' },
      { value: 'practical', label: 'Focus on practical, efficient solutions', trait: 'practical' }
    ]
  },
  {
    id: 'stress',
    text: 'Under stress or tight deadlines, I typically:',
    options: [
      { value: 'calm', label: 'Stay calm and maintain focus', trait: 'resilient' },
      { value: 'adapt', label: 'Adapt quickly to changing priorities', trait: 'adaptable' },
      { value: 'organize', label: 'Create a structured plan to tackle the challenge', trait: 'organized' }
    ]
  },
  {
    id: 'communication',
    text: 'My preferred communication style is:',
    options: [
      { value: 'direct', label: 'Direct and to the point', trait: 'assertive' },
      { value: 'diplomatic', label: 'Diplomatic and considerate', trait: 'empathetic' },
      { value: 'detailed', label: 'Thorough and detailed', trait: 'detail-oriented' }
    ]
  }
];

const PersonalityQuestions: React.FC<PersonalityQuestionsProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const handleAnswer = (value: string) => {
    const question = personalityQuestions[currentQuestion];
    const trait = question.options.find(opt => opt.value === value)?.trait || '';
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: trait
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Convert answers to traits array
      const traits = Object.values(answers).filter(Boolean);
      onComplete(traits);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const question = personalityQuestions[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;
  
  return (
    <div className="space-y-6 animate-fade-in bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Question {currentQuestion + 1} of {personalityQuestions.length}</span>
        <span>{Math.round(((currentQuestion + 1) / personalityQuestions.length) * 100)}% complete</span>
      </div>
      
      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out" 
          style={{width: `${((currentQuestion + 1) / personalityQuestions.length) * 100}%`}}
        />
      </div>
      
      <h3 className="text-xl font-medium text-gray-800 mt-4">{question.text}</h3>
      
      <RadioGroup 
        value={answers[question.id] ? question.options.find(opt => opt.trait === answers[question.id])?.value : ''} 
        onValueChange={handleAnswer}
        className="space-y-3 mt-4"
      >
        {question.options.map((option) => (
          <div 
            key={option.value} 
            className="flex items-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-colors"
          >
            <RadioGroupItem value={option.value} id={`option-${option.value}`} />
            <Label 
              htmlFor={`option-${option.value}`} 
              className="ml-3 cursor-pointer w-full font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-6 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button
          type="button"
          onClick={nextQuestion}
          disabled={!isAnswered}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {currentQuestion === personalityQuestions.length - 1 ? 'Complete' : 'Next'}
          {currentQuestion !== personalityQuestions.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default PersonalityQuestions;
