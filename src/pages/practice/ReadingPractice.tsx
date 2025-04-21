
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePracticeLimit } from '@/hooks/use-practice-limit';

const ReadingPractice = () => {
  const [examType, setExamType] = useState('ielts');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { canPractice, incrementPracticeCount } = usePracticeLimit();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    document.title = 'Reading Practice | Neplia';
    
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam.toLowerCase());
      // Also save to localStorage for persistence
      localStorage.setItem('selectedExam', examParam.toLowerCase());
    } else {
      const savedExam = localStorage.getItem('selectedExam');
      if (savedExam) {
        let baseExamType = savedExam.split('-')[0];
        setExamType(baseExamType);
      }
    }
  }, [location]);

  const getExamTitle = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return 'TOEFL Reading Practice';
      case 'pte':
        return 'PTE Reading Practice';
      case 'gre':
        return 'GRE Reading Practice';
      case 'gmat':
        return 'GMAT Reading Practice';
      case 'sat':
        return 'SAT Reading Practice';
      default:
        return 'IELTS Reading Practice';
    }
  };
  
  const getExamDescription = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return 'Improve your academic reading skills with TOEFL-style passages and questions.';
      case 'pte':
        return 'Enhance your reading skills with various PTE Academic reading tasks.';
      case 'gre':
        return 'Build your verbal reasoning skills with GRE-style reading comprehension passages.';
      case 'gmat':
        return 'Develop your critical reasoning skills with GMAT reading passages.';
      case 'sat':
        return 'Practice with SAT-style reading passages and evidence-based questions.';
      default:
        return 'Enhance your reading comprehension with various text types and question formats.';
    }
  };

  const handleStartPractice = () => {
    if (!canPractice()) {
      toast({
        title: "Practice Limit Reached",
        description: "You've reached your daily free practice limit. Please upgrade to premium or wait 24 hours.",
        variant: "destructive"
      });
      navigate("/pricing");
      return;
    }
    
    const success = incrementPracticeCount();
    if (success) {
      // This would normally start the practice
      toast({
        title: "Practice Started",
        description: `Your ${examType.toUpperCase()} reading practice has started successfully.`,
      });
      // This is just a placeholder - you would normally navigate to the actual practice page or load practice content
    } else {
      navigate("/pricing");
    }
  };

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {getExamTitle()}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {getExamDescription()}
          </p>
        </div>
        
        <div className="grid gap-8 mb-16">
          <Card className="overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Available {examType.toUpperCase()} Reading Practice</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Click the button below to start your {examType.toUpperCase()} reading practice session. You'll have access to various texts and question types.
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleStartPractice}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  Start Reading Practice
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReadingPractice;
