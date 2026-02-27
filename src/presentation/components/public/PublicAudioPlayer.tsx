'use client';

import React from 'react';
import {
  SkipBackIcon,
  PauseIcon,
  SkipForwardIcon,
  VolumeUpIcon,
} from '@/presentation/components/base/icons';

export function PublicAudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="max-w-[800px] mx-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 flex items-center gap-4 pointer-events-auto ring-1 ring-slate-900/5">
        <div
          className="shrink-0 size-12 bg-slate-100 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf5zQgciwxroV4flH2bcJNaZwrisKXlyuholbnAjxsTNSvTZNX-v23Qetcb0QB4vz7p20--kgU_fqlAFlr0t-sCJ2gZFf8Tf_Yo5QbUJ775UIKyOa2IXaiBoycFsJpdkSpqfgZxI1rWoxxr2hEAOaG1rlUGKIyYLP2fl6Vg0IfjPsGaq_5A5wUCq8RgyjBlszQWh-bvljAv0DAUrE59tA-zV9uCQCjsdz34Bx99onlrf1aFY53b5Dqxt3hBP04P5uLWcWNKRfJNfE')",
          }}
        ></div>
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-900 font-bold text-sm truncate">
            Al-Mulk: Verse 1
          </h4>
          <p className="text-slate-500 text-xs truncate">
            Mishary Rashid Alafasy •{' '}
            <span className="text-[#51c878] font-medium">Calm Recitation</span>
          </p>
          <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#51c878] w-[35%] rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <SkipBackIcon size={24} />
          </button>
          <button className="size-12 flex items-center justify-center bg-[#51c878] text-white rounded-full shadow-lg shadow-[#51c878]/40 hover:scale-105 transition-transform active:scale-95">
            <PauseIcon size={24} />
          </button>
          <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <SkipForwardIcon size={24} />
          </button>
        </div>
        <button className="hidden sm:flex size-10 items-center justify-center text-slate-400 hover:text-[#51c878] hover:bg-slate-100 rounded-xl transition-colors ml-2">
          <VolumeUpIcon size={24} />
        </button>
      </div>
    </div>
  );
}
