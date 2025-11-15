import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function PlanCardSkeleton() {
  return (
    <Card className="flex flex-col h-full min-w-[300px] max-w-[350px] w-full rounded-2xl shadow-lg p-4 mx-auto animate-pulse">
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <Skeleton className="w-8 h-8 rounded-full mb-4" /> {/* Icon */}
        <Skeleton className="h-7 w-32 mb-1" /> {/* Title */}
        <Skeleton className="h-10 w-28 mt-1 mb-2" /> {/* Price */}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow pt-2 pb-4 px-2">
        {/* Description */}
        <div className="mb-6 text-center min-h-[48px] space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4 mx-auto" />
        </div>
        {/* Features list */}
        <ul className="grid gap-3 mb-4">
          <li className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </li>
          <li className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </li>
          <li className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </li>
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-2 pb-2 px-2">
        <Skeleton className="h-10 w-full rounded-lg" /> {/* Button */}
      </CardFooter>
    </Card>
  );
} 