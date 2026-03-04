'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  SkipBackIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
} from '@/presentation/components/base/icons';
import { useAudioPlayerStore } from '@/presentation/stores/useAudioPlayerStore';

export function PublicAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const {
    currentTrack,
    isPlaying,
    progress,
    togglePlay,
    pause,
    setDuration,
    setCurrentTime,
  } = useAudioPlayerStore();

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error('Audio play error', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsAudioReady(true);
    }
  };

  const handleEnded = () => {
    pause();
    setCurrentTime(0);
    // TODO: implement auto-play next verse if needed
  };

  if (!currentTrack) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.mediaUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
      <div className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-4 pointer-events-none transition-transform duration-300 translate-y-0">
        <div className="max-w-[800px] mx-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 flex items-center gap-4 pointer-events-auto ring-1 ring-slate-900/5">
          <div
            className="shrink-0 size-12 bg-slate-100 rounded-xl bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf5zQgciwxroV4flH2bcJNaZwrisKXlyuholbnAjxsTNSvTZNX-v23Qetcb0QB4vz7p20--kgU_fqlAFlr0t-sCJ2gZFf8Tf_Yo5QbUJ775UIKyOa2IXaiBoycFsJpdkSpqfgZxI1rWoxxr2hEAOaG1rlUGKIyYLP2fl6Vg0IfjPsGaq_5A5wUCq8RgyjBlszQWh-bvljAv0DAUrE59tA-zV9uCQCjsdz34Bx99onlrf1aFY53b5Dqxt3hBP04P5uLWcWNKRfJNfE')",
            }}
          ></div>
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-900 font-bold text-sm truncate">
              {currentTrack.chapterTitle}: Verse {currentTrack.verseNumber}
            </h4>
            <p className="text-slate-500 text-xs truncate">
              {currentTrack.hadiName} •{' '}
              <span className="text-[#51c878] font-medium">
                {currentTrack.audioType}
              </span>
            </p>
            <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#51c878] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex">
              <SkipBackIcon size={24} />
            </button>
            <button
              onClick={togglePlay}
              disabled={!isAudioReady}
              className={`size-12 flex items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 ${
                isAudioReady
                  ? 'bg-[#51c878] text-white shadow-[#51c878]/40 hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </button>
            <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex">
              <SkipForwardIcon size={24} />
            </button>
          </div>
          {/* <button className="hidden sm:flex size-10 items-center justify-center text-slate-400 hover:text-[#51c878] hover:bg-slate-100 rounded-xl transition-colors ml-2">
            <VolumeUpIcon size={24} />
          </button> */}
        </div>
      </div>
    </>
  );
}
