'use client';

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check for mobile screen on mount and auto-collapse
  useIsomorphicLayoutEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      const savedState = localStorage.getItem('sidebar-collapsed');
      
      if (isMobile) {
        setIsCollapsed(true);
      } else if (savedState) {
        setIsCollapsed(savedState === 'true');
      }
    };

    // Initial check
    checkScreenSize();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
    localStorage.setItem('sidebar-collapsed', 'false');
  };

  const collapseSidebar = () => {
    setIsCollapsed(true);
    localStorage.setItem('sidebar-collapsed', 'true');
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, expandSidebar, collapseSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
