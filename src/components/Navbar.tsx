
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Practice', path: '/practice', submenu: [
    { name: 'Listening', path: '/practice/listening' },
    { name: 'Reading', path: '/practice/reading' },
    { name: 'Writing', path: '/practice/writing' },
    { name: 'Speaking', path: '/practice/speaking' },
  ]},
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-xl md:text-2xl font-bold text-indigo">
              Neplia<span className="text-coral">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.submenu ? (
                  <button 
                    onClick={() => toggleSubmenu(link.name)}
                    className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    {link.name}
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-200",
                      openSubmenu === link.name ? "rotate-180" : ""
                    )} />
                  </button>
                ) : (
                  <Link 
                    to={link.path}
                    className="text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300 font-medium transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Submenu */}
                {link.submenu && (
                  <div className={cn(
                    "absolute top-full left-0 mt-2 w-48 rounded-md overflow-hidden shadow-lg transition-all duration-300 origin-top-right bg-white dark:bg-gray-800 transform",
                    openSubmenu === link.name ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                  )}>
                    <div className="py-2">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo dark:hover:text-indigo-300"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg border border-indigo text-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="btn-primary"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
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
                  <>
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className="flex items-center justify-between w-full text-lg font-medium text-gray-700 dark:text-gray-200"
                    >
                      {link.name}
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        openSubmenu === link.name ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    <div className={cn(
                      "mt-2 space-y-2 pl-4 transition-all duration-200",
                      openSubmenu === link.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}>
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className="block py-2 text-gray-600 dark:text-gray-400 hover:text-indigo dark:hover:text-indigo-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo dark:hover:text-indigo-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

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
              className="block w-full text-center btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
