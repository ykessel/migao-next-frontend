import React from "react";

export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden">
    {/* Image Section */}
    <div className="relative h-64 bg-gray-200 wave-animation">
      <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full" />
      <div className="absolute top-4 left-4 w-24 h-8 bg-gray-300 rounded" />
    </div>
    {/* Content */}
    <div className="p-6">
      <div className="flex flex-col items-start mb-3 gap-2">
        <div className="h-6 w-3/4 bg-gray-200 rounded wave-animation" />
        <div className="flex items-end gap-2">
          <div className="h-7 w-20 bg-gray-200 rounded wave-animation" />
          <div className="h-4 w-8 bg-gray-100 rounded wave-animation" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gray-200 rounded wave-animation" />
        <div className="h-4 w-32 bg-gray-100 rounded wave-animation" />
      </div>
      <div className="h-4 w-5/6 bg-gray-100 rounded mb-4 wave-animation" />
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-100 rounded wave-animation" />
        <div className="h-5 w-16 bg-gray-100 rounded wave-animation" />
      </div>
      <div className="h-4 w-full bg-gray-100 rounded mb-2 wave-animation" />
      <div className="h-4 w-5/6 bg-gray-100 rounded mb-4 wave-animation" />
      <div className="flex space-x-2">
        <div className="h-9 w-24 bg-gray-200 rounded wave-animation" />
        <div className="h-9 w-24 bg-gray-100 rounded wave-animation" />
        <div className="h-9 w-10 bg-gray-100 rounded wave-animation" />
        <div className="h-9 w-24 bg-gray-100 rounded wave-animation" />
      </div>
    </div>
  </div>
);

export default PropertyCardSkeleton; 