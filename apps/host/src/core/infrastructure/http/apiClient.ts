export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

export class ApiClient {
    private baseURL: string;
    private timeout: number;
    private headers: Record<string, string>;

    constructor(config: ApiClientConfig) {
        this.baseURL = config.baseURL;
        this.timeout = config.timeout || 30000;
        this.headers = config.headers || {
            'Content-Type': 'application/json',
        };
    }

    private async request<T>(
        method: string,
        endpoint: string,
        data?: any
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                method,
                headers: this.headers,
                body: data ? JSON.stringify(data) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const responseData = await response.json();

            return {
                data: responseData,
                status: response.status,
                statusText: response.statusText,
            };
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }
                throw error;
            }
            throw new Error('Network request failed');
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>('GET', endpoint);
    }

    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>('POST', endpoint, data);
    }

    async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>('PUT', endpoint, data);
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', endpoint);
    }

    setAuthToken(token: string) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    removeAuthToken() {
        delete this.headers['Authorization'];
    }
}

// Create singleton instance
export const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});
