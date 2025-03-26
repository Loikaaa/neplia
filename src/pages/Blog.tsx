
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import BlogCard from '@/components/blog/BlogCard';
import { blogPosts, blogCategories, getTags } from '@/data/blogData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPosts, setDisplayedPosts] = useState(blogPosts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allTags = getTags();

  useEffect(() => {
    let filtered = [...blogPosts];
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    setDisplayedPosts(filtered);
  }, [selectedCategory, searchQuery, selectedTag]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setSelectedCategory("all");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Categories and filters now positioned at the top */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              key="all"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-indigo text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
            {blogCategories.filter(cat => cat.slug !== "all").map((category) => (
              <button
                key={category.slug}
                onClick={() => {
                  setSelectedCategory(category.slug);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-indigo text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for articles, topics or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedTag && (
            <div className="mb-6 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filtered by tag:</span>
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo border-indigo"
              >
                {selectedTag}
                <button 
                  onClick={() => setSelectedTag(null)}
                  className="ml-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 p-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </Badge>
            </div>
          )}

          {/* Blog title and description moved below filters */}
          <div className="text-center mb-12 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/30 p-8 rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mb-4">
              <BookOpen className="h-7 w-7 text-indigo" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Neplia Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Expert guides, tips and resources to help you succeed in your exams and educational journey.
            </p>
          </div>

          {displayedPosts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-indigo text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
