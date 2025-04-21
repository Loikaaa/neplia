
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SpeakingHeaderProps {
  examType?: string;
}

const SpeakingHeader: React.FC<SpeakingHeaderProps> = ({ examType = 'ielts' }) => {
  const isMobile = useIsMobile();
  
  const getExamTitle = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return 'TOEFL Speaking Practice';
      case 'toefl-pbt':
        return 'TOEFL PBT Speaking Practice';
      case 'toefl-essentials':
        return 'TOEFL Essentials Speaking Practice';
      case 'toefl-itp':
        return 'TOEFL ITP Speaking Practice';
      case 'pte':
        return 'PTE Speaking Practice';
      case 'gre':
        return 'GRE Speaking Practice';
      case 'gmat':
        return 'GMAT Speaking Practice';
      default:
        return 'IELTS Speaking Practice';
    }
  };
  
  const getExamDescription = () => {
    switch(examType.toLowerCase()) {
      case 'toefl':
        return 'Practice your speaking skills with simulated TOEFL iBT speaking tasks. Complete 4 tasks in 16 minutes including independent and integrated speaking tasks.';
      case 'toefl-pbt':
        return 'Practice your speaking skills with simulated TOEFL PBT speaking tasks. Note: The PBT version does not have a speaking section, but we provide speaking practice to supplement your preparation.';
      case 'toefl-essentials':
        return 'Practice your speaking skills with simulated TOEFL Essentials speaking tasks, focusing on quick responses and adaptive difficulty.';
      case 'toefl-itp':
        return 'Practice your speaking skills with simulated TOEFL ITP speaking tasks for academic placement.';
      case 'pte':
        return 'Practice your speaking skills with simulated PTE speaking tasks, focusing on fluency and pronunciation.';
      case 'gre':
        return 'Practice your speaking skills with simulated GRE speaking tasks, focusing on analytical thinking and verbal expression.';
      case 'gmat':
        return 'Practice your speaking skills with simulated GMAT speaking tasks, focusing on clear communication of complex ideas.';
      default:
        return 'Practice your speaking skills with simulated IELTS speaking tasks. You\'ll be able to record your responses and review them afterward to improve your performance.';
    }
  };
  
  const getExamDetails = () => {
    if (examType.toLowerCase() === 'toefl') {
      return [
        { label: 'Test Duration', value: '16 minutes', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { label: 'Question Types', value: '4 Tasks - Independent & Integrated', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
        { label: 'Skills Tested', value: 'Pronunciation, Fluency, Clarity, Coherence', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
      ];
    } else if (examType.toLowerCase().includes('toefl-')) {
      // Different TOEFL variants
      if (examType.toLowerCase() === 'toefl-essentials') {
        return [
          { label: 'Test Duration', value: '10 minutes', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
          { label: 'Question Types', value: 'Adaptive Speaking Tasks', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
          { label: 'Skills Tested', value: 'Pronunciation, Fluency, Vocabulary', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
        ];
      } else {
        return [
          { label: 'Test Duration', value: 'Varies by format', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
          { label: 'Question Types', value: 'Supplemental Speaking Tasks', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
          { label: 'Skills Tested', value: 'Pronunciation, Fluency, Clarity', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
        ];
      }
    } else if (examType.toLowerCase() === 'pte') {
      return [
        { label: 'Test Duration', value: 'Varies by section', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { label: 'Question Types', value: 'Read Aloud, Repeat Sentence, Describe Image', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
        { label: 'Skills Tested', value: 'Pronunciation, Oral Fluency, Content', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
      ];
    } else if (['gre', 'gmat'].includes(examType.toLowerCase())) {
      return [
        { label: 'Test Duration', value: '30 minutes', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { label: 'Question Types', value: 'Analytical Response, Issue Analysis', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
        { label: 'Skills Tested', value: 'Reasoning, Articulation, Structure', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
      ];
    }
    
    // Default IELTS
    return [
      { label: 'Test Duration', value: '11-14 minutes', bgClass: 'bg-indigo-50 dark:bg-indigo-950/30' },
      { label: 'Question Types', value: 'Introduction, Topic Discussion, and Follow-up Questions', bgClass: 'bg-purple-50 dark:bg-purple-950/30' },
      { label: 'Skills Tested', value: 'Fluency, Pronunciation, Grammar, Vocabulary', bgClass: 'bg-pink-50 dark:bg-pink-950/30' }
    ];
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Mic className="h-6 w-6 text-indigo" />
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold gradient-text`}>
          {getExamTitle()}
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
        {getExamDescription()}
      </p>
      <Card className="border border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-4">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
            {getExamDetails().map((detail, index) => (
              <div key={index} className={`${detail.bgClass} p-3 rounded-lg`}>
                <h3 className="font-medium text-indigo-700 dark:text-indigo-300">{detail.label}</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">{detail.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeakingHeader;
