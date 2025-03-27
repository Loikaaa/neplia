
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Save, RefreshCw, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Update your site details and meta information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="Neplia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input id="site-url" defaultValue="https://neplia.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="The ultimate IELTS preparation platform. Practice all test modules, get AI-powered feedback, and achieve your target score."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@neplia.com" />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the look and feel of your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode as default</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer border-2 border-gray-200"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-orange-500 cursor-pointer"></div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Theme
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Logo & Favicon</CardTitle>
                <CardDescription>Upload your site logo and favicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-lg font-bold">N</span>
                    </div>
                    <Button variant="outline">Upload New</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold">N</span>
                    </div>
                    <Button variant="outline">Upload New</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security options for your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="forced-password-reset">Force Password Reset</Label>
                    <p className="text-sm text-muted-foreground">Require users to reset passwords every 90 days</p>
                  </div>
                  <Switch id="forced-password-reset" />
                </div>
                <Button className="gap-2" variant="destructive">
                  <RefreshCw className="h-4 w-4" />
                  Reset All User Passwords
                </Button>
              </CardContent>
            </Card>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Admin Activity Logs</AlertTitle>
              <AlertDescription>
                All admin activities are being logged for security purposes. You can view the logs in the security dashboard.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Current API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" type="password" value="api_key_12345" readOnly />
                    <Button variant="outline">Show</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-access">Enable API Access</Label>
                    <p className="text-sm text-muted-foreground">Allow external services to access the API</p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>
                <Button className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
