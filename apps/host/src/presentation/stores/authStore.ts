import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../core/domain/entities/User';
import { LoginCredentials } from '../../core/domain/repositories/IAuthRepository';
import { registry } from '../../registry';

interface AuthState {
    // State
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            token: null,
            refreshToken: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            // Login action
            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });

                try {
                    // Use the AuthLoginUseCase from registry
                    const response = await registry.authLoginUseCase.execute(credentials);

                    set({
                        user: response.user,
                        token: response.token,
                        refreshToken: response.refreshToken || null,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Login failed';
                    set({
                        error: errorMessage,
                        isLoading: false,
                        isAuthenticated: false,
                    });
                    throw error; // Re-throw for component handling
                }
            },

            // Logout action
            logout: async () => {
                set({ isLoading: true });

                try {
                    await registry.authRepository.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Check if session is still valid
            checkSession: async () => {
                const { token } = get();

                if (!token) {
                    set({ isAuthenticated: false });
                    return;
                }

                try {
                    const isValid = await registry.authRepository.validateSession();

                    if (!isValid) {
                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            isAuthenticated: false,
                        });
                    }
                } catch (error) {
                    console.error('Session validation error:', error);
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        isAuthenticated: false,
                    });
                }
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
