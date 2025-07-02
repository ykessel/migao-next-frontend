import axios, {AxiosError, InternalAxiosRequestConfig, AxiosHeaders} from 'axios';
import TokenService from '@/services/token';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL || 'https://rent-finder-rosy.vercel.app/api';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = TokenService.getAccessToken();
        console.log('Request interceptor - Token:', token ? 'Present' : 'Missing');

        if (token) {
            // Create new headers if they don't exist
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            // Set the Authorization header
            config.headers.set('Authorization', `Bearer ${token}`);
            console.log('Request headers:', config.headers);
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response interceptor - Success:', response.status);
        return response;
    },
    async (error: AxiosError) => {
        console.error('Response interceptor - Error:', error.response?.status);

        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (!originalRequest) {
            return Promise.reject(error);
        }

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('Attempting token refresh...');
            originalRequest._retry = true;

            try {
                const refreshToken = TokenService.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call your refresh token endpoint
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });

                const {access_token, refresh_token, expires_in} = response.data;
                TokenService.setTokens({
                    access_token,
                    refresh_token,
                    expires_in,
                });

                // Update the original request with the new token
                if (!originalRequest.headers) {
                    originalRequest.headers = new AxiosHeaders();
                }
                originalRequest.headers.set('Authorization', `Bearer ${access_token}`);
                console.log('Token refreshed, retrying request');
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // If refresh token fails, clear tokens and redirect to login
                TokenService.clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 