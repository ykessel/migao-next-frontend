import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userPropertiesService } from '@/services/api-client';
import { Property } from '@/types/property';
import { toast } from 'sonner';

export const useUserProperties = () => {
  return useQuery({
    queryKey: ['user-properties'],
    queryFn: userPropertiesService.getUserProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, propertyData }: { propertyId: string; propertyData: Partial<Property> }) =>
      userPropertiesService.updateProperty(propertyId, propertyData),
    onSuccess: () => {
      toast.success('Propiedad actualizada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      console.error('Error updating property:', error);
      toast.error(error.response?.data?.message || 'Error al actualizar la propiedad');
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userPropertiesService.deleteProperty,
    onSuccess: () => {
      toast.success('Propiedad eliminada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['user-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      console.error('Error deleting property:', error);
      toast.error(error.response?.data?.message || 'Error al eliminar la propiedad');
    },
  });
}; 