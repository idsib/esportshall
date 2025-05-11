import { NextRequest, NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";
import { compare } from "bcrypt";

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
    
    const { confirmation, password } = await request.json();
    
    // Valido que se proporciona la confirmación
    if (confirmation !== 'ELIMINAR') {
      return NextResponse.json(
        { error: "Confirmación incorrecta" },
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
    
    // Si el usuario tiene contraseña (no es de Google), verificar
    if (user.password && password) {
      const isValidPassword = await compare(password, user.password);
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Contraseña incorrecta" },
          { status: 400 }
        );
      }
    }
    
    // Elimino tokens del usuario
    await sql('DELETE FROM users_token WHERE user_id = $1', [user.id]);
    
    // Elimino al usuario
    await sql('DELETE FROM users WHERE id = $1', [user.id]);
    
    return NextResponse.json(
      { message: "Cuenta eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    return NextResponse.json(
      { error: "Error al eliminar la cuenta" },
      { status: 500 }
    );
  }
}
