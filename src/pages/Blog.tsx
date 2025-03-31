
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import BlogCard from '@/components/blog/BlogCard';
import { blogPosts, blogCategories, getTags, getFeaturedPosts } from '@/data/blogData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, TrendingUp, Filter, Calendar, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [displayedPosts, setDisplayedPosts] = useState<typeof blogPosts>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  
  const allTags = getTags();
  const featuredPosts = getFeaturedPosts(3);

  useEffect(() => {
    let filtered = [...blogPosts];
    
    // Filter by tab/category
    if (activeTab !== "all") {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === activeTab.toLowerCase()
      );
    }
    
    // Filter by additional category if selected
    if (selectedCategory !== "all" && activeTab === "all") {
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
    
    // Sort the posts
    switch(sortOption) {
      case "newest":
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery, selectedTag, sortOption, activeTab]);

  // Calculate pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setSelectedCategory("all");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than max, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and one on either side of current page if possible
      pageNumbers.push(1);
      
      if (currentPage > 2) {
        if (currentPage > 3) {
          pageNumbers.push('...');
        }
        pageNumbers.push(currentPage - 1);
      }
      
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
        if (currentPage < totalPages - 2) {
          pageNumbers.push('...');
        }
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
    setActiveTab("all");
    setSortOption("newest");
  };

  const topCategories = blogCategories
    .filter(cat => cat.slug !== "all")
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 bg-gradient-to-r from-indigo-50 via-indigo-100 to-purple-50 dark:from-indigo-950/30 dark:via-indigo-900/20 dark:to-purple-950/30 p-10 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mb-4">
                <BookOpen className="h-7 w-7 text-indigo" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo via-purple to-pink-500 bg-clip-text text-transparent">
                Neplia Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Expert guides, tips and resources to help you succeed in your exams and educational journey.
              </p>
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-indigo" />
                Featured Articles
              </h2>
              <Button variant="link" onClick={() => {
                setSelectedCategory("all");
                setSelectedTag(null);
                setSortOption("newest");
              }}>
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant={index === 0 ? "featured" : "default"}
                  className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                />
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo h-5 w-5" />
              <Input
                placeholder="Search for articles, topics or keywords..."
                className="pl-10 border-indigo/20 focus:border-indigo/60 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Newest
                      </div>
                    </SelectItem>
                    <SelectItem value="oldest">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Oldest
                      </div>
                    </SelectItem>
                    <SelectItem value="a-z">
                      <div className="flex items-center">
                        A to Z
                      </div>
                    </SelectItem>
                    <SelectItem value="z-a">
                      <div className="flex items-center">
                        Z to A
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {(selectedTag || selectedCategory !== "all" || searchQuery) && (
                  <Button variant="outline" onClick={clearFilters} className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {selectedTag && (
              <div className="mt-6 flex items-center">
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
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto flex flex-nowrap custom-scrollbar">
              <TabsTrigger value="all" className="flex-shrink-0">
                All Posts
              </TabsTrigger>
              {topCategories.map(category => (
                <TabsTrigger key={category.slug} value={category.slug} className="flex-shrink-0">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Blog Posts Grid */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Found
              </h2>
            </div>

            {displayedPosts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-inner">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={clearFilters} className="mt-4">Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {displayedPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === '...' ? (
                        <span className="px-4 py-2">...</span>
                      ) : (
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page as number);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Popular Tags */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <TagIcon className="h-5 w-5 text-indigo mr-2" />
              <h3 className="text-lg font-semibold text-indigo">Popular Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 20).map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-indigo text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-gray-200 dark:border-gray-700"
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
