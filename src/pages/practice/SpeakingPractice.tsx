
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SpeakingHeader from '@/components/practice/speaking/SpeakingHeader';
import { SpeakingInstructions } from '@/components/practice/speaking/SpeakingInstructions';
import { SpeakingTest } from '@/components/practice/speaking/SpeakingTest';
import { SpeakingCategorySelector } from '@/components/practice/speaking/SpeakingCategorySelector';
import { SpeakingTask } from '@/types/speaking';

const SpeakingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SpeakingTask | null>(null);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <SpeakingHeader />
        
        {!testStarted ? (
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
          <SpeakingTest task={selectedTask!} onFinish={() => {
            setTestStarted(false);
            setSelectedTask(null);
          }} />
        )}
      </div>
    </Layout>
  );
};

export default SpeakingPractice;
