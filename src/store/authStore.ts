import { create } from 'zustand';
import { LoginResponse } from '../types/apiTypes';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStoreI {
  user: LoginResponse | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreI>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
