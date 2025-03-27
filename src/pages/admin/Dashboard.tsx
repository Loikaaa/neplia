
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Writing Tasks', 
      value: '24', 
      description: 'Total writing tasks',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      link: '/admin/writing-tasks'
    },
    { 
      title: 'Reading Tasks', 
      value: '18', 
      description: 'Total reading tasks',
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      link: '/admin/reading-tasks'
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
          Welcome to the Neplia admin dashboard. Manage your content, users, and settings from here.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <p className="text-sm">New writing task created</p>
                  <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-sm">Blog post published</p>
                  <span className="ml-auto text-xs text-muted-foreground">Yesterday</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                  <p className="text-sm">New user registered</p>
                  <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
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
              <Link to="/admin/writing-tasks">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Writing Task
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
                  <Settings className="mr-2 h-4 w-4" />
                  Update Site Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
