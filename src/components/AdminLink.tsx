
import React, { useEffect, useState } from 'react';
import { Shield, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminLink = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  useEffect(() => {
    // In a real app, you would check for admin privileges
    // For now, we'll just display the link always
    setShowAdmin(true);
  }, []);
  
  if (!showAdmin) return null;
  
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="/admin">
              <Button variant="default" size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-md rounded-r-none h-12 w-12 shadow-lg border-r border-indigo-700">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Admin Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a href="/admin/settings">
              <Button variant="default" size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-md rounded-r-none h-12 w-12 shadow-lg border-r border-indigo-700">
                <Settings className="h-5 w-5" />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Admin Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AdminLink;
