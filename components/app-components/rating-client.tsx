"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function RatingCard({ property }: { property: Property }) {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!session || !property) return null;

  const handleStarHover = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleRate = async (value: number) => {
    setCurrentRating(value);
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      // TODO: Replace with your API endpoint for rating
      const res = await fetch(`/api/property/${property.slug}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TODO: Add Authorization header if access_token is available in session
        },
        body: JSON.stringify({ rating: value }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError("No se pudo enviar tu calificación. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-6 p-6 bg-white rounded-lg shadow border border-gray-100">
      <h3 className="font-semibold mb-4">Califica esta propiedad</h3>
      <div
        className="flex items-center gap-2 mb-2"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={ratingValue}
              className={cn(
                "h-6 w-6 cursor-pointer transition-colors",
                (hoverRating || currentRating) >= ratingValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted stroke-gray-400"
              )}
              onClick={() => handleRate(ratingValue)}
              onMouseEnter={() => handleStarHover(ratingValue)}
            />
          );
        })}
      </div>
      {submitting && (
        <p className="text-sm text-gray-500">Enviando calificación...</p>
      )}
      {success && (
        <p className="text-sm text-green-600">¡Gracias por tu calificación!</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
