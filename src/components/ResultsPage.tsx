import React, { useState, useMemo } from 'react';
import { Career, countries } from '../utils/careerData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Briefcase, Brain } from 'lucide-react';
import { UserProfile } from '../utils/aiRecommendation';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CareerCard from './CareerCard';

interface ResultsPageProps {
  careers: Career[];
  userProfile: UserProfile;
  onStartOver: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ careers, userProfile, onStartOver }) => {
  const [activeTab, setActiveTab] = useState('careers');
  const [selectedCountry, setSelectedCountry] = useState(userProfile.country || 'USA');
  
  // Group similar personality traits to reduce pie chart segments
  const groupPersonalityTraits = (traits: string[]): { [key: string]: number } => {
    const traitGroups: { [key: string]: string[] } = {
      "Analytical": ["analytical", "logical", "methodical", "detail-oriented", "research"],
      "Creative": ["creative", "innovative", "artistic", "imaginative", "design"],
      "Leadership": ["leader", "leadership", "decisive", "commanding", "management"],
      "Social": ["social", "collaborative", "teamwork", "interpersonal", "communication"],
      "Adaptability": ["adaptable", "flexible", "versatile", "resilient", "agile"],
      "Self-Motivated": ["self-motivated", "driven", "proactive", "ambitious", "determined"]
    };
    
    const groupedData: { [key: string]: number } = {};
    
    // Initialize all groups with zero
    Object.keys(traitGroups).forEach(group => {
      groupedData[group] = 0;
    });
    
    // Count traits by group
    traits.forEach(trait => {
      let assigned = false;
      const traitLower = trait.toLowerCase();
      
      // Check if trait belongs to any group
      Object.entries(traitGroups).forEach(([group, keywords]) => {
        if (keywords.some(keyword => traitLower.includes(keyword) || keyword.includes(traitLower))) {
          groupedData[group] += 1;
          assigned = true;
        }
      });
      
      // If trait doesn't fit any group, add to "Other"
      if (!assigned) {
        if (!groupedData["Other"]) {
          groupedData["Other"] = 0;
        }
        groupedData["Other"] += 1;
      }
    });
    
    // Remove groups with zero count
    return Object.fromEntries(Object.entries(groupedData).filter(([_, value]) => value > 0));
  };
  
  // Process personality trait data with grouping
  const personalityData = groupPersonalityTraits(userProfile.personalityTraits);
  
  // Convert to chart data format
  const personalityChartData = Object.entries(personalityData)
    .map(([name, count]) => ({
      name,
      value: count
    }));
    
  // Calculate the total for proper percentage distribution
  const totalTraitCounts = personalityChartData.reduce((sum, item) => sum + item.value, 0);
  
  // Create a new array with correctly calculated percentages
  const normalizedPersonalityData = personalityChartData.map(item => ({
    name: item.name,
    value: Number(((item.value / totalTraitCounts) * 100).toFixed(1))
  }));

  // Improved skill categories with more precise matching
  const skillCategories = {
    Technical: ['programming', 'coding', 'development', 'technical', 'engineering', 'data', 'computing', 'software', 'hardware', 'analysis'],
    Communication: ['communication', 'writing', 'speaking', 'presentation', 'negotiation', 'persuasion', 'language', 'verbal', 'documentation'],
    Leadership: ['leadership', 'management', 'delegation', 'strategy', 'motivation', 'mentoring', 'supervision', 'direction', 'guidance'],
    Adaptability: ['adaptability', 'flexibility', 'learning', 'resilience', 'change', 'versatility', 'multitasking', 'quick-learning'],
    'Problem Solving': ['problem solving', 'critical thinking', 'decision making', 'research', 'troubleshooting', 'analysis', 'deduction', 'reasoning'],
    Creativity: ['creative', 'design', 'innovation', 'artistic', 'conceptual', 'imagination', 'originality', 'visualization']
  };

  // More accurate skill matching algorithm
  const skillsChartData = Object.entries(skillCategories).map(([subject, keywords]) => {
    // Create a scoring system for each skill category
    let score = 0;
    const maxScore = Math.min(keywords.length, userProfile.skills.length);
    
    // Score each user skill against this category
    userProfile.skills.forEach(userSkill => {
      const userSkillLower = userSkill.toLowerCase();
      
      // Check for exact or partial matches
      const exactMatch = keywords.some(keyword => 
        userSkillLower === keyword || 
        userSkillLower.includes(` ${keyword} `) || 
        userSkillLower.startsWith(`${keyword} `) || 
        userSkillLower.endsWith(` ${keyword}`)
      );
      
      const partialMatch = keywords.some(keyword => 
        userSkillLower.includes(keyword) || 
        keyword.includes(userSkillLower)
      );
      
      if (exactMatch) {
        score += 1;
      } else if (partialMatch) {
        score += 0.5;
      }
    });
    
    // Calculate percentage score relative to maximum possible
    const percentScore = maxScore > 0 ? Math.min(Math.round((score / maxScore) * 100), 100) : 0;
    
    return {
      subject,
      A: percentScore
    };
  });
  
  // Limit to top 5 skill categories with highest scores
  const topSkillsChartData = [...skillsChartData]
    .sort((a, b) => b.A - a.A)
    .slice(0, 5);
  
  const COLORS = ['#4a48de', '#8b5cf6', '#f06292', '#f59e0b', '#10b981', '#06b6d4'];

  // Filter careers for the selected country
  const filteredCareers = useMemo(() => {
    return careers
      .filter(career => career.countries.includes(selectedCountry))
      .map(career => {
        // Calculate match score based on personality traits and skills
        const personalityMatch = career.personalityTraits.filter(trait =>
          userProfile.personalityTraits.some(userTrait => 
            userTrait.toLowerCase() === trait.toLowerCase()
          )
        ).length;
        
        const skillMatch = career.skills.filter(skill =>
          userProfile.skills.some(userSkill =>
            skill.toLowerCase().includes(userSkill.toLowerCase()) || 
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        ).length;
        
        // Calculate a weighted score (can be adjusted based on importance)
        const matchScore = 
          (personalityMatch / Math.max(career.personalityTraits.length, 1)) * 0.6 +
          (skillMatch / Math.max(career.skills.length, 1)) * 0.4;
        
        return {
          ...career,
          matchScore: Math.round(matchScore * 100) // Convert to percentage
        };
      })
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)); // Sort by match score
  }, [careers, selectedCountry, userProfile]);

  // Get the country full name from the code
  const getCountryName = (code: string) => {
    const country = countries.find(c => c.value === code);
    return country ? country.label : code;
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Your Career Assessment Results</h1>
        <p className="text-gray-600 mt-2">Based on your profile and preferences</p>
      </div>
      
      <Tabs 
        defaultValue="careers" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 mb-8 bg-gray-50">
          <TabsTrigger 
            value="careers" 
            className="flex items-center gap-2 py-4 data-[state=active]:text-[#603CBA] data-[state=active]:border-b-2 data-[state=active]:border-[#603CBA]"
          >
            <Briefcase className="h-5 w-5" />
            Career Matches
          </TabsTrigger>
          <TabsTrigger 
            value="personality" 
            className="flex items-center gap-2 py-4 data-[state=active]:text-[#603CBA] data-[state=active]:border-b-2 data-[state=active]:border-[#603CBA]"
          >
            <Brain className="h-5 w-5" />
            Personality
          </TabsTrigger>
          <TabsTrigger 
            value="skills" 
            className="flex items-center gap-2 py-4 data-[state=active]:text-[#603CBA] data-[state=active]:border-b-2 data-[state=active]:border-[#603CBA]"
          >
            {/* Fixed to use inline SVG instead of ChartLineIcon */}
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-3 3"/>
            </svg>
            Skills
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="careers" className="animate-fade-in">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-2xl font-semibold mb-2">Your Top Career Matches</h2>
                <p className="text-gray-600">
                  Based on your personality traits and skills
                </p>
              </div>
              
              <div className="w-full sm:w-48">
                <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
                  View careers for
                </label>
                <Select 
                  value={selectedCountry} 
                  onValueChange={(value) => setSelectedCountry(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label} ({country.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredCareers.map((career, index) => (
                <div key={career.id} className={index === 0 ? "relative" : ""}>
                  {index === 0 && (
                    <div className="md:hidden absolute top-0 right-0 left-0 bg-green-500 text-white text-center py-1 text-sm rounded-t-lg">
                      Best Match
                    </div>
                  )}
                  <div className={`mt-4 ${index === 0 ? "pt-6 md:pt-0" : ""}`}>
                    <CareerCard 
                      career={career} 
                      rank={index} 
                      country={selectedCountry}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <p className="text-lg text-gray-600 mb-4">
                No career matches found for {getCountryName(selectedCountry)}. Try selecting a different country.
              </p>
              <Button
                onClick={() => setSelectedCountry('Global')}
                variant="outline"
                className="mx-auto border-[#603CBA] text-[#603CBA] hover:bg-[#603CBA]/10"
              >
                Show Global Careers
              </Button>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Want to explore different options? Try again with different preferences.
            </p>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="mx-auto flex items-center gap-2 border-[#603CBA] text-[#603CBA] hover:bg-[#603CBA]/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Start a New Assessment
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="personality" className="animate-fade-in">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your Personality Profile</h2>
            <p className="text-gray-600 mb-8">
              This chart shows the key personality traits identified in your assessment.
            </p>
            
            {/* Improved pie chart with fewer segments */}
            <div className="flex justify-center w-full items-center h-auto">
              <div className="w-full sm:max-w-[500px] aspect-square">
                <ChartContainer 
                  config={{
                    Analytical: { color: COLORS[0] },
                    Creative: { color: COLORS[1] },
                    Leadership: { color: COLORS[2] },
                    Social: { color: COLORS[3] },
                    Adaptability: { color: COLORS[4] },
                    "Self-Motivated": { color: COLORS[5] }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={normalizedPersonalityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        
                        return value > 10 ? (
                          <text
                            x={x}
                            y={y}
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            fill="#333"
                            fontSize={14}
                            fontWeight={500}
                          >
                            {name} {value}%
                          </text>
                        ) : null;
                      }}
                      outerRadius="70%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                      paddingAngle={5}
                    >
                      {normalizedPersonalityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">What This Means</h3>
              <p className="text-gray-600">
                {(() => {
                  // Sort personality traits by frequency
                  const sortedTraits = Object.entries(personalityData)
                    .sort(([, a], [, b]) => b - a)
                    .map(([trait]) => trait);

                  // Get top 3 traits
                  const topTraits = sortedTraits.slice(0, 3);
                  
                  // Generate dynamic insight based on top traits
                  const traitDescriptions: { [key: string]: string } = {
                    "Analytical": "approach problems methodically and enjoy working with data",
                    "Creative": "think outside the box and come up with innovative solutions",
                    "Social": "work well with others and have strong interpersonal skills",
                    "Leadership": "take initiative and guide others effectively",
                    "Adaptability": "adjust quickly to changing circumstances",
                    "Self-Motivated": "drive projects forward with minimal supervision"
                  };

                  const descriptions = topTraits
                    .map(trait => traitDescriptions[trait] || `demonstrate strong ${trait.toLowerCase()} qualities`)
                    .join(", and ");

                  return `Your personality assessment reveals that you primarily ${descriptions}. ` +
                    `This unique combination of traits suggests you would excel in roles that leverage ${
                      topTraits.map(trait => trait.toLowerCase()).join(", ")
                    }. Consider careers that align with these strengths to maximize your potential.`;
                })()}
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="animate-fade-in">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your Skills Profile</h2>
            <p className="text-gray-600 mb-8">
              This chart visualizes your top 5 skill categories based on your assessment.
            </p>
            
            {/* Improved radar chart with better accuracy */}
            <div className="flex justify-center w-full">
              <div className="w-full sm:max-w-[500px] aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={topSkillsChartData}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#444', fontSize: 13, fontWeight: 500 }}
                      axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                    />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                    <ChartTooltip 
                      formatter={(value) => [`${value}%`, 'Proficiency']}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Key Insights</h3>
              <p className="text-gray-600">
                {(() => {
                  // Get top skills categories (those with highest percentages)
                  const topSkills = [...skillsChartData]
                    .sort((a, b) => b.A - a.A)
                    .slice(0, 3)
                    .map(item => item.subject);
                  
                  // Get top personality traits
                  const topTraits = Object.entries(personalityData)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([trait]) => trait);
                  
                  // Find careers that match top skills and traits
                  const matchingCareers = careers
                    .filter(career => 
                      // Check if career requires any of the top skills
                      career.skills.some(skill => 
                        topSkills.some(topSkill => 
                          skill.toLowerCase().includes(topSkill.toLowerCase())
                        )
                      ) &&
                      // Check if career matches personality traits
                      career.personalityTraits.some(trait =>
                        topTraits.some(topTrait => 
                          trait.toLowerCase().includes(topTrait.toLowerCase()) ||
                          topTrait.toLowerCase().includes(trait.toLowerCase())
                        )
                      )
                    )
                    .slice(0, 2) // Get top 2 matching careers
                    .map(career => career.title);

                  const skillsText = topSkills.join(", ");
                  const traitsText = topTraits.join(" and ");
                  
                  let careerSuggestion = "";
                  if (matchingCareers.length > 0) {
                    careerSuggestion = ` Based on this profile, you might excel in roles like ${matchingCareers.join(" or ")}.`;
                  }

                  return `Your strongest capabilities are in ${skillsText}, complemented by your ${traitsText} traits. ` +
                    `This combination makes you particularly effective in roles that leverage both technical expertise and personal qualities.${careerSuggestion}`;
                })()}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsPage;
