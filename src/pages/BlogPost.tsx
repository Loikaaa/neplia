import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { blogPosts, getRelatedPosts } from '@/data/blogData';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  User, 
  Share2, 
  Heart, 
  Bookmark, 
  ChevronRight, 
  MessageSquare, 
  Copy, 
  Twitter, 
  Facebook,
  Linkedin,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.slug === slug));
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeCommentTab, setActiveCommentTab] = useState("newest");
  
  // Scroll progress tracking for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      const currentPost = blogPosts.find(p => p.slug === slug);
      setPost(currentPost);
      
      if (currentPost) {
        setRelatedPosts(getRelatedPosts(currentPost.id, 3));
      }
    }
  }, [slug]);

  // Social share handling
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Neplia Blog Post';
    
    switch(platform) {
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => toast.success("Link copied to clipboard!"))
          .catch(() => toast.error("Failed to copy link"));
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
  };
  
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

  // Ensure we have a valid image URL, fallback to a free source image if needed
  const coverImage = post.coverImage && post.coverImage.startsWith('http') 
    ? post.coverImage 
    : `https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`;

  // Ensure author avatar, fallback to a placeholder
  const authorAvatar = post.author.avatar && post.author.avatar.startsWith('http')
    ? post.author.avatar
    : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80`;

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Article added to your favorites!");
    }
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success("Article saved to your reading list!");
    }
  };

  // Custom renderer for markdown elements to apply styling
  const customRenderers = {
    h1: (props: any) => <h1 className="text-3xl font-bold text-indigo-600 mt-8 mb-4 animate-fade-in" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold text-indigo mt-6 mb-3 animate-fade-in" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold text-indigo-500 mt-5 mb-2 animate-fade-in" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2 animate-fade-in" {...props} />,
    p: (props: any) => <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 my-4 space-y-2 animate-fade-in" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 my-4 space-y-2 animate-fade-in" {...props} />,
    li: (props: any) => <li className="text-gray-700 dark:text-gray-300 pl-2" {...props} />,
    a: (props: any) => <a className="text-indigo underline hover:text-indigo-600 transition-colors" {...props} />,
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-indigo pl-4 italic my-6 text-gray-700 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-900/20 py-2 pr-2 rounded-r animate-fade-in" {...props} />
    ),
    code: (props: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6 animate-fade-in" {...props} />
    ),
    img: (props: any) => (
      <div className="my-6 animate-fade-in">
        <img className="rounded-lg shadow-md w-full" alt={props.alt || ""} {...props} />
        {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
      </div>
    ),
  };

  // Comments data - would be integrated with backend in a real implementation
  const comments = [
    {
      id: 1,
      user: {
        name: "Maya Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "This article really helped me prepare for my IELTS exam. The tips for the speaking section were particularly useful!",
      date: "2023-10-25T14:53:00Z",
      likes: 12
    },
    {
      id: 2,
      user: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      text: "I've been struggling with time management during exams. The strategies mentioned here are practical and I'll definitely be implementing them in my next test.",
      date: "2023-10-24T09:32:00Z",
      likes: 8
    },
    {
      id: 3,
      user: {
        name: "Sara Ahmed",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      text: "Great breakdown of the exam structure. As someone preparing for this exam for the first time, I find this extremely helpful.",
      date: "2023-10-22T16:15:00Z",
      likes: 5
    }
  ];

  return (
    <Layout>
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50"
        style={{ marginTop: '64px' }}
      >
        <div 
          className="h-full bg-gradient-to-r from-indigo via-violet-500 to-purple-500"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 animate-fade-in">
            <Link to="/blog" className="text-gray-500 hover:text-indigo-600 transition-colors inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <ChevronRight className="mx-2 text-gray-400 inline-flex items-center" />
            <span className="text-gray-600 dark:text-gray-300">Article</span>
          </div>
          
          {/* Cover Image with Gradient Overlay */}
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl group animate-fade-in">
            <AspectRatio ratio={21 / 9}>
              <img 
                src={coverImage}
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            
            {/* Post Title and Metadata */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{post.title}</h1>
              <div className="flex items-center text-gray-200 space-x-4 text-sm drop-shadow">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center mb-6 animate-fade-in">
            <Avatar className="mr-4">
              <AvatarImage src={authorAvatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">{post.author.name}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">{post.author.title}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2 animate-fade-in">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo border-indigo">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Blog Post Content */}
          <div className="blog-content mb-8">
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
          </div>

          {/* Separator */}
          <Separator className="my-8" />

          {/* Like, Bookmark, Share Section */}
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div className="flex space-x-4">
              <Button variant="ghost" className="gap-2" onClick={toggleLike}>
                <Heart className={cn("h-5 w-5", isLiked ? "text-red-500" : "text-gray-500")} fill={isLiked ? "red" : "none"} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="ghost" className="gap-2" onClick={toggleBookmark}>
                <Bookmark className={cn("h-5 w-5", isBookmarked ? "text-blue-500" : "text-gray-500")} fill={isBookmarked ? "currentColor" : "none"} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Share2 className="h-5 w-5 text-gray-500" />
              <Button variant="ghost" size="icon" onClick={() => handleShare('copy')}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo to-purple bg-clip-text text-transparent">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mb-10 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo to-purple bg-clip-text text-transparent">
                Comments (3)
              </h3>
              <Tabs defaultValue="newest" value={activeCommentTab} onValueChange={setActiveCommentTab}>
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger value="newest" className="data-[state=active]:bg-indigo data-[state=active]:text-white">Newest</TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-indigo data-[state=active]:text-white">Popular</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {comments.map(comment => (
              <div key={comment.id} className="mb-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{comment.user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Heart className="inline-flex w-4 h-4 mr-1 align-text-top" />
                  {comment.likes} Likes
                </div>
              </div>
            ))}

            {/* Comment Form - Placeholder */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-indigo to-purple bg-clip-text text-transparent">Leave a Comment</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your email address will not be published. Required fields are marked *
              </p>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comment *</label>
                <textarea id="comment" rows={4} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" defaultValue={""} />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                <input type="text" id="name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input type="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" />
              </div>
              <Button className="bg-indigo hover:bg-indigo-700 text-white">Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
