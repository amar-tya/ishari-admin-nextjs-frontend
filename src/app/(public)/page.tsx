import React, { Suspense } from 'react';
import { PublicDashboard } from '@/presentation/components/public/PublicDashboard';

export default function PublicPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex items-center justify-center p-12">
          <div className="animate-spin size-8 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      }
    >
      <PublicDashboard />
    </Suspense>
  );
}
