
import React, { useState } from 'react';
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
  
  // Calculate personality trait frequencies with improved accuracy
  const personalityData = userProfile.personalityTraits.reduce((acc: { [key: string]: number }, trait: string) => {
    acc[trait] = (acc[trait] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart data format
  const personalityChartData = Object.entries(personalityData)
    .filter(([name, count]) => count > 0) // Filter out traits with zero count
    .map(([name, count]) => ({
      name,
      value: count
    }));
    
  // Calculate the total for proper percentage distribution
  const totalTraitCounts = personalityChartData.reduce((sum, item) => sum + item.value, 0);
  
  // Create a new array with correctly calculated percentages to ensure the pie chart is accurate
  const normalizedPersonalityData = personalityChartData.map(item => ({
    name: item.name,
    value: Number(((item.value / totalTraitCounts) * 100).toFixed(1))
  }));

  // Convert skills array to radar chart format with more categories
  const skillCategories = {
    Technical: ['programming', 'technical', 'analytical', 'mathematics', 'engineering', 'data', 'computing'],
    Communication: ['communication', 'writing', 'speaking', 'presentation', 'negotiation', 'persuasion'],
    Leadership: ['leadership', 'management', 'delegation', 'strategy', 'motivation', 'mentoring'],
    Adaptability: ['adaptability', 'flexibility', 'learning', 'innovation', 'resilience', 'change'],
    'Problem Solving': ['problem solving', 'critical thinking', 'decision making', 'research', 'troubleshooting'],
    Creativity: ['creative', 'design', 'innovation', 'artistic', 'conceptual', 'imagination'],
    'Interpersonal': ['teamwork', 'empathy', 'collaboration', 'networking', 'relationship building']
  };

  // More sophisticated skill matching algorithm
  const skillsChartData = Object.entries(skillCategories).map(([subject, keywords]) => {
    // Check how many keywords match each skill
    const matchCount = userProfile.skills.reduce((count, skill) => {
      const skillLower = skill.toLowerCase();
      // If any keyword is found in the skill, count it as a match
      if (keywords.some(keyword => skillLower.includes(keyword.toLowerCase()))) {
        return count + 1;
      }
      return count;
    }, 0);
    
    // Calculate the percentage with more granularity
    const maxPossibleMatches = Math.min(keywords.length, userProfile.skills.length);
    const score = maxPossibleMatches > 0 ? (matchCount / maxPossibleMatches) * 100 : 0;
    
    return {
      subject,
      A: Math.min(Math.round(score), 100) // Cap at 100% and round for cleaner display
    };
  });
  
  const COLORS = ['#4a48de', '#8b5cf6', '#f06292', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899'];

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
            {/* Fixed ChartLineIcon to use the imported component correctly */}
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
                  View salaries for
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
          
          <div className="grid grid-cols-1 gap-6">
            {careers.map((career, index) => (
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
              This chart shows the distribution of your personality traits based on your assessment responses.
            </p>
            
            {/* Dynamic pie chart with improved visualization */}
            <div className="flex justify-center w-full items-center h-auto">
              <div className="w-full sm:max-w-[500px] aspect-square">
                <ChartContainer 
                  config={{
                    Analytical: { color: COLORS[0] },
                    Creative: { color: COLORS[1] },
                    Social: { color: COLORS[2] },
                    Leadership: { color: COLORS[3] },
                    Practical: { color: COLORS[4] },
                    Adaptable: { color: COLORS[5] },
                    Resilient: { color: COLORS[6] },
                    Organized: { color: COLORS[7] },
                    Empathetic: { color: COLORS[8] }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={normalizedPersonalityData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                      paddingAngle={1}
                    >
                      {normalizedPersonalityData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={1}
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
                    analytical: "approach problems methodically and enjoy working with data",
                    creative: "think outside the box and come up with innovative solutions",
                    collaborative: "work well with others and have strong interpersonal skills",
                    leader: "take initiative and guide others effectively",
                    practical: "focus on realistic solutions and tangible results",
                    adaptable: "adjust quickly to changing circumstances",
                    resilient: "recover well from setbacks and challenges",
                    independent: "work effectively with minimal supervision",
                    "detail-oriented": "pay close attention to specifics and thoroughness",
                    empathetic: "understand and share the feelings of others"
                  };

                  const descriptions = topTraits
                    .map(trait => traitDescriptions[trait.toLowerCase()] || `demonstrate strong ${trait.toLowerCase()} qualities`)
                    .join(", and ");

                  return `Your personality assessment reveals that you primarily ${descriptions}. ` +
                    `This unique combination of traits suggests you would excel in roles that require ${
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
              This radar chart visualizes your strengths across different skill categories.
            </p>
            
            {/* Dynamic radar chart with improved visualization */}
            <div className="flex justify-center w-full">
              <div className="w-full sm:max-w-[500px] aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsChartData}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#444', fontSize: 12 }}
                      axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                    />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    />
                    <ChartTooltip 
                      formatter={(value) => [`${value}%`, 'Skill Proficiency']}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Key Insights</h3>
              <p className="text-gray-600">
                {(() => {
                  // Get top skills (those with highest percentages)
                  const topSkills = skillsChartData
                    .sort((a, b) => b.A - a.A)
                    .slice(0, 3);
                  
                  // Get top personality traits
                  const topTraits = Object.entries(personalityData)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([trait]) => trait.toLowerCase());
                  
                  // Find careers that match top skills and traits
                  const matchingCareers = careers
                    .filter(career => 
                      // Check if career requires any of the top skills
                      career.skills.some(skill => 
                        topSkills.some(topSkill => 
                          skill.toLowerCase().includes(topSkill.subject.toLowerCase())
                        )
                      ) &&
                      // Check if career matches personality traits
                      career.personalityTraits.some(trait =>
                        topTraits.includes(trait.toLowerCase())
                      )
                    )
                    .slice(0, 2) // Get top 2 matching careers
                    .map(career => career.title);

                  const skillsText = topSkills
                    .map(skill => skill.subject)
                    .join(", ");
                  
                  const traitsText = topTraits.join(" and ");
                  
                  let careerSuggestion = "";
                  if (matchingCareers.length > 0) {
                    careerSuggestion = ` Based on this profile, you might excel in roles like ${matchingCareers.join(" or ")}.`;
                  }

                  return `Your strongest capabilities are in ${skillsText}, complemented by your ${traitsText} traits. ` +
                    `This combination makes you particularly effective in roles that require both technical expertise and personal qualities.${careerSuggestion}`;
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
