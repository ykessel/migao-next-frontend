"use client";
import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: { url: string; thumb?: string }[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="mb-4">
      <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
        {images && images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]?.url || "/placeholder.jpg"}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
            />
            {/* Image Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white z-10"
                  onClick={() => setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                  aria-label="Anterior imagen"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white z-10"
                  onClick={() => setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)}
                  aria-label="Siguiente imagen"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </>
        ) : (
          <Image
            src={'/placeholder-property.jpg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover"
          />
        )}
        {/* Modal */}
        {isImageModalOpen && images && images.length > 0 && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80" onClick={() => setIsImageModalOpen(false)}>
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
              <Image
                src={images[currentImageIndex]?.url || "/placeholder.jpg"}
                alt={title}
                width={1200}
                height={800}
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              />
              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 text-gray-800 shadow-lg transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
                    }}
                    aria-label="Imagen anterior"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 text-gray-800 shadow-lg transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
            <button
              className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black transition-all z-10"
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Cerrar imagen"
            >
              &times;
            </button>
          </div>
        )}
      </div>
      {/* Thumbnails below the main image */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? 'border-teal-500' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image.thumb || image.url}
                alt={`Vista ${index + 1}`}
                fill
                sizes="100px"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 