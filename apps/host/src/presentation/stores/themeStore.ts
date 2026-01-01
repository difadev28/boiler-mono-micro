import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light',
            isDark: false,

            toggleTheme: () => {
                set((state) => {
                    const newTheme = state.theme === 'light' ? 'dark' : 'light';

                    // Update document class for Tailwind dark mode
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }

                    return {
                        theme: newTheme,
                        isDark: newTheme === 'dark',
                    };
                });
            },

            setTheme: (theme: Theme) => {
                // Update document class for Tailwind dark mode
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }

                set({
                    theme,
                    isDark: theme === 'dark',
                });
            },
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                // Apply theme on initial load
                if (state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                }
            },
        }
    )
);
