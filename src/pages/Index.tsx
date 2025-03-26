
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import PracticeSection from '@/components/PracticeSection';
import StatisticsSection from '@/components/StatisticsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import FeaturedBlogs from '@/components/blog/FeaturedBlogs';

const Index = () => {
  return (
    <Layout>
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
