
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReadingHeaderProps {
  examType?: string;
  section?: string;
}

const ReadingHeader = ({ examType = 'ielts', section = 'reading' }: ReadingHeaderProps) => {
  const getTitleByExamAndSection = () => {
    if (examType === 'gre' && section === 'verbal') {
      return 'GRE Verbal Reasoning';
    } else if (examType === 'gre' && section === 'quantitative') {
      return 'GRE Quantitative Reasoning';
    } else if (examType === 'gre' && section === 'mixed') {
      return 'GRE Integrated Practice';
    } else if (examType === 'sat' && section === 'math') {
      return 'SAT Math';
    } else if (examType === 'sat' && section === 'reading') {
      return 'SAT Reading & Writing';
    } else {
      return `${examType.toUpperCase()} Reading`;
    }
  };

  const getBackLink = () => {
    if (examType === 'gre') {
      return '/practice/gre';
    } else if (examType === 'sat') {
      return '/practice/sat';
    } else {
      return `/practice/${examType}`;
    }
  };

  const getHeaderGradient = () => {
    switch (examType) {
      case 'ielts':
        return 'from-indigo-600 to-indigo-800';
      case 'toefl':
        return 'from-blue-600 to-blue-800';
      case 'pte':
        return 'from-teal-600 to-teal-800';
      case 'gre':
        return 'from-purple-600 to-purple-800';
      case 'gmat':
        return 'from-blue-700 to-blue-900';
      case 'sat':
        return 'from-red-600 to-red-800';
      default:
        return 'from-indigo-600 to-purple-600';
    }
  };

  const getSectionDescription = () => {
    if (examType === 'gre' && section === 'verbal') {
      return 'Complete the verbal reasoning questions to improve your critical reading and vocabulary skills.';
    } else if (examType === 'gre' && section === 'quantitative') {
      return 'Solve these quantitative reasoning problems to enhance your mathematical skills.';
    } else if (examType === 'sat' && section === 'math') {
      return 'Solve these math problems to improve your problem-solving skills for the SAT.';
    } else if (examType === 'sat' && section === 'reading') {
      return 'Complete the reading passages and questions to improve your comprehension skills for the SAT.';
    } else {
      return `Complete the reading passage and answer the questions that follow to improve your ${section} skills.`;
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <Link 
        to={getBackLink()} 
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to {examType.toUpperCase()} Practice
      </Link>
      <div className="space-y-2">
        <h1 className={`text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r ${getHeaderGradient()} bg-clip-text text-transparent`}>
          {getTitleByExamAndSection()}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {getSectionDescription()}
        </p>
      </div>
      <div className={`h-1 w-20 bg-gradient-to-r ${getHeaderGradient()} rounded-full`}></div>
    </div>
  );
};

export default ReadingHeader;
