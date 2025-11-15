'use client';

import {useSession} from 'next-auth/react';
import {useState} from 'react';
import type {Property} from '@/types/property';
import {cn} from '@/lib/utils';
import {Star} from 'lucide-react';
import {useRateProperty} from '@/hooks/use-property-rating';

interface RatingCardProps {
    property: Property;
}

/**
 * RatingCard Component
 *
 * Allows authenticated users to rate a property using a 5-star rating system.
 * Follows Single Responsibility Principle - Only handles rating UI and user interaction.
 * All business logic is delegated to the useRateProperty custom hook.
 *
 * Features:
 * - Interactive star rating with hover effect
 * - Real-time feedback (loading, success, error states from react-query)
 * - Optimistic UI updates
 * - Toast notifications for user feedback
 *
 * @param property - The property to rate
 */
export function RatingCard({property}: RatingCardProps) {
    const {data: session} = useSession();
    const [currentRating, setCurrentRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Use custom hook with react-query
    const {mutate: rateProperty, isPending, isSuccess} = useRateProperty();

    if (!session || !property) return null;

    const handleStarHover = (ratingValue: number) => {
        setHoverRating(ratingValue);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleRate = (value: number) => {
        setCurrentRating(value);
        rateProperty({
            slug: property.slug!,
            rating: value,
        });
    };

    return (
        <div className="my-6 p-6 bg-white rounded-[25px]">
            <h3 className="font-semibold mb-4">Califica esta propiedad</h3>
            <div
                className="flex items-center gap-2 mb-2"
                onMouseLeave={handleMouseLeave}
            >
                {Array.from({length: 5}, (_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <Star
                            key={ratingValue}
                            className={cn(
                                'h-6 w-6 cursor-pointer transition-colors',
                                (hoverRating || currentRating) >= ratingValue
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-muted stroke-gray-400',
                                isPending && 'opacity-50 cursor-not-allowed'
                            )}
                            onClick={() => !isPending && handleRate(ratingValue)}
                            onMouseEnter={() => !isPending && handleStarHover(ratingValue)}
                        />
                    );
                })}
            </div>
            {isPending && (
                <p className="text-sm text-gray-500">Enviando calificación...</p>
            )}
            {isSuccess && (
                <p className="text-sm text-green-600">¡Calificación enviada!</p>
            )}
        </div>
    );
}
