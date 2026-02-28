import { PublicChapterList } from '@/presentation/components/public';
import { Suspense } from 'react';

export default function DibaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <div className="animate-spin size-10 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      }
    >
      <PublicChapterList
        title="Diba"
        category="Diba"
        description="Daftar kitab / chapter kategori Diba"
      />
    </Suspense>
  );
}
