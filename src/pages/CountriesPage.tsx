
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import PopularDestinations from '@/components/abroad/PopularDestinations';
import StudyStats from '@/components/abroad/StudyStats';
import { motion } from 'framer-motion';
import { Search, ArrowRight, CircleCheck, Info, BookOpen, Users, Globe } from 'lucide-react';
import CountrySelector from '@/components/selection/CountrySelector';

const CountriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCountrySearch = () => {
    if (selectedCountry) {
      navigate(`/country/${selectedCountry}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
                Study Abroad Guide
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Your Journey to <span className="text-indigo-600 dark:text-indigo-400">Global Education</span> Starts Here
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Explore comprehensive guides, requirements, and insights for studying abroad in top destinations worldwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Explore Programs
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </section>

      {/* Stats Section */}
      <StudyStats />

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Search and Requirements Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Find Country Requirements</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Search specific requirements for your desired study destination.
              </p>
            </div>
            
            <div className="max-w-xl mx-auto mb-12 space-y-4">
              <CountrySelector 
                selectedCountry={selectedCountry} 
                onCountryChange={setSelectedCountry} 
              />
              
              <Button 
                onClick={handleCountrySearch} 
                disabled={!selectedCountry}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Requirements
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Understanding Country Requirements</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Different countries have different English proficiency requirements for various purposes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Immigration & PR",
                  description: "Requirements for permanent residency and migration",
                  icon: Globe
                },
                {
                  title: "Study & Education",
                  description: "Requirements for university and college admission",
                  icon: BookOpen
                },
                {
                  title: "Work & Employment",
                  description: "Requirements for work visas and professional registration",
                  icon: Users
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-bold">Important Notes</h3>
              </div>
              <div className="space-y-4 ml-8">
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Requirements may change frequently. Always check the official immigration or university websites for the most up-to-date information.
                  </p>
                </div>
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Some institutions or programs may have higher requirements than the general country standard.
                  </p>
                </div>
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Different visa categories may have different English proficiency requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Get personalized guidance for your study abroad journey.
              </p>
              <Link to="/selection">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-6 h-auto">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CountriesPage;
