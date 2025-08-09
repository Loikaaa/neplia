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
import { BookOpen, Headphones, Edit, MessageSquare, ArrowRight, ChevronRight, BarChart3 } from 'lucide-react';

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

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
    console.log('Index.tsx mounted: test banner should be visible');
  }, []);

  const handleStartPreparation = () => {
    console.log('Start Preparation clicked, navigating to /practice');
    navigate('/practice');
  };

  return (
    <Layout>
      {/* Test banner to verify rendering */}
      <section role="status" aria-live="polite" className="bg-primary/10 border border-primary/20 text-foreground py-2">
        <div className="container mx-auto text-center text-sm">
          Test notice: Home page is rendering. If you can read this, edits are working.
        </div>
      </section>
      <HeroSection />
      
      {/* Quick Start Section */}
      <section className="py-12 px-4 md:px-0 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Your IELTS Journey</h2>
            <p className="text-muted-foreground">Choose your path to IELTS success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Practice Tests</h3>
                <p className="text-sm text-muted-foreground mb-4">Start with targeted practice exercises</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/practice">Start Practice</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Help</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with teachers and students</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/chat">Join Chat</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground mb-4">Monitor your improvement</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeatureSection />
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative section-title">
              Choose Your Exam
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Prepare for your target exam with our specialized practice modules
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {examTypes.slice(0, 6).map((exam) => (
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
            <Button 
              onClick={handleStartPreparation}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:opacity-90"
            >
              Start Your Preparation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <StatisticsSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
