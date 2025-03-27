
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Headphones, PanelRight, AlertTriangle } from 'lucide-react';

interface SpeakingInstructionsProps {
  onStart: () => void;
}

export const SpeakingInstructions: React.FC<SpeakingInstructionsProps> = ({ onStart }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="space-y-4">
            <p>
              The IELTS Speaking test is designed to assess your ability to communicate effectively in English. 
              The test is divided into three parts and lasts between 11 and 14 minutes.
            </p>
            
            <h3 className="text-lg font-medium">Test Format</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Part 1:</strong> Introduction and Interview (4-5 minutes) - The examiner will ask you general questions about yourself.</li>
              <li><strong>Part 2:</strong> Individual Long Turn (3-4 minutes) - You'll be given a card with a topic and will have to speak about it for 1-2 minutes.</li>
              <li><strong>Part 3:</strong> Two-way Discussion (4-5 minutes) - The examiner will ask you more abstract questions related to the topic in Part 2.</li>
            </ul>
            
            <h3 className="text-lg font-medium">Before You Begin</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-indigo mt-0.5" />
                <div>
                  <h4 className="font-medium">Check Your Microphone</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ensure your microphone is working properly. You'll need it to record your responses.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-indigo mt-0.5" />
                <div>
                  <h4 className="font-medium">Use Headphones</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For the best experience, use headphones to clearly hear the examiner's questions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PanelRight className="h-5 w-5 text-indigo mt-0.5" />
                <div>
                  <h4 className="font-medium">Quiet Environment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Find a quiet place to take the test without distractions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Browser Permissions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You'll need to grant microphone access when prompted.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button onClick={onStart} size="lg" className="bg-indigo hover:bg-indigo-600">
              Start Speaking Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
