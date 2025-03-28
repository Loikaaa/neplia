
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Check, Search, FileAudio, User, Calendar, Clock, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SpeakingSubmission } from '@/types/speaking';
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

// Mock data for submissions
const mockSubmissions: SpeakingSubmission[] = [
  {
    id: 'sub-1',
    userId: 'user-1',
    taskId: 'speaking-task-1',
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    responses: [
      {
        questionId: 'q1',
        audioUrl: '#',
        duration: 30,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        questionId: 'q2',
        audioUrl: '#',
        duration: 45,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
      }
    ]
  },
  {
    id: 'sub-2',
    userId: 'user-2',
    taskId: 'speaking-task-1',
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    responses: [
      {
        questionId: 'q1',
        audioUrl: '#',
        duration: 28,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        questionId: 'q2',
        audioUrl: '#',
        duration: 42,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      }
    ]
  },
  {
    id: 'sub-3',
    userId: 'user-3',
    taskId: 'speaking-task-1',
    status: 'reviewed',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    reviewedBy: 'admin-1',
    score: {
      fluency: 7,
      vocabulary: 6.5,
      grammar: 7,
      pronunciation: 6,
      overall: 6.5,
      feedback: "Good attempt with natural flow. Work on pronunciation and expanding your vocabulary."
    },
    responses: [
      {
        questionId: 'q1',
        audioUrl: '#',
        duration: 30,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
      },
      {
        questionId: 'q2',
        audioUrl: '#',
        duration: 45,
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
      }
    ]
  }
];

const SpeakingReviewPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedSubmission, setSelectedSubmission] = useState<SpeakingSubmission | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Score state for the review dialog
  const [scores, setScores] = useState({
    fluency: 0,
    vocabulary: 0,
    grammar: 0,
    pronunciation: 0,
    overall: 0
  });
  const [feedback, setFeedback] = useState("");
  
  const filteredSubmissions = mockSubmissions
    .filter(submission => 
      submission.status === activeTab || activeTab === "all")
    .filter(submission => 
      submission.id.includes(searchQuery) || 
      submission.userId.includes(searchQuery));

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const openReviewDialog = (submission: SpeakingSubmission) => {
    setSelectedSubmission(submission);
    
    // Reset scores and feedback if not already reviewed
    if (submission.status === 'pending') {
      setScores({
        fluency: 0,
        vocabulary: 0,
        grammar: 0,
        pronunciation: 0,
        overall: 0
      });
      setFeedback("");
    } else if (submission.score) {
      // Load existing scores and feedback
      setScores({
        fluency: submission.score.fluency,
        vocabulary: submission.score.vocabulary,
        grammar: submission.score.grammar,
        pronunciation: submission.score.pronunciation,
        overall: submission.score.overall
      });
      setFeedback(submission.score.feedback || "");
    }
    
    setIsReviewDialogOpen(true);
  };
  
  const handleReviewSubmit = () => {
    if (!selectedSubmission) return;
    
    // Here we would normally make an API call to update the submission
    toast({
      title: "Review Submitted",
      description: `Successfully reviewed submission ${selectedSubmission.id}`,
    });
    
    setIsReviewDialogOpen(false);
    
    // Update the mock submissions list for demo purposes
    const updatedSubmissions = mockSubmissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: 'reviewed' as const,
          reviewedAt: new Date(),
          reviewedBy: 'admin-user',
          score: {
            fluency: scores.fluency,
            vocabulary: scores.vocabulary,
            grammar: scores.grammar,
            pronunciation: scores.pronunciation,
            overall: scores.overall,
            feedback
          }
        };
      }
      return sub;
    });
    
    // In a real app, we would update the state with the API response
    setSelectedSubmission(null);
  };
  
  const calculateAverageScore = () => {
    const { fluency, vocabulary, grammar, pronunciation } = scores;
    return ((fluency + vocabulary + grammar + pronunciation) / 4).toFixed(1);
  };
  
  const playAudio = (audioUrl: string) => {
    setCurrentAudio(audioUrl);
    // In a real app, we would play the audio file
    toast({
      title: "Playing Audio",
      description: "This is a mock audio player. In a real app, the audio would play.",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🎤 IELTS Speaking Reviews
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and score speaking test submissions
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by submission ID or user ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80"
          />
        </div>
        
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            <TabsTrigger value="all">All Submissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === 'pending' ? 'Pending Reviews' : activeTab === 'reviewed' ? 'Completed Reviews' : 'All Submissions'}</CardTitle>
                <CardDescription>
                  {activeTab === 'pending' 
                    ? 'Speaking test submissions awaiting review' 
                    : activeTab === 'reviewed' 
                      ? 'Speaking test submissions that have been reviewed'
                      : 'All speaking test submissions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSubmissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Submission ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Responses</TableHead>
                        {activeTab === 'reviewed' && <TableHead>Score</TableHead>}
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {submission.userId}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDate(submission.submittedAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              submission.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {submission.status === 'pending' ? 'Pending' : 'Reviewed'}
                            </span>
                          </TableCell>
                          <TableCell>{submission.responses.length}</TableCell>
                          {activeTab === 'reviewed' && (
                            <TableCell>
                              {submission.score ? (
                                <span className="font-medium">{submission.score.overall}</span>
                              ) : '-'}
                            </TableCell>
                          )}
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openReviewDialog(submission)}
                            >
                              {submission.status === 'pending' ? 'Review' : 'View Review'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No submissions found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Review Dialog */}
        {selectedSubmission && (
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedSubmission.status === 'pending' ? 'Review Speaking Submission' : 'View Speaking Review'}</DialogTitle>
                <DialogDescription>
                  Submission ID: {selectedSubmission.id} | User: {selectedSubmission.userId}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recordings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedSubmission.responses.map((response, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <FileAudio className="h-4 w-4 text-indigo-500" />
                            <span>Response {index + 1}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {response.duration}s
                            </span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => playAudio(response.audioUrl)}
                          >
                            Play
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Scoring</CardTitle>
                    <CardDescription>
                      {selectedSubmission.status === 'pending' 
                        ? 'Rate each category from 0 to 9' 
                        : 'Review scores and feedback'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Fluency & Coherence</Label>
                            <span className="font-medium">{scores.fluency}</span>
                          </div>
                          <Slider 
                            value={[scores.fluency]} 
                            min={0} 
                            max={9} 
                            step={0.5}
                            onValueChange={(value) => setScores({...scores, fluency: value[0]})}
                            disabled={selectedSubmission.status === 'reviewed'}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Lexical Resource (Vocabulary)</Label>
                            <span className="font-medium">{scores.vocabulary}</span>
                          </div>
                          <Slider 
                            value={[scores.vocabulary]} 
                            min={0} 
                            max={9} 
                            step={0.5}
                            onValueChange={(value) => setScores({...scores, vocabulary: value[0]})}
                            disabled={selectedSubmission.status === 'reviewed'}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Grammatical Range & Accuracy</Label>
                            <span className="font-medium">{scores.grammar}</span>
                          </div>
                          <Slider 
                            value={[scores.grammar]} 
                            min={0} 
                            max={9} 
                            step={0.5}
                            onValueChange={(value) => setScores({...scores, grammar: value[0]})}
                            disabled={selectedSubmission.status === 'reviewed'}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Pronunciation</Label>
                            <span className="font-medium">{scores.pronunciation}</span>
                          </div>
                          <Slider 
                            value={[scores.pronunciation]} 
                            min={0} 
                            max={9} 
                            step={0.5}
                            onValueChange={(value) => setScores({...scores, pronunciation: value[0]})}
                            disabled={selectedSubmission.status === 'reviewed'}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <Label>Overall Band Score</Label>
                          <span className="font-medium text-lg">{calculateAverageScore()}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="feedback" className="mb-2 block">Feedback</Label>
                        <Textarea 
                          id="feedback"
                          placeholder="Provide feedback on the speaking performance..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                          disabled={selectedSubmission.status === 'reviewed'}
                        />
                      </div>
                      
                      {selectedSubmission.status === 'reviewed' && selectedSubmission.reviewedAt && (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          <p><strong>Reviewed by:</strong> {selectedSubmission.reviewedBy}</p>
                          <p><strong>Reviewed on:</strong> {formatDate(selectedSubmission.reviewedAt)}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                  {selectedSubmission.status === 'pending' ? 'Cancel' : 'Close'}
                </Button>
                {selectedSubmission.status === 'pending' && (
                  <Button onClick={handleReviewSubmit} className="gap-2">
                    <Save className="h-4 w-4" />
                    Submit Review
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default SpeakingReviewPage;
