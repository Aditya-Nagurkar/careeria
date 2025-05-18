
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
  },
  {
    id: 'leadership',
    text: 'In a leadership role, I am likely to:',
    options: [
      { value: 'delegate', label: 'Delegate tasks and trust others to complete them', trait: 'trusting' },
      { value: 'hands-on', label: 'Be hands-on and closely monitor progress', trait: 'detail-oriented' },
      { value: 'coach', label: 'Coach and develop team members', trait: 'empathetic' }
    ]
  },
  {
    id: 'learning',
    text: 'When learning something new, I prefer to:',
    options: [
      { value: 'practical-learning', label: 'Learn by doing and practicing', trait: 'practical' },
      { value: 'theory', label: 'Understand the theory and concepts first', trait: 'analytical' },
      { value: 'observe', label: 'Watch others and then try it myself', trait: 'observant' }
    ]
  },
  {
    id: 'feedback',
    text: 'When receiving feedback, I typically:',
    options: [
      { value: 'open', label: 'Welcome it as an opportunity to improve', trait: 'growth-oriented' },
      { value: 'defensive', label: 'Need time to process before accepting it', trait: 'reflective' },
      { value: 'specific', label: 'Prefer specific examples I can work with', trait: 'practical' }
    ]
  },
  {
    id: 'change',
    text: 'When facing major changes, I usually:',
    options: [
      { value: 'embrace', label: 'Embrace and look for opportunities', trait: 'adaptable' },
      { value: 'resist', label: 'Prefer stability and predictability', trait: 'stable' },
      { value: 'analyze', label: 'Analyze the implications before adapting', trait: 'analytical' }
    ]
  },
  {
    id: 'success',
    text: 'I define success primarily as:',
    options: [
      { value: 'achievement', label: 'Achieving goals and recognition', trait: 'achievement-oriented' },
      { value: 'balance', label: 'Finding balance and satisfaction', trait: 'balanced' },
      { value: 'growth', label: 'Learning and growing continuously', trait: 'growth-oriented' }
    ]
  },
  {
    id: 'conflict',
    text: 'When facing conflict in a team, I tend to:',
    options: [
      { value: 'mediate', label: 'Step in and help find common ground', trait: 'diplomatic' },
      { value: 'avoid', label: 'Try to avoid confrontation when possible', trait: 'peaceful' },
      { value: 'address', label: 'Address issues directly and honestly', trait: 'straightforward' }
    ]
  },
  {
    id: 'motivation',
    text: 'What motivates me most in my work is:',
    options: [
      { value: 'recognition', label: 'Recognition and advancement opportunities', trait: 'ambitious' },
      { value: 'meaningful', label: 'Doing something meaningful and valuable', trait: 'purpose-driven' },
      { value: 'security', label: 'Stability and security', trait: 'security-focused' }
    ]
  },
  {
    id: 'time-management',
    text: 'When managing my time, I typically:',
    options: [
      { value: 'structured', label: 'Follow a structured schedule', trait: 'organized' },
      { value: 'flexible', label: 'Keep my schedule flexible and adapt as needed', trait: 'adaptable' },
      { value: 'urgent', label: 'Focus on what seems most urgent first', trait: 'responsive' }
    ]
  },
  {
    id: 'teamwork',
    text: 'In a team project, I typically:',
    options: [
      { value: 'lead', label: 'Take the lead and drive the work forward', trait: 'leader' },
      { value: 'support', label: 'Support others and help where needed', trait: 'supportive' },
      { value: 'specialist', label: 'Focus on my specialized part of the work', trait: 'specialist' }
    ]
  },
  {
    id: 'risk',
    text: 'When it comes to taking risks, I am:',
    options: [
      { value: 'calculated', label: 'Willing to take calculated risks', trait: 'strategic' },
      { value: 'cautious', label: 'Cautious and prefer safer options', trait: 'conservative' },
      { value: 'bold', label: 'Comfortable with bold moves and uncertainty', trait: 'adventurous' }
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
    
    // Auto-advance to next question after selection
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Convert answers to traits array
      const traits = Object.values(answers).filter(Boolean);
      traits.push(trait); // Add the last answer
      onComplete(traits);
    }
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
            onClick={() => handleAnswer(option.value)}
          >
            <RadioGroupItem value={option.value} id={`option-${option.value}`} className="cursor-pointer" />
            <Label 
              htmlFor={`option-${option.value}`} 
              className="ml-3 cursor-pointer w-full font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-6 flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1 flex-1 sm:flex-none"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>
    </div>
  );
};

export default PersonalityQuestions;
