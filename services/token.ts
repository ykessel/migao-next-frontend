interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
}

class TokenService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  static setTokens(data: TokenData): void {
    try {
      const expiresAt = Date.now() + data.expires_in * 1000;
      localStorage.setItem(this.ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, data.refresh_token);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiresAt.toString());
    } catch (error) {
      console.error('Error storing tokens:', error);
      this.clearTokens();
    }
  }

  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  static getTokenExpiry(): number | null {
    try {
      const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      return expiry ? parseInt(expiry, 10) : null;
    } catch (error) {
      console.error('Error getting token expiry:', error);
      return null;
    }
  }

  static isTokenExpired(): boolean {
    try {
      const expiry = this.getTokenExpiry();
      if (!expiry) return true;
      return Date.now() >= expiry;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }

  static clearTokens(): void {
    try {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  static hasValidToken(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired();
  }
}

export default TokenService; 