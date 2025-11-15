import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const PropertyPopupSkeleton = () => (
  <Card className="w-64 max-w-xs rounded-xl overflow-hidden shadow-lg animate-pulse">
    {/* Image Section - h-32 como el popup real */}
    <div className="relative h-32 w-full bg-gray-200">
      {/* Badge (top-left) */}
      <div className="absolute top-2 left-2 w-20 h-6 bg-gray-300 rounded-full" />
      {/* Favorite Button (top-right) */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full z-20" />
    </div>

    {/* Header - p-3 pb-2 como el popup real */}
    <CardHeader className="p-3 pb-2">
      {/* Title and rating */}
      <div className="flex items-center justify-between mb-1">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>
      {/* Location */}
      <div className="flex items-center gap-1 mt-1">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-3 w-28 bg-gray-100 rounded" />
      </div>
    </CardHeader>

    {/* Content - p-3 pt-0 como el popup real */}
    <CardContent className="p-3 pt-0 grid gap-2">
      {/* Price */}
      <div className="h-6 w-24 bg-gray-200 rounded" />
      {/* Features */}
      <div className="flex items-center space-x-3">
        <div className="h-4 w-12 bg-gray-100 rounded" />
        <div className="h-4 w-12 bg-gray-100 rounded" />
        <div className="h-4 w-14 bg-gray-100 rounded" />
      </div>
    </CardContent>

    {/* Footer - p-3 pt-0 como el popup real */}
    <CardFooter className="p-3 pt-0">
      <div className="h-9 w-full bg-gray-200 rounded" />
    </CardFooter>
  </Card>
);

export default PropertyPopupSkeleton;

