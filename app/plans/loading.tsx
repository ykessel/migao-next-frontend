import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlansLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 flex flex-col items-center">
              <Skeleton className="w-8 h-8 rounded-full mb-4" />
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-10 w-20 mb-2" />
              <Skeleton className="h-16 w-full mb-6" />
              
              <div className="space-y-2 w-full max-w-xs mx-auto mb-6">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              
              <Skeleton className="w-full h-12 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 