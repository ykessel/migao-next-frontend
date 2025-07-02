import axiosInstance from '@/lib/axios';
import TokenService from '@/services/token';


export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  allowedPropertyPosts: number,
  createdAt: string;
  phones?: string[];
  primaryPhone?: string;
  avatar: {
    url: string;
    thumb: string;
    sizes: unknown[]
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    TokenService.setTokens(response.data);
    return response.data;
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
    TokenService.setTokens(response.data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await axiosInstance.patch<User>('/auth/profile', data);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await axiosInstance.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  logout(): void {
    TokenService.clearTokens();
  }

  isAuthenticated(): boolean {
    return !!TokenService.getAccessToken() && !TokenService.isTokenExpired();
  }

  getToken(): string | null {
    return TokenService.getAccessToken();
  }
}

export const authService = new AuthService(); 