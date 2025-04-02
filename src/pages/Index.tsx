
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
import TestimonialSection from '@/components/TestimonialSection';
import StatisticsSection from '@/components/StatisticsSection';
import PerformanceTracker from '@/components/performance/PerformanceTracker';

const Index = () => {
  useEffect(() => {
    document.title = 'Neplia | Language Learning Platform';
  }, []);

  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      
      <section className="py-16 px-4 md:px-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Track Your Progress</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Monitor your performance across all test sections and see your improvement over time.
          </p>
          <div className="max-w-4xl mx-auto">
            <PerformanceTracker />
          </div>
        </div>
      </section>
      
      <StatisticsSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
