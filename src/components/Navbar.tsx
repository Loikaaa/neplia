import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, BookOpen, Headphones, Edit, MessageSquare, BarChart3, Search, Trophy, X, Book, Play, Globe } from 'lucide-react';
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
    color: "bg-indigo-600",
    sections: [
      { name: "Reading", path: "/practice/ielts/reading", icon: BookOpen, description: "Enhance your reading comprehension with timed exercises" },
      { name: "Listening", path: "/practice/ielts/listening", icon: Headphones, description: "Improve your listening skills with our practice tests" },
      { name: "Writing", path: "/practice/ielts/writing", icon: Edit, description: "Get AI-powered feedback on your writing tasks" },
      { name: "Speaking", path: "/practice/ielts/speaking", icon: MessageSquare, description: "Practice your speaking skills with voice analysis tools" },
      { name: "Mock Tests", path: "/practice/mock-test?exam=ielts", icon: Trophy, description: "Take full-length IELTS mock tests under exam conditions" },
    ]
  },
  {
    name: "TOEFL",
    path: "/exams/toefl",
    color: "bg-blue-600",
    sections: [
      { name: "Reading", path: "/practice/toefl/reading", icon: BookOpen, description: "Practice with TOEFL reading passages and questions" },
      { name: "Listening", path: "/practice/toefl/listening", icon: Headphones, description: "Enhance your listening comprehension for lectures and conversations" },
      { name: "Writing", path: "/practice/toefl/writing", icon: Edit, description: "Develop your integrated and independent writing skills" },
      { name: "Speaking", path: "/practice/toefl/speaking", icon: MessageSquare, description: "Improve your spoken English with TOEFL speaking tasks" },
    ]
  },
  {
    name: "GRE",
    path: "/exams/gre",
    color: "bg-purple-700",
    sections: [
      { name: "Verbal Reasoning", path: "/practice/gre/verbal", icon: BookOpen, description: "Improve your verbal reasoning skills for the GRE" },
      { name: "Quantitative Reasoning", path: "/practice/gre/quantitative", icon: BarChart3, description: "Enhance your mathematical problem-solving abilities" },
      { name: "Analytical Writing", path: "/practice/gre/analytical", icon: Edit, description: "Develop your analytical essay writing skills" },
    ]
  },
  {
    name: "GMAT",
    path: "/exams/gmat",
    color: "bg-blue-800",
    sections: [
      { name: "Verbal", path: "/practice/gmat/verbal", icon: BookOpen, description: "Practice critical reasoning, reading comprehension, and sentence correction" },
      { name: "Quantitative", path: "/practice/gmat/quantitative", icon: BarChart3, description: "Enhance your problem-solving and data sufficiency skills" },
      { name: "Integrated Reasoning", path: "/practice/gmat/integrated", icon: BarChart3, description: "Develop your ability to analyze data from multiple sources" },
      { name: "Analytical Writing", path: "/practice/gmat/analytical", icon: Edit, description: "Improve your ability to analyze arguments and express ideas" },
    ]
  },
  {
    name: "SAT",
    path: "/exams/sat",
    color: "bg-red-700",
    sections: [
      { name: "Reading & Writing", path: "/practice/sat/reading", icon: BookOpen, description: "Enhance your reading and writing skills for the SAT" },
      { name: "Math", path: "/practice/sat/math", icon: BarChart3, description: "Improve your mathematical problem-solving abilities" },
    ]
  },
  {
    name: "PTE",
    path: "/exams/pte",
    color: "bg-teal-700",
    sections: [
      { name: "Speaking & Writing", path: "/practice/pte/speaking", icon: MessageSquare, description: "Practice integrated speaking and writing tasks" },
      { name: "Reading", path: "/practice/pte/reading", icon: BookOpen, description: "Enhance your reading comprehension skills" },
      { name: "Listening", path: "/practice/pte/listening", icon: Headphones, description: "Improve your listening skills for academic contexts" },
    ]
  }
];

const navLinks = [
  { name: 'Exams', path: '/exams', icon: Book },
  { name: 'Practice', path: '/practice', icon: Play },
  { name: 'Abroad Study', path: '/abroad', icon: Globe },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 mobile-navbar',
        scrolled 
          ? 'py-2 bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-pink-600/90 shadow-lg' 
          : 'py-3 bg-gradient-to-r from-purple-700/95 via-indigo-700/95 to-pink-700/95'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center animate-fade-in">
              <span className="font-mobile-heading text-xl md:text-2xl font-bold text-white tracking-wider">
                Neplia<span className="text-pink-300">.</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>

            {isUserActive ? (
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <div className="animate-pulse-slow">
                      <UserProfileMenu isMobile={true} />
                    </div>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-full sm:w-80 p-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white"
                  >
                    <div className="flex flex-col h-full p-6">
                      <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="font-heading text-xl font-bold text-white">
                          Neplia<span className="text-pink-400">.</span>
                        </Link>
                      </div>

                      <nav className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                          link.name === 'Practice' ? (
                            <div key={link.name} className="py-2">
                              <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-slate-300 hover:text-white">
                                  Practice
                                  <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-4 mt-2 space-y-2">
                                  <Link to="/practice" className="block py-1 text-slate-300 hover:text-white">
                                    All Practice Tests
                                  </Link>
                                  <Link to="/practice/reading" className="block py-1 text-slate-300 hover:text-white">
                                    Reading
                                  </Link>
                                  <Link to="/practice/listening" className="block py-1 text-slate-300 hover:text-white">
                                    Listening
                                  </Link>
                                  <Link to="/practice/writing" className="block py-1 text-slate-300 hover:text-white">
                                    Writing
                                  </Link>
                                  <Link to="/practice/speaking" className="block py-1 text-slate-300 hover:text-white">
                                    Speaking
                                  </Link>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          ) : (
                            <div key={link.name} className="py-2">
                              <Link
                                to={link.path}
                                className={cn(
                                  "block text-lg font-medium text-slate-300 hover:text-white",
                                  location.pathname === link.path && "text-white"
                                )}
                              >
                                <div className="flex items-center">
                                  <link.icon className="h-5 w-5 mr-2.5" />
                                  {link.name}
                                </div>
                              </Link>
                            </div>
                          )
                        ))}
                        <div className="py-2">
                          <Collapsible>
                            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-slate-300 hover:text-white">
                              Exams
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 mt-2 space-y-2">
                              {examTypes.map(exam => (
                                <Link
                                  key={exam.name}
                                  to={exam.path}
                                  className="block py-1 text-slate-300 hover:text-white"
                                >
                                  {exam.name}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
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
                    className="px-4 py-2 rounded-lg border border-white/70 text-white hover:bg-white/10 transition-colors font-mobile-body"
                  >
                    Log In
                  </Link>
                </div>
                <div className="hidden md:block ml-2">
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 bg-white/90 hover:bg-white text-indigo-600 rounded-lg transition-colors font-mobile-body"
                  >
                    Sign Up
                  </Link>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="text-white">
                      <UserProfileMenu isMobile={true} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-full sm:w-80 p-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white"
                  >
                    <div className="flex flex-col h-full p-6">
                      <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="font-heading text-xl font-bold text-white">
                          Neplia<span className="text-pink-400">.</span>
                        </Link>
                      </div>

                      <nav className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                          link.name === 'Practice' ? (
                            <div key={link.name} className="py-2">
                              <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-slate-300 hover:text-white">
                                  Practice
                                  <ChevronDown className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-4 mt-2 space-y-2">
                                  <Link to="/practice" className="block py-1 text-slate-300 hover:text-white">
                                    All Practice Tests
                                  </Link>
                                  <Link to="/practice/reading" className="block py-1 text-slate-300 hover:text-white">
                                    Reading
                                  </Link>
                                  <Link to="/practice/listening" className="block py-1 text-slate-300 hover:text-white">
                                    Listening
                                  </Link>
                                  <Link to="/practice/writing" className="block py-1 text-slate-300 hover:text-white">
                                    Writing
                                  </Link>
                                  <Link to="/practice/speaking" className="block py-1 text-slate-300 hover:text-white">
                                    Speaking
                                  </Link>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          ) : (
                            <div key={link.name} className="py-2">
                              <Link
                                to={link.path}
                                className={cn(
                                  "block text-lg font-medium text-slate-300 hover:text-white",
                                  location.pathname === link.path && "text-white"
                                )}
                              >
                                <div className="flex items-center">
                                  <link.icon className="h-5 w-5 mr-2.5" />
                                  {link.name}
                                </div>
                              </Link>
                            </div>
                          )
                        ))}
                        <div className="py-2">
                          <Collapsible>
                            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-slate-300 hover:text-white">
                              Exams
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 mt-2 space-y-2">
                              {examTypes.map(exam => (
                                <Link
                                  key={exam.name}
                                  to={exam.path}
                                  className="block py-1 text-slate-300 hover:text-white"
                                >
                                  {exam.name}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </nav>

                      <div className="mt-6 space-y-3">
                        <Link
                          to="/login"
                          className="block w-full text-center px-4 py-3 rounded-lg border border-white text-white hover:bg-white/10 transition-colors"
                        >
                          Log In
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full text-center px-4 py-2 bg-white hover:bg-white/90 text-indigo-600 rounded-lg transition-colors"
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
