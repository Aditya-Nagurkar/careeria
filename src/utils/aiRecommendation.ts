
import { Career, careers } from './careerData';

export interface UserProfile {
  education: string;
  specialization?: string;
  personalityTraits: string[];
  skills: string[];
  interests: string[];
  country: string;
}

// This is a simple ML-like algorithm for career recommendations
// In a real app, you would replace this with a more sophisticated model or API call
export const getCareerRecommendations = (userProfile: UserProfile): Career[] => {
  // Assign weights to different factors
  const weights = {
    education: 0.25,
    specialization: 0.15,
    personalityTraits: 0.25,
    skills: 0.25,
    interests: 0.10
  };

  // Scoring function for each career
  const calculateMatchScore = (career: Career): number => {
    let score = 0;
    
    // Education match
    const educationMap: { [key: string]: number } = {
      'high-school': 1,
      'associate': 2,
      'bachelor': 3,
      'master': 4,
      'doctorate': 5
    };
    
    const userEdLevel = educationMap[userProfile.education] || 1;
    let careerEdLevel = 3; // Default to bachelor's
    
    if (career.educationRequired.toLowerCase().includes('high school')) {
      careerEdLevel = 1;
    } else if (career.educationRequired.toLowerCase().includes('associate')) {
      careerEdLevel = 2;
    } else if (career.educationRequired.toLowerCase().includes('bachelor')) {
      careerEdLevel = 3;
    } else if (career.educationRequired.toLowerCase().includes('master')) {
      careerEdLevel = 4;
    } else if (career.educationRequired.toLowerCase().includes('doctorate') || 
               career.educationRequired.toLowerCase().includes('phd')) {
      careerEdLevel = 5;
    }
    
    // If user meets or exceeds education requirement
    if (userEdLevel >= careerEdLevel) {
      score += weights.education;
    } else {
      // Partial credit for being close
      score += weights.education * (userEdLevel / careerEdLevel);
    }
    
    // Specialization match - new scoring for specialization
    if (userProfile.specialization && career.relevantFields.length > 0) {
      const specializationMatch = career.relevantFields.some(field => 
        field.toLowerCase().includes(userProfile.specialization!.toLowerCase()) ||
        userProfile.specialization!.toLowerCase().includes(field.toLowerCase())
      );
      
      if (specializationMatch) {
        score += weights.specialization;
      }
    }
    
    // Personality traits match - improved matching
    const personalityMatchCount = userProfile.personalityTraits.filter(trait => 
      career.personalityTraits.some(careerTrait => 
        careerTrait.toLowerCase().includes(trait.toLowerCase()) ||
        trait.toLowerCase().includes(careerTrait.toLowerCase())
      )
    ).length;
    
    const personalityMatchScore = career.personalityTraits.length > 0
      ? Math.min(personalityMatchCount / career.personalityTraits.length, 1) * weights.personalityTraits
      : 0;
    
    score += personalityMatchScore;
    
    // Skills match - improved matching
    const skillsMatchCount = userProfile.skills.filter(skill => 
      career.skills.some(careerSkill => 
        careerSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(careerSkill.toLowerCase())
      )
    ).length;
    
    const skillsMatchScore = career.skills.length > 0
      ? Math.min(skillsMatchCount / Math.min(career.skills.length, 5), 1) * weights.skills
      : 0;
    
    score += skillsMatchScore;
    
    // Interest match - improved keyword matching
    const interestMatchCount = userProfile.interests.filter(interest => 
      career.title.toLowerCase().includes(interest.toLowerCase()) || 
      career.description.toLowerCase().includes(interest.toLowerCase()) ||
      career.relevantFields.some(field => field.toLowerCase().includes(interest.toLowerCase()))
    ).length;
    
    const interestMatchScore = userProfile.interests.length > 0
      ? Math.min(interestMatchCount / userProfile.interests.length, 1) * weights.interests
      : 0;
    
    score += interestMatchScore;

    // Country relevance - prioritize careers available in the user's country
    if (career.countries.includes(userProfile.country)) {
      score += 0.1; // Bonus for country match
    }
    
    return score;
  };
  
  // Calculate match scores for all careers
  const scoredCareers = careers.map(career => ({
    ...career,
    matchScore: calculateMatchScore(career)
  }));
  
  // Sort by match score and get top results
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 7); // Increased from 5 to 7 to show more options
};
