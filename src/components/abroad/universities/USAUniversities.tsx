
import React, { useState } from 'react';
import UniversityCard from './UniversityCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const usUniversities = [
  {
    name: "Harvard University",
    image: "https://images.unsplash.com/photo-1536179247184-595913be67f3?q=80&w=600&auto=format&fit=crop",
    rank: "#1",
    location: "Cambridge, Massachusetts",
    tuition: "$54,768",
    studentCount: "21,000+",
    acceptanceRate: "5%",
    programHighlights: ["Business", "Law", "Medicine", "Computer Science"]
  },
  {
    name: "Massachusetts Institute of Technology",
    image: "https://images.unsplash.com/photo-1564504503792-aa7d38110c49?q=80&w=600&auto=format&fit=crop",
    rank: "#2",
    location: "Cambridge, Massachusetts",
    tuition: "$55,878",
    studentCount: "11,500+",
    acceptanceRate: "7%",
    programHighlights: ["Engineering", "Computer Science", "Physics", "Mathematics"]
  },
  {
    name: "Stanford University",
    image: "https://images.unsplash.com/photo-1608303580996-f839c470b3c6?q=80&w=600&auto=format&fit=crop",
    rank: "#3",
    location: "Stanford, California",
    tuition: "$56,169",
    studentCount: "17,000+",
    acceptanceRate: "4%",
    programHighlights: ["Computer Science", "Engineering", "Business", "Medicine"]
  },
  {
    name: "Yale University",
    image: "https://images.unsplash.com/photo-1582639590011-f5a8416d1101?q=80&w=600&auto=format&fit=crop",
    rank: "#4",
    location: "New Haven, Connecticut",
    tuition: "$57,700",
    studentCount: "12,000+",
    acceptanceRate: "6%",
    programHighlights: ["Law", "Medicine", "Arts", "Social Sciences"]
  },
  {
    name: "Columbia University",
    image: "https://images.unsplash.com/photo-1569234817121-a2552baf4fd4?q=80&w=600&auto=format&fit=crop",
    rank: "#5",
    location: "New York City, New York",
    tuition: "$58,920",
    studentCount: "31,000+",
    acceptanceRate: "5%",
    programHighlights: ["Business", "Journalism", "Engineering", "Arts"]
  },
  {
    name: "University of California Berkeley",
    image: "https://images.unsplash.com/photo-1616431842618-895f67d4c810?q=80&w=600&auto=format&fit=crop",
    rank: "#6",
    location: "Berkeley, California",
    tuition: "$44,115",
    studentCount: "42,000+",
    acceptanceRate: "16%",
    programHighlights: ["Computer Science", "Engineering", "Business", "Physics"]
  }
];

interface USAUniversitiesProps {
  isAdmin?: boolean;
}

interface University {
  name: string;
  image: string;
  rank: string;
  location: string;
  tuition: string;
  studentCount: string;
  acceptanceRate: string;
  programHighlights: string[];
}

const USAUniversities = ({ isAdmin = false }: USAUniversitiesProps) => {
  const [universities, setUniversities] = useState(usUniversities);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempUniversityData, setTempUniversityData] = useState<University | null>(null);

  const handleEdit = (university: University) => {
    console.log(`Editing ${university.name}`);
    setEditingUniversity(university);
    setTempUniversityData({...university});
    setIsDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (tempUniversityData && editingUniversity) {
      const updatedUniversities = universities.map(uni => 
        uni.name === editingUniversity.name ? tempUniversityData : uni
      );
      setUniversities(updatedUniversities);
      setIsDialogOpen(false);
      setEditingUniversity(null);
      setTempUniversityData(null);
    }
  };

  const handleInputChange = (field: keyof University, value: string) => {
    if (tempUniversityData) {
      setTempUniversityData({
        ...tempUniversityData,
        [field]: value
      });
    }
  };

  const handleProgramChange = (value: string) => {
    if (tempUniversityData) {
      setTempUniversityData({
        ...tempUniversityData,
        programHighlights: value.split(',').map(item => item.trim())
      });
    }
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Universities in the United States
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((university) => (
          <UniversityCard
            key={university.name}
            {...university}
            isAdmin={isAdmin}
            onEdit={() => handleEdit(university)}
          />
        ))}
      </div>

      {isAdmin && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit University Information</DialogTitle>
            </DialogHeader>
            {tempUniversityData && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input 
                    id="name" 
                    value={tempUniversityData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">Image URL</Label>
                  <Input 
                    id="image" 
                    value={tempUniversityData.image} 
                    onChange={(e) => handleInputChange('image', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rank" className="text-right">Rank</Label>
                  <Input 
                    id="rank" 
                    value={tempUniversityData.rank} 
                    onChange={(e) => handleInputChange('rank', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input 
                    id="location" 
                    value={tempUniversityData.location} 
                    onChange={(e) => handleInputChange('location', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tuition" className="text-right">Tuition</Label>
                  <Input 
                    id="tuition" 
                    value={tempUniversityData.tuition} 
                    onChange={(e) => handleInputChange('tuition', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="studentCount" className="text-right">Student Count</Label>
                  <Input 
                    id="studentCount" 
                    value={tempUniversityData.studentCount} 
                    onChange={(e) => handleInputChange('studentCount', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="acceptanceRate" className="text-right">Acceptance Rate</Label>
                  <Input 
                    id="acceptanceRate" 
                    value={tempUniversityData.acceptanceRate} 
                    onChange={(e) => handleInputChange('acceptanceRate', e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="programs" className="text-right">Programs</Label>
                  <Textarea 
                    id="programs" 
                    value={tempUniversityData.programHighlights.join(', ')} 
                    onChange={(e) => handleProgramChange(e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default USAUniversities;
