import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { 
  Headphones, 
  BookOpen, 
  Edit, 
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Calculator,
  BookText
} from 'lucide-react';
import { mockTestData } from '@/data/mockTestData';

interface FullMockExamProps {
  examType?: string;
  onComplete?: (scores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  }) => void;
}

export const FullMockExam: React.FC<FullMockExamProps> = ({ 
  examType = 'academic',
  onComplete
}) => {
  const [currentSection, setCurrentSection] = useState<'listening' | 'reading' | 'writing' | 'speaking'>('listening');
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sectionScores, setSectionScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  const { toast } = useToast();

  const isSatTest = examType?.includes('sat');
  const isSpecializedTest = isSatTest || examType?.includes('gre') || examType?.includes('gmat');

  useEffect(() => {
    if (examType === 'sat-math') {
      setCurrentSection('reading');
    } else if (examType === 'sat-english') {
      setCurrentSection('writing');
    }
  }, [examType]);

  const startExam = () => {
    setExamStarted(true);
    const listeningSection = mockTestData.sections.find(section => section.type === 'listening');
    setTimeRemaining(listeningSection ? listeningSection.duration * 60 : 30 * 60);
    
    toast({
      title: "Exam Started",
      description: `Your ${examType ? examType.toUpperCase() : 'IELTS'} mock exam has begun. Good luck!`,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (examStarted && timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStarted, timeRemaining]);

  const navigateToSection = (section: 'listening' | 'reading' | 'writing' | 'speaking') => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    
    const selectedSection = mockTestData.sections.find(s => s.type === section);
    
    switch(section) {
      case 'listening':
        setTimeRemaining(selectedSection ? selectedSection.duration * 60 : 30 * 60);
        setProgress(25);
        break;
      case 'reading':
        setTimeRemaining(selectedSection ? selectedSection.duration * 60 : 60 * 60);
        setProgress(50);
        if (progress < 25) {
          setSectionScores(prev => ({
            ...prev,
            listening: generateScore()
          }));
        }
        break;
      case 'writing':
        setTimeRemaining(selectedSection ? selectedSection.duration * 60 : 60 * 60);
        setProgress(75);
        if (progress < 50) {
          setSectionScores(prev => ({
            ...prev,
            reading: generateScore()
          }));
        }
        break;
      case 'speaking':
        setTimeRemaining(selectedSection ? selectedSection.duration * 60 : 15 * 60);
        setProgress(90);
        if (progress < 75) {
          setSectionScores(prev => ({
            ...prev,
            writing: generateScore()
          }));
        }
        break;
    }
    
    toast({
      title: `${section.charAt(0).toUpperCase() + section.slice(1)} Section`,
      description: "You've moved to the next section of the exam.",
    });
  };

  const generateScore = (): number => {
    const baseScore = 5 + Math.random() * 4;
    return Math.round(baseScore * 2) / 2;
  };

  const completeExam = () => {
    const updatedScores = {
      ...sectionScores,
      speaking: generateScore()
    };
    
    setSectionScores(updatedScores);
    setProgress(100);
    setExamStarted(false);
    
    toast({
      title: "Exam Completed",
      description: "Congratulations! You've completed the full IELTS mock exam.",
      variant: "default",
    });
    
    if (onComplete) {
      onComplete(updatedScores);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    const currentSectionData = mockTestData.sections.find(section => section.type === currentSection);
    
    if (!currentSectionData) return;
    
    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (currentSection === 'speaking') {
        completeExam();
      } else {
        const nextSection = 
          currentSection === 'listening' ? 'reading' : 
          currentSection === 'reading' ? 'writing' : 'speaking';
        navigateToSection(nextSection as 'listening' | 'reading' | 'writing' | 'speaking');
      }
    }
  };

  const getSectionIcon = (sectionType: string) => {
    if (isSatTest) {
      if (sectionType === 'reading') return <Calculator className="h-5 w-5 text-indigo mt-0.5" />;
      if (sectionType === 'writing') return <BookText className="h-5 w-5 text-indigo mt-0.5" />;
    }

    if (sectionType === 'listening') return <Headphones className="h-5 w-5 text-indigo mt-0.5" />;
    if (sectionType === 'reading') return <BookOpen className="h-5 w-5 text-indigo mt-0.5" />;
    if (sectionType === 'writing') return <Edit className="h-5 w-5 text-indigo mt-0.5" />;
    if (sectionType === 'speaking') return <MessageSquare className="h-5 w-5 text-indigo mt-0.5" />;
    
    return <BookOpen className="h-5 w-5 text-indigo mt-0.5" />;
  };

  const getSectionTitle = (sectionType: string) => {
    if (examType === 'sat-math' && sectionType === 'reading') return 'Math';
    if (examType === 'sat-english' && sectionType === 'writing') return 'English';
    if (isSatTest) {
      if (sectionType === 'reading') return 'Math';
      if (sectionType === 'writing') return 'English';
    }
    return sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
  };

  const getCurrentSectionContent = () => {
    const sectionData = mockTestData.sections.find(section => section.type === currentSection);
    if (!sectionData || sectionData.questions.length === 0) {
      return (
        <div className="text-center p-8">
          <p>No questions available for this section.</p>
        </div>
      );
    }
    
    const question = sectionData.questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">
            Question {currentQuestionIndex + 1} of {sectionData.questions.length}
          </h3>
          
          <div className="mb-6">
            <p className="text-gray-800 dark:text-gray-200 mb-4">{question.text}</p>
            
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-3">
                {question.options.map(option => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-2 p-3 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <input 
                      type="radio" 
                      id={option.id} 
                      name={question.id} 
                      className="h-4 w-4 text-indigo"
                    />
                    <label htmlFor={option.id} className="flex-grow cursor-pointer">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {question.type === 'fill-in-blank' && (
              <div className="mb-4">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md dark:bg-gray-700"
                  placeholder="Type your answer here"
                />
              </div>
            )}
            
            {question.type === 'essay' && (
              <div className="mb-4">
                <textarea 
                  className="w-full p-3 border rounded-md min-h-[200px] dark:bg-gray-700"
                  placeholder="Write your response here"
                ></textarea>
                {question.maxWords && (
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum word count: {question.maxWords} words
                  </p>
                )}
              </div>
            )}
            
            {question.type === 'speaking-prompt' && (
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-md">
                <p className="text-sm mb-2">Preparation time: 1 minute</p>
                <p className="text-sm">Speaking time: 2 minutes</p>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleNextQuestion}
            className="w-full sm:w-auto"
          >
            {currentQuestionIndex === sectionData.questions.length - 1 ? 
              (currentSection === 'speaking' ? 'Complete Exam' : 'Next Section') : 
              'Next Question'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {!examStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {examType ? 
                examType.includes('sat') ? 
                  `SAT ${examType.includes('math') ? 'Math' : 'English'} Mock Exam` : 
                  `${examType.toUpperCase()} Mock Exam` 
                : 'IELTS Academic Mock Exam'}
            </CardTitle>
            <CardDescription>
              This full mock exam simulates the real test environment with timed sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="font-medium text-lg mb-4">Exam Structure</h3>
              
              <div className="space-y-4">
                {mockTestData.sections.map(section => {
                  if (examType === 'sat-math' && section.type !== 'reading') return null;
                  if (examType === 'sat-english' && section.type !== 'writing') return null;
                  
                  return (
                    <div key={section.id} className="flex items-start space-x-3">
                      {getSectionIcon(section.type)}
                      <div>
                        <h4 className="font-medium">
                          {getSectionTitle(section.type)} ({section.duration} minutes)
                        </h4>
                        <p className="text-sm text-gray-500">
                          {examType && examType.includes('sat') 
                            ? (section.type === 'reading' 
                                ? 'Test your mathematical skills with problem-solving and advanced math.' 
                                : 'Assess your reading, writing and language proficiency.')
                            : section.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Important</h4>
                <p className="text-sm text-gray-500">
                  Make sure you have approximately {mockTestData.totalDuration} minutes available to complete the exam. 
                  Once started, the exam timer will run continuously for each section.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startExam} className="w-full sm:w-auto">
              Start Full Mock Exam
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {examType ? 
                        examType.includes('sat') ? 
                          `SAT ${examType.includes('math') ? 'Math' : 'English'} Mock Exam` : 
                          `${examType.toUpperCase()} Mock Exam` 
                        : 'IELTS Academic Mock Exam'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Current section: {getSectionTitle(currentSection)}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {timeRemaining ? formatTime(timeRemaining) : 'Time not set'}
                  </Badge>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="flex flex-wrap gap-2">
                  {!isSatTest && (
                    <Badge 
                      variant={currentSection === 'listening' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => navigateToSection('listening')}
                    >
                      <Headphones className="h-3 w-3 mr-1" />
                      Listening
                      {progress >= 25 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                    </Badge>
                  )}
                  
                  <Badge 
                    variant={currentSection === 'reading' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('reading')}
                  >
                    {isSatTest ? <Calculator className="h-3 w-3 mr-1" /> : <BookOpen className="h-3 w-3 mr-1" />}
                    {isSatTest ? 'Math' : 'Reading'}
                    {progress >= 50 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                  
                  <Badge 
                    variant={currentSection === 'writing' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('writing')}
                  >
                    {isSatTest ? <BookText className="h-3 w-3 mr-1" /> : <Edit className="h-3 w-3 mr-1" />}
                    {isSatTest ? 'English' : 'Writing'}
                    {progress >= 75 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                  
                  {!isSatTest && (
                    <Badge 
                      variant={currentSection === 'speaking' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => navigateToSection('speaking')}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Speaking
                      {progress >= 90 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {getCurrentSectionContent()}
        </div>
      )}
    </div>
  );
};

export default FullMockExam;
