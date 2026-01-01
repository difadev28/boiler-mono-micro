import React from 'react';
import { useAuthStore } from '../stores/authStore';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Welcome back, {user?.name || user?.email}!
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* User Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        User Information
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Email:
                            </span>
                            <p className="text-gray-900 dark:text-white">{user?.email}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Name:
                            </span>
                            <p className="text-gray-900 dark:text-white">{user?.name}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Role:
                            </span>
                            <p className="text-gray-900 dark:text-white capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                        ✅ Authentication Successful!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                        You have successfully logged in using Clean Architecture with{' '}
                        {import.meta.env.VITE_USE_MOCK === 'true' ? 'Mock' : 'Real'} Repository.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
