
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Video, Bookmark, Star } from 'lucide-react';

interface ResourceProps {
  title: string;
  description: string;
  type: string;
  level: string;
  popularity: number;
  downloadCount: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const ResourceCard = ({ resource }: { resource: ResourceProps }) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-indigo" />;
      case 'video':
        return <Video className="text-coral" />;
      case 'book':
        return <Book className="text-teal" />;
      default:
        return <Bookmark className="text-indigo" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="mb-1 text-xl">{resource.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                {resource.type}
              </Badge>
              <Badge variant="outline" className="bg-indigo/10 text-indigo hover:bg-indigo/20">
                {resource.level}
              </Badge>
              {resource.isNew && (
                <Badge className="bg-coral text-white hover:bg-coral/90">New</Badge>
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
      <CardFooter>
        <Button variant="outline" className="w-full gap-2">
          <Download size={16} /> Download Resource
        </Button>
      </CardFooter>
    </Card>
  );
};

const PopularResources = () => {
  const resources = [
    {
      title: "Complete Study Guide",
      description: "A comprehensive guide covering all essential topics.",
      type: "PDF",
      level: "All Levels",
      popularity: 5,
      downloadCount: "5.2K",
      isPremium: true
    },
    {
      title: "Mastering Reading Techniques",
      description: "Learn effective strategies for improving reading comprehension.",
      type: "Book",
      level: "Intermediate",
      popularity: 4,
      downloadCount: "3.8K"
    },
    {
      title: "Listening Practice Collection",
      description: "Audio samples with practice questions to enhance listening skills.",
      type: "Audio",
      level: "Beginner",
      popularity: 4,
      downloadCount: "2.9K",
      isNew: true
    },
    {
      title: "Writing Task Analysis",
      description: "Sample essays with expert annotations and feedback.",
      type: "PDF",
      level: "Advanced",
      popularity: 5,
      downloadCount: "4.7K"
    },
    {
      title: "Speaking Test Tutorial",
      description: "Video guide demonstrating effective speaking strategies.",
      type: "Video",
      level: "All Levels",
      popularity: 5,
      downloadCount: "6.1K",
      isPremium: true
    },
    {
      title: "Vocabulary Builder Worksheets",
      description: "Exercises to expand your vocabulary for all test sections.",
      type: "PDF",
      level: "Intermediate",
      popularity: 3,
      downloadCount: "1.8K",
      isNew: true
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Popular Resources</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our most downloaded and highly-rated learning materials to boost your skills.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button className="px-8 gap-2">
          View All Resources <span className="ml-1">→</span>
        </Button>
      </div>
    </div>
  );
};

export default PopularResources;
