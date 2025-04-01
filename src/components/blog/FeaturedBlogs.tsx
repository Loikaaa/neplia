
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight, BookOpen } from 'lucide-react';

const FeaturedBlogs = () => {
  const featuredPosts = getFeaturedPosts(3);
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo/10 dark:bg-indigo/20 px-4 py-2 rounded-full text-indigo font-medium text-sm mb-3 flex items-center justify-center mx-auto">
            <BookOpen className="h-4 w-4 mr-1.5" />
            Latest Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo to-purple-500 bg-clip-text text-transparent">
            Latest Articles & Resources
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our most recent articles with expert tips, strategies, and guidance for your exam preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in">
          {featuredPosts.map((post, index) => (
            <BlogCard 
              key={post.id}
              post={post}
              variant={index === 0 ? "featured" : "default"}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="px-8 bg-gradient-to-r from-indigo to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            <Link to="/blog" className="flex items-center gap-2">
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
