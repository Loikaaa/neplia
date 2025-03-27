
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { speakingTaskData } from '@/data/speakingTaskData';
import { useToast } from "@/hooks/use-toast";

export const SpeakingTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [recordedAudios, setRecordedAudios] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  const currentQuestion = speakingTaskData.questions[currentQuestionIndex];
  
  // Set up timer when question changes
  useEffect(() => {
    if (!currentQuestion) return;
    
    if (currentQuestion.part === 2 && currentQuestion.preparation) {
      setIsPreparing(true);
      setTimer(currentQuestion.preparation);
      setMaxTime(currentQuestion.preparation);
    } else {
      setIsPreparing(false);
      setTimer(currentQuestion.duration || 60);
      setMaxTime(currentQuestion.duration || 60);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentQuestionIndex, currentQuestion]);
  
  // Request microphone access at component mount
  useEffect(() => {
    const checkMicrophoneAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error('Error accessing microphone', error);
        toast({
          title: "Microphone Access Required",
          description: "Please grant microphone access to use the speaking test.",
          variant: "destructive"
        });
      }
    };
    
    checkMicrophoneAccess();
  }, [toast]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudios(prev => ({
          ...prev,
          [currentQuestion.id]: audioUrl
        }));
        
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer countdown
      startTimer();
      
      toast({
        title: "Recording Started",
        description: "Your microphone is now active.",
      });
    } catch (error) {
      console.error('Error starting recording', error);
      toast({
        title: "Recording Failed",
        description: "Could not start recording. Please check your microphone settings.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop the timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      
      toast({
        title: "Recording Stopped",
        description: "Your response has been recorded.",
      });
    }
  };
  
  const startTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    timerIntervalRef.current = window.setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Time's up
          if (isPreparing) {
            // Move from preparation to speaking (in Part 2)
            setIsPreparing(false);
            setTimer(currentQuestion.duration || 120);
            setMaxTime(currentQuestion.duration || 120);
            startRecording();
          } else if (isRecording) {
            // Stop recording when time is up
            stopRecording();
          }
          
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const playRecording = () => {
    const audioUrl = recordedAudios[currentQuestion.id];
    if (audioUrl && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
      setIsPlayingBack(true);
      
      audioPlayerRef.current.onended = () => {
        setIsPlayingBack(false);
      };
    }
  };
  
  const pausePlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingBack(false);
    }
  };
  
  const nextQuestion = () => {
    // Stop any ongoing recording or playback
    if (isRecording) {
      stopRecording();
    }
    if (isPlayingBack && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingBack(false);
    }
    
    // Move to next question or finish test
    if (currentQuestionIndex < speakingTaskData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getPart = () => {
    return `Part ${currentQuestion.part}`;
  };
  
  const getPartDescription = () => {
    switch (currentQuestion.part) {
      case 1:
        return "Introduction and Interview";
      case 2:
        return "Individual Long Turn";
      case 3:
        return "Two-way Discussion";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      {!testCompleted ? (
        <>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded text-sm font-medium">
                    {getPart()} - {getPartDescription()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Question {currentQuestionIndex + 1} of {speakingTaskData.questions.length}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 mb-6">
                <div className="text-lg font-medium mb-2">
                  {isPreparing ? 'Preparation Time' : 'Question'}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md whitespace-pre-line">
                  {currentQuestion.text}
                </div>
                
                {currentQuestion.notes && (
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic">
                    {currentQuestion.notes}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {isPreparing ? 'Preparation Time Remaining' : 'Speaking Time Remaining'}:
                  </div>
                  <div className={cn(
                    "font-mono text-lg",
                    timer < 10 && !isPreparing ? "text-red-500 dark:text-red-400" : ""
                  )}>
                    {formatTime(timer)}
                  </div>
                </div>
                
                <Progress value={(timer / maxTime) * 100} className="h-2" />
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t bg-gray-50 dark:bg-gray-800">
              <div className="w-full flex items-center justify-between">
                <div className="space-x-2">
                  {isPreparing ? (
                    <Button 
                      onClick={() => {
                        setIsPreparing(false);
                        setTimer(currentQuestion.duration || 120);
                        setMaxTime(currentQuestion.duration || 120);
                        if (timerIntervalRef.current) {
                          clearInterval(timerIntervalRef.current);
                        }
                        startRecording();
                      }}
                    >
                      Skip Preparation
                    </Button>
                  ) : !isRecording && !recordedAudios[currentQuestion.id] ? (
                    <Button 
                      onClick={startRecording}
                      className="bg-indigo hover:bg-indigo-600"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : isRecording ? (
                    <Button 
                      onClick={stopRecording}
                      variant="destructive"
                    >
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Recording
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button 
                        onClick={isPlayingBack ? pausePlayback : playRecording}
                        variant="outline"
                      >
                        {isPlayingBack ? (
                          <><Pause className="h-4 w-4 mr-2" /> Pause</>
                        ) : (
                          <><Play className="h-4 w-4 mr-2" /> Play Recording</>
                        )}
                      </Button>
                      
                      <Button 
                        onClick={startRecording}
                        variant="outline"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        Record Again
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={nextQuestion}
                  disabled={isPreparing && !currentQuestion.followUp}
                >
                  {currentQuestionIndex < speakingTaskData.questions.length - 1 ? (
                    <><SkipForward className="h-4 w-4 mr-2" /> Next Question</>
                  ) : (
                    "Finish Test"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Audio element for playback (hidden) */}
          <audio ref={audioPlayerRef} className="hidden" />
          
          {/* Follow-up Questions Section */}
          {currentQuestion.followUp && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Possible Follow-up Questions:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {currentQuestion.followUp.map((question, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {question}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              Speaking Test Completed!
            </h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              You have completed all speaking questions. You can now review your recordings below.
            </p>
            
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Your Recordings</h4>
              {Object.keys(recordedAudios).length > 0 ? (
                <div className="space-y-4">
                  {speakingTaskData.questions.map((question, index) => (
                    recordedAudios[question.id] && (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-md">
                        <div className="mb-2 font-medium">Question {index + 1}</div>
                        <audio 
                          src={recordedAudios[question.id]} 
                          controls 
                          className="w-full"
                        />
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recordings available.</p>
              )}
            </div>
            
            <div className="mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                Download Recordings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
