"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null; // or a loading spinner
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 