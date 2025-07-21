import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    access_token: session?.access_token ?? null,
    refresh_token: session?.refresh_token ?? null,
    expires_in: session?.expires_in ?? null,
    status,
  };
} 