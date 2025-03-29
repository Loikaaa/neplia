
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Headphones, Edit, MessageSquare, BarChart3, Search, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserProfileMenu from './UserProfileMenu';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
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
  { 
    name: 'Practice', 
    path: '/practice', 
    highlight: true,
    submenu: true
  },
  { name: 'Resources', path: '/resources' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          ? 'py-2 scrolled' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-indigo">
                Neplia<span className="text-coral">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    {link.name === 'Practice' ? (
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
                          <div className="w-[220px] p-4">
                            <ul className="space-y-2">
                              {examTypes.map((examType) => (
                                <li key={examType.name} className="rounded-md transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={examType.path}
                                      className="flex items-center justify-between p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300"
                                    >
                                      {examType.name}
                                      <ChevronDown className="h-4 w-4" />
                                    </Link>
                                  </NavigationMenuLink>
                                  <div className="absolute left-full top-0 z-10 mt-0 w-[280px] rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-900 hidden group-hover:block">
                                    <ul className="space-y-1">
                                      {examType.sections.map((section) => (
                                        <li key={section.name}>
                                          <Link
                                            to={section.path}
                                            className="flex items-center gap-2 rounded-md p-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo dark:text-gray-200 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                                          >
                                            {section.icon && <section.icon className="h-4 w-4" />}
                                            <span>{section.name}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </li>
                              ))}
                            </ul>
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

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {isUserActive ? (
              <div className="flex items-center gap-2">
                <UserProfileMenu />
                <button
                  className="md:hidden text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg border border-indigo text-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
                <div className="hidden md:block ml-2">
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 bg-indigo hover:bg-indigo/90 text-white rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
                <button
                  className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
                {link.name === 'Practice' ? (
                  <Collapsible open={openSubmenu === link.name}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                        className={cn(
                          "flex w-full items-center justify-between p-2 text-lg font-medium",
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
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-2 space-y-2 mt-2">
                      {examTypes.map((examType) => (
                        <Collapsible key={examType.name} open={openExamType === examType.name}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => setOpenExamType(openExamType === examType.name ? null : examType.name)}
                              className="flex w-full items-center justify-between p-2 text-md font-medium text-indigo-600 dark:text-indigo-400"
                            >
                              {examType.name}
                              <ChevronDown className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                openExamType === examType.name ? "rotate-180" : ""
                              )} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 space-y-1 mt-1">
                            {examType.sections.map((section) => (
                              <Link
                                key={section.name}
                                to={section.path}
                                className="flex items-center gap-2 py-2 px-2 text-gray-600 dark:text-gray-400 hover:text-indigo dark:hover:text-indigo-300 rounded-md transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setOpenSubmenu(null);
                                  setOpenExamType(null);
                                }}
                              >
                                {section.icon && <section.icon className="h-4 w-4" />}
                                {section.name}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
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
