import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Platform, UserProfileSummary } from '@/types';

export interface ListProfile extends UserProfileSummary {
  platform?: Platform;
}

interface ListState {
  profiles: ListProfile[];
  addProfile: (profile: ListProfile) => void;
  removeProfile: (userId: string) => void;
  isInList: (userId: string) => boolean;
  clearList: () => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (profile) =>
        set((state) => {
          if (state.profiles.some((p) => p.user_id === profile.user_id)) {
            return state; // Deduplication guard — returns same reference to skip re-render
          }
          return { profiles: [...state.profiles, profile] };
        }),
      removeProfile: (userId) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== userId),
        })),
      isInList: (userId) => get().profiles.some((p) => p.user_id === userId),
      clearList: () => set({ profiles: [] }),
    }),
    {
      name: 'influencer-list-storage',
    }
  )
);
