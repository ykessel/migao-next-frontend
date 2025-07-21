import Image from "next/image";
import { Square } from "lucide-react";
import { blurDataURL } from "@/lib/utils";
import { useCallback, useState } from "react";

interface PropertyImageCarouselProps {
  images: { url: string }[];
  title: string;
  className?: string;
}

export function PropertyImageCarousel({ images, title, className = "" }: PropertyImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const hasImages = images && images.length > 0;
  const currentImage = hasImages ? images[currentImageIndex] : null;

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  return (
    <div className={`relative w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>
      {hasImages ? (
        <>
          <Image
            src={currentImage?.url || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ease-out ${imageLoading ? "blur-sm" : "blur-0"}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={currentImageIndex === 0}
            objectFit="cover"
            placeholder="blur"
            quality={60}
            blurDataURL={blurDataURL}
          />
          {imageLoading && <div className="absolute inset-0 skeleton animate-pulse" />}
          {imageError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Square className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-all duration-200 z-10 cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
                  setCurrentImageIndex(prevIndex);
                }}
                aria-label="Imagen anterior"
                tabIndex={0}
                role="button"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-all duration-200 z-10 cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
                  setCurrentImageIndex(nextIndex);
                }}
                aria-label="Siguiente imagen"
                tabIndex={0}
                role="button"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10" role="tablist" aria-label="Selector de imágenes">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/80"}`}
                    aria-label={`Ver imagen ${index + 1}${index === currentImageIndex ? " (actual)" : ""}`}
                    role="tab"
                    aria-selected={index === currentImageIndex}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Square className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm font-medium">Sin imágenes</p>
          </div>
        </div>
      )}
    </div>
  );
} 