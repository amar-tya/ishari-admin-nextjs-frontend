import { create } from 'zustand';

export interface AudioTrack {
  verseId: number;
  verseNumber: number;
  chapterTitle: string;
  hadiName: string;
  audioType: string;
  mediaUrl: string;
}

interface AudioPlayerState {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  setTrack: (track: AudioTrack) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  currentTime: 0,
  volume: 1,

  setTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true, // Auto-play when a new track is set
      progress: 0,
      currentTime: 0,
    }),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setProgress: (progress) => set({ progress }),

  setDuration: (duration) => set({ duration }),

  setCurrentTime: (currentTime) =>
    set((state) => ({
      currentTime,
      progress: state.duration > 0 ? (currentTime / state.duration) * 100 : 0,
    })),

  setVolume: (volume) => set({ volume }),

  reset: () =>
    set({
      currentTrack: null,
      isPlaying: false,
      progress: 0,
      duration: 0,
      currentTime: 0,
    }),
}));
