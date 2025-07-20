'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Flag, Loader2 } from 'lucide-react';
import { Property } from '@/types/property';
import { REPORT_REASON, REPORT_REASON_LABELS, REPORT_REASON_DESCRIPTIONS } from '@/constants/report-reason.enum';
import { useCreatePropertyReport } from '@/hooks/use-property-reports';
import { toast } from 'sonner';

interface PropertyReportDialogProps {
  property: Property;
}

export function PropertyReportDialog({ property }: PropertyReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<REPORT_REASON | ''>('');
  const [description, setDescription] = useState('');

  const { createReport, loading: isSubmitting } = useCreatePropertyReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      toast.error('Por favor selecciona una razón para el reporte');
      return;
    }

    if (!description.trim()) {
      toast.error('Por favor proporciona una descripción del problema');
      return;
    }

    if (description.trim().length < 10) {
      toast.error('La descripción debe tener al menos 10 caracteres');
      return;
    }

    try {
      await createReport({
        propertyId: property._id!,
        reason: reason as REPORT_REASON,
        description: description.trim(),
      });

      // Reset form and close dialog
      setReason('');
      setDescription('');
      setOpen(false);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isSubmitting) return; // Prevent closing while submitting
    setOpen(newOpen);
    
    if (!newOpen) {
      // Reset form when closing
      setReason('');
      setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
          <Button
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 hover:text-red-800"
            >
              <Flag className="w-4 h-4 mr-2" />
              Reportar Propiedad
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Reportar Propiedad
          </DialogTitle>
          <DialogDescription>
            Ayúdanos a mantener la calidad de nuestros listados reportando problemas con esta propiedad.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-1">{property.title}</h4>
            <p className="text-sm text-gray-600">
              {property.rentPricePerMonth} {property.currency}/mes
            </p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="reason">Razón del reporte *</Label>
            <Select value={reason} onValueChange={(value: REPORT_REASON) => setReason(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una razón" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(REPORT_REASON_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-gray-500">
                        {REPORT_REASON_DESCRIPTIONS[key as REPORT_REASON]}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Descripción detallada * 
              <span className="text-xs text-gray-500 ml-1">
                ({description.length}/1000)
              </span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe el problema que has encontrado con esta propiedad..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Mínimo 10 caracteres. Sé específico para ayudarnos a resolver el problema.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !reason || !description.trim() || description.trim().length < 10}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Flag className="w-4 h-4 mr-2" />
                  Enviar Reporte
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 