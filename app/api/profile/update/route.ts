import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Aquí deberías actualizar el perfil del usuario en tu base de datos
  // Por ahora, solo simula una respuesta exitosa
  return NextResponse.json({ success: true });
} 