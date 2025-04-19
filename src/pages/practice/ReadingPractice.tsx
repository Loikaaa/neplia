
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { ReadingTest } from '@/components/practice/reading/ReadingTest';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ReadingPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [examType, setExamType] = useState('ielts');
  const [section, setSection] = useState('reading');
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Extract exam type and section from URL
    const pathname = location.pathname;
    const params = new URLSearchParams(location.search);
    
    // Check if we have an exam-specific path like /practice/gre/verbal
    if (pathname.includes('/practice/')) {
      const pathParts = pathname.split('/');
      if (pathParts.length >= 3) {
        const newExamType = pathParts[2]; // e.g., "gre", "sat"
        setExamType(newExamType);
      }
      if (pathParts.length >= 4) {
        const newSection = pathParts[3]; // e.g., "verbal", "math"
        setSection(newSection);
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
    
    // Validate the exam and section combination
    const isValidCombination = validateExamAndSection(
      examType === 'ielts' && examParam ? examParam : examType, 
      section === 'reading' && sectionParam ? sectionParam : section
    );
    
    if (!isValidCombination) {
      // If invalid combination, redirect to the practice home
      navigate('/practice');
      return;
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
  }, [location, examType, section, navigate]);
  
  // Function to validate if the exam type and section combination is valid
  const validateExamAndSection = (exam: string, sect: string) => {
    // Define valid sections for each exam type
    const validCombinations: Record<string, string[]> = {
      'ielts': ['reading', 'listening', 'writing', 'speaking'],
      'toefl': ['reading', 'listening', 'writing', 'speaking'],
      'pte': ['reading', 'listening', 'speaking', 'writing'],
      'gre': ['verbal', 'quantitative', 'analytical', 'mixed'],
      'gmat': ['verbal', 'quantitative', 'integrated', 'analytical'],
      'sat': ['reading', 'math']
    };
    
    // Check if exam type has defined valid sections and if the given section is valid
    return validCombinations[exam]?.includes(sect) || false;
  };
  
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
