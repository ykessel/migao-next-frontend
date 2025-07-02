"use client";

import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    console.error(
      "Error 404: El usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">¡Oops! Página no encontrada</p>
        <a href="/" className="text-teal-600 hover:text-teal-700 underline">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
