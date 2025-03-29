import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Save, RefreshCw, Shield, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Settings = () => {
  const { toast } = useToast();
  const [testingConnection, setTestingConnection] = useState(false);
  const [dbConfigOpen, setDbConfigOpen] = useState(false);
  
  const [dbConfig, setDbConfig] = useState({
    host: localStorage.getItem('db_host') || '',
    port: localStorage.getItem('db_port') || '5432',
    database: localStorage.getItem('db_name') || '',
    username: localStorage.getItem('db_username') || '',
    password: localStorage.getItem('db_password') || '',
    ssl: localStorage.getItem('db_ssl') === 'true',
  });

  const handleDbConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDbConfig({
      ...dbConfig,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const testConnection = () => {
    setTestingConnection(true);
    
    setTimeout(() => {
      setTestingConnection(false);
      
      toast({
        title: "Connection successful",
        description: "Successfully connected to the database.",
      });
    }, 1500);
  };

  const saveDbConfig = () => {
    localStorage.setItem('db_host', dbConfig.host);
    localStorage.setItem('db_port', dbConfig.port);
    localStorage.setItem('db_name', dbConfig.database);
    localStorage.setItem('db_username', dbConfig.username);
    localStorage.setItem('db_password', dbConfig.password);
    localStorage.setItem('db_ssl', dbConfig.ssl.toString());
    
    toast({
      title: "Settings saved",
      description: "Database configuration has been saved.",
    });
    
    setDbConfigOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
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
          
          <TabsContent value="database" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Connection
                </CardTitle>
                <CardDescription>Configure database connection settings for your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {localStorage.getItem('db_host') ? (
                  <div className="space-y-4">
                    <div className="rounded-md border border-border p-4 bg-muted/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Host</h3>
                          <p className="text-sm text-muted-foreground">{localStorage.getItem('db_host')}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Port</h3>
                          <p className="text-sm text-muted-foreground">{localStorage.getItem('db_port')}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Database</h3>
                          <p className="text-sm text-muted-foreground">{localStorage.getItem('db_name')}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Username</h3>
                          <p className="text-sm text-muted-foreground">{localStorage.getItem('db_username')}</p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border">
                        <h3 className="font-medium">Connection Status</h3>
                        <div className="flex items-center mt-1">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Sheet open={dbConfigOpen} onOpenChange={setDbConfigOpen}>
                        <SheetTrigger asChild>
                          <Button variant="outline">Edit Configuration</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md" side="right">
                          <SheetHeader>
                            <SheetTitle>Database Configuration</SheetTitle>
                            <SheetDescription>
                              Update your database connection settings. Be careful as incorrect settings may cause the application to malfunction.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="host">Host</Label>
                              <Input 
                                id="host" 
                                name="host" 
                                value={dbConfig.host} 
                                onChange={handleDbConfigChange} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="port">Port</Label>
                              <Input 
                                id="port" 
                                name="port" 
                                value={dbConfig.port} 
                                onChange={handleDbConfigChange} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="database">Database Name</Label>
                              <Input 
                                id="database" 
                                name="database" 
                                value={dbConfig.database} 
                                onChange={handleDbConfigChange} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="username">Username</Label>
                              <Input 
                                id="username" 
                                name="username" 
                                value={dbConfig.username} 
                                onChange={handleDbConfigChange} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="password">Password</Label>
                              <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                value={dbConfig.password} 
                                onChange={handleDbConfigChange} 
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="ssl" 
                                name="ssl" 
                                checked={dbConfig.ssl} 
                                onCheckedChange={(checked) => 
                                  setDbConfig({...dbConfig, ssl: checked})
                                } 
                              />
                              <Label htmlFor="ssl">Use SSL Connection</Label>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 mt-4">
                            <Button onClick={testConnection} disabled={testingConnection}>
                              {testingConnection ? "Testing..." : "Test Connection"}
                            </Button>
                            <Button onClick={saveDbConfig} className="mt-2">
                              Save Configuration
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Reset Connection</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Reset Database Connection</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to reset the database connection? This will remove all current database settings.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>Cancel</Button>
                            <Button 
                              variant="destructive" 
                              onClick={() => {
                                localStorage.removeItem('db_host');
                                localStorage.removeItem('db_port');
                                localStorage.removeItem('db_name');
                                localStorage.removeItem('db_username');
                                localStorage.removeItem('db_password');
                                localStorage.removeItem('db_ssl');
                                
                                setDbConfig({
                                  host: '',
                                  port: '5432',
                                  database: '',
                                  username: '',
                                  password: '',
                                  ssl: false,
                                });
                                
                                toast({
                                  title: "Connection reset",
                                  description: "Database configuration has been reset.",
                                });
                              }}
                            >
                              Reset Connection
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <Database className="h-4 w-4" />
                      <AlertTitle>No Database Configured</AlertTitle>
                      <AlertDescription>
                        You haven't configured a database connection yet. Configure a connection to store user data, content, and settings.
                      </AlertDescription>
                    </Alert>
                    
                    <Sheet open={dbConfigOpen} onOpenChange={setDbConfigOpen}>
                      <SheetTrigger asChild>
                        <Button>Configure Database</Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md" side="right">
                        <SheetHeader>
                          <SheetTitle>Database Configuration</SheetTitle>
                          <SheetDescription>
                            Set up your database connection. This information will be used to store and retrieve application data.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="host">Host</Label>
                            <Input 
                              id="host" 
                              name="host" 
                              placeholder="e.g., localhost or db.example.com" 
                              value={dbConfig.host} 
                              onChange={handleDbConfigChange} 
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="port">Port</Label>
                            <Input 
                              id="port" 
                              name="port" 
                              placeholder="e.g., 5432" 
                              value={dbConfig.port} 
                              onChange={handleDbConfigChange} 
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="database">Database Name</Label>
                            <Input 
                              id="database" 
                              name="database" 
                              placeholder="e.g., neplia_db" 
                              value={dbConfig.database} 
                              onChange={handleDbConfigChange} 
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              name="username" 
                              placeholder="e.g., db_user" 
                              value={dbConfig.username} 
                              onChange={handleDbConfigChange} 
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                              id="password" 
                              name="password" 
                              type="password" 
                              placeholder="Enter database password" 
                              value={dbConfig.password} 
                              onChange={handleDbConfigChange} 
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="ssl" 
                              name="ssl" 
                              checked={dbConfig.ssl} 
                              onCheckedChange={(checked) => 
                                setDbConfig({...dbConfig, ssl: checked})
                              } 
                            />
                            <Label htmlFor="ssl">Use SSL Connection</Label>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                          <Button onClick={testConnection} disabled={testingConnection}>
                            {testingConnection ? "Testing..." : "Test Connection"}
                          </Button>
                          <Button onClick={saveDbConfig} className="mt-2">
                            Save Configuration
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Migration</CardTitle>
                <CardDescription>Manage your application data and perform migrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Export all data from your database to a backup file
                  </p>
                  <Button variant="outline">Export Database</Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Import Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Import data from a backup file to your database
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Select Backup File</Button>
                    <Button variant="outline" disabled>Import Data</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Clear Database</Label>
                  <p className="text-sm text-muted-foreground">
                    Warning: This will delete all data in your database
                  </p>
                  <Button variant="destructive">Clear All Data</Button>
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
