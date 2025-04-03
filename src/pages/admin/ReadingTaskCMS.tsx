
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, FileText, Eye } from 'lucide-react';
import { readingTestData } from '@/data/readingTestData';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomProgress } from '@/components/ui/custom-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ReadingTest } from '@/types/reading';

const ReadingTaskCMS = () => {
  // Start with readingTestData and add any newly created tests
  const [readingTests, setReadingTests] = useState<ReadingTest[]>([readingTestData]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDifficulty, setNewTaskDifficulty] = useState("medium");
  const [newTaskType, setNewTaskType] = useState("academic");
  const { toast } = useToast();
  
  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  
  // Mock statistics data for IELTS reading tasks
  const statisticsData = {
    totalTasks: readingTests.length,
    academicTasks: readingTests.filter(test => test.id.startsWith('rt')).length,
    generalTasks: readingTests.filter(test => !test.id.startsWith('rt')).length,
    recentlyUpdated: 3,
    avgDifficulty: 6.8,
  };
  
  const filteredTests = readingTests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddNewTask = () => {
    // Create a new reading test with basic structure
    const newTest: ReadingTest = {
      id: `rt-${Date.now()}`,
      title: newTaskTitle,
      description: `A new reading task with difficulty: ${newTaskDifficulty}`,
      totalQuestions: 0,
      duration: 60,
      passages: []
    };
    
    // Add the new test to the array
    setReadingTests(prev => [...prev, newTest]);
    
    toast({
      title: "Task created",
      description: `New reading task "${newTaskTitle}" has been created.`,
    });
    
    setNewTaskTitle("");
    setNewTaskDifficulty("medium");
    setIsAddTaskDialogOpen(false);
  };
  
  const handleDeleteTask = (testId: string) => {
    setReadingTests(prev => prev.filter(test => test.id !== testId));
    toast({
      title: "Task deleted",
      description: "The reading task has been removed.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">IELTS Reading Tasks</h1>
          <p className="text-muted-foreground">Manage all IELTS reading passages and questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tasks</CardTitle>
              <CardDescription>All reading tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.totalTasks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Academic IELTS</CardTitle>
              <CardDescription>Academic reading tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.academicTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.academicTasks / statisticsData.totalTasks * 100} indicatorClassName="bg-indigo-600" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">General IELTS</CardTitle>
              <CardDescription>General training tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.generalTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.generalTasks / statisticsData.totalTasks * 100} indicatorClassName="bg-blue-600" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Difficulty</CardTitle>
              <CardDescription>Band score difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.avgDifficulty}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.avgDifficulty / 9 * 100} indicatorClassName="bg-amber-500" />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>{difficulty.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search tasks..." 
                className="h-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Reading Task</DialogTitle>
                <DialogDescription>
                  Add a new IELTS reading task. You'll be able to add passages and questions after creating the task.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
                  <Select value={newTaskDifficulty} onValueChange={setNewTaskDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (Band 4-5)</SelectItem>
                      <SelectItem value="medium">Medium (Band 6-7)</SelectItem>
                      <SelectItem value="hard">Hard (Band 8-9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="task-type" className="text-sm font-medium">Task Type</label>
                  <Select value={newTaskType} onValueChange={setNewTaskType}>
                    <SelectTrigger id="task-type">
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="general">General Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddNewTask} disabled={!newTaskTitle}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No reading tasks found. Try a different search or add a new task.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.id.startsWith('rt') ? 'Academic' : 'General'}</TableCell>
                          <TableCell>{test.passages.length}</TableCell>
                          <TableCell>{test.totalQuestions}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">6.5-7.5</span>
                              <CustomProgress className="h-2 w-24" value={70} indicatorClassName="bg-amber-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteTask(test.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => test.id.startsWith('rt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No academic reading tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => test.id.startsWith('rt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">7.0-8.0</span>
                                <CustomProgress className="h-2 w-24" value={78} indicatorClassName="bg-indigo-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="general" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => !test.id.startsWith('rt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No general training reading tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => !test.id.startsWith('rt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">5.5-6.5</span>
                                <CustomProgress className="h-2 w-24" value={60} indicatorClassName="bg-blue-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => test.title.toLowerCase().includes("practice")).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No practice tests found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => test.title.toLowerCase().includes("practice"))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.id.startsWith('rt') ? 'Academic' : 'General'}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">6.0-7.0</span>
                                <CustomProgress className="h-2 w-24" value={65} indicatorClassName="bg-green-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ReadingTaskCMS;
