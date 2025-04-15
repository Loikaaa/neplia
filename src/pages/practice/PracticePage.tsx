
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
  ExternalLink,
  ArrowRight
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
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
      sections: ['Reading', 'Listening', 'Writing', 'Speaking']
    },
    {
      name: 'TOEFL',
      path: '/practice/toefl',
      color: 'bg-gradient-to-r from-blue-500 to-blue-700',
      sections: ['Reading', 'Listening', 'Writing', 'Speaking']
    },
    {
      name: 'PTE',
      path: '/practice/pte',
      color: 'bg-gradient-to-r from-teal-600 to-teal-800',
      sections: ['Reading', 'Listening', 'Speaking & Writing']
    },
    {
      name: 'GRE',
      path: '/practice/gre',
      color: 'bg-gradient-to-r from-purple-600 to-purple-800',
      sections: ['Verbal', 'Quantitative', 'Analytical Writing']
    },
    {
      name: 'GMAT',
      path: '/practice/gmat',
      color: 'bg-gradient-to-r from-blue-700 to-blue-900',
      sections: ['Verbal', 'Quantitative', 'Integrated Reasoning', 'Analytical Writing']
    },
    {
      name: 'SAT',
      path: '/practice/sat',
      color: 'bg-gradient-to-r from-red-600 to-red-800',
      sections: ['Reading & Writing', 'Math']
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Exam Practice Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Prepare for your exams with our comprehensive practice modules and full mock tests.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
          </div>
          
          {/* Exam Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {examTypes.map((exam) => (
              <Link 
                key={exam.name} 
                to={exam.path} 
                className="group transform transition-all duration-300 hover:scale-105"
              >
                <div className={`${exam.color} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full`}>
                  <div className="p-5 md:p-6 text-white">
                    <h3 className="font-bold text-lg md:text-xl mb-3 group-hover:translate-x-1 transition-transform">
                      {exam.name}
                    </h3>
                    <div className="text-xs md:text-sm text-white/90 mb-4">
                      {exam.sections.length} practice sections
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exam.sections.map((section, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block bg-white/20 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-black/10 p-3 flex items-center justify-between group-hover:bg-black/20 transition-colors">
                    <span className="text-white text-sm">Start Practice</span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Skills Practice Section */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-gray-200/80 dark:border-gray-800/80 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Practice by Skill
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Focus on specific language skills across different exam formats
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Reading */}
              <Link 
                to="/practice/reading" 
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 dark:text-white">Reading</h3>
              </Link>
              
              {/* Listening */}
              <Link 
                to="/practice/listening" 
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Headphones className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 dark:text-white">Listening</h3>
              </Link>
              
              {/* Speaking */}
              <Link 
                to="/practice/speaking" 
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 dark:text-white">Speaking</h3>
              </Link>
              
              {/* Writing */}
              <Link 
                to="/practice/writing" 
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 dark:text-white">Writing</h3>
              </Link>
            </div>
          </div>
          
          {/* Mock Test CTA */}
          <div className="mt-12 text-center">
            <Link 
              to="/practice/mock-test" 
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Take a Full Mock Test
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
