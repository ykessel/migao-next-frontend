// Extend the Session type to include custom properties
declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  }
} 