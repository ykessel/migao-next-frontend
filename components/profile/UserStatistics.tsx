"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useSearchProperties } from "@/hooks/use-properties";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

export function UserStatistics() {
  const { data: session } = useSession();
  const accessToken = (session as { access_token?: string } | null | undefined)
    ?.access_token;

  let userId: string | undefined = undefined;
  if (accessToken) {
    try {
      type DecodedJwt = { user?: { _id?: string }; _id?: string; sub?: string };
      const decoded = jwtDecode<DecodedJwt>(accessToken);
      userId = decoded.user?._id || decoded._id || decoded.sub;
    } catch {
      // Silent catch
    }
  }

  // Fetch all user properties to calculate statistics
  const { data, isLoading } = useSearchProperties({
    filters: userId
      ? [{ type: "TERM", field: "owner._id", value: userId }]
      : [],
    size: 100, // Get all properties for accurate stats
  });

  const statistics = useMemo(() => {
    const properties = data?.data || [];

    // Calculate total views
    const totalViews = properties.reduce((acc, property) => {
      const views = property.publicationViews || 0;
      return acc + (typeof views === "number" ? views : 0);
    }, 0);

    // Calculate available properties
    const availableProperties = properties.filter((p) => p.isAvailable).length;

    return {
      totalProperties: data?.total || 0,
      availableProperties,
      totalViews,
    };
  }, [data]);

  return (
    <Card className="max-h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-600" />
          Estadísticas
        </CardTitle>
        <CardDescription className="text-xs text-gray-600">
          Resumen de tus propiedades
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-3">
          {isLoading ? (
            <>
              <div className="flex flex-col items-center justify-center p-2.5 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                <div className="space-y-1.5">
                  <div className="h-2 w-16 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-5 w-12 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                <div className="space-y-1.5">
                  <div className="h-2 w-16 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-5 w-12 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                <div className="space-y-1.5">
                  <div className="h-2 w-16 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-5 w-12 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Total Properties */}
              <div className="flex flex-col items-center justify-center p-1 bg-teal-50/100 rounded-2xl border-teal-100">
                <div className="text-center space-y-0.5">
                  <p className="text-[11px] font-medium text-gray-700">
                    Propiedades
                  </p>
                  <p className="text-2xl font-bold text-teal-600 mt-1">
                    {statistics.totalProperties}
                  </p>
                </div>
              </div>

              {/* Total Views */}
              <div className="flex flex-col items-center justify-center p-1 bg-blue-50/100 rounded-2xl border-blue-100">
                <div className="text-center space-y-0.5">
                  <p className="text-[11px] font-medium text-gray-700">Visitas</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {statistics.totalViews > 999
                      ? `${(statistics.totalViews / 1000).toFixed(1)}k`
                      : statistics.totalViews}
                  </p>
                </div>
              </div>

              {/* Available Properties */}
              <div className="flex flex-col items-center justify-center p-1 bg-emerald-50/100 rounded-2xl border-emerald-100">
                <div className="text-center space-y-0.5">
                  <p className="text-[11px] font-medium text-gray-700">
                    Disponibles
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {statistics.availableProperties}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
