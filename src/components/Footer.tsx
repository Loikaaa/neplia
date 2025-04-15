
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Info, Globe, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/80 dark:border-gray-800/80">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className={`grid grid-cols-1 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 md:gap-12`}>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/practice" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/abroad" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Study Abroad
                </Link>
              </li>
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Exams</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/practice/ielts" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  IELTS
                </Link>
              </li>
              <li>
                <Link to="/practice/toefl" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  TOEFL
                </Link>
              </li>
              <li>
                <Link to="/practice/pte" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  PTE Academic
                </Link>
              </li>
              <li>
                <Link to="/practice/gre" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  GRE
                </Link>
              </li>
              <li>
                <Link to="/practice/gmat" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  GMAT
                </Link>
              </li>
            </ul>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Conditions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-300 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Mail className="h-5 w-5 mr-2 text-indigo-500 group-hover:text-indigo-600 transition-colors mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">support@neplia.com</span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-5 w-5 mr-2 text-indigo-500 group-hover:text-indigo-600 transition-colors mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">+1 (555) 123-4567</span>
              </li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="https://facebook.com/neplia" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://twitter.com/neplia" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="https://instagram.com/neplia" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://youtube.com/neplia" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand section moved to bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 dark:border-gray-800/80">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Neplia<span className="text-coral">.</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Your ultimate platform for IELTS preparation. Study smarter, score higher.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Neplia.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
