
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmailMarketingSettings from '@/components/admin/EmailMarketingSettings';

const Marketing = () => {
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  
  const handleSave = () => {
    toast({
      title: "Marketing Settings Saved",
      description: "Your marketing settings have been saved successfully",
    });
  };

  const mockCampaigns = [
    { id: "welcome", name: "Welcome Series" },
    { id: "retention", name: "User Retention" },
    { id: "exam-prep", name: "Exam Preparation" },
  ];
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">
            Manage email campaigns, subscribers, and marketing automation.
          </p>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Campaigns</CardTitle>
                    <CardDescription>
                      Manage your marketing campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="default">
                      Create New Campaign
                    </Button>
                    <div className="space-y-2">
                      {mockCampaigns.map(campaign => (
                        <div 
                          key={campaign.id}
                          className={`p-2 rounded cursor-pointer ${selectedCampaign === campaign.id ? 'bg-muted' : 'hover:bg-muted/50'}`}
                          onClick={() => setSelectedCampaign(campaign.id)}
                        >
                          {campaign.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedCampaign 
                        ? mockCampaigns.find(c => c.id === selectedCampaign)?.name 
                        : "Campaign Details"}
                    </CardTitle>
                    <CardDescription>
                      {selectedCampaign 
                        ? "Edit your campaign settings and content" 
                        : "Select a campaign from the list"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedCampaign ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="campaign-name">Campaign Name</Label>
                          <Input 
                            id="campaign-name" 
                            value={mockCampaigns.find(c => c.id === selectedCampaign)?.name || ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="campaign-description">Description</Label>
                          <Textarea 
                            id="campaign-description" 
                            placeholder="Enter a description for this campaign..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schedule-type">Schedule Type</Label>
                          <Select defaultValue="immediate">
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="recurring">Recurring</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="campaign-active">Active</Label>
                            <div className="text-sm text-muted-foreground">
                              Enable or disable this campaign
                            </div>
                          </div>
                          <Switch id="campaign-active" defaultChecked={selectedCampaign === "welcome"} />
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Select a campaign from the list to view and edit details
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between">
                    {selectedCampaign && (
                      <>
                        <Button variant="outline">Preview</Button>
                        <div className="space-x-2">
                          <Button variant="destructive">Delete</Button>
                          <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                      </>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>
                  Manage your subscriber lists and segments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subscriber-search">Search Subscribers</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="subscriber-search" 
                      placeholder="Search by name or email..." 
                      className="flex-1"
                    />
                    <Button>Search</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subscriber Lists</Label>
                  <div className="border rounded-md">
                    <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
                      <div className="font-medium">Main List</div>
                      <div className="text-sm text-muted-foreground">543 subscribers</div>
                    </div>
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="font-medium">IELTS Students</div>
                      <div className="text-sm text-muted-foreground">212 subscribers</div>
                    </div>
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="font-medium">TOEFL Students</div>
                      <div className="text-sm text-muted-foreground">189 subscribers</div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="font-medium">Inactive Users</div>
                      <div className="text-sm text-muted-foreground">87 subscribers</div>
                    </div>
                  </div>
                </div>
                <Button>Create New List</Button>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSave}>Import Subscribers</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Design and manage your email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-dashed flex flex-col items-center justify-center p-6 h-40">
                    <Button variant="ghost">+ New Template</Button>
                  </Card>
                  <Card className="border hover:border-primary/50 cursor-pointer h-40 overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"></div>
                    <div className="p-2">
                      <h3 className="font-medium">Welcome Email</h3>
                      <p className="text-xs text-muted-foreground">Last edited 3 days ago</p>
                    </div>
                  </Card>
                  <Card className="border hover:border-primary/50 cursor-pointer h-40 overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800"></div>
                    <div className="p-2">
                      <h3 className="font-medium">Course Completion</h3>
                      <p className="text-xs text-muted-foreground">Last edited 1 week ago</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSave}>Manage Templates</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <EmailMarketingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Marketing;
