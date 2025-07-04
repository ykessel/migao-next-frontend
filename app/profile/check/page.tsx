"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function ProfileCheck() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
        const session: any = await getSession();
        if (!session?.access_token) {
            // Handle missing session or access_token
            router.replace("/");
            return;
        }
        const decoded = jwtDecode(session.access_token as string);
        console.log('decoded', decoded);
        if (!(decoded as { isNew?: boolean }).isNew) {
          router.replace("/profile/update");
        } else {
          router.replace("/");
        }
    })();
  }, [router]);
  return null;
} 