
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { blogPosts, getRelatedPosts } from '@/data/blogData';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.slug === slug));
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      const currentPost = blogPosts.find(p => p.slug === slug);
      setPost(currentPost);
      
      if (currentPost) {
        setRelatedPosts(getRelatedPosts(currentPost.id, 2));
      }
    }
  }, [slug]);
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-indigo hover:text-indigo-600 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="inline-block bg-indigo text-white text-sm font-medium px-3 py-1 rounded mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.title}</div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden mb-10 shadow-md">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <div className="border-t border-b py-6 mb-12 bg-gray-50 dark:bg-gray-800/30 px-6 rounded-lg">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-5 h-5 mr-2 text-muted-foreground" />
              {post.tags.map(tag => (
                <Link key={tag} to={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-indigo pl-4">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/30 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Discover More Content</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Explore our full collection of expert guides and resources.</p>
            <Button asChild size="lg">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
