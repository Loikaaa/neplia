
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Video, Bookmark, Star, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResourceProps {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  popularity: number;
  downloadCount: string;
  isNew?: boolean;
  isPremium?: boolean;
  content?: string;
}

const ResourceCard = ({ resource }: { resource: ResourceProps }) => {
  const navigate = useNavigate();
  
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-indigo-500" />;
      case 'video':
        return <Video className="text-pink-500" />;
      case 'audio':
        return <Music className="text-amber-500" />;
      case 'book':
        return <Book className="text-emerald-500" />;
      default:
        return <Bookmark className="text-indigo-500" />;
    }
  };

  const handleViewResource = () => {
    navigate(`/resources/${resource.id}`);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Downloading resource: ${resource.title}`);
    // In a real app, this would trigger a download
  };

  return (
    <Card className="h-full hover:shadow-md transition-all cursor-pointer" onClick={handleViewResource}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="mb-1 text-xl">{resource.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                {resource.type}
              </Badge>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                {resource.level}
              </Badge>
              {resource.isNew && (
                <Badge className="bg-pink-500 text-white hover:bg-pink-600">New</Badge>
              )}
              {resource.isPremium && (
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Premium</Badge>
              )}
            </div>
          </div>
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {getIcon(resource.type)}
          </div>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < resource.popularity ? "currentColor" : "none"} />
          ))}
          <span className="text-sm text-gray-500 ml-2">{resource.downloadCount} downloads</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
          <Download size={16} /> Download
        </Button>
        <Button className="flex-1 gap-2" onClick={handleViewResource}>
          <ExternalLink size={16} /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const PopularResources = () => {
  const navigate = useNavigate();
  
  const resources = [
    {
      id: "complete-study-guide",
      title: "Complete Study Guide",
      description: "A comprehensive guide covering all essential topics for exam preparation.",
      type: "PDF",
      level: "All Levels",
      popularity: 5,
      downloadCount: "5.2K",
      isPremium: true,
      content: "This comprehensive study guide covers all sections of the exam, including detailed explanations of question types, strategies for each section, and practice questions with answers and explanations. The guide also includes tips from top scorers and common mistakes to avoid."
    },
    {
      id: "reading-techniques",
      title: "Mastering Reading Techniques",
      description: "Learn effective strategies for improving reading comprehension and speed.",
      type: "Book",
      level: "Intermediate",
      popularity: 4,
      downloadCount: "3.8K",
      content: "This resource teaches advanced reading techniques including skimming, scanning, and detailed reading approaches. It contains targeted exercises for improving reading speed while maintaining comprehension, and strategies for handling different question types in the reading section."
    },
    {
      id: "listening-practice",
      title: "Listening Practice Collection",
      description: "Audio samples with practice questions to enhance listening skills for various accents.",
      type: "Audio",
      level: "Beginner",
      popularity: 4,
      downloadCount: "2.9K",
      isNew: true,
      content: "This collection features over 50 audio recordings covering a range of accents, speech patterns, and topics. Each recording is accompanied by questions that mimic the format of the actual exam, with detailed answer explanations and transcripts for self-study."
    },
    {
      id: "writing-task-analysis",
      title: "Writing Task Analysis",
      description: "Sample essays with expert annotations and feedback for improving writing skills.",
      type: "PDF",
      level: "Advanced",
      popularity: 5,
      downloadCount: "4.7K",
      content: "This guide analyzes over 30 high-scoring essay responses, highlighting effective structures, vocabulary use, and grammar patterns. It includes step-by-step approaches to both writing tasks, with templates and phrases that can boost your score."
    },
    {
      id: "speaking-tutorial",
      title: "Speaking Test Tutorial",
      description: "Video guide demonstrating effective speaking strategies and response structures.",
      type: "Video",
      level: "All Levels",
      popularity: 5,
      downloadCount: "6.1K",
      isPremium: true,
      content: "This comprehensive video tutorial features expert instructors demonstrating ideal responses for all speaking test sections. It includes tips for managing nervousness, strategies for extending answers, and techniques for handling difficult questions with confidence."
    },
    {
      id: "vocabulary-builder",
      title: "Vocabulary Builder Worksheets",
      description: "Exercises to expand your vocabulary for all test sections with topical word lists.",
      type: "PDF",
      level: "Intermediate",
      popularity: 3,
      downloadCount: "1.8K",
      isNew: true,
      content: "These worksheets contain over 500 essential vocabulary words organized by topics commonly found in the exam. Each worksheet includes definitions, example sentences, collocations, and exercises to help you memorize and use these words effectively in your test."
    }
  ];

  const handleViewAll = () => {
    navigate('/resources/all');
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Popular Resources</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our most downloaded and highly-rated learning materials to boost your skills and confidence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button className="px-8 gap-2" onClick={handleViewAll}>
          View All Resources <span className="ml-1">→</span>
        </Button>
      </div>
    </div>
  );
};

export default PopularResources;
