import { ImageOff } from "lucide-react";

export default function NoImagesInfo() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white/80 rounded-xl border border-dashed border-gray-300 mb-4">
      <ImageOff className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Sin imágenes disponibles</h3>
      <p className="text-gray-500 text-center max-w-xs">
        Este anuncio aún no tiene imágenes cargadas. Pronto podrás ver fotos de esta propiedad.
      </p>
    </div>
  );
} 