import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { careers, countries } from '@/utils/careerData';
import { Search } from 'lucide-react';
import CareerCard from '@/components/CareerCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Global');

  const filteredCareers = useMemo(() => {
    let filtered = careers;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(career => 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        career.personalityTraits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase())) ||
        career.relevantFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by country (if not global)
    if (selectedCountry !== 'Global') {
      filtered = filtered.filter(career => career.countries.includes(selectedCountry));
    }
    
    // Limit to max 30 results to improve performance
    return filtered.slice(0, 30);
  }, [searchTerm, selectedCountry]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Careers</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our comprehensive database of career paths. Each career comes with 
                detailed information about required skills, personality traits, and growth outlook.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search careers, skills, or traits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-lg"
                  />
                </div>
                
                <div className="md:w-64">
                  <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Country
                  </label>
                  <Select
                    value={selectedCountry}
                    onValueChange={(value) => setSelectedCountry(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="Global" value="Global">
                        All Countries
                      </SelectItem>
                      {countries.filter(c => c.value !== 'Global').map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-sm text-gray-600">
                Found <span className="font-medium">{filteredCareers.length}</span> careers
                {selectedCountry !== 'Global' && ` in ${countries.find(c => c.value === selectedCountry)?.label || selectedCountry}`}
                {searchTerm && ` matching "${searchTerm}"`}
                {filteredCareers.length >= 30 && " (showing top 30)"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career, index) => (
                  <div key={career.id}>
                    <CareerCard 
                      career={career}
                      rank={index}
                      country={selectedCountry}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">No careers found matching your search criteria.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {searchTerm && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchTerm('')}
                        className="border-[#603CBA] text-[#603CBA] hover:bg-[#603CBA]/10"
                      >
                        Clear Search
                      </Button>
                    )}
                    {selectedCountry !== 'Global' && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCountry('Global')}
                        className="border-[#603CBA] text-[#603CBA] hover:bg-[#603CBA]/10"
                      >
                        Show All Countries
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
