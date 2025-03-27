
import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { ListeningTest } from '@/components/practice/listening/ListeningTest';
import { ListeningInstructions } from '@/components/practice/listening/ListeningInstructions';
import ListeningHeader from '@/components/practice/listening/ListeningHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, FileAudio, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ListeningPractice = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("practice");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.includes('audio')) {
        setSelectedFile(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready for use`,
        });
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <ListeningHeader />
        
        <Tabs defaultValue="practice" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practice">
              <div className="flex items-center space-x-2">
                <Headphones className="h-4 w-4" />
                <span>Practice Test</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="upload">
              <div className="flex items-center space-x-2">
                <FileAudio className="h-4 w-4" />
                <span>Upload Audio</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="practice">
            {!testStarted ? (
              <ListeningInstructions onStart={() => setTestStarted(true)} />
            ) : (
              <ListeningTest />
            )}
          </TabsContent>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Own Audio</CardTitle>
                <CardDescription>
                  Practice with your own IELTS listening materials. Upload an audio file to start practicing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <FileAudio className="h-12 w-12 text-gray-400" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Upload Audio File</h3>
                      <p className="text-sm text-gray-500">
                        Supported formats: MP3, WAV, M4A (Max size: 20MB)
                      </p>
                    </div>
                    <Button 
                      onClick={triggerFileInput} 
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Select File</span>
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="hidden"
                    />
                  </div>
                </div>
                
                {selectedFile && (
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileAudio className="h-5 w-5 text-indigo-500" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => setTestStarted(true)}>
                        Practice with this audio
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ListeningPractice;
