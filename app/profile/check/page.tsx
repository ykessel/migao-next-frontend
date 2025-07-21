"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

type SessionWithToken = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
};

export default function ProfileCheck() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
        const session = await getSession() as SessionWithToken;
        if (!session?.access_token) {
            // Handle missing session or access_token
            router.replace("/");
            return;
        }
        const decoded = jwtDecode(session.access_token as string);
        if (!(decoded as { isNew?: boolean }).isNew) {
          router.replace("/profile/update");
        } else {
          router.replace("/");
        }
    })();
  }, [router]);
  return null;
} 