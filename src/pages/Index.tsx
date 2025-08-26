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
    gradient: 'from-indigo to-primary',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language',
    path: '/practice/toefl',
    gradient: 'from-teal to-cyan-600',
    icon: <Headphones size={20} className="text-white" />
  },
  {
    name: 'PTE',
    description: 'Pearson Test of English',
    path: '/practice/pte',
    gradient: 'from-purple to-magenta',
    icon: <Edit size={20} className="text-white" />
  },
  {
    name: 'GRE',
    description: 'Graduate Record Examination',
    path: '/practice/gre',
    gradient: 'from-orange to-coral',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'GMAT',
    description: 'Graduate Management Admission Test',
    path: '/practice/gmat',
    gradient: 'from-pink to-accent',
    icon: <BookOpen size={20} className="text-white" />
  },
  {
    name: 'SAT',
    description: 'Scholastic Assessment Test',
    path: '/practice/sat',
    gradient: 'from-coral to-orange',
    icon: <Edit size={20} className="text-white" />
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
  }, []);

  const handleStartPreparation = () => {
    console.log('Start Preparation clicked, navigating to /practice');
    navigate('/practice');
  };

  return (
    <Layout>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
            {examTypes.slice(0, 6).map((exam) => (
              <Card 
                key={exam.name} 
                className="exam-card group overflow-hidden glass-card shadow-glass hover:shadow-xl transition-all duration-300 animate-scale-in"
              >
                <CardHeader className={`bg-gradient-to-br ${exam.gradient} p-3 sm:p-4 lg:p-5`}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {exam.icon}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full text-xs text-white px-2 py-1 sm:px-3 hidden sm:block">
                      Top
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-lg lg:text-xl font-bold text-white leading-tight">{exam.name}</CardTitle>
                  <CardDescription className="text-white/90 text-xs sm:text-sm lg:text-base leading-tight hidden sm:block">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 lg:p-5">
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {['Reading', 'Writing', 'Speaking', 'Listening'].map((skill) => (
                        <span key={skill} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-2 sm:pt-3">
                      <Link to={exam.path} className="block w-full">
                        <Button 
                          className="w-full btn-primary text-xs sm:text-sm font-medium group-hover:shadow-lg transform transition-all duration-300 flex justify-between items-center"
                          size={isMobile ? "sm" : "default"}
                        >
                          <span className="hidden sm:inline">Start Practice</span>
                          <span className="sm:hidden">Practice</span>
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 transform group-hover:translate-x-1 transition-transform" />
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
