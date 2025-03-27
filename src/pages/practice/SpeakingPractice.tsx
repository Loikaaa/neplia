
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SpeakingHeader from '@/components/practice/speaking/SpeakingHeader';
import { SpeakingInstructions } from '@/components/practice/speaking/SpeakingInstructions';
import { SpeakingTest } from '@/components/practice/speaking/SpeakingTest';

const SpeakingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <SpeakingHeader />
        
        {!testStarted ? (
          <SpeakingInstructions onStart={() => setTestStarted(true)} />
        ) : (
          <SpeakingTest />
        )}
      </div>
    </Layout>
  );
};

export default SpeakingPractice;
