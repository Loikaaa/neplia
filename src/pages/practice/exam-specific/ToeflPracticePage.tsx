import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Edit, 
  Clock, 
  CheckCircle2,
  Trophy,
  GraduationCap
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import EditableSection from '@/components/admin/EditableSection';

const ToeflPracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('module');
  const { toast } = useToast();

  const startFullMockExam = () => {
    toast({
      title: "Mock Exam Scheduled",
      description: "Your full TOEFL mock exam has been scheduled. Good luck!",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <EditableSection pageId="toefl-practice" sectionName="header" title content>
          <div className="text-center space-y-4 mb-12">
            <GraduationCap className="h-16 w-16 mx-auto text-indigo-500 animate-float" />
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              TOEFL Practice Center
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Master the TOEFL exam with our comprehensive practice modules and full mock tests
            </p>
          </div>
        </EditableSection>

        <Tabs defaultValue="module" value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="module" className="text-lg">Individual Modules</TabsTrigger>
            <TabsTrigger value="mock" className="text-lg">Full Mock Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="module" className="space-y-8">
            <EditableSection pageId="toefl-practice" sectionName="modules" content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Reading Section */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-500/50 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-playfair text-2xl">Reading Practice</CardTitle>
                    <CardDescription className="text-blue-100">Enhance your reading comprehension</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>54-72 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>3-4 passages, 10 questions each</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice with academic reading passages and answer various question types.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/reading?exam=toefl" className="w-full">
                      <Button className="w-full" variant="outline">Start Reading Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Listening Section */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-500/50">
                  <CardHeader className="bg-gradient-to-br from-teal-500 to-green-600 text-white">
                    <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Headphones className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-playfair text-2xl">Listening Practice</CardTitle>
                    <CardDescription className="text-teal-100">Improve your listening skills</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>41-57 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>3-4 lectures, 2-3 conversations</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Listen to academic lectures and conversations and answer questions.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/listening?exam=toefl" className="w-full">
                      <Button className="w-full" variant="outline">Start Listening Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Speaking Section */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/50">
                  <CardHeader className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                    <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-playfair text-2xl">Speaking Practice</CardTitle>
                    <CardDescription className="text-purple-100">Master oral communication</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>17 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>4 tasks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice speaking tasks including both independent and integrated tasks.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/speaking?exam=toefl" className="w-full">
                      <Button className="w-full" variant="outline">Start Speaking Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Writing Section */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-500/50">
                  <CardHeader className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Edit className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-playfair text-2xl">Writing Practice</CardTitle>
                    <CardDescription className="text-orange-100">Perfect your writing skills</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>50 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-gray-500" />
                        <span>Integrated and Independent tasks</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Practice writing essays based on reading and listening materials.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link to="/practice/writing?exam=toefl" className="w-full">
                      <Button className="w-full" variant="outline">Start Writing Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </EditableSection>
          </TabsContent>

          <TabsContent value="mock" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full TOEFL Mock Test</CardTitle>
                <CardDescription>
                  Take a complete mock TOEFL test under timed conditions to simulate the real exam experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> 
                    Complete TOEFL Experience
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Reading (54-72 min)</p>
                        <p className="text-sm text-gray-500">3-4 passages, 10 questions each</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Listening (41-57 min)</p>
                        <p className="text-sm text-gray-500">3-4 lectures, 2-3 conversations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Speaking (17 min)</p>
                        <p className="text-sm text-gray-500">4 tasks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Writing (50 min)</p>
                        <p className="text-sm text-gray-500">Integrated and Independent tasks</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">Take Your Mock Test</h4>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Set aside approximately 3.5 hours to complete all sections of the test. You can take a 10-minute break between sections.
                    </p>
                    <Link to="/practice/mock-test?exam=toefl">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={startFullMockExam}>
                        Start Full Mock Test
                      </Button>
                    </Link>
                  </div>
                </div>
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
    </Layout>
  );
};

export default ToeflPracticePage;
