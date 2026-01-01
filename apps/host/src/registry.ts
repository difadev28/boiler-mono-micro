import { IAuthRepository } from './core/domain/repositories/IAuthRepository';
import { MockAuthRepository } from './core/infrastructure/repositories/MockAuthRepository';
import { RealAuthRepository } from './core/infrastructure/repositories/RealAuthRepository';
import { AuthLoginUseCase } from './core/usecases/auth/AuthLoginUseCase';
import { apiClient } from './core/infrastructure/http/apiClient';

/**
 * Dependency Injection Registry
 * 
 * This is THE SINGLE SOURCE OF TRUTH for switching between Mock and Real implementations.
 * Change VITE_USE_MOCK environment variable to toggle between development and production modes.
 */

// 🔥 THE SWITCH - Toggle between Mock and Real API
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Registry class implementing Singleton pattern
 * Manages all dependency injection for the application
 */
class Registry {
    private static instance: Registry;
    private _authRepository: IAuthRepository;

    private constructor() {
        // Initialize repository based on environment
        if (USE_MOCK) {
            console.log('🔧 Using MockAuthRepository (Development Mode)');
            this._authRepository = new MockAuthRepository();
        } else {
            console.log('🌐 Using RealAuthRepository (Production Mode)');
            this._authRepository = new RealAuthRepository();
        }
    }

    /**
     * Get singleton instance
     */
    static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }

    /**
     * Get Auth Repository instance
     */
    get authRepository(): IAuthRepository {
        return this._authRepository;
    }

    /**
     * Get Auth Login Use Case instance
     * Use case is created with injected repository
     */
    get authLoginUseCase(): AuthLoginUseCase {
        return new AuthLoginUseCase(this._authRepository);
    }

    /**
     * Get API Client instance
     */
    get apiClient() {
        return apiClient;
    }

    /**
     * Check if using mock mode
     */
    get isMockMode(): boolean {
        return USE_MOCK;
    }
}

// Export singleton instance
export const registry = Registry.getInstance();

// Export for testing purposes
export { Registry };
