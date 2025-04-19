
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { adminRoleDefinitions, AdminRole } from '@/types/adminRoles';
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // Mock current admin role - in a real app, this would come from auth
  const currentAdminRole: AdminRole = 'super_admin';

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const getAdminRoleBadgeColor = (role: AdminRole) => {
    const roleDefinition = adminRoleDefinitions[role];
    return roleDefinition ? roleDefinition.color : 'gray';
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'red': 'bg-red-100 text-red-800',
      'orange': 'bg-orange-100 text-orange-800',
      'amber': 'bg-amber-100 text-amber-800',
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'slate': 'bg-slate-100 text-slate-800',
    };
    
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Navigation */}
      <AdminSidebar 
        currentAdminRole={currentAdminRole}
        isLinkActive={isLinkActive}
      />

      {/* Mobile Navigation */}
      <AdminMobileNav 
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        currentAdminRole={currentAdminRole}
        isLinkActive={isLinkActive}
        getColorClass={getColorClass}
        getAdminRoleBadgeColor={getAdminRoleBadgeColor}
      />

      {/* Main Content with top bar */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <AdminHeader />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
