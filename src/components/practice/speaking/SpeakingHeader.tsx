
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SpeakingHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Mic className="h-6 w-6 text-indigo" />
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold gradient-text`}>IELTS Speaking Practice</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
        Practice your speaking skills with simulated IELTS speaking tasks. You'll be able to record your responses
        and review them afterward to improve your performance.
      </p>
      <Card className="border border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-4">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <h3 className="font-medium text-indigo-700 dark:text-indigo-300">Test Duration</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">11-14 minutes</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
              <h3 className="font-medium text-purple-700 dark:text-purple-300">Question Types</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Introduction, Topic Discussion, and Follow-up Questions</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-lg">
              <h3 className="font-medium text-pink-700 dark:text-pink-300">Skills Tested</h3>
              <p className="text-sm text-pink-600 dark:text-pink-400">Fluency, Pronunciation, Grammar, Vocabulary</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakingHeader;
