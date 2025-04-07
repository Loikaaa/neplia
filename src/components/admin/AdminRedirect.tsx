
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

// Configure your Laravel backend URL here
const LARAVEL_ADMIN_URL = "http://localhost:8000/admin";

const AdminRedirect: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the path after /admin/ to redirect to the same path on Laravel
    const adminPath = location.pathname.replace(/^\/admin/, '');
    const redirectUrl = `${LARAVEL_ADMIN_URL}${adminPath}`;
    
    // Redirect to Laravel backend
    window.location.href = redirectUrl;
  }, [location]);

  return (
    <div className="container mx-auto py-16">
      <Card>
        <CardContent className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Redirecting to Admin Panel</h2>
          <p className="text-muted-foreground mb-6">
            You are being redirected to the admin panel. If you are not redirected automatically, 
            <a 
              href={`${LARAVEL_ADMIN_URL}${location.pathname.replace(/^\/admin/, '')}`}
              className="text-blue-500 hover:text-blue-700 font-medium ml-1"
            >
              click here
            </a>.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRedirect;
