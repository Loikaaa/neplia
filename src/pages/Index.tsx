
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import StatisticsSection from '@/components/StatisticsSection';
import PerformanceTracker from '@/components/performance/PerformanceTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookOpen, Headphones, Edit, MessageSquare, ArrowRight, ChevronRight } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
  }, []);

  const examTypes = [
    {
      name: 'IELTS',
      description: 'International English Language Testing System',
      path: '/practice/ielts',
      color: 'bg-indigo hover:bg-indigo-600',
      gradient: 'from-indigo-500 to-indigo-700',
      icon: <BookOpen size={24} className="text-white" />
    },
    {
      name: 'TOEFL',
      description: 'Test of English as a Foreign Language',
      path: '/practice/toefl',
      color: 'bg-blue-600 hover:bg-blue-700',
      gradient: 'from-blue-500 to-blue-700',
      icon: <Headphones size={24} className="text-white" />
    },
    {
      name: 'PTE',
      description: 'Pearson Test of English',
      path: '/practice/pte',
      color: 'bg-teal-700 hover:bg-teal-800',
      gradient: 'from-teal-600 to-teal-800',
      icon: <Edit size={24} className="text-white" />
    },
    {
      name: 'GRE',
      description: 'Graduate Record Examination',
      path: '/practice/gre',
      color: 'bg-purple-700 hover:bg-purple-800',
      gradient: 'from-purple-600 to-purple-800',
      icon: <BookOpen size={24} className="text-white" />
    },
    {
      name: 'GMAT',
      description: 'Graduate Management Admission Test',
      path: '/practice/gmat',
      color: 'bg-blue-800 hover:bg-blue-900',
      gradient: 'from-blue-700 to-blue-900',
      icon: <BookOpen size={24} className="text-white" />
    },
    {
      name: 'SAT',
      description: 'Scholastic Assessment Test',
      path: '/practice/sat',
      color: 'bg-red-700 hover:bg-red-800',
      gradient: 'from-red-600 to-red-800',
      icon: <Edit size={24} className="text-white" />
    }
  ];

  const handleStartPreparation = () => {
    console.log('Start Preparation clicked');
    navigate('/practice');
  };

  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      
      {/* Why Choose Our Platform Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative section-title">
              Why Choose Our Exam Preparation Platform?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of successful test-takers who have achieved their target scores with our comprehensive preparation system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600 dark:text-gray-300">24/7 access to all practice materials, anytime and anywhere.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">Personalized feedback on every test to help you improve.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Exam Environment</h3>
              <p className="text-gray-600 dark:text-gray-300">Real exam-like environment to prepare you for the actual test.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">Detailed performance analytics to track your progress.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">Regular content updates to keep up with the latest exam patterns.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Compatible</h3>
              <p className="text-gray-600 dark:text-gray-300">Mobile compatibility for on-the-go learning, anywhere anytime.</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={handleStartPreparation}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:opacity-90"
            >
              Start Your Preparation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative section-title">
              Exam Practice
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Prepare for your exams with our comprehensive practice modules and tests
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {examTypes.map((exam) => (
              <Card 
                key={exam.name} 
                className="exam-card group overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className={`bg-gradient-to-r ${exam.gradient} p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      {exam.icon}
                    </div>
                    <div className="bg-white/20 rounded-full text-xs text-white px-3 py-1">
                      Popular
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-white">{exam.name}</CardTitle>
                  <CardDescription className="text-white/90 text-sm md:text-base">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {['Reading', 'Writing', 'Speaking', 'Listening'].map((skill) => (
                        <span key={skill} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-3">
                      <Link to={exam.path} className="block w-full">
                        <Button className={`w-full ${exam.color} text-white group-hover:translate-y-0 transform transition-transform duration-300 flex justify-between items-center`}>
                          Start Practice
                          <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/practice" 
              onClick={(e) => {
                console.log('Link clicked');
                handleStartPreparation();
              }}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:opacity-90"
            >
              Start Your Preparation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-purple-50 to-white dark:from-indigo-950/30 dark:to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 section-title bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Track Your Progress
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Monitor your performance across all test sections and see your improvement over time.
          </p>
          <div className="max-w-4xl mx-auto">
            <PerformanceTracker />
          </div>
        </div>
      </section>
      
      <StatisticsSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
