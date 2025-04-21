
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import AdminHeader from './AdminHeader';
import { AdminRole } from '@/types/adminRoles';
import { AdminNavItem } from '@/types/adminNavigation';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Settings,
  BarChart3, MessageSquare, FileImage, PenTool, Brain, Megaphone,
  GraduationCap, BookOpen as BookIcon
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // Mock current admin role - in a real app, this would come from auth
  const currentAdminRole: AdminRole = 'super_admin';

  const navItems: AdminNavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'manager', 'teacher', 'instructor', 'marketing'] },
    { href: '/admin/users', label: 'Users', icon: Users, roles: ['super_admin', 'admin', 'manager'] },
    { href: '/admin/resources', label: 'Resources', icon: FileImage, roles: ['super_admin', 'admin', 'teacher'] },
    { 
      href: '/admin/exam-sections', 
      label: 'Exam Management', 
      icon: GraduationCap, 
      roles: ['super_admin', 'admin', 'teacher'],
      subItems: [
        { href: '/admin/ielts-overview', label: 'IELTS Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
        { href: '/admin/toefl-overview', label: 'TOEFL Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
        { href: '/admin/gre-overview', label: 'GRE Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
        { href: '/admin/gmat-overview', label: 'GMAT Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
        { href: '/admin/sat-overview', label: 'SAT Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
        { href: '/admin/pte-overview', label: 'PTE Tasks', icon: BookIcon, roles: ['super_admin', 'admin', 'teacher'] },
      ] 
    },
    { href: '/admin/reading-tasks', label: 'Reading Tasks', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
    { href: '/admin/writing-tasks', label: 'Writing Tasks', icon: PenTool, roles: ['super_admin', 'admin', 'teacher', 'instructor'] },
    { href: '/admin/speaking-review', label: 'Speaking Review', icon: MessageSquare, roles: ['super_admin', 'admin', 'instructor'], notifications: 5 },
    { href: '/admin/blog-posts', label: 'Blog Posts', icon: FileText, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/marketing', label: 'Marketing', icon: Megaphone, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['super_admin', 'admin'] },
  ];

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(currentAdminRole)
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Navigation */}
      <AdminSidebar 
        navItems={filteredNavItems} 
        currentAdminRole={currentAdminRole} 
      />

      {/* Mobile Navigation */}
      <AdminMobileNav 
        navItems={filteredNavItems}
        currentAdminRole={currentAdminRole}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
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
