import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: Request) {
  // Aquí deberías actualizar el perfil del usuario en tu base de datos
  // Por ahora, solo simula una respuesta exitosa
  return NextResponse.json({ success: true });
} 