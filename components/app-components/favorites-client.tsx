'use client'
import { Property } from '@/types/property'
import { PropertyCard } from '@/components/property/property-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Search, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useFavorites } from '@/hooks/use-favorites'

interface FavoritesClientProps {
  initialFavorites: Property[]
}

export function FavoritesClient({ initialFavorites }: FavoritesClientProps) {
  const { toast } = useToast()
  const { removeFavorite, addFavorite, isFavorite, loading: favLoading, favorites } = useFavorites()

console.log('favorites', favorites)
  const handleShareFavorites = () => {
    const shareUrl = `${window.location.origin}/favorites?shared=${btoa(JSON.stringify(initialFavorites.map(p => p?._id)))}`
    navigator.clipboard.writeText(shareUrl)
    
    toast({
      title: 'Enlace copiado',
      description: 'El enlace para compartir tus favoritos ha sido copiado al portapapeles.',
    })
  }

  if (favorites.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes favoritos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Explora propiedades y guarda las que más te gusten haciendo clic en el corazón
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            Explorar Propiedades
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Header */}
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
          
          <div className="flex space-x-2">
            <Button
              onClick={handleShareFavorites}
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
          <div key={property._id} className="relative">
            <PropertyCard 
              property={property}
              isFavorite={Boolean(isFavorite(property._id!))}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favLoading={favLoading}
            />
          </div>
        ))}
      </div>
    </>
  )
} 