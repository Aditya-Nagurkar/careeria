
import { Career, careers } from './careerData';

export interface UserProfile {
  education: string;
  specialization?: string;
  personalityTraits: string[];
  skills: string[];
  interests: string[];
  country: string;
}

// Improved ML-like algorithm for career recommendations
// In a real app, you would replace this with a more sophisticated model or API call
export const getCareerRecommendations = (userProfile: UserProfile): Career[] => {
  // Assign weights to different factors - prioritizing personality and interests more
  const weights = {
    personalityTraits: 0.40,  // Increased weight for personality traits
    skills: 0.20,
    specialization: 0.25,     // Maintained high weight for specialization
    interests: 0.15           // Increased weight for interests
  };

  // Scoring function for each career
  const calculateMatchScore = (career: Career): number => {
    let score = 0;
    
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
    
    // Personality traits match - more sophisticated matching
    if (userProfile.personalityTraits.length > 0 && career.personalityTraits.length > 0) {
      // Count exact matches with higher weight
      const exactMatchCount = userProfile.personalityTraits.filter(trait => 
        career.personalityTraits.some(careerTrait => 
          careerTrait.toLowerCase() === trait.toLowerCase()
        )
      ).length;
      
      // Count partial matches with lower weight
      const partialMatchCount = userProfile.personalityTraits.filter(trait => 
        career.personalityTraits.some(careerTrait => 
          careerTrait.toLowerCase().includes(trait.toLowerCase()) ||
          trait.toLowerCase().includes(careerTrait.toLowerCase())
        ) && !career.personalityTraits.some(careerTrait => 
          careerTrait.toLowerCase() === trait.toLowerCase()
        )
      ).length;
      
      // Calculate match score with different weights for exact and partial matches
      const personalityMatchScore = 
        (exactMatchCount * 1.0 + partialMatchCount * 0.5) / 
        Math.max(userProfile.personalityTraits.length, career.personalityTraits.length);
      
      score += personalityMatchScore * weights.personalityTraits;
    }
    
    // Skills match - improved matching with better relevance scoring
    if (userProfile.skills.length > 0 && career.skills.length > 0) {
      // Count exact matches with higher weight
      const exactMatchCount = userProfile.skills.filter(skill => 
        career.skills.some(careerSkill => 
          careerSkill.toLowerCase() === skill.toLowerCase()
        )
      ).length;
      
      // Count partial matches with lower weight
      const partialMatchCount = userProfile.skills.filter(skill => 
        career.skills.some(careerSkill => 
          careerSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(careerSkill.toLowerCase())
        ) && !career.skills.some(careerSkill => 
          careerSkill.toLowerCase() === skill.toLowerCase()
        )
      ).length;
      
      // Calculate match score with different weights for exact and partial matches
      const skillsMatchScore = 
        (exactMatchCount * 1.0 + partialMatchCount * 0.5) / 
        Math.max(userProfile.skills.length, career.skills.length);
      
      score += skillsMatchScore * weights.skills;
    }
    
    // Interest match - more comprehensive keyword matching
    if (userProfile.interests.length > 0) {
      let interestMatchScore = 0;
      
      // Check for direct interest matches in various career attributes
      for (const interest of userProfile.interests) {
        // Check title (highest weight)
        if (career.title.toLowerCase().includes(interest.toLowerCase())) {
          interestMatchScore += 1.0;
          continue; // Move to next interest if strong match found
        }
        
        // Check relevant fields (high weight)
        if (career.relevantFields.some(field => field.toLowerCase().includes(interest.toLowerCase()))) {
          interestMatchScore += 0.8;
          continue;
        }
        
        // Check description (medium weight)
        if (career.description.toLowerCase().includes(interest.toLowerCase())) {
          interestMatchScore += 0.6;
          continue;
        }
        
        // Check skills (medium-low weight)
        if (career.skills.some(skill => skill.toLowerCase().includes(interest.toLowerCase()))) {
          interestMatchScore += 0.4;
          continue;
        }
        
        // Check personality traits (low weight)
        if (career.personalityTraits.some(trait => trait.toLowerCase().includes(interest.toLowerCase()))) {
          interestMatchScore += 0.2;
          continue;
        }
      }
      
      // Normalize interest match score
      interestMatchScore = interestMatchScore / userProfile.interests.length;
      score += interestMatchScore * weights.interests;
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
