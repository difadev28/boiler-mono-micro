import { IAuthRepository, LoginCredentials, AuthResponse } from '../../domain/repositories/IAuthRepository';
import { UserEntity } from '../../domain/entities/User';

export class AuthLoginUseCase {
    constructor(private authRepository: IAuthRepository) { }

    /**
     * Execute login use case
     * Validates credentials and performs authentication
     */
    async execute(credentials: LoginCredentials): Promise<AuthResponse> {
        // Validation: Check if email is provided
        if (!credentials.email || credentials.email.trim() === '') {
            throw new Error('Email is required');
        }

        // Validation: Check if password is provided
        if (!credentials.password || credentials.password.trim() === '') {
            throw new Error('Password is required');
        }

        // Validation: Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            throw new Error('Invalid email format');
        }

        // Validation: Password minimum length
        if (credentials.password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        try {
            // Call repository to perform authentication
            const response = await this.authRepository.login(credentials);

            // Business rule: Verify response contains required data
            if (!response.user || !response.token) {
                throw new Error('Invalid authentication response');
            }

            // Create UserEntity from response
            const userEntity = new UserEntity(
                response.user.id,
                response.user.email,
                response.user.name,
                response.user.role,
                response.user.createdAt
            );

            // Return response with entity
            return {
                ...response,
                user: userEntity,
            };
        } catch (error) {
            // Re-throw with user-friendly message
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Authentication failed. Please try again.');
        }
    }
}
