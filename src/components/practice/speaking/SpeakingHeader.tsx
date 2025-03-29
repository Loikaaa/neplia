
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic } from 'lucide-react';

const SpeakingHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Mic className="h-6 w-6 text-purple-600" />
        <h1 className="text-3xl font-bold">IELTS Speaking Practice</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
        Practice your speaking skills with simulated IELTS speaking tasks. You'll be able to record your responses
        and review them afterward to improve your performance.
      </p>
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-medium">Test Duration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">11-14 minutes</p>
            </div>
            <div>
              <h3 className="font-medium">Question Types</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Introduction, Topic Discussion, and Follow-up Questions</p>
            </div>
            <div>
              <h3 className="font-medium">Skills Tested</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fluency, Pronunciation, Grammar, Vocabulary</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakingHeader;
