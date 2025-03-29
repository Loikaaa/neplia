
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { readingTestData } from '@/data/readingTestData';
import { ReadingQuestions } from './ReadingQuestions';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const ReadingTest = () => {
  const [currentPassage, setCurrentPassage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const { toast } = useToast();
  
  const testData = readingTestData;

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

  const submitTest = () => {
    // In a real app, you would send the answers to the server
    // For now, we'll just mark the test as completed
    setTestCompleted(true);
    toast({
      title: "Test submitted",
      description: "Your reading test has been submitted successfully.",
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
            <span className="text-sm font-medium text-red-600 dark:text-red-400 font-mono">
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
                ? "border-indigo text-indigo dark:border-indigo-400 dark:text-indigo-400" 
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
          >
            Next Passage
          </Button>
        ) : (
          <Button 
            onClick={submitTest}
            className="bg-indigo hover:bg-indigo-600"
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
              Your answers have been submitted. You can now view your results.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              View Results
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
