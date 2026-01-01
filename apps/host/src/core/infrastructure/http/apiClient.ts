import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Keep the same interface for compatibility with existing code
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
    private axiosInstance: AxiosInstance;

    constructor(config: ApiClientConfig) {
        this.axiosInstance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response Interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                if (error.response) {
                    console.error('[API Error]', error.response.status, error.response.data);

                    if (error.response.status === 401) {
                        console.warn('Unauthorized access - potential token expiration');
                    }
                } else if (error.request) {
                    console.error('[API Error] No response received', error.request);
                } else {
                    console.error('[API Error] Request setup failed', error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    private normalizeResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.get<T>(endpoint, config);
        return this.normalizeResponse(response);
    }

    async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.post<T>(endpoint, data, config);
        return this.normalizeResponse(response);
    }

    async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.put<T>(endpoint, data, config);
        return this.normalizeResponse(response);
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.delete<T>(endpoint, config);
        return this.normalizeResponse(response);
    }

    setAuthToken(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    removeAuthToken() {
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
}

// Create singleton instance
export const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});
