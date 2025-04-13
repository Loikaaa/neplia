
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Edit, 
  Calculator,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

const examTitles: Record<string, string> = {
  'ielts': 'IELTS',
  'toefl': 'TOEFL',
  'pte': 'PTE Academic',
  'duolingo': 'Duolingo English Test',
  'cambridge': 'Cambridge English',
  'oet': 'OET',
  'sat': 'SAT',
  'gre': 'GRE',
  'gmat': 'GMAT'
};

const PracticePage = () => {
  const [examType, setExamType] = useState('ielts');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const savedExam = localStorage.getItem('selectedExam');
    
    if (savedExam) {
      let baseExamType = savedExam.split('-')[0];
      
      if (savedExam.startsWith('ielts')) {
        baseExamType = 'ielts';
      }
      
      setExamType(baseExamType);
    }
    
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam);
      
      // Redirect to specific exam practice page
      const validExams = ['ielts', 'toefl', 'pte', 'gre', 'gmat', 'sat'];
      if (validExams.includes(examParam)) {
        navigate(`/practice/${examParam}`, { replace: true });
      }
    }
  }, [location, navigate]);

  const getExamTitle = () => {
    return examTitles[examType] || 'IELTS';
  };

  const examTypes = [
    {
      name: 'IELTS',
      path: '/practice/ielts',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-700'
    },
    {
      name: 'TOEFL',
      path: '/practice/toefl',
      color: 'bg-gradient-to-r from-blue-500 to-blue-700'
    },
    {
      name: 'PTE',
      path: '/practice/pte',
      color: 'bg-gradient-to-r from-teal-600 to-teal-800'
    },
    {
      name: 'GRE',
      path: '/practice/gre',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800'
    },
    {
      name: 'GMAT',
      path: '/practice/gmat',
      color: 'bg-gradient-to-r from-blue-700 to-blue-900'
    },
    {
      name: 'SAT',
      path: '/practice/sat',
      color: 'bg-gradient-to-r from-red-600 to-red-800'
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{getExamTitle()} Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your {getExamTitle()} exam with our comprehensive practice modules and full mock tests.
            </p>
            <div className="pt-6">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Select an exam to begin practicing:
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {examTypes.map((exam) => (
                  <Link key={exam.name} to={exam.path} className="transform transition-all duration-300 hover:scale-105">
                    <Button 
                      variant="outline"
                      className={`w-full h-full py-6 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg ${exam.color} text-white border-0`}
                    >
                      <span className="font-bold text-lg md:text-xl">{exam.name}</span>
                      <ExternalLink className="h-4 w-4 md:h-5 md:w-5 opacity-80" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
