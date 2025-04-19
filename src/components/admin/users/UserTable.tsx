
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Ban, Shield, Flag, Clock } from 'lucide-react';
import { AdminRole, adminRoleDefinitions } from '@/types/adminRoles';

interface User {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  status: string;
  country: string;
  joinDate: string;
  lastLogin: string;
}

interface UserTableProps {
  users: User[];
  onManageRoles: (user: User) => void;
  onToggleStatus: (user: User) => void;
  handleEmailUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onManageRoles,
  onToggleStatus,
  handleEmailUser
}) => {
  const getRoleBadgeVariant = (role: AdminRole) => {
    const roleMap: Record<string, any> = {
      super_admin: 'destructive',
      admin: 'destructive',
      manager: 'warning',
      teacher: 'secondary',
      instructor: 'default',
      marketing: 'purple',
      student: 'outline'
    };
    
    return roleMap[role] || 'default';
  };

  return (
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
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No users found matching your filters
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {adminRoleDefinitions[user.role]?.name || user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div 
                      className={`h-2 w-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
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
                  <Button variant="ghost" size="sm" onClick={() => handleEmailUser(user)}>
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onToggleStatus(user)}>
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onManageRoles(user)}>
                    <Shield className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
