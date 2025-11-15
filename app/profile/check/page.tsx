"use client";
import { useEffect, useState } from "react";
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
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
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
        } catch (error) {
            console.error("Error checking profile:", error);
            router.replace("/");
        } finally {
            setIsLoading(false);
        }
    })();
  }, [router]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verificando tu perfil...</h2>
        <p className="text-gray-600">Espera un momento mientras verificamos tu información</p>
      </div>
    </div>
  );
} 