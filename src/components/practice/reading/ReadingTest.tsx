
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { readingTestData } from '@/data/readingTestData';
import { ReadingQuestions } from './ReadingQuestions';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { useUserProgress } from '@/services/userProgressService';

export const ReadingTest = () => {
  const [currentPassage, setCurrentPassage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [score, setScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const { toast } = useToast();
  const { trackCompletion } = useUserProgress();
  const testData = readingTestData;

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Timer effect
  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Handle time up
  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your reading test time has ended. Please submit your answers.",
      variant: "destructive",
    });
    
    // Auto-submit when time is up
    submitTest();
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    // A simple scoring algorithm that gives a point for each answer
    // In a real app, you would check against correct answers
    const answeredQuestions = Object.keys(userAnswers).length;
    const totalQuestions = testData.passages.reduce(
      (total, passage) => total + passage.questions.length, 
      0
    );
    
    // Calculate percentage and convert to 0-100 scale
    const percentageCorrect = (answeredQuestions / totalQuestions) * 100;
    
    // Add some randomness for demo purposes
    const baseScore = Math.min(percentageCorrect + (Math.random() * 20 - 10), 100);
    return Math.max(0, Math.round(baseScore));
  };

  const submitTest = async () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    
    // Calculate score
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    
    // In a real app, you would send the answers to the server
    setTestCompleted(true);
    
    // Track completion
    await trackCompletion('reading', calculatedScore);
    
    toast({
      title: "Test submitted",
      description: "Your reading test has been submitted successfully.",
    });
  };
  
  const handleLogin = () => {
    // In a real app, this would authenticate with a server
    localStorage.setItem('demoUserLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowLoginDialog(false);
    
    // Continue with test submission after login
    submitTest();
    
    toast({
      title: "Logged In",
      description: "You have successfully logged in.",
    });
  };

  // Format time as MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Timer Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Time Remaining</span>
            <span className="text-sm font-medium text-rose-500 dark:text-rose-400 font-mono">
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Progress value={(timeRemaining / (60 * 60)) * 100} className="h-2" />
        </CardContent>
      </Card>
      
      {/* Passage Navigation */}
      <div className="flex mb-6 border-b dark:border-gray-700 overflow-x-auto">
        {testData.passages.map((passage, index) => (
          <button
            key={index}
            onClick={() => setCurrentPassage(index)}
            className={cn(
              "py-2 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
              currentPassage === index 
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" 
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            Passage {index + 1}
          </button>
        ))}
      </div>
      
      {/* Reading Passage and Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Passage */}
        <Card className="lg:sticky lg:top-24 h-fit">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4">{testData.passages[currentPassage].title}</h3>
            <div className="prose dark:prose-invert max-w-none">
              {testData.passages[currentPassage].text.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Questions */}
        <div>
          <ReadingQuestions 
            questions={testData.passages[currentPassage].questions}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
          />
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            if (currentPassage > 0) {
              setCurrentPassage(currentPassage - 1);
            }
          }}
          disabled={currentPassage === 0}
        >
          Previous Passage
        </Button>
        
        {currentPassage < testData.passages.length - 1 ? (
          <Button
            onClick={() => setCurrentPassage(currentPassage + 1)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Next Passage
          </Button>
        ) : (
          <Button 
            onClick={submitTest}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Submit Test
          </Button>
        )}
      </div>
      
      {testCompleted && (
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              Test Completed!
            </h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Your reading test score: {score}/100
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              View Detailed Results
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to sign in to submit your test and track your progress.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email"
                type="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              This is a demo login. For testing, any email and password will work.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleLogin}
              className="gap-2"
              disabled={!loginData.email || !loginData.password}
            >
              <Lock className="h-4 w-4" />
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
