import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/organisms/LoginForm';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';

import ThemeToggle from '../components/molecules/ThemeToggle';

// @ts-ignore
// const ThemeToggle = React.lazy(() => import('remote_app/molecules/ThemeToggle'));

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, isAuthenticated } = useAuthStore();
    const { isDark, toggleTheme } = useThemeStore();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (credentials: { email: string; password: string }) => {
        await login(credentials);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
            {/* Theme Toggle - Top Right */}
            <div className="absolute top-6 right-6">
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md px-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-colors duration-200">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm
                        onSubmit={handleLogin}
                        isLoading={isLoading}
                        error={error || undefined}
                    />

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Microfrontend with Clean Architecture
                        </p>
                        {import.meta.env.VITE_USE_MOCK === 'true' && (
                            <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                                🔧 Running in Mock Mode
                            </p>
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Built with React + Vite + Module Federation
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
