
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Headphones, BookOpen, Edit, MessageSquare, BarChart3, Calendar, Crown, Clock, Award, PlusCircle } from 'lucide-react';
import UserStats from '@/components/user/UserStats';
import UserCourseProgress from '@/components/user/UserCourseProgress';
import RecentActivity from '@/components/user/RecentActivity';
import UpcomingTests from '@/components/user/UpcomingTests';

const UserDashboard = () => {
  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  const services = [
    {
      icon: Headphones,
      title: "Listening Practice",
      description: "Improve your IELTS listening skills with our curated practice tests",
      color: "bg-indigo text-white",
      link: "/practice/listening"
    },
    {
      icon: BookOpen,
      title: "Reading Tests",
      description: "Enhance your reading comprehension with timed exercises",
      color: "bg-teal text-white",
      link: "/practice/reading"
    },
    {
      icon: Edit,
      title: "Writing Evaluation",
      description: "Get AI-powered feedback on your writing tasks",
      color: "bg-coral text-white",
      link: "/practice/writing"
    },
    {
      icon: MessageSquare,
      title: "Speaking Assessment",
      description: "Practice your speaking skills with our voice analysis tools",
      color: "bg-indigo text-white",
      link: "/practice/speaking"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed performance analytics",
      color: "bg-teal text-white",
      link: "#progress"
    },
    {
      icon: Calendar,
      title: "Mock Tests",
      description: "Take full-length IELTS mock tests under exam conditions",
      color: "bg-coral text-white",
      link: "/practice/mock-test"
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 pt-12 pb-6">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {userName}</h1>
          <p className="text-muted-foreground mb-8">Your personal IELTS preparation dashboard</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <UserStats />
            </div>
            <div>
              <UpcomingTests />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Services & Practice Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <CardHeader>
                    <div className={`rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2 ${service.color} transition-transform group-hover:scale-110`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-indigo dark:text-indigo-300 p-0">
                      Start Practice <PlusCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <UserCourseProgress />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-gray-800/50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <Crown className="mr-2 h-5 w-5 text-indigo" /> Premium Features
              </h3>
              <p className="text-muted-foreground max-w-md">
                Unlock advanced features with our premium plan for even better IELTS preparation
              </p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="btn-primary">View Premium Features</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex items-center">
                    <Crown className="mr-2 h-5 w-5 text-indigo" /> Premium Features
                  </SheetTitle>
                  <SheetDescription>
                    Elevate your IELTS preparation with our premium tools
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <Award className="h-5 w-5 text-indigo mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Expert Evaluation</h4>
                      <p className="text-sm text-muted-foreground">Get your essays evaluated by IELTS certified experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <Clock className="h-5 w-5 text-indigo mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Unlimited Mock Tests</h4>
                      <p className="text-sm text-muted-foreground">Take as many full-length tests as you need</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <MessageSquare className="h-5 w-5 text-indigo mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">1-on-1 Coaching</h4>
                      <p className="text-sm text-muted-foreground">Live video sessions with IELTS tutors</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 btn-primary">Upgrade Now</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
