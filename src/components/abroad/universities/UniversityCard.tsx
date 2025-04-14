
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, GraduationCap, Users, Trophy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface UniversityCardProps {
  name: string;
  image: string;
  rank: string;
  location: string;
  tuition: string;
  studentCount: string;
  acceptanceRate: string;
  programHighlights: string[];
  isAdmin?: boolean;
  onEdit?: () => void;
}

const UniversityCard = ({
  name,
  image,
  rank,
  location,
  tuition,
  studentCount,
  acceptanceRate,
  programHighlights,
  isAdmin = false,
  onEdit,
}: UniversityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/50 text-white">
              Rank {rank}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            {location}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">{studentCount} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">{acceptanceRate} Acceptance</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-indigo-500" />
              <span className="font-medium">Tuition: {tuition}/year</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Program Highlights:</p>
            <div className="flex flex-wrap gap-2">
              {programHighlights.map((program) => (
                <Badge key={program} variant="secondary" className="text-xs">
                  {program}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-4 space-x-2">
            <Button variant="default" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
            {isAdmin && (
              <Button 
                variant="outline" 
                onClick={onEdit} 
                className="mt-2 w-full"
              >
                Edit University
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UniversityCard;
