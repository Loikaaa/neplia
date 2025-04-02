
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Bell, Settings, Users } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminQuickAccess = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
                <LayoutDashboard size={20} />
              </button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Admin Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin/users">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
                <Users size={20} />
              </button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Manage Users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/admin/settings">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
                <Settings size={20} />
              </button>
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

export default AdminQuickAccess;
