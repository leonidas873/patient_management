interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  // eslint-disable-next-line no-unused-vars
  setDarkMode: (value: boolean) => void;
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value: boolean) => set({ darkMode: value })
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
