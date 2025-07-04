declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    [key: string]: unknown;
  }
  interface User {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  }
}