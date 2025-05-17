
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
    education: 0.20,
    specialization: 0.25,  // Increased the weight for specialization
    personalityTraits: 0.25,
    skills: 0.20,
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
    
    // Specialization match - improved matching with higher weight
    if (userProfile.specialization && career.relevantFields.length > 0) {
      // First check for exact or close matches
      const exactMatch = career.relevantFields.some(field => 
        field.toLowerCase() === userProfile.specialization!.toLowerCase()
      );
      
      const partialMatch = career.relevantFields.some(field => 
        field.toLowerCase().includes(userProfile.specialization!.toLowerCase()) ||
        userProfile.specialization!.toLowerCase().includes(field.toLowerCase())
      );
      
      if (exactMatch) {
        score += weights.specialization;
      } else if (partialMatch) {
        score += weights.specialization * 0.7;
      }
      
      // Also check if specialization is mentioned in description
      if (career.description.toLowerCase().includes(userProfile.specialization!.toLowerCase())) {
        score += weights.specialization * 0.3;
      }
    }
    
    // Personality traits match - more nuanced matching
    if (userProfile.personalityTraits.length > 0 && career.personalityTraits.length > 0) {
      const personalityMatchCount = userProfile.personalityTraits.filter(trait => 
        career.personalityTraits.some(careerTrait => 
          careerTrait.toLowerCase() === trait.toLowerCase() ||
          careerTrait.toLowerCase().includes(trait.toLowerCase()) ||
          trait.toLowerCase().includes(careerTrait.toLowerCase())
        )
      ).length;
      
      // Calculate match score as percentage of matched traits
      const personalityMatchPercentage = personalityMatchCount / Math.min(
        userProfile.personalityTraits.length,
        career.personalityTraits.length
      );
      
      score += personalityMatchPercentage * weights.personalityTraits;
    }
    
    // Skills match - improved matching with better relevance scoring
    if (userProfile.skills.length > 0 && career.skills.length > 0) {
      const skillsMatchCount = userProfile.skills.filter(skill => 
        career.skills.some(careerSkill => 
          careerSkill.toLowerCase() === skill.toLowerCase() ||
          careerSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(careerSkill.toLowerCase())
        )
      ).length;
      
      // Calculate match score based on percentage of matched skills
      const skillsMatchPercentage = skillsMatchCount / Math.min(
        userProfile.skills.length,
        career.skills.length
      );
      
      score += skillsMatchPercentage * weights.skills;
    }
    
    // Interest match - more comprehensive keyword matching
    if (userProfile.interests.length > 0) {
      const interestMatchCount = userProfile.interests.filter(interest => 
        // Check title, description, and fields for interest keywords
        career.title.toLowerCase().includes(interest.toLowerCase()) || 
        career.description.toLowerCase().includes(interest.toLowerCase()) ||
        career.relevantFields.some(field => field.toLowerCase().includes(interest.toLowerCase())) ||
        career.skills.some(skill => skill.toLowerCase().includes(interest.toLowerCase()))
      ).length;
      
      const interestMatchScore = userProfile.interests.length > 0
        ? Math.min(interestMatchCount / userProfile.interests.length, 1) * weights.interests
        : 0;
      
      score += interestMatchScore;
    }

    // Country relevance - prioritize careers available in the user's country
    if (career.countries.includes(userProfile.country)) {
      score += 0.1; // Bonus for country match
    }
    
    // Scale score to be between 0-1
    return Math.min(score, 1);
  };
  
  // Calculate match scores for all careers
  const scoredCareers = careers.map(career => ({
    ...career,
    matchScore: calculateMatchScore(career)
  }));
  
  // Sort by match score and get top results
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 7); // Return top 7 careers
};
