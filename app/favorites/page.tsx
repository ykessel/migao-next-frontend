
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import type { NextAuthOptions } from "next-auth";
import { FavoritesClient } from "@/components/app-components/favorites-client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

async function getAuthServer() {
  const session = await getServerSession(authOptions as unknown as NextAuthOptions) as { access_token?: string };
  if (!session?.access_token) return { isAuthenticated: false };
  try {
    return { isAuthenticated: true };
  } catch {
    return { isAuthenticated: true, error: "Error al cargar favoritos" };
  }
}

export default async function FavoritesPage() {
  const { isAuthenticated, error,  } = await getAuthServer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Debes iniciar sesión para ver tus favoritos
              </h3>
              <Link href="/login">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Iniciar sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error al cargar favoritos
              </h3>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              <Link href="/favorites">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Reintentar
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <FavoritesClient />
        )}
      </div>
    </div>
  );
}
