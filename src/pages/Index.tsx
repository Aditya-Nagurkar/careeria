
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentForm from '@/components/AssessmentForm';
import ResultsPage from '@/components/ResultsPage';
import { Button } from '@/components/ui/button';
import { Career } from '@/utils/careerData';
import { UserProfile, getCareerRecommendations } from '@/utils/aiRecommendation';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-career-dark dark:text-white mb-4">
            Find Your Perfect Career Path with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI counselor matches your personality, skills, and education to ideal career paths tailored just for you.
          </p>
          <div className="mt-8">
            <Button 
              size="lg"
              className="bg-career-primary hover:bg-career-accent text-white px-8"
              onClick={() => setShowAssessment(true)}
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-career-primary">
            <div className="mb-4 p-2 bg-career-light dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-career-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-career-dark dark:text-white">Smart Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our machine learning algorithm analyzes your unique traits to match you with careers where you'll truly excel.
            </p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-career-secondary">
            <div className="mb-4 p-2 bg-blue-50 dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-career-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-career-dark dark:text-white">Personalized Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover careers that align with your education level, personality traits, and skills for maximum satisfaction.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-career-dark dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="bg-career-light dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-career-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-career-dark dark:text-white">Complete Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Answer questions about your background, personality, and skills.
              </p>
            </div>
            <div>
              <div className="bg-career-light dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-career-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-career-dark dark:text-white">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our machine learning model processes your unique profile.
              </p>
            </div>
            <div>
              <div className="bg-career-light dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-career-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-career-dark dark:text-white">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore personalized career recommendations with detailed insights.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <Button 
            size="lg"
            className="bg-career-primary hover:bg-career-accent text-white px-8"
            onClick={() => setShowAssessment(true)}
          >
            Start Your Career Discovery
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
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
