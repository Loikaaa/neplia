
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import CountrySelector from '@/components/selection/CountrySelector';
import ExamTypeSelector from '@/components/selection/ExamTypeSelector';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Exam types data
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
  }
];

const SelectionHome: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check for exam parameter in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      const validExam = examTypes.find(exam => exam.id === examParam);
      if (validExam) {
        setSelectedExam(examParam);
        // If we have an exam from URL, start at step 1 (country selection)
        setStep(1);
      }
    }
  }, [location]);

  // Check if we have saved preferences
  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    const savedExam = localStorage.getItem('selectedExam');
    
    if (savedCountry) {
      setSelectedCountry(savedCountry);
    }
    
    if (savedExam && !selectedExam) {
      setSelectedExam(savedExam);
    }
  }, [selectedExam]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
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
      
      // Save preferences to localStorage
      localStorage.setItem('selectedCountry', selectedCountry);
      localStorage.setItem('selectedExam', selectedExam);
      
      // Navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  // Get the current exam name for the page title
  const getCurrentExamName = () => {
    if (!selectedExam) return '';
    const exam = examTypes.find(e => e.id === selectedExam);
    return exam ? exam.name : '';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16 pb-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedExam ? `Prepare for ${getCurrentExamName()}` : 'Personalize Your Learning Journey'}
            </motion.h1>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {selectedExam 
                ? `Let's customize your ${getCurrentExamName()} preparation based on your target country.`
                : "Let's customize your experience to match your specific needs. We'll tailor our resources and practice tests to your target exam."}
            </motion.p>
          </div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {step === 1 ? "Step 1: Your Location" : "Step 2: Target Exam"}
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
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mt-8">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-indigo mr-3 mt-0.5" />
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
              <Button onClick={handleNextStep} className="bg-indigo hover:bg-indigo/90">
                {step === 2 ? "Finish Setup" : "Continue"}
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
