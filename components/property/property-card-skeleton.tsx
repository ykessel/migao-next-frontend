import React from "react";

export const PropertyCardSkeleton = () => (
  <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg bg-white animate-pulse">
    {/* Image Section */}
    <div className="relative h-48 w-full bg-gray-200">
      {/* Badge (top-right) */}
      <div className="absolute top-3 right-3 w-20 h-6 bg-gray-300 rounded-full" />
      {/* Favorite Button (top-left) */}
      <div className="absolute top-3 left-3 w-8 h-8 bg-gray-300 rounded-full" />
    </div>
    {/* Content */}
    <div className="p-4 pb-0">
      {/* Title, rating, views */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 w-2/3 bg-gray-200 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-8 bg-gray-200 rounded" /> {/* rating */}
          <div className="h-4 w-8 bg-gray-200 rounded" /> {/* views */}
        </div>
      </div>
      {/* Location */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>
      {/* Price */}
      <div className="h-7 w-24 bg-gray-200 rounded mb-3" />
      {/* Features/amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-100 rounded" />
        <div className="h-5 w-16 bg-gray-100 rounded" />
      </div>
    </div>
    {/* Details Button */}
    <div className="p-4 pt-0">
      <div className="h-10 w-full bg-gray-200 rounded" />
    </div>
  </div>
);

export default PropertyCardSkeleton; 