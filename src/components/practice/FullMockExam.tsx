import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';

interface FullMockExamProps {
  examType?: 'academic' | 'general';
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
  const [sectionScores, setSectionScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  const { toast } = useToast();

  const startExam = () => {
    setExamStarted(true);
    setTimeRemaining(30 * 60); // 30 minutes for listening section
    
    toast({
      title: "Exam Started",
      description: "Your IELTS mock exam has begun. Good luck!",
    });
  };

  const navigateToSection = (section: 'listening' | 'reading' | 'writing' | 'speaking') => {
    setCurrentSection(section);
    
    switch(section) {
      case 'listening':
        setTimeRemaining(30 * 60); // 30 minutes
        setProgress(25);
        break;
      case 'reading':
        setTimeRemaining(60 * 60); // 60 minutes
        setProgress(50);
        if (progress < 25) {
          setSectionScores(prev => ({
            ...prev,
            listening: generateScore()
          }));
        }
        break;
      case 'writing':
        setTimeRemaining(60 * 60); // 60 minutes
        setProgress(75);
        if (progress < 50) {
          setSectionScores(prev => ({
            ...prev,
            reading: generateScore()
          }));
        }
        break;
      case 'speaking':
        setTimeRemaining(15 * 60); // 15 minutes (approximate)
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

  return (
    <div className="space-y-6">
      {!examStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>IELTS {examType === 'academic' ? 'Academic' : 'General Training'} Mock Exam</CardTitle>
            <CardDescription>
              This full mock exam simulates the real IELTS test environment with timed sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="font-medium text-lg mb-4">Exam Structure</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Headphones className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium">Listening (30 minutes)</h4>
                    <p className="text-sm text-gray-500">
                      4 sections, 40 questions. You will hear each recording ONCE only.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium">Reading (60 minutes)</h4>
                    <p className="text-sm text-gray-500">
                      3 sections with 40 questions based on reading passages.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Edit className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium">Writing (60 minutes)</h4>
                    <p className="text-sm text-gray-500">
                      Task 1: Write a report (150 words)<br />
                      Task 2: Write an essay (250 words)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-indigo mt-0.5" />
                  <div>
                    <h4 className="font-medium">Speaking (11-14 minutes)</h4>
                    <p className="text-sm text-gray-500">
                      Face-to-face interview with 3 parts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Important</h4>
                <p className="text-sm text-gray-500">
                  Make sure you have approximately 3 hours available to complete the exam. Once started, the exam timer will run continuously for each section.
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
                      IELTS {examType === 'academic' ? 'Academic' : 'General Training'} Mock Exam
                    </h3>
                    <p className="text-sm text-gray-500">
                      Current section: {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {timeRemaining ? formatTime(timeRemaining) : 'Time not set'}
                  </Badge>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={currentSection === 'listening' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('listening')}
                  >
                    <Headphones className="h-3 w-3 mr-1" />
                    Listening
                    {progress >= 25 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                  
                  <Badge 
                    variant={currentSection === 'reading' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('reading')}
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Reading
                    {progress >= 50 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                  
                  <Badge 
                    variant={currentSection === 'writing' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('writing')}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Writing
                    {progress >= 75 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                  
                  <Badge 
                    variant={currentSection === 'speaking' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => navigateToSection('speaking')}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Speaking
                    {progress >= 90 && <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} section placeholder. 
              In a complete implementation, this would load the actual test content.
            </p>
            
            <Button 
              onClick={() => {
                if (currentSection === 'speaking') {
                  completeExam();
                } else {
                  const nextSection = 
                    currentSection === 'listening' ? 'reading' : 
                    currentSection === 'reading' ? 'writing' : 'speaking';
                  navigateToSection(nextSection as any);
                }
              }}
            >
              {currentSection === 'speaking' ? 'Complete Exam' : 'Next Section'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullMockExam;
