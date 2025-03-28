
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, MessageCircle, Clock, ListChecks } from 'lucide-react';
import { SpeakingTask } from '@/types/speaking';

interface SpeakingInstructionsProps {
  task: SpeakingTask;
  onStart: () => void;
  onBack: () => void;
}

export const SpeakingInstructions: React.FC<SpeakingInstructionsProps> = ({ task, onStart, onBack }) => {
  // Helper function to get total time for a task
  const getTaskTotalTime = (task: SpeakingTask): number => {
    return task.questions.reduce((total, q) => {
      let questionTime = q.duration || 0;
      if (q.preparation) questionTime += q.preparation;
      return total + questionTime;
    }, 0);
  };
  
  // Format seconds to minutes and seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''}${secs > 0 ? ` and ${secs} second${secs !== 1 ? 's' : ''}` : ''}`;
  };
  
  // Count questions by part
  const countQuestionsByPart = (part: 1 | 2 | 3) => {
    return task.questions.filter(q => q.part === part).length;
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 flex items-center"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Categories
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-end gap-1">
                <Clock className="h-4 w-4" />
                <span>Approx. {formatTime(getTaskTotalTime(task))}</span>
              </div>
              <div className="flex items-center justify-end gap-1 mt-1">
                <MessageCircle className="h-4 w-4" />
                <span>{task.questions.length} Questions</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">IELTS Speaking Test Format</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2 h-8 w-8 flex items-center justify-center mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Part 1: Introduction and Interview ({countQuestionsByPart(1)} questions)</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Short questions about familiar topics such as home, family, work, studies, and interests.
                      Each answer should be around 20-30 seconds.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full p-2 h-8 w-8 flex items-center justify-center mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Part 2: Individual Long Turn ({countQuestionsByPart(2)} topic card)</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      You'll receive a task card about a particular topic. You have 1 minute to prepare, 
                      then you'll need to speak for 1-2 minutes without interruption.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full p-2 h-8 w-8 flex items-center justify-center mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Part 3: Two-way Discussion ({countQuestionsByPart(3)} questions)</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      More abstract questions connected to the topic in Part 2. You'll need to discuss
                      broader issues and more abstract concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-100 dark:border-amber-800">
              <h4 className="flex items-center font-medium text-amber-800 dark:text-amber-300">
                <ListChecks className="h-5 w-5 mr-2" />
                Before You Begin
              </h4>
              <ul className="text-sm text-amber-700 dark:text-amber-400 mt-2 space-y-2 ml-7 list-disc">
                <li>Find a quiet place without distractions</li>
                <li>Test your microphone before starting</li>
                <li>Speak clearly and at a natural pace</li>
                <li>Give detailed responses, but stay on topic</li>
                <li>Use a variety of vocabulary and grammatical structures</li>
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button onClick={onStart}>
            <Mic className="h-4 w-4 mr-2" />
            Start Speaking Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
