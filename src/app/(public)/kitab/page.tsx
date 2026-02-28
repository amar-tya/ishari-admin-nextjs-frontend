import { KitabList } from '@/presentation/components/public';
import { Suspense } from 'react';

export default function KitabPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <div className="animate-spin size-10 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      }
    >
      <KitabList />
    </Suspense>
  );
}
