
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SpeakingHeader from '@/components/practice/speaking/SpeakingHeader';
import { SpeakingInstructions } from '@/components/practice/speaking/SpeakingInstructions';
import { SpeakingTest } from '@/components/practice/speaking/SpeakingTest';
import { SpeakingCategorySelector } from '@/components/practice/speaking/SpeakingCategorySelector';
import { SpeakingTask } from '@/types/speaking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { NotificationBadge } from '@/components/admin/NotificationBadge';

const SpeakingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SpeakingTask | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleTestFinish = () => {
    // In a real app, this would fetch the final score from the server
    // For demo purposes, we'll simulate a score
    const simulatedScore = 6 + Math.random() * 3;
    const roundedScore = Math.round(simulatedScore * 2) / 2;
    
    setFinalScore(roundedScore);
    setTestCompleted(true);
    setTestStarted(false);
    
    // Add notification to admin dashboard
    const username = "User" + Math.floor(Math.random() * 1000);
    console.log(`New speaking test submission from ${username} with score ${roundedScore}`);
    
    toast({
      title: "Test Evaluation Complete",
      description: `Your final speaking score is ${roundedScore}. Admin has been notified of your submission.`,
    });
  };
  
  const resetTest = () => {
    setTestCompleted(false);
    setSelectedTask(null);
    setFinalScore(null);
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <SpeakingHeader />
        
        {testCompleted && finalScore ? (
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <Badge className="mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1">
                  Test Completed
                </Badge>
                <h2 className="text-2xl font-bold mb-2">Your Speaking Score</h2>
                <div className="inline-block bg-white dark:bg-gray-800 rounded-full p-6 mb-4 shadow-md">
                  <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {finalScore}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your speaking test has been reviewed. This score reflects your performance in fluency, pronunciation, vocabulary, and grammar.
                </p>
                <Button 
                  onClick={resetTest} 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Take Another Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : !testStarted ? (
          <>
            {!selectedTask ? (
              <SpeakingCategorySelector onSelectTask={(task) => setSelectedTask(task)} />
            ) : (
              <SpeakingInstructions 
                task={selectedTask}
                onStart={() => setTestStarted(true)} 
                onBack={() => setSelectedTask(null)}
              />
            )}
          </>
        ) : (
          <SpeakingTest task={selectedTask!} onFinish={handleTestFinish} />
        )}
      </div>
    </Layout>
  );
};

export default SpeakingPractice;
