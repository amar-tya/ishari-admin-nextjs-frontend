'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { SidebarProvider, useSidebar } from './SidebarContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const DashboardContent: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  breadcrumbs,
}) => {
  const { isCollapsed } = useSidebar();
  const marginLeft = isCollapsed ? '80px' : 'clamp(240px, 20vw, 280px)';

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Sidebar />
      <TopBar title={title} breadcrumbs={breadcrumbs} />
      <main
        style={{
          marginLeft,
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  return (
    <SidebarProvider>
      <DashboardContent {...props} />
    </SidebarProvider>
  );
};


export default DashboardLayout;
