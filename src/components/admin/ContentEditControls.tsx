
import React from 'react';
import { useContentManagement } from '@/contexts/ContentManagementContext';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContentEditControls: React.FC = () => {
  const { isEditMode, setEditMode } = useContentManagement();
  const { toast } = useToast();
  
  const handleToggleEditMode = () => {
    if (isEditMode) {
      // When exiting edit mode
      toast({
        title: "Edit mode disabled",
        description: "Content is no longer editable",
      });
    } else {
      // When entering edit mode
      toast({
        title: "Edit mode enabled",
        description: "You can now edit page content",
      });
    }
    setEditMode(!isEditMode);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={handleToggleEditMode}
        className={`shadow-lg ${isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {isEditMode ? (
          <>
            <Save className="h-4 w-4 mr-2" />
            Done Editing
          </>
        ) : (
          <>
            <Edit className="h-4 w-4 mr-2" />
            Edit Content
          </>
        )}
      </Button>
    </div>
  );
};

export default ContentEditControls;
