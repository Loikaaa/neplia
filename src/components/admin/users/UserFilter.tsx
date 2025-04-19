
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterRole: string;
  setFilterRole: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus
}) => {
  return (
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
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="student">Student</SelectItem>
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
  );
};

export default UserFilter;
