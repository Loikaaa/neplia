
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Edit, 
  Calendar, 
  Clock, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import PracticeSection from '@/components/PracticeSection';
import { useToast } from "@/hooks/use-toast";

const examTitles: Record<string, string> = {
  'ielts': 'IELTS',
  'toefl': 'TOEFL',
  'pte': 'PTE Academic',
  'duolingo': 'Duolingo English Test',
  'cambridge': 'Cambridge English',
  'oet': 'OET',
  'sat': 'SAT',
  'gre': 'GRE',
  'gmat': 'GMAT'
};

const PracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const [examType, setExamType] = useState('ielts');
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    // Get the selected exam from localStorage
    const savedExam = localStorage.getItem('selectedExam');
    
    if (savedExam) {
      // Extract the base exam type
      let baseExamType = savedExam.split('-')[0];
      
      // Handle special case for ielts variants
      if (savedExam.startsWith('ielts')) {
        baseExamType = 'ielts';
      }
      
      setExamType(baseExamType);
    }
    
    // Check for exam type in URL query params (for direct links)
    const queryParams = new URLSearchParams(location.search);
    const examParam = queryParams.get('exam');
    
    if (examParam) {
      setExamType(examParam);
    }
  }, [location]);
  
  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: `Your full ${examTitles[examType] || 'IELTS'} mock exam has been scheduled. Good luck!`,
    });
  };

  const getExamTitle = () => {
    return examTitles[examType] || 'IELTS';
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{getExamTitle()} Practice Center</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Prepare for your {getExamTitle()} exam with our comprehensive practice modules and full mock tests.
            </p>
          </div>

          <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="module">Individual Modules</TabsTrigger>
              <TabsTrigger value="mock">Full Mock Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="module" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Listening Practice Card */}
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-indigo/90 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Headphones className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Listening Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your listening comprehension skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>30-40 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Multiple choice, fill-in-the-blank, and more</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with authentic {getExamTitle()}-style audio recordings and answer various question types.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to={`/practice/listening?exam=${examType}`} className="w-full">
                      <Button className="w-full" variant="outline">Start Listening Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Reading Practice Card */}
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-teal-600 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Reading Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Enhance your reading comprehension
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>60 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>{examType === 'ielts' ? 'Academic and General Training passages' : 'Practice passages'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Read {examType === 'sat' || examType === 'gre' || examType === 'gmat' ? 'challenging' : 'academic'} passages and answer various question types to improve your comprehension.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to={`/practice/reading?exam=${examType}`} className="w-full">
                      <Button className="w-full" variant="outline">Start Reading Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Writing Practice Card */}
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-coral text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Edit className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Writing Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Improve your written English
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>60 minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>{examType === 'ielts' ? 'Task 1 and Task 2 practice' : 
                              examType === 'gre' || examType === 'gmat' ? 'Analytical Writing practice' : 
                              'Writing task practice'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice writing {examType === 'ielts' ? 'essays, reports, letters, and more' : 
                                         examType === 'toefl' ? 'integrated and independent tasks' : 
                                         examType === 'gre' || examType === 'gmat' ? 'analytical essays' : 
                                         'various writing tasks'} with detailed feedback.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to={`/practice/writing?exam=${examType}`} className="w-full">
                      <Button className="w-full" variant="outline">Start Writing Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Speaking Practice Card */}
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-indigo-800 text-white p-6 flex flex-row items-center space-x-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Speaking Practice</CardTitle>
                      <CardDescription className="text-white/80">
                        Develop your speaking skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>{examType === 'ielts' ? '11-14' : 
                              examType === 'toefl' ? '17' : 
                              examType === 'pte' ? '30-35' : '15-20'} minutes per test</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>{examType === 'ielts' ? 'Parts 1, 2, and 3 with recording' : 
                              examType === 'toefl' ? '4 integrated speaking tasks' : 
                              'Speaking tasks with recording'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with {examType === 'ielts' ? 'simulated interview questions' : 
                                    examType === 'toefl' ? 'integrated and independent tasks' : 
                                    'various speaking exercises'} and record your responses.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to={`/practice/speaking?exam=${examType}`} className="w-full">
                      <Button className="w-full" variant="outline">Start Speaking Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mock" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Full {getExamTitle()} Mock Test</CardTitle>
                  <CardDescription>
                    Take a complete mock {getExamTitle()} test under timed conditions to simulate the real exam experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                      Complete {getExamTitle()} Experience
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Adjust sections based on exam type */}
                      {(examType === 'ielts' || examType === 'toefl' || examType === 'pte') && (
                        <>
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Listening ({examType === 'ielts' ? '30' : examType === 'toefl' ? '41-57' : '30-40'} min)</p>
                              <p className="text-sm text-gray-500">{examType === 'ielts' ? '4 sections, 40 questions' : 
                                                                  examType === 'toefl' ? '3-4 lectures, 2-3 conversations' : 
                                                                  'Various listening tasks'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Reading ({examType === 'ielts' ? '60' : examType === 'toefl' ? '54-72' : '32-41'} min)</p>
                              <p className="text-sm text-gray-500">{examType === 'ielts' ? '3 passages, 40 questions' : 
                                                                  examType === 'toefl' ? '3-4 passages, 30-40 questions' : 
                                                                  'Reading tasks with MCQs'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Writing ({examType === 'ielts' ? '60' : examType === 'toefl' ? '50' : '40-60'} min)</p>
                              <p className="text-sm text-gray-500">{examType === 'ielts' ? 'Task 1 and Task 2' : 
                                                                  examType === 'toefl' ? 'Integrated and Independent tasks' : 
                                                                  'Writing tasks'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Speaking ({examType === 'ielts' ? '11-14' : examType === 'toefl' ? '17' : '30-35'} min)</p>
                              <p className="text-sm text-gray-500">{examType === 'ielts' ? '3 parts interview' : 
                                                                  examType === 'toefl' ? '4 tasks' : 
                                                                  'Speaking tasks'}</p>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {(examType === 'sat' || examType === 'gre' || examType === 'gmat') && (
                        <>
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{examType === 'sat' ? 'Reading & Writing' : 'Verbal Reasoning'} (65 min)</p>
                              <p className="text-sm text-gray-500">Multiple-choice questions</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{examType === 'sat' ? 'Math' : 'Quantitative Reasoning'} (80 min)</p>
                              <p className="text-sm text-gray-500">Problem-solving questions</p>
                            </div>
                          </div>
                          
                          {examType !== 'sat' && (
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-medium">Analytical Writing (30 min)</p>
                                <p className="text-sm text-gray-500">Essay tasks</p>
                              </div>
                            </div>
                          )}
                          
                          {examType === 'gmat' && (
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-medium">Integrated Reasoning (30 min)</p>
                                <p className="text-sm text-gray-500">12 questions in various formats</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-indigo" />
                        <h4 className="font-medium">Take Your Mock Test</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Set aside approximately {examType === 'ielts' ? '3' : 
                                               examType === 'toefl' ? '3.5' : 
                                               examType === 'pte' ? '3' : 
                                               examType === 'sat' ? '3' : 
                                               examType === 'gre' ? '3.75' : 
                                               examType === 'gmat' ? '3.5' : '3'} hours to complete all sections of the test. You can take breaks between sections.
                      </p>
                      <Link to={`/practice/mock-test?exam=${examType}`}>
                        <Button className="w-full sm:w-auto">
                          Start Full Mock Test
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {examType === 'ielts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Academic Test</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            For university admission and professional registration.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link to="/practice/mock-test?type=academic&exam=ielts">
                            <Button variant="outline" className="w-full">Start Academic Mock</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">General Training Test</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            For work, migration, or training in an English-speaking environment.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link to="/practice/mock-test?type=general&exam=ielts">
                            <Button variant="outline" className="w-full">Start General Mock</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Mock Test History</CardTitle>
                  <CardDescription>
                    Review your previous mock tests and track your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't taken any mock tests yet. Start a mock test to track your progress!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
