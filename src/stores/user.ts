import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      logInUser: (user: User) => set({ user: user }),
      logOutUser: () => set({ user: null })
    }),
    {
      name: 'user-storage'
    }
  )
);
