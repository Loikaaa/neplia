
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Download, Upload, Shield } from 'lucide-react';
import { AdminRole } from '@/types/adminRoles';

// Import our new components
import UserFilter from '@/components/admin/users/UserFilter';
import UserTable from '@/components/admin/users/UserTable';
import RoleDialog from '@/components/admin/users/RoleDialog';
import ConfirmDialog from '@/components/admin/users/ConfirmDialog';
import AddUserDialog from '@/components/admin/users/AddUserDialog';

const UsersCMS = () => {
  const { toast } = useToast();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<AdminRole>("student");
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student' as AdminRole,
    status: 'active',
    country: ''
  });

  // Sample user data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@neplia.com', role: 'student' as AdminRole, status: 'active', joinDate: '2023-01-15', country: 'United States', lastLogin: '2023-06-20 14:32' },
    { id: 2, name: 'Jane Smith', email: 'jane@neplia.com', role: 'teacher' as AdminRole, status: 'active', joinDate: '2023-02-20', country: 'Canada', lastLogin: '2023-06-19 09:45' },
    { id: 3, name: 'Bob Johnson', email: 'bob@neplia.com', role: 'student' as AdminRole, status: 'inactive', joinDate: '2023-03-10', country: 'United Kingdom', lastLogin: '2023-05-30 16:21' },
    { id: 4, name: 'Alice Williams', email: 'alice@neplia.com', role: 'admin' as AdminRole, status: 'active', joinDate: '2022-12-05', country: 'Australia', lastLogin: '2023-06-21 08:15' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@neplia.com', role: 'student' as AdminRole, status: 'active', joinDate: '2023-04-22', country: 'Germany', lastLogin: '2023-06-18 11:05' },
    { id: 6, name: 'Maria Garcia', email: 'maria@neplia.com', role: 'instructor' as AdminRole, status: 'active', joinDate: '2023-01-10', country: 'Spain', lastLogin: '2023-06-22 10:15' },
    { id: 7, name: 'David Lee', email: 'david@neplia.com', role: 'marketing' as AdminRole, status: 'active', joinDate: '2023-03-05', country: 'South Korea', lastLogin: '2023-06-21 16:45' },
    { id: 8, name: 'Sarah Johnson', email: 'sarah@neplia.com', role: 'manager' as AdminRole, status: 'active', joinDate: '2023-02-15', country: 'France', lastLogin: '2023-06-20 11:30' },
    { id: 9, name: 'Michael Brown', email: 'michael@neplia.com', role: 'super_admin' as AdminRole, status: 'active', joinDate: '2022-11-01', country: 'United States', lastLogin: '2023-06-22 09:10' }
  ]);

  // Handler for opening role management dialog
  const handleManageRoles = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowRoleDialog(true);
  };

  // Handler for role selection
  const handleRoleSelect = (roleId: AdminRole) => {
    setSelectedRole(roleId);
  };

  // Handler for confirm role change
  const handleConfirmRoleChange = () => {
    setShowRoleDialog(false);
    setShowConfirmDialog(true);
  };

  // Handler for saving role changes
  const handleSaveRoles = () => {
    setUsers(users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, role: selectedRole };
      }
      return user;
    }));
    
    toast({
      title: "Role Updated",
      description: `${selectedUser.name}'s role has been updated successfully.`,
    });
    
    setShowConfirmDialog(false);
  };

  // Handler for adding new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "User Added",
      description: `${newUserData.name} has been successfully added as a new user.`,
    });
    
    setNewUserData({
      name: '',
      email: '',
      role: 'student' as AdminRole,
      status: 'active',
      country: ''
    });
    
    setShowNewUserDialog(false);
  };

  // Handler for updating new user data fields
  const handleUpdateNewUserData = (data: Partial<typeof newUserData>) => {
    setNewUserData({ ...newUserData, ...data });
  };

  // Handler for toggling user status
  const handleToggleStatus = (user: any) => {
    setUsers(users.map(u => {
      if (u.id === user.id) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    
    toast({
      title: user.status === 'active' ? "User Deactivated" : "User Activated",
      description: `${user.name}'s status has been updated.`,
    });
  };

  // Handler for emailing a user
  const handleEmailUser = (user: any) => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${user.name}.`,
    });
  };

  // Bulk role management
  const handleBulkRoleManagement = () => {
    toast({
      title: "Bulk Role Management",
      description: "Select users and assign roles in bulk. Coming soon!",
    });
  };

  // Export users
  const handleExportUsers = () => {
    toast({
      title: "Export Users",
      description: "User data has been exported to CSV.",
    });
  };

  // Import users
  const handleImportUsers = () => {
    toast({
      title: "Import Users",
      description: "Upload a CSV file to import users.",
    });
  };

  // Filter users based on selected filters and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportUsers}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleImportUsers}>
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button className="flex items-center gap-2" onClick={() => setShowNewUserDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleBulkRoleManagement}
            >
              <Shield className="h-4 w-4" />
              Manage Roles
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <UserFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        
        {/* Users Table */}
        <UserTable 
          users={filteredUsers}
          onManageRoles={handleManageRoles}
          onToggleStatus={handleToggleStatus}
          handleEmailUser={handleEmailUser}
        />
      </div>

      {/* Role Management Dialog */}
      <RoleDialog 
        showDialog={showRoleDialog}
        onClose={() => setShowRoleDialog(false)}
        selectedUser={selectedUser}
        selectedRole={selectedRole}
        onRoleSelect={handleRoleSelect}
        onConfirm={handleConfirmRoleChange}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog 
        showDialog={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        selectedUser={selectedUser}
        selectedRole={selectedRole}
        onConfirm={handleSaveRoles}
      />

      {/* Add User Dialog */}
      <AddUserDialog 
        showDialog={showNewUserDialog}
        onClose={() => setShowNewUserDialog(false)}
        userData={newUserData}
        onUserDataChange={handleUpdateNewUserData}
        onAddUser={handleAddUser}
      />
    </AdminLayout>
  );
};

export default UsersCMS;
