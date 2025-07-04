"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import type { Session as NextAuthSession } from 'next-auth';

export default function ProfileUpdate() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const session = await getSession() as NextAuthSession & { access_token?: string };
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        setError("No se pudo actualizar el perfil. Intenta de nuevo.");
      }
    } catch {
      setError("No se pudo actualizar el perfil. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Completa tu perfil</h2>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
} 