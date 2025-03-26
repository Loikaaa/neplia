
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pause, Play, SkipBack, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { listeningTestData } from '@/data/listeningTestData';
import { ListeningQuestions } from './ListeningQuestions';

export const ListeningTest = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const testData = listeningTestData;

  // Mock function to handle audio play/pause since we don't have real audio files
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
          // In a real app, you'd show a toast notification here
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (!isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  // Update progress bar as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(value || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      // In a real test, you might automatically move to the next section here
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const submitTest = () => {
    // In a real app, you would send the answers to the server
    // For now, we'll just mark the test as completed
    setTestCompleted(true);
  };

  return (
    <div className="space-y-6">
      {/* Audio Player */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayPause}
                  className="h-10 w-10 rounded-full"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetAudio}
                  className="h-10 w-10 rounded-full"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Section {currentSection + 1}: {testData.sections[currentSection].title}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <audio 
              ref={audioRef} 
              src={testData.sections[currentSection].audioUrl}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Section Navigation */}
      <div className="flex mb-6 border-b dark:border-gray-700">
        {testData.sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={cn(
              "py-2 px-4 font-medium text-sm border-b-2 transition-colors",
              currentSection === index 
                ? "border-indigo text-indigo dark:border-indigo-400 dark:text-indigo-400" 
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            Section {index + 1}
          </button>
        ))}
      </div>
      
      {/* Questions */}
      <ListeningQuestions 
        questions={testData.sections[currentSection].questions}
        userAnswers={userAnswers}
        onAnswerChange={handleAnswerChange}
      />
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            if (currentSection > 0) {
              setCurrentSection(currentSection - 1);
            }
          }}
          disabled={currentSection === 0}
        >
          Previous Section
        </Button>
        
        {currentSection < testData.sections.length - 1 ? (
          <Button
            onClick={() => setCurrentSection(currentSection + 1)}
          >
            Next Section
          </Button>
        ) : (
          <Button 
            onClick={submitTest}
            className="bg-indigo hover:bg-indigo-600"
          >
            Submit Test
          </Button>
        )}
      </div>
      
      {testCompleted && (
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              Test Completed!
            </h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Your answers have been submitted. You can now view your results.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              View Results
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
