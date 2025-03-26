
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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
            <div className="inline-block bg-indigo text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo to-teal">{post.title}</h1>
            
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
            
            <div className="flex items-center space-x-3 p-6 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/30 rounded-xl mb-8 shadow-sm">
              <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-800">
                {post.author.avatar ? (
                  <AvatarImage src={post.author.avatar} alt={post.author.name} className="object-cover" />
                ) : (
                  <AvatarFallback>
                    <User className="h-6 w-6 text-gray-500" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="font-medium text-lg">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.title}</div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden mb-10 shadow-xl">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:text-indigo prose-a:text-indigo">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <div className="border-t border-b py-6 mb-12 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 px-8 rounded-xl shadow-sm">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-5 h-5 mr-2 text-indigo" />
              {post.tags.map(tag => (
                <Link key={tag} to={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer border-indigo/30 text-indigo">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-indigo pl-4 bg-gradient-to-r from-indigo to-teal bg-clip-text text-transparent">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/30 p-10 rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mb-6">
              <Calendar className="h-8 w-8 text-indigo" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo to-teal bg-clip-text text-transparent">Discover More Content</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">Explore our full collection of expert guides and resources to help you succeed in your exams.</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo to-teal hover:from-indigo-600 hover:to-teal-600">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
