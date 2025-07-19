'use client'
import {useSession} from "next-auth/react";
import {useState} from "react";
import type {Property} from "@/types/property"

export function RatingCard({property}: { property: Property }) {
    const {data: session} = useSession();
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!session || !property) return null;

    const handleRate = async (value: number) => {
        setRating(value);
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
                body: JSON.stringify({rating: value}),
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
            <h3 className="text-lg font-bold mb-2">Califica esta propiedad</h3>
            <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
                        onClick={() => handleRate(star)}
                        disabled={submitting}
                        aria-label={`Calificar con ${star} estrella${star > 1 ? 's' : ''}`}
                    >
                        ★
                    </button>
                ))}
            </div>
            {submitting && <p className="text-sm text-gray-500">Enviando calificación...</p>}
            {success && <p className="text-sm text-green-600">¡Gracias por tu calificación!</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
