import React, { useState } from 'react';
import { LoginCredentials } from '../../../core/domain/repositories/IAuthRepository';

// Dynamic imports from remote
// @ts-ignore
const Button = React.lazy(() => import('remote_app/atoms/Button'));
// @ts-ignore
const FormField = React.lazy(() => import('remote_app/molecules/FormField'));

export interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => Promise<void>;
    isLoading: boolean;
    error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await onSubmit({ email, password });
        } catch (err) {
            // Error is handled by parent component
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {error && (
                <div
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    role="alert"
                >
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            <React.Suspense fallback={<div className="h-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />}>
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                />
            </React.Suspense>

            <React.Suspense fallback={<div className="h-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />}>
                <FormField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={isLoading}
                />
            </React.Suspense>

            <React.Suspense fallback={<div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />}>
                <Button
                    type="submit"
                    label={isLoading ? 'Signing in...' : 'Sign In'}
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                    onClick={() => { }}
                    className="w-full"
                />
            </React.Suspense>

            {/* Mock credentials hint for development */}
            {import.meta.env.VITE_USE_MOCK === 'true' && (
                <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                        Mock Mode - Test Credentials:
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                        Admin: admin@example.com / admin123
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                        User: user@example.com / user123
                    </p>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
