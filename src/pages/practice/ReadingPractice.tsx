
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { ReadingTest } from '@/components/practice/reading/ReadingTest';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';

const ReadingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader />
        
        {!testStarted ? (
          <ReadingInstructions onStart={() => setTestStarted(true)} />
        ) : (
          <ReadingTest />
        )}
      </div>
    </Layout>
  );
};

export default ReadingPractice;
