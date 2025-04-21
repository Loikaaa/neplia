
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, BookOpen, Edit, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ToeflPracticePage = () => {
  const navigate = useNavigate();
  const [toeflType, setToeflType] = useState('ibt');
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    document.title = 'TOEFL Practice | Neplia';
    
    // Save exam preference to localStorage
    localStorage.setItem('selectedExam', 'toefl');
  }, []);
  
  const toeflTypes = [
    { value: 'ibt', label: '🖥️ TOEFL iBT (Most Popular)', description: '2024 Shorter Format' },
    { value: 'pbt', label: '📝 TOEFL PBT (Legacy Paper Test)', description: 'For regions without Internet tests' },
    { value: 'essentials', label: '⚡ TOEFL Essentials (Shortened Adaptive Test)', description: 'Shorter, adaptive version' },
    { value: 'itp', label: '🏫 TOEFL ITP (For School Placement)', description: 'For academic institutions' }
  ];
  
  const ibtPracticeOptions = [
    {
      title: 'Reading Practice',
      description: '20 questions, 35 minutes - Academic passages with multiple-choice questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: '28 questions, 36 minutes - Lectures and conversations with comprehension questions',
      icon: Headphones,
      path: '/practice/listening?exam=toefl',
      color: 'bg-indigo'
    },
    {
      title: 'Speaking Practice',
      description: '4 tasks, 16 minutes - Independent and integrated speaking tasks',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: '2 tasks, 29 minutes - Integrated and independent writing tasks',
      icon: Edit,
      path: '/practice/writing?exam=toefl',
      color: 'bg-purple-600'
    }
  ];
  
  // NOTE: We would create similar arrays for other TOEFL types (pbt, essentials, itp)
  // For now we'll use the same options with different descriptions
  const pbtPracticeOptions = [
    {
      title: 'Reading Practice',
      description: '50 questions, 55 minutes - Reading comprehension and grammar questions',
      icon: BookOpen,
      path: '/practice/reading?exam=toefl-pbt',
      color: 'bg-blue-600'
    },
    {
      title: 'Listening Practice',
      description: '50 questions, 30-40 minutes - Short conversations and lectures',
      icon: Headphones,
      path: '/practice/listening?exam=toefl-pbt',
      color: 'bg-indigo'
    },
    {
      title: 'Structure Practice',
      description: '40 questions, 25 minutes - Structure and written expression tasks',
      icon: MessageSquare,
      path: '/practice/speaking?exam=toefl-pbt',
      color: 'bg-amber-600'
    },
    {
      title: 'Writing Practice',
      description: '30 minutes - TWE (Test of Written English)',
      icon: Edit,
      path: '/practice/writing?exam=toefl-pbt',
      color: 'bg-purple-600'
    }
  ];
  
  const getPracticeOptions = () => {
    switch(toeflType) {
      case 'pbt': return pbtPracticeOptions;
      case 'essentials': return ibtPracticeOptions; // Placeholder, would be customized
      case 'itp': return pbtPracticeOptions; // Placeholder, would be customized
      default: return ibtPracticeOptions;
    }
  };
  
  const practiceOptions = getPracticeOptions();
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TOEFL Practice Center
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Choose a section to practice your TOEFL skills. Our specialized practice modules will help you prepare for each section of the TOEFL exam.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="text-left mb-2 text-sm font-medium">Which TOEFL exam are you preparing for?</div>
            <Select value={toeflType} onValueChange={setToeflType}>
              <SelectTrigger className="mb-6">
                <SelectValue placeholder="Select TOEFL Exam Type" />
              </SelectTrigger>
              <SelectContent>
                {toeflTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              onClick={() => navigate(`/practice/mock-test?exam=toefl-${toeflType}`)}
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
