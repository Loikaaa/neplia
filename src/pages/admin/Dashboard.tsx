
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users,
  Settings as SettingsIcon,
  Headphones,
  Mic,
  FileBox,
  Sparkles,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const examTypes = [
    { id: 'ielts', name: 'IELTS', count: 42 },
    { id: 'toefl', name: 'TOEFL', count: 36 },
    { id: 'pte', name: 'PTE', count: 24 },
    { id: 'sat', name: 'SAT', count: 18 },
    { id: 'gre', name: 'GRE', count: 15 },
    { id: 'gmat', name: 'GMAT', count: 12 },
  ];

  const stats = [
    { 
      title: 'Writing Tasks', 
      value: '24', 
      description: 'Total writing tasks',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      link: '/admin/exams/ielts/writing'
    },
    { 
      title: 'Reading Tasks', 
      value: '18', 
      description: 'Total reading tasks',
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      link: '/admin/exams/ielts/reading'
    },
    { 
      title: 'Listening Tasks', 
      value: '15', 
      description: 'Total listening tasks',
      icon: <Headphones className="h-8 w-8 text-purple-500" />,
      link: '/admin/exams/ielts/listening'
    },
    { 
      title: 'Speaking Tasks', 
      value: '12', 
      description: 'Total speaking tasks',
      icon: <Mic className="h-8 w-8 text-red-500" />,
      link: '/admin/exams/ielts/speaking'
    },
    { 
      title: 'Blog Posts', 
      value: '12', 
      description: 'Published blog posts',
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      link: '/admin/blog-posts'
    },
    { 
      title: 'Users', 
      value: '543', 
      description: 'Registered users',
      icon: <Users className="h-8 w-8 text-orange-500" />,
      link: '/admin/users'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Neplia admin dashboard. Manage your exams, content, users, and settings from here.
        </p>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exams">Exam Types</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <Link to={stat.link} key={index}>
                  <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">New IELTS writing task created</p>
                      <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <p className="text-sm">TOEFL reading section updated</p>
                      <span className="ml-auto text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                      <p className="text-sm">Blog post published</p>
                      <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                      <p className="text-sm">New user registered</p>
                      <span className="ml-auto text-xs text-muted-foreground">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/admin/exams/ielts/writing">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Writing Task
                    </Button>
                  </Link>
                  <Link to="/admin/exams/ielts/reading">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Create Reading Task
                    </Button>
                  </Link>
                  <Link to="/admin/blog-posts">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Create Blog Post
                    </Button>
                  </Link>
                  <Link to="/admin/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Update Site Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {examTypes.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <CardTitle>{exam.name}</CardTitle>
                    <CardDescription>Manage {exam.name} exam content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{exam.count}</div>
                    <p className="text-sm text-muted-foreground mb-4">Total tasks and questions</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link to={`/admin/exams/${exam.id}/reading`}>
                        <Button variant="outline" size="sm" className="w-full">Reading</Button>
                      </Link>
                      <Link to={`/admin/exams/${exam.id}/writing`}>
                        <Button variant="outline" size="sm" className="w-full">Writing</Button>
                      </Link>
                      <Link to={`/admin/exams/${exam.id}/listening`}>
                        <Button variant="outline" size="sm" className="w-full">Listening</Button>
                      </Link>
                      <Link to={`/admin/exams/${exam.id}/speaking`}>
                        <Button variant="outline" size="sm" className="w-full">Speaking</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/20 border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Add New Exam Type
                  </CardTitle>
                  <CardDescription>Expand your exam offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Add support for additional standardized tests</p>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Exam Type
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">12</div>
                  <p className="text-sm text-muted-foreground mb-4">Published articles</p>
                  <Link to="/admin/blog-posts">
                    <Button className="w-full">Manage Blog Posts</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Manage learning resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">35</div>
                  <p className="text-sm text-muted-foreground mb-4">Available resources</p>
                  <Button className="w-full">Manage Resources</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>Manage images and audio files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">124</div>
                  <p className="text-sm text-muted-foreground mb-4">Media files</p>
                  <Button className="w-full">Manage Media</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
