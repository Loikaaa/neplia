
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedBlogs = () => {
  const featuredPosts = getFeaturedPosts(3);
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
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
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.div 
              key={post.id} 
              className={index === 0 ? "md:col-span-3 lg:col-span-2" : ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard 
                post={post}
                variant={index === 0 ? "featured" : "default"}
                className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" className="px-8 bg-gradient-to-r from-indigo to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            <Link to="/blog" className="flex items-center gap-2">
              Browse All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
