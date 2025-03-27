
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FullMockExam from '@/components/practice/FullMockExam';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/hooks/use-toast";

type SectionScore = {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

type BandDescriptions = {
  [key: number]: {
    description: string;
    recommendation: string;
  }
}

const MockTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [scores, setScores] = useState<SectionScore>({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  const { toast } = useToast();
  
  // Band score descriptions and recommendations
  const bandDescriptions: BandDescriptions = {
    9: {
      description: "Expert user: Full operational command of the language.",
      recommendation: "Consider taking advanced academic courses or professional opportunities in English-speaking environments."
    },
    8: {
      description: "Very good user: Fully operational command with only occasional inaccuracies.",
      recommendation: "Focus on nuanced vocabulary and advanced academic writing to perfect your skills."
    },
    7: {
      description: "Good user: Operational command with occasional inaccuracies.",
      recommendation: "Work on complex grammatical structures and academic vocabulary to improve further."
    },
    6: {
      description: "Competent user: Generally effective command with some inaccuracies.",
      recommendation: "Practice more academic writing and speaking to improve coherence and fluency."
    },
    5: {
      description: "Modest user: Partial command with many inaccuracies.",
      recommendation: "Focus on grammar fundamentals and expand your vocabulary with regular reading practice."
    },
    4: {
      description: "Limited user: Basic competence is limited to familiar situations.",
      recommendation: "Increase exposure to English through daily reading and listening practice."
    }
  };
  
  const calculateOverallBand = (sectionScores: SectionScore): number => {
    const { listening, reading, writing, speaking } = sectionScores;
    const average = (listening + reading + writing + speaking) / 4;
    return Math.round(average * 2) / 2; // Round to nearest 0.5
  };
  
  const getBandDescription = (band: number): string => {
    // Find the closest band description
    const closestBand = Object.keys(bandDescriptions)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - band) < Math.abs(prev - band) ? curr : prev
      );
    
    return bandDescriptions[closestBand].description;
  };
  
  const getRecommendation = (band: number): string => {
    // Find the closest band for recommendation
    const closestBand = Object.keys(bandDescriptions)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - band) < Math.abs(prev - band) ? curr : prev
      );
    
    return bandDescriptions[closestBand].recommendation;
  };
  
  const handleMockTestComplete = (sectionScores: SectionScore) => {
    // This would normally get scores from the actual test
    // For demo purposes, let's set some example scores
    setScores(sectionScores || {
      listening: 7.5,
      reading: 8.0,
      writing: 6.5,
      speaking: 7.0
    });
    
    setIsCompleted(true);
    
    toast({
      title: "Mock Test Completed",
      description: "Your test has been completed and scored. View your results below.",
    });
  };
  
  const handleRetakeTest = () => {
    setIsCompleted(false);
    setScores({
      listening: 0,
      reading: 0,
      writing: 0,
      speaking: 0
    });
  };
  
  const handleBackToPractice = () => {
    navigate('/practice');
  };
  
  const getBandColor = (band: number): string => {
    if (band >= 8) return "text-green-600 dark:text-green-400";
    if (band >= 7) return "text-blue-600 dark:text-blue-400";
    if (band >= 6) return "text-indigo dark:text-indigo-400";
    if (band >= 5) return "text-orange-500 dark:text-orange-400";
    return "text-red-500 dark:text-red-400";
  };
  
  const getProgressColor = (band: number): string => {
    if (band >= 8) return "bg-green-500";
    if (band >= 7) return "bg-blue-500";
    if (band >= 6) return "bg-indigo";
    if (band >= 5) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const overallBand = calculateOverallBand(scores);
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {!isCompleted ? (
            <>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">IELTS Mock Test</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete a full IELTS test under timed conditions to simulate the real exam experience.
                </p>
              </div>
              
              <FullMockExam onComplete={handleMockTestComplete} />
            </>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Your Mock Test Results</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Review your performance across all sections of the IELTS exam.
                </p>
              </div>
              
              {/* Overall Score Card */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-indigo p-3">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Overall Band Score</h2>
                      <div className="mt-2 text-5xl font-bold text-indigo">
                        {overallBand.toFixed(1)}
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {getBandDescription(overallBand)}
                      </p>
                    </div>
                    
                    <div className="w-full max-w-md mt-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Recommendation:</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {getRecommendation(overallBand)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Individual Section Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(scores).map(([section, score]) => (
                  <Card key={section} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span className="capitalize">{section}</span>
                        <Badge className={getBandColor(score)}>
                          Band {score.toFixed(1)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Progress 
                          value={(score / 9) * 100} 
                          className={`h-2 ${getProgressColor(score)}`} 
                        />
                        
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Strengths:</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">
                            {score >= 7 
                              ? "Strong performance in this section." 
                              : "Some good points, but needs improvement."}
                          </p>
                          
                          <div className="flex justify-between mb-1 mt-3">
                            <span className="font-medium">Areas to improve:</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">
                            {score >= 7 
                              ? "Minor improvements in complex language usage." 
                              : "Focus on accuracy and range of language."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>
                    Continue your IELTS preparation journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Practice Weak Areas</h4>
                      <p className="text-sm text-gray-500">
                        Focus on improving your lowest-scoring sections with targeted practice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Review Test Answers</h4>
                      <p className="text-sm text-gray-500">
                        Go through your responses to understand where you made mistakes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Take Another Mock Test</h4>
                      <p className="text-sm text-gray-500">
                        Regular practice tests will help track your progress over time.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="space-x-4">
                  <Button 
                    variant="default" 
                    onClick={handleRetakeTest}
                    className="flex-1"
                  >
                    Retake Mock Test
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleBackToPractice}
                    className="flex-1"
                  >
                    Back to Practice
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockTestPage;
