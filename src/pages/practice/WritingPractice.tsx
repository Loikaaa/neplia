
import React from 'react';
import Layout from '@/components/Layout';

const WritingPractice: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">IELTS Writing Practice</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Writing Task Instructions</h2>
          <p className="mb-4">
            Practice your IELTS writing skills with our interactive writing tasks. 
            Choose a task below to begin practicing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3">Task 1: Academic</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Describe a graph, chart, table, or diagram in at least 150 words.
              </p>
              <button className="btn-primary w-full">Start Practice</button>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3">Task 2: Essay</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Write an essay in response to a point of view, argument, or problem in at least 250 words.
              </p>
              <button className="btn-primary w-full">Start Practice</button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Writing Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Take a few minutes to plan your response before writing</li>
            <li>Make sure to address all parts of the task</li>
            <li>Use a variety of sentence structures and vocabulary</li>
            <li>Organize your writing with clear paragraphs</li>
            <li>Leave time to review your work for grammar and spelling errors</li>
            <li>Practice time management to complete the task within the time limit</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default WritingPractice;
