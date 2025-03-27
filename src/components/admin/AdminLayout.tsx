
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Writing Tasks', path: '/admin/writing-tasks', icon: <FileText className="h-5 w-5" /> },
    { name: 'Reading Tasks', path: '/admin/reading-tasks', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Blog Posts', path: '/admin/blog-posts', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between border-b bg-white dark:bg-gray-800 px-4 md:px-6">
        <Link to="/admin" className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Neplia Admin</h1>
        </Link>
        <Link to="/">
          <Button variant="outline" size="sm">Back to Site</Button>
        </Link>
      </div>
      <div className="flex">
        <aside className="w-64 border-r bg-white dark:bg-gray-800 min-h-[calc(100vh-4rem)] hidden md:block">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700",
                  location.pathname === item.path && "bg-gray-100 dark:bg-gray-700 font-medium"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
