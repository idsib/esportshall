'use server'
// Importamos neon.
import { neon } from '@neondatabase/serverless';
// Importamos lo que hasheara la contraseña y lo que la comparara con la de la base de datos en el login.
import { hash, compare } from 'bcrypt';
// Insertamos la configuración de neon.
const sql = neon(`${process.env.DATABASE_URL}`);

// Función que verifica si un correo electrónico ya está registrado en la base de datos
export async function checkEmailExists(email: string) {
    try {
        // Query para buscar el correo en la tabla 'users'
        const result = await sql('SELECT email FROM users WHERE email = $1', [email]);

        // Retorna un objeto indicando si el correo existe y un mensaje opcional
        return {
            exists: result.length > 0, // true si se encontró al menos un resultado
            message: result.length > 0 ? 'Este correo electrónico ya está registrado' : ''
        };
    } catch (error) {
        // En caso de error en la consulta, lo muestra en consola y retorna que no existe
        console.error('Error al verificar email:', error);
        return { exists: false, message: '' };
    }
}
// Función que registra un usuario en la base de datos importando el formData sacado de auth/register
export async function register(formData: FormData) {
    try {
        // Manejamos los datos.
        const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        // Comprovación de si el email esta en la base de datos.
        const emailCheck = await checkEmailExists(email);
        if (emailCheck.exists) {
            throw new Error('Este correo electrónico ya está registrado. Por favor utiliza otro.');
        }
        // Hasheamos la contraseña con un nivel estandar de dificultad (10).
        const hashPass = await hash(password, 10);
        // Query para introducir al usuario en la base de datos.
        await sql(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [completeName, email, hashPass]
        );
        // Manejamos los datos adicionales.
        const nickname = formData.get('nickname') as string; 
        const bio = formData.get('bio') as string;
        const location = formData.get('location') as string;
        const website = formData.get('website') as string;
        const x = formData.get('x') as string;
        const instagram = formData.get('instagram') as string;
        const twitch = formData.get('twitch') as string;
        const favoriteCommunity = formData.get('favoriteCommunity') as string;
        // Agarramos el id del usuario ya registrado
        const user_id = await sql(
            'SELECT id FROM users WHERE email = $1', [email]
        );
        // Y ahora, con el id del usuario como referencia lo insertamos.
        await sql(
            'INSERT INTO users_ai (user_id, nickname, bio, location, website, x, instagram, twitch, favoritecommunity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8))', 
            [user_id, nickname, bio, location, website, x, instagram, twitch, favoriteCommunity]
        );

        return { success: true };
        
    } catch (error) {
        console.error('Error en el registro:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Error desconocido durante el registro' 
        };
    }
}

export async function login(email: string, password: string) {
    try {
        // Buscamos al usuario en la base de datos.
        const user = await sql('SELECT * FROM users WHERE email = $1', [email]);
        // Si no lo encontramos, pa fuera.
        if (user.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        // Autentificamos con la contraseña utilizando la función compare que nos ofrece bcrypt.
        const isValid = await compare(password, user[0].password);
        if (!isValid) {
            throw new Error('Contraseña incorrecta');
        }
        // Generamos el token a partir del Date.now para que sea unico utilizando la funcion hash, que lo hashea en md5.
        const tokenData = user[0].name + Date.now();
        const token = await hash(tokenData, 10);
        // Le ponemos al token un mes de caducidad teniendo en cuenta que el date.now te da la fecha en milisegundos.
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneMonth);
        // Y introduce el token en la base de datos.
        await sql(
            'INSERT INTO users_token (user_id, token, expiration_date) VALUES ($1, $2, $3)',
            [user[0].id, token, expirationDate]
        );

        return { success: true, token };
    } catch (error) {
        console.error('Error en el login:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
}
// Función para sacar todas las noticias en la base de datos.
export async function AllNoticias() {
    // Interficie con la estructura de cada noticias.
    interface Noticia {
        id: number;
        pagina: string;
        link_fuente: string;
        titulo: string;
        link_articulo: string;
        texto: string;
        fecha: Date;
        imagen: string;
      };
      // Sacamos todas las noticias
      const noticiasBBDD = await sql('SELECT * FROM noticias');
      // Y las ordenamos en una array con el patron de la interficie utilizando un map (Gracias clases del Josep).
      const noticias: Noticia[] = noticiasBBDD.map((noticia: any) => ({
        id: noticia.id,
        pagina: noticia.pagina,
        link_fuente: noticia.link_fuente,
        titulo: noticia.titulo,
        link_articulo: noticia.link_articulo,
        texto: noticia.texto,
        fecha: new Date(noticia.fecha),
        imagen: noticia.imagen,
      }));

    return noticias;
}
// Función para verificar el token.
export async function verifyToken(token: string) {
    try {
        // Sacamos el usuario y la fecha de expiración.
        const result = await sql(
            'SELECT user_id, expiration_date FROM users_token WHERE token = $1',
            [token]
        );
        // Si no hay, pa fuera.
        if (result.length === 0) {
            return { isValid: false, userId: null };
        }
         // Extrae los datos del token
         const tokenData = result[0];
         const expirationDate = new Date(tokenData.expiration_date); // Fecha de expiración del token.
         const now = new Date(); // Fecha y hora actual
 
         // Si el token ha expirado, lo elimina de la base de datos y lo marca como inválido.
         if (now > expirationDate) {
             await sql('DELETE FROM users_token WHERE token = $1', [token]);
             return { isValid: false, userId: null };
         }
 
         // Si todo está bien, el token es válido y se retorna el user_id asociado.
         return { isValid: true, userId: tokenData.user_id };
     } catch (error) {
         // En caso de error en la consulta o procesamiento, se registra el error y se retorna como inválido.
         console.error('Error al verificar token:', error);
         return { isValid: false, userId: null };
     }
 }
// Función para desloguar al usuario
export async function logoutUser(token: string) {
    try {
        // Borra el token del usuario de la base de datos.
        await sql('DELETE FROM users_token WHERE token = $1', [token]);
        return { success: true };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return { success: false };
    }
}
