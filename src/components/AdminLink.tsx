
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link to="/admin/writing-tasks">
        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
          <Shield className="h-4 w-4" />
          <span>Admin Dashboard</span>
        </Button>
      </Link>
    </div>
  );
};

export default AdminLink;
