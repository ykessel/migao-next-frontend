
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, Trash2, Share2 } from "lucide-react";
import { Navigation } from "@/components/app-components/navigation";
import Link from "next/link";
import { favoritesService } from "@/services/api-client";
import type { Property } from "@/types/property";

async function getFavoritesServer() {
  const session = await getServerSession(authOptions) as { access_token?: string };
  if (!session?.access_token) return { favorites: [], isAuthenticated: false };
  try {
    const favorites = await favoritesService.getFavorites(session.access_token);
    return { favorites, isAuthenticated: true };
  } catch {
    return { favorites: [], isAuthenticated: true, error: "Error al cargar favoritos" };
  }
}

function ShareFavoritesButton({ favorites }: { favorites: Property[] }) {
  "use client";
  const handleShareFavorites = () => {
    const favoriteIds = favorites.map((prop) => prop.propertyId).filter(Boolean);
    const shareUrl = `${window.location.origin}/favorites?shared=${btoa(JSON.stringify(favoriteIds))}`;
    navigator.clipboard.writeText(shareUrl);
    // You can use a toast here if you want
    alert("El enlace para compartir tus favoritos ha sido copiado al portapapeles.");
  };
  return (
    <Button
      onClick={handleShareFavorites}
      variant="outline"
      className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Compartir
    </Button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RemoveFavoriteButton({ propertyId: _propertyId }: { propertyId: string }) {
  "use client";
  // This should call an API route or mutate state, but for now just alert
  const handleRemove = () => {
    alert("Funcionalidad de eliminar favorito aún no implementada en server component.");
  };
  return (
    <Button
      onClick={handleRemove}
      size="sm"
      variant="ghost"
      className="bg-white/80 hover:bg-white text-coral-500 hover:text-coral-600 rounded-full p-2"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}

export default async function FavoritesPage() {
  const { favorites, isAuthenticated, error } = await getFavoritesServer();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-coral-500 fill-current" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 mt-2">
                {favorites.length} {favorites.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
              </p>
            </div>
            {favorites.length > 0 && <ShareFavoritesButton favorites={favorites} />}
          </div>
        </div>
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
              <Button
                onClick={() => window.location.reload()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Reintentar
              </Button>
            </CardContent>
          </Card>
        ) : favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes favoritos aún
              </h3>
              <p className="text-gray-600 mb-6">
                Explora propiedades y guarda las que más te gusten haciendo clic en el corazón
              </p>
              <Link href="/">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Explorar Propiedades
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property: Property) => (
              <div key={property.propertyId} className="relative">
                <div className="absolute top-4 right-16 z-10">
                  <RemoveFavoriteButton propertyId={property.propertyId!} />
                </div>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
