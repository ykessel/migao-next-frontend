import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from "next/image";

interface ImagesUploadCardProps {
  uploadedImages: string[];
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  isUploading: boolean;
}

export const ImagesUploadCard: FC<ImagesUploadCardProps> = ({ uploadedImages, handleImageSelect, removeImage, isUploading }) => (
  <Card>
    <CardHeader>
      <CardTitle>Fotos de la Propiedad</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Arrastra y suelta tus fotos aquí</p>
          <p className="text-sm text-gray-500">o haz clic para seleccionar archivos</p>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Subiendo...' : 'Seleccionar Fotos'}
          </Button>
        </div>
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={url} className="relative group">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
); 