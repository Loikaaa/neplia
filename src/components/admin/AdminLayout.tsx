
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Settings, Menu, 
  BarChart3, MessageSquare, FileImage, PenTool, Brain, Mail, Megaphone
} from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/resources', label: 'Resources', icon: FileImage },
    { href: '/admin/exam-sections', label: 'Exam Sections', icon: FileText },
    { href: '/admin/reading-tasks', label: 'Reading Tasks', icon: BookOpen },
    { href: '/admin/writing-tasks', label: 'Writing Tasks', icon: PenTool },
    { href: '/admin/speaking-review', label: 'Speaking Review', icon: MessageSquare, notifications: 5 },
    { href: '/admin/blog-posts', label: 'Blog Posts', icon: FileText },
    { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white dark:bg-gray-950">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="rounded-md bg-indigo p-1">
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isLinkActive(item.href)
                    ? "bg-indigo text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.notifications && <NotificationBadge count={item.notifications} />}
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

      {/* Mobile Navigation */}
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden absolute left-4 top-4 z-50">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <Link to="/admin" className="flex items-center gap-2" onClick={closeMobileNav}>
              <div className="rounded-md bg-indigo p-1">
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
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <nav className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    isLinkActive(item.href)
                      ? "bg-indigo text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  }`}
                  onClick={closeMobileNav}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.notifications && <NotificationBadge count={item.notifications} />}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="border-t p-4">
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
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
