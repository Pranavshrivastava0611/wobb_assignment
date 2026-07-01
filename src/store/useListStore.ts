import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfileSummary } from '../types';

export interface ListProfile extends UserProfileSummary {
  // Adding platform to the list profile as it might be useful
  platform?: 'instagram' | 'youtube' | 'tiktok';
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
            return state;
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
      name: 'influencer-list-storage', // unique name for localStorage key
    }
  )
);
