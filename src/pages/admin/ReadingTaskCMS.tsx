import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { readingTestData } from '@/data/readingTestData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReadingTaskCMS = () => {
  // Extract passages to create a list of reading tests
  const readingTests = [readingTestData];
  const [searchQuery, setSearchQuery] = useState("");
  const [examType, setExamType] = useState("ielts");
  
  const examTypes = [
    { value: "ielts", label: "IELTS" },
    { value: "toefl", label: "TOEFL" },
    { value: "pte", label: "PTE" },
    { value: "sat", label: "SAT" },
    { value: "gre", label: "GRE" },
    { value: "gmat", label: "GMAT" },
  ];
  
  const filteredTests = readingTests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Reading Tasks</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Task
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Exam Type" />
            </SelectTrigger>
            <SelectContent>
              {examTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
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
                      filteredTests.map((test, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.id.startsWith('rt') ? 'IELTS' : 'General'}</TableCell>
                          <TableCell>{examType.toUpperCase()}</TableCell>
                          <TableCell>{test.passages.length}</TableCell>
                          <TableCell>{test.totalQuestions}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Academic reading tasks will appear here.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="general" className="mt-4">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        General Training reading tasks will appear here.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Practice reading tests will appear here.
                      </TableCell>
                    </TableRow>
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
