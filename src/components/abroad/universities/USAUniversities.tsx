
import React from 'react';
import UniversityCard from './UniversityCard';

const usUniversities = [
  {
    name: "Harvard University",
    image: "https://images.unsplash.com/photo-1600325829439-800c9adba95f?q=80&w=600&auto=format&fit=crop",
    rank: "#1",
    location: "Cambridge, Massachusetts",
    tuition: "$54,768",
    studentCount: "21,000+",
    acceptanceRate: "5%",
    programHighlights: ["Business", "Law", "Medicine", "Computer Science"]
  },
  {
    name: "Massachusetts Institute of Technology",
    image: "https://images.unsplash.com/photo-1581093588777-3bad49084695?q=80&w=600&auto=format&fit=crop",
    rank: "#2",
    location: "Cambridge, Massachusetts",
    tuition: "$55,878",
    studentCount: "11,500+",
    acceptanceRate: "7%",
    programHighlights: ["Engineering", "Computer Science", "Physics", "Mathematics"]
  },
  {
    name: "Stanford University",
    image: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=600&auto=format&fit=crop",
    rank: "#3",
    location: "Stanford, California",
    tuition: "$56,169",
    studentCount: "17,000+",
    acceptanceRate: "4%",
    programHighlights: ["Computer Science", "Engineering", "Business", "Medicine"]
  },
  {
    name: "Yale University",
    image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?q=80&w=600&auto=format&fit=crop",
    rank: "#4",
    location: "New Haven, Connecticut",
    tuition: "$57,700",
    studentCount: "12,000+",
    acceptanceRate: "6%",
    programHighlights: ["Law", "Medicine", "Arts", "Social Sciences"]
  },
  {
    name: "Columbia University",
    image: "https://images.unsplash.com/photo-1566159995201-1d55c0a423c6?q=80&w=600&auto=format&fit=crop",
    rank: "#5",
    location: "New York City, New York",
    tuition: "$58,920",
    studentCount: "31,000+",
    acceptanceRate: "5%",
    programHighlights: ["Business", "Journalism", "Engineering", "Arts"]
  },
  {
    name: "University of California Berkeley",
    image: "https://images.unsplash.com/photo-1580377968103-84cadc052dc7?q=80&w=600&auto=format&fit=crop",
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
    // Admin edit functionality will be implemented here
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
