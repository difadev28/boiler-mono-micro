export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

export class UserEntity implements User {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public role: 'admin' | 'user',
        public createdAt: Date
    ) { }

    /**
     * Business rule: Check if user has admin privileges
     */
    isAdmin(): boolean {
        return this.role === 'admin';
    }

    /**
     * Business rule: Validate if user can access a specific resource
     */
    canAccessResource(resource: string): boolean {
        if (this.isAdmin()) {
            return true; // Admins can access everything
        }

        // Regular users have limited access
        const allowedResources = ['dashboard', 'profile', 'settings'];
        return allowedResources.includes(resource);
    }

    /**
     * Business rule: Check if account is new (created within last 7 days)
     */
    isNewAccount(): boolean {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return this.createdAt > sevenDaysAgo;
    }

    /**
     * Get user display name
     */
    getDisplayName(): string {
        return this.name || this.email.split('@')[0];
    }
}
