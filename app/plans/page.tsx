import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { getPlans } from "@/services/api-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes y Precios - MiGao",
  description: "Elige el plan perfecto para publicar y gestionar tus propiedades en Cuba. Planes desde $19/mes para propietarios y agencias.",
  openGraph: {
    title: "Planes y Precios - MiGao",
    description: "Elige el plan perfecto para publicar y gestionar tus propiedades en Cuba.",
    type: "website",
  },
};

const getPlanIcon = (planName: string) => {
  const name = planName.toLowerCase();
  if (name.includes('básico') || name.includes('basic') || name.includes('casual')) return <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 mb-4" />;
  if (name.includes('profesional') || name.includes('professional')) return <Rocket className="w-8 h-8 text-indigo-500 mb-4" />;
  if (name.includes('premium')) return <Zap className="w-8 h-8 text-teal-600 mb-4" />;
  return <Star className="w-8 h-8 text-gray-500 mb-4" />;
};

const getPlanColors = (planName: string) => {
  const name = planName.toLowerCase();
  if (name.includes('básico') || name.includes('basic') || name.includes('casual')) {
    return {
      price: 'text-green-600',
      button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      checkIcon: 'text-green-500'
    };
  }
  if (name.includes('profesional') || name.includes('professional')) {
    return {
      price: 'text-indigo-600',
      button: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      checkIcon: 'text-indigo-500'
    };
  }
  if (name.includes('premium')) {
    return {
      price: 'text-teal-600',
      button: 'bg-teal-500 hover:bg-teal-600 text-white',
      checkIcon: 'text-teal-500'
    };
  }
  return {
    price: 'text-gray-600',
    button: 'bg-gray-500 hover:bg-gray-600 text-white',
    checkIcon: 'text-gray-500'
  };
};

const formatPrice = (price: number, duration: number, durationType?: string) => {
  if (price === 0) {
    return 'Gratis';
  }
  if (duration === 1) {
    return `$${price}/${durationType || 'mes'}`;
  }
  const durationText = durationType === 'days' ? 'días' : 
                      durationType === 'weeks' ? 'semanas' : 
                      durationType === 'months' ? 'meses' : 
                      durationType || 'meses';
  return `$${price}/${duration} ${durationText}`;
};

const getButtonText = (planName: string) => {
  const name = planName.toLowerCase();
  if (name.includes('básico') || name.includes('basic') || name.includes('casual')) return 'Comenzar Gratis';
  if (name.includes('profesional') || name.includes('professional')) return 'Hazte Profesional';
  if (name.includes('premium')) return 'Hazte Premium';
  return 'Seleccionar Plan';
};

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 mb-4 leading-tight">
            ¡Elige el plan perfecto para ti!
          </h1>
          <p className="max-w-2xl md:max-w-3xl lg:max-w-4xl text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-2 leading-relaxed">
            Explora, guarda favoritos y contacta a propietarios sin costo alguno. Los planes a continuación son para
            propietarios y agencias que desean publicar y gestionar propiedades.
          </p>
          <p className="max-w-2xl md:max-w-3xl lg:max-w-4xl text-gray-600 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed leading-relaxed">
            Si eres propietario o agencia, elige el plan que mejor se adapte a tus necesidades y llega a miles de
            inquilinos potenciales.
          </p>
        </div>
        {plans.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay planes disponibles</h2>
              <p className="text-gray-600 mb-6">En este momento no hay planes disponibles. Por favor, contacta con nuestro equipo de soporte.</p>
              <Link href="/#">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid max-w-6xl justify-center mx-auto md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => {
              const colors = getPlanColors(plan.name);
              const features = Object.entries(plan.features)
                .filter(([, feature]) => feature.enabled)
                .map(([key, feature]) => ({
                  key,
                  description: feature.description,
                  value: feature.value,
                  interval: feature.interval
                }))
                .sort((a, b) => {
                  const order = ['propertyPosts', 'Busqueda de Propiedades'];
                  const aIndex = order.indexOf(a.key);
                  const bIndex = order.indexOf(b.key);
                  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                  if (aIndex !== -1) return -1;
                  if (bIndex !== -1) return 1;
                  return a.description.localeCompare(b.description);
                });

              return (
                <Card key={plan._id} className="flex flex-col h-full min-w-[300px] max-w-[350px] w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 p-4 mx-auto">
                  <CardHeader className="flex flex-col items-center text-center pb-2">
                    {getPlanIcon(plan.name)}
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-1">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className={`text-4xl font-extrabold ${colors.price} mt-1 mb-2`}> 
                      {formatPrice(plan.price, plan.duration, plan.durationType)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow pt-2 pb-4 px-2">
                    <p className="text-sm text-gray-600 mb-6 text-center min-h-[48px]">
                      {plan.description}
                    </p>
                    {features.length > 0 && (
                      <ul className="grid gap-3 text-sm text-gray-700 mb-4">
                        {features.map((feature) => (
                          <li key={feature.key} className="flex items-center gap-2">
                            <Check className={`h-4 w-4 ${colors.checkIcon}`} />
                            <span>
                              {feature.description}
                              {feature.value > 0 && feature.interval !== 'unlimited' && (
                                <span className="font-medium"> ({feature.value})</span>
                              )}
                              {feature.value === 0 && feature.interval === 'unlimited' && (
                                <span className="font-medium"> (Ilimitado)</span>
                              )}
                              {feature.value > 0 && feature.interval === 'unlimited' && (
                                <span className="font-medium"> ({feature.value} ilimitado)</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter className="mt-auto pt-2 pb-2 px-2">
                    <Link href="/publish" className="w-full">
                      <Button className={`w-full ${colors.button} font-bold py-2 px-4 rounded-lg transition-colors duration-200`}>
                        {getButtonText(plan.name)}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 