import { User } from '@/types/user.type';
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  logInUser: (user: User) => set({ user: user }),
  logOutUser: () => set({ user: null })
}));
