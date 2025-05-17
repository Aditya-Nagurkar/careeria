
import React, { useState, Suspense } from 'react';
import { Career, countries } from '../utils/careerData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Briefcase, Brain, ChartLineIcon } from 'lucide-react';
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
  
  // Sample data for personality chart
  const personalityData = [
    { name: 'Analytical', value: 21 },
    { name: 'Creative', value: 21 },
    { name: 'Social', value: 18 },
    { name: 'Leadership', value: 18 },
    { name: 'Practical', value: 21 },
  ];
  
  // Sample data for skills radar chart
  const skillsData = [
    { subject: 'Technical', A: 65 },
    { subject: 'Communication', A: 80 },
    { subject: 'Leadership', A: 60 },
    { subject: 'Adaptability', A: 90 },
    { subject: 'Problem Solving', A: 75 },
  ];
  
  const COLORS = ['#4a48de', '#8b5cf6', '#f06292', '#f59e0b', '#10b981'];

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
            <ChartLineIcon className="h-5 w-5" />
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
            
            <div className="h-[300px] md:h-[400px] w-full">
              <ChartContainer 
                config={{
                  Analytical: { color: COLORS[0] },
                  Creative: { color: COLORS[1] },
                  Social: { color: COLORS[2] },
                  Leadership: { color: COLORS[3] },
                  Practical: { color: COLORS[4] },
                }}
              >
                <PieChart>
                  <Pie
                    data={personalityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {personalityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">What This Means</h3>
              <p className="text-gray-600">
                Your personality profile shows a balanced mix of analytical thinking, creativity, and practical 
                problem-solving. This combination makes you adaptable to various work environments and capable
                of approaching problems from multiple angles.
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
            
            <div className="h-[300px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Key Insights</h3>
              <p className="text-gray-600">
                You demonstrate exceptional adaptability and strong communication skills, which are valuable in 
                collaborative environments. Your technical abilities are solid, and you show good problem-solving 
                capabilities that would benefit analytical roles.
              </p>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Career opportunities in {getCountryName(selectedCountry)}</h4>
                <p className="text-gray-700">
                  With your skill profile, you have excellent prospects in {getCountryName(selectedCountry)}. 
                  The job market in this region particularly values your combination of technical and interpersonal skills.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsPage;
