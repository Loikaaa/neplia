import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
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
      gradient: 'from-indigo-500 to-indigo-700',
      icon: '🌟'
    },
    {
      name: 'TOEFL',
      description: 'Test of English as a Foreign Language',
      path: '/practice/toefl',
      color: 'bg-blue-600 hover:bg-blue-700',
      gradient: 'from-blue-500 to-blue-700',
      icon: '📚'
    },
    {
      name: 'PTE',
      description: 'Pearson Test of English',
      path: '/practice/pte',
      color: 'bg-teal-700 hover:bg-teal-800',
      gradient: 'from-teal-600 to-teal-800',
      icon: '🎯'
    },
    {
      name: 'GRE',
      description: 'Graduate Record Examination',
      path: '/practice/gre',
      color: 'bg-purple-700 hover:bg-purple-800',
      gradient: 'from-purple-600 to-purple-800',
      icon: '🎓'
    },
    {
      name: 'GMAT',
      description: 'Graduate Management Admission Test',
      path: '/practice/gmat',
      color: 'bg-blue-800 hover:bg-blue-900',
      gradient: 'from-blue-700 to-blue-900',
      icon: '📊'
    },
    {
      name: 'SAT',
      description: 'Scholastic Assessment Test',
      path: '/practice/sat',
      color: 'bg-red-700 hover:bg-red-800',
      gradient: 'from-red-600 to-red-800',
      icon: '✏️'
    }
  ];

  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      
      <section className="py-12 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-900 dark:to-indigo-950/20">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 mb-4">
              Choose Your Path
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Exam Practice
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Prepare for your exams with our comprehensive practice modules and tests
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
            {examTypes.map((exam) => (
              isMobile ? (
                <Link 
                  key={exam.name} 
                  to={exam.path}
                  className="transform transition-all duration-300 hover:scale-102"
                >
                  <div className={`bg-gradient-to-br ${exam.gradient} rounded-xl p-3 h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow border border-white/10`}>
                    <div className="text-center mb-2">
                      <span className="text-2xl mb-1 block">{exam.icon}</span>
                      <h3 className="text-white font-bold text-base mb-0.5">{exam.name}</h3>
                    </div>
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white/10 text-white hover:bg-white/20 border-none text-sm py-1"
                    >
                      Start
                    </Button>
                  </div>
                </Link>
              ) : (
                <Card 
                  key={exam.name} 
                  className="overflow-hidden border border-gray-100 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader className={`bg-gradient-to-br ${exam.gradient} text-white p-4`}>
                    <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                      <span>{exam.icon}</span>
                      {exam.name}
                    </CardTitle>
                    <CardDescription className="text-white/90 text-sm">
                      {exam.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Link to={exam.path} className="block w-full">
                      <Button className={`w-full ${exam.color} text-white shadow hover:shadow-md transition-all`}>
                        Start Practice
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-0 bg-gradient-to-b from-purple-50/50 to-white dark:from-indigo-950/20 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 mb-4">
              Track Progress
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Your Learning Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-2">
              Monitor your performance across all test sections
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <PerformanceTracker />
          </div>
        </div>
      </section>
      
      <StatisticsSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
