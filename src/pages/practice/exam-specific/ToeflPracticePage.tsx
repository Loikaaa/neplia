
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, BookOpen, Edit, MessageSquare } from 'lucide-react';

const ToeflPracticePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    document.title = 'TOEFL Practice | Neplia';
    
    // Save exam preference to localStorage
    localStorage.setItem('selectedExam', 'toefl');
  }, []);
  
  const practiceOptions = [
    {
      title: 'Reading Practice',
      description: 'Practice with academic passages and multiple-choice questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: 'Improve your listening skills with lectures and conversations',
      icon: Headphones,
      path: '/practice/listening?exam=toefl',
      color: 'bg-indigo'
    },
    {
      title: 'Speaking Practice',
      description: 'Practice independent and integrated speaking tasks',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: 'Develop your integrated and independent writing skills',
      icon: Edit,
      path: '/practice/writing?exam=toefl',
      color: 'bg-purple-600'
    }
  ];
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TOEFL Practice Center
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a section to practice your TOEFL skills. Our specialized practice modules will help you prepare for each section of the TOEFL exam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {practiceOptions.map((option, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <CardHeader className={`${option.color} text-white p-6`}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <option.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-6">{option.description}</p>
                <Button 
                  onClick={() => navigate(option.path)}
                  className="w-full bg-indigo hover:bg-indigo-600"
                >
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for a Full TOEFL Experience?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Test your skills across all TOEFL sections with our comprehensive mock exam. Experience realistic test conditions and get detailed feedback on your performance.
            </p>
            <Button 
              onClick={() => navigate('/practice/mock-test?exam=toefl')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg"
            >
              Take Full Mock Test
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ToeflPracticePage;
