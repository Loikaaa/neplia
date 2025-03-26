
import React from 'react';
import { Link } from 'react-router-dom';
import { getRecentPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight } from 'lucide-react';

const FeaturedBlogs = () => {
  const recentPosts = getRecentPosts(3);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Articles & Resources</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our most recent articles with expert tips, strategies, and guidance for your exam preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {recentPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild>
            <Link to="/blog" className="gap-2">
              Browse All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
