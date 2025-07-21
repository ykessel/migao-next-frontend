import { Skeleton } from "@/components/ui/skeleton";

export function PlanCardSkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl flex flex-col items-center w-full max-w-sm mx-auto">
      <Skeleton className="w-16 h-16 mb-4" /> {/* Icon */}
      <Skeleton className="h-6 w-2/3 mb-2" /> {/* Title */}
      <Skeleton className="h-8 w-1/2 mb-4" /> {/* Price */}
      <div className="w-full space-y-2 mb-6">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" /> {/* Button */}
    </div>
  );
} 