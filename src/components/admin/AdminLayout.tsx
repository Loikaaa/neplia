
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  LayoutDashboard,
  Headphones,
  MicIcon,
  FileBox,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'exams': location.pathname.includes('/admin/exams')
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const examTypes = [
    { id: 'ielts', name: 'IELTS' },
    { id: 'toefl', name: 'TOEFL' },
    { id: 'pte', name: 'PTE' },
    { id: 'sat', name: 'SAT' },
    { id: 'gre', name: 'GRE' },
    { id: 'gmat', name: 'GMAT' },
  ];
  
  const skillSections = [
    { id: 'reading', name: 'Reading', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'writing', name: 'Writing', icon: <FileText className="h-5 w-5" /> },
    { id: 'listening', name: 'Listening', icon: <Headphones className="h-5 w-5" /> },
    { id: 'speaking', name: 'Speaking', icon: <MicIcon className="h-5 w-5" /> },
  ];
  
  const mainNavItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Blog Posts', path: '/admin/blog-posts', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isActiveExamSection = (examType: string, section: string) => {
    return location.pathname === `/admin/exams/${examType}/${section}`;
  };

  const isActiveExamType = (examType: string) => {
    return location.pathname.includes(`/admin/exams/${examType}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between border-b bg-white dark:bg-gray-800 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/admin" className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Neplia Admin</h1>
          </Link>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm">Back to Site</Button>
        </Link>
      </div>
      <div className="flex">
        {/* Mobile sidebar overlay */}
        <div 
          className={cn(
            "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-200",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed md:static top-16 bottom-0 left-0 z-50 w-64 border-r bg-white dark:bg-gray-800 transition-transform duration-300 md:translate-x-0",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav className="flex flex-col gap-1 p-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700",
                    isActivePath(item.path) && "bg-gray-100 dark:bg-gray-700 font-medium"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Collapsible Exams Section */}
              <Collapsible
                open={openSections['exams']}
                onOpenChange={() => toggleSection('exams')}
                className="w-full"
              >
                <CollapsibleTrigger className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700",
                  location.pathname.includes('/admin/exams') && "bg-gray-100 dark:bg-gray-700 font-medium"
                )}>
                  <div className="flex items-center gap-3">
                    <FileBox className="h-5 w-5" />
                    <span>Exam Types</span>
                  </div>
                  {openSections['exams'] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 pt-2">
                  {examTypes.map((exam) => (
                    <Collapsible key={exam.id} 
                      open={isActiveExamType(exam.id)} 
                      onOpenChange={() => {}}
                      className="w-full"
                    >
                      <CollapsibleTrigger className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 my-1",
                        isActiveExamType(exam.id) && "bg-gray-100 dark:bg-gray-700 font-medium"
                      )}
                        onClick={(e) => {
                          e.preventDefault();
                          // Toggle the exam type section
                          const examId = `exam-${exam.id}`;
                          setOpenSections(prev => ({
                            ...prev,
                            [examId]: !prev[examId]
                          }));
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span>{exam.name}</span>
                        </div>
                        {openSections[`exam-${exam.id}`] || isActiveExamType(exam.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 pt-1">
                        {skillSections.map((section) => (
                          <Link
                            key={section.id}
                            to={`/admin/exams/${exam.id}/${section.id}`}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-700 my-1",
                              isActiveExamSection(exam.id, section.id) && "bg-gray-100 dark:bg-gray-700 font-medium"
                            )}
                          >
                            {section.icon}
                            <span>{section.name}</span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
