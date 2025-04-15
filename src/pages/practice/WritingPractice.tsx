
import React, { useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Edit } from 'lucide-react';
import { writingTaskData } from '@/data/writingTaskData';
import EditableSection from '@/components/admin/EditableSection';

export interface WritingPracticeProps {
  examType?: string;
}

const WritingPractice: React.FC<WritingPracticeProps> = ({ examType = 'ielts' }) => {
  const { toast } = useToast();
  const [testStarted, setTestStarted] = useState(false);
  const [taskType, setTaskType] = useState('task1');
  const [remainingTime, setRemainingTime] = useState(1200); // 20 minutes in seconds
  const [essayContent, setEssayContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Simple word count function
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Update word count when essay content changes
  const handleEssayChange = useCallback((content: string) => {
    setEssayContent(content);
    setWordCount(countWords(content));
  }, []);

  // Placeholder for the actual component
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <EditableSection pageId="writing-practice" sectionName="header" title content>
          <h1 className="text-3xl font-bold mb-4">{examType.toUpperCase()} Writing Practice</h1>
          <p className="mb-6">This is a simplified placeholder for the WritingPractice component.</p>
        </EditableSection>
        
        <EditableSection pageId="writing-practice" sectionName="controls" content>
          <Button onClick={() => setTestStarted(!testStarted)}>
            {testStarted ? 'End Test' : 'Start Test'}
          </Button>
        </EditableSection>
      </div>
    </Layout>
  );
};

export default WritingPractice;
