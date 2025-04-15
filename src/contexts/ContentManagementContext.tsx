
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our editable content
export interface EditableSection {
  id: string;
  pageId: string;
  sectionName: string;
  content: any; // This can store various content types
  lastUpdated: Date;
}

interface ContentManagementContextType {
  editableContent: EditableSection[];
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  updateContent: (sectionId: string, newContent: any) => void;
  getContentForSection: (pageId: string, sectionName: string) => any;
}

// Create the context
const ContentManagementContext = createContext<ContentManagementContextType | undefined>(undefined);

// Mock data - in a real app this would come from an API/database
const initialContent: EditableSection[] = [
  {
    id: 'about-hero',
    pageId: 'about',
    sectionName: 'hero',
    content: {
      title: 'About Neplia',
      description: 'Your trusted partner in IELTS preparation, operated with passion and expertise by Team Tuit.'
    },
    lastUpdated: new Date(),
  },
  {
    id: 'about-story',
    pageId: 'about',
    sectionName: 'story',
    content: {
      title: 'Our Story',
      paragraphs: [
        'Neplia was born from a simple yet powerful observation: IELTS preparation should be accessible, effective, and engaging.',
        'What began as a small collection of practice materials has evolved into a comprehensive platform used by thousands of students worldwide.',
        'Today, Neplia stands as a testament to the dedication of Team Tuit and our commitment to educational excellence.'
      ]
    },
    lastUpdated: new Date(),
  }
];

export const ContentManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editableContent, setEditableContent] = useState<EditableSection[]>(initialContent);
  const [isEditMode, setIsEditMode] = useState(false);

  // In a real app, we'd fetch this from an API
  useEffect(() => {
    // Simulating API fetch
    const fetchContent = async () => {
      // In production, replace with actual API call
      // const response = await fetch('/api/content');
      // const data = await response.json();
      // setEditableContent(data);
    };

    fetchContent();
  }, []);

  const setEditMode = (mode: boolean) => {
    setIsEditMode(mode);
  };

  const updateContent = (sectionId: string, newContent: any) => {
    setEditableContent(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: newContent, lastUpdated: new Date() } 
          : section
      )
    );
    
    // In production, save to backend
    // saveContentToBackend(sectionId, newContent);
  };

  const getContentForSection = (pageId: string, sectionName: string) => {
    const section = editableContent.find(
      s => s.pageId === pageId && s.sectionName === sectionName
    );
    return section?.content;
  };

  return (
    <ContentManagementContext.Provider 
      value={{ 
        editableContent, 
        isEditMode, 
        setEditMode, 
        updateContent,
        getContentForSection
      }}
    >
      {children}
    </ContentManagementContext.Provider>
  );
};

export const useContentManagement = () => {
  const context = useContext(ContentManagementContext);
  if (context === undefined) {
    throw new Error('useContentManagement must be used within a ContentManagementProvider');
  }
  return context;
};
