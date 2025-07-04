"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (!code) {
      setError('No se encontró el código de autorización.');
      return;
    }
    const exchangeCode = async () => {
      try {
        // Opcional: actualizar usuario en contexto si es necesario
        // window.location.reload(); // Forzar re-render del contexto
        router.push('/');
      } catch (err: unknown) {
        let message = 'Error desconocido';
        if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
          message = (err.response.data as { message?: string }).message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError('Error al intercambiar el código: ' + message);
      }
    };
    exchangeCode();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-red-600">Error de autenticación</h2>
          <p className="mb-4">{error}</p>
          <button onClick={() => router.push('/login')} className="text-teal-600 underline">Volver al login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin mb-4" />
        <p className="text-gray-700">Procesando autenticación...</p>
      </div>
    </div>
  );
};

export default AuthCallback; 