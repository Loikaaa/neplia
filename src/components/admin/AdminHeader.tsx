import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationBadge } from './NotificationBadge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminHeader: React.FC = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('demoAdminLoggedIn');
    window.location.href = '/admin';
  };

  return (
    <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl p-3 sm:p-4 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-base sm:text-lg font-semibold ml-2 lg:ml-0 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </span>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">Exam Sections</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[450px] md:grid-cols-2 lg:w-[550px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500 to-indigo-700 p-4 lg:p-6 no-underline outline-none focus:shadow-md"
                        href="/admin/dashboard"
                      >
                        <div className="mb-2 mt-4 text-base lg:text-lg font-medium text-white">
                          Admin Dashboard
                        </div>
                        <p className="text-xs lg:text-sm leading-tight text-white/90">
                          Comprehensive management for all exam components and student data
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link to="/admin/exams/ielts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">IELTS Tasks</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Manage IELTS test components
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/exams/toefl" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">TOEFL Tasks</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Manage TOEFL test components
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/team" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Team Management</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Manage admin team members
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">Reports & Analytics</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[350px] lg:w-[400px]">
                  <li>
                    <Link to="/admin/dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Performance Analytics</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        View student performance data and analytics
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Progress Tracking</div>
                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Monitor student progress over time
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 hover:text-indigo-600 transition-colors" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <div className="p-3 hover:bg-muted/50 rounded-md">
                <p className="text-sm font-medium">New speaking submission</p>
                <p className="text-xs text-muted-foreground">Student ID: STU-2023-45 submitted a speaking task for review</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <div className="p-3 hover:bg-muted/50 rounded-md">
                <p className="text-sm font-medium">Writing task graded</p>
                <p className="text-xs text-muted-foreground">Instructor has graded a writing task for Student ID: STU-2023-32</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-indigo-600/20 hover:ring-indigo-600/40 transition-all">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="/images/admin-avatar.jpg" alt="Admin" />
                <AvatarFallback className="text-xs">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-sm">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-sm">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
