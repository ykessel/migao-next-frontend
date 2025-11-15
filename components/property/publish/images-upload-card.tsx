import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
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
      <CardTitle>6. Fotos de la Propiedad</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4 relative">
        {/* Overlay for uploading */}
        {isUploading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 rounded-lg">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-2" />
            <span className="text-lg font-semibold text-teal-700">Subiendo imágenes...</span>
          </div>
        )}
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
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={isUploading}
          >
            Seleccionar Fotos
          </Button>
        </div>
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={url} className="relative group w-full h-32">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => !isUploading && removeImage(index)}
                  className={`absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full transition-opacity z-10 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
                  disabled={isUploading}
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