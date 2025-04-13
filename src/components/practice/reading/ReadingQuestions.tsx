
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface ReadingQuestionsProps {
  examType?: string;
  section?: string;
}

export const ReadingQuestions = ({ examType = 'ielts', section = 'reading' }: ReadingQuestionsProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };
  
  const handleCheckboxChange = (questionId: string, value: string) => {
    const currentAnswers = answers[questionId] || [];
    const newAnswers = currentAnswers.includes(value) 
      ? currentAnswers.filter((a: string) => a !== value)
      : [...currentAnswers, value];
    
    setAnswers({
      ...answers,
      [questionId]: newAnswers,
    });
  };
  
  const handleTextChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };
  
  // Function to get questions based on exam type and section
  const getQuestionsByExamAndSection = () => {
    if (examType === 'gre' && section === 'verbal') {
      return [
        {
          id: 'gre-verbal-1',
          type: 'radio',
          text: 'Based on the passage, the author\'s primary purpose is to:',
          options: [
            { value: 'a', label: 'Criticize contemporary urban planning approaches' },
            { value: 'b', label: 'Analyze the evolution of urban spaces and its implications' },
            { value: 'c', label: 'Compare historical and modern city designs' },
            { value: 'd', label: 'Advocate for specific policy changes in urban development' },
            { value: 'e', label: 'Highlight the environmental benefits of green spaces' }
          ]
        },
        {
          id: 'gre-verbal-2',
          type: 'checkbox',
          text: 'According to the passage, which of the following are benefits of incorporating biophilic elements in urban spaces? Select ALL that apply.',
          options: [
            { value: 'a', label: 'Reduced stress levels' },
            { value: 'b', label: 'Improved cognitive function' },
            { value: 'c', label: 'Enhanced property values' },
            { value: 'd', label: 'Increased social interactions' },
            { value: 'e', label: 'Lower crime rates' }
          ]
        },
        {
          id: 'gre-verbal-3',
          type: 'fill',
          text: 'The passage describes mixed-use development as challenging the traditional __________ of different urban zones.',
        }
      ];
    }
    else if (examType === 'gre' && section === 'quantitative') {
      return [
        {
          id: 'gre-quant-1',
          type: 'radio',
          text: 'If x² + y² = 25 and xy = 12, what is the value of (x + y)²?',
          options: [
            { value: 'a', label: '1' },
            { value: 'b', label: '25' },
            { value: 'c', label: '49' },
            { value: 'd', label: '50' },
            { value: 'e', label: '100' }
          ]
        },
        {
          id: 'gre-quant-2',
          type: 'radio',
          text: 'In a certain sequence, each term after the first is found by multiplying the preceding term by 3 and then subtracting 2. If the first term is 5, what is the 4th term in the sequence?',
          options: [
            { value: 'a', label: '13' },
            { value: 'b', label: '115' },
            { value: 'c', label: '117' },
            { value: 'd', label: '335' },
            { value: 'e', label: '337' }
          ]
        },
        {
          id: 'gre-quant-3',
          type: 'radio',
          text: 'A circle has a circumference of 16π. What is the area of the circle?',
          options: [
            { value: 'a', label: '16π' },
            { value: 'b', label: '32π' },
            { value: 'c', label: '64π' },
            { value: 'd', label: '256π' },
            { value: 'e', label: '8π²' }
          ]
        }
      ];
    }
    else if (examType === 'sat' && section === 'math') {
      return [
        {
          id: 'sat-math-1',
          type: 'radio',
          text: 'If 3x + 5y = 15 and 2x - y = 7, what is the value of x?',
          options: [
            { value: 'a', label: '2' },
            { value: 'b', label: '3' },
            { value: 'c', label: '4' },
            { value: 'd', label: '5' }
          ]
        },
        {
          id: 'sat-math-2',
          type: 'radio',
          text: 'The function f is defined by f(x) = 2x² + 4x - 3. What is the value of f(2)?',
          options: [
            { value: 'a', label: '5' },
            { value: 'b', label: '9' },
            { value: 'c', label: '11' },
            { value: 'd', label: '13' }
          ]
        },
        {
          id: 'sat-math-3',
          type: 'radio',
          text: 'In the xy-plane, what is the y-coordinate of the midpoint of the line segment with endpoints (2, 7) and (8, 5)?',
          options: [
            { value: 'a', label: '3' },
            { value: 'b', label: '5' },
            { value: 'c', label: '6' },
            { value: 'd', label: '7.5' }
          ]
        },
        {
          id: 'sat-math-4',
          type: 'fill',
          text: 'The average (arithmetic mean) of 6 numbers is 8. If 5 of the numbers have an average of 6, what is the value of the sixth number?',
        }
      ];
    }
    else if (examType === 'sat' && section === 'reading') {
      return [
        {
          id: 'sat-reading-1',
          type: 'radio',
          text: 'According to the passage, Marie Curie suggests that scientific progress:',
          options: [
            { value: 'a', label: 'Should be reduced to mechanisms and machines' },
            { value: 'b', label: 'Has both technical and imaginative aspects' },
            { value: 'c', label: 'Has led to a decline in the spirit of adventure' },
            { value: 'd', label: 'Is primarily concerned with precise measurement' }
          ]
        },
        {
          id: 'sat-reading-2',
          type: 'radio',
          text: 'In the context of the passage, the word "acuity" most nearly means:',
          options: [
            { value: 'a', label: 'Sharpness' },
            { value: 'b', label: 'Speed' },
            { value: 'c', label: 'Intelligence' },
            { value: 'd', label: 'Enthusiasm' }
          ]
        },
        {
          id: 'sat-reading-3',
          type: 'radio',
          text: 'Which choice best describes the structure of the passage?',
          options: [
            { value: 'a', label: 'A personal anecdote followed by a general observation' },
            { value: 'b', label: 'A chronological account of scientific developments' },
            { value: 'c', label: 'A series of reflections on different aspects of science' },
            { value: 'd', label: 'A comparison between two contradictory viewpoints' }
          ]
        }
      ];
    }
    else {
      // Default IELTS/TOEFL reading questions
      return [
        {
          id: 'q1',
          type: 'radio',
          text: 'According to the passage, who is credited with discovering tea?',
          options: [
            { value: 'a', label: 'Lu Yu' },
            { value: 'b', label: 'Shen Nung' },
            { value: 'c', label: 'Japanese monks' },
            { value: 'd', label: 'Dutch merchants' }
          ]
        },
        {
          id: 'q2',
          type: 'radio',
          text: 'When was tea first introduced to Japan?',
          options: [
            { value: 'a', label: 'During the Han dynasty' },
            { value: 'b', label: 'During the Tang dynasty' },
            { value: 'c', label: 'In the early 1600s' },
            { value: 'd', label: 'In 1669' }
          ]
        },
        {
          id: 'q3',
          type: 'checkbox',
          text: 'Which historical events were influenced by the demand for tea? Select ALL that apply.',
          options: [
            { value: 'a', label: 'The First Opium War' },
            { value: 'b', label: 'The Boston Tea Party' },
            { value: 'c', label: 'The writing of the Ch\'a Ching' },
            { value: 'd', label: 'The development of the Japanese Tea Ceremony' }
          ]
        },
        {
          id: 'q4',
          type: 'fill',
          text: 'Tea was initially advertised in Europe as a __________ beverage.',
        }
      ];
    }
  };

  const questions = getQuestionsByExamAndSection();

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
    alert('Your answers have been submitted for review!');
  };

  const getButtonColor = () => {
    switch (examType) {
      case 'gre': return 'bg-purple-600 hover:bg-purple-700';
      case 'sat': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-indigo-600 hover:bg-indigo-700';
    }
  };

  return (
    <div className="md:col-span-5 space-y-6">
      {questions.map((question, index) => (
        <Card key={question.id} className="bg-white dark:bg-gray-900 shadow-md">
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="font-medium mb-2">Question {index + 1}: {question.text}</p>
              
              {question.type === 'radio' && (
                <RadioGroup 
                  value={answers[question.id] || ''} 
                  onValueChange={(value) => handleRadioChange(question.id, value)}
                  className="space-y-2 mt-3"
                >
                  {question.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === 'checkbox' && (
                <div className="space-y-2 mt-3">
                  {question.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`${question.id}-${option.value}`} 
                        checked={(answers[question.id] || []).includes(option.value)}
                        onCheckedChange={() => handleCheckboxChange(question.id, option.value)}
                      />
                      <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'fill' && (
                <div className="mt-3">
                  <Input 
                    value={answers[question.id] || ''}
                    onChange={(e) => handleTextChange(question.id, e.target.value)}
                    placeholder="Type your answer here"
                    className="max-w-md"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleSubmit}
          className={`${getButtonColor()} text-white px-8 py-6 h-auto`}
        >
          Submit Answers
        </Button>
      </div>
    </div>
  );
};
