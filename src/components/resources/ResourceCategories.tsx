
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Book, FileText, Video, Bookmark, Calendar, Download } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const CategoryCard = ({ title, description, icon, color }: CategoryCardProps) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-t-4 h-full" style={{ borderTopColor: color }}>
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className="rounded-full p-3" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResourceCategories = () => {
  const categories = [
    {
      title: "Practice Tests",
      description: "Mock tests and sample questions to assess your progress.",
      icon: <FileText size={24} style={{ color: "#8B5CF6" }} />,
      color: "#8B5CF6"
    },
    {
      title: "Video Tutorials",
      description: "Watch expert instructors explain complex topics.",
      icon: <Video size={24} style={{ color: "#EC4899" }} />,
      color: "#EC4899"
    },
    {
      title: "Study Guides",
      description: "Comprehensive materials to improve your understanding.",
      icon: <Book size={24} style={{ color: "#10B981" }} />,
      color: "#10B981"
    },
    {
      title: "Vocabulary Lists",
      description: "Essential words and phrases to expand your lexicon.",
      icon: <Bookmark size={24} style={{ color: "#F97316" }} />,
      color: "#F97316"
    },
    {
      title: "Lesson Plans",
      description: "Structured learning schedules to optimize your study time.",
      icon: <Calendar size={24} style={{ color: "#3B82F6" }} />,
      color: "#3B82F6"
    },
    {
      title: "Downloadable Worksheets",
      description: "Printable exercises for offline practice.",
      icon: <Download size={24} style={{ color: "#6366F1" }} />,
      color: "#6366F1"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Resource Categories</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Browse through our carefully organized categories to find the perfect materials for your learning journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default ResourceCategories;
