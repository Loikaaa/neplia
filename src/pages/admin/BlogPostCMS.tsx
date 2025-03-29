
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Define the Blog Post type
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  categories: string[];
}

const BlogPostCMS = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load blog posts on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('adminBlogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // If no saved posts, use the imported default ones
      setPosts(blogPosts);
      localStorage.setItem('adminBlogPosts', JSON.stringify(blogPosts));
    }
  }, []);

  const handleCreatePost = () => {
    // Create a new post with default values
    const newPost: BlogPost = {
      id: Date.now(),
      title: "New Blog Post",
      content: "Enter your content here...",
      excerpt: "Brief excerpt of the blog post",
      slug: `new-blog-post-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      author: {
        name: "Admin User",
        avatar: "/placeholder.svg"
      },
      coverImage: "/placeholder.svg",
      categories: ["General"]
    };
    
    setCurrentPost(newPost);
    setIsNewPost(true);
    setDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsNewPost(false);
    setDialogOpen(true);
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Post Deleted",
      description: "The blog post has been deleted successfully",
    });
  };

  const handleSavePost = () => {
    if (!currentPost) return;
    
    if (isNewPost) {
      // Add new post to the list
      const updatedPosts = [...posts, currentPost];
      setPosts(updatedPosts);
      localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Post Created",
        description: "Your new blog post has been created successfully",
      });
    } else {
      // Update existing post
      const updatedPosts = posts.map(post => 
        post.id === currentPost.id ? currentPost : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('adminBlogPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Post Updated",
        description: "The blog post has been updated successfully",
      });
    }
    
    setDialogOpen(false);
    setCurrentPost(null);
  };

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    if (!currentPost) return;
    
    if (field === "title") {
      // Also update the slug based on the title
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setCurrentPost({
        ...currentPost,
        [field]: value,
        slug: slug
      });
    } else {
      setCurrentPost({
        ...currentPost,
        [field]: value
      });
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Button className="flex items-center gap-2" onClick={handleCreatePost}>
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search posts..." 
            className="h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>{post.publishedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Published
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Blog Post Editor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNewPost ? "Create New Blog Post" : "Edit Blog Post"}</DialogTitle>
            <DialogDescription>
              {isNewPost 
                ? "Fill in the details to create a new blog post" 
                : "Make changes to the existing blog post"}
            </DialogDescription>
          </DialogHeader>

          {currentPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={currentPost.title} 
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  value={currentPost.excerpt} 
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={currentPost.content} 
                  rows={10}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input 
                    id="publishedAt" 
                    type="date" 
                    value={currentPost.publishedAt} 
                    onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={currentPost.slug} 
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input 
                  id="coverImage" 
                  value={currentPost.coverImage} 
                  onChange={(e) => handleInputChange("coverImage", e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost}>
              Save Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BlogPostCMS;
