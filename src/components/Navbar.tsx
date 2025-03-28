
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Headphones, Edit, MessageSquare, BarChart3, Search, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserProfileMenu from './UserProfileMenu';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  { 
    name: 'Practice', 
    path: '/practice', 
    highlight: true,
    submenu: examTypes
  },
  { name: 'Resources', path: '/resources' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem('demoUserLoggedIn') === 'true';

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-heading text-xl md:text-2xl font-bold text-indigo">
              Neplia<span className="text-coral">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    {link.submenu ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300 font-medium",
                            link.highlight && "bg-indigo text-white hover:bg-indigo-600 hover:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700",
                            location.pathname.startsWith(link.path) && !link.highlight && "text-indigo dark:text-indigo-300",
                            location.pathname.startsWith(link.path) && link.highlight && "bg-indigo-600 text-white dark:bg-indigo-700"
                          )}
                        >
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[800px] grid-cols-3 gap-3 p-4">
                            {link.submenu.map((examType) => (
                              <div key={examType.name} className="space-y-3">
                                <Link
                                  to={examType.path}
                                  className="block font-medium text-lg text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-2"
                                >
                                  {examType.name}
                                </Link>
                                <ul className="space-y-2">
                                  {examType.sections.map((section) => (
                                    <li key={section.name}>
                                      <Link
                                        to={section.path}
                                        className="block select-none space-y-1 rounded-md p-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                      >
                                        <div className="flex items-center gap-2">
                                          {section.icon && (
                                            <div className="w-7 h-7 flex items-center justify-center rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                                              <section.icon className="h-4 w-4" />
                                            </div>
                                          )}
                                          <span>{section.name}</span>
                                        </div>
                                        {section.description && (
                                          <p className="line-clamp-2 text-xs text-muted-foreground pl-9">
                                            {section.description}
                                          </p>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        to={link.path}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300 font-medium transition-colors",
                          location.pathname === link.path && "text-indigo dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30"
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            {isLoggedIn ? (
              <UserProfileMenu />
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg border border-indigo text-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-indigo hover:bg-indigo/90 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && <UserProfileMenu />}
            <button
              className="ml-2 text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full sm:w-80 transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 shadow-xl md:hidden overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="font-heading text-xl font-bold text-indigo" onClick={() => setMobileMenuOpen(false)}>
              Neplia<span className="text-coral">.</span>
            </Link>
            <button
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-6">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2">
                {link.submenu ? (
                  <DropdownMenu open={openSubmenu === link.name} onOpenChange={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center justify-between w-full text-lg font-medium",
                          link.highlight 
                            ? "text-indigo-600 dark:text-indigo-300 font-semibold" 
                            : "text-gray-700 dark:text-gray-200"
                        )}
                      >
                        {link.name}
                        <ChevronDown className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          openSubmenu === link.name ? "rotate-180" : ""
                        )} />
                      </button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-full p-2 bg-gray-50 dark:bg-gray-800 rounded-md my-1">
                      {link.submenu.map((examType) => (
                        <div key={examType.name} className="mb-4">
                          <Link
                            to={examType.path}
                            className="block font-medium text-indigo-600 dark:text-indigo-400 mb-2 px-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {examType.name}
                          </Link>
                          <div className="pl-2 space-y-1">
                            {examType.sections.map((section) => (
                              <DropdownMenuItem key={section.name} asChild>
                                <Link
                                  to={section.path}
                                  className="flex items-center gap-2 py-2 px-2 text-gray-600 dark:text-gray-400 hover:text-indigo dark:hover:text-indigo-300 rounded-md transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {section.icon && <section.icon className="h-4 w-4" />}
                                  {section.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300",
                      location.pathname === link.path && "text-indigo dark:text-indigo-300"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {!isLoggedIn && (
            <div className="mt-6 space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 rounded-lg border border-indigo text-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-indigo hover:bg-indigo/90 text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
