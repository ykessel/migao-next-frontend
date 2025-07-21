import { API_BASE_URL } from "@/lib/axios";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: Record<string, unknown>;
      account?: Record<string, unknown> | null;
      profile?: Record<string, unknown> | null;
    }) {
      const shouldRefresh =
        typeof token.expires_at === "number" && Date.now() / 1000 > token.expires_at;

      // First login
      if (account && profile?.email) {
        const res = await fetch(`${API_BASE_URL}/auth/google/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: account.id_token,
          }),
        });

        const data = await res.json();
        // console.log('Login', data)
        token.access_token = data.access_token;
        token.refresh_token = data.refresh_token;
        token.expires_in = data.expires_in;
        token.expires_at = Math.floor(Date.now() / 1000) + (typeof data.expires_in === 'number' ? data.expires_in : 0);
      }

      // Token expired? refresh using refresh_token
      if (shouldRefresh && token.refresh_token) {
        // console.log("Refreshing this token -->", token.refresh_token);
        // console.log("typeof -> ", typeof token.refresh_token);
        try {
          const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: token.refresh_token,
            }),
          });

          const data = await res.json();

          console.log('data del refrshing', data)

          token.access_token = data.access_token;
          token.refresh_token = data.refresh_token ?? token.refresh_token; // optional
          token.expires_in = data.expires_in;
          token.expires_at = Math.floor(Date.now() / 1000) + (typeof data.expires_in === 'number' ? data.expires_in : 0);
        } catch (err) {
          console.error("Failed to refresh token", err);
        }
      }

      return token;
    },

    async session({ session, token }: { session: unknown; token: unknown }) {
      // console.log('new token', (token as Record<string, unknown>)?.access_token)
      return {
        ...(session as Record<string, unknown>),
        access_token: (token as Record<string, unknown>)?.access_token,
        refresh_token: (token as Record<string, unknown>)?.refresh_token,
        expires_in: (token as Record<string, unknown>)?.expires_in,
      };
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};
