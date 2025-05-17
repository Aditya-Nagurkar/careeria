import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">About Careeria</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Careeria, we're dedicated to helping individuals discover their ideal career paths through 
                the power of AI-driven analysis. Our platform combines advanced algorithms with comprehensive 
                career data to provide personalized recommendations that align with your unique skills, 
                personality traits, and aspirations.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-[#603CBA] font-bold text-xl mb-2">1</div>
                  <h3 className="font-semibold mb-2">Take the Assessment</h3>
                  <p className="text-gray-600">Complete our comprehensive assessment to analyze your skills and personality traits.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-[#603CBA] font-bold text-xl mb-2">2</div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Our AI processes your responses to identify career paths that match your profile.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-[#603CBA] font-bold text-xl mb-2">3</div>
                  <h3 className="font-semibold mb-2">Get Recommendations</h3>
                  <p className="text-gray-600">Receive personalized career suggestions with detailed insights and guidance.</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/">
                  <Button 
                    size="lg"
                    className="bg-[#603CBA] hover:bg-[#4e309e] text-white px-8"
                  >
                    Start Your Career Discovery
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 