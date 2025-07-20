'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContactForm } from "@/hooks/use-contact-form";

export function ContactForm() {
  const { form, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <Card className="p-6 shadow-lg rounded-xl">
      <CardHeader className="p-0 pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">Envíanos un Mensaje</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </Label>
            <Input 
              id="fullName" 
              name="fullName"
              placeholder="Tu nombre" 
              type="text" 
              className="w-full"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </Label>
            <Input 
              id="email" 
              name="email"
              placeholder="tu.correo@ejemplo.com" 
              type="email" 
              className="w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </Label>
            <Input 
              id="phone" 
              name="phone"
              placeholder="+53 5 123 4567" 
              type="tel" 
              className="w-full"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </Label>
            <Textarea 
              id="message" 
              name="message"
              placeholder="¿En qué podemos ayudarte?" 
              rows={5} 
              className="w-full resize-y"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 