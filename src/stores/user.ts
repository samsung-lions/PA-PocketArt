import { User } from '@supabase/supabase-js';
import { UserInfo } from 'os';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  userInfo: {
    nickname: string | null;
    profile_img: string | null;
  };
  setUserInfo: (userInfo: { nickname: string | null; profile_img: string | null }) => void;
  logInUser: (user: User) => void;
  logOutUser: () => void;
}

export const useUserStore = create<UserState, [['zustand/persist', UserState]]>(
  persist(
    (set) => ({
      userInfo: {
        nickname: null,
        profile_img: null
      },

      setUserInfo: (userInfo: UserState['userInfo']) => set({ userInfo: userInfo }),
      user: null,
      logInUser: (user: User) => set({ user: user }),
      logOutUser: () => set({ user: null })
    }),
    {
      name: 'user-storage'
    }
  )
);
