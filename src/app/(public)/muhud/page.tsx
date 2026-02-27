import React, { Suspense } from 'react';
import { MuhudList } from '@/presentation/components/public/MuhudList';

export default function MuhudPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex items-center justify-center p-12">
          <div className="animate-spin size-8 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      }
    >
      <MuhudList />
    </Suspense>
  );
}
