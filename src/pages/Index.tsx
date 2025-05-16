
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentForm from '@/components/AssessmentForm';
import ResultsPage from '@/components/ResultsPage';
import { Button } from '@/components/ui/button';
import { Career } from '@/utils/careerData';
import { UserProfile, getCareerRecommendations } from '@/utils/aiRecommendation';
import { Brain, BarChart, Briefcase, ArrowRight } from 'lucide-react';

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [careerResults, setCareerResults] = useState<Career[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleAssessmentComplete = (profile: UserProfile) => {
    const recommendations = getCareerRecommendations(profile);
    setCareerResults(recommendations);
    setUserProfile(profile);
  };

  const handleStartOver = () => {
    setShowAssessment(true);
    setCareerResults([]);
    setUserProfile(null);
  };

  const renderLandingPage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between py-12 gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Discover Your Perfect Career With AI-Powered Guidance
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI Career Counselor analyzes your personality traits and skills to recommend career paths that align with your unique profile.
            </p>
            <Button 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-md"
              onClick={() => setShowAssessment(true)}
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">AI-Powered Analysis</h3>
                  <p className="text-gray-600">
                    Our advanced machine learning algorithms analyze your responses to identify your strengths and preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BarChart className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">Personalized Insights</h3>
                  <p className="text-gray-600">
                    Get detailed insights about your personality traits and skill profile with visual representations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">Tailored Recommendations</h3>
                  <p className="text-gray-600">
                    Receive career suggestions that match your unique profile, with detailed information for each career path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center my-16">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Complete Assessment</h3>
              <p className="text-gray-600">
                Answer questions about your background, personality, and skills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">AI Analysis</h3>
              <p className="text-gray-600">
                Our machine learning model processes your unique profile.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Get Recommendations</h3>
              <p className="text-gray-600">
                Explore personalized career recommendations with detailed insights.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <Button 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
            onClick={() => setShowAssessment(true)}
          >
            Start Your Career Discovery
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {showAssessment && careerResults.length === 0 && (
          <div className="py-8">
            <AssessmentForm onComplete={handleAssessmentComplete} />
          </div>
        )}
        {careerResults.length > 0 && userProfile && (
          <ResultsPage 
            careers={careerResults} 
            userProfile={userProfile} 
            onStartOver={handleStartOver} 
          />
        )}
        {!showAssessment && careerResults.length === 0 && renderLandingPage()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
