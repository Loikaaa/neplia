
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowLeft, Share2, Bookmark, Star } from 'lucide-react';

const ResourceDetail = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  // In a real app, this would fetch data from an API
  const getResourceData = (id: string) => {
    // This is mock data that would normally come from a backend
    const resources = [
      {
        id: "complete-study-guide",
        title: "Complete Study Guide",
        description: "A comprehensive guide covering all essential topics for exam preparation.",
        type: "PDF",
        level: "All Levels",
        popularity: 5,
        downloadCount: "5.2K",
        lastUpdated: "June 15, 2023",
        isPremium: true,
        content: "This comprehensive study guide covers all sections of the exam, including detailed explanations of question types, strategies for each section, and practice questions with answers and explanations. The guide also includes tips from top scorers and common mistakes to avoid.",
        sections: [
          { title: "Reading Section", content: "Strategies for different question types, practice passages with detailed explanation of answers." },
          { title: "Writing Section", content: "Templates for Task 1 and Task 2, sample essays with examiner comments." },
          { title: "Listening Section", content: "Note-taking techniques, practice with various accents and scenarios." },
          { title: "Speaking Section", content: "Common questions, response structures, and vocabulary for different topics." }
        ]
      },
      {
        id: "reading-techniques",
        title: "Mastering Reading Techniques",
        description: "Learn effective strategies for improving reading comprehension and speed.",
        type: "Book",
        level: "Intermediate",
        popularity: 4,
        downloadCount: "3.8K",
        lastUpdated: "August 3, 2023",
        content: "This resource teaches advanced reading techniques including skimming, scanning, and detailed reading approaches. It contains targeted exercises for improving reading speed while maintaining comprehension, and strategies for handling different question types in the reading section.",
        sections: [
          { title: "Skimming Strategies", content: "How to quickly identify main ideas and key information." },
          { title: "Scanning Techniques", content: "Methods to locate specific information efficiently." },
          { title: "Detailed Reading", content: "Approaches for thorough comprehension of complex passages." },
          { title: "Question Attack Strategies", content: "Techniques for tackling different question formats." }
        ]
      },
      {
        id: "listening-practice",
        title: "Listening Practice Collection",
        description: "Audio samples with practice questions to enhance listening skills for various accents.",
        type: "Audio",
        level: "Beginner",
        popularity: 4,
        downloadCount: "2.9K",
        lastUpdated: "October 12, 2023",
        isNew: true,
        content: "This collection features over 50 audio recordings covering a range of accents, speech patterns, and topics. Each recording is accompanied by questions that mimic the format of the actual exam, with detailed answer explanations and transcripts for self-study.",
        sections: [
          { title: "Section 1: Everyday Conversations", content: "Practice with dialogues in common situations." },
          { title: "Section 2: Academic Monologues", content: "Lectures and presentations on various topics." },
          { title: "Section 3: Multiple Speakers", content: "Group discussions with different viewpoints." },
          { title: "Section 4: Advanced Topics", content: "Complex academic lectures and specialized topics." }
        ]
      },
      {
        id: "writing-task-analysis",
        title: "Writing Task Analysis",
        description: "Sample essays with expert annotations and feedback for improving writing skills.",
        type: "PDF",
        level: "Advanced",
        popularity: 5,
        downloadCount: "4.7K",
        lastUpdated: "January 5, 2024",
        content: "This guide analyzes over 30 high-scoring essay responses, highlighting effective structures, vocabulary use, and grammar patterns. It includes step-by-step approaches to both writing tasks, with templates and phrases that can boost your score.",
        sections: [
          { title: "Task 1 Analysis", content: "Examples and breakdowns of high-scoring Task 1 responses." },
          { title: "Task 2 Essay Structures", content: "Different organizational patterns for persuasive writing." },
          { title: "Vocabulary Enhancement", content: "Academic word lists and usage examples." },
          { title: "Grammar Focus", content: "Complex structures that impress examiners." }
        ]
      },
      {
        id: "speaking-tutorial",
        title: "Speaking Test Tutorial",
        description: "Video guide demonstrating effective speaking strategies and response structures.",
        type: "Video",
        level: "All Levels",
        popularity: 5,
        downloadCount: "6.1K",
        lastUpdated: "November 22, 2023",
        isPremium: true,
        content: "This comprehensive video tutorial features expert instructors demonstrating ideal responses for all speaking test sections. It includes tips for managing nervousness, strategies for extending answers, and techniques for handling difficult questions with confidence.",
        sections: [
          { title: "Part 1: Introduction and Interview", content: "Techniques for fluent self-introduction." },
          { title: "Part 2: Individual Long Turn", content: "Strategies for speaking at length on a topic." },
          { title: "Part 3: Two-way Discussion", content: "Methods for engaging in deeper discussion." },
          { title: "Pronunciation and Fluency", content: "Exercises to improve clarity and natural speech." }
        ]
      },
      {
        id: "vocabulary-builder",
        title: "Vocabulary Builder Worksheets",
        description: "Exercises to expand your vocabulary for all test sections with topical word lists.",
        type: "PDF",
        level: "Intermediate",
        popularity: 3,
        downloadCount: "1.8K",
        lastUpdated: "March 17, 2024",
        isNew: true,
        content: "These worksheets contain over 500 essential vocabulary words organized by topics commonly found in the exam. Each worksheet includes definitions, example sentences, collocations, and exercises to help you memorize and use these words effectively in your test.",
        sections: [
          { title: "Academic Vocabulary", content: "Words commonly used in educational contexts." },
          { title: "Topic-specific Vocabulary", content: "Words organized by common test themes." },
          { title: "Collocations and Phrases", content: "Word combinations that sound natural to native speakers." },
          { title: "Vocabulary Exercises", content: "Practice activities to cement your learning." }
        ]
      }
    ];
    
    return resources.find(resource => resource.id === id) || null;
  };

  const resource = getResourceData(resourceId || '');

  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
          <p className="mb-6">The resource you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/resources')}>
            Back to Resources
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/resources')}
        >
          <ArrowLeft className="mr-2" size={16} /> Back to Resources
        </Button>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {/* Resource Header */}
          <div className="p-6 md:p-8 border-b">
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    {resource.type}
                  </Badge>
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500">
                    {resource.level}
                  </Badge>
                  {resource.isNew && (
                    <Badge className="bg-pink-500 text-white">New</Badge>
                  )}
                  {resource.isPremium && (
                    <Badge className="bg-yellow-500 text-white">Premium</Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < resource.popularity ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-gray-500">{resource.downloadCount} downloads</span>
                  <span className="text-gray-500">Last updated: {resource.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="gap-2">
                  <Download size={16} /> Download
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bookmark size={16} /> Save
                </Button>
                <Button variant="ghost" className="gap-2">
                  <Share2 size={16} /> Share
                </Button>
              </div>
            </div>
          </div>
          
          {/* Resource Content */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {resource.content}
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {resource.sections?.map((section, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Ready to get started?</h2>
              <p className="mb-4">Download this resource now and enhance your preparation!</p>
              <Button className="gap-2">
                <Download size={16} /> Download Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
