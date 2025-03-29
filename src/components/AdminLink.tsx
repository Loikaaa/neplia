
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLink = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  useEffect(() => {
    // Check if the current URL is neplia.com/official
    const checkUrl = () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('neplia.com/official')) {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };
    
    // Check initially
    checkUrl();
    
    // Listen for URL changes (for SPA navigation)
    window.addEventListener('popstate', checkUrl);
    
    return () => {
      window.removeEventListener('popstate', checkUrl);
    };
  }, []);
  
  // Don't render anything if we're not on the special URL
  if (!showAdmin) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link to="/admin">
        <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
          <Shield className="h-4 w-4" />
          <span>Admin Dashboard</span>
        </Button>
      </Link>
    </div>
  );
};

export default AdminLink;
