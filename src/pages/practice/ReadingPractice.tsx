
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { ReadingTest } from '@/components/practice/reading/ReadingTest';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { useLocation } from 'react-router-dom';

const ReadingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [examType, setExamType] = useState('ielts');
  const [section, setSection] = useState('reading');
  const location = useLocation();
  
  useEffect(() => {
    // Extract exam type and section from URL
    const pathname = location.pathname;
    const params = new URLSearchParams(location.search);
    
    // Check if we have an exam-specific path like /practice/gre/verbal
    if (pathname.includes('/practice/')) {
      const pathParts = pathname.split('/');
      if (pathParts.length >= 3) {
        setExamType(pathParts[2]); // e.g., "gre", "sat"
      }
      if (pathParts.length >= 4) {
        setSection(pathParts[3]); // e.g., "verbal", "math"
      }
    }
    
    // Check for query params (fallback)
    const examParam = params.get('exam');
    if (examParam) {
      setExamType(examParam);
    }
    
    const sectionParam = params.get('section');
    if (sectionParam) {
      setSection(sectionParam);
    }
    
    // Set page title based on exam type and section
    let title = "Reading Practice";
    if (examType === 'gre' && section === 'verbal') {
      title = "GRE Verbal Reasoning Practice";
    } else if (examType === 'gre' && section === 'quantitative') {
      title = "GRE Quantitative Reasoning Practice";
    } else if (examType === 'sat' && section === 'math') {
      title = "SAT Math Practice";
    } else if (examType === 'sat' && section === 'reading') {
      title = "SAT Reading & Writing Practice";
    } else {
      title = `${examType.toUpperCase()} Reading Practice`;
    }
    
    document.title = title;
  }, [location]);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ReadingHeader examType={examType} section={section} />
        
        {!testStarted ? (
          <ReadingInstructions onStart={() => setTestStarted(true)} examType={examType} section={section} />
        ) : (
          <ReadingTest examType={examType} section={section} />
        )}
      </div>
    </Layout>
  );
};

export default ReadingPractice;
