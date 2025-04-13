
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
  Trophy
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

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{getExamTitle()} Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your {getExamTitle()} exam with our comprehensive practice modules and full mock tests.
            </p>
            <div className="pt-4">
              <p className="text-center text-lg">
                Please select an exam to begin practicing:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <Link to="/practice/ielts">
                  <Button className="w-full bg-indigo hover:bg-indigo-600">IELTS Practice</Button>
                </Link>
                <Link to="/practice/toefl">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">TOEFL Practice</Button>
                </Link>
                <Link to="/practice/pte">
                  <Button className="w-full bg-teal-700 hover:bg-teal-800">PTE Practice</Button>
                </Link>
                <Link to="/practice/gre">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">GRE Practice</Button>
                </Link>
                <Link to="/practice/gmat">
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">GMAT Practice</Button>
                </Link>
                <Link to="/practice/sat">
                  <Button className="w-full bg-red-700 hover:bg-red-800">SAT Practice</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
