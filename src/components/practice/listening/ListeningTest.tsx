
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { listeningTestData } from '@/data/listeningTestData';
import { ListeningQuestions } from './ListeningQuestions';
import AudioPlayer from './AudioPlayer';
import { Badge } from '@/components/ui/badge';

interface ListeningTestProps {
  testType?: 'general' | 'academic' | 'practice';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export const ListeningTest: React.FC<ListeningTestProps> = ({ 
  testType = 'academic', 
  difficulty = 'intermediate' 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  
  const testData = listeningTestData;

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
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {testType.charAt(0).toUpperCase() + testType.slice(1)} Listening Test
          </h2>
          <p className="text-sm text-muted-foreground">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level • {testData.duration} minutes
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Section {currentSection + 1} of {testData.sections.length}
        </Badge>
      </div>
      
      {/* Audio Player */}
      <AudioPlayer 
        audioUrl={testData.sections[currentSection].audioUrl}
        title={`Section ${currentSection + 1}: ${testData.sections[currentSection].title}`}
        onPlayStateChange={handlePlayStateChange}
      />
      
      {/* Section Navigation */}
      <div className="flex mb-6 border-b dark:border-gray-700 overflow-x-auto">
        {testData.sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={cn(
              "py-2 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
              currentSection === index 
                ? "border-indigo text-indigo dark:border-indigo-400 dark:text-indigo-400" 
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            Section {index + 1}
          </button>
        ))}
      </div>
      
      {/* Questions */}
      <ListeningQuestions 
        questions={testData.sections[currentSection].questions}
        userAnswers={userAnswers}
        onAnswerChange={handleAnswerChange}
      />
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            if (currentSection > 0) {
              setCurrentSection(currentSection - 1);
            }
          }}
          disabled={currentSection === 0}
        >
          Previous Section
        </Button>
        
        {currentSection < testData.sections.length - 1 ? (
          <Button
            onClick={() => setCurrentSection(currentSection + 1)}
          >
            Next Section
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
