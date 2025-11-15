"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            La página que buscas no existe o ha sido removida.
          </p>
        </div>
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-4">
              <Link href="/" className="block">
                <Button
                  className="w-full h-12 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Volver a inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
