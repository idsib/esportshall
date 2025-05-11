import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcrypt";
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: NextRequest) {
  try {
    // Utilizo session para verificar la autentificación del usuario
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }
    
    const { currentPassword, newPassword } = await request.json();
    
    // Valida que se proporcionaron las contraseñas
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Se requiere la contraseña actual y la nueva" },
        { status: 400 }
      );
    }
    
    // Obtengo el usuario de la base de datos
    const users = await sql('SELECT * FROM users WHERE email = $1', [session.user.email]);
    
    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    
    const user = users[0];
    
    // Verifica la contraseña actual
    const isValidPassword = await compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Contraseña actual incorrecta" },
        { status: 400 }
      );
    }
    
    // Genero hash de la nueva contraseña
    const hashedPassword = await hash(newPassword, 10);
    
    // Actualizo la contraseña en la base de datos
    await sql('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    
    return NextResponse.json(
      { message: "Contraseña actualizada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return NextResponse.json(
      { error: "Error al cambiar la contraseña" },
      { status: 500 }
    );
  }
}
