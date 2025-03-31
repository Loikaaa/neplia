
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Save, Plus, FileText, Package, BookOpen } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface ResourceFormData {
  id: string;
  title: string;
  description: string;
  type: string;
  badge: 'Popular' | 'New' | 'Premium' | 'Bestseller';
  file?: File;
}

const ResourceManagement = () => {
  const [resources, setResources] = useState([
    {
      id: 'ielts-writing-guide',
      title: 'IELTS Writing Task 2 Guide',
      description: 'Master the IELTS Writing Task 2 with our comprehensive guide featuring model answers and examiner tips.',
      type: 'Study Guide',
      rating: 4.9,
      downloads: '24.5K',
      badge: 'Popular'
    },
    {
      id: 'toefl-speaking-templates',
      title: 'TOEFL Speaking Templates',
      description: 'Ready-to-use templates for all TOEFL speaking tasks with expert guidance on timing and delivery.',
      type: 'Template Pack',
      rating: 4.8,
      downloads: '18.3K',
      badge: 'New'
    }
  ]);
  
  const [formData, setFormData] = useState<ResourceFormData>({
    id: '',
    title: '',
    description: '',
    type: '',
    badge: 'New',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentResource, setCurrentResource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(2)} KB)`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID from title if not editing
    const resourceId = isEditing ? formData.id : formData.title.toLowerCase().replace(/\s+/g, '-');
    
    const newResource = {
      ...formData,
      id: resourceId,
      rating: 5.0,
      downloads: '0'
    };
    
    if (isEditing) {
      setResources(resources.map(r => r.id === resourceId ? { ...r, ...newResource } : r));
      toast({
        title: "Resource updated",
        description: `${formData.title} has been updated successfully.`
      });
    } else {
      setResources([...resources, newResource]);
      toast({
        title: "Resource created",
        description: `${formData.title} has been added to resources.`
      });
    }
    
    // Reset form
    setFormData({
      id: '',
      title: '',
      description: '',
      type: '',
      badge: 'New',
    });
    setSelectedFile(null);
    setIsEditing(false);
    setCurrentResource(null);
  };

  const handleEdit = (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      setFormData({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        badge: resource.badge as 'Popular' | 'New' | 'Premium' | 'Bestseller',
      });
      setIsEditing(true);
      setCurrentResource(id);
    }
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: "Resource deleted",
      description: "The resource has been removed successfully."
    });
  };

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resourceTypes = ["Study Guide", "Practice Test", "Template Pack", "Flashcards", "Study Cards", "Video Tutorial", "Audio Lesson"];
  
  return (
    <AdminLayout>
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Resource Management</h1>
          <Button onClick={() => {
            setFormData({
              id: '',
              title: '',
              description: '',
              type: '',
              badge: 'New',
            });
            setIsEditing(false);
            setCurrentResource(null);
            setSelectedFile(null);
          }}>
            <Plus className="mr-2 h-4 w-4" /> New Resource
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="upload">Upload Resource</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-6">
              <Input 
                placeholder="Search resources..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge className={resource.badge === 'Premium' 
                        ? 'bg-indigo-500 text-white' 
                        : resource.badge === 'New' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-amber-500 text-white'}>
                        {resource.badge}
                      </Badge>
                    </div>
                    <CardDescription>{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3">Downloads: {resource.downloads}</span>
                      <span>Rating: {resource.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(resource.id)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>{isEditing ? 'Edit Resource' : 'Upload New Resource'}</CardTitle>
                  <CardDescription>
                    Fill in the details to {isEditing ? 'update the' : 'add a new'} resource
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="Resource title" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {resourceTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Detailed description of the resource" 
                      rows={4} 
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="badge">Badge</Label>
                      <Select 
                        value={formData.badge} 
                        onValueChange={(value: 'Popular' | 'New' | 'Premium' | 'Bestseller') => handleSelectChange('badge', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select badge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Popular">Popular</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Bestseller">Bestseller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Resource File</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="file" 
                          type="file" 
                          onChange={handleFileChange} 
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={() => setSelectedFile(null)}>
                          Clear
                        </Button>
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-gray-500">
                          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => {
                    setFormData({
                      id: '',
                      title: '',
                      description: '',
                      type: '',
                      badge: 'New',
                    });
                    setIsEditing(false);
                    setCurrentResource(null);
                    setSelectedFile(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Upload className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Update Resource' : 'Upload Resource'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['IELTS', 'TOEFL', 'PTE', 'GRE', 'GMAT', 'SAT'].map((category) => (
                <Card key={category} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>Resources for {category} exam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                        {category === 'IELTS' || category === 'TOEFL' || category === 'PTE' ? (
                          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                      <span className="font-medium">{Math.floor(Math.random() * 20) + 5} resources</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Manage Resources
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="hover:shadow-md transition-shadow border-dashed border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Add New Category</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-6">
                  <Button variant="ghost" className="h-20 w-20 rounded-full">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Resource Analytics</CardTitle>
                <CardDescription>Track downloads and user engagement with your resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">45.8K</div>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4.7</div>
                      <p className="text-sm text-green-600">+0.2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{resources.length}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Most Popular Resources</h3>
                  <div className="space-y-2">
                    {resources.slice(0, 5).map((resource, index) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-500">{index + 1}</span>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-gray-500">{resource.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{resource.downloads} downloads</p>
                          <p className="text-sm text-gray-500">Rating: {resource.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ResourceManagement;
