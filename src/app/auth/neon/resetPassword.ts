'use server'

import { neon } from '@neondatabase/serverless';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { Resend } from 'resend';

const sql = neon(`${process.env.DATABASE_URL}`);
// Inicializar Resend con tu API key (obtenida de resend.com)
const resend = new Resend(process.env.RESEND_API_KEY);

// Función para generar un token único para restablecer la contraseña
export async function generateResetToken(email: string) {
  try {
    // Verificar si el email existe
    const user = await sql('SELECT * FROM users WHERE email = $1', [email]);
    if (user.length === 0) {
      return { success: false, message: 'No existe una cuenta con este email' };
    }

    // Generar token aleatorio
    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = await hash(resetToken, 10);
    
    // Establecer expiración (24 horas)
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    
    // Guardar el token en la base de datos
    // Primero eliminamos cualquier token existente para este usuario
    await sql('DELETE FROM password_reset_tokens WHERE user_id = $1', [user[0].id]);
    
    // Luego insertamos el nuevo token
    await sql(
      'INSERT INTO password_reset_tokens (user_id, token, expiration_date) VALUES ($1, $2, $3)',
      [user[0].id, hashedToken, expirationDate]
    );
    
    // Enviar email con el token
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/confirm?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'EsportsHall <onboarding@resend.dev>', // Puedes personalizar esto después
      to: email,
      subject: 'Restablece tu contraseña en EsportsHall',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Restablece tu contraseña</h2>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en EsportsHall.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Restablecer contraseña</a>
          <p>Este enlace expirará en 24 horas.</p>
          <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.</p>
          <p>Saludos,<br>El equipo de EsportsHall</p>
        </div>
      `,
    });
    
    if (error) {
      console.error('Error al enviar email:', error);
      return { success: false, message: 'Error al enviar el email de recuperación' };
    }
    
    return { success: true, message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña' };
  } catch (error) {
    console.error('Error al generar token de restablecimiento:', error);
    return { success: false, message: 'Error al procesar la solicitud' };
  }
}

// Función para verificar un token y restablecer la contraseña
export async function verifyTokenAndResetPassword(token: string, email: string, newPassword: string) {
  try {
    // Buscar el usuario por email
    const user = await sql('SELECT * FROM users WHERE email = $1', [email]);
    if (user.length === 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }
    
    // Buscar el token de restablecimiento
    const resetTokens = await sql('SELECT * FROM password_reset_tokens WHERE user_id = $1', [user[0].id]);
    if (resetTokens.length === 0) {
      return { success: false, message: 'Token de restablecimiento no válido o expirado' };
    }
    
    const resetToken = resetTokens[0];
    
    // Verificar si el token ha expirado
    const now = new Date();
    const expirationDate = new Date(resetToken.expiration_date);
    if (now > expirationDate) {
      // Eliminar el token expirado
      await sql('DELETE FROM password_reset_tokens WHERE id = $1', [resetToken.id]);
      return { success: false, message: 'El enlace de restablecimiento ha expirado' };
    }
    
    // Hashear la nueva contraseña
    const hashedPassword = await hash(newPassword, 10);
    
    // Actualizar la contraseña del usuario
    await sql('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user[0].id]);
    
    // Eliminar el token usado
    await sql('DELETE FROM password_reset_tokens WHERE id = $1', [resetToken.id]);
    
    return { success: true, message: 'Contraseña actualizada correctamente' };
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return { success: false, message: 'Error al procesar la solicitud' };
  }
}
