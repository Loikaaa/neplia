
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { AdminRole, adminRoleDefinitions } from '@/types/adminRoles';

interface NewUserData {
  name: string;
  email: string;
  role: AdminRole;
  status: string;
  country: string;
}

interface AddUserDialogProps {
  showDialog: boolean;
  onClose: () => void;
  userData: NewUserData;
  onUserDataChange: (data: Partial<NewUserData>) => void;
  onAddUser: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  showDialog,
  onClose,
  userData,
  onUserDataChange,
  onAddUser
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => onUserDataChange({name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => onUserDataChange({email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">Country</label>
              <Input
                id="country"
                value={userData.country}
                onChange={(e) => onUserDataChange({country: e.target.value})}
                placeholder="United States"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select 
                value={userData.role} 
                onValueChange={(value) => onUserDataChange({role: value as AdminRole})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(adminRoleDefinitions).map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={userData.status} 
                onValueChange={(value) => onUserDataChange({status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={onAddUser} 
            className="gap-2"
            disabled={!userData.name || !userData.email}
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
