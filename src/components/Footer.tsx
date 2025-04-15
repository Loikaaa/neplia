
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Info, Globe, BookOpen, Link as LinkIcon, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50/50 via-white/30 to-gray-100/50 dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-950 border-t border-gray-200/80 dark:border-gray-800/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Grid container with responsive design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-12">
          {/* Exams Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 group">
              <BookOpen className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <span className="border-b-2 border-transparent group-hover:border-indigo-500 transition-all">Exams</span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/practice/ielts', text: 'IELTS' },
                { path: '/practice/toefl', text: 'TOEFL' },
                { path: '/practice/pte', text: 'PTE Academic' },
                { path: '/practice/gre', text: 'GRE' },
                { path: '/practice/gmat', text: 'GMAT' }
              ].map((exam) => (
                <li key={exam.path}>
                  <Link 
                    to={exam.path}
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                    {exam.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 group">
              <LinkIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <span className="border-b-2 border-transparent group-hover:border-indigo-500 transition-all">Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/practice', text: 'Practice Tests', icon: BookOpen },
                { path: '/about', text: 'About Us', icon: Info },
                { path: '/contact', text: 'Contact', icon: Mail },
                { path: '/abroad', text: 'Study Abroad', icon: Globe }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 group">
              <FileText className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <span className="border-b-2 border-transparent group-hover:border-indigo-500 transition-all">Conditions</span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/terms', text: 'Terms of Service' },
                { path: '/privacy', text: 'Privacy Policy' },
                { path: '/cookies', text: 'Cookie Policy' }
              ].map((policy) => (
                <li key={policy.path}>
                  <Link 
                    to={policy.path}
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                    {policy.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 group">
              <Mail className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              <span className="border-b-2 border-transparent group-hover:border-indigo-500 transition-all">Contact Us</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@neplia.com" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                  <Mail className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
                  support@neplia.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                  <Phone className="h-4 w-4 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 mt-4">
                  {[
                    { icon: Facebook, href: 'https://facebook.com/neplia', label: 'Facebook' },
                    { icon: Twitter, href: 'https://twitter.com/neplia', label: 'Twitter' },
                    { icon: Instagram, href: 'https://instagram.com/neplia', label: 'Instagram' },
                    { icon: Youtube, href: 'https://youtube.com/neplia', label: 'YouTube' }
                  ].map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand section */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 dark:border-gray-800/80">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link 
              to="/" 
              className="inline-block group"
            >
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
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
