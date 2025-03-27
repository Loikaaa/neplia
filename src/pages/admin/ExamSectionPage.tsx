import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Search, AlertTriangle, Save, Upload, FileAudio, Music, Trash2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ReadingQuestion, ReadingPassage, ReadingTest } from '@/types/reading';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExamSectionPage = () => {
  const { examType, sectionType } = useParams<{ examType: string; sectionType: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const audioFileRef = useRef<HTMLInputElement>(null);
  
  const [newTask, setNewTask] = useState({
    title: '',
    passageTitle: '',
    passageText: '',
    description: ''
  });

  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedAudios, setUploadedAudios] = useState<Array<{name: string, size: number, url: string}>>([]);

  const [questions, setQuestions] = useState<Partial<ReadingQuestion>[]>([
    {
      text: '',
      type: 'multiple-choice',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ],
      correctAnswer: ''
    }
  ]);

  const formatText = (text: string | undefined) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const sectionTitle = formatText(sectionType);
  const examTitle = formatText(examType)?.toUpperCase();

  const getIconForSection = () => {
    switch(sectionType) {
      case 'reading': return '📚';
      case 'writing': return '✏️';
      case 'listening': return '🎧';
      case 'speaking': return '🎤';
      default: return '📝';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options![optionIndex].label = value;
      setQuestions(updatedQuestions);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      type: 'multiple-choice',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ],
      correctAnswer: ''
    }]);
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.includes('audio')) {
        setSelectedAudioFile(file);
        toast({
          title: "Audio selected",
          description: `${file.name} is ready to upload`,
        });
      } else {
        toast({
          title: "Invalid file format",
          description: "Please select an audio file (MP3, WAV, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const triggerAudioFileInput = () => {
    audioFileRef.current?.click();
  };

  const uploadAudioFile = () => {
    if (!selectedAudioFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setAudioUploadProgress(0);

    const interval = setInterval(() => {
      setAudioUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          const mockUrl = URL.createObjectURL(selectedAudioFile);
          setUploadedAudios(prev => [...prev, {
            name: selectedAudioFile.name,
            size: selectedAudioFile.size,
            url: mockUrl
          }]);
          
          setSelectedAudioFile(null);
          
          toast({
            title: "Upload successful",
            description: `${selectedAudioFile.name} has been uploaded successfully`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeUploadedAudio = (index: number) => {
    setUploadedAudios(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Audio removed",
      description: "The audio file has been removed",
    });
  };

  const saveListeningTask = () => {
    if (!newTask.title || !newTask.description || questions.some(q => !q.text) || uploadedAudios.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide task details, questions, and upload at least one audio file",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success!",
      description: `${newTask.title} has been created successfully.`,
    });

    setIsDialogOpen(false);
    setNewTask({
      title: '',
      passageTitle: '',
      passageText: '',
      description: ''
    });
    setQuestions([{
      text: '',
      type: 'multiple-choice',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ],
      correctAnswer: ''
    }]);
    setUploadedAudios([]);
  };

  const saveReadingTask = () => {
    if (!newTask.title || !newTask.description || !newTask.passageTitle || !newTask.passageText || questions.some(q => !q.text)) {
      toast({
        title: "Validation Error",
        description: "Please provide all required information for the reading task",
        variant: "destructive"
      });
      return;
    }

    if (questions.some(q => !q.correctAnswer)) {
      toast({
        title: "Validation Error",
        description: "Please provide a correct answer for all questions",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success!",
      description: `${newTask.title} has been created successfully.`,
    });

    setIsDialogOpen(false);
    setNewTask({
      title: '',
      passageTitle: '',
      passageText: '',
      description: ''
    });
    setQuestions([{
      text: '',
      type: 'multiple-choice',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ],
      correctAnswer: ''
    }]);
  };

  const renderFormContent = () => {
    if (sectionType === 'listening') {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="e.g., IELTS Listening Test 1" 
                value={newTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="Brief description of this listening task" 
                value={newTask.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Audio Files</CardTitle>
              <CardDescription>
                Upload audio files for this listening test. Students will listen to these while answering questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FileAudio className="h-12 w-12 text-gray-400" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Upload Audio File</h3>
                    <p className="text-sm text-gray-500">
                      Supported formats: MP3, WAV, M4A (Max size: 20MB)
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={triggerAudioFileInput} 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Select File</span>
                    </Button>
                    <Button 
                      onClick={uploadAudioFile} 
                      disabled={!selectedAudioFile || isUploading}
                      className="flex items-center gap-2"
                    >
                      <Music className="h-4 w-4" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Audio'}</span>
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={audioFileRef}
                    onChange={handleAudioFileChange}
                    accept="audio/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading {selectedAudioFile?.name}</span>
                    <span>{audioUploadProgress}%</span>
                  </div>
                  <Progress value={audioUploadProgress} className="h-2" />
                </div>
              )}
              
              {uploadedAudios.length > 0 && (
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">Uploaded Audio Files</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadedAudios.map((audio, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileAudio className="h-4 w-4" />
                            {audio.name}
                          </TableCell>
                          <TableCell>
                            {(audio.size / (1024 * 1024)).toFixed(2)} MB
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeUploadedAudio(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Questions</h3>
              <Button 
                variant="outline" 
                onClick={addQuestion}
                type="button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            
            {questions.map((question, qIndex) => (
              <Card key={qIndex}>
                <CardHeader>
                  <CardTitle className="text-md">Question {qIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`question-${qIndex}`}>Question Text</Label>
                      <Input 
                        id={`question-${qIndex}`}
                        placeholder="Enter the question"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={question.type === 'multiple-choice' ? 'default' : 'outline'}
                          onClick={() => handleQuestionChange(qIndex, 'type', 'multiple-choice')}
                          className="justify-start"
                        >
                          Multiple Choice
                        </Button>
                        <Button
                          type="button"
                          variant={question.type === 'fill-in-blank' ? 'default' : 'outline'}
                          onClick={() => handleQuestionChange(qIndex, 'type', 'fill-in-blank')}
                          className="justify-start"
                        >
                          Fill in the Blank
                        </Button>
                        <Button
                          type="button"
                          variant={question.type === 'true-false' ? 'default' : 'outline'}
                          onClick={() => handleQuestionChange(qIndex, 'type', 'true-false')}
                          className="justify-start"
                        >
                          True/False
                        </Button>
                        <Button
                          type="button"
                          variant={question.type === 'matching' ? 'default' : 'outline'}
                          onClick={() => handleQuestionChange(qIndex, 'type', 'matching')}
                          className="justify-start"
                        >
                          Matching
                        </Button>
                      </div>
                    </div>
                    
                    {question.type === 'multiple-choice' && (
                      <div className="space-y-3">
                        <Label>Answer Options</Label>
                        {question.options?.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-2">
                            <div className="w-8 text-center font-medium">{option.value}</div>
                            <Input 
                              placeholder={`Option ${option.value}`}
                              value={option.label}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            />
                          </div>
                        ))}
                        
                        <div className="space-y-2 pt-2">
                          <Label htmlFor={`correct-answer-${qIndex}`}>Correct Answer</Label>
                          <div className="flex gap-4">
                            {question.options?.map((option) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`answer-${qIndex}-${option.value}`}
                                  name={`correct-answer-${qIndex}`}
                                  value={option.value}
                                  checked={question.correctAnswer === option.value}
                                  onChange={() => handleCorrectAnswerChange(qIndex, option.value)}
                                  className="mr-2"
                                />
                                <Label htmlFor={`answer-${qIndex}-${option.value}`}>{option.value}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {question.type === 'fill-in-blank' && (
                      <div className="space-y-2">
                        <Label htmlFor={`answer-${qIndex}`}>Correct Answer</Label>
                        <Input 
                          id={`answer-${qIndex}`}
                          placeholder="Enter the correct answer"
                          value={question.correctAnswer || ''}
                          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                        />
                      </div>
                    )}
                    
                    {question.type === 'true-false' && (
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`true-${qIndex}`}
                              name={`correct-answer-${qIndex}`}
                              value="true"
                              checked={question.correctAnswer === 'true'}
                              onChange={() => handleCorrectAnswerChange(qIndex, 'true')}
                              className="mr-2"
                            />
                            <Label htmlFor={`true-${qIndex}`}>True</Label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`false-${qIndex}`}
                              name={`correct-answer-${qIndex}`}
                              value="false"
                              checked={question.correctAnswer === 'false'}
                              onChange={() => handleCorrectAnswerChange(qIndex, 'false')}
                              className="mr-2"
                            />
                            <Label htmlFor={`false-${qIndex}`}>False</Label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {question.type === 'matching' && (
                      <div className="space-y-2">
                        <Label htmlFor={`answer-${qIndex}`}>Correct Match</Label>
                        <Input 
                          id={`answer-${qIndex}`}
                          placeholder="Enter the correct match"
                          value={question.correctAnswer || ''}
                          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g., Academic Reading Test 1" 
              value={newTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Input 
              id="description" 
              name="description" 
              placeholder="Brief description of this task" 
              value={newTask.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="passageTitle">Passage Title</Label>
          <Input 
            id="passageTitle" 
            name="passageTitle" 
            placeholder="e.g., The History of Agriculture" 
            value={newTask.passageTitle}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="passageText">Reading Passage</Label>
          <Textarea 
            id="passageText" 
            name="passageText" 
            placeholder="Enter the full reading passage text here..." 
            className="min-h-[200px]"
            value={newTask.passageText}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button 
              variant="outline" 
              onClick={addQuestion}
              type="button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          
          {questions.map((question, qIndex) => (
            <Card key={qIndex}>
              <CardHeader>
                <CardTitle className="text-md">Question {qIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${qIndex}`}>Question Text</Label>
                    <Input 
                      id={`question-${qIndex}`}
                      placeholder="Enter the question"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={question.type === 'multiple-choice' ? 'default' : 'outline'}
                        onClick={() => handleQuestionChange(qIndex, 'type', 'multiple-choice')}
                        className="justify-start"
                      >
                        Multiple Choice
                      </Button>
                      <Button
                        type="button"
                        variant={question.type === 'fill-in-blank' ? 'default' : 'outline'}
                        onClick={() => handleQuestionChange(qIndex, 'type', 'fill-in-blank')}
                        className="justify-start"
                      >
                        Fill in the Blank
                      </Button>
                      <Button
                        type="button"
                        variant={question.type === 'true-false' ? 'default' : 'outline'}
                        onClick={() => handleQuestionChange(qIndex, 'type', 'true-false')}
                        className="justify-start"
                      >
                        True/False
                      </Button>
                      <Button
                        type="button"
                        variant={question.type === 'matching' ? 'default' : 'outline'}
                        onClick={() => handleQuestionChange(qIndex, 'type', 'matching')}
                        className="justify-start"
                      >
                        Matching
                      </Button>
                    </div>
                  </div>
                  
                  {question.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      <Label>Answer Options</Label>
                      {question.options?.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <div className="w-8 text-center font-medium">{option.value}</div>
                          <Input 
                            placeholder={`Option ${option.value}`}
                            value={option.label}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          />
                        </div>
                      ))}
                      
                      <div className="space-y-2 pt-2">
                        <Label htmlFor={`correct-answer-${qIndex}`}>Correct Answer</Label>
                        <div className="flex gap-4">
                          {question.options?.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                id={`answer-${qIndex}-${option.value}`}
                                name={`correct-answer-${qIndex}`}
                                value={option.value}
                                checked={question.correctAnswer === option.value}
                                onChange={() => handleCorrectAnswerChange(qIndex, option.value)}
                                className="mr-2"
                              />
                              <Label htmlFor={`answer-${qIndex}-${option.value}`}>{option.value}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'fill-in-blank' && (
                    <div className="space-y-2">
                      <Label htmlFor={`answer-${qIndex}`}>Correct Answer</Label>
                      <Input 
                        id={`answer-${qIndex}`}
                        placeholder="Enter the correct answer"
                        value={question.correctAnswer || ''}
                        onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {question.type === 'true-false' && (
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`true-${qIndex}`}
                            name={`correct-answer-${qIndex}`}
                            value="true"
                            checked={question.correctAnswer === 'true'}
                            onChange={() => handleCorrectAnswerChange(qIndex, 'true')}
                            className="mr-2"
                          />
                          <Label htmlFor={`true-${qIndex}`}>True</Label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`false-${qIndex}`}
                            name={`correct-answer-${qIndex}`}
                            value="false"
                            checked={question.correctAnswer === 'false'}
                            onChange={() => handleCorrectAnswerChange(qIndex, 'false')}
                            className="mr-2"
                          />
                          <Label htmlFor={`false-${qIndex}`}>False</Label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'matching' && (
                    <div className="space-y-2">
                      <Label htmlFor={`answer-${qIndex}`}>Correct Match</Label>
                      <Input 
                        id={`answer-${qIndex}`}
                        placeholder="Enter the correct match"
                        value={question.correctAnswer || ''}
                        onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {getIconForSection()} {examTitle} {sectionTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage {examTitle} {sectionTitle} tasks and questions.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New {sectionTitle} Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New {examTitle} {sectionTitle} Task</DialogTitle>
                <DialogDescription>
                  Add a new {sectionTitle.toLowerCase()} task for {examTitle}. Fill in all the required information.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                {renderFormContent()}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button 
                  onClick={sectionType === 'listening' ? saveListeningTask : saveReadingTask} 
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save {sectionTitle} Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder={`Search ${sectionTitle.toLowerCase()} tasks...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>No tasks available</CardTitle>
                <CardDescription>
                  Start by adding your first {sectionTitle.toLowerCase()} task for {examTitle}.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add {sectionTitle} Task
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>No academic tasks available</CardTitle>
                <CardDescription>
                  Add your first academic {sectionTitle.toLowerCase()} task for {examTitle}.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Academic {sectionTitle} Task
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="general" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>No general training tasks available</CardTitle>
                <CardDescription>
                  Add your first general training {sectionTitle.toLowerCase()} task for {examTitle}.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add General Training {sectionTitle} Task
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>No practice tests available</CardTitle>
                <CardDescription>
                  Add your first practice {sectionTitle.toLowerCase()} test for {examTitle}.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Practice {sectionTitle} Test
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ExamSectionPage;
