import React from 'react';
import { PublicNavbar } from '@/presentation/components/public/PublicNavbar';
import { GlobalFooter } from '@/presentation/components/common/GlobalFooter';

export default function PublicLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f6f8f7] font-sans text-[#1e293b] antialiased min-h-screen flex flex-col overflow-x-hidden">
      <PublicNavbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <GlobalFooter />
    </div>
  );
}
