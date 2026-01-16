'use client';

import React from 'react';
import { SearchInput, Avatar } from '../base';
import { BellIcon, ChevronRightIcon } from '../base/icons';
import { useSidebar } from './SidebarContext';
import { useUser } from '@/presentation/hooks';

interface TopBarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export const TopBar: React.FC<TopBarProps> = ({
  title = 'Dashboard Overview',
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' },
  ],
}) => {
  const { isCollapsed } = useSidebar();
  const marginLeft = isCollapsed ? '80px' : 'clamp(240px, 20vw, 280px)';
  const user = useUser();

  return (
    <header
      className="
        bg-[var(--color-bg-card)]
        border-b border-[var(--color-border)]
        flex items-center justify-between
        sticky top-0 z-30
        transition-all duration-300 ease-in-out
      "
      style={{ 
        padding: '0.75rem clamp(1rem, 2vw, 1.5rem)',
        marginLeft,
      }}
    >
      {/* Left: Title & Breadcrumbs */}
      <div>
        <h1 className="text-title">{title}</h1>
        <nav className="flex items-center gap-1 mt-0.5">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.href ? (
                <a 
                  href={item.href} 
                  className="text-caption text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-caption text-[var(--color-text-secondary)]">
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-[var(--color-text-muted)]">
                  <ChevronRightIcon size={12} />
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center" style={{ gap: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
        {/* Search */}
        <SearchInput 
          className="hidden md:block" 
          style={{ width: 'clamp(180px, 15vw, 250px)' }}
        />

        {/* Notification Bell */}
        <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
          <BellIcon size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
          <Avatar initials={user?.username?.substring(0, 2).toUpperCase() || 'AU'} size="md" />
          <div className="hidden sm:block">
            <p className="text-body font-medium leading-tight capitalize">{user?.username || 'Admin User'}</p>
            <p className="text-caption">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
