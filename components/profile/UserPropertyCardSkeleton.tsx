/**
 * UserPropertyCardSkeleton Component
 * 
 * Loading skeleton for UserPropertyCard.
 * Matches the layout and dimensions of the actual card for consistent loading experience.
 * 
 * Follows Single Responsibility Principle - Only handles loading state presentation.
 */
export function UserPropertyCardSkeleton() {
    return (
        <div className="w-full rounded-lg overflow-hidden shadow bg-white animate-pulse">
            {/* Image Section */}
            <div className="relative h-40 w-full bg-gray-200">
                {/* Badge Placeholder */}
                <div className="absolute top-2 right-2 w-16 h-5 bg-gray-300 rounded-full"/>
            </div>
            
            {/* Content Section */}
            <div className="p-4 pb-2">
                {/* Title Placeholder */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"/>
                
                {/* Location Placeholder */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-gray-200 rounded"/>
                    <div className="h-3 w-28 bg-gray-100 rounded"/>
                </div>
            </div>
            
            {/* Price Placeholder */}
            <div className="px-4 pb-2">
                <div className="h-6 w-24 bg-gray-200 rounded"/>
            </div>
            
            {/* Action Buttons Placeholder */}
            <div className="p-4 pt-0 flex gap-2 justify-start">
                <div className="h-9 w-9 bg-gray-200 rounded-full"/>
                <div className="h-9 w-9 bg-gray-200 rounded-full"/>
                <div className="h-9 w-9 bg-gray-200 rounded-full"/>
            </div>
        </div>
    );
}

