
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ReadingTaskCMS from '@/pages/admin/ReadingTaskCMS';
import WritingTaskCMS from '@/pages/admin/WritingTaskCMS';
import { SpeakingTestManagement } from '@/components/admin/speaking/SpeakingTestManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, BarChart3, Sigma, Brain, Plus, Pencil, Trash2 } from 'lucide-react';

const ExamSectionPage = () => {
  const { examType, sectionType } = useParams<{ examType: string; sectionType: string }>();
  const [activeTab, setActiveTab] = useState('questions');
  
  // Mock data for SAT Math questions
  const [mathQuestions, setMathQuestions] = useState([
    {
      id: '1',
      category: 'algebra',
      difficulty: 'medium',
      question: 'If 3x + 5 = 17, what is the value of x?',
      options: ['2', '4', '6', '8'],
      correctAnswer: '4',
      explanation: 'To solve for x, subtract 5 from both sides to get 3x = 12, then divide by 3 to get x = 4.'
    },
    {
      id: '2',
      category: 'geometry',
      difficulty: 'hard',
      question: 'In a right triangle, if one leg is 5 and the hypotenuse is 13, what is the length of the other leg?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      explanation: 'Using the Pythagorean theorem: a² + b² = c². We know a = 5 and c = 13, so 5² + b² = 13². Solving for b: b² = 13² - 5² = 169 - 25 = 144, so b = 12.'
    }
  ]);
  
  const getSatMathContent = () => {
    return (
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">SAT Math Questions</h3>
                <p className="text-muted-foreground">Manage questions for the Math section of the SAT exam.</p>
              </div>
              <Button className="bg-indigo hover:bg-indigo/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mathQuestions.map((question) => (
                <Card key={question.id} className="border-l-4 border-l-indigo">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md">{question.question}</CardTitle>
                        <CardDescription>
                          <span className="capitalize bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs mr-2">{question.category}</span>
                          <span className="capitalize bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{question.difficulty}</span>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {question.options.map((option, index) => (
                        <div key={index} className={`p-2 border rounded-md text-sm ${option === question.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
                          {String.fromCharCode(65 + index)}) {option}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track student performance in SAT Math questions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-10">
                  <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>SAT Math Settings</CardTitle>
                <CardDescription>Configure the SAT Math section settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                        <Sigma className="h-4 w-4 text-indigo" />
                        <span>Algebra</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <Calculator className="h-4 w-4 text-blue-600" />
                        <span>Geometry</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <Brain className="h-4 w-4 text-green-600" />
                        <span>Advanced Math</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-2">Test Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Time Limit (minutes)</label>
                        <Input type="number" defaultValue="65" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Passing Score (%)</label>
                        <Input type="number" defaultValue="70" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Instructions</label>
                        <Textarea 
                          defaultValue="This section tests your mathematical reasoning and problem-solving skills. Answer all questions to the best of your ability."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  const renderContent = () => {
    // Handle different exam types with their specific sections
    if (examType === 'ielts' || examType === 'toefl' || examType === 'pte') {
      // English proficiency exams (reading, writing, listening, speaking)
      if (sectionType === 'reading') {
        return <ReadingTaskCMS />;
      } else if (sectionType === 'writing') {
        return <WritingTaskCMS />;
      } else if (sectionType === 'speaking') {
        return <SpeakingTestManagement />;
      } else if (sectionType === 'listening') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Listening Section Management</h2>
            <p className="text-muted-foreground">
              Full listening task management coming soon.
            </p>
          </div>
        );
      }
    } else if (examType === 'sat') {
      // SAT sections (math, english)
      if (sectionType === 'math') {
        return getSatMathContent();
      } else if (sectionType === 'english') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">SAT English Section Management</h2>
            <p className="text-muted-foreground">
              Manage reading, writing and language questions.
            </p>
          </div>
        );
      }
    } else if (examType === 'gre') {
      // GRE sections
      if (sectionType === 'verbal') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Verbal Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage verbal reasoning questions and tasks.
            </p>
          </div>
        );
      } else if (sectionType === 'quantitative') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Quantitative Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage quantitative reasoning questions and problems.
            </p>
          </div>
        );
      } else if (sectionType === 'analytical') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GRE Analytical Writing Management</h2>
            <p className="text-muted-foreground">
              Manage analytical writing tasks and prompts.
            </p>
          </div>
        );
      }
    } else if (examType === 'gmat') {
      // GMAT sections
      if (sectionType === 'verbal') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GMAT Verbal Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage reading comprehension, critical reasoning, and sentence correction.
            </p>
          </div>
        );
      } else if (sectionType === 'quantitative') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GMAT Quantitative Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage problem-solving and data sufficiency questions.
            </p>
          </div>
        );
      } else if (sectionType === 'integrated') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GMAT Integrated Reasoning Management</h2>
            <p className="text-muted-foreground">
              Manage multi-source reasoning, graphics interpretation, and two-part analysis questions.
            </p>
          </div>
        );
      } else if (sectionType === 'analytical') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">GMAT Analytical Writing Management</h2>
            <p className="text-muted-foreground">
              Manage analytical writing tasks and prompts.
            </p>
          </div>
        );
      }
    }
    
    // Default coming soon message for sections under development
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)} section is under development.
        </p>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage {examType?.toUpperCase()} {sectionType?.charAt(0).toUpperCase() + sectionType?.slice(1)} tasks and questions
          </p>
        </div>
        
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default ExamSectionPage;
