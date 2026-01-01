import { IAuthRepository, LoginCredentials, AuthResponse } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';

/**
 * Mock Authentication Repository
 * Used for development and testing without real API
 */
export class MockAuthRepository implements IAuthRepository {
    private currentUser: User | null = null;
    private mockToken: string | null = null;

    // Mock user database
    private mockUsers = [
        {
            id: '1',
            email: 'admin@example.com',
            password: 'admin123',
            name: 'Admin User',
            role: 'admin' as const,
            createdAt: new Date('2024-01-01'),
        },
        {
            id: '2',
            email: 'user@example.com',
            password: 'user123',
            name: 'Regular User',
            role: 'user' as const,
            createdAt: new Date('2024-06-15'),
        },
    ];

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user by email
        const mockUser = this.mockUsers.find(
            u => u.email.toLowerCase() === credentials.email.toLowerCase()
        );

        // Validate credentials
        if (!mockUser || mockUser.password !== credentials.password) {
            throw new Error('Invalid email or password');
        }

        // Generate mock token
        const token = `mock-jwt-token-${Date.now()}`;
        const refreshToken = `mock-refresh-token-${Date.now()}`;

        // Create user object (without password)
        const user: User = {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
            createdAt: mockUser.createdAt,
        };

        // Store current session
        this.currentUser = user;
        this.mockToken = token;

        return {
            user,
            token,
            refreshToken,
            expiresIn: 3600, // 1 hour
        };
    }

    async logout(): Promise<void> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        this.currentUser = null;
        this.mockToken = null;
    }

    async getCurrentUser(): Promise<User | null> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return this.currentUser;
    }

    async refreshToken(_refreshToken: string): Promise<AuthResponse> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!this.currentUser) {
            throw new Error('No active session');
        }

        // Generate new tokens
        const newToken = `mock-jwt-token-${Date.now()}`;
        const newRefreshToken = `mock-refresh-token-${Date.now()}`;

        this.mockToken = newToken;

        return {
            user: this.currentUser,
            token: newToken,
            refreshToken: newRefreshToken,
            expiresIn: 3600,
        };
    }

    async validateSession(): Promise<boolean> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));

        return this.currentUser !== null && this.mockToken !== null;
    }
}
