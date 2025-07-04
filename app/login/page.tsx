"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from 'next-auth/react';
import type { Session as NextAuthSession } from 'next-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.ok) {
        const session = await getSession() as NextAuthSession & { isNew?: boolean };
        if (session?.isNew) {
          router.push('/profile/update');
        } else {
          router.push('/');
        }
      } else {
        setError('Credenciales inválidas. Por favor, intente nuevamente.');
      }
    } catch {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
            <button
              onClick={async () => {
                setLoading(true);
                await signIn('google', { callbackUrl: '/profile/check' });
                setLoading(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
              type="button"
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
              Iniciar sesión con Google
            </button>
            <p className="text-sm text-gray-600 text-center">
              ¿No tienes una cuenta?{' '}
              <Link href="/signup" className="text-teal-600 hover:text-teal-500">
                Crear cuenta
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}