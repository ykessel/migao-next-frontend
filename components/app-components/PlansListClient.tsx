"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Rocket, Zap } from "lucide-react";
import Link from "next/link";

export interface Plan {
  _id: string;
  name: string;
  price: number;
  duration: number;
  durationType?: string;
  description: string;
  features: Record<string, { enabled: boolean; description: string; value: number; interval: string }>;
}

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

type PlanFeature = { enabled: boolean; description: string; value: number; interval: string };

export default function PlansListClient({ initialPlans }: { initialPlans: Plan[] }) {
  const [plans] = useState(initialPlans);

  if (!plans || plans.length === 0) return null;

  return (
    <div className="grid max-w-6xl justify-center mx-auto md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, idx) => {
        const colors = getPlanColors(plan.name);
        const features = Object.entries(plan.features)
          .filter(([, feature]) => (feature as PlanFeature).enabled)
          .map(([key, feature]) => {
            const f = feature as PlanFeature;
            return {
              key,
              description: f.description,
              value: f.value,
              interval: f.interval
            };
          })
          .sort((a, b) => {
            const order = ['propertyPosts', 'Busqueda de Propiedades'];
            const aIndex = order.indexOf(a.key);
            const bIndex = order.indexOf(b.key);
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return a.description.localeCompare(b.description);
          });

        // Disable last two plans
        const isDisabled = idx > 0;
        return (
          <Card
            key={plan._id}
            className={`flex flex-col h-full min-w-[300px] max-w-[350px] w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 p-4 mx-auto ${isDisabled ? 'opacity-50 grayscale pointer-events-none' : ''}`}
          >
            <CardHeader className="flex flex-col items-center text-center pb-2">
              {isDisabled && (
                <span className="mb-2 inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">Próximamente</span>
              )}
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
                <Button className={`w-full ${colors.button} font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${isDisabled ? 'pointer-events-none' : ''}`} disabled={isDisabled}>
                  {getButtonText(plan.name)}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
} 