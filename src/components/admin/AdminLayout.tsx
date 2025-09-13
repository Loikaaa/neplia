
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
  GraduationCap, BookOpen as BookIcon, Headphones
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
    { href: '/admin/team', label: 'Team Management', icon: Users, roles: ['super_admin', 'admin'] },
    { href: '/admin/master', label: 'Master', icon: Brain, roles: ['super_admin', 'admin', 'teacher'] },
    { href: '/admin/resources', label: 'Resources', icon: FileImage, roles: ['super_admin', 'admin', 'teacher'] },
    { 
      href: '/admin/exams', 
      label: 'Exams', 
      icon: GraduationCap, 
      roles: ['super_admin', 'admin', 'teacher'],
      subItems: [
        { 
          href: '/admin/exams/ielts', 
          label: 'IELTS', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/ielts/reading', label: 'Reading Tasks', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/ielts/writing', label: 'Writing Tasks', icon: PenTool, roles: ['super_admin', 'admin', 'teacher', 'instructor'] },
            { href: '/admin/exams/ielts/listening', label: 'Listening Tasks', icon: Headphones, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/ielts/speaking', label: 'Speaking Review', icon: MessageSquare, roles: ['super_admin', 'admin', 'instructor'], notifications: 5 },
          ]
        },
        { 
          href: '/admin/exams/toefl', 
          label: 'TOEFL', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/toefl/reading', label: 'Reading Tasks', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/toefl/writing', label: 'Writing Tasks', icon: PenTool, roles: ['super_admin', 'admin', 'teacher', 'instructor'] },
            { href: '/admin/exams/toefl/listening', label: 'Listening Tasks', icon: Headphones, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/toefl/speaking', label: 'Speaking Review', icon: MessageSquare, roles: ['super_admin', 'admin', 'instructor'] },
          ]
        },
        { 
          href: '/admin/exams/gre', 
          label: 'GRE', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/gre/verbal', label: 'Verbal Reasoning', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/gre/quantitative', label: 'Quantitative Reasoning', icon: PenTool, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/gre/analytical', label: 'Analytical Writing', icon: MessageSquare, roles: ['super_admin', 'admin', 'teacher'] },
          ]
        },
        { 
          href: '/admin/exams/gmat', 
          label: 'GMAT', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/gmat/verbal', label: 'Verbal', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/gmat/quantitative', label: 'Quantitative', icon: PenTool, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/gmat/integrated', label: 'Integrated Reasoning', icon: MessageSquare, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/gmat/analytical', label: 'Analytical Writing', icon: Headphones, roles: ['super_admin', 'admin', 'teacher'] },
          ]
        },
        { 
          href: '/admin/exams/sat', 
          label: 'SAT', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/sat/reading', label: 'Reading', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/sat/writing', label: 'Writing & Language', icon: PenTool, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/sat/math', label: 'Math', icon: MessageSquare, roles: ['super_admin', 'admin', 'teacher'] },
          ]
        },
        { 
          href: '/admin/exams/pte', 
          label: 'PTE', 
          icon: BookIcon, 
          roles: ['super_admin', 'admin', 'teacher'],
          subItems: [
            { href: '/admin/exams/pte/reading', label: 'Reading', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/pte/writing', label: 'Writing', icon: PenTool, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/pte/listening', label: 'Listening', icon: Headphones, roles: ['super_admin', 'admin', 'teacher'] },
            { href: '/admin/exams/pte/speaking', label: 'Speaking', icon: MessageSquare, roles: ['super_admin', 'admin', 'teacher'] },
          ]
        },
      ] 
    },
    { href: '/admin/blog-posts', label: 'Blog Posts', icon: FileText, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/marketing', label: 'Marketing', icon: Megaphone, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['super_admin', 'admin'] },
  ];

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(currentAdminRole)
  );

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <AdminHeader />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
