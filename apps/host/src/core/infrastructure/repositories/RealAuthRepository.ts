import { IAuthRepository, LoginCredentials, AuthResponse } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { apiClient } from '../http/apiClient';

/**
 * Real Authentication Repository
 * Connects to actual backend API
 */
export class RealAuthRepository implements IAuthRepository {
    constructor() {
        // No-op constructor, or add dependencies if needed later
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

            // Set auth token for subsequent requests
            apiClient.setAuthToken(response.data.token);

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Login failed. Please try again.');
        }
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout', {});
            apiClient.removeAuthToken();
        } catch (error) {
            // Even if API call fails, remove token locally
            apiClient.removeAuthToken();
            throw error;
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await apiClient.get<{ user: User }>('/auth/me');
            return response.data.user;
        } catch (error) {
            // If unauthorized, return null
            return null;
        }
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/refresh', {
                refreshToken,
            });

            // Update auth token
            apiClient.setAuthToken(response.data.token);

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Token refresh failed');
        }
    }

    async validateSession(): Promise<boolean> {
        try {
            const response = await apiClient.get('/auth/validate');
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}
