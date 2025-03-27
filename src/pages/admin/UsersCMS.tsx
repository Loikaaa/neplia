
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mail, Ban, Shield } from 'lucide-react';

const UsersCMS = () => {
  // Sample user data for demonstration
  const users = [
    { id: 1, name: 'John Doe', email: 'john@neplia.com', role: 'Student', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@neplia.com', role: 'Teacher', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@neplia.com', role: 'Student', status: 'Inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Williams', email: 'alice@neplia.com', role: 'Admin', status: 'Active', joinDate: '2022-12-05' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@neplia.com', role: 'Student', status: 'Active', joinDate: '2023-04-22' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <Button className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Manage Roles
          </Button>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="h-9" />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersCMS;
