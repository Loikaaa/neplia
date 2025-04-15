
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { ContentManagementProvider } from '@/contexts/ContentManagementContext';
import ContentEditControls from '@/components/admin/ContentEditControls';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const isAdmin = true; // In a real app, this would be determined by authentication/role
  
  return (
    <ContentManagementProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20">
        <Navbar />
        <main className={`flex-grow ${isMobile ? 'pt-16 px-3' : 'pt-20'}`}>
          {children}
        </main>
        <Footer />
        
        {isAdmin && <ContentEditControls />}
      </div>
    </ContentManagementProvider>
  );
};

export default Layout;
