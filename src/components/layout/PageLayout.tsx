
import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}

export function PageLayout({ 
  children, 
  className = "", 
  hideFooter = false 
}: PageLayoutProps) {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="noise-bg" aria-hidden="true" />
      <main className={`flex-grow pt-20 ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
