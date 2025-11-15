"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Accede a tu cuenta usando Google
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={async () => {
              setLoading(true);
              await signIn('google', { callbackUrl: '/profile/check' });
              setLoading(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
            type="button"
            disabled={loading}
          >
            <Image 
              src="https://developers.google.com/identity/images/g-logo.png" 
              alt="Google" 
              width={20} 
              height={20} 
              className="w-5 h-5"
            />
            {loading ? 'Redirigiendo...' : 'Iniciar sesión con Google'}
          </Button>
          
          <Button
            onClick={() => {}}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 font-medium shadow-sm cursor-not-allowed"
            type="button"
            disabled={true}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Iniciar sesión con Facebook
            <span className="text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded ml-2">Próximamente</span>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            ¿No tienes una cuenta? Crea una usando Google.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}