import React from "react";
import { getPlans } from "@/services/api-client";
import type { Metadata } from "next";
import { PlanCardSkeleton } from '@/components/skeletons/PlanCardSkeleton';
import { Suspense } from 'react';
import PlansListClient from "@/components/app-components/PlansListClient";
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: "Planes y Precios - MiGao",
  description: "Elige el plan perfecto para publicar y gestionar tus propiedades en Cuba. Planes desde $19/mes para propietarios y agencias.",
  openGraph: {
    title: "Planes y Precios - MiGao",
    description: "Elige el plan perfecto para publicar y gestionar tus propiedades en Cuba.",
    type: "website",
  },
};

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 mb-4 leading-tight">
            ¡Elige el plan perfecto para ti!
          </h1>
          <p className="max-w-2xl md:max-w-3xl lg:max-w-4xl text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-2 leading-relaxed">
            Explora, guarda favoritos y contacta a propietarios sin costo alguno. Los planes a continuación son para
            propietarios y agencias que desean publicar y gestionar propiedades.
          </p>
        </div>
        <div className="flex flex-col items-center mb-8">
          <Badge className="bg-yellow-400 text-yellow-900 text-base px-4 py-2 rounded-full mb-2">Próximamente</Badge>
          <span className="text-yellow-800 text-sm">Los planes estarán disponibles pronto. Por ahora, solo el plan básico esta disponible.</span>
        </div>
        <div className="relative w-full">
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto justify-center">
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </div>
          }>
            <div className="relative z-10">
              <PlansListClient initialPlans={plans} />
            </div>
          </Suspense>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 text-center my-10">
          <p className="max-w-2xl md:max-w-3xl lg:max-w-4xl text-gray-600 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed leading-relaxed">
            Si eres propietario o agencia, elige el plan que mejor se adapte a tus necesidades y llega a miles de
            inquilinos potenciales.
          </p>
        </div>
      </div>
    </div>
  );
} 