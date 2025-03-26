
import React from 'react';
import { BookOpen } from 'lucide-react';

const ReadingHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <BookOpen className="h-8 w-8 text-indigo" />
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">IELTS Reading Practice</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
        Improve your reading skills with our authentic IELTS reading tests. Each test contains 3 passages with increasing difficulty, just like the real exam.
      </p>
    </div>
  );
};

export default ReadingHeader;
