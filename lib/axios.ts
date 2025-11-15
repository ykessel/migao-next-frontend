import axios, {type InternalAxiosRequestConfig} from 'axios';
import {getSession} from 'next-auth/react';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL || 'https://rent-finder-rosy.vercel.app/api';

// Extend Axios config to support skipAuth flag
declare module 'axios' {
    export interface AxiosRequestConfig {
        skipAuth?: boolean;
    }
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * 
 * Automatically attaches the Authorization token from the session to all requests.
 * To skip authentication for a specific request, pass `skipAuth: true` in the config:
 * 
 * Example:
 * ```typescript
 * axiosInstance.get('/public-endpoint', { skipAuth: true });
 * ```
 */
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Skip authentication if explicitly requested
        if (config.skipAuth) {
            return config;
        }

        // Only attempt to get session on client-side
        if (typeof window !== 'undefined') {
            try {
                const session = await getSession();
                const token = (session as { access_token?: string } | null)?.access_token;

                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error getting session for request:', error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * 
 * Handles common error scenarios like 401 Unauthorized
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            console.warn('Unauthorized request, token may be invalid or expired');
            // Optionally redirect to login or refresh token here
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 