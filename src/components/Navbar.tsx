
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, BookOpen, Headphones, Edit, MessageSquare, BarChart3, Search, Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserProfileMenu from './UserProfileMenu';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const examTypes = [
  {
    name: "IELTS",
    path: "/exams/ielts",
    sections: [
      { name: "Listening", path: "/practice/listening", icon: Headphones, description: "Improve your listening skills with our practice tests" },
      { name: "Reading", path: "/practice/reading", icon: BookOpen, description: "Enhance your reading comprehension with timed exercises" },
      { name: "Writing", path: "/practice/writing", icon: Edit, description: "Get AI-powered feedback on your writing tasks" },
      { name: "Speaking", path: "/practice/speaking", icon: MessageSquare, description: "Practice your speaking skills with voice analysis tools" },
      { name: "Mock Tests", path: "/practice/mock-test", icon: Trophy, description: "Take full-length IELTS mock tests under exam conditions" },
    ]
  },
  {
    name: "TOEFL",
    path: "/exams/toefl",
    sections: [
      { name: "Listening", path: "/practice/listening?exam=toefl", icon: Headphones },
      { name: "Reading", path: "/practice/reading?exam=toefl", icon: BookOpen },
      { name: "Writing", path: "/practice/writing?exam=toefl", icon: Edit },
      { name: "Speaking", path: "/practice/speaking?exam=toefl", icon: MessageSquare },
    ]
  },
  {
    name: "SAT",
    path: "/exams/sat",
    sections: [
      { name: "Math", path: "/practice/sat/math", icon: BarChart3 },
      { name: "English", path: "/practice/sat/english", icon: BookOpen },
    ]
  },
  {
    name: "GRE",
    path: "/exams/gre",
    sections: [
      { name: "Verbal", path: "/practice/gre/verbal", icon: BookOpen },
      { name: "Quantitative", path: "/practice/gre/quantitative", icon: BarChart3 },
      { name: "Analytical Writing", path: "/practice/gre/analytical", icon: Edit },
    ]
  },
  {
    name: "GMAT",
    path: "/exams/gmat",
    sections: [
      { name: "Verbal", path: "/practice/gmat/verbal", icon: BookOpen },
      { name: "Quantitative", path: "/practice/gmat/quantitative", icon: BarChart3 },
      { name: "Integrated Reasoning", path: "/practice/gmat/integrated", icon: BarChart3 },
      { name: "Analytical Writing", path: "/practice/gmat/analytical", icon: Edit },
    ]
  },
  {
    name: "PTE",
    path: "/exams/pte",
    sections: [
      { name: "Speaking & Writing", path: "/practice/speaking?exam=pte", icon: MessageSquare },
      { name: "Reading", path: "/practice/reading?exam=pte", icon: BookOpen },
      { name: "Listening", path: "/practice/listening?exam=pte", icon: Headphones },
    ]
  }
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openExamType, setOpenExamType] = useState<string | null>(null);
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';
  const isGuest = localStorage.getItem('userName') === 'Guest' && !isLoggedIn;
  const isUserActive = isLoggedIn || isGuest;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 sticky-header',
        scrolled 
          ? 'py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg' 
          : 'py-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-white dark:text-white">
                Neplia<span className="text-pink-300 dark:text-pink-300">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link 
                      to={link.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-white dark:text-white hover:text-pink-200 dark:hover:text-pink-200 font-medium transition-colors",
                        location.pathname === link.path && "text-pink-200 dark:text-pink-200 bg-white/10 dark:bg-white/10"
                      )}
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Search className="h-5 w-5 text-white dark:text-white" />
              </button>
            </div>

            {isUserActive ? (
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <div>
                      <UserProfileMenu isMobile={true} />
                    </div>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-80 p-0 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950 dark:to-pink-950">
                    <div className="flex flex-col h-full p-6">
                      <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="font-heading text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          Neplia<span className="text-pink-500 dark:text-pink-400">.</span>
                        </Link>
                      </div>

                      <nav className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                          <div key={link.name} className="py-2">
                            <Link
                              to={link.path}
                              className={cn(
                                "block text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300",
                                location.pathname === link.path && "text-indigo-600 dark:text-indigo-300"
                              )}
                            >
                              {link.name}
                            </Link>
                          </div>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="hidden md:block">
                  <UserProfileMenu isMobile={false} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white/10 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
                <div className="hidden md:block ml-2">
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 bg-white hover:bg-white/90 text-indigo-600 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="text-white dark:text-white">
                      <UserProfileMenu isMobile={true} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-80 p-0 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950 dark:to-pink-950">
                    <div className="flex flex-col h-full p-6">
                      <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="font-heading text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          Neplia<span className="text-pink-500 dark:text-pink-400">.</span>
                        </Link>
                      </div>

                      <nav className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                          <div key={link.name} className="py-2">
                            <Link
                              to={link.path}
                              className={cn(
                                "block text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300",
                                location.pathname === link.path && "text-indigo-600 dark:text-indigo-300"
                              )}
                            >
                              {link.name}
                            </Link>
                          </div>
                        ))}
                      </nav>

                      <div className="mt-6 space-y-3">
                        <Link
                          to="/login"
                          className="block w-full text-center px-4 py-3 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                          Log In
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-colors"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
