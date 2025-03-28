
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export interface ExamType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ExamTypeSelectorProps {
  examTypes: ExamType[];
  selectedExam: string;
  onExamChange: (exam: string) => void;
}

const ExamTypeSelector: React.FC<ExamTypeSelectorProps> = ({ 
  examTypes, 
  selectedExam, 
  onExamChange 
}) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Exam Type
      </div>
      <RadioGroup value={selectedExam} onValueChange={onExamChange} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examTypes.map((exam) => (
          <Label
            key={exam.id}
            htmlFor={`exam-${exam.id}`}
            className="cursor-pointer"
          >
            <Card className={`relative p-4 transition-all duration-300 ${
              selectedExam === exam.id 
                ? 'border-2 border-indigo bg-indigo/5' 
                : 'hover:border-gray-300 hover:bg-gray-50 dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{exam.icon}</span>
                <div className="space-y-1">
                  <div className="font-medium">{exam.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {exam.description}
                  </div>
                </div>
                {selectedExam === exam.id && (
                  <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-indigo" />
                )}
              </div>
              <RadioGroupItem
                id={`exam-${exam.id}`}
                value={exam.id}
                className="sr-only"
              />
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ExamTypeSelector;
