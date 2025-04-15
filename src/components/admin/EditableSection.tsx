
import React, { useState } from 'react';
import { useContentManagement } from '@/contexts/ContentManagementContext';
import { Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface EditableSectionProps {
  pageId: string;
  sectionName: string;
  children: React.ReactNode;
  title?: boolean;
  content?: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({ 
  pageId, 
  sectionName, 
  children,
  title = false,
  content = false
}) => {
  const { isEditMode, updateContent, getContentForSection } = useContentManagement();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<any>(null);
  const { toast } = useToast();
  
  const sectionContent = getContentForSection(pageId, sectionName);
  const sectionId = `${pageId}-${sectionName}`;
  
  const handleEdit = () => {
    setEditValue(sectionContent);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    updateContent(sectionId, editValue);
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: `Updated ${sectionName} section successfully`,
    });
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(null);
  };
  
  const handleChange = (field: string, value: string) => {
    setEditValue(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...editValue.paragraphs];
    newParagraphs[index] = value;
    setEditValue(prev => ({
      ...prev,
      paragraphs: newParagraphs
    }));
  };
  
  if (!isEditMode) return <>{children}</>;
  
  return (
    <div className="relative group">
      {!isEditing ? (
        <>
          {children}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </>
      ) : (
        <Card className="p-4 border-2 border-dashed border-indigo-400 bg-white dark:bg-gray-900">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">Editing: {sectionName}</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {title && editValue?.title && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={editValue.title} 
                  onChange={(e) => handleChange('title', e.target.value)} 
                />
              </div>
            )}
            
            {content && editValue?.description && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={editValue.description} 
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3} 
                />
              </div>
            )}
            
            {content && editValue?.paragraphs && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Content Paragraphs</label>
                {editValue.paragraphs.map((paragraph: string, index: number) => (
                  <Textarea 
                    key={index}
                    value={paragraph}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    rows={3}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default EditableSection;
