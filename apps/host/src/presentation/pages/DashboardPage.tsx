import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import ThemeToggle from '../components/molecules/ThemeToggle';
import Button from '../components/atoms/Button';

// Dynamic import for the Remote Kanban Feature
// @ts-ignore
const KanbanBoard = React.lazy(() => import('remote_app/KanbanBoard'));

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                            <Button
                                label="Sign Out"
                                variant="outline"
                                size="sm"
                                onClick={logout}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Feature Section: Consuming Remote Microfrontend */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Project Status
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                This section loads the <strong>Kanban Board</strong> directly from the Remote App.
                            </p>

                            {/* Remote Component Boundary */}
                            <React.Suspense fallback={
                                <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
                                    <span className="text-gray-400">Loading Remote Feature...</span>
                                </div>
                            }>
                                <KanbanBoard />
                            </React.Suspense>
                        </div>
                    </div>

                    {/* Sidebar / Local Content */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Recent Activity
                            </h3>
                            <ul className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">#{i}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                Task Updated
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                2 hours ago
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
