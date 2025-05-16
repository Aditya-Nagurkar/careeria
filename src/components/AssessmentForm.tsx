
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { educationLevels, personalityTraits, skillCategories } from '../utils/careerData';
import { UserProfile } from '../utils/aiRecommendation';

interface AssessmentFormProps {
  onComplete: (userProfile: UserProfile) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>({
    education: '',
    personalityTraits: [],
    skills: [],
    interests: []
  });
  
  const steps = [
    { title: 'Education', description: 'Tell us about your educational background' },
    { title: 'Personality', description: 'Select traits that best describe you' },
    { title: 'Skills', description: 'What skills do you have or want to develop?' },
    { title: 'Interests', description: 'What topics or fields interest you?' }
  ];
  
  const handleEducationChange = (value: string) => {
    setFormData(prev => ({ ...prev, education: value }));
  };
  
  const handlePersonalityTraitToggle = (trait: string) => {
    setFormData(prev => {
      const traits = prev.personalityTraits.includes(trait)
        ? prev.personalityTraits.filter(t => t !== trait)
        : [...prev.personalityTraits, trait];
      return { ...prev, personalityTraits: traits };
    });
  };
  
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: skills };
    });
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
      case 1:
        return formData.personalityTraits.length === 0;
      case 2:
        return formData.skills.length === 0;
      case 3:
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
            <h2 className="text-2xl font-semibold text-career-dark dark:text-gray-100 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-4">
              <Label className="text-base">What is your highest level of education?</Label>
              <RadioGroup 
                value={formData.education} 
                onValueChange={handleEducationChange}
                className="space-y-3"
              >
                {educationLevels.map(level => (
                  <div key={level.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={`education-${level.value}`} />
                    <Label htmlFor={`education-${level.value}`} className="font-normal">{level.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-career-dark dark:text-gray-100 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-4">
              <Label className="text-base">Select at least 3 traits that describe you best</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {personalityTraits.map(trait => (
                  <div key={trait.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`trait-${trait.value}`}
                      checked={formData.personalityTraits.includes(trait.value)}
                      onCheckedChange={() => handlePersonalityTraitToggle(trait.value)}
                    />
                    <Label htmlFor={`trait-${trait.value}`} className="font-normal">{trait.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-career-dark dark:text-gray-100 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{steps[currentStep].description}</p>
            
            <div className="space-y-6">
              {skillCategories.map(category => (
                <div key={category.name} className="space-y-3">
                  <Label className="text-base">{category.name} Skills</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.skills.map(skill => (
                      <div key={skill.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill.value}`}
                          checked={formData.skills.includes(skill.value)}
                          onCheckedChange={() => handleSkillToggle(skill.value)}
                        />
                        <Label htmlFor={`skill-${skill.value}`} className="font-normal">{skill.label}</Label>
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
            <h2 className="text-2xl font-semibold text-career-dark dark:text-gray-100 mb-6">{steps[currentStep].title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{steps[currentStep].description}</p>
            
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
    <div className="assessment-container">
      <div className="step-indicator">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`step-indicator-dot ${index <= currentStep ? 'active' : ''}`}
          />
        ))}
      </div>
      
      {renderForm()}
      
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
          className="bg-career-primary hover:bg-career-accent"
        >
          {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
          {currentStep !== steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;
