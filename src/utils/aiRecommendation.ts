
import { Career, careers } from './careerData';

export interface UserProfile {
  education: string;
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
    education: 0.3,
    personalityTraits: 0.3,
    skills: 0.3,
    interests: 0.1
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
    
    // Personality traits match
    const personalityMatchCount = userProfile.personalityTraits.filter(trait => 
      career.personalityTraits.some(careerTrait => 
        careerTrait.toLowerCase().includes(trait.toLowerCase())
      )
    ).length;
    
    const personalityMatchScore = career.personalityTraits.length > 0
      ? personalityMatchCount / career.personalityTraits.length
      : 0;
    
    score += weights.personalityTraits * personalityMatchScore;
    
    // Skills match
    const skillsMatchCount = userProfile.skills.filter(skill => 
      career.skills.some(careerSkill => 
        careerSkill.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    
    const skillsMatchScore = career.skills.length > 0
      ? skillsMatchCount / career.skills.length
      : 0;
    
    score += weights.skills * skillsMatchScore;
    
    // Interest match - basic keyword matching
    const interestMatchCount = userProfile.interests.filter(interest => 
      career.title.toLowerCase().includes(interest.toLowerCase()) || 
      career.description.toLowerCase().includes(interest.toLowerCase())
    ).length;
    
    const interestMatchScore = userProfile.interests.length > 0
      ? interestMatchCount / userProfile.interests.length
      : 0;
    
    score += weights.interests * interestMatchScore;

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
    .slice(0, 5);
};
