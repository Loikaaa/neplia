
import React, { useState } from 'react';
import { useContentManagement } from '@/contexts/ContentManagementContext';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const ContentEditControls: React.FC = () => {
  const { isEditMode, setEditMode, hasUnsavedChanges } = useContentManagement();
  const { toast } = useToast();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const handleToggleEditMode = () => {
    if (isEditMode) {
      // When exiting edit mode (saving changes)
      toast({
        title: "Changes saved",
        description: "Content has been updated successfully",
      });
      setEditMode(false);
    } else {
      // When entering edit mode
      toast({
        title: "Edit mode enabled",
        description: "You can now edit page content",
      });
      setEditMode(true);
    }
  };
  
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setConfirmDialogOpen(true);
    } else {
      cancelEditMode();
    }
  };
  
  const cancelEditMode = () => {
    setEditMode(false);
    toast({
      title: "Edit mode disabled",
      description: "Changes have been discarded",
    });
    setConfirmDialogOpen(false);
  };
  
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        {isEditMode && (
          <Button 
            onClick={handleCancel}
            variant="destructive"
            className="shadow-lg"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
        <Button 
          onClick={handleToggleEditMode}
          className={`shadow-lg ${isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isEditMode ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Content
            </>
          )}
        </Button>
      </div>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to exit edit mode? All changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={cancelEditMode}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentEditControls;
