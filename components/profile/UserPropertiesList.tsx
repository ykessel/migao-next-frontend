'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  MapPin, 
  Loader2
} from 'lucide-react';
import { Property } from '@/types/property';
import { useDeleteProperty } from '@/hooks/use-user-properties';
import { useSearchProperties } from '@/hooks/use-properties';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
 import { toast } from 'sonner';
import Image from "next/image";

export function UserPropertiesList() {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = (session as { access_token?: string } | null | undefined)?.access_token;
  let userId: string | undefined = undefined;
  if (accessToken) {
    try {
      type DecodedJwt = { user?: { _id?: string }, _id?: string, sub?: string };
      const decoded = jwtDecode<DecodedJwt>(accessToken);
      userId = decoded.user?._id || decoded._id || decoded.sub;
    } catch {}
  }
  const { data, isLoading } = useSearchProperties({
    filters: userId ? [{ type: 'TERM', field: 'owner._id', value: userId }] : [],
    size: 100,
  });
  const properties = data?.data || [];
  const deletePropertyMutation = useDeleteProperty();

  const handleEditProperty = (property: Property) => {
    router.push(`/publish?edit=${property.slug}`);
  };

  const handleViewProperty = (property: Property) => {
    router.push(`/property/${property.slug}`);
  };

  const handleDeleteProperty = async (property: Property) => {
    try {
      await deletePropertyMutation.mutateAsync(property._id!);
    } catch (error) {
      // @ts-expect-error error.message can not exist
      const errorMessage = error?.message || "No se pudo eliminar la propiedad. Intenta de nuevo.";
      // Import toast from 'sonner' at the top if not already imported
     
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="ml-2 text-gray-600">Cargando propiedades...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Optionally, handle error UI here if needed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mis Propiedades
          </h2>
          <p className="text-gray-600">
            Gestiona las propiedades que has creado
          </p>
        </div>
        <Button
          onClick={() => router.push('/publish')}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Nueva
        </Button>
      </div>

      {/* Properties List */}
      {properties && properties.length > 0 ? (
        <div className="grid gap-6">
          {properties.map((property: Property) => (
            <Card key={property._id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Home className="w-5 h-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {property.title}
                      </h3>
                      <Badge
                        variant={property.isAvailable ? 'default' : 'secondary'}
                        className={property.isAvailable ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {property.isAvailable ? 'Disponible' : 'No disponible'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {(property.location as { address?: string })?.address || 'Ubicación no disponible'}
                      </span>
                    </div>
                    {/* Small image gallery */}
                    {property.images && property.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {property.images.slice(0, 3).map((img, idx) => (
                          <Image
                            key={img.url || idx}
                            src={img.url || '/placeholder.svg'}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProperty(property)}
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProperty(property)}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar propiedad?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta propiedad?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteProperty(property)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tienes propiedades creadas
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza creando tu primera propiedad para alquilar
            </p>
            <Button
              onClick={() => router.push('/publish-property')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Propiedad
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 