
import React from 'react';
import Layout from '@/components/Layout';
import ResourcesHero from '@/components/resources/ResourcesHero';
import ResourceCategories from '@/components/resources/ResourceCategories';
import PopularResources from '@/components/resources/PopularResources';
import ResourcesSearch from '@/components/resources/ResourcesSearch';
import ResourcesFAQ from '@/components/resources/ResourcesFAQ';

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ResourcesHero />
        <ResourcesSearch />
        <ResourceCategories />
        <PopularResources />
        <ResourcesFAQ />
      </div>
    </Layout>
  );
};

export default Resources;
