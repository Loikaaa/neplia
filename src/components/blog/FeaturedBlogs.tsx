
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedBlogs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredPosts = getFeaturedPosts(4);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuredPosts.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredPosts.length]);
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-indigo-100/80 dark:bg-indigo-900/20 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-3">
            <Sparkles className="h-4 w-4 mr-1.5" />
            <span>Hot off the press</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Latest Articles & Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover expert strategies, proven techniques, and essential resources for your exam preparation journey.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div 
            className="md:col-span-7 lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {featuredPosts.length > 0 && (
              <div className="relative group h-full overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-purple-600/10 opacity-50 transition-opacity group-hover:opacity-100"></div>
                
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={featuredPosts[0].coverImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                      alt={featuredPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                        {featuredPosts[0].category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{new Date(featuredPosts[0].publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>{featuredPosts[0].readingTime}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <Link to={`/blog/${featuredPosts[0].slug}`}>
                          {featuredPosts[0].title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {featuredPosts[0].excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src={featuredPosts[0].author.avatar} 
                        alt={featuredPosts[0].author.name}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{featuredPosts[0].author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{featuredPosts[0].author.title}</p>
                      </div>
                    </div>
                    
                    <Button asChild variant="link" size="sm" className="mt-4 pl-0 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                      <Link to={`/blog/${featuredPosts[0].slug}`} className="flex items-center">
                        Read More 
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            {featuredPosts.slice(1, 4).map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard 
                  post={post}
                  variant="compact"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-950 px-8 relative">
              <Button asChild size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                <Link to="/blog" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Browse All Articles
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
