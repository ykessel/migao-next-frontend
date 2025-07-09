import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyReportService } from '@/services/api-client';
import { toast } from 'sonner';

export const useCreatePropertyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyReportService.createReport,
    onSuccess: () => {
      toast.success('Reporte enviado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['property-reports'] });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      console.error('Error creating report:', error);
      toast.error(error.response?.data?.message || 'Error al enviar el reporte');
    },
  });
};

export const useGetReportsByProperty = (propertyId: string) => {
  return useQuery({
    queryKey: ['property-reports', propertyId],
    queryFn: () => propertyReportService.getReportsByProperty(propertyId),
    enabled: !!propertyId,
  });
};

export const useGetUserReports = () => {
  return useQuery({
    queryKey: ['user-reports'],
    queryFn: propertyReportService.getUserReports,
  });
}; 