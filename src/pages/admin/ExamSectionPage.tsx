import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Search, AlertTriangle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const ExamSectionPage = () => {
  const { examType, sectionType } = useParams<{ examType: string; sectionType: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Convert section and exam types to readable format
  const formatText = (text: string | undefined) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  const sectionTitle = formatText(sectionType);
  const examTitle = formatText(examType)?.toUpperCase();
  
  const getIconForSection = () => {
    switch(sectionType) {
      case 'reading': return '📚';
      case 'writing': return '✏️';
      case 'listening': return '🎧';
      case 'speaking': return '🎤';
      default: return '📝';
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {getIconForSection()} {examTitle} {sectionTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage {examTitle} {sectionTitle} tasks and questions.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New {sectionTitle} Task
          </Button>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder={`Search ${sectionTitle.toLowerCase()} tasks...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            The {examTitle} {sectionTitle} section is under development. Check back soon for updates!
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>No tasks available</CardTitle>
                <CardDescription>
                  Start by adding your first {sectionTitle.toLowerCase()} task for {examTitle}.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add {sectionTitle} Task
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents will be similar */}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ExamSectionPage;
