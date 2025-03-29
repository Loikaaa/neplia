
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminLink = () => {
  const [showAdmin, setShowAdmin] = useState(true); // Set to true to always display
  
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin">
              <Button variant="default" size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-md rounded-r-none h-12 w-12 shadow-lg border-r border-indigo-700">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Admin Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin/settings">
              <Button variant="default" size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-l-md rounded-r-none h-12 w-12 shadow-lg border-r border-indigo-700">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
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
