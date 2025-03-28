import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ReadingTaskCMS from '@/pages/admin/ReadingTaskCMS';
import WritingTaskCMS from '@/pages/admin/WritingTaskCMS';
import { SpeakingTestManagement } from '@/components/admin/speaking/SpeakingTestManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calculator, 
  BarChart3, 
  Sigma, 
  Brain, 
  Plus, 
  Pencil, 
  Trash2, 
  RefreshCw,
  FileText,
  Search,
  Filter,
  SortAsc,
  Settings,
  Save
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema for settings form
const settingsFormSchema = z.object({
  timeLimit: z.string(),
  passingScore: z.string(),
  calculatorPolicy: z.enum(['allowed', 'partial', 'none']),
  instructions: z.string(),
  randomize: z.boolean(),
  immediateFeedback: z.boolean(),
  allowReview: z.boolean()
});

// Schema for edit question form
const questionFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  option1: z.string().min(1, "Option A is required"),
  option2: z.string().min(1, "Option B is required"),
  option3: z.string().min(1, "Option C is required"),
  option4: z.string().min(1, "Option D is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().min(1, "Explanation is required")
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;
type QuestionFormValues = z.infer<typeof questionFormSchema>;

const ExamSectionPage = () => {
  const { examType, sectionType } = useParams<{ examType: string; sectionType: string }>();
  const [activeTab, setActiveTab] = useState('questions');
  const { toast } = useToast();
  
  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  
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
    },
    {
      id: '3',
      category: 'statistics',
      difficulty: 'easy',
      question: 'What is the mean of the following data set: 2, 4, 6, 8, 10?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '6',
      explanation: 'Calculate the mean by adding all numbers and dividing by the count: (2+4+6+8+10)/5 = 30/5 = 6'
    },
    {
      id: '4',
      category: 'algebra',
      difficulty: 'hard',
      question: 'If f(x) = 2x² - 3x + 4, what is f(3)?',
      options: ['13', '16', '19', '22'],
      correctAnswer: '19',
      explanation: 'f(3) = 2(3²) - 3(3) + 4 = 2(9) - 9 + 4 = 18 - 9 + 4 = 13'
    },
    {
      id: '5',
      category: 'calculus',
      difficulty: 'hard',
      question: 'What is the derivative of y = x³ - 4x²?',
      options: ['y\' = 3x² - 8x', 'y\' = 3x² - 4x', 'y\' = x² - 8x', 'y\' = 3x - 8'],
      correctAnswer: 'y\' = 3x² - 8x',
      explanation: 'Use the power rule: for x^n, the derivative is n*x^(n-1). For x³, we get 3x², and for -4x², we get -8x. Combined, we get 3x² - 8x.'
    }
  ]);

  // Handle delete question
  const handleDeleteQuestion = (id: string) => {
    setMathQuestions(mathQuestions.filter(q => q.id !== id));
    toast({
      title: "Question deleted",
      description: "The question has been successfully removed.",
    });
  };

  // Handle regenerate question
  const handleRegenerateQuestion = (id: string) => {
    const updatedQuestions = mathQuestions.map(q => {
      if (q.id === id) {
        if (q.category === 'algebra') {
          return {
            ...q,
            question: 'If 2x - 3 = 7, what is the value of x?',
            options: ['3', '5', '7', '10'],
            correctAnswer: '5',
            explanation: 'To solve for x, add 3 to both sides to get 2x = 10, then divide by 2 to get x = 5.'
          };
        } else if (q.category === 'geometry') {
          return {
            ...q,
            question: 'In a right triangle, if one leg is 6 and the hypotenuse is 10, what is the length of the other leg?',
            options: ['6', '8', '10', '12'],
            correctAnswer: '8',
            explanation: 'Using the Pythagorean theorem: a² + b² = c². We know a = 6 and c = 10, so 6² + b² = 10². Solving for b: b² = 10² - 6² = 100 - 36 = 64, so b = 8.'
          };
        } else {
          return {
            ...q,
            question: 'What is the median of the following data set: 3, 7, 8, 9, 15?',
            options: ['7', '8', '9', '10'],
            correctAnswer: '8',
            explanation: 'Arrange the numbers in order (3, 7, 8, 9, 15) and find the middle value. Since there are 5 numbers, the middle value (8) is the median.'
          };
        }
      }
      return q;
    });
    
    setMathQuestions(updatedQuestions);
    toast({
      title: "Question regenerated",
      description: "The question has been successfully regenerated with new content.",
    });
  };

  // Setup form for editing question
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: '',
      category: '',
      difficulty: 'medium',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      explanation: ''
    }
  });

  // Add form for new questions
  const addForm = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: '',
      category: 'algebra',
      difficulty: 'medium',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      explanation: ''
    }
  });

  // Setup form for settings tab
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      timeLimit: '65',
      passingScore: '70',
      calculatorPolicy: 'partial',
      instructions: 'This section tests your mathematical reasoning and problem-solving skills. Answer all questions to the best of your ability.',
      randomize: false,
      immediateFeedback: true,
      allowReview: true
    }
  });

  // Open edit dialog and set current question
  const openEditDialog = (question: any) => {
    setCurrentQuestion(question);
    form.reset({
      question: question.question,
      category: question.category,
      difficulty: question.difficulty,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
    setIsEditDialogOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = (data: QuestionFormValues) => {
    if (!currentQuestion) return;
    
    const updatedQuestion = {
      ...currentQuestion,
      question: data.question,
      category: data.category,
      difficulty: data.difficulty,
      options: [data.option1, data.option2, data.option3, data.option4],
      correctAnswer: data.correctAnswer,
      explanation: data.explanation
    };
    
    const updatedQuestions = mathQuestions.map(q => 
      q.id === currentQuestion.id ? updatedQuestion : q
    );
    
    setMathQuestions(updatedQuestions);
    setIsEditDialogOpen(false);
    toast({
      title: "Question updated",
      description: "The question has been successfully updated.",
    });
  };

  // Add new question
  const handleAddQuestion = (data: QuestionFormValues) => {
    const newQuestion = {
      id: `${mathQuestions.length + 1}`,
      category: data.category,
      difficulty: data.difficulty,
      question: data.question,
      options: [data.option1, data.option2, data.option3, data.option4],
      correctAnswer: data.correctAnswer,
      explanation: data.explanation
    };
    
    setMathQuestions([...mathQuestions, newQuestion]);
    setIsAddDialogOpen(false);
    addForm.reset();
    
    toast({
      title: "Question added",
      description: "A new question has been added to the list.",
    });
  };

  // Filter questions based on search term, category, and difficulty
  const filteredQuestions = mathQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || q.category === selectedFilter;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get unique categories
  const categories = Array.from(new Set(mathQuestions.map(q => q.category)));
  
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold">SAT Math Questions</h3>
                  <p className="text-muted-foreground">Manage questions for the Math section of the SAT exam.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-indigo hover:bg-indigo/90" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-2/3">
                  <div className="w-1/2">
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-1/2">
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <Card key={question.id} className="border-l-4 border-l-indigo">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-md">{question.question}</CardTitle>
                            <CardDescription>
                              <span className="capitalize bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs mr-2">{question.category}</span>
                              <span className={`capitalize px-2 py-0.5 rounded text-xs ${
                                question.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                                question.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                                'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                              }`}>
                                {question.difficulty}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(question)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRegenerateQuestion(question.id)}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this question? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteQuestion(question.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium mb-1">No questions found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters, or add a new question.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track student performance in SAT Math questions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">76%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">1,245</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Difficulty Index</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">0.68</div>
                      <p className="text-xs text-muted-foreground">Medium difficulty</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col items-center justify-center py-10">
                  <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-muted-foreground">Detailed performance charts coming soon.</p>
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                        <span>Statistics</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" /> Add Category
                    </Button>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Form {...settingsForm}>
                      <form onSubmit={settingsForm.handleSubmit((data) => {
                        console.log(data);
                        toast({
                          title: "Settings saved",
                          description: "Your changes have been saved successfully.",
                        });
                      })} className="space-y-4">
                        <FormField
                          control={settingsForm.control}
                          name="timeLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time Limit (minutes)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Set the maximum time allowed for this section
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="passingScore"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Passing Score (%)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="calculatorPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Calculator Policy</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="space-y-2 pt-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="allowed" id="calculator-allowed" />
                                    <label htmlFor="calculator-allowed">Allowed for all questions</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="partial" id="calculator-partial" />
                                    <label htmlFor="calculator-partial">Allowed for some questions</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="calculator-none" />
                                    <label htmlFor="calculator-none">Not allowed</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="instructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instructions</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  className="min-h-[100px]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="randomize"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-2">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  id="randomize"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel htmlFor="randomize">
                                  Randomize question order
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="immediateFeedback"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  id="immediate-feedback"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel htmlFor="immediate-feedback">
                                  Show immediate feedback
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={settingsForm.control}
                          name="allowReview"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  id="allow-review"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel htmlFor="allow-review">
                                  Allow students to review answers
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            Save Settings
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Question Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
              <DialogDescription>
                Modify the details of this question. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., algebra, geometry" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Enter the question text"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="option1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option A</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option B</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option C</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="option4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option D</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the correct answer (must match one of the options exactly)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Explain why this is the correct answer"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Add Question Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
                Create a new SAT Math question. Fill in all the fields below.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddQuestion)} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={addForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="algebra">Algebra</SelectItem>
                              <SelectItem value="geometry">Geometry</SelectItem>
                              <SelectItem value="statistics">Statistics</SelectItem>
                              <SelectItem value="calculus">Calculus</SelectItem>
                              <SelectItem value="probability">Probability</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormField
                      control={addForm.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={addForm.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Enter the question text"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="option1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option A</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="First option" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="option2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option B</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Second option" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="option3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option C</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Third option" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="option4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option D</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Fourth option" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={addForm.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Enter the correct answer (must match one of the options exactly)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Explain why this is the correct answer"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Question</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  const renderContent = () => {
    if (examType === 'ielts' || examType === 'toefl' || examType === 'pte') {
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
      if (sectionType === 'math') {
        return getSatMathContent();
      } else if (sectionType === 'reading' || sectionType === 'writing') {
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">SAT {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Section Management</h2>
            <p className="text-muted-foreground">
              Manage {sectionType} questions and tasks.
            </p>
          </div>
        );
      }
    } else if (examType === 'gre') {
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
      } else if (sectionType === 'integrated-reasoning') {
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
