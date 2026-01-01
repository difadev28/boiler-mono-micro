import { User } from '../entities/User';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
    expiresIn?: number;
}

export interface IAuthRepository {
    /**
     * Authenticate user with credentials
     * @throws Error if credentials are invalid
     */
    login(credentials: LoginCredentials): Promise<AuthResponse>;

    /**
     * Log out current user
     */
    logout(): Promise<void>;

    /**
     * Get currently authenticated user
     * @returns User if authenticated, null otherwise
     */
    getCurrentUser(): Promise<User | null>;

    /**
     * Refresh authentication token
     * @throws Error if refresh token is invalid
     */
    refreshToken(refreshToken: string): Promise<AuthResponse>;

    /**
     * Validate if current session is still valid
     */
    validateSession(): Promise<boolean>;
}
