
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
  hasUnsavedChanges: boolean;
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
  },
  {
    id: 'writing-practice-header',
    pageId: 'writing-practice',
    sectionName: 'header',
    content: {
      title: 'IELTS Writing Practice',
      description: 'Master the IELTS writing section with our comprehensive practice tools.'
    },
    lastUpdated: new Date(),
  },
  {
    id: 'writing-practice-controls',
    pageId: 'writing-practice',
    sectionName: 'controls',
    content: {
      startButtonText: 'Start Test',
      endButtonText: 'End Test'
    },
    lastUpdated: new Date(),
  }
];

export const ContentManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editableContent, setEditableContent] = useState<EditableSection[]>(initialContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState<EditableSection[]>(initialContent);

  // In a real app, we'd fetch this from an API
  useEffect(() => {
    // Simulating API fetch
    const fetchContent = async () => {
      // In production, replace with actual API call
      // const response = await fetch('/api/content');
      // const data = await response.json();
      // setEditableContent(data);
      // setOriginalContent(JSON.parse(JSON.stringify(data)));
    };

    fetchContent();
  }, []);

  const setEditMode = (mode: boolean) => {
    if (mode) {
      // Entering edit mode - store original content for potential cancel
      setOriginalContent(JSON.parse(JSON.stringify(editableContent)));
      setHasUnsavedChanges(false);
    } else {
      // Exiting edit mode - save changes or revert back
      // In a real app, this would save to the backend
      // saveContentToBackend(editableContent);
      setHasUnsavedChanges(false);
    }
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
    
    setHasUnsavedChanges(true);
    
    // In production, we wouldn't save immediately but wait for the user to explicitly save
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
        hasUnsavedChanges,
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
