import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({token, profile, account}: { token: JWT, profile?: Record<string, unknown>, account?: Record<string, unknown> }) {
            // Solo en el primer login
            if (account && profile?.email) {
                // Llamar a tu backend con la info del usuario de Google
                const res = await fetch(`${process.env.NEXT_API_BASE_URL}/auth/google/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: account?.id_token
                    }),
                });

                const data = await res.json();
                console.log('data', data)

                // Guarda el token personalizado (JWT del backend)
                token.access_token = data.access_token;
                token.refresh_token = data.refresh_token;
                token.expires_in = data.expires_in;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            return {
                ...session,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                expires_in: token.expires_in,
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// @ts-expect-error NextAuth type issue
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
