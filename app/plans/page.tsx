"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Rocket } from "lucide-react";
import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          ¡Elige el plan perfecto para ti!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-2">
          <span className="font-bold text-teal-600">¿Buscas una propiedad para rentar?</span> <span className="text-indigo-600 font-bold">¡Es totalmente GRATIS!</span> Explora, guarda favoritos y contacta a propietarios sin costo alguno. Los planes a continuación son para propietarios y agencias que desean publicar y gestionar propiedades.
        </p>
        <p className="text-gray-600">Si eres propietario o agencia, elige el plan que mejor se adapte a tus necesidades y llega a miles de inquilinos potenciales.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Basic Plan */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ring-2 ring-teal-100">
          <CardContent className="p-8 flex flex-col items-center">
            <Star className="w-8 h-8 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Básico</h2>
            <div className="text-3xl font-extrabold mb-2 text-teal-600">$19/mes</div>
            <p className="text-gray-700 mb-6 min-h-[56px]">Perfecto para propietarios individuales que inician en la plataforma.</p>
            <ul className="text-left mb-6 space-y-2 w-full max-w-xs mx-auto">
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />3 propiedades activas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />10 fotos por propiedad</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Editor básico de descripciones</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Plantillas estándar de anuncios</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Calendario de disponibilidad manual</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Aparición estándar en búsquedas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Formulario de contacto simple</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />50 consultas al mes</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Soporte por email (48h)</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Panel de vistas básico</li>
            </ul>
            <Link href="/publish">
              <Button className="w-full py-2 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white" size="lg">
                Publicar propiedad
              </Button>
            </Link>
          </CardContent>
        </Card>
        {/* Professional Plan */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ring-4 ring-indigo-200">
          <CardContent className="p-8 flex flex-col items-center">
            <Rocket className="w-8 h-8 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Profesional</h2>
            <div className="text-3xl font-extrabold mb-2 text-indigo-600">$49/mes</div>
            <p className="text-gray-700 mb-6 min-h-[56px]">Ideal para pequeñas empresas de gestión de propiedades.</p>
            <ul className="text-left mb-6 space-y-2 w-full max-w-xs mx-auto">
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />10 propiedades activas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />25 fotos y 2 videos por propiedad</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Editor avanzado de descripciones</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Plantillas personalizadas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Sincronización automática de disponibilidad</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Posicionamiento prioritario en búsquedas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Formulario de contacto profesional</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />200 consultas al mes</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Soporte prioritario (24h)</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Panel de analíticas avanzado</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Sistema de reservas integrado</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Notificaciones por SMS (50/mes)</li>
            </ul>
            <Link href="/publish">
              <Button className="w-full py-2 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 text-white" size="lg">
                Hazte Profesional
              </Button>
            </Link>
          </CardContent>
        </Card>
        {/* Premium Plan */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ring-4 ring-teal-400">
            <CardContent className="p-8 flex flex-col items-center">
            <Rocket className="w-8 h-8 text-teal-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Premium</h2>
            <div className="text-3xl font-extrabold mb-2 text-teal-700">$99/mes</div>
            <p className="text-gray-700 mb-6 min-h-[56px]">Para agencias y gestores de propiedades consolidados.</p>
              <ul className="text-left mb-6 space-y-2 w-full max-w-xs mx-auto">
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />25 propiedades activas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />50 fotos y 5 videos por propiedad</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Opciones de branding personalizado</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Herramientas de gestión masiva</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Posicionamiento top en búsquedas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Destacado en la página principal (2/mes)</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Consultas ilimitadas</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Integración avanzada de CRM</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Reportes personalizados y API</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Gestor de reseñas y reputación</li>
              <li className="flex items-center gap-2 text-gray-700"><CheckCircle className="w-4 h-4 text-teal-500" />Soporte premium 24/7</li>
              </ul>
            <Link href="/publish">
              <Button className="w-full py-2 text-lg font-semibold bg-gradient-to-r from-teal-600 to-teal-700 text-white" size="lg">
                Hazte Premium
                </Button>
              </Link>
            </CardContent>
          </Card>
      </div>
    </div>
  );
} 