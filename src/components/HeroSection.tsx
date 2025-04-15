
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-16 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-300 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
            The Ultimate Language Proficiency Platform
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
            Master <span className="highlight-text">Language Exams</span> with Precision and Confidence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Practice for IELTS, TOEFL, PTE, Cambridge, and more with AI-powered feedback, track your progress, and achieve your target scores faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/practice" className="w-full sm:w-auto px-8 py-3 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
              Explore Practice Tests
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Trusted by over <span className="font-semibold text-gray-800 dark:text-gray-200">50,000+</span> students worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
