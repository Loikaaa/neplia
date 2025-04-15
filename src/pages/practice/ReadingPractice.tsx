
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ReadingHeader from '@/components/practice/reading/ReadingHeader';
import { ReadingInstructions } from '@/components/practice/reading/ReadingInstructions';
import { ReadingTest } from '@/components/practice/reading/ReadingTest';

export interface ReadingPracticeProps {
  examType?: string;
}

const ReadingPractice: React.FC<ReadingPracticeProps> = ({ examType = 'ielts' }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [examTypeState, setExamType] = useState(examType);
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
      examTypeState === 'ielts' && examParam ? examParam : examTypeState, 
      section === 'reading' && sectionParam ? sectionParam : section
    );
    
    if (!isValidCombination) {
      // If invalid combination, redirect to the practice home
      navigate('/practice');
      return;
    }
    
    // Set page title based on exam type and section
    let title = "Reading Practice";
    if (examTypeState === 'gre' && section === 'verbal') {
      title = "GRE Verbal Reasoning Practice";
    } else if (examTypeState === 'gre' && section === 'quantitative') {
      title = "GRE Quantitative Reasoning Practice";
    } else if (examTypeState === 'sat' && section === 'math') {
      title = "SAT Math Practice";
    } else if (examTypeState === 'sat' && section === 'reading') {
      title = "SAT Reading & Writing Practice";
    } else {
      title = `${examTypeState.toUpperCase()} Reading Practice`;
    }
    
    document.title = title;
  }, [location, examTypeState, section, navigate]);
  
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
          <ReadingHeader examType={examTypeState} section={section} />
          
          {!testStarted ? (
            <div className="mt-6 animate-fade-in">
              <ReadingInstructions 
                onStart={() => setTestStarted(true)} 
                examType={examTypeState} 
                section={section} 
              />
            </div>
          ) : (
            <div className="mt-6 animate-fade-in">
              <ReadingTest 
                examType={examTypeState} 
                section={section} 
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReadingPractice;
