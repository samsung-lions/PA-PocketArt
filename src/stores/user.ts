// import { User } from '@/types/user.type';

import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  logInUser: (user: User) => void;
  logOutUser: () => void;
}

export const useUserStore = create<UserState, [['zustand/persist', UserState]]>(
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
