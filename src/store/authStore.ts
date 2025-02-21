import { create } from 'zustand';
import { LoginResponse } from '../types/apiTypes';
import { createJSONStorage, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

type User = Omit<LoginResponse, 'token'>;

interface AuthStoreI {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreI>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null });
        Cookies.remove('token');
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
