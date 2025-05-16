import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { educationLevels, skillCategories } from '../utils/careerData';
import { UserProfile } from '../utils/aiRecommendation';
import PersonalityQuestions from './PersonalityQuestions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AssessmentFormProps {
  onComplete: (userProfile: UserProfile) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>({
    education: '',
    personalityTraits: [],
    skills: [],
    interests: [],
    country: 'United States' // Default country
  });
  
  const steps = [
    { title: 'Education', description: 'Tell us about your educational background' },
    { title: 'Personality', description: 'Answer questions about your work preferences' },
    { title: 'Skills', description: 'What skills do you have or want to develop?' },
    { title: 'Location', description: 'Where are you located?' },
    { title: 'Interests', description: 'What topics or fields interest you?' }
  ];
  
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'India', 'Japan', 'China', 'Brazil',
    'Mexico', 'South Africa', 'Russia', 'Italy', 'Spain'
  ];
  
  const handleEducationChange = (value: string) => {
    setFormData(prev => ({ ...prev, education: value }));
  };
  
  const handlePersonalityComplete = (traits: string[]) => {
    setFormData(prev => ({ ...prev, personalityTraits: traits }));
    nextStep();
  };
  
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: skills };
    });
  };
  
  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };
  
  const handleInterestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const interests = e.target.value.split(',').map(i => i.trim()).filter(i => i !== '');
    setFormData(prev => ({ ...prev, interests }));
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const isNextDisabled = () => {
    switch (currentStep) {
      case 0:
        return !formData.education;
      case 2:
        return formData.skills.length === 0;
      case 3:
        return !formData.country;
      case 4:
        return formData.interests.length === 0;
      default:
        return false;
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-4">
              <Label className="text-base">What is your highest level of education?</Label>
              <RadioGroup 
                value={formData.education} 
                onValueChange={handleEducationChange}
                className="space-y-3"
              >
                {educationLevels.map(level => (
                  <div 
                    key={level.value} 
                    className="flex items-center border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-colors"
                  >
                    <RadioGroupItem value={level.value} id={`education-${level.value}`} />
                    <Label htmlFor={`education-${level.value}`} className="ml-3 cursor-pointer w-full font-normal">
                      {level.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );
        
      case 1:
        return (
          <PersonalityQuestions onComplete={handlePersonalityComplete} />
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-6">
              {skillCategories.map(category => (
                <div key={category.name} className="space-y-3">
                  <Label className="text-base">{category.name} Skills</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.skills.map(skill => (
                      <div 
                        key={skill.value} 
                        className="flex items-center border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-indigo-300 transition-colors"
                      >
                        <Checkbox
                          id={`skill-${skill.value}`}
                          checked={formData.skills.includes(skill.value)}
                          onCheckedChange={() => handleSkillToggle(skill.value)}
                        />
                        <Label htmlFor={`skill-${skill.value}`} className="ml-3 cursor-pointer w-full font-normal">{skill.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-4">
              <Label htmlFor="country" className="text-base">Select your country</Label>
              <Select value={formData.country} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-4">
              <Label htmlFor="interests" className="text-base">
                What fields, industries, or topics are you interested in? (separate by commas)
              </Label>
              <Textarea
                id="interests"
                placeholder="e.g., Technology, Healthcare, Education, Arts, Finance"
                className="min-h-[100px]"
                value={formData.interests.join(', ')}
                onChange={handleInterestsChange}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="assessment-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="step-indicator flex justify-between mb-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="step-indicator-item flex flex-col items-center relative z-10">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep >= index 
                  ? 'border-indigo-600 bg-indigo-600 text-white' 
                  : 'border-gray-300 bg-white text-gray-400'}`}
            >
              {index + 1}
            </div>
            <span className={`text-xs mt-2 ${currentStep >= index ? 'text-indigo-600' : 'text-gray-400'}`}>
              {step.title}
            </span>
          </div>
        ))}
        <div className="absolute top-4 h-[2px] w-full bg-gray-200 -z-0">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}
          ></div>
        </div>
      </div>
      
      {renderForm()}
      
      {currentStep !== 1 && (
        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button
            type="button"
            onClick={nextStep}
            disabled={isNextDisabled()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
            {currentStep !== steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssessmentForm;
