
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { adminRoleDefinitions, AdminRole } from '@/types/adminRoles';

interface RoleDialogProps {
  showDialog: boolean;
  onClose: () => void;
  selectedUser: any;
  selectedRole: AdminRole;
  onRoleSelect: (role: AdminRole) => void;
  onConfirm: () => void;
}

const RoleDialog: React.FC<RoleDialogProps> = ({
  showDialog,
  onClose,
  selectedUser,
  selectedRole,
  onRoleSelect,
  onConfirm
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage User Role</DialogTitle>
          <DialogDescription>
            {selectedUser ? `Update role for ${selectedUser.name}` : 'Update user role'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedRole} onValueChange={onRoleSelect} className="space-y-4">
            {Object.values(adminRoleDefinitions).map(role => (
              <div key={role.id} className="flex items-start space-x-3 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value={role.id} id={`role-${role.id}`} className="mt-1" />
                <div className="space-y-1">
                  <label
                    htmlFor={`role-${role.id}`}
                    className="text-sm font-medium leading-none block cursor-pointer"
                  >
                    {role.name}
                  </label>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="gap-2">
            <Check className="h-4 w-4" />
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;
