
import React from 'react';
import UniversityCard from './UniversityCard';

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

const USAUniversities = ({ isAdmin = false }: USAUniversitiesProps) => {
  const handleEdit = (universityName: string) => {
    console.log(`Editing ${universityName}`);
    // Here we would typically open a modal or navigate to an edit page
    // For now, we'll just log the action
    alert(`You are now editing ${universityName}. In a real application, this would open an edit form.`);
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Top Universities in the United States
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usUniversities.map((university) => (
          <UniversityCard
            key={university.name}
            {...university}
            isAdmin={isAdmin}
            onEdit={() => handleEdit(university.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default USAUniversities;
