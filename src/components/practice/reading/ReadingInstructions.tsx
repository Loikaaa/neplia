
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Check, Clock, BookOpen, Search } from 'lucide-react';

interface ReadingInstructionsProps {
  onStart: () => void;
}

export const ReadingInstructions: React.FC<ReadingInstructionsProps> = ({ onStart }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-heading">Test Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-indigo mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Reading Passages</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You will read 3 passages and answer questions about them. The passages are on topics of general interest.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-indigo mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Time Limit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have 60 minutes to complete all three sections of the reading test.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-indigo mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Scoring</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each question is worth 1 mark. There are 40 questions in total. Your band score will be calculated based on your marks.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Search className="h-5 w-5 text-indigo mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Question Types</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You will face different question types including multiple choice, matching, fill-in-the-blank, and true/false.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-coral mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Important</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Read each passage carefully and pay attention to the specific instructions for each question type.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4 sm:mb-0">
          <Checkbox id="confirm" />
          <div>
            <label 
              htmlFor="confirm" 
              className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
            >
              I understand the instructions
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You need to confirm before starting the test
            </p>
          </div>
        </div>
        
        <Button
          onClick={onStart}
          className="w-full sm:w-auto"
        >
          Start Reading Test
          <BookOpen className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
