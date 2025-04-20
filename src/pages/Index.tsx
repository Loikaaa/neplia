import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import StatisticsSection from '@/components/StatisticsSection';
import PerformanceTracker from '@/components/performance/PerformanceTracker';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
  }, []);

  const examTypes = [
    {
      name: 'IELTS',
      description: 'International English Language Testing System',
      path: '/practice/ielts',
      color: 'bg-indigo hover:bg-indigo-600',
      gradient: 'from-indigo-500 to-indigo-700'
    },
    {
      name: 'TOEFL',
      description: 'Test of English as a Foreign Language',
      path: '/practice/toefl',
      color: 'bg-blue-600 hover:bg-blue-700',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      name: 'PTE',
      description: 'Pearson Test of English',
      path: '/practice/pte',
      color: 'bg-teal-700 hover:bg-teal-800',
      gradient: 'from-teal-600 to-teal-800'
    },
    {
      name: 'GRE',
      description: 'Graduate Record Examination',
      path: '/practice/gre',
      color: 'bg-purple-700 hover:bg-purple-800',
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      name: 'GMAT',
      description: 'Graduate Management Admission Test',
      path: '/practice/gmat',
      color: 'bg-blue-800 hover:bg-blue-900',
      gradient: 'from-blue-700 to-blue-900'
    },
    {
      name: 'SAT',
      description: 'Scholastic Assessment Test',
      path: '/practice/sat',
      color: 'bg-red-700 hover:bg-red-800',
      gradient: 'from-red-600 to-red-800'
    }
  ];

  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
              Exam Practice
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Prepare for your exams with our comprehensive practice modules and tests
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {examTypes.map((exam) => (
              <Card 
                key={exam.name} 
                className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className={`bg-gradient-to-r ${exam.gradient} text-white p-5`}>
                  <CardTitle className="text-xl md:text-2xl font-bold">{exam.name}</CardTitle>
                  <CardDescription className="text-white/90 text-sm md:text-base">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <Link to={exam.path} className="block w-full">
                    <Button className={`w-full ${exam.color} text-white shadow-lg hover:shadow-xl transition-all`}>
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Track Your Progress</h2>
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
