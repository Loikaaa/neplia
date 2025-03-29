
import React from 'react';
import { Book } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ResourcesHero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 sticky top-16 md:top-20 z-10 bg-background pt-4 pb-2">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4 font-heading`}>
            <span className="highlight-text">Learning Resources</span>
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-700 dark:text-gray-300 mb-6`}>
            Access our comprehensive collection of study materials, practice tests, 
            and learning guides to enhance your preparation and boost your scores.
          </p>
          <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-4'}`}>
            <button className={`btn-primary flex items-center gap-2 ${isMobile ? 'px-4 py-2 text-sm' : ''}`}>
              <Book size={isMobile ? 16 : 20} />
              Browse All Resources
            </button>
            <button className={`border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium rounded-lg transition-all ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}>
              Recommended For You
            </button>
          </div>
        </div>
        
        {!isMobile && (
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur-md opacity-75"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1456513080867-f24142c9fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80" 
                  alt="Learning Resources" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        )}
        
        {isMobile && (
          <div className="w-full flex justify-center">
            <div className="relative w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur-md opacity-75"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1456513080867-f24142c9fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80" 
                  alt="Learning Resources" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesHero;
