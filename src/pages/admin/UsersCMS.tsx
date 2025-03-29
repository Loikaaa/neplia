
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, Mail, Ban, Shield, Filter, User, Flag, Clock, Check, UserCheck, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const UsersCMS = () => {
  const { toast } = useToast();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Sample user data for demonstration
  const users = [
    { id: 1, name: 'John Doe', email: 'john@neplia.com', role: 'Student', status: 'Active', joinDate: '2023-01-15', country: 'United States', lastLogin: '2023-06-20 14:32' },
    { id: 2, name: 'Jane Smith', email: 'jane@neplia.com', role: 'Teacher', status: 'Active', joinDate: '2023-02-20', country: 'Canada', lastLogin: '2023-06-19 09:45' },
    { id: 3, name: 'Bob Johnson', email: 'bob@neplia.com', role: 'Student', status: 'Inactive', joinDate: '2023-03-10', country: 'United Kingdom', lastLogin: '2023-05-30 16:21' },
    { id: 4, name: 'Alice Williams', email: 'alice@neplia.com', role: 'Admin', status: 'Active', joinDate: '2022-12-05', country: 'Australia', lastLogin: '2023-06-21 08:15' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@neplia.com', role: 'Student', status: 'Active', joinDate: '2023-04-22', country: 'Germany', lastLogin: '2023-06-18 11:05' }
  ];

  // Available roles for the role management dialog
  const availableRoles = [
    { id: 'student', label: 'Student', description: 'Can access learning materials and take tests' },
    { id: 'teacher', label: 'Teacher', description: 'Can create content and grade student work' },
    { id: 'admin', label: 'Admin', description: 'Full access to all platform features' },
    { id: 'moderator', label: 'Moderator', description: 'Can moderate forum discussions and content' },
    { id: 'contentCreator', label: 'Content Creator', description: 'Can create and publish educational content' }
  ];

  // Handler for opening role management dialog
  const handleManageRoles = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role.toLowerCase());
    setShowRoleDialog(true);
  };

  // Handler for role selection
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  // Handler for confirm role change
  const handleConfirmRoleChange = () => {
    setShowRoleDialog(false);
    setShowConfirmDialog(true);
  };

  // Handler for saving role changes
  const handleSaveRoles = () => {
    const selectedRoleObj = availableRoles.find(role => role.id === selectedRole);
    
    if (selectedRoleObj) {
      toast({
        title: "Role Updated",
        description: `${selectedUser.name}'s role has been updated to ${selectedRoleObj.label}.`,
      });
    }
    
    setShowConfirmDialog(false);
  };

  // Bulk role management
  const handleBulkRoleManagement = () => {
    toast({
      title: "Bulk Role Management",
      description: "Select users and assign roles in bulk. Coming soon!",
    });
  };

  // Filter users based on selected filters and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleBulkRoleManagement}
          >
            <Shield className="h-4 w-4" />
            Manage Roles
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search users..." 
              className="h-9 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 items-center w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No users found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={
                        user.role === 'Admin' ? 'destructive' : 
                        user.role === 'Teacher' ? 'secondary' : 'default'
                      }>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div 
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                          } mr-2`}
                        ></div>
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Flag className="h-3 w-3 text-muted-foreground" />
                      {user.country}
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: `Email has been sent to ${user.name}.`,
                        });
                      }}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast({
                          title: user.status === 'Active' ? "User Banned" : "User Activated",
                          description: `${user.name} has been ${user.status === 'Active' ? 'banned' : 'activated'}.`,
                        });
                      }}>
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleManageRoles(user)}>
                        <Shield className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Role Management Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription>
              {selectedUser ? `Update role for ${selectedUser.name}` : 'Update user role'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={selectedRole} onValueChange={handleRoleSelect} className="space-y-4">
              {availableRoles.map(role => (
                <div key={role.id} className="flex items-start space-x-3 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value={role.id} id={`role-${role.id}`} className="mt-1" />
                  <div className="space-y-1">
                    <label
                      htmlFor={`role-${role.id}`}
                      className="text-sm font-medium leading-none block cursor-pointer"
                    >
                      {role.label}
                    </label>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmRoleChange} className="gap-2">
              <Check className="h-4 w-4" />
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser && selectedRole && (
                <>
                  You are about to change <strong>{selectedUser.name}</strong>'s role from <Badge className="ml-1 mr-1">{selectedUser.role}</Badge>
                  to <Badge className="ml-1 mr-1">{availableRoles.find(r => r.id === selectedRole)?.label}</Badge>
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
            <AlertDialogAction onClick={handleSaveRoles} className="gap-2 bg-blue-600">
              <UserCheck className="h-4 w-4" />
              Confirm Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default UsersCMS;

