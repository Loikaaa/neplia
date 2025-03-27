
import React from 'react';
import Layout from '@/components/Layout';
import FullMockExam from '@/components/practice/FullMockExam';
import { useNavigate } from 'react-router-dom';

const MockTestPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleMockTestComplete = () => {
    navigate('/practice');
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">IELTS Mock Test</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Complete a full IELTS test under timed conditions to simulate the real exam experience.
            </p>
          </div>
          
          <FullMockExam onComplete={handleMockTestComplete} />
        </div>
      </div>
    </Layout>
  );
};

export default MockTestPage;
