
import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Settings, 
  FileImage, PenTool, Brain, Megaphone 
} from 'lucide-react';
import { AdminRole } from '@/types/adminRoles';

interface AdminSidebarProps {
  currentAdminRole: AdminRole;
  isLinkActive: (path: string) => boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentAdminRole, isLinkActive }) => {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'manager', 'teacher', 'instructor', 'marketing'] },
    { href: '/admin/users', label: 'Users', icon: Users, roles: ['super_admin', 'admin', 'manager'] },
    { href: '/admin/resources', label: 'Resources', icon: FileImage, roles: ['super_admin', 'admin', 'teacher'] },
    { href: '/admin/exam-sections', label: 'Exam Sections', icon: FileText, roles: ['super_admin', 'admin', 'teacher'] },
    { href: '/admin/reading-tasks', label: 'Reading Tasks', icon: BookOpen, roles: ['super_admin', 'admin', 'teacher'] },
    { href: '/admin/writing-tasks', label: 'Writing Tasks', icon: PenTool, roles: ['super_admin', 'admin', 'teacher', 'instructor'] },
    { href: '/admin/blog-posts', label: 'Blog Posts', icon: FileText, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/marketing', label: 'Marketing', icon: Megaphone, roles: ['super_admin', 'admin', 'marketing'] },
    { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['super_admin', 'admin'] },
  ];

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(currentAdminRole)
  );

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-white dark:bg-gray-950">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="rounded-md bg-indigo-600 p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 7L12 12L4 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold">Neplia Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isLinkActive(item.href)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.notifications && (
                <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {item.notifications}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/images/admin-avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@neplia.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
