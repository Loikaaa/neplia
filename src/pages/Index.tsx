
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import PracticeSection from '@/components/PracticeSection';
import StatisticsSection from '@/components/StatisticsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import FeaturedBlogs from '@/components/blog/FeaturedBlogs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Check if user has previously selected preferences
  const hasSelectedPreferences = 
    localStorage.getItem('selectedCountry') && 
    localStorage.getItem('selectedExam');
  
  // Show selection page prompt for new users
  useEffect(() => {
    // Only show for first-time visitors who haven't set preferences
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore && !hasSelectedPreferences) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [hasSelectedPreferences]);

  return (
    <Layout>
      {!hasSelectedPreferences && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 py-3">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-center sm:text-left mb-2 sm:mb-0">
                <span className="font-medium">Personalize your experience!</span> Select your country and target exam for customized content.
              </p>
              <Link to="/selection">
                <Button size="sm" variant="default" className="bg-indigo hover:bg-indigo/90">
                  Customize Now <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <HeroSection />
      <FeatureSection />
      <PracticeSection />
      <StatisticsSection />
      <FeaturedBlogs />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
