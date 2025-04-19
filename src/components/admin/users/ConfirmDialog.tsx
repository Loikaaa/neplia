
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, UserCheck } from 'lucide-react';
import { adminRoleDefinitions } from '@/types/adminRoles';

interface ConfirmDialogProps {
  showDialog: boolean;
  onClose: () => void;
  selectedUser: any;
  selectedRole: string;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  showDialog,
  onClose,
  selectedUser,
  selectedRole,
  onConfirm
}) => {
  return (
    <AlertDialog open={showDialog} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedUser && selectedRole && (
              <>
                You are about to change <strong>{selectedUser.name}</strong>'s role from <Badge className="ml-1 mr-1">{adminRoleDefinitions[selectedUser.role]?.name || selectedUser.role}</Badge>
                to <Badge className="ml-1 mr-1">{adminRoleDefinitions[selectedRole]?.name}</Badge>
                <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <p className="text-sm text-amber-700">This action will update user permissions immediately.</p>
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="gap-2 bg-blue-600">
            <UserCheck className="h-4 w-4" />
            Confirm Change
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
