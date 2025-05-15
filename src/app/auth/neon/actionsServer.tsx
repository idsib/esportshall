'use server'
import { neon } from '@neondatabase/serverless';
import { hash, compare } from 'bcrypt';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function checkEmailExists(email: string) {
    try {
        const result = await sql('SELECT email FROM users WHERE email = $1', [email]);
        return {
            exists: result.length > 0,
            message: result.length > 0 ? 'Este correo electrónico ya está registrado' : ''
        };
    } catch (error) {
        console.error('Error al verificar email:', error);
        return { exists: false, message: '' };
    }
}

export async function register(formData: FormData) {
    try {
        const completeName = formData.get('firstName') + ' ' + formData.get('lastName');
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        // Check if email already exists
        const emailCheck = await checkEmailExists(email);
        if (emailCheck.exists) {
            throw new Error('Este correo electrónico ya está registrado. Por favor utiliza otro.');
        }
        
        const hashPass = await hash(password, 10);
        await sql(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [completeName, email, hashPass]
        );

        const nickname = formData.get('nickname') as string; 
        const bio = formData.get('bio') as string;
        const location = formData.get('location') as string;
        const website = formData.get('website') as string;
        const x = formData.get('x') as string;
        const instagram = formData.get('instagram') as string;
        const twitch = formData.get('twitch') as string;
        const favoriteCommunity = formData.get('favoriteCommunity') as string;

        const user_id = await sql(
            'SELECT id FROM users WHERE email = $1', [email]
        );

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
        const user = await sql('SELECT * FROM users WHERE email = $1', [email]);
        if (user.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const isValid = await compare(password, user[0].password);
        if (!isValid) {
            throw new Error('Contraseña incorrecta');
        }

        const tokenData = user[0].name + Date.now();
        const token = await hash(tokenData, 10);
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneMonth);

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

export async function test() {
    // Insertar datos correctamente
    const prueba = await sql(
        'SELECT * FROM users'
    );
    console.log(prueba);
}

export async function AllNoticias() {
 
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

      const noticiasBBDD = await sql('SELECT * FROM noticias');

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

export async function verifyToken(token: string) {
    try {
        const result = await sql(
            'SELECT user_id, expiration_date FROM users_token WHERE token = $1',
            [token]
        );

        if (result.length === 0) {
            return { isValid: false, userId: null };
        }

        const tokenData = result[0];
        const expirationDate = new Date(tokenData.expiration_date);
        const now = new Date();

        if (now > expirationDate) {
            await sql('DELETE FROM users_token WHERE token = $1', [token]);
            return { isValid: false, userId: null };
        }

        return { isValid: true, userId: tokenData.user_id };
    } catch (error) {
        console.error('Error al verificar token:', error);
        return { isValid: false, userId: null };
    }
}

export async function logoutUser(token: string) {
    try {
        await sql('DELETE FROM users_token WHERE token = $1', [token]);
        return { success: true };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return { success: false };
    }
}

export async function updateNameUser(userName : String){
    
}