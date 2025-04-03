
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadingQuestion } from '@/types/reading';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ReadingQuestionsProps {
  questions: ReadingQuestion[];
  userAnswers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export const ReadingQuestions: React.FC<ReadingQuestionsProps> = ({
  questions,
  userAnswers,
  onAnswerChange,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start">
                <span className="font-medium mr-2">{question.number}.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {question.text}
                  </p>
                  {question.instruction && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                      {question.instruction}
                    </p>
                  )}
                </div>
              </div>
              
              {question.type === 'multiple-choice' && question.options && (
                <div className="ml-6 space-y-2">
                  <RadioGroup 
                    value={userAnswers[question.id] || ""}
                    onValueChange={(value) => onAnswerChange(question.id, value)}
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`question-${question.id}-${option.value}`} />
                        <Label htmlFor={`question-${question.id}-${option.value}`} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {question.type === 'fill-in-blank' && (
                <div className="ml-6">
                  <Input
                    type="text"
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full max-w-md"
                  />
                  {question.maxWords && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum {question.maxWords} word{question.maxWords !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'matching' && question.options && (
                <div className="ml-6">
                  <select
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {question.type === 'true-false' && question.options && (
                <div className="ml-6 space-y-2">
                  <RadioGroup 
                    value={userAnswers[question.id] || ""}
                    onValueChange={(value) => onAnswerChange(question.id, value)}
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`question-${question.id}-${option.value}`} />
                        <Label htmlFor={`question-${question.id}-${option.value}`} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
