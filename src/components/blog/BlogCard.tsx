
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
}

const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block h-full">
        {variant === 'default' && (
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute top-3 left-3">
              <span className="bg-indigo text-white text-xs font-semibold px-2.5 py-1 rounded">
                {post.category}
              </span>
            </div>
          </div>
        )}
        
        <CardHeader className={variant === 'compact' ? 'py-3 px-4' : 'pb-2'}>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
            <span className="mx-1">•</span>
            <Clock className="w-4 h-4" />
            <span>{post.readingTime}</span>
          </div>
          <h3 className={`font-bold line-clamp-2 ${variant === 'compact' ? 'text-base' : 'text-xl'}`}>
            {post.title}
          </h3>
        </CardHeader>
        
        {variant === 'default' && (
          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
            
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-2">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
            </div>
          </CardContent>
        )}
        
        {variant === 'default' && (
          <CardFooter className="flex items-center border-t pt-4 text-sm">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                )}
              </div>
            </div>
          </CardFooter>
        )}
      </Link>
    </Card>
  );
};

export default BlogCard;
