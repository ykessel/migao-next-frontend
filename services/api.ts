import {API_BASE_URL} from "@/lib/axios";

class ApiClient {
    private readonly baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private getHeaders(options?: RequestInit): HeadersInit {
        const headers: HeadersInit = {
            accept: "*/*",
            "Content-Type": "application/json",
            ...options?.headers,
        }
        return headers
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw {
                message: errorData.message || `HTTP error! status: ${response.status}`,
                status: response.status,
                code: errorData.code,
            }
        }

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            return response.json()
        }

        return response.text() as unknown as T
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "GET",
            headers: this.getHeaders(options),
            ...options,
        })

        return this.handleResponse<T>(response)
    }

    async post<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers: this.getHeaders(options),
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        })

        return this.handleResponse<T>(response)
    }

    async put<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PUT",
            headers: this.getHeaders(options),
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        })

        return this.handleResponse<T>(response)
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "DELETE",
            headers: this.getHeaders(options),
            ...options,
        })

        return this.handleResponse<T>(response)
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
