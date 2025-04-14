import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import CountrySelector from '@/components/selection/CountrySelector';
import ExamTypeSelector from '@/components/selection/ExamTypeSelector';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, LogIn, UserPlus, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const generateTempCredentials = () => {
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const username = `guest${randomId}`;
  const password = Math.random().toString(36).slice(2, 10);
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  return {
    username,
    password,
    expiryDate: expiryDate.toISOString()
  };
};

const saveGuestDataForAdmin = (guestData) => {
  const existingGuestUsers = JSON.parse(localStorage.getItem('guestUsers') || '[]');
  existingGuestUsers.push(guestData);
  localStorage.setItem('guestUsers', JSON.stringify(existingGuestUsers));
};

const examTypes = [
  {
    id: 'ielts-academic',
    name: 'IELTS Academic',
    description: 'For higher education and professional registration',
    icon: '🎓'
  },
  {
    id: 'ielts-general',
    name: 'IELTS General Training',
    description: 'For work experience, migration and secondary education',
    icon: '✈️'
  },
  {
    id: 'toefl',
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language',
    icon: '📝'
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    description: 'Pearson Test of English Academic',
    icon: '🖥️'
  },
  {
    id: 'duolingo',
    name: 'Duolingo English Test',
    description: 'Online English proficiency test',
    icon: '🦉'
  },
  {
    id: 'cambridge',
    name: 'Cambridge English',
    description: 'C1 Advanced & C2 Proficiency exams',
    icon: '🏛️'
  },
  {
    id: 'oet',
    name: 'OET',
    description: 'Occupational English Test for healthcare professionals',
    icon: '⚕️'
  },
  {
    id: 'sat',
    name: 'SAT',
    description: 'Scholastic Assessment Test for college admissions in the US',
    icon: '🧮'
  },
  {
    id: 'gre',
    name: 'GRE',
    description: 'Graduate Record Examination for graduate school admissions',
    icon: '🎯'
  },
  {
    id: 'gmat',
    name: 'GMAT',
    description: 'Graduate Management Admission Test for business schools',
    icon: '📊'
  }
];

const SelectionHome: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [step, setStep] = useState(1); // Start directly at country selection
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      const validExam = examTypes.find(exam => exam.id === examParam);
      if (validExam) {
        setSelectedExam(examParam);
        setStep(1);
      }
    }
  }, [location]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
  };

  const getExamRedirectPath = (examId: string) => {
    const examMap: Record<string, string> = {
      'ielts-academic': '/exams/ielts',
      'ielts-general': '/exams/ielts',
      'toefl': '/exams/toefl',
      'pte': '/exams/pte',
      'duolingo': '/exams/ielts',
      'cambridge': '/exams/ielts',
      'oet': '/exams/ielts',
      'sat': '/exams/sat',
      'gre': '/exams/gre',
      'gmat': '/exams/gmat'
    };
    
    return examMap[examId] || '/dashboard';
  };

  const getExamDescription = (examId: string) => {
    const descriptionMap: Record<string, string> = {
      'ielts-academic': "Let's customize your IELTS Academic preparation based on your target country. We'll provide university-specific requirements and academic materials.",
      'ielts-general': "Let's tailor your IELTS General Training preparation for immigration or work purposes in your target country.",
      'toefl': "Let's optimize your TOEFL preparation with university-specific requirements for your desired destinations.",
      'pte': "Let's prepare you for the Pearson Test of English with country-specific immigration and academic requirements.",
      'duolingo': "Let's get you ready for the Duolingo English Test with customized practice for your target institutions.",
      'cambridge': "Let's prepare you for Cambridge English qualifications with region-specific training resources.",
      'oet': "Let's focus your Occupational English Test preparation for healthcare professionals in your target country.",
      'sat': "Let's customize your SAT preparation strategy for college admissions in the United States.",
      'gre': "Let's tailor your GRE preparation for graduate school applications with school-specific focus areas.",
      'gmat': "Let's optimize your GMAT preparation with business school-specific requirements for your target institutions."
    };
    
    return descriptionMap[examId] || "Let's customize your experience to match your specific needs. We'll tailor our resources and practice tests to your target exam and destination.";
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedCountry) {
        toast({
          title: "Please select a country",
          description: "You need to select your country to continue.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      if (!selectedExam) {
        toast({
          title: "Please select an exam type",
          description: "You need to select an exam type to continue.",
          variant: "destructive",
        });
        return;
      }
      
      localStorage.setItem('selectedCountry', selectedCountry);
      localStorage.setItem('selectedExam', selectedExam);
      
      const redirectPath = getExamRedirectPath(selectedExam);
      navigate(redirectPath);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20 pt-16 pb-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo via-purple-500 to-pink-500 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedExam ? `Prepare for ${getCurrentExamName()}` : 'Personalize Your Exam Proficiency Journey'}
            </motion.h1>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {selectedExam ? getExamDescription(selectedExam) : 
               "Let's customize your experience to match your specific needs. We'll tailor our resources and practice tests to your target exam and destination."}
            </motion.p>
          </div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                {step === 1 ? (
                  <>
                    <Globe className="h-5 w-5 mr-2 text-indigo" />
                    Step 1: Your Location
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5 mr-2 text-indigo" />
                    Step 2: Target Exam
                  </>
                )}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className={`h-6 w-6 rounded-full inline-flex items-center justify-center mr-2 ${step >= 1 ? "bg-indigo text-white" : "bg-gray-200 dark:bg-gray-700"}`}>1</span>
                <span className="mr-2">→</span>
                <span className={`h-6 w-6 rounded-full inline-flex items-center justify-center ${step >= 2 ? "bg-indigo text-white" : "bg-gray-200 dark:bg-gray-700"}`}>2</span>
              </div>
            </div>

            <div className="min-h-[300px]">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="max-w-md mx-auto">
                    <CountrySelector 
                      selectedCountry={selectedCountry} 
                      onCountryChange={handleCountryChange} 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 rounded-lg mt-8 border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-indigo mr-3 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Why do we ask for your location?</p>
                        <p className="text-muted-foreground">
                          We use this information to customize your experience with:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Country-specific exam requirements</li>
                          <li>Regional study resources</li>
                          <li>Local test centers and dates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ExamTypeSelector 
                  examTypes={examTypes} 
                  selectedExam={selectedExam} 
                  onExamChange={handleExamChange} 
                />
              )}
            </div>

            <div className="flex justify-between mt-8">
              {step === 1 ? (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip for now
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNextStep} 
                className="bg-gradient-to-r from-indigo to-purple-600 hover:from-indigo/90 hover:to-purple-600/90 text-white"
              >
                {step === 2 ? "Start Practice" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <div className="text-center text-sm text-muted-foreground">
            <p>You can always change these settings later from your profile.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectionHome;
