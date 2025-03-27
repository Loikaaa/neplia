
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { writingTaskData } from "@/data/writingTaskData";
import { toast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Save, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const WritingTaskCMS = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [academicTasks, setAcademicTasks] = useState(writingTaskData.academic);
  const [essayTasks, setEssayTasks] = useState(writingTaskData.essay);
  const [tab, setTab] = useState("academic");
  const [isEditing, setIsEditing] = useState(false);
  
  const tasks = tab === "academic" ? academicTasks : essayTasks;
  
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (task: any) => {
    setEditingTask({ ...task });
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingTask(prev => ({
      ...prev,
      [name]: name === "minWords" || name === "timeLimit" ? parseInt(value) : value
    }));
  };

  const handleSave = () => {
    if (tab === "academic") {
      setAcademicTasks(prev => 
        prev.map(task => task.id === editingTask.id ? editingTask : task)
      );
    } else {
      setEssayTasks(prev => 
        prev.map(task => task.id === editingTask.id ? editingTask : task)
      );
    }
    
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
    
    setIsEditing(false);
    setEditingTask(null);
  };

  const handleAddNew = () => {
    const newId = `${tab}-${tasks.length + 1}`;
    const newTask = {
      id: newId,
      title: "New Task",
      description: "Task description",
      instructions: "Task instructions",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      timeLimit: tab === "academic" ? 20 : 40,
      minWords: tab === "academic" ? 150 : 250,
      category: "New Category"
    };
    
    if (tab === "academic") {
      setAcademicTasks(prev => [...prev, newTask]);
    } else {
      setEssayTasks(prev => [...prev, newTask]);
    }
    
    handleEdit(newTask);
    
    toast({
      title: "Success",
      description: "New task created successfully",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

  const handleDelete = (taskId: string) => {
    if (tab === "academic") {
      setAcademicTasks(prev => prev.filter(task => task.id !== taskId));
    } else {
      setEssayTasks(prev => prev.filter(task => task.id !== taskId));
    }
    
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
    
    setIsEditing(false);
    setEditingTask(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Writing Tasks Management</h1>
        
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="academic">Academic Tasks</TabsTrigger>
              <TabsTrigger value="essay">Essay Tasks</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="h-4 w-4" /> Add New Task
              </Button>
            </div>
          </div>
          
          <TabsContent value="academic" className="mt-0">
            <Card>
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Academic Task</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={editingTask.title} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={editingTask.category} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                        <Input id="timeLimit" name="timeLimit" type="number" value={editingTask.timeLimit} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minWords">Minimum Words</Label>
                        <Input id="minWords" name="minWords" type="number" value={editingTask.minWords} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" value={editingTask.imageUrl} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={editingTask.description} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea id="instructions" name="instructions" value={editingTask.instructions} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTasks.length === 0 ? (
                        <p className="col-span-2 text-center py-8 text-muted-foreground">No tasks found. Try a different search or add a new task.</p>
                      ) : (
                        filteredTasks.map((task) => (
                          <Card key={task.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{task.title}</CardTitle>
                              <CardDescription>{task.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Time: {task.timeLimit} mins</span>
                                <span>Min. Words: {task.minWords}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(task)} className="gap-1">
                                <Edit className="h-3 w-3" /> Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)} className="gap-1">
                                <Trash2 className="h-3 w-3" /> Delete
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="essay" className="mt-0">
            <Card>
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Essay Task</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={editingTask.title} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={editingTask.category} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                        <Input id="timeLimit" name="timeLimit" type="number" value={editingTask.timeLimit} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minWords">Minimum Words</Label>
                        <Input id="minWords" name="minWords" type="number" value={editingTask.minWords} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" value={editingTask.imageUrl} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={editingTask.description} onChange={handleChange} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea id="instructions" name="instructions" value={editingTask.instructions} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTasks.length === 0 ? (
                        <p className="col-span-2 text-center py-8 text-muted-foreground">No tasks found. Try a different search or add a new task.</p>
                      ) : (
                        filteredTasks.map((task) => (
                          <Card key={task.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{task.title}</CardTitle>
                              <CardDescription>{task.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Time: {task.timeLimit} mins</span>
                                <span>Min. Words: {task.minWords}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(task)} className="gap-1">
                                <Edit className="h-3 w-3" /> Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)} className="gap-1">
                                <Trash2 className="h-3 w-3" /> Delete
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WritingTaskCMS;
