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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setIsImageModalOpen(false)}>
            <Image
              src={images[currentImageIndex]?.url || "/placeholder.jpg"}
              alt={title}
              width={1200}
              height={800}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/50 rounded-full px-3 py-1 hover:bg-black"
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