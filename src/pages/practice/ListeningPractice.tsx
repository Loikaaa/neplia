
import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { ListeningTest } from '@/components/practice/listening/ListeningTest';
import { ListeningInstructions } from '@/components/practice/listening/ListeningInstructions';
import ListeningHeader from '@/components/practice/listening/ListeningHeader';

const ListeningPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ListeningHeader />
        
        {!testStarted ? (
          <ListeningInstructions onStart={() => setTestStarted(true)} />
        ) : (
          <ListeningTest />
        )}
      </div>
    </Layout>
  );
};

export default ListeningPractice;
