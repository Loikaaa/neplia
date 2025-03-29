
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-16' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
